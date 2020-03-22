# Pharos CLI Toolchain

Pharos clusters are deployed, managed and maintained with the `pharos` CLI tool. This tool is updated regularly. Often, the tool is updated when new version of Kubernetes "kernel" is released. The tool is also updated when new Pharos distro specific features are added.

In real world production environments, admins often run multiple versions of Pharos clusters. In order to perform maintenance for these clusters, admins need to juggle with multiple versions of `pharos` CLI tool: each deployed Pharos cluster will require a specific version of `pharos` tool for maintenance (NOTE: if newer version is used, the entire cluster will be upgraded to this new version). To make life easier for admins, there is a tool called `chpharos`.

With `chpharos`, it is easy to install and use multiple versions of `pharos` CLI tool. In addition, it will automatically install required versions of `kubectl` to match the version of Kubernetes running in your cluster. Use `chpharos` to have always up-to-date toolchain for deploying, managing and maintaining your Pharos clusters.

## Install `chpharos`

```
curl -s https://get.k8spharos.dev | bash
```

or via MacOS Homebrew

```
brew install kontena/chpharos/chpharos
```

Then follow the instructions in the post install message to add it to your shell startup scripts.

## Verify your `chpharos` installation

To verify your chpharos installation, use the `chpharos --version` command:

```
$ chpharos --version
chpharos 0.2.3
```

You should see `chpharos x.y.z` in the output

## Download and install `pharos` CLI tool

Install the latest version of `pharos` CLI tool:

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

## Set and switch `pharos` CLI tool versions

When you install `pharos` tool versions with `chpharos`, they are not automatically set as current. You need to select one of the installed versions as current manually. Here are some useful commands to list and switch `pharos` tool versions:

* `chpharos list` - List all installed `pharos` tool versions.
* `chpharos current` - See the currently selected `pharos` tool version.
* `chpharos use <version>` - Set current `pharos` tool version.

## Verify current `pharos` CLI tool version

After you have set the version of `pharos` as current version, you can verify that by running:

```
$ pharos --version
pharos-cluster 1.2.3
```

You should see `pharos-cluster x.y.z` in the output matching the version of `pharos` set as current.

## Enjoy!

If you have reached this far, you have completed the setup of Pharos toolchain. Next, you can start spinning up some machines and deploying Pharos clusters!
