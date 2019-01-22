# Networking

[Networking](https://kubernetes.io/docs/concepts/cluster-administration/networking/) in Kubernetes clusters is an abstracted implementation that can be configured per cluster basis. Pharos supports few different options how to configure the networking provider.

## Supported Network Providers

* [Weave](#weave)
* [Calico](#calico)
* [Custom](custom_networking.md)

## Weave

[Weave](https://github.com/weaveworks/weave) is the default networking provider in Pharos clusters. Weave Net creates a virtual network that connects containers across multiple hosts and enables their automatic discovery. Weave also supports network policies.

If the cluster is deployed on multiple regions/data centers*, Weave networking is configured so that each node within a region connects to other nodes in the same region through private interfaces/addresses. When nodes peer with nodes outside their own region the peering uses public addresses of the nodes. This configuration is fully dynamic and handled by an additional [side-car component](https://github.com/kontena/weave-flying-shuttle) on the networking deployment. The users needs to just ensure the nodes have proper region [labels](../configuration.md#hosts) in place.


*) Nodes region is determined by `failure-domain.beta.kubernetes.io/region` annotations value.

### Configuration

```yaml
network:
  provider: weave
  service_cidr: 172.31.0.0/16
  pod_network_cidr: 172.32.0.0/16
  weave:
    trusted_subnets:
      - 10.10.0.0/16
```

#### `trusted_subnets` (optional)

An array of trusted subnets where overlay network can be used without IPSEC. By default Weave creates secure tunnels between nodes with IPSEC. In environments where the node-to-node networking is secure and trusted you can disable the IPSEC tunneling for better performance.


## Calico

[Calico](https://github.com/projectcalico/calico/) creates and manages a flat layer 3 network, assigning each workload a fully routable IP address. Workloads can communicate without IP encapsulation or network address translation for bare metal performance, easier troubleshooting, and better interoperability. In environments that require an overlay, Calico uses IP-in-IP tunneling

### Configuration

```yaml
network:
  provider: calico
  pod_network_cidr: 172.31.0.0/16
  service_cidr: 172.32.0.0/16
  calico:
    ipip_mode: CrossSubnet
```

#### `ipip_mode` (optional)

* `Always` (default) - Calico will route using IP-in-IP for all traffic originating from a Calico enabled host to all Calico networked containers and VMs within the IP Pool.
* `Never` - Never use IP-in-IP encapsulation.
* `CrossSubnet` - IP-in-IP encapsulation can also be performed selectively, only for traffic crossing subnet boundaries. This provides better performance in AWS multi-AZ deployments, and in general when deploying on networks where pools of nodes with L2 connectivity are connected via a router.

For more details on IP-in-IP configration and usability see https://docs.projectcalico.org/v3.3/usage/configuration/ip-in-ip.