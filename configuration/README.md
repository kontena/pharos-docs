# Kontena Pharos Cluster Configuration

Kontena Pharos cluster configuration is described in a file that is in [YAML](http://yaml.org/) format. You can create and modify these files using your favorite text editor. The default name for this file is `cluster.yml`, although other file names could be used. The configuration can include [ERB templating code](#erb-templating) when the filename ends with `.erb`.

**Learn more:**

* [Configuration File Reference](#configurationfilereference)
  * [addons](#addons) - Specify add-ons and their configuration options
  * [addon_paths](#addonpaths) - Specify path for custom add-ons
  * [admission_plugins](#admissionplugins) - Enable / disable admission plugins
  * [api](#api) - Specify Kubernetes API endpoint
  * [audit](#audit) - Specify audit webhook for external audit events collection
  * [authentication](#authentication) - Specify webhook token authentication
  * [cloud](#cloud) - Specify cloud provider
  * [container_runtime](#containerruntime) - Specify container runtime settings
  * [control_plane](#controlplane) - Specify control plane settings
  * [etcd](#etcd) - Specify external etcd.
  * [hosts](#hosts) - Specify cluster machines
  * [kubelet](#kubelet) - Specify kubelet options
  * [kube_proxy](#kubeproxy) - Specify Kubernetes network proxy
  * [name](#name) - Specify cluster name
  * [network](#network) - Specify networking options
  * [pod_security_policy](#podsecuritypolicy) - Specify pod security policy settings
  * [telemetry](#telemetry) - Telemetry options
* [Examples](#examples)

## Configuration File Reference

The complete `cluster.yml` reference:

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
    user: root
    ssh_key_path: ~/.ssh/my_key
    role: worker
#   - address: 3.3.3.3
#     private_address: 10.10.1.3
#     private_interface: eth1
#     role: master
#     user: root
#     ssh_key_path: ~/.ssh/id_rsa
#     ssh_port: 22
#     ssh_proxy_command: ""
#     container_runtime: docker
#     labels: {}
#     taints: []
#     environment: {}
#     bastion:
#       address: 3.3.3.3
#       user: root
#       ssh_key_path: ~/.ssh/id_rsa
#       ssh_port: 22
# name: prod-pharos-cluster
# network:
#   provider: weave
#   dns_replicas: 3
#   node_local_dns_cache: true
#   service_cidr: 10.96.0.0/12
#   pod_network_cidr: 10.32.0.0/12
#   firewalld:
#     enabled: false
#     open_ports: []
#     trusted_subnets: []
#   weave:
#     trusted_subnets: []
#     known_peers: []
#     password: "./path/to/password_file"
#     ipalloc_default_subnet: 10.33.0.0/16
#     no_masq_local: false
#   calico:
#     ipip_mode: Always
#     nat_outgoing: true
#     environment: {}
#     mtu: 1500
#   custom:
#     manifest_path: "./path/to/manifests"
#     options: {}
# etcd:
#   endpoints: []
#   certificate: "./path/to/cert"
#   ca_certificate: "./path/to/ca"
#   key: "./path/to/key"
# authentication:
#   token_webhook:
#     config:
#       cluster:
#         name: token-reviewer
#         server: http://localhost:9292/token
#         certificate_authority: /path/to/ca.pem
#       user:
#         name: kube-apiserver
#         client_key: /path/to/key.pem
#         client_certificate: /path/to/cert.pem
#     cache_ttl: 5m
#   oidc:
#     issuer_url: ""
#     client_id: ""
#     username_claim: ""
#     username_prefix: ""
#     groups_claim: ""
#     groups_prefix: ""
#     ca_file: ""
# cloud:
#   provider: ""
#   config: ""
# audit:
#   file:
#     path: /var/log/kube_audit/audit.json
#     max_size: 100
#     max_age: 30
#     max_backups: 20
#   webhook:
#     server: "http://webhook.site/c700f7c0-cf9e-4a2b-b110-8777809b520b"
# kubelet:
#   read_only_port: false
#   feature_gates: {}
# kube_proxy:
#   mode: iptables
# control_plane:
#   use_proxy: false
#   feature_gates: {}
# telemetry:
#   enabled: true
# image_repository: "registry.pharos.sh/kontenapharos"
# pod_security_policy:
#   default_policy: "00-pharos-privileged"
# admission_plugins: []
# container_runtime:
#   insecure_registries: []
# addon_paths: []
# addons: {}
```

In this section, we will list all supported configuration options for Kontena Pharos cluster configuration files.

### `addons`

Specify add-ons and their configuration options. [Learn more about add-ons](/addons/README.md).

### `addon_paths`

Specify path for custom add-ons. [Learn more about add-ons](/addons/README.md).

### `admission_plugins`

Specify [admission plugins](https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers) used in Kubernetes API server.

> An admission controller is a piece of code that intercepts requests to the Kubernetes API server prior to persistence of the object, but after the request is authenticated and authorized.

By default Pharos comes with these plugins enabled:
- [PodSecurityPolicy](https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/#podsecuritypolicy)
- [NodeRestriction](https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/#noderestriction)
- [NamespaceLifecycle](https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/#namespacelifecycle)
- [LimitRanger](https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/#limitranger)
- [ServiceAccount](https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/#serviceaccount)
- [DefaultStorageClass](https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/#defaultstorageclass)
- [DefaultTolerationSeconds](https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/#defaulttolerationseconds)
- [MutatingAdmissionWebhook](https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/#mutatingadmissionwebhook)
- [ValidatingAdmissionWebhook](https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/#validatingadmissionwebhook)
- [ResourceQuota](https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/#resourcequota)
- [Priority](https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/#priority)


To enable a admission plugin, use:
```yaml
admission_plugins:
  - name: AlwaysPullImages
    enabled: true
```

To disable a admission plugin use:
```yaml
admission_plugins:
  - name: AlwaysPullImages
    enabled: false
```

**Note:** Pharos currently supports enabling/disabling only admission plugins that do **NOT** require any extra configuration.

### `api`

Specify Kubernetes API endpoint. For example:

```yaml
api:
  endpoint: api-lb.mydomain.com
```

The supported configuration options:

- `endpoint` - External endpoint address for Kubernetes API (eg loadbalancer or DNS)

### `audit`

 Currently audit events are configured to be emitted at `Metadata` level for both `file` and `webhook` backends. See: https://github.com/kubernetes/community/blob/master/contributors/design-proposals/api-machinery/auditing.md#levels

 By default Pharos configures file auditing.

#### `file`

Specify where audit logs are written on disk.

```yaml
audit:
  file:
    path: /var/log/kube_audit/audit.json
    max_size: 100
    max_age: 30
    max_backups: 20
```

The supported configuration options:

- `path` - path of the file where audit logs are written (default `/var/log/kubernetes/audit.json`)
- `max_size` - defines the maximum size in megabytes of the audit log file before it gets rotated (default `100`)
- `max_age` - defines the maximum number of days to retain old audit log files (default `30`)
- `max_backups` - defines the maximum number of audit log files to retain (default `20`)

The defaults mean, that audit logs might consume ~2GB of disk space.

#### `webhook`

Specify audit webhook for external audit events collection. For example:

```yaml
audit:
  webhook:
    server: "http://audit.example.com/webhook"
```

The supported configuration options:

- `server` - audit webhook receiver URL

Audit events are delivered in batched mode, multiple events in one webhook `POST` request.

### `authentication`

Specify [authentication](authentication.md) configuration. For example:

```yaml
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
```


### `cloud`

Specify cloud provider. Kontena Pharos supports a concept of [cloud providers](cloud_providers/README.md). Cloud provider is a module that provides an interface for managing load balancers, nodes (i.e. hosts) and networking routes. Optionally you can also configure the path to the cloud provider configuration file. For example:

```yaml
cloud:
  provider: openstack
  config: ./cloud-config
```

### `container_runtime`

Container runtime specific configuration options. For example:

```yaml
container_runtime:
  insecure_registries:
    - "registry.acme.local:5000"
```

The supported configuration options:

- `insecure_registries` - array of insecure registry addresses

### `control_plane`

Configure control plane settings.

```yaml
control_plane:
  use_proxy: true
  feature_gates:
    CSIDriverRegistry: true
    CSINodeInfo: true
```

The supported configuration options:

- `use_proxy` - set to true to configure the control plane to use proxy settings from host environment
- `feature_gates` - specify [feature gates](https://kubernetes.io/docs/reference/command-line-tools-reference/feature-gates/) used in Kubernetes control plane components

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
- `ssh_port` - Host's ssh port (default: `22`)
- `ssh_proxy_command` - Specifies the command to use to connect to the host. In the command string, `%h` will be substituted by the host name to connect and `%p` by the port. See [example](#bastion_jump-host-configuration)
- `container_runtime` - One of `docker`, `cri-o` or `custom_docker`. (default `docker`). With `custom_docker` Pharos will NOT configure the container runtime at all, it is expected that Docker is already configured on the host(s).
- `labels` - A list of `key: value` pairs to assign to the host (optional)
- `taints` - A list of taint objects with `key`, `effect` and optional `value`. See [examples](#using-node-taints) below for more details.
- `http_proxy` - A http(s) proxy address that is used for downloading packages & container images
- `bastion` - A bastion (proxy) configuration used to connect to the host. If bastion is specified for a `master` host then also Kubernetes API calls are proxied through bastion ssh tunnel
    - `address` - IP address or hostname
    - `user` - Username for ssh connection
    - `ssh_key_path` - A local file path to an ssh private key file (default `~/.ssh/id_rsa`)
    - `ssh_port` - Host's ssh port (default: `22`)
- `repositories` - A list of custom package repositories to use. See [repositories](#repositories) for details.

##### `repositories`

A list of custom package repositories to use

```yaml
repositories:
  - name: foofoo.list
    key_url: https://example.com/key
    contents: |
      deb https://dl.bintray.com/kontena/pharos-debian stretch main
```

- `name` - Name of the repository
- `key_url` - URL where to download and configure the repository key from (optional)
- `contents` - Contents of the package repository configuration. Consult your OS distribution documentation for details.

### `name`

Specify the name of the cluster. If not specified, a generated name will be used.

### `network`

Specify [networking](../networking/README.md) options. For example:

```yaml
network:
  provider: weave
  node_local_dns_cache: true
  service_cidr: 172.30.0.0/16
  pod_network_cidr: 172.31.0.0/16
  firewalld:
    enabled: true
  weave:
    trusted_subnets:
      - 10.10.0.0/16
```

### `kubelet`

Specify [kubelet](https://kubernetes.io/docs/reference/glossary/?fundamental=true#term-kubelet) configuration options.
```yaml
kubelet:
  read_only_port: false
  feature_gates:
    CSIDriverRegistry: true
    CSINodeInfo: true
  extra_args: []
  cpu_cfs_quota: true
  cpu_cfs_quota_period: 10ms
```

The supported configuration options:

* `read_only_port` - when set to `true` will open read-only port `10255` for the Kubelet to serve on with no authentication/authorization. Defaults to `false`, i.e. port 10255 **NOT** open.
* `feature_gates` - specify [feature gates](https://kubernetes.io/docs/reference/command-line-tools-reference/feature-gates/) used in kubelet configuration.
* `extra_args` - extra arguments for kubelet.
* `cpu_cfs_quota` - Enable CPU CFS quota enforcement for containers that specify CPU limits. `true` by default.
* `cpu_cfs_quota_period` - CFS period, i.e. how often the CPU quota is enforced. `100ms` by default.

**Note**: If you enable the Kubelet read-only port you may allow un-authorized access to sensitive data. Make sure you use other means, such as network level firewalls for example, to prevent un-wanted access.

#### CFS Quota

By default the CFS quota settings in Linux & Kubernetes are pretty agressive and might result in aggressive CPU throttling in applications. If running trusted workloads it might be best to completely disable the quota as discussed in [this](https://github.com/kubernetes/kubernetes/issues/51135) issue. The CFS period depends on the application requirements but generally `5ms` seems to be good generic period for low latency applications as per discussion in [this](https://github.com/kubernetes/kubernetes/issues/67577) issue.

**Note:** Setting these on existing cluster will not affect existing pods, the changed settings are applied only for newly created pods.

### `kube_proxy`

Specify Kubernetes network proxy (`kube-proxy`). The proxy may be configured to run in [different operating modes](https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies). If the default `iptables` mode is not appropriate, then this can also be configured to use the `userspace` or [(experimental) `ipvs`](https://github.com/kubernetes/kubernetes/tree/master/pkg/proxy/ipvs) modes.

```yaml
kube_proxy:
  mode: ipvs
```

The supported configuration options:

* `mode` - one of `userspace`, `iptables` (default) or `ipvs` (experimental)

### `pod_security_policy`

Specify the default [pod security policy](https://kubernetes.io/docs/concepts/policy/pod-security-policy/). Built-in policies are:

- `00-pharos-privileged` - no restrictions (default), always used for kubernetes/pharos system level pods
- `99-pharos-restricted` - no host namespace and root rights

```yaml
pod_security_policy:
  default_policy: "00-pharos-privileged"
```

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
    "uuid": "<cluster identifier>",
    "kube_version": "<kubernetes version>",
    "pharos_version": "<pharos version>",
    "customer_token": "<token to identify paying customers>",
    "license_token": "<token to identify license for the paying customer>",
    "master_node_count": "<number of master nodes in the cluster>",
    "worker_node_count": "<number of worker nodes in the cluster>"
}
```

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

### Configuring HTTP/HTTPS/FTP proxies

To configure a host to use a proxy for making http/https/ftp connections, use the `environment:` keyword in [host configuration](#hosts). This can also be used to set the `NO_PROXY` variable for addresses or domains for which connections should bypass the proxy. Note that some software expect the variable names in lower case and some in UPPER CASE, so you may need to set both variants.

```yaml
hosts:
  - address: 1.1.1.1
    private_interface: eth1
    user: root
    ssh_key_path: ~/.ssh/my_key
    role: master
    environment:
      http_proxy: http://user:password@proxy-server.example.com:3128
      HTTP_PROXY: http://user:password@proxy-server.example.com:3128
      NO_PROXY: localhost,127.0.0.1,docker-registry.example.com
```

### Bastion/Jump Host Configuration

Bastion (aka jump host) configuration is needed if a host is behind a private network and cannot be accessed directly from the `pharos` tool.

```yaml
hosts:
  - address: 10.10.1.1
    user: root
    ssh_key_path: ~/.ssh/my_key
    ssh_proxy_command: ssh -i ~/.ssh/my_key -W %h:22 root@example.bastion.host.com
    role: master
```

See ssh config [man page](https://linux.die.net/man/5/ssh_config) for more info.

### ERB templating

It's possible to use [ERB code](https://en.wikipedia.org/wiki/ERuby) in the configuration file when the configuration filename ends in `.erb`.

```yaml
# cluster.yml.erb
hosts:
# Configure 20 nodes
  <%- (100..120).each do |ip_d| -%>
  - address: 10.0.0.<%= ip_d %>
    user: root
    ssh_key_path: ~/.ssh/my_key
# The first 5 are masters
    role: <%= ip_d < 105 ? 'master' : 'worker' %>
    environment:
# The proxy configuration is copied from local machine.
      <%- ENV.select { |k,_| k.downcase.end_with?('_proxy') }.each do |key, value| -%>
      <%= key %>: <%= value %>
      <%- end -%>
  <%- end -%>
```
