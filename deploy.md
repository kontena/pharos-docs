# Managing Pharos Cluster

> **Prerequisites:** Spin up machines for your cluster. You can use machines from any infrastructure. These machines must meet the [host system requirements](/requirements.md) and they must be accessible via SSH. Additionally, you will need `pharos` CLI tool that is part of [Pharos CLI Toolchain](/install-toolchain.md).

Pharos cluster is deployed using `pharos` CLI tool. The [cluster configuration](/configuration.md) is described in `cluster.yml` file.

For example, your `cluster.yml` file might look like this:

```yaml
hosts:
  - address: "192.0.2.1"
    user: root
    ssh_key_path: ~/.ssh/my_key
    role: master
  - address: "192.0.2.2"
    role: worker
  - address: "192.0.2.3"
    role: worker
network:
  provider: weave
```

Once you have created `cluster.yml` file with your desired [cluster configuration](/configuration.md)  options, the cluster may be deployed simply by running command:

```sh
$ pharos up -c cluster.yml
```

NOTE! The `pharos up` command is also used for changing the cluster configuration. It is safe to run this command multiple times. If there are no changes in configuration, nothing will be done to your cluster.


## Adding and Removing Nodes

Adding and removing nodes is highly dependent on the roles of the nodes. The following chapters cover the process of adding and removing nodes in different roles.

- [Notes on master nodes and etcd](#notes-on-master-nodes-and-etcd)
- [Adding master nodes](#adding-master-nodes)
- [Removing master nodes](#removing-master-nodes)
- [Adding worker nodes](#adding-worker-nodes)
- [Removing worker nodes](#removing-worker-nodes)

### Notes on Master Nodes and etcd

Keep in mind that the master nodes also host the control plane etcd cluster. Even more importantly, any changes to the cluster require a working etcd cluster with the majority of peers present and working.

As normally with etcd, or any other quorum based system, it is highly advisable to run an odd number of peers. As the etcd cluster only works when a majority can be formed, once you grow the control plane to have more than one node, you can't (automatically) go back to having only one node.

Etcd cluster sizing is described more in the official etcd docs [here](https://coreos.com/etcd/docs/3.2.17/v2/admin_guide.html#optimal-cluster-size).

### Adding Master Nodes

Adding master nodes is as simple as adding them into the `cluster.yml`. Re-running `pharos up ...` will configure the control plane on the new node and also makes necessary changes in the etcd cluster.

### Removing Master Nodes

Once you've determined that it is safe to remove a master node, and its etcd peer, follow this process:
1. Stop the node
2. Update `cluster.yml`
3. Run `pharos up ...`
4. Remove the node from Kubernetes API with `kubectl delete node <node_name>`
5. Terminate/remove the node in your infrastructure

### Adding Worker Nodes

Adding worker nodes is as simple as adding them into the `cluster.yml`. Re-running `pharos up ...` will configure everything on the new node and joins it into the cluster.

For advanced use-cases such as auto-scaling, a new worker node can be initialized and joined to an existing cluster by using the `pharos worker up` command.

1. On a host with access to your cluster and `cluster.yml`, run `pharos exec -r master -f sudo kubeadm token create --print-join-command | tail -1` to get a value for the `JOIN_COMMAND` parameter. The join command normally looks like: `kubeadm join localhost:6443 --token ??? --discovery-token-ca-cert-hash ???`
2. Install the `pharos` command-line tool on the new worker node.
3. Run `pharos worker up` with the join command and a master address as parameters: `pharos worker up "kubeadm join localhost:6443 --token ??? --discovery-token-ca-cert-hash ???" master-address.example.com`. There are several extra options that can be defined for the workers, see `pharos worker up --help` or the [CLI tool reference](tools/pharos.md#initialize-or-upgrade-a-worker-node-in-an-existing-pharos-cluster) for more information.

#### Caveats for `pharos worker up`

- The node won't be upgraded with the other nodes when using `pharos up` unless you add it to your `cluster.yml`.
- Firewalld can't currently be configured via `pharos worker up`.

### Removing Worker Nodes

Removing a worker node is currently a multi step process:
1. Remove the host from `cluster.yml`. As re-upping a cluster would not actually do anything, you do not need to run `pharos up ...`
2. (optional) Move the workload away from the node with `kubectl drain --timeout=5m --ignore-daemonsets --delete-local-data`
3. Terminate the host
4. Remove the node from Kubernetes API with `kubectl delete node <node_name>`
