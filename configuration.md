# Kontena Pharos Cluster Configuration

Kontena Pharos cluster configuration is described in a file that is in [YAML](http://yaml.org/) format. You can create and modify these files using your favorite text editor. The default name for this file is `cluster.yml`, although other file names could be used.

**Learn more:**

* [Configuration File Reference](#configuration-file-reference)
  * [hosts](#hosts) - Specify cluster machines
  * [api](#api) - Specify Kubernetes API endpoint
  * [network](#network) - Specify networking options
  * [etcd](#etcd) - Specify external etcd.
  * [authentication](#authentication) - Specify webhook token authentication
  * [audit](#audit) - Specify audit webhook for external audit events collection
  * [cloud](#cloud) - Specify cloud provider
  * [kube_proxy](#kube_proxy) - Specify Kubernetes network proxy
  * [telemetry](#telemetry) - Telemetry options
  * [addons](#addons) - Specify add-ons and their configuration options
  * [addon_paths](#addon_paths) - Specify path for custom add-ons
* [Examples](#examples)

## Configuration File Reference

The complete `cluster.yml` file may look something like this:

```yaml
hosts:
  - address: 1.1.1.1
    private_interface: eth1
    user: root
    ssh_key_path: ~/.ssh/my_key
    role: master
    container_runtime: cri-o
  - address: 2.2.2.2
    private_interface: eth1
    role: worker
    container_runtime: cri-o
    labels:
      disk: hdd
  - address: 3.3.3.3
    private_address: 10.10.1.3
    role: worker
    container_runtime: cri-o
    labels:
      disk: ssd
network:
  dns_replicas: 3
  service_cidr: 10.96.0.0/12
  pod_network_cidr: 10.32.0.0/12
  provider: weave
  trusted_subnets:
    - 10.10.0.0/16
authentication:
  token_webhook:
    config:
      cluster:
        name: token-reviewer
        server: http://localhost:9292/token
        certificate_authority: /path/to/ca.pem
      user:
        name: kube-apiserver
        client_key: /path/to/key.pem
        client_certificate: /path/to/cert.pem
    cache_ttl: 5m
audit:
  server: "http://webhook.site/c700f7c0-cf9e-4a2b-b110-8777809b520b"
kube_proxy:
  mode: ipvs
addons:
  ingress-nginx:
    enabled: true
    node_selector:
      # only provision to nodes having the label "zone: dmz"
      zone: dmz
    configmap:
      # see all supported options: https://github.com/kubernetes/ingress-nginx/blob/master/docs/user-guide/configmap.md
      load-balance: least_conn
  cert-manager:
    enabled: true
    issuer:
      name: letsencrypt-staging
      server: https://acme-staging.api.letsencrypt.org/directory
      email: me@domain.com
  host-upgrades:
    enabled: true
    interval: 7d
  kured:
    enabled: true
```

In this section, we will list all supported configuration options for Kontena Pharos cluster configuration files.

### `hosts`

Specify cluster machines. For example:

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

The supported configuration options: 

- `address` - IP address or hostname
- `role` - One of `master`, `worker`
- `private_address` - Private IP address or hostname. Prefered for cluster's internal communication where possible (optional)
- `private_interface` - Discover `private_address` from the configured network interface (optional)
- `user` - Username with sudo permission to use for logging in
- `ssh_key_path` - A local file path to an ssh private key file (default `~/.ssh/id_rsa`)
- `container_runtime` - One of `docker`, `cri-o` (default `docker`)
- `labels` - A list of `key: value` pairs to assign to the host (optional)
- `taints` - A list of taint objects with `key`, `effect` and optional `value`. See [examples](#using-node-taints) below for more details.
- `http_proxy` - A http(s) proxy address that is used for downloading packages & container images

### `api`

Specify Kubernetes API endpoint. For example:

```yaml
api:
  endpoint: api-lb.mydomain.com
```

The supported configuration options:

- `endpoint` - External endpoint address for Kubernetes API (eg loadbalancer or DNS)

### `network`

Specify networking options. For example:

```yaml
network:
  provider: weave
  service_cidr: 172.31.0.0/16
  pod_network_cidr: 172.32.0.0/16
  weave:
    trusted_subnets:
      - 10.10.0.0/16
```

The supported configuration options:

* `provider` - Select the network backend to use. Supported providers: `weave` (default), `calico`
* `service_cidr` - IP address range for service VIPs. (default `10.96.0.0/12`)
* `pod_network_cidr` - IP address range for the pod network. (default `10.32.0.0/12`)
* `weave` - Provide additional configuration options if `weave` is selected as networking provider. The supported configuration options:
  * `trusted_subnets` - Array of trusted subnets where overlay network can be used without IPSEC (optional)
* `calico` - Provide additional configuration options if `calico` is selected as networking provider. The supported configuration options:
  * `ipip_mode` - configure usage of IP-IP tunneling for traffic between nodes, see [Calico docs](https://docs.projectcalico.org/v3.1/usage/configuration/ip-in-ip). Supported options: `Never`, `CrossSubnet`, `Always` (default)

### `etcd`

Specify external [etcd](https://github.com/etcd-io/etcd). By default, Kontena Pharos will create in-cluster etcd. This configuration option is used to describe external etcd (in-cluster etcd will be disabled). For example:

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

The supported configuration options:

- `endpoints` - array of etcd cluster endpoints
- `certificate` - path to etcd client certificate
- `key` - path to etcd client certificate key
- `ca_certificate` - path to etcd client ca certificate

You need to specify all etcd peer endpoints in the list. Certificate and corresponding key is used to authenticate the access to etcd. The paths used are relative to the path where the `cluster.yml` file was loaded from.

### `authentication`

Specify [Webhook Token Authentication](https://kubernetes.io/docs/admin/authentication/#webhook-token-authentication). For example:

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

### `audit`

Specify audit webhook for external audit events collection. For example:

```yaml
audit:
  server: "http://audit.example.com/webhook"
```

The supported configuration options:

- `server` - audit webhook receiver URL

Audit events are delivered in batched mode, multiple events in one webhook `POST` request. Currently audit events are configured to be emitted at `Metadata` level. See: https://github.com/kubernetes/community/blob/master/contributors/design-proposals/api-machinery/auditing.md#levels

### `cloud`

Specify cloud provider. Kontena Pharos supports a concept of [cloud providers](https://kubernetes.io/docs/getting-started-guides/scratch/#cloud-provider). Cloud provider is a module that provides an interface for managing load balancers, nodes (i.e. hosts) and networking routes. Optionally you can also configure the path to the cloud provider configuration file. For example:

```yaml
cloud:
  provider: openstack
  config: ./cloud-config
```

The supported configuration options:

* `provider` - specify used cloud provider (default: no cloud provider)
* `config` - path to provider specific cloud configuration file (default: no configuration file)

See [using cloud providers](#using-cloud-providers) below for more details.

### `kube_proxy`

Specify Kubernetes network proxy (`kube-proxy`). The proxy may be configured to run in [different operating modes](https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies). If the default `iptables` mode is not appropriate, then this can also be configured to use the `userspace` or [(experimental) `ipvs`](https://github.com/kubernetes/kubernetes/tree/master/pkg/proxy/ipvs) modes.

```yaml
kube_proxy:
  mode: ipvs
```

The supported configuration options:

* `mode` - one of `userspace`, `iptables` (default) or `ipvs` (experimental)

### `telemetry`

To continuously improve the Kontena Pharos experience, the Kontena Pharos telemetry cronjob reports usage data to Kontena, Inc. This data is used to monitor the reliability of Kontena Pharos internal components and installations and to find out which features are most popular. This telemetry data is very helpful to us, so we hope that you will leave it enabled.

```yaml
telemetry:
  enabled: true
```

The supported configuration options:

* `enabled` - `true` (default) or `false`

**Telemetry payload:**

```json
{
    "kube_version": "<kubernetes version>",
    "pharos_version": "<pharos version>",
    "customer_token": "<token to identify paying customers>"
}
```

### `addons`

Specify add-ons and their configuration options. [Learn more about add-ons](/addons/README.md).

### `addon_paths`

Specify path for custom add-ons. [Learn more about add-ons](/addons/README.md).



## Examples

### Using Node Taints

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



### Using Cloud Providers

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

