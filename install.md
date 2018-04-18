# Installation

Pharos Cluster executable can be downloaded from [https://github.com/kontena/pharos-cluster/releases](https://github.com/kontena/pharos-cluster/releases). Binaries should work on any recent 64bit MacOS or Linux machine.

## Host Requirements

- Minimal Ubuntu 16.04 (amd64 / arm64) hosts with SSH access
- A user with passwordless sudo permission (`echo "$USER ALL=(ALL) NOPASSWD:ALL" | sudo tee /etc/sudoers.d/$USER`)

### Required Open Ports

The following ports are used by the `pharos-cluster` management tool, as well as between nodes in the same cluster. These ports are all authenticated, and can safely be left open for public access if desired.

| Protocol    | Port        | Service         | Hosts / Addon         | Notes
|-------------|-------------|-----------------|-----------------------|-------
| TCP         | 22          | SSH             | All                   | authenticated management channel for `pharos-cluster` operations using SSH keys
| TCP         | 2379        | etcd            | Master                | authenticated etcd client API
| TCP         | 2380        | etcd            | Master                | authenticated etcd peer API
| TCP         | 6443        | kube-apiserver  | Master                | authenticated kube API for `pharos-cluster`, `kubectl` and worker node `kubelet` access using kube API tokens, RBAC
| TCP         | 6783        | weave control   | All (weave)           | authenticated Weave peer control connections using the shared weave secret
| UDP         | 6783        | weave dataplane | All (weave)           | authenticated Weave `sleeve` fallback using the shared weave secret
| UDP         | 6784        | weave dataplane | All (weave)           | unauthenticated Weave `fastdp` (VXLAN), only used for peers on `network.trusted_subnets` networks
| ESP (IPSec) |             | weave dataplane | All (weave)           | authenticated Weave `fastdp` (IPsec encapsulated UDP port 6784 VXLAN) using IPSec SAs established over the control channel
| TCP         | 10250       | kubelet         | All                   | authenticated kubelet API for the master node `kube-apiserver` (and `heapster`/`metrics-server` addons) using TLS client certs

If using the `ingress-nginx` addon, then TCP ports 80/443 on the worker nodes (or nodes matching `addons.ingress-nginx.node_selector`) must also be opened for public access.

### Monitoring Ports

The following ports serve unauthenticated monitoring/debugging information, and are either disabled, limited to localhost-only or only expose relatively harmless information.

| Protocol    | Port        | Service               | Hosts   | Status          | Notes
|-------------|-------------|-----------------------|---------|-----------------|-------
| TCP         | 6781        | weave-npc metrics     | All     | **OPEN**        | unauthenticated `/metrics`
| TCP         | 6782        | weave metrics         | All     | **OPEN**        | unauthenticated `/metrics`
| TCP         | 10255       | kubelet read-only     | All     | *disabled*      | unauthenticated read-only `/pods`, various stats metrics
| TCP         | 10248       | kubelet               | All     | localhost-only  | ?
| TCP         | 10249       | kube-proxy metrics    | All     | localhost-only  | ?
| TCP         | 10251       | kube-scheduler        | Master  | localhost-only  | ?
| TCP         | 10252       | kube-controller       | Master  | localhost-only  | ?
| TCP         | 10256       | kube-proxy healthz    | All     | **OPEN**        | unauthenticated `/healthz`
| TCP         | 18080       | ingress-nginx status  | Workers | **OPEN**        | unauthenticated `/healthz`, `/nginx_status` and default backend

These ports should be restricted from external access to prevent information leaks.

### Restricted Ports

The following restricted services are only accessible via localhost the nodes, and must not be exposed to any untrusted access.

| Protocol    | Port        | Service               | Hosts   | Status          | Notes
|-------------|-------------|-----------------------|---------|-----------------|------
| TCP         | 6784        | weave control         | All     | localhost-only  | unauthenticated weave control API