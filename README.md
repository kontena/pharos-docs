# Kontena Pharos

> The simple, solid, certified Kubernetes distribution that just works.

![features](https://pharos.sh/images/pharos-features.svg)

## Overview

- **Stable foundation** for running Kubernetes at any scale.
- **Always up-to-date**, built from the latest upstream Kubernetes including a standardized set of essential features.
- **Extend with addons** of your own or from any Kubernetes ecosystem project.
- **Enterprise subscriptions** with SLA and support [available](https://pharos.sh#pricing).



## Features at a Glance

- [Simple setup](usage/README.md)
- Kubernetes v1.9.6
- Bare metal friendly, infrastructure agnostic
- Single or multi-master, workloads isolated on workers
- On-cluster [etcd](https://coreos.com/etcd/) with TLS
- Support for Docker and [cri-o](https://github.com/kubernetes-incubator/cri-o) container runtimes
- [RBAC](https://kubernetes.io/docs/admin/authorization/rbac/) enabled
- [Network policies](https://kubernetes.io/docs/concepts/services-networking/network-policies/)
- Hardened configuration for enhanced security (follows NIST SP800-190 recommendations)
- ARM64 support

## Simple, solid and certified

We believe setting up and maintaining a complex platform like Kubernetes from scratch is not where the race is won. Just like with Linux, building it once is a good educational experience but not for real use. Kontena Pharos is the complete, maintained and certified Kubernetes distribution that works on-premises, on any cloud and beyond!

## Easy to install, maintain and extend

Kontena Pharos is always up-to-date and built from the latest upstream Kubernetes, including a standardized set of essential features. It is easy to install and maintain with the dedicated CLI tool. The standard deployment may be extended with ready made [add-ons](addons/README.md) for most common use cases, or any extras from the Kubernetes ecosystem!

## 100% Open Source, Support Available

The Kontena Pharos project and tools are open source and released under Apache 2 license. You can use it for free, for any purpose: personal or commercial. You can always find the latest version from our [Github repository](https://github.com/kontena/pharos-cluster). For businesses, we offer [commercial subscriptions](https://pharos.sh/#pricing) with support and SLA agreements.


## Kontena Pharos vs. Managed Kubernetes Solutions

Managed Kubernetes Services such as [Google Kubernetes Engine](https://cloud.google.com/kubernetes-engine/), [Amazon Elastic Container Service for Kubernetes (EKS)](https://aws.amazon.com/eks/) and [Azure Container Service (AKS)](https://azure.microsoft.com/en-us/services/container-service/) offer Kubernetes-as-a-Service (should we dare to call it KaaS? :)). The cloud provider is hosting a pre-configured Kubernetes infrastructure for you. These solutions promise simplicity, peace of mind and built-in integrations to the underlying cloud infrastructure. In essence, these solutions are Kubernetes distributions tailored to work smoothly on the selected cloud provider's infrastructure.

While most of the managed Kubernetes solutions available today are not yet production grade, they might be great solutions for those who have decided to go all-in with their selected cloud provider. Very much like with managed databases, managed Kubernetes is a beautiful solution if:

* Using public cloud is not a problem
* Having increased lock-in to your cloud provider is not a problem
* Having decreased control over the underlying system is not an issue
* It works and makes your life more easy; allow focus on stuff that matters
* It's certified and up-to-date

If you feel the managed Kubernetes solution from one of the cloud providers is mature enough for you to use and don't have issues with managed services in general, we highly recommend using it over any "self managed" Kubernetes solution. If you have any concerns related to using managed Kubernetes, Kontena Pharos might be ideal solution for you and you should try it out!

## Documentation License

![by-nc-sa](https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png)

This documentation is licensed under a [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-nc-sa/4.0/)