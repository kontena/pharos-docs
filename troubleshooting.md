# Kontena Pharos Troubleshooting

## Installation

### sudo errors

Kontena Pharos [CLI Toolchain](install-toolchain.md) will use [SSH access](https://en.wikipedia.org/wiki/Secure_Shell) for making connections to cluster machines. For this purpose, all machines in a cluster must be configured to allow an user with passwordless sudo permission.

```
echo "$USER ALL=(ALL) NOPASSWD:ALL" | sudo tee /etc/sudoers.d/$USER
```

Please ensure the host operating system you are using is configured accordingly.

### docker runtime installation failures

If you have selected to run your cluster with docker container runtime, Kontena Pharos [CLI Toolchain](install-toolchain.md) will try to install docker using the host machine operating system built-in package manager. In some cases, docker container runtime package is not available from default package repositories and must be manually configured. Depending which operating system you are using, please ensure the following package repositories are enabled:

* **CentOS 7.4 - 7.5**: `extras`
* **Redhat Enterprise Linux 7.4 - 7.6**: `rhel-7-server-extras-rpms`
* **Ubuntu 16.04**: `universe` (xenial-updates)
* **Ubuntu 18.04**: `universe`

 