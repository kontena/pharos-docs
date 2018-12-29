# Addon: Helm

[Helm](https://www.helm.sh/) is the defacto package manager for Kubernetes.

- version: `2.12.1`
- maturity: `stable`
- architectures: `x86-64`
- available in: `OSS`, `Pro`, `EE`

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
