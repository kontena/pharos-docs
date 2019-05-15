# Pharos "in-tree" cloud providers

Support for these cloud providers is built-in with Pharos and they can be configured as normal Kubernetes supported providers:

- [Hetzner Cloud](#hcloud)
- [Packet](#packet)
- [Pharos](#pharos)

Although the general support for these cloud providers is built-in with Pharos, user still needs to give some account/project specific options. Such options typically include at least a `Secret` with configuration how to access the cloud provider APIs.

For these providers the `config` options is a path to a file or folder containing the needed "extra" Kubernetes resources.

## Hetzner Cloud

**version:** 1.2.0<br/>
**csi supported:** true

```yaml
cloud:
  provider: hcloud
  config: ./hetzner-config.yaml
```

[HCloud](https://github.com/hetznercloud/hcloud-cloud-controller-manager) is the cloud controller for Hetzner Cloud. The configuration needed includes the API token to be used for connecting to Hetzner API. For example:
```yaml
apiVersion: v1
kind: Secret
metadata:
  name: hcloud
  namespace: kube-system
data:
  token: MTIzNDU= # base64 encoded API token
```

## Packet

**version:** 0.0.4<br/>
**csi supported:** false


```yaml
cloud:
  provider: packet
  config: ./packet-config.yaml
```

[packet-ccm](https://github.com/packethost/packet-ccm) provides support for [Packet Cloud](https://www.packet.com/).

The extra configuration needed includes both project ID and API authentication token:
```yaml
apiVersion: v1
kind: Secret
metadata:
  name: packet-cloud-config
  namespace: kube-system
data:
  apiKey: MTIzNDU= # Base64 encoded API token
  projectID: eHl6MTIz # Base64 encoded project ID
```

## Pharos

**version:** 0.1.0<br/>
**csi supported:** false


```yaml
cloud:
  provider: pharos
```

[Pharos CCM](https://github.com/kontena/pharos-cloud-controller) helps mainly at synchronizing node addresses in environment where there's no actualy cloud controller supported.


Pharos CCM requires **NO** extra configuration as it does not connect to any external APIs.

After cluster bootstrapping and when the cloud controller "kicks in" you should see node addresses populated as defined in [cluster configuration](../configuration/#hosts):
```sh
$ kubectl get node -o wide
NAME              STATUS   ROLES    AGE   VERSION   INTERNAL-IP     EXTERNAL-IP      OS-IMAGE             KERNEL-VERSION      CONTAINER-RUNTIME
pharos-master-0   Ready    master   99m   v1.13.5   10.133.105.32   167.99.220.196   Ubuntu 18.04.2 LTS   4.15.0-47-generic   docker://18.6.1
pharos-worker-0   Ready    worker   99m   v1.13.5   10.133.105.33   167.99.220.203   Ubuntu 18.04.2 LTS   4.15.0-47-generic   docker://18.6.1
```
