# Addons

Pharos Cluster includes common functionality as addons. Addons can be enabled by introducing and enabling them in `cluster.yml`.

- [Built-in Addons](#built-in-addons)
- [Using External Addons](#using-external-addons)
- [Creating an Addon](external.md)

## Built-in Addons

Built-in addons are part of the Kontena Pharos Kubernetes distribution. They are tested to work with the Kubernetes version that Kontena Pharos ships.

* [Cert Manager](cert-manager.md)
* [Helm](helm.md)
* [Ingress NGINX](ingress-nginx.md)
* [Kontena Lens](kontena-lens.md)
* [Kontena Storage](kontena-storage.md)
* [Kontena Backup](kontena-backup.md)
* [Pharos Host Upgrades](host-upgrades.md)
* [Kontena Network Loadbalancer](kontena-network-lb.md)
* [Kontena Universal Loadbalancer](kontena-universal-lb.md)

## Using External Addons

External addons are loaded by default from the `pharos-addons` folder which is located in the same path as `cluster.yml`. It's possible to load external addons from other paths by defining `addon_paths`. These paths are also relative to the `cluster.yml`.

```yaml
addon_paths:
  - "./myaddons"
```
