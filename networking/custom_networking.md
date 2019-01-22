# Custom Networking

Pharos allows users to plug-in any [CNI](https://github.com/containernetworking/cni/) networking implementation on the cluster.


## Configuring Custom Networking

Custom networking can be enabled by setting the network provider to `custom` and configuring the deployment manifest path properly. This will make Pharos to deploy all the needed networking components during the cluster creation.

```yaml
network:
  provider: custom
  pod_network_cidr: 172.31.0.0/16
  service_cidr: 172.32.0.0/16
  custom:
    manifest_path: ./network-manifests/
    options: {}
```

## Options

Pharos does not define any structure for the `options` key, it can have any yaml conformant structure. These options, as well as the full cluster configuration yaml, can be used in the manifest templates.

## Manifests

As with [addons](../addons/) the manifests can be either normal yaml files or templated with Erb. Templating allows easy customizability of the deployment and the ability to match the deployment configuration with the cluster level configuration options.


## Example configuration for Flannel

As an example, let's configure the cluster using [Flannel](https://github.com/coreos/flannel) as the networking implementation.

In the cluster configuration, you set the provider into `custom` and point Pharos to use correct set of deployment manifests:

```yaml
network:
  provider: custom
  pod_network_cidr: 172.31.0.0/16
  service_cidr: 172.32.0.0/16
  custom:
    manifest_path: ./flannel/
```

There's no configuration options defined as Flannel needs only the pod network CIDR to be configured and that it can get from cluster configuration.

The manifests are told to locate in `./flannel` folder. So in that folder, you need to have all the deployment descriptors available. For a simple example Flannel deployment, you'd have following:

_01-cluster-role.yml_

```yaml
---
kind: ClusterRole
apiVersion: rbac.authorization.k8s.io/v1beta1
metadata:
  name: flannel
rules:
  - apiGroups:
      - ""
    resources:
      - pods
    verbs:
      - get
  - apiGroups:
      - ""
    resources:
      - nodes
    verbs:
      - list
      - watch
  - apiGroups:
      - ""
    resources:
      - nodes/status
    verbs:
      - patch

```

_02-cluster-role-binding.yml_
```yaml
---
kind: ClusterRoleBinding
apiVersion: rbac.authorization.k8s.io/v1beta1
metadata:
  name: flannel
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: flannel
subjects:
- kind: ServiceAccount
  name: flannel
  namespace: kube-system

```

_03-service-account.yml_
```yaml
---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: flannel
  namespace: kube-system
```

_04-config-map.yml.erb_
```yaml
---
kind: ConfigMap
apiVersion: v1
metadata:
  name: kube-flannel-cfg
  namespace: kube-system
  labels:
    tier: node
    app: flannel
data:
  cni-conf.json: |
    {
      "name": "cbr0",
      "plugins": [
        {
          "type": "flannel",
          "delegate": {
            "hairpinMode": true,
            "isDefaultGateway": true
          }
        },
        {
          "type": "portmap",
          "capabilities": {
            "portMappings": true
          }
        }
      ]
    }
  net-conf.json: |
    {
      "Network": "<%= cluster_config.network.pod_network_cidr %>",
      "Backend": {
        "Type": "vxlan"
      }
    }
```
Notice how the full cluster configuration is available for the templates using `cluster_config` variable. If there's specific `options` provided for custom network you'd access them using `cluster_config.networking.custom.options.option_name` syntax. In this example we set the pod network CIDR for Flannel.


_03-daemon-set.yml_
```yaml
---
apiVersion: extensions/v1beta1
kind: DaemonSet
metadata:
  name: kube-flannel-ds
  namespace: kube-system
  labels:
    tier: node
    app: flannel
spec:
  template:
    metadata:
      labels:
        tier: node
        app: flannel
    spec:
      hostNetwork: true
      tolerations:
      - operator: Exists
        effect: NoSchedule
      serviceAccountName: flannel
      initContainers:
      - name: install-cni
        image: quay.io/coreos/flannel:v0.10.0-amd64
        command:
        - cp
        args:
        - -f
        - /etc/kube-flannel/cni-conf.json
        - /etc/cni/net.d/10-flannel.conflist
        volumeMounts:
        - name: cni
          mountPath: /etc/cni/net.d
        - name: flannel-cfg
          mountPath: /etc/kube-flannel/
      containers:
      - name: kube-flannel
        image: quay.io/coreos/flannel:v0.10.0-amd64
        command:
        - /opt/bin/flanneld
        args:
        - --ip-masq
        - --kube-subnet-mgr
        resources:
          requests:
            cpu: "100m"
            memory: "50Mi"
          limits:
            cpu: "100m"
            memory: "50Mi"
        securityContext:
          privileged: true
        env:
        - name: POD_NAME
          valueFrom:
            fieldRef:
              fieldPath: metadata.name
        - name: POD_NAMESPACE
          valueFrom:
            fieldRef:
              fieldPath: metadata.namespace
        volumeMounts:
        - name: run
          mountPath: /run
        - name: flannel-cfg
          mountPath: /etc/kube-flannel/
      volumes:
        - name: run
          hostPath:
            path: /run
        - name: cni
          hostPath:
            path: /etc/cni/net.d
        - name: flannel-cfg
          configMap:
            name: kube-flannel-cfg
```
