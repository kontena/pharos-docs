# Multi-Cluster Network

Kontena Pharos has experimental support for configuring multi-cluster pod network that can span across clusters or even cloud-providers.

## Creating Multi-Cluster Pod Network

### Cluster A example network configuration:

```yaml
network:
  provider: weave
  service_cidr: 172.16.0.0/16
  pod_network_cidr: 10.32.0.0/12 # has to be same in each cluster
  weave:
    password: ./shared_password
    ipalloc_default_subnet: 10.33.0.0/16 # should be unique cidr for each cluster (within pod_network_cidr)
    known_peers:
    - <cluster_B_worker_1_ip>
    - <cluster_B_worker_2_ip>
```

Where `network.weave.password` is a path to a file containing shared secret for Weave.


### Cluster B example network configuration:

```yaml
network:
  provider: weave
  service_cidr: 172.17.0.0/16
  pod_network_cidr: 10.32.0.0/12 # has to be same in each cluster
  weave:
    password: ./shared_password
    ipalloc_default_subnet: 10.34.0.0/16 # should be unique cidr for each cluster (within pod_network_cidr)
    known_peers:
    - <cluster_A_worker_1_ip>
    - <cluster_A_worker_2_ip>
```

**Note:**
- `network.pod_network_cidr` has to be same in all connected clusters
- `network.weave.ipalloc_default_subnet` should be unique for each cluster (but within `network.pod_network_cidr`)
- weave password has to be same in all connected clusters


### Setup Routes Between Clusters

This is just an example to give some idea how to add static routes between clusters.

#### Cluster A

```yaml
apiVersion: extensions/v1beta1
kind: DaemonSet
metadata:
  name: route-config
  labels:
    name: route-config
  namespace: kube-system
spec:
  updateStrategy:
    type: RollingUpdate
  template:
    metadata:
      labels:
        name: route-config
    spec:
      containers:
        - name: route-config
          command: [ "/bin/sh", "-c" ]
          args:
          - >
              ip=`ip addr show weave | grep "inet\b" | awk '{print $2}' | cut -d/ -f1`;
              ip route add 10.34.0.0/16 dev weave src ${ip};
              while true; do sleep 6000; done
          image: docker.io/alpine:3.9
          resources:
            requests:
              cpu: 10m
          securityContext:
            privileged: true
      hostNetwork: true
      priorityClassName: system-node-critical
      tolerations:
        - effect: NoSchedule
          operator: Exists

```

#### Cluster B

```yaml
apiVersion: extensions/v1beta1
kind: DaemonSet
metadata:
  name: route-config
  labels:
    name: route-config
  namespace: kube-system
spec:
  updateStrategy:
    type: RollingUpdate
  template:
    metadata:
      labels:
        name: route-config
    spec:
      containers:
        - name: route-config
          command: [ "/bin/sh", "-c" ]
          args:
          - >
              ip=`ip addr show weave | grep "inet\b" | awk '{print $2}' | cut -d/ -f1`;
              ip route add 10.33.0.0/16 dev weave src ${ip} || true;
              while true; do sleep 6000; done
          image: docker.io/alpine:3.9
          resources:
            requests:
              cpu: 10m
          securityContext:
            privileged: true
      hostNetwork: true
      priorityClassName: system-node-critical
      tolerations:
        - effect: NoSchedule
          operator: Exists
```
