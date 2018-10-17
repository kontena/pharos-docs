# Addons

Pharos Cluster includes common functionality as addons. Addons can be enabled by introducing and enabling them in `cluster.yml`.

- [Built-in Addons](#built-in-addons)
- [Using External Addons](#using-external-addons)
- [Creating an Addon](#creating-an-addon)

## Built-in Addons

Built-in addons are part of the Kontena Pharos Kubernetes distribution. They are tested to work with the Kubernetes version that Kontena Pharos ships.

* [Cert Manager](cert-manager.md)
* [Helm](helm.md)
* [Ingress NGINX](ingress-nginx.md)
* [Kontena Storage](kontena-storage.md)
* [OpenEBS](openebs.md)
* [Pharos Host Upgrades](host-upgrades.md)

## Using External Addons

External addons are loaded by default from the `pharos-addons` folder which is located in the same path as `cluster.yml`. It's possible to load external addons from other paths by defining `addon_paths`. These paths are also relative to the `cluster.yml`.

```yaml
addon_paths:
  - "./myaddons"
```

## Creating an Addon

A Kontena Pharos cluster addon is a folder that contains `addon.rb` (Ruby DSL) and one or more Kubernetes YAML files in the `resources` folder. It is possible to use `erb` templating language if you use `.yml.erb` as the file extension.

### Addon Template Variables

Following variables are always available to resource templates:

- `name` - addon name
- `version` -  addon version
- `license` - addon license
- `arch` - cluster cpu architecture
- `config` - user defined configuration variables

### Validating Addon Configuration

Validation rules can be defined in the `config_schema` block. Block uses [dry-validation](http://dry-rb.org/gems/dry-validation/) as the DSL.

### Example

`pharos-addons/hello-world/addon.rb`:
```ruby
Pharos.addon 'hello-world' do
  version '1.0.0'
  license 'Apache License 2.0'

  # config schema is optional, it provides validation rules for user configurable options
  config_schema {
    required(:replicas).filled(:int?)
    optional(:virtualhost).filled(:str?)
    optional(:tls_secret).filled(:str?)
  }

  # Install is optional, it can be used to customize the installation process if needed
  #
  # install {
  #   logger.info "this happens before resources are applied to Kubernetes API"
  #   apply_resources
  #   logger.info "this happens after resources are applied to Kubernetes API"
  # }

  # Uninstall is optional, it can be used to customize the uninstall process if needed
  #
  # uninstall {
  #   logger.info "this happens before resources are deleted from Kubernetes API"
  #   delete_resources
  #   logger.info "this happens after resources are deleted from Kubernetes API"
  # }
end
```

`pharos-addons/hello-world/resources/deployment.yml.erb`:
```erb
apiVersion: apps/v1
kind: Deployment
metadata:
  name: <%= name %>
spec:
  selector:
    name: <%= name %>
  replicas: <%= config.replicas %>
  template:
    metadata:
      labels:
        app: <%= name %>
    spec:
      containers:
        - image: "kontena/hello-world:latest"
          imagePullPolicy: Always
          name: hello-world
          ports:
            - containerPort: 9292
          resources:
            limits:
              cpu: "200m"
              memory: "128Mi"
            requests:
              cpu: "20m"
              memory: "64Mi"
```

`pharos-addons/hello-world/resources/service.yml.erb`:
```erb
apiVersion: v1
kind: Service
metadata:
  name: <%= name %>
spec:
  ports:
     -  port: 9292
        protocol: TCP
        targetPort: 9292
  selector:
    app: <%= name %>
```

`pharos-addons/hello-world/resources/ingress.yml.erb`:

```erb
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: <%= name %>
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
    nginx.ingress.kubernetes.io/ssl-redirect: "false"
spec:
<% if config.tls_secret %>
  tls:
  - hosts:
    - "<%= config.virtualhost %>"
    secretName: <%= config.tls_secret %>
<% end %>
  rules:
  - http:
      paths:
      - backend:
          serviceName: hello-world
          servicePort: 9292
    <% if config.virtualhost %>
    host: <%= config.virtualhost %>
    <% end %>
```

Addon can be configured in `cluster.yml` with the following syntax:

```yaml
addons:
  hello-world:
    enabled: true
    replicas: 3
    virtualhost: www.myhellodomain.com
```
