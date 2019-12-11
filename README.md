# Kontena Pharos

> The simple, solid, certified Kubernetes distribution that just works. Deploy and run containers at any scale on any infrastructure. All batteries included.

![Kontena Lens Dashboard](https://www.kontena.io/images/lens/screenshot.png)

We believe setting up and maintaining a complex platform like Kubernetes from scratch is not where the race is won. Just like with Linux, building it once is a good educational experience but not for real use. Kontena Pharos is the complete, maintained and certified Kubernetes distribution that works on-premises, on any cloud and beyond!

## Easy to Install, Maintain and Extend

Kontena Pharos is always up-to-date and built from the latest upstream Kubernetes, including a standardized set of essential features. It is easy to install and maintain with the dedicated CLI tool. The standard deployment may be extended with ready made [add-ons](addons/README.md) for most common use cases, or any extras from the Kubernetes ecosystem!

## Open Source, Support Available

Kontena Pharos is made available with open core licensing model. The core contains all essential features and is 100% open source on [Github](https://github.com/kontena/pharos-cluster) under Apache 2 license. You can use it for free, for any purpose. For businesses, we offer [commercial version](https://kontena.io/pharos/#pricing) with more functionality under [Kontena License](https://github.com/kontena/pharos-cluster/blob/master/licenses/KONTENA.md). Compare [Kontena Pharos editions](editions.md).

## Features

- **Kubernetes Kernel:** [v1.14.9](https://github.com/kubernetes/kubernetes)
- **Supported Cluster Upgrade Strategies:** Rolling (zero-downtime), Instant
- **Supported Infrastructure:** Private datacenter, Public cloud, Hybrid, Edge
- **Supported Machine Types:** Bare metal, VM
- **Supported Machine Architectures:** Intel (x86-64), ARM (ARM64)
- **Supported Host Operating Systems:** [CentOS, Debian, Redhat, Ubuntu](requirements.md)
- **Supported Cluster Data Store Options:** In-cluster elastic etcd with TLS, External etcd with TLS
- **Supported Control Plane Availability Options:** Single master, Multi-master
- **Supported Workload Isolation Options:** Worker nodes only, All nodes
- **Supported Container Runtimes:** [Docker](https://mobyproject.org/), [CRI-O](http://cri-o.io/)
- **Supported CNI Plugins:** Weave, Calico, [Custom](networking/custom_networking.md)
- **Supported Storage Providers:**
  - **Public Cloud:** AWS, GCP, Azure, Custom
  - **Private Cloud / On-Premises:** [Kontena Storage (rook/ceph)](addons/kontena-storage.md)*, OpenStack, VMWare VSphere, Custom
- **Built-In Security Conformance:** [CIS security benchmark](https://www.cisecurity.org/benchmark/kubernetes/), [NIST SP 800-190](https://csrc.nist.gov/publications/detail/sp/800-190/final)
- **Built-In Security Features:** [RBAC](https://kubernetes.io/docs/admin/authorization/rbac/), [Pod security policies](https://kubernetes.io/docs/concepts/policy/pod-security-policy/), [Network policies](https://kubernetes.io/docs/concepts/services-networking/network-policies/), [Cluster firewall (firewalld)](networking/firewalld.md), [Host OS security updates](addons/host-upgrades.md), [Cert-manager](addons/cert-manager.md), Air gapped setup supported
- **Built-In Networking Features:**
  - **Public Cloud:** [Ingress-nginx](addons/ingress-nginx.md), AWS, GCP, Azure, Custom
  - **Private Cloud / On-Premises:** [Ingress-nginx](addons/ingress-nginx.md), [Kontena Network Loadbalancer (metallb)](addons/kontena-network-lb.md)*, [Kontena Universal Loadbalancer (akrobateo)](addons/kontena-universal-lb.md)&ast;, Custom
  - **Hybrid / Edge:** Intelligent Network Mesh, Multi-cluster Networking
- **Built-In Applications Management Features:** [Helm](https://helm.sh/)
- **Built-In Metrics:** Metrics Server, [Kontena Stats](addons/kontena-stats.md)*
- **Built-In Backup & Disaster Recovery Features:** [Kontena Backup (ark)](addons/kontena-backup.md)*
- **Source Code:** Available on [Github](https://github.com/kontena/pharos-cluster/)

(*) [Kontena Pharos PRO edition](editions.md) feature.

## Documentation License

![by-nc-sa](https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png)

This documentation is licensed under a [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-nc-sa/4.0/)
