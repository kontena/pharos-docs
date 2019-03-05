# Kontena Pharos

> The simple, solid, certified Kubernetes distribution that just works.

![features](https://kontena.io/images/pharos-features.svg)

## Overview

- **Stable foundation** for running Kubernetes at any scale.
- **Always up-to-date**, built from the latest upstream Kubernetes including a standardized set of essential features.
- **Extend with addons** of your own or from any Kubernetes ecosystem project.
- **Enterprise subscriptions** with SLA and support [available](https://kontena.io/pharos#pricing).

## Editions

|                       | OSS | Pro | EE |
| --------------------- | --- | --- | -- |
| License               | Apache 2  | Kontena | Kontena |
| Certified Kubernetes  | ●   | ●   | ● |
| Enhanced Security     | ●   | ●   | ● |
| High-Availability | ● | ● | ● |
| Support for x86-64 & ARM64 Architectures | ● | ● | ● |
| Docker & CRI-O Runtimes Available | ● | ● | ● |
| RBAC | ● | ● | ● |
| Pod Security Policies | ● | ● | ● |
| Cluster Firewall | ● | ● | ● |
| Cert-manager | ● | ● | ● |
| Ingress-NGINX | ● | ● | ● |
| Helm | ● | ● | ● |
| Automatic Host Security Updates | ● | ● | ● |
| Rolling Cluster Updates       | -   | ●   | ● |
| Kontena Lens          |     | ●   | ● |
| Kontena Backup        |     | ●   | ● |
| Kontena Storage       |     | ●   | ● |
| Kontena Network Loadbalancer |     | ●   | ● |
| Air Gapped Setup      |     | ●   | ● |
| Kontena Magneto       |     |     | ● |
| Multi-cluster Manager |     |     | ● |
| Custom License Management |     |     | ● |

## Features

- **[Kubernetes Kernel](https://github.com/kubernetes/kubernetes)**: v1.13.3
- **Cluster Upgrade Strategies:** rolling zero-downtime, instant
- **Supported Infrastructure:** private datacenter, public cloud, hybrid, edge
- **Supported Machine Types:** bare metal, VM
- **Supported Machine Architectures:** Intel (x86-64), ARM (ARM64)
- **Supported Host Operating Systems:** [CentOS, Debian, Redhat, Ubuntu](requirements.md)
- **Supported Cluster Data Store Options:** in-cluster elastic etcd with TLS, external [etcd](https://coreos.com/etcd/) with TLS
- **Supported Control Plane Availability Options:** single master, multi-master
- **Supported Workload Isolation Options:** worker nodes only, all nodes
- **Supported Container Runtimes:** [docker](https://mobyproject.org/), [cri-o](http://cri-o.io/)
- **Supported CNI Plugins:** weave, calico, custom 
- **Supported Storage Providers:** [Kontena Storage](addons/kontena-storage.md), AWS, GCP, Azure, OpenStack, VMWare, Custom
- **Security Conformance:** [CIS security benchmark](https://www.cisecurity.org/benchmark/kubernetes/), [NIST SP 800-190](https://csrc.nist.gov/publications/detail/sp/800-190/final)
- **Security Features:** [RBAC](https://kubernetes.io/docs/admin/authorization/rbac/), [pod security policies](https://kubernetes.io/docs/concepts/policy/pod-security-policy/), [network policies](https://kubernetes.io/docs/concepts/services-networking/network-policies/), [cluster firewall](networking/README.md#firewalld), [host OS security updates](addons/host-upgrades.md), [cert-manager](addons/cert-manager.md)
- **Networking Features:** [ingress-nginx](addons/ingress-nginx.md), [Kontena Network Loadbalancer](addons/kontena-network-lb.md)
- **Applications Management Features:** [Helm](addons/helm.md)
- **Management UI:** [Kontena Lens](addons/kontena-lens.md)
- **Backup & Disaster Recovery Features:** [Kontena Backups](addons/kontena-backup.md)
- **Source Code:** available on [Github](https://github.com/kontena/pharos-cluster/)

## Simple, solid and certified

We believe setting up and maintaining a complex platform like Kubernetes from scratch is not where the race is won. Just like with Linux, building it once is a good educational experience but not for real use. Kontena Pharos is the complete, maintained and certified Kubernetes distribution that works on-premises, on any cloud and beyond!

## Easy to install, maintain and extend

Kontena Pharos is always up-to-date and built from the latest upstream Kubernetes, including a standardized set of essential features. It is easy to install and maintain with the dedicated CLI tool. The standard deployment may be extended with ready made [add-ons](addons/README.md) for most common use cases, or any extras from the Kubernetes ecosystem!

## Open Source, Support Available

The Kontena Pharos project core and many tools around it are open source and released under Apache 2 license. You can use OSS version for free, for any purpose: personal or commercial. Pro and EE versions are licensed under [Kontena License](https://github.com/kontena/pharos-cluster/blob/master/licenses/KONTENA.md). For businesses, we offer [commercial subscriptions](https://kontena.io/pharos/#pricing) with support and SLA agreements.

## Documentation License

![by-nc-sa](https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png)

This documentation is licensed under a [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-nc-sa/4.0/)
