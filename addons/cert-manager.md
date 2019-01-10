# Addon: Cert Manager

[Cert Manager](https://github.com/jetstack/cert-manager), TLS certificate automation (including Let's Encrypt).

- version: `0.5.2`
- maturity: `alpha`
- available in: `OSS`, `Pro`, `EE`

## Configuration

```yaml
cert-manager:
  enabled: true
  issuer:
    name: letsencrypt-staging
    server: https://acme-staging-v02.api.letsencrypt.org/directory
    email: me@domain.com
```

#### Options

- `issuer.name` - registered issuer resource name
- `issuer.server`-  ACME server url
- `issuer.email` - email address used for ACME registration

By default Pharos Cluster will create an [Issuer](http://docs.cert-manager.io/en/release-0.5/reference/issuers.html) to the `default` namespace. This can be used to obtain Let's Encrypt certificates using `HTTP-01` challenge. For `HTTP-01` challenge to work you need to enable ingress controller, for example [Ingress-NGINX](./ingress-nginx.md).

You can use the following Let's Encrypt ACME v2 endpoints as `issuer.server`:

  - staging: `https://acme-staging-v02.api.letsencrypt.org/directory`
  - production: `https://acme-v02.api.letsencrypt.org/directory`

If you want to use Let's Encrypt in other namespaces, create an issuer per namespace or create a cluster-wide [ClusterIssuer](http://docs.cert-manager.io/en/release-0.5/reference/clusterissuers.html).

Example:

```yaml
apiVersion: certmanager.k8s.io/v1alpha1
kind: Certificate
metadata:
  name: mydomain-com
  namespace: default
spec:
  secretName: mydomain-tls
  issuerRef:
    name: letsencrypt
  commonName: mydomain.com
  dnsNames:
  - mydomain.com
  - www.mydomain.com
  acme:
    config:
    - http01:
        ingressClass: nginx
      domains:
      - mydomain.com
      - www.mydomain.com
```

See [Cert Manager documentation](http://docs.cert-manager.io/en/release-0.5/tutorials/index.html) for additional details and more advanced usage.

### Migration from older version

Starting from Cert Manager version 0.3.0, acme v01 APIs are not supported anymore. Pharos automatically handles migration of LetsEncrypt API endpoints in both issuers and cluster issuers. How ever Pharos cannot handle any other type (i.e. non LE) issuers automatically.

You can find more information [here](https://cert-manager.readthedocs.io/en/latest/admin/upgrading/upgrading-0.2-0.3.html#removing-support-for-acmev1-in-favour-of-acmev2)

