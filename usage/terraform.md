# Usage with Terraform

Pharos Cluster can read information from [Terraform](https://www.terraform.io/) json output. In this scenario cluster.yml contents can be partially read from Terraform json output.

Terraform output json integration can be enabled with `--tf-json` option, for example:

```bash
$ pharos up -c cluster.yml --tf-json tf.json
```

- [Setting Hosts](#setting-hosts)
- [Setting Addons](#setting-addons)
- [Setting API Endpoint](#setting-api-endpoint)
- [Full Examples](#full-examples)


## Setting Hosts

`hosts` array in Kontena Pharos `cluster.yml` can be set via `pharos_hosts` output.

For example:

```go
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
      label:
        ingress: "nginx"
```

in `cluster.yml`.

## Setting Addons

It's possible to set addon values in Kontena Pharos `cluster.yml` via `pharos_addons` output.

For example:

```go
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

## Setting API Endpoint

`api.endpoint` in Kontena Pharos `cluster.yml` can be set via `pharos_api` output.

For example:

```go
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