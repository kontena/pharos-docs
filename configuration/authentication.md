# Configuration: Authentication

Configure cluster authentication mechanisms. To understand how authentication and authorization works in Kubernetes clusters, see https://kubernetes.io/docs/reference/access-authn-authz/authentication/

## `token_webhook`

Specify [Webhook Token Authentication](https://kubernetes.io/docs/admin/authentication/#webhook-token-authentication). For example:

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

## `oicd`

Specify [Open ID Connect Authentication](https://kubernetes.io/docs/reference/access-authn-authz/authentication/#configuring-the-api-server). For example:

```yaml
authentication:
  oidc:
    issuer_url: https://accounts.google.com
    client_id: <client_id>.apps.googleusercontent.com
    username_claim: email
    ca_file: /tmp/google.ca.crt
```

**Options:**
- `issuer_url` - OIDC provider URL.
- `client_id` - A client id that all tokens must be issued for.
- `username_claim` - JWT claim to use as the user name. By default `sub`, which is expected to be a unique identifier of the end user.
- `username_prefix` - Prefix prepended to username claims to prevent clashes with existing names (such as `system:` users).
- `groups_claim` - JWT claim to use as the user’s group.
- `groups_prefix` - Prefix prepended to group claims to prevent clashes with existing names (such as `system:` groups).
- `ca_file` - The path to the certificate for the CA that signed your identity provider’s web certificate. Not needed if the providers
