# Upgrading a Kontena Pharos Cluster

When new versions of Kontena Pharos are released, you can upgrade your existing cluster to apply the latest enhancements and bug fixes. This includes upgrading from previous minor versions, such as release 1.0 to 1.1, and applying asynchronous errata updates within a minor version (1.0.z releases). See the [Kontena Pharos Release Notes](https://github.com/kontena/pharos-cluster/releases) to review the latest changes.

Unless noted otherwise, worker and masters within a major version are forward and backward compatible across one minor version, so upgrading your cluster should go smoothly.


## Upgrade Steps

### 1. Download a New Version

Download a new version of `pharos-cluster` from [releases](https://github.com/kontena/pharos-cluster/releases).

Example:

```
$ curl -o /usr/local/bin/pharos-cluster-1.0.0 https://github.com/kontena/pharos-cluster/releases/download/v1.0.0/pharos-cluster-darwin-amd64
$ chmod +x /usr/local/bin/pharos-cluster-1.0.0
```

### 2. Apply Upgrade

Run `pharos-cluster up` against the same configuration.

For example:

```
$ /usr/local/bin/pharos-cluster-1.0.0 up -c /path/to/your/project/cluster.yml
```