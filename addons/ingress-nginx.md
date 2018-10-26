# Addon: Ingress NGINX

[NGINX ingress controller](https://github.com/kubernetes/ingress-nginx) daemonset. By default runs on every node on ports 80 & 443.

- version: `0.17.1`
- maturity: `stable`
- architectures: `amd64`, `arm64`
- available in: `OSS`, `Pro`, `EE`

## Configuration

```yaml
addons:
  ingress-nginx:
    enabled: true
    node_selector:
      disk: ssd
    configmap:
      load-balance: least_conn
    default_backend:
      image: my-custom-image:latest
    tolerations:
      tolerations:
        - key: "key"
          operator: "Equal"
          value: "value"
          effect: "NoSchedule"
```
#### Options

- `node_selector` - deployment node selector (map), deploys ingress only to matching nodes.
- `configmap` - custom configuration (map). For all supported `configmap` options, see: [Ingress NGINX docs](https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/configmap/)
- `default_backend.image` - custom image to be used as the default backend for the Nginx Ingress. Expected to fulfill the default backend [requirements](https://kubernetes.github.io/ingress-nginx/user-guide/default-backend/). Leave empty to use Pharos' own default backend.
- `tolerations` - toleration to add to the created daemonset. Given as array of standard [toleration](https://kubernetes.io/docs/concepts/configuration/taint-and-toleration/) objects.

See [Ingress NGINX documentation](https://kubernetes.github.io/ingress-nginx/) for additional details and more advanced usage.