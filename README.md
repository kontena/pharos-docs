# Kontena Pharos

> The simple, solid, certified Kubernetes distribution that just works.

![Lens Dashboard](/images/lens-dashboard.png)

We believe setting up and maintaining a complex platform like Kubernetes from scratch is not where the race is won. Just like with Linux, building it once is a good educational experience but not for real use. Kontena Pharos is the complete, maintained and certified Kubernetes distribution that works on-premises, on any cloud and beyond!

## Easy to Install, Maintain and Extend

Kontena Pharos is always up-to-date and built from the latest upstream Kubernetes, including a standardized set of essential features. It is easy to install and maintain with the dedicated CLI tool. The standard deployment may be extended with ready made [add-ons](addons/README.md) for most common use cases, or any extras from the Kubernetes ecosystem!

## Open Source, Support Available

Kontena Pharos is made available with open core licensing model. The core contains all essential features and is 100% open source on [Github](https://github.com/kontena/pharos-cluster) under Apache 2 license. You can use it for free, for any purpose. For businesses, we offer [commercial version](https://kontena.io/pharos/#pricing) with more functionality under [Kontena License](https://github.com/kontena/pharos-cluster/blob/master/licenses/KONTENA.md). Compare [Kontena Pharos editions](editions.md). 

## Features

- **[Kubernetes Kernel](https://github.com/kubernetes/kubernetes)**: v1.13.4
- **Supported Cluster Upgrade Strategies:** rolling (zero-downtime)*, instant
- **Supported Infrastructure:** private datacenter, public cloud, hybrid, edge
- **Supported Machine Types:** bare metal, VM
- **Supported Machine Architectures:** Intel (x86-64), ARM (ARM64)
- **Supported Host Operating Systems:** [CentOS, Debian, Redhat, Ubuntu](requirements.md)
- **Supported Cluster Data Store Options:** in-cluster elastic etcd with TLS, external [etcd](https://coreos.com/etcd/) with TLS
- **Supported Control Plane Availability Options:** single master, multi-master
- **Supported Workload Isolation Options:** worker nodes only, all nodes
- **Supported Container Runtimes:** [docker](https://mobyproject.org/), [cri-o](http://cri-o.io/)
- **Supported CNI Plugins:** weave, calico, custom
- **Supported Storage Providers:** [Kontena Storage](addons/kontena-storage.md)*, AWS, GCP, Azure, OpenStack, VMWare, Custom
- **Built-In Security Conformance:** [CIS security benchmark](https://www.cisecurity.org/benchmark/kubernetes/), [NIST SP 800-190](https://csrc.nist.gov/publications/detail/sp/800-190/final)
- **Built-In Security Features:** [RBAC](https://kubernetes.io/docs/admin/authorization/rbac/), [pod security policies](https://kubernetes.io/docs/concepts/policy/pod-security-policy/), [network policies](https://kubernetes.io/docs/concepts/services-networking/network-policies/), [cluster firewall](networking/firewalld.md), [host OS security updates](addons/host-upgrades.md), [cert-manager](addons/cert-manager.md), air gapped setup option*
- **Built-In Networking Features:** [ingress-nginx](addons/ingress-nginx.md), [Kontena Network Loadbalancer](addons/kontena-network-lb.md)*
- **Built-In Applications Management Features:** [Helm](addons/helm.md)
- **Built-In Management UI:** [Kontena Lens](addons/kontena-lens.md)*
- **Built-In Backup & Disaster Recovery Features:** [Kontena Backups](addons/kontena-backup.md)*
- **Source Code:** available on [Github](https://github.com/kontena/pharos-cluster/)

(*) [Kontena Pharos PRO edition](editions.md) feature. 

## Documentation License

![by-nc-sa](https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png)

This documentation is licensed under a [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-nc-sa/4.0/)
