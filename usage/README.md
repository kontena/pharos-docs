# Usage

Standing up a Kontena Pharos cluster is as simple as creating a cluster.yml configuration file and running the command:

```sh
$ pharos-cluster up -c cluster.yml
```

Configuration changes can be applied to the cluster with the same command.

Example cluster YAML:

```yaml
hosts:
  - address: "192.0.2.1"
    private_interface: eth1
    user: root
    ssh_key_path: ~/.ssh/my_key
    role: master
  - address: "192.0.2.2"
    role: worker
  - address: "192.0.2.3"
    role: worker
network:
  provider: weave
  weave:
    trusted_subnets:
      - "172.31.0.0/16"
addons:
  ingress-nginx:
    enabled: true
```

## cluster.yml

- [Hosts](#hosts)
- [API](#api-options)
- [Network](#network-options)
- [External etcd](#using-external-etcd)
- [Webhook Token Authentication](#webhook-token-authentication)
- [Audit Webhook](#audit-webhook)
- [Cloud Provider](#cloud-provider)
- [Kubernetes Network Proxy](#kubernetes-network-proxy)

### Hosts

```yaml
hosts:
  - address: 10.10.1.2
    role: master
    private_interface: eth1
    user: root
  - address: 10.10.1.6
    role: worker
    private_interface: eth1
    user: root
    labels:
      disk: ssd
```

- `address` - IP address or hostname
- `role` - One of `master`, `worker`
- `private_address` - Private IP address or hostname. Prefered for cluster's internal communication where possible (optional)
- `private_interface` - Discover `private_address` from the configured network interface (optional)
- `user` - Username with sudo permission to use for logging in (default  `ubuntu`)
- `ssh_key_path` - A local file path to an ssh private key file (default `~/.ssh/id_rsa`)
- `container_runtime` - One of `docker`, `cri-o` (default `docker`)
- `labels` - A list of `key: value` pairs to assign to the host (optional)
- `taints` - A list of taint objects with `key`, `effect` and optional `value`

#### Using node taints

By default, any `role: master` nodes will have a [`NoSchedule` taint](https://kubernetes.io/docs/concepts/configuration/taint-and-toleration/) with the `node-role.kubernetes.io/master` key, meaning that the master nodes will only run Kubernetes infrastructure pods, and normal workload pods will only be scheduled onto worker nodes. If you wish to run mixed workloads on the master nodes, such as having a cluster with only master nodes, then use `taints: []` to override the default master taints and allow normal workload pods to be scheduled onto the master nodes:

```yaml
hosts:
  - address: 192.0.2.1
    role: master
    taints: []
```

You can also use `taints` to set custom taints on other nodes, effectively dedicating those nodes to only running pod workloads that are marked with a toleration for the same taints:

```yaml
hosts:
  - address: 192.0.2.2
    role: worker
    taints:
      - key: example.com/test
        effect: NoSchedule
```

If you wish to set extra taints on a master node, then you must also include the default `key: node-role.kubernetes.io/master` taint with `effect: NoSchedule`, or it will be removed from the node:

```yaml
hosts:
  - address: 192.0.2.2
    role: master
    taints:
      - key: node-role.kubernetes.io/master
        effect: NoSchedule
      - key: example.com/test
        effect: NoSchedule
```

### API Options

```yaml
api:
  endpoint: api-lb.mydomain.com
```

- `endpoint` - External endpoint address for Kubernetes API (eg loadbalancer or DNS)

### Network Options

```yaml
network:
  provider: weave
  service_cidr: 172.31.0.0/16
  pod_network_cidr: 172.32.0.0/16
  weave:
    trusted_subnets:
      - 10.10.0.0/16
```
- `provider` - Select the network backend to use. Supported providers: `weave` (default), `calico`
- `service_cidr` - IP address range for service VIPs. (default `10.96.0.0/12`)
- `pod_network_cidr` - IP address range for the pod network. (default `10.32.0.0/12`)

#### Weave Options

```yaml
network:
  provider: weave
  weave:
    trusted_subnets:
      - 10.10.0.0/16
```

- `trusted_subnets` - array of trusted subnets where overlay network can be used without IPSEC (optional)

#### Calico Options

```yaml
network:
  provider: calico
  calico:
    ipip_mode: Never
```

- `ipip_mode` - configure usage of IP-IP tunneling for traffic between nodes, see [Calico docs](https://docs.projectcalico.org/v3.1/usage/configuration/ip-in-ip). Supported options: `Never`, `CrossSubnet`, `Always` (default)

### Using External etcd

Pharos Cluster can spin up Kubernetes using an externally managed etcd. In this case you need to define the external etcd details in your `cluster.yml` file:

```yaml
etcd:
  endpoints:
    - https://etcd-1.example.com:2379
    - https://etcd-2.example.com:2379
    - https://etcd-3.example.com:2379
  certificate: ./etcd_certs/client.pem
  key: ./etcd_certs/client-key.pem
  ca_certificate: ./etcd_certs/ca.pem
```

- `endpoints` - array of etcd cluster endpoints
- `certificate` - path to etcd client certificate
- `key` - path to etcd client certificate key
- `ca_certificate` - path to etcd client ca certificate

You need to specify all etcd peer endpoints in the list.

Certificate and corresponding key is used to authenticate the access to etcd. The paths used are relative to the path where the `cluster.yml` file was loaded from.

### Webhook Token Authentication

Cluster supports [webhook for verifying bearer tokens](https://kubernetes.io/docs/admin/authentication/#webhook-token-authentication).

```yaml
authentication:
  token_webhook:
    config:
      cluster:
        name: token-reviewer
        server: http://localhost:9292/token
        certificate_authority: /path/to/ca.pem # optional
      user:
        name: kube-apiserver
        client_key: /path/to/key.pem # optional
        client_certificate: /path/to/cert.pem # optional
    cache_ttl: 5m # optional
```

### Audit Webhook

Cluster supports setting up audit webhooks for external audit event collection.

```yaml
audit:
 server: "http://audit.example.com/webhook"
```

- `server` - audit webhook receiver URL

Audit events are delivered in batched mode, multiple events in one webhook `POST` request.

Currently audit events are configured to be emitted at `Metadata` level. See: https://github.com/kubernetes/community/blob/master/contributors/design-proposals/api-machinery/auditing.md#levels

### Cloud Provider

Pharos Cluster supports a concept of [cloud providers](https://kubernetes.io/docs/getting-started-guides/scratch/#cloud-provider). Cloud provider is a module that provides an interface for managing load balancers, nodes (i.e. hosts) and networking routes. Optionally you can also configure the path to the cloud provider configuration file.

```yaml
cloud:
  provider: openstack
  config: ./cloud-config
```

- `provider` - specify used cloud provider (default: no cloud provider)
- `config` - path to provider specific cloud configuration file (default: no configuration file)

#### AWS Cloud Provider

```yaml
cloud:
  provider: aws
```

All nodes added to the cluster must be able to communicate with EC2 so that they can create and remove resources. You can enable this interaction by using an IAM role attached to the EC2 instance.

Example IAM role:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["ec2:*"],
      "Resource": ["*"]
    },
    {
      "Effect": "Allow",
      "Action": ["elasticloadbalancing:*"],
      "Resource": ["*"]
    }
  ]
}
```

##### Configuring ClusterID

AWS cloud provider needs a `ClusterID` tag for following resources in a cluster:

- `ec2 instances` - all EC2 instances that belong to the cluster
- `security groups` - the security group used for the cluster

Tag syntax:

- key = `kubernetes.io/cluster/<CLUSTER_ID>`
- value = `shared`

Note: autoscaling launch configuration should tag EC2 instances with value `owned`.

#### Openstack Cloud Provider

```yaml
cloud:
  provider: openstack
  config: ./openstack-cloud-config
```

Kubernetes knows how to interact with OpenStack via the cloud configuration file. It is the file that will provide Kubernetes with credentials and location for the OpenStack auth endpoint. You can create a cloud.conf file by specifying the following details in it.

##### Example Openstack Cloud Configuration

This is an example of a typical configuration that touches the values that most often need to be set. It points the provider at the OpenStack cloud’s Keystone endpointa and provides details for how to authenticate with it:

```ini
[Global]
username=user
password=pass
auth-url=https://<keystone_ip>/identity/v3
tenant-id=c869168a828847f39f7f06edd7305637
domain-id=2a73b8f597c04551a0fdc8e95544be8a
```

For more details see [Kubernetes cloud.conf](https://kubernetes.io/docs/concepts/cluster-administration/cloud-providers/#cloud-conf) documentation.


### Kubernetes Network Proxy

The Kubernetes network proxy (`kube-proxy`) can be configured to run in [different operating modes](https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies). If the default `iptables` mode is not appropriate, then this can also be configured to use the `userspace` or [(experimental) `ipvs`](https://github.com/kubernetes/kubernetes/tree/master/pkg/proxy/ipvs) modes.

```yaml
kube_proxy:
  mode: ipvs
```

- `mode` - one of `userspace`, `iptables` (default) or `ipvs` (experimental)

### External Addons

It's possible to load external addons from custom paths by defining `addon_paths`. Paths are relative to the `cluster.yml`.

```yaml
addon_paths:
  - "./myaddons"
```