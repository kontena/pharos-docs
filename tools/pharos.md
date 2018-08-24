# pharos

`pharos` is a management tool for installing and upgrading Kontena Pharos clusters.

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

Sometimes, for example for CI/CD tools, it's necessary to download executables manually. You can download Pharos executables from [releases](https://account.kontena.io/downloads). Binaries should work on any recent 64bit MacOS or Linux machine.

Once downloaded, add the binary location to your `PATH` environment or move the binary to some location already in the `PATH`. Remember to also set executable bit on the binary.

**Note** When using manually downloaded version of `pharos` you must use `pharos-cluster` command instead.

## Usage

### Initialize or upgrade cluster

`pharos up`

The supported options:

* `config` - Path to config file (default: `cluster.yml`).
* `tj-json` - Path to terraform output json.
* `yes`- Answer automatically yes to prompts.

### Reset cluster

`pharos reset`

The supported options:

* `config` - Path to config file (default: `cluster.yml`).
* `tj-json` - Path to terraform output json.
* `yes`- Answer automatically yes to prompts.