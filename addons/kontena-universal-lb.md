# Addon: Kontena Universal Loadbalancer

Kontena Universal Loadbalancer is a load balancer service implementation for Kubernetes. It can work in any environment which makes it suitable for many use cases. And it's super light-weight too. It is implemented as an operator that reacts when it sees `type: LoadBalancer` services in the cluster.

- version: `0.1.1`
- maturity: `alpha`
- architectures: `x86-64`, `ARM64`
- available in: `Pro`

## Concepts

Kontena Universal Loadbalancer exposes in-cluster `LoadBalancer` services as node `hostPorts` using `DaemonSets`. The operator naturally also syncs the addresses for the services. This essentially makes the `LoadBalancer` type services behave pretty much like `NodePort` services. The drawback with `NodePort` services is that we're not able to use additional components such as [ExternalDNS](https://github.com/kubernetes-incubator/external-dns) and others.

Kontena Network Loadbalancer is built on top of [Akrobateo](https://github.com/kontena/akrobateo/).


## Configuration

```yaml
addons:
  kontena-universal-lb:
    enabled: true
```
