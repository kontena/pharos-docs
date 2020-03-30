# System Requirements

## Minimum System Requirements

The minimum size for a cluster is 1 machine (node). In this case, a single machine will act as control plane (master) and will accept container workloads (worker). This kind of setup might work well for testing purposes, but might be too limited for production.

In the ideal world, master and worker nodes are separated. It is also possible to create multi-master setups for high availability cluster deployments. When Pharos cluster is installed and running, it will consume some amount of system resources. See below the minimum system requirements:

* **Master Nodes**: 2GB of memory, 40GB disk
* **Worker Nodes**: 2GB of memory, 40GB disk

**Note!** The system requirements listed in here are just bare minimum for getting the Pharos cluster up and running. In reality, the amount of memory and disk required is based on the use case and actual workloads.

## Supported Machines & Operating Systems

Pharos cluster may be run on any machine (bare metal or virtual) that is capable of running one of the following operating systems on any of the supported architectures:

| Operating System                  | Architectures
|:----------------------------------|:------------------------------------------------
| CentOS 7.x                        | [x86-64](https://en.wikipedia.org/wiki/X86-64)
| Debian 9                          | [x86-64](https://en.wikipedia.org/wiki/X86-64), [ARM64](https://en.wikipedia.org/wiki/ARM_architecture)
| Ubuntu 16.04 & 18.04              | [x86-64](https://en.wikipedia.org/wiki/X86-64), [ARM64](https://en.wikipedia.org/wiki/ARM_architecture)

## Network

### Required Open Ports

The following ports are used by the `pharos` management tool, as well as between nodes in the same cluster. These ports are all authenticated, and can safely be left open for public access if desired.

| Protocol    | Port        | Service         | Direction               | Notes
|-------------|-------------|-----------------|-------------------------|-------
| TCP         | 22          | SSH             | CLI => Host             | authenticated management channel for `pharos` operations using SSH keys
| TCP         | 2379        | etcd clients    | Master <=> Master `*`   | authenticated etcd client API using TLS client certs
| TCP         | 2380        | etcd peers      | Master <=> Master `*`   | authenticated etcd peers API using TLS client certs
| TCP         | 6443        | kube-apiserver  | Worker, CLI => Master   | authenticated kube API using kube TLS client certs, ServiceAccount tokens with RBAC
| TCP         | 6783        | weave control   | Host <=> Host `*`       | authenticated Weave peer control connections using the shared weave secret
| UDP         | 6783        | weave dataplane | Host <=> Host `*`       | authenticated Weave `sleeve` fallback using the shared weave secret
| UDP         | 6784        | weave dataplane | Host <=> Host (trusted) `*` | unauthenticated Weave `fastdp` (VXLAN), only used for peers on `network.trusted_subnets` networks
| ESP (IPSec) |             | weave dataplane | Host <=> Host `*`       | authenticated Weave `fastdp` (IPsec encapsulated UDP port 6784 VXLAN) using IPSec SAs established over the control channel
| TCP         | 10250       | kubelet         | Master, Worker => Host `*` | authenticated kubelet API for the master node `kube-apiserver` (and `heapster`/`metrics-server` addons) using TLS client certs

If using the `ingress-nginx` addon, then TCP ports 80/443 on the worker nodes (or nodes matching `addons.ingress-nginx.node_selector`) must also be opened for public access.

- `*` - public access is blocked if [firewalld](networking/README.md#firewalld) is enabled (with default rules)

### Monitoring Ports

The following ports serve unauthenticated monitoring/debugging information, and are either disabled, limited to localhost-only or only expose relatively harmless information.

| Protocol    | Port        | Service               | Hosts   | Status          | Notes
|-------------|-------------|-----------------------|---------|-----------------|-------
| TCP         | 6781        | weave-npc metrics     | All     | **OPEN** `*`    | unauthenticated `/metrics`
| TCP         | 6782        | weave metrics         | All     | **OPEN** `*`    | unauthenticated `/metrics`
| TCP         | 10248       | kubelet               | All     | localhost-only  | ?
| TCP         | 10249       | kube-proxy metrics    | All     | localhost-only  | ?
| TCP         | 10251       | kube-scheduler        | Master  | localhost-only  | ?
| TCP         | 10252       | kube-controller       | Master  | localhost-only  | ?
| TCP         | 10255       | kubelet read-only     | All     | *disabled*      | unauthenticated read-only `/pods`, various stats metrics
| TCP         | 10256       | kube-proxy healthz    | All     | **OPEN** `*`    | unauthenticated `/healthz`
| TCP         | 18080       | ingress-nginx status  | Workers | **OPEN** `*`    | unauthenticated `/healthz`, `/nginx_status` and default backend

- `*` - public access is blocked if [firewalld](networking/README.md#firewalld) is enabled (with default rules)

These ports should be restricted from external access to prevent information leaks.

### Restricted Ports

The following restricted services are only accessible via localhost the nodes, and must not be exposed to any untrusted access.

| Protocol    | Port        | Service               | Hosts   | Status          | Notes
|-------------|-------------|-----------------------|---------|-----------------|------
| TCP         | 6784        | weave control         | All     | localhost-only  | unauthenticated weave control API
