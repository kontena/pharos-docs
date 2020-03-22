# pharos

`pharos` is a management tool for installing and upgrading Pharos clusters.

## Installation

The easiest way to install `pharos` tool is using [chpharos](chpharos). To install the latest version of `pharos` tool run command:

```
$ chpharos install latest
```

Alternatively, you can install specific version of `pharos` tool by providing version parameter:

```
$ chpharos install 1.2.3
```

See the list of all available versions:

```
$ chpharos list-remote
1.2.3 (installed)
1.2.2 (installed)
1.2.1 (installed)
1.2.0
1.1.1
```

### Other installation methods

Sometimes, for example for CI/CD tools, it's necessary to download executables manually. You can download Pharos executables from [releases](https://github.com/kontena/pharos-cluster/releases). Binaries should work on any recent 64bit MacOS or Linux machine.

Once downloaded, add the binary location to your `PATH` environment or move the binary to some location already in the `PATH`. Remember to also set executable bit on the binary.

## Usage

### Initialize or upgrade cluster

`pharos up`

The supported options:

* `--config` - Path to config file (default: `cluster.yml`).
* `--tj-json` - Path to terraform output json.
* `--yes`- Answer automatically yes to prompts.
* `--name`  - Set a name for the cluster.

### Initialize or upgrade a worker node in an existing Pharos cluster

`pharos worker up`

Required parameters:

* `JOIN_COMMAND` the output of `kubeadm token create --print-join-command` on a node in the cluster. Needs to be wrapped inside quotes.
* `ADDRESS` an address or multiple addresses to a master node that is accessible from the worker host

The supported options:

* `--insecure-registry` - Insecure registry address (use multiple times to define multiple)
* `--image-repository` - Image repository address
* `--cloud-provider` - Cloud provider name
* `--container-runtime` - Container runtime
* `--label` - Initial node labels in `key=value` format. Can be given multiple times.
* `--env` - Environment variables to configure for host in `key=value` format. Can be given multiple times.
* `--control-plane-proxy` - Enable proxy for control plane
* `--yes` - Answer automatically yes to prompts

If the target host is not the current host, these options can be used to supply the host SSH configuration:

* `--host` - Host address
* `--ssh-key-path` - SSH key path
* `--ssh-port` - SSH port
* `--user` - SSH login username

### Reset cluster

`pharos reset`

The supported options:

* `--config` - Path to config file (default: `cluster.yml`).
* `--tj-json` - Path to terraform output json.
* `--yes`- Answer automatically yes to prompts.
