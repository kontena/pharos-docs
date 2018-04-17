# Addon: Ingress NGINX

NGINX ingress controller daemonset. By default runs on every node on ports 80 & 443.

https://github.com/kubernetes/ingress-nginx

```yaml
ingress-nginx:
  enabled: true
  node_selector:
    disk: ssd
  configmap:
    load-balance: least_conn
  default_backend:
    image: my-custom-image:latest
```
#### Options

- `node_selector` - deployment node selector (map), deploys ingress only to matching nodes.
- `configmap` - custom configuration (map). For all supported `configmap` options, see: https://github.com/kubernetes/ingress-nginx/blob/master/docs/user-guide/configmap.md
- `default_backend.image` - custom image to be used as the default backend for the Nginx Ingress. Expected to fulfill the default backend [requirements](https://github.com/kubernetes/ingress-nginx#requirements). Leave empty to use Pharos' own default backend.
