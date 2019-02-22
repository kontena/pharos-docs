# Firewalld

[Firewalld](https://firewalld.org/) provides a dynamically managed firewall with support for network/firewall zones that define the trust level of network connections or interfaces.

By default Kontena Pharos does not enable any firewalld rules. Firewalls rules are only applied to cluster hosts if `network.firewalld` is enabled. When enabled following rules are applied by default:

- `22/tcp` - ssh is opened to all hosts
- `80/tcp` - http is opened to all hosts
- `443/tcp` - https is opened to all hosts
- `6443/tcp` - kubernetes api is opened to master hosts
- `30000-32767tcp+udp` - nodeports are opened to all hosts

Traffic between the cluster hosts is whitelisted automatically.

## Configuration

```yaml
network:
  firewalld:
    enabled: true
    #open_ports: # these are the defaults if firewalld is enabled
    #- port: "22"
    #  protocol: tcp
    #  roles:
    #  - "*"
    #- port: "80"
    #  protocol: tcp
    #  roles:
    #  - worker
    #- port: "443"
    #  protocol: tcp
    #  roles:
    #  - worker
    #- port: "6443"
    #  protocol: tcp
    #  roles:
    #  - master
    #- port: "30000-32767"
    #  protocol: tcp
    #  roles:
    #  - "*"
    #- port: "30000-32767"
    #  protocol: udp
    #  roles:
    #  - "*"
    #trusted_subnets:
    #  - "192.168.10.0/24"
```

### `enabled` (optional)

Specify if firewalld rules are applied. Supported options: `false` (default), `true`.

### `open_ports` (optional)

Specify ports that are opened to the outside world.

### `trusted_subnets` (optional)

An array of trusted subnets which can access all ports.
