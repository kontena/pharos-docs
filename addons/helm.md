# Addon: Helm

[Helm](https://www.helm.sh/) is the defacto package manager for Kubernetes.

- version: `2.12.1`
- maturity: `stable`
- architectures: `x86-64`
- available in: `OSS`, `Pro`, `EE`

**Important** If you are using Kontena Pharos Pro or EE version, do not use this add-on, unless you want to install stand-alone Helm/tiller component. With Kontena Pharos Pro and EE you can configure Helm charts through [Kontena Lens](./kontena-lens.md) add-on.

## Configuration

```yaml
addons:
  helm:
    enabled: true
```

## Configuring Helm CLI

First make sure that your kubectl is connected to the right cluster. Then issue following command:

```
$ helm init -c
```

After this you should be good to go. For using Helm, see the [Helm documentation](https://docs.helm.sh/).
