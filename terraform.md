# Deploying Kontena Pharos Cluster with Terraform

- [Overview](#overview)
- [Terraform Output Configuration](#terraform-output-configuration)
- [Legacy Terraform Output Configuration](#legacy-terraform-output-configuration)
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

This output format works only with Terraform >= 0.12.

Full cluster.yml configuration can be generated via `pharos_cluster` output. It's also possible to generate partial configuration which is then merged to `cluster.yml` contents (using deep-merge).

Example:

```
output "pharos_cluster" {
    value = {
        hosts = [
            for host in concat(aws_instance.pharos_master, aws_instance.pharos_worker)  : {
                address           = host.public_ip
                private_address   = host.private_ip
                role              = host.tags["role"]
                user              = "root"
                container_runtime = "${var.container_runtime}"
            }
        ]
        addons = {
            ingress-nginx = {
                enabled = true
            }
        }
    }
}
```

## Full Examples

- [AWS HA setup](https://github.com/kontena/pharos-cluster/tree/master/examples/terraform-aws)
- [DigitalOcean](https://github.com/kontena/pharos-cluster/tree/master/examples/terraform-do)
- [Packet (Bare Metal)](https://github.com/kontena/pharos-cluster/tree/master/examples/terraform-packet)
