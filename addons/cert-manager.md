# Addon: Cert Manager

[Cert-manager](https://docs.cert-manager.io/en/release-0.7/) is a native Kubernetes certificate management controller. It can help with issuing certificates from a variety of sources, such as [Let’s Encrypt](https://letsencrypt.org/), [HashiCorp Vault](https://www.vaultproject.io/), [Venafi](https://www.venafi.com/), a simple signing keypair, or self signed.

- version: `0.7.2`
- maturity: `alpha`
- available in: `OSS`, `Pro`

## Configuration

```yaml
addons:
  cert-manager:
    enabled: true
    # webhook:
    #   enabled: true
    # issuers:
    # - kind: ClusterIssuer
    #   metadata:
    #     name: le-issuer
    #   spec:
    #     acme:
    #     server: https://acme-staging-v02.api.letsencrypt.org/directory
    #     email: foo@bar.com
    #     privateKeySecretRef:
    #       name: le-issuer
    #     http01: {}
    # ca_issuer:
    #   enabled: false
    # extra_args: []
```

#### Options

- `issuers`- optional cert-manager `ClusterIssuer` or `Issuer` objects
- `ca_issuer.enabled` - Enable cluster internal CA issuer using Kubernetes CA
- `extra_args` - Extra [arguments](https://docs.cert-manager.io/en/latest/tasks/acme/configuring-dns01/) for (external) dns-resolvers for split-horizon dns.
- `webhook` - Whether to enable the [webhook admission controller](https://docs.cert-manager.io/en/latest/getting-started/webhook.html).

It's possible to add issuers directly from the addon (cluster wide [ClusterIssuer](http://docs.cert-manager.io/en/release-0.7/reference/clusterissuers.html) or namespaced [Issuer](http://docs.cert-manager.io/en/release-0.7/reference/issuers.html) via `issuers` array. For example if you want to have cluster-wide Let's Encrypt issuer using `HTTP-01` challenge, you can add following configuration:

```yaml
addons:
  cert-manager:
  enabled: true
  issuers:
  - kind: ClusterIssuer
    metadata:
      name: le-issuer
    spec:
      acme:
      server: https://acme-v02.api.letsencrypt.org/directory
      email: user@example.com
      privateKeySecretRef:
        name: le-issuer
      http01: {}
```
For `HTTP-01` challenge to work you need to enable ingress controller, for example [Ingress-NGINX](./ingress-nginx.md).

See [Cert Manager documentation](http://docs.cert-manager.io/en/release-0.7/tutorials/index.html) for additional details and more advanced usage.


### CA Issuer

By enabling the CA Issuer, a new Certmanager issuer will be created using Kubernetes CA to sign the certificates. This provides easy way to create certificates to be used within the cluster as it is fairly easy to get the CA trust in each service using Kubernetes ServiceAccounts.

You can request a certificate from this issuer with following certificate definition:

```yaml
apiVersion: certmanager.k8s.io/v1alpha1
kind: Certificate
metadata:
  name: mysvc-tls
  namespace: default
spec:
  secretName: mysvc-tls
  issuerRef:
    name: kube-ca-issuer
    kind: ClusterIssuer
  commonName: mysvc.default.svc.cluster.local
  organization:
    - Acme Inc.
```
