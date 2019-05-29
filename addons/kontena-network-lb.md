# Addon: Kontena Network Loadbalancer

Kontena Network Loadbalancer is a load-balancer implementation for Kubernetes clusters running in advanced networking environments, using standard routing protocols.

- version: `0.7.3`
- maturity: `beta`
- architectures: `x86-64`
- available in: `Pro`

## Concepts

Kontena Network Loadbalancer uses two features to enable network level loadbalancing: address allocation and external address announcement. When a user creates a new `Service` with a type of `LoadBalancer`, the network loadbalancer controller will allocate an address for it from the configured address pool(s) and configures the speakers running on nodes to announce the given address using standard network protocols. Both layer 2 (ARP/NDP) and BGP are supported as announcement protocols.

Kontena Network Loadbalancer is built on top of [MetalLB](https://metallb.universe.tf/).

## Configuration

```yaml
addons:
  kontena-network-lb:
    enabled: true
    address_pools:
      - name: default
        protocol: bgp
        addresses:
          - 147.75.84.224/27
    # node_selector: {}
    # tolerations: []
    # peers:
    #   - peer_address: "10.80.119.142"
    #     peer_asn: 65530
    #     my_asn: 65000
    #     node_selectors:
    #       - match-expressions:
    #         - key: kubernetes.io/hostname
    #           operator: In
    #           values: ["metallb-cluster-worker-0"]
    #  - peer_address: "10.80.119.140"
    #    peer_asn: 65530
    #    my_asn: 65000
    #    node_selectors:
    #      - match-expressions:
    #        - key: kubernetes.io/hostname
    #          operator: In
    #          values: ["metallb-cluster-worker-1"]
```

In this example there's a two worker cluster where each of the workers are connected to a different router, hence there's two BGP peers defined targeting each node separately.

## Options

* `node_selector` - where the speaker pods are deployed. Given as hash of standard [nodeSelector](https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#nodeselector)
* `tolerations` - tolerations for speaker pods. Given as array of standard [toleration](https://kubernetes.io/docs/concepts/configuration/taint-and-toleration/) objects.
* `address_pools` - address pools from where the network loadbalancer reserves addresses from
* `peers` - network peering configuration for BGP protocol

### `address_pools`

Each address pool is configured with:
* `name` - name of the pool
* `protocol` - with which protocol these addresses are announced with
* `addresses` - list of actual addresses used, given as CIDR blocks

### `peers`

Peering configuration must be given for BGP protocol to work. By default, every node in the cluster connects to all the peers listed in the configuration. You can limit peers to certain nodes by using the node-selectors attribute of peers in the configuration. The semantics of these selectors are the same as those used elsewhere in Kubernetes.

Each peer needs to be configured with:
* `peer_address` - address of the peer router
* `peer_asn` - Peer routers ASN number
* `my_asn` - Our own ASN number
* `node_selectors` - Select which nodes should connect to which peer.


## Example for using layer 2 (ARP/NDP)

When using layer 2 for address announcement, one of the machines in the cluster acts as the owner of the service. The allocated service address is announced using standard address discovery protocols such as ARP or NDP. This way the service addresses are reachable in the local network. Looking from the network point of view, some of the cluster machines "just" have many IP addresses.

As an example, let's assume we have our network setup to hand out DHCP addresses in the `192.168.1.100—192.168.1.150` range for the cluster nodes. That means we can use `192.168.1.240-192.168.1.250` range as the address pool to expose services on.

That would mean the configuration for Kontena Network LB is as follows:

```yaml
kontena-network-lb:
    enabled: true
    node_selector:
      node-role.kubernetes.io/worker: ""
    tolerations:
      - operator: "Exists"
        effect: "NoSchedule"
    address_pools:
      - name: default
        protocol: layer2
        addresses:
          - 192.168.1.240-192.168.1.250
```

Now you just create a `Service` with the type `Loadbalancer` and the loadbalancer components will select a free address from the configured pool and starts to advertise it on the local network. To see which address is used use `kubectl get svc my-service`, the selected address is shown as `external-ip`.
