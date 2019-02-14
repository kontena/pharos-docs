# Add-on: Kontena Lens

Kontena Lens is a dashboard for Kontena Pharos.

- version: `1.4.1`
- maturity: `beta`
- architectures: `x86-64`
- available in: `Pro`, `EE`

![Lens Dashboard](/images/lens-dashboard.png)
## Features

- `Dashboard` - Overview of resources and status of your Kubernetes cluster
- `Helm charts` - Easy way to browse and install Helm charts.
- `Embedded terminal` - Kubectl access to your cluster from the dashboard.
- `Built-in user management` - Authentication + users, groups and RBAC rules management.

## Requirements
- Ingress Controller
- Cert Manager

## Minimum Configuration
```yaml
  kontena-lens:
    enabled: true
```

## Full Configuration Example

```yaml
kontena-lens:
  enabled: true
  name: 'prod-pharos-cluster'
  ingress:
    host: 'lens.my-domain.com'
    tls:
      enabled: true
      email: 'le@example.org'
  user_management:
    enabled: true
  persistence:
    enabled: true
  charts:
    enabled: true # optional
    repositories:
      - name: stable
        url: https://kubernetes-charts.storage.googleapis.com
  shell:
    image: 'my-org/kontena-lens-terminal:latest'
    skip_refresh: false
```

### Options

- `name` - Name of the cluster. Default `pharos-cluster`
- `ingress.host` - DNS address that is used for Dashboard access. Default `lens.<worker-node-ip>.nip.io`
- `ingress.tls.enabled` - `true` or `false`. Is the ingress secured with TLS. Can be set to `false` if SSL is terminated on external load balancer. Default: `true`.
- `ingress.tls.email` - Email address used while fetching Let's Encrypt certificate. If not defined, the default insecure TLS certificate will be used.
- `user_management.enabled` - `true` or `false`. Is built-in user management enabled. Default `true`
- `persistence.enabled` - `true` or `false`. Is persistent volumes used to maintain state. If yes, cluster must provide default storage class. You can enable this, for example, by using [kontena-storage](./kontena-storage.html) add-on. Default: `false`
- `charts.enabled` - `true` or `false`. Are Helm charts enabled. Default `true`.
- `charts.repositories` - Array of Helm repository objects with `name`, `url`. Default: `stable` Helm repository
- `shell.image` - Custom Docker image used for embedded terminal.
- `shell.skip_refresh` - `true` or `false`. Are Helm repositories refreshed on terminal start. Use `true` if no public Internet access. Default `false`.

## Using Kontena Lens

### Helm Charts

Kontena Lens comes with integrated Helm charts. Used Helm repositories can be configured under `charts.repositories` option. `stable` Helm repository is enabled by default if nothing is configured. If you want to configure additional repositories, `stable` repository **must** be explicitly configured too. For example:

```yaml
charts:
  enabled: true
  repositories:
  - name: stable
    url: https://kubernetes-charts.storage.googleapis.com/
  - name: incubator
    url: https://kubernetes-charts-incubator.storage.googleapis.com/
```

**Note** Only unauthenticated repositories are supported at this moment.

By default only cluster admins can install Helm charts. The easiest way to give access to other users to install charts is to bind users to `lens-helm-user` role in `kontena-lens-tiller` namespace.

**Note** Updating Helm releases is not implemented yet. At this moment to update or upgrade releases, please use Helm CLI and pass `--tiller-namespace kontena-lens-tiller` option to `helm` command.

### User Management

When built-in user management is enabled, Pharos will generate admin credentials for the cluster and outputs it to command line output. You can use these credentials to sign in Kontena Lens. It's recommended to change admin password after the first login.

After signing in to Kontena Lens, admin user can create new users and groups on the User management section and give them access to the Kubernetes cluster by binding proper RBAC rules. Users can sign in to Kontena Lens and see only those resources they are allowed. They can also download Kubeconfig file and start operating with the cluster from local machines.

It's also option to sign in with Service Account's token or, if configured, with external authentication provider's token.

**Note** If using any other authentication method (like OIDC or token webhook) user management must be disabled.

#### Pre-configured RBAC roles

Kontena Lens defines couple of handy RBAC roles that can be bound to users and groups:
- `developer` - Read access to namespace resources
- `devops` - Admin access to namespace resources
- `user-manager` - Access to create and modify users and groups
- `lens-helm-user` (in `kontena-lens-tiller` namespace) - Access to integrated Helm charts.

#### How to Reset Admin Password

If you've forgot the admin password you can create Service Account with cluster-admin rights with `kubectl` and sign-in to Kontena Lens and change `admin` user's password in the User management section.

Another option is to reset Lens configuration with kubectl and fire pharos up command:
```
$ kubectl delete configmap config -n kontena-lens
$ kubectl delete users admin
$ pharos up
```


### Embedded Terminal

Kontena Lens comes with embedded terminal giving users access to your cluster from everywhere. You can find terminal on the bottom of Kontena Lens dashboard and open it with single mouse click.

If persistent storage is configured in the cluster, terminal will mount user's home directory from peristent volumes and data and files won't be lost between terminal sessions.

Kubectl and Helm CLIs are integrated to the terminal making it super easy install new applications and modify resources and, basically, do anything that is possible with kubectl and Helm. Terminal includes also Git and [Kontena Mortar](https://github.com/kontena/mortar) binaries you can start using.

### Configuring Custom Domain and SSL Certificate

By default Kontena Lens uses worker node's IP address for the domain where dashboard is accessible. However, it's possible to define custom `host` and `tls.email` address for valid SSL certifcate in config options. Then Pharos will set correct Ingress rules and fetch LE certificate for Kontena Lens automatically.
