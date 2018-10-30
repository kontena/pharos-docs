# Add-on: Kontena Lens

Kontena Lens is a dashboard for Kontena Pharos.

- version: `1.1.0`
- maturity: `beta`
- architectures: `amd64`
- available in: `Pro`, `EE`

![Lens Dashboard](/images/lens-dashboard.png)
## Features

- `Dashboard` - Overview of resources and status of your Kubernetes cluster
- `Embedded terminal` - Kubectl and Helm access to your cluster from the dashboard.
- `Built-in user management` - Authentication + users, groups and RBAC rules management.

## Requirements
- Ingress Controller
- Cert Manager

## Configuration

```yaml
kontena-lens:
  enabled: true
  name: 'prod-pharos-cluster' # optional
  host: 'https://your-cluster-dns' # optional
  tls:
    email: 'le@example.org' # optional
  user_management:
    enabled: true # optional
  persistence:
    enabled: true # optional
```

### Options

- `name` - Name of the cluster. Default `pharos-cluster`
- `host` - DNS address that is used for Dashboard access. Default `https://lens.<worker-node-ip>.nip.io`
- `tls.email` - Email address used while fetching Let's Encrypt certificate. If not defined, the default insecure TLS certificate will be used.
- `user_management.enabled` - `true` or `false`. Is built-in user management enabled. Default `true`
- `persistence.enabled` - `true` or `false`. Is persistent volumes used to maintain state. If yes, cluster must provide default storage class. You can enable this, for example, by using [kontena-storage](./kontena-storage.html) add-on. Default: `false`
