# Kontena Pharos Troubleshooting

## Installation

### Sudo errors

Kontena Pharos [CLI Toolchain](install-toolchain.md) will use [SSH access](https://en.wikipedia.org/wiki/Secure_Shell) for making connections to cluster machines. For this purpose, all machines in a cluster must be configured to allow an user with passwordless sudo permission.

```
echo "$USER ALL=(ALL) NOPASSWD:ALL" | sudo tee /etc/sudoers.d/$USER
```

Please ensure the host operating system you are using is configured accordingly.

### Peer address does not seem to be a node local address

Most likely a master host is missing `private_address` or `private_interface`. Reason for the error message is that `address` is behind NAT and cannot be used for etcd cluster communication.
