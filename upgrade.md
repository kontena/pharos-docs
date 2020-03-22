# Upgrade Pharos Cluster

When new versions of Pharos are released, you can upgrade your existing cluster to apply the latest enhancements and bug fixes. This includes upgrading from previous minor versions, such as release 3.0.x to 3.1.y, and applying asynchronous errata updates within a minor version (3.1.z releases). See the [Pharos Release Notes](https://github.com/kontena/pharos-cluster/releases) to review the latest changes.

Unless noted otherwise, worker and masters within a major version are forward and backward compatible across one minor version, so upgrading your cluster should go smoothly. Please note: downgrades are **NOT** supported!

> Upgrades are done in parallel unless `pharos` notices unsafe operations (like a container runtime upgrade). In those cases upgrade will be rolled out so that ~90% of hosts will be available.

## Upgrade Steps

### 1. Install new version of `pharos` CLI tool

Use `chpharos` to install and use new version of `pharos` CLI tool. For example install and use version 3.0.1 of Pharos:

```
$ chpharos install 3.0.1
$ chpharos use 3.0.1
```

HINT: You can see the list of all available versions using `chpharos list-remote` command.

### 2. Apply upgrade to your cluster

Once you have switched the `pharos` CLI tool to new version, simply run `pharos up` command with your cluster specific `cluster.yml` configuration file. For example:

```
$ pharos up -c cluster.yml
```

### 3. Enjoy!

We hope it was smooth experience. If you encounter any issues or trouble, please let us know!
