# Addon: Ingress NGINX

[NGINX ingress controller](https://github.com/kubernetes/ingress-nginx) daemonset. By default runs on every node on ports 80 & 443.

- version: `0.21.0`
- maturity: `stable`
- architectures: `x86-64`, `arm64`
- available in: `OSS`, `Pro`

## Configuration

```yaml
addons:
  ingress-nginx:
    enabled: true
    # kind: DaemonSet
    # node_selector: {}
    # configmap: {}
    # default_backend:
    #   image: my-custom-image:latest
    # tolerations:
    # - key: "key"
    #   operator: "Equal"
    #   value: "value"
    #   effect: "NoSchedule"
    # extra_args: []
    # deployment:
    #   replicas: 2
    # service:
    #   external_traffic_policy: "Cluster"

```
#### Options

- `kind` - deployment type (`DaemonSet` or `Deployment`). Default: `DaemonSet`.
- `node_selector` - deployment node selector (map), deploys ingress only to matching nodes.
- `configmap` - custom configuration (map). For all supported `configmap` options, see: [Ingress NGINX docs](https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/configmap/)
- `default_backend.image` - custom image to be used as the default backend for the Nginx Ingress. Expected to fulfill the default backend [requirements](https://kubernetes.github.io/ingress-nginx/user-guide/default-backend/). Leave empty to use Pharos' own default backend.
- `tolerations` - toleration to add to the created daemonset. Given as array of standard [toleration](https://kubernetes.io/docs/concepts/configuration/taint-and-toleration/) objects.
- `extra_args` - Extra [arguments](https://kubernetes.github.io/ingress-nginx/user-guide/cli-arguments/) passed to ingress-nginx controller.
- `deployment.replicas` - replica count (applicable only if `kind=Deployment`). Default: `2`.
- `service.external_traffic_policy` - external traffic policy for service (applicable only if `kind=Deployment`).

See [Ingress NGINX documentation](https://kubernetes.github.io/ingress-nginx/) for additional details and more advanced usage.
