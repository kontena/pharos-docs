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
| High-Availability | ● | ● | ● |
| Support for x86-64 & ARM64 Architectures | ● | ● | ● |
| Docker & CRI-O Runtimes Available | ● | ● | ● |
| RBAC | ● | ● | ● |
| Pod Security Policies | ● | ● | ● |
| Rolling Cluster Updates       | -   | ●   | ● |
| Cert-manager | ● | ● | ● |
| Ingress-NGINX | ● | ● | ● |
| Helm | ● | ● | ● |
| Automatic Host Security Updates | ● | ● | ● |
| Kontena Lens          |     | ●   | ● |
| Kontena Backup        |     | ●   | ● |
| Kontena Storage       |     | ●   | ● |
| Kontena Network Loadbalancer |     | ●   | ● |
| Air Gapped Setup      |     | ●   | ● |
| Kontena Magneto       |     |     | ● |
| Multi-cluster Manager |     |     | ● |
| Custom License Management |     |     | ● |

## Features at a Glance

- Easy to setup, maintain and upgrade
- [Kubernetes](https://kubernetes.io/) v1.13.2
- Bare metal friendly, infrastructure agnostic
- Intel (x86-64) and ARM (ARM64) architectures supported
- Supported host operating systems: [CentOS, Debian, Redhat, Ubuntu](requirements.md)
- Single or multi-master, workloads isolated on workers
- On-cluster [etcd](https://coreos.com/etcd/) with TLS
- Support for [docker](https://mobyproject.org/) and [cri-o](http://cri-o.io/) container runtimes
- [RBAC](https://kubernetes.io/docs/admin/authorization/rbac/) enabled
- [Pod Security Policies](https://kubernetes.io/docs/concepts/policy/pod-security-policy/) enabled
- [Network policies](https://kubernetes.io/docs/concepts/services-networking/network-policies/) supported
- Hardened configuration for enhanced security (follows [NIST SP 800-190](https://csrc.nist.gov/publications/detail/sp/800-190/final) recommendations)
- [Cert-manager integration](addons/cert-manager.md) <sup>addon</sup>
- [Helm integration](addons/helm.md) <sup>addon</sup>
- Automated [host security updates](addons/host-upgrades.md) <sup>addon</sup>
- [Ingress-nginx integration](addons/ingress-nginx.md) <sup>addon</sup>
- [Kontena Lens](addons/kontena-lens.md) dashboard <sup>pro addon</sup>
- [Kontena Storage](addons/kontena-storage.md) (integrated storage for hyper-converged clusters) <sup>pro addon</sup>
- [Kontena Backups](addons/kontena-backup.md) <sup>pro addon</sup>
- [Kontena Network Loadbalancer](addons/kontena-network-lb.md) <sup>pro addon</sup>

## Simple, solid and certified

We believe setting up and maintaining a complex platform like Kubernetes from scratch is not where the race is won. Just like with Linux, building it once is a good educational experience but not for real use. Kontena Pharos is the complete, maintained and certified Kubernetes distribution that works on-premises, on any cloud and beyond!

## Easy to install, maintain and extend

Kontena Pharos is always up-to-date and built from the latest upstream Kubernetes, including a standardized set of essential features. It is easy to install and maintain with the dedicated CLI tool. The standard deployment may be extended with ready made [add-ons](addons/README.md) for most common use cases, or any extras from the Kubernetes ecosystem!

## Open Source, Support Available

The Kontena Pharos project core and many tools around it are open source and released under Apache 2 license. You can use OSS version for free, for any purpose: personal or commercial. Pro and EE versions are licensed under [Kontena License](https://github.com/kontena/pharos-cluster/blob/master/licenses/KONTENA.md). For businesses, we offer [commercial subscriptions](https://kontena.io/pharos/#pricing) with support and SLA agreements.

## Documentation License

![by-nc-sa](https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png)

This documentation is licensed under a [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-nc-sa/4.0/)
