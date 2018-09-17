# Addon: Kubernetes Dashboard

[Kubernetes Dashboard](https://github.com/kubernetes/dashboard) is a general purpose, web-based UI for Kubernetes clusters. It allows users to manage applications running in the cluster and troubleshoot them, as well as manage the cluster itself.

- version: `1.8.3`
- stability: `stable`

## Configuration

```yaml
kubernetes-dashboard:
  enabled: true
```

Dashboard can be accessed via `kubectl proxy`. For more information see [Kubernetes Dashboard Wiki](https://github.com/kubernetes/dashboard/wiki).