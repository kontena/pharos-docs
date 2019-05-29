# Addon: Helm

[Helm](https://www.helm.sh/) is the defacto package manager for Kubernetes.

- version: `2.12.3`
- maturity: `stable`
- architectures: `x86-64`, `arm64`
- available in: `OSS`, `Pro`

**Important** If you are using Kontena Pharos Pro or EE version, do not use this add-on, unless you want to install stand-alone Helm/tiller component. With Kontena Pharos Pro and EE you can configure Helm charts through [Kontena Lens](./kontena-lens.md) add-on.

## Configuration

```yaml
addons:
  helm:
    enabled: true
    # charts:
    # - name: stable/prometheus
    #   repo: https://kubernetes-charts.storage.googleapis.com/
    #   values: ./prometheus.yaml
    # - name: incubator/kube-janitor
    #   repo: https://kubernetes-charts-incubator.storage.googleapis.com/
    #   set:
    #     kubejanitor.verbose: false
```

### Installing charts via addon config

It's possible to install charts via addon config. This method is primarily targeted for infrastructure level charts like storage and monitoring. First run will install the configured chart and subsequent runs will run upgrade to the matching release. Removal of chart releases is not currently supported -> releases must be removed manually.

## Configuring Helm CLI

First make sure that your kubectl is connected to the right cluster. Then issue following command:

```
$ helm init -c
```

After this you should be good to go. For using Helm, see the [Helm documentation](https://docs.helm.sh/).
