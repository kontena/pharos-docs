# Usage

Standing up a Kontena Pharos cluster is as simple as creating a cluster.yml configuration file and running the command:

```sh
$ pharos-cluster up -c cluster.yml
```

Example cluster YAML:

```yaml
hosts:
  - address: "1.1.1.1"
    private_address: "1.0.1.0"
    user: root
    ssh_key_path: ~/.ssh/my_key
    role: master
  - address: "2.2.2.2"
    role: worker
  - address: "3.3.3.3"
    role: worker
network:
  trusted_subnets:
    - "172.31.0.0/16"
```

## cluster.yml

- [Hosts](#hosts)
- [API](#api-options)
- [Network](#network)
- [External etcd](#using-external-etcd)
- [Webhook Token Authentication](#webhook-token-authentication)
- [Audit Webhook](#audit-webhook)
- [Cloud Provider](#cloud-provider)

### Hosts

- `address` - IP address or hostname
- `role` - One of `master`, `worker`
- `private_address` - Private IP address or hostname. Prefered for cluster's internal communication where possible (optional)
- `user` - Username with sudo permission to use for logging in (default  `ubuntu`)
- `ssh_key_path` - A local file path to an ssh private key file (default `~/.ssh/id_rsa`)
- `container_runtime` - One of `docker`, `cri-o` (default `docker`)
- `labels` - A list of `key: value` pairs to assign to the host (optional)

### API Options

- `endpoint` - External endpoint address for Kubernetes API (eg loadbalancer or DNS)

### Network Options

- `service_cidr` - IP address range for service VIPs. (default `10.96.0.0/12`)
- `pod_network_cidr` - IP address range for the pod network. (default `10.32.0.0/12`)
- `trusted_subnets` - array of trusted subnets where overlay network can be used without IPSEC.

### Using External etcd

Pharos Cluster can spin up Kubernetes using an externally managed etcd. In this case you need to define the external etcd details in your `cluster.yml` file:

```yaml
etcd:
  endpoints:
    - https://etcd-1.example.com:2379
    - https://etcd-2.example.com:2379
    - https://etcd-3.example.com:2379
  certificate: ./etcd_certs/client.pem
  key: ./etcd_certs/client-key.pem
  ca_certificate: ./etcd_certs/ca.pem
```

You need to specify all etcd peer endpoints in the list.

Certificate and corresponding key is used to authenticate the access to etcd. The paths used are relative to the path where the `cluster.yml` file was loaded from.

### Webhook Token Authentication

Cluster supports [webhook for verifying bearer tokens](https://kubernetes.io/docs/admin/authentication/#webhook-token-authentication).

```yaml
authentication:
  token_webhook:
    config:
      cluster:
        name: token-reviewer
        server: http://localhost:9292/token
        certificate_authority: /path/to/ca.pem # optional
      user:
        name: kube-apiserver
        client_key: /path/to/key.pem # optional
        client_certificate: /path/to/cert.pem # optional
    cache_ttl: 5m # optional
```

### Audit Webhook

Cluster supports setting up audit webhooks for external audit event collection.

```yaml
audit:
 server: "http://audit.example.com/webhook"
```

Audit events are delivered in batched mode, multiple events in one webhook `POST` request.

Currently audit events are configured to be emitted at `Metadata` level. See: https://github.com/kubernetes/community/blob/master/contributors/design-proposals/api-machinery/auditing.md#levels

### Cloud Provider

Pharos Cluster supports a concept of [cloud providers](https://kubernetes.io/docs/getting-started-guides/scratch/#cloud-provider). Cloud provider is a module that provides an interface for managing load balancers, nodes (i.e. hosts) and networking routes. Optionally you can also configure the path to the cloud provider configuration file.

```yaml
cloud:
  provider: aws
  config: ./cloud-config
```

#### Options

- `provider` - specify used cloud provider (default: no cloud provider)