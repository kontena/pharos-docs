# chpharos

`chpharos` is a tool for installing and using multiple versions of [`pharos`](./pharos.md) and the compatible tools such as [kubectl](https://kubernetes.io/docs/reference/kubectl/overview/) for each.

## Requirements

- A shell compatible with bash version 3 or newer
- A tool for downloading files (currently supported: [curl](https://curl.haxx.se/) and [wget](https://www.gnu.org/software/wget/), usually already installed on compatible systems)

## Installation

### From the command-line

To install from the command-line, use:

```
curl -s https://get.k8spharos.dev | bash
```

To view the installer command-line options, use:

```
curl -s https://get.k8spharos.dev | bash -s -- -h
```

### Via MacOS homebrew

To install using the [Homebrew](https://brew.sh/) package manager, use:

```
brew install kontena/chpharos/chpharos
```

Then follow the instructions in the post install message to add it to your shell startup scripts.

### From source packages

1. Download a source package from [releases](https://github.com/kontena/chpharos/releases) page
2. Extract the archive and go into the extracted directory
3. `make install`

### Manually
1. Download the [chpharos.sh](https://raw.githubusercontent.com/kontena/chpharos/master/share/chpharos.sh)
2. Add a line to your shell's start-up configuration file (`.bash_profile`, `.zshrc`, ..) to load it: `source <path-to-chpharos.sh>`

```
mkdir -p ~/.pharos/chpharos && \
  curl -sL https://raw.githubusercontent.com/kontena/chpharos/master/share/chpharos/chpharos.sh > ~/.pharos/chpharos.sh && \
  echo "source ~/.pharos/chpharos.sh" >> ~/.bash_profile
```

## Usage and features

### List available versions

`chpharos list-remote`

Use `chpharos list-remote --pre` to include pre-release/beta versions.

### Install a version

`chpharos install 1.1.1`

To install the latest version, use `chpharos install latest`

You can give `--use` option to automatically select the installed version as current version of `pharos` tool.

### List installed versions

`chpharos list`

### Select a version to use

`chpharos use 1.1.1`

### Display the currently used version

`chpharos current`

### Uninstall a version

`chpharos uninstall 1.1.1`

### Automatic version switching

`chpharos` can be used in an automatic mode where switching to a directory or a git-repository that contains a `.pharos-version` file will automatically switch to the version specified in the file.

To enable this, you need to add a line in your start-up scripts after the loading of `pharos.sh`:

```
chpharos auto
```

```
echo "chpharos auto" >> ~/.bash_profile
```

You can use `chpharos use --local 1.1.1` to create a `.pharos-version` file in the current directory or `chpharos use --default 1.1.1` to set a default version by creating a `.pharos-version` file in the `$HOME` directory.

### Tab completions

1. Download the [bash-complete.sh](https://raw.githubusercontent.com/kontena/chpharos/master/opt/bash-complete.sh)
2. Place the file into the completion configuration directory (on your machine or add a line to your shell's start-up configuration file (`.bash_profile`, `.zshrc`, ..) to load it: `source <path-to-bash-complete.sh>`
