# Addon: OpenEBS

> Deprecated: consider using Kontena Storage or installation via Helm chart

[OpenEBS](https://github.com/openebs/openebs), containerized block storage written in Go for cloud native and other environments w/ per container (or pod) QoS SLAs, tiering and replica policies across AZs and environments, and predictable and scalable performance.

- version: `0.5.3`
- maturity: `alpha`
- architectures: `amd64`
- available in: `OSS`, `Pro`, `EE`

## Configuration

```yaml
openebs:
  enabled: true
  default_storage_pool:
    path: /var/openebs
  default_storage_class:
    replicas: 3
    capacity: 10G
    default_class: true
```

#### Options


- `default_storage_class.replicas` - How many replicas should be created for each volume. Cannot be bigger than number of nodes.
- `default_storage_class.capacity` - Capacity for the default [storage class](https://kubernetes.io/docs/concepts/storage/storage-classes/)
- `default_storage_class.default_class` - Should the OpenEBS default storage class be used as cluster wide default class
- `default_storage_pool.path` - Where on the nodes should OpenEBS store all the data

#### Storage classes

By default OpenEBS add-on creates a single storage class with the name of `openebs-standard`. You can create more classes by deploying new storage class definitions:
```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
   name: openebs-big
   annotations:
    storageclass.kubernetes.io/is-default-class: false
provisioner: openebs.io/provisioner-iscsi
parameters:
  openebs.io/storage-pool: "default"
  openebs.io/jiva-replica-count: "3"
  openebs.io/volume-monitor: "true"
  openebs.io/capacity: 50G
```

Then deploy it using:
```
kubectl apply -f my-class.yaml
```

After deploying the new class, it can be used for example in `StatefullSet`s like so:
```yaml
apiVersion: apps/v1beta1
kind: StatefulSet
metadata:
  name: redis-standalone
spec:
  serviceName: redis-standalone
  replicas: 1
  selector:
    matchLabels:
      app: redis-standalone
  template:
    metadata:
      name: redis-standalone
      labels:
        app: redis-standalone
    spec:
      containers:
      - name: redis
        image: redis:latest
        args: [ "--appendonly", "yes" ]
        ports:
        - containerPort: 6379
        volumeMounts:
        - name: redis-data
          mountPath: /data
  volumeClaimTemplates:
  - metadata:
      name: redis-data
      annotations:
        volume.beta.kubernetes.io/storage-class: openebs-big
    spec:
      accessModes: [ "ReadWriteOnce" ]
      resources:
        requests:
          storage: 50G

```