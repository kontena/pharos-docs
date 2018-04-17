# Usage with Terraform

Pharos Cluster can read host information from [Terraform](https://www.terraform.io/) json output. In this scenario cluster.yml does not need to have `hosts` at all.

#### Example

**Terraform output config:**

```tf
output "pharos_api" {
  value = {
    endpoint = "${digitalocean_loadbalancer.pharos_master_lb.ip}"
  }
}

output "pharos_hosts" {
  value = {
    masters = {
      address         = "${digitalocean_droplet.pharos_master.*.ipv4_address}"
      private_address = "${digitalocean_droplet.pharos_master.*.ipv4_address_private}"
      role            = "master"
      user            = "root"
    }

    workers_2g = {
      address         = "${digitalocean_droplet.pharos_2g.*.ipv4_address}"
      private_address = "${digitalocean_droplet.pharos_2g.*.ipv4_address_private}"
      role            = "worker"
      user            = "root"

      label = {
        droplet = "2g"
      }
    }

    workers_4g = {
      address         = "${digitalocean_droplet.pharos_4g.*.ipv4_address}"
      private_address = "${digitalocean_droplet.pharos_4g.*.ipv4_address_private}"
      role            = "worker"
      user            = "root"

      label = {
        droplet = "4g"
      }
    }
  }
}
```

**Cluster.yml:**

```yaml
network: {}
addons:
  ingress-nginx:
    enabled: true
```

**Commands:**

```sh
$ terraform apply
$ terraform output -json > tf.json
$ pharos-cluster up -c cluster.yml --tf-json ./tf.json
```