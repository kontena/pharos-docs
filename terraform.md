# Deploying Kontena Pharos Cluster with Terraform

- [Overview](#overview)
- [Terraform Output Configuration](#terraform-output-configuration)
    - [Setting Hosts](#setting-hosts)
    - [Setting Addon Values](#setting-addon-values)
    - [Setting API Endpoint](#setting-api-endpoint)
- [Full Examples](#full-examples)

## Overview

The `pharos` CLI tool can read information from [Terraform](https://www.terraform.io/) JSON output. In this scenario `cluster.yml` contents can be partially read from a Terraform JSON output file.

Terraform output JSON integration can be enabled with `--tf-json` option, for example:

```
$ terraform apply
$ terraform output -json > tf.json
$ pharos up -c cluster.yml --tf-json tf.json
```

This example can be also executed as a single step:

```
$ pharos tf apply -c cluster.yml
```

To tear-down cluster:

```
$ pharos tf destroy
```

## Terraform Output Configuration

### Setting Hosts

`hosts` array in Kontena Pharos `cluster.yml` can be set via `pharos_hosts` output.

For example:

```
output "pharos_hosts" {
  value = {
    masters = {
      address         = "${aws_instance.pharos_master.*.public_ip}"
      private_address = "${aws_instance.pharos_master.*.private_ip}"
      role            = "master"
      user            = "ubuntu"
    }

    workers = {
      address         = "${aws_instance.pharos_worker.*.public_ip}"
      private_address = "${aws_instance.pharos_worker.*.private_ip}"
      role            = "worker"
      user            = "ubuntu"

      label = {
        ingress = "nginx"
      }
    }
  }
}
```

is equal to:

```yaml
hosts:
  - address: "..."
    private_address: "..."
    role: "master"
    user: "ubuntu"
  - address: "..."
    private_address: "..."
    role: "worker"
    user: "ubuntu"
    labels:
      ingress: "nginx"
```

in `cluster.yml`.

### Setting Addon Values

It's possible to set addon values in Kontena Pharos `cluster.yml` via `pharos_addons` output.

For example:

```
output "pharos_addons" {
  value = {
    my-addon = {
      enabled = true
      region = "eu-west-1"
    }
  }
}
```

is equal to:

```yaml
addons:
  my-addon:
    enabled: true
    region: "eu-west-1"
```

in `cluster.yml`.

### Setting API Endpoint

`api.endpoint` in Kontena Pharos `cluster.yml` can be set via `pharos_api` output.

For example:

```
output "pharos_api" {
  value = {
    endpoint = "my.kubernetes-api.com"
  }
}
```

is equal to:

```yaml
api:
  endpoint: "my.kubernetes-api.com"
```

in `cluster.yml`.

## Full Examples

- [AWS HA setup](https://github.com/kontena/pharos-cluster/tree/master/examples/terraform-aws)
- [DigitalOcean](https://github.com/kontena/pharos-cluster/tree/master/examples/terraform-do)
- [Packet (Bare Metal)](https://github.com/kontena/pharos-cluster/tree/master/examples/terraform-packet)
