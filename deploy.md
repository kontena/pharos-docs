# Deploy Kontena Pharos Cluster

> **Prerequisites:** Spin up machines for your cluster. You can use machines from any infrastructure. These machines must meet the [host system requirements](/requirements.md) and they must be accessible via SSH. Additionally, you will need `pharos` CLI tool that is part of [Kontena Pharos CLI Toolchain](/install.md).

Kontena Pharos cluster is deployed using `pharos` CLI tool. The [cluster configuration](/configuration.md) is described in `cluster.yml` file.

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
addons:
  ingress-nginx:
     enabled: true
```

Once you have created `cluster.yml` file with your desired [cluster configuration](/configuration.md)  options, the cluster may be deployed simply by running command:

```sh
$ pharos up -c cluster.yml
```

NOTE! The `pharos up` command is also used for changing the cluster configuration. It is safe to run this command multiple times. If there are no changes in configuration, nothing will be done to your cluster.
