# Kontena Stats

Kontena Stats provides cluster wide metrics and alerting. Kontena Stats is built on top of [Prometheus](https://prometheus.io/). By default this addon exposes only a proxy endpoint to the Prometheus query api. This endpoint enforces that user has right to list metrics from requested namespace. Direct access to Prometheus api is blocked via network policies. Addon is mainly targeted for Kontena Lens users but it can be used as a general purpose Prometheus server for example with Grafana.

- version: `2.9.2+kontena.1`
- maturity: `stable`
- architectures: `x86-64`
- available in: `Pro`, `EE`

## Features

- Monitoring
- Alerting
- Easy Integration

## Configuration

```yaml
addons:
  kontena-stats:
    enabled: true
    # node_selector: {}
    # tolerations: []
    # retention:
    #   size: 1GB
    #   time: 90d
    # persistence:
    #   enabled: true
    # node_exporter:
    #   enabled: true
    # kube_state_metrics:
    #   enabled: true
```

## Options

* `node_selector` - where the prometheus pods are deployed. Given as hash of standard [nodeSelector](https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#nodeselector)
* `tolerations` - tolerations for prometheus pods. Given as array of standard [toleration](https://kubernetes.io/docs/concepts/configuration/taint-and-toleration/) objects.
* `retention.size` - configures the maximum number of bytes that storage blocks can use. The oldest data will be removed first. Default: `1GB`
* `retention.time` - determines when to remove old data. Defaults to 90d.
* `persistence.enabled` - `true` or `false`. Is persistent volumes used to maintain state. If yes, cluster must provide default storage class. You can enable this, for example, by using [kontena-storage](./kontena-storage.md) add-on. Default: `false`
* `node_exporter.enabled` - `true` or `false`. Is Node Exporter DaemonSet enabled. You should only disable this if you already have Node Exporter deployed. Default: `true`
* `kube_state_metrics.enabled` - `true` or `false`. Is Kube State Metrics enabled. You should only disable this if you already have Kube State Metrics deployed. Default: `true`


## Monitoring

## Service Scraping

Service endpoints can be scraped via the following annotations:
* `prometheus.io/scrape` - If set to `true`, service endpoints are scraped.
* `prometheus.io/scheme` - If the metrics endpoint is secured then you will need to set this to `https` & most likely set the `tls_config` of the scrape config.
* `prometheus.io/path` - If the metrics path is not `/metrics` override this.
* `prometheus.io/port` - If the metrics are exposed on a different port to the service then set this appropriately.


## Pod Scraping

Pods can be scraped via the following annotations:

* `prometheus.io/scrape` - Pod is scraped if set to `true`
* `prometheus.io/path` - Metrics path. Default: `/metrics`.
* `prometheus.io/port` - Scrape the pod on the indicated port instead of the pod's declared ports (default is a port-free target if none are declared).
