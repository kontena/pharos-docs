# Installation

## With chpharos tool
The easiest way to install Pharos Cluster executables is to use [chpharos](https://github.com/kontena/chpharos) tool.

**1. Install chpharos**
```
curl -s https://get.pharos.sh | sudo bash
```

or via MacOS Homebrew

```
brew install kontena/chpharos/chpharos
```

Then follow the instructions in the post install message to add it to your shell startup scripts.

**2. Install a Pharos Cluster executable**

```
chpharos install <version>
```

Please refer [chpharos documentation](https://github.com/kontena/chpharos) for the rest of the commands and options.

## Manually
Alternatively you can download executables from [releases](https://account.kontena.io/downloads). Binaries should work on any recent 64bit MacOS or Linux machine.

Once downloaded, add the binary location to your `PATH` environment or move the binary to some location already in the `PATH`. Remember to also set executable bit on the binary.
