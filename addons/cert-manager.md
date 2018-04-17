# Addon: Cert Manager

[Cert Manager](https://github.com/jetstack/cert-manager), TLS certificate automation (including Let's Encrypt).

```yaml
cert-manager:
  enabled: true
  issuer:
    name: letsencrypt
    server: https://acme-staging.api.letsencrypt.org/directory
    email: me@domain.com
```

#### Options

- `issuer.name` - registered issuer resource name
- `issuer.server`-  ACME server url
- `issuer.email` - email address used for ACME registration