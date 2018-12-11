# Add-on: Kontena Lens

Kontena Lens is a dashboard for Kontena Pharos.

- version: `1.3.1`
- maturity: `beta`
- architectures: `x86-64`
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
  host: 'your-cluster-dns' # optional
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
- `tls.enabled` - `true` or `false`. Is the ingress secured with TLS. Default `true`
- `tls.email` - Email address used while fetching Let's Encrypt certificate. If not defined, the default insecure TLS certificate will be used.
- `user_management.enabled` - `true` or `false`. Is built-in user management enabled. Default `true`
- `persistence.enabled` - `true` or `false`. Is persistent volumes used to maintain state. If yes, cluster must provide default storage class. You can enable this, for example, by using [kontena-storage](./kontena-storage.html) add-on. Default: `false`

## Using Kontena Lens

### User Management

When built-in user management is enabled, Pharos will generate admin credentials for the cluster and outputs it to command line output. You can use these credentials to sign in Kontena Lens. It's recommended to change admin password after the first login.

After signing in to Kontena Lens, admin user can create new users and groups on the User management section and give them access to the Kubernetes cluster by binding proper RBAC rules. Users can sign in to Kontena Lens and see only those resources they are allowed. They can also download Kubeconfig file and start operating with the cluster from local machines.

It's also option to sign in with Service Account's token or, if configured, with external authentication provider's token.

#### Pre-configured RBAC roles

Kontena Lens defines couple of handy RBAC roles that can be bound to users and groups:
- `developer` - Read access to namespace resources
- `devops` - Admin access to namespace resources
- `user-manager` - Access to create and modify users and groups

### Embedded Terminal

Kontena Lens comes with embedded terminal giving users access to your cluster from everywhere. You can find terminal on the bottom of Kontena Lens dashboard and open it with single mouse click.

If persistent storage is configured in the cluster, terminal will mount user's home directory from peristent volumes and data and files won't be lost between terminal sessions.

Kubectl and Helm CLIs are integrated to the terminal making it super easy install new applications and modify resources and, basically, do anything that is possible with kubectl and Helm. Terminal includes also Git and [Kontena Mortar](https://github.com/kontena/mortar) binaries you can start using.

### Configuring Custom Domain and SSL Certificate

By default Kontena Lens uses worker node's IP address for the domain where dashboard is accessible. However, it's possible to define custom `host` and `tls.email` address for valid SSL certifcate in config options. Then Pharos will set correct Ingress rules and fetch LE certificate for Kontena Lens automatically.
