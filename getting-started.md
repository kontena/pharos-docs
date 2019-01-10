# Getting Started with Kontena Pharos

Pharos allows you to bootstrap and manage your Kubernetes clusters super easily. You can get started in few minutes by following these steps.

1. Setup Pharos CLI Tooling
2. Prepare the Nodes for the Kubernetes Cluster
3. Creating the Cluster Configuration File
4. Bootstrapping Kubernetes Cluster Using Pharos
5. Interacting with your Kubernetes Cluster


## Setup Pharos CLI Tooling

Follow these easy steps to setup Pharos CLI tooling. For more detailed instructions and explanations, see [CLI installation docs](install.md).

First we need to install our Pharos version switcher tool:
```
$ curl -s https://get.pharos.sh | bash
```
```
$ chpharos login
Log in using your Kontena Account credentials
Visit https://account.kontena.io/ to register a new account.
Username: adam
Password:
Logged in.
```

With `chpharos` we can easily manage the actual Pharos CLI tool:
```
$ chpharos install latest --use
```

Now you should have the tooling ready, we can continue to next phase.

## Prepare Nodes for Kubernetes Cluster

Most of the Kubernetes cluster components are launched using containers (Docker or CRI-O) on a Linux distro. You can use most common Linux distros, we [support many of them](requirements.md).

> **Tip:** In our GitHub repo, there's ready made examples for setting up the cluster using Vagrant boxes. This is an easy way to get started if you do not have any other infrastructure available to play with. See https://github.com/kontena/pharos-cluster/tree/master/examples/vagrant/centos7

## Create the Cluster Configuration File

With Pharos, the cluster is [configured](configuration.md) using a yaml file. In this example we setup simple 1+1 cluster, one node acts as the control plane and one as pure worker node.

So open up your favourite editor, and type something similar as in the example below. Once done, save the file as `cluster.yml`. Naturally you need to adjust the example to match your infrastructure at hand.

```yaml
hosts:
  - address: 192.168.110.100
    user: vagrant
    role: master
    ssh_key_path: ~/.ssh/my_key
  - address: 192.168.110.101
    user: vagrant
    role: worker
    ssh_key_path: ~/.ssh/my_key
network: {} # Use Weave networking with default config
addons:
  ingress-nginx:
    enabled: true # Enable Nginx ingress controller
```

For more complex cases, there's huge amount of [configuration options](configuration.md) and [addons](addons/) available.

## Bootstrap your First Pharos Kubernetes Cluster

Once the cluster definition is ready, we can fire up the cluster.

In the same directory where you created the `cluster.yml` file, run:
```
$ pharos up
```

Pharos connects to the infrastructure you've configured with SSH connections and configures everything needed on the hosts. Within few minutes you should have your cluster up-and-running.

## Interact with the Cluster

To interact with the cluster, we need to get the [kubeconfig](https://kubernetes.io/docs/concepts/configuration/organize-cluster-access-kubeconfig/) file to access it as an administrator. Pharos tooling makes this super easy for you. Again, in the same directory with the `cluster.yml` file run:
```
$ pharos kubeconfig > kubeconfig
```

Then to apply it for Kubernetes tooling, run:
```
export KUBECONFIG="${PWD}/kubeconfig"
```

To verify everything worked, run:
```
$ kubectl get nodes
```


Now you're ready to work with the cluster, go ahead and use your favourite tools to deploy applications.

