# Cloud Providers

Kontena Pharos supports a concept of [cloud providers](https://kubernetes.io/docs/concepts/cluster-administration/cloud-providers/). Cloud provider is a module that provides an interface for managing load balancers, nodes (i.e. hosts) and networking routes. Optionally you can also configure the path to the cloud provider specific configurations. For example:

```yaml
cloud:
  provider: openstack
  config: ./cloud-config
```

The supported configuration options:

* `provider` - specify used cloud provider (default: no cloud provider)
* `config` - path to provider specific cloud configuration (default: no configuration)


## Supported Cloud Providers

There are different types of cloud providers support in Pharos.

Naturally we support all Kubernetes "in-tree" cloud providers:

- [AWS](kube-in-tree.md#aws-cloud-provider)
- [Azure](kube-in-tree.md#azure-cloud-provider)
- [GCE](https://kubernetes.io/docs/concepts/cluster-administration/cloud-providers/#gce)
- [OpenStack](kube-in-tree.md#openstack-cloud-provider)
- [OVirt](https://kubernetes.io/docs/concepts/cluster-administration/cloud-providers/#ovirt)
- [Photon](https://kubernetes.io/docs/concepts/cluster-administration/cloud-providers/#photon)
- [VSphere](kube-in-tree.md#vsphere-cloud-provider)
- [IBM Cloud Kubernetes Service](https://kubernetes.io/docs/concepts/cluster-administration/cloud-providers/#ibm-cloud-kubernetes-service)
- [Baidu Cloud Container Engine](https://kubernetes.io/docs/concepts/cluster-administration/cloud-providers/#baidu-cloud-container-engine)

Pharos has also built-in support for some cloud providers that are not built-in with Kubernetes:

- [Hetzner Cloud](pharos-in-tree.md#hcloud)
- [Packet](pharos-in-tree.md#packet)
- [Pharos cloud controller](pharos-in-tree.md#pharos)

Naturally any cloud provider support can be deployed via [external addon](../addons/external.md). In this case set the cloud privder as external:
```yaml
cloud:
  provider: external
```

For external providers you need to also ensure kubelet has all the needed [feature gates](../configuration/#kubelet) open and you push all needed configurations as part of the custom addon.
