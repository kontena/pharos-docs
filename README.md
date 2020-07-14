# Pharos

> The simple, solid, certified Kubernetes distribution that just works.

We believe setting up and maintaining a complex platform like Kubernetes from scratch is not where the race is won. Just like with Linux, building it once is a good educational experience but not for real use. Pharos is the complete, maintained and certified Kubernetes distribution that works on-premises, on any cloud and beyond!

## Easy to Install, Maintain and Extend

Pharos is always up-to-date and built from the latest upstream Kubernetes, including a standardized set of essential features. It is easy to install and maintain with the dedicated CLI tool. The standard deployment may be extended with [Helm](https://helm.sh) charts or any custom Kubernetes yaml resources!

## Features

- **Kubernetes Kernel:** [v1.18](https://kubernetes.io/blog/2019/12/09/kubernetes-1-17-release-announcement/)
- **Supported Cluster Upgrade Strategies:** Rolling (zero-downtime), Instant
- **Supported Infrastructure:** Private datacenter, Public cloud, Hybrid, Edge
- **Supported Machine Types:** Bare metal, VM
- **Supported Machine Architectures:** Intel (x86-64), ARM (ARM64)
- **Supported Host Operating Systems:** [CentOS, Debian, Redhat, Ubuntu](requirements.md)
- **Supported Cluster Data Store Options:** In-cluster elastic etcd with TLS, External etcd with TLS
- **Supported Control Plane Availability Options:** Single master, Multi-master
- **Supported Container Runtimes:** [Docker](https://www.docker.com/products/container-runtime), [containerd](https://containerd.io/)
- **Supported CNI Plugins:** Weave, Calico, [Custom](networking/custom_networking.md)
- **Supported Storage Providers:**
  - **Public Cloud:** AWS, GCP, Azure, Custom
  - **Private Cloud / On-Premises:** OpenStack, VMWare VSphere, Custom
- **Built-In Security Conformance:** [CIS security benchmark](https://www.cisecurity.org/benchmark/kubernetes/), [NIST SP 800-190](https://csrc.nist.gov/publications/detail/sp/800-190/final)
- **Built-In Security Features:** [RBAC](https://kubernetes.io/docs/admin/authorization/rbac/), [Pod security policies](https://kubernetes.io/docs/concepts/policy/pod-security-policy/), [Network policies](https://kubernetes.io/docs/concepts/services-networking/network-policies/), [Cluster firewall (firewalld)](networking/firewalld.md)
- **Built-In Networking Features:**
  - **Hybrid / Edge:** Intelligent Network Mesh, Multi-cluster Networking
- **Built-In Applications Management Features:** [Helm](https://helm.sh/)
- **Built-In Metrics:** [Metrics Server](https://github.com/kubernetes-sigs/metrics-server)
- **Source Code:** Available on [Github](https://github.com/kontena/pharos-cluster/)

## Open Source

Pharos is 100% open source.

## Documentation License

![by-nc-sa](https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png)

This documentation is licensed under a [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-nc-sa/4.0/)
