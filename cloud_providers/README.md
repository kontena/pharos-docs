# Cloud Providers

Kontena Pharos supports a concept of [cloud providers](https://kubernetes.io/docs/getting-started-guides/scratch/#cloud-provider). Cloud provider is a module that provides an interface for managing load balancers, nodes (i.e. hosts) and networking routes. Optionally you can also configure the path to the cloud provider configuration file. For example:

```yaml
cloud:
  provider: openstack
  config: ./cloud-config
```

The supported configuration options:

* `provider` - specify used cloud provider (default: no cloud provider)
* `config` - path to provider specific cloud configuration file (default: no configuration file)


## Using Cloud Providers

- [AWS](#aws-cloud-provider)
- [Azure](#azure-cloud-provider)
- [OpenStack](#openstack-cloud-provider)
- [VSphere](#vsphere-cloud-provider)

### AWS Cloud Provider

```yaml
cloud:
  provider: aws
```

All nodes added to the cluster must be able to communicate with EC2 so that they can create and remove resources. You can enable this interaction by using an IAM role attached to the EC2 instance.

Example IAM role:

```js
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["ec2:*"],
      "Resource": ["*"]
    },
    {
      "Effect": "Allow",
      "Action": ["elasticloadbalancing:*"],
      "Resource": ["*"]
    }
  ]
}
```

##### Configuring ClusterID

AWS cloud provider needs a `ClusterID` tag for following resources in a cluster:

- `ec2 instances` - all EC2 instances that belong to the cluster
- `security groups` - the security group used for the cluster

Tag syntax:

- key = `kubernetes.io/cluster/<CLUSTER_ID>`
- value = `shared`

Note: autoscaling launch configuration should tag EC2 instances with value `owned`.

### Azure Cloud Provider

```yaml
cloud:
  provider: azure
  config: ./azure-cloud-config.json
```

Kubernetes knows how to interact with Azure via the cloud configuration file. You can create Azure cloud configuration file by specifying the following details in it.

```js
{
    "tenantId": "0000000-0000-0000-0000-000000000000",
    "aadClientId": "0000000-0000-0000-0000-000000000000",
    "aadClientSecret": "0000000-0000-0000-0000-000000000000",
    "subscriptionId": "0000000-0000-0000-0000-000000000000",
    "resourceGroup": "<name>",
    "location": "eastus",
    "subnetName": "<name>",
    "securityGroupName": "<name>",
    "vnetName": "<name>",
    "vnetResourceGroup": "",
    "primaryAvailabilitySetName": "<name>",
    "useInstanceMetadata": true
}
```

For more details see [Azure cloud provider](https://github.com/kubernetes/cloud-provider-azure/blob/master/docs/cloud-provider-config.md) documentation.

### OpenStack Cloud Provider

```yaml
cloud:
  provider: openstack
  config: ./openstack-cloud-config.ini
```

Kubernetes knows how to interact with OpenStack via the cloud configuration file. It is the file that will provide Kubernetes with credentials and location for the OpenStack auth endpoint. You can create a cloud.conf file by specifying the following details in it.

#### Example OpenStack Cloud Configuration

This is an example of a typical configuration that touches the values that most often need to be set. It points the provider at the OpenStack cloud’s Keystone endpointa and provides details for how to authenticate with it:

```ini
[Global]
username=user
password=pass
auth-url=https://<keystone_ip>/identity/v3
tenant-id=c869168a828847f39f7f06edd7305637
domain-id=2a73b8f597c04551a0fdc8e95544be8a
```

For more details see [Kubernetes cloud.conf](https://kubernetes.io/docs/concepts/cluster-administration/cloud-providers/#cloud-conf) documentation.

### VSphere Cloud Provider

```yaml
cloud:
  provider: vsphere
  config: ./vsphere.conf
```

#### Prerequisites

- All node VMs must be placed in vSphere VM folder. Create a VM folder following the instructions mentioned in [this link](https://docs.vmware.com/en/VMware-vSphere/6.0/com.vmware.vsphere.vcenterhost.doc/GUID-031BDB12-D3B2-4E2D-80E6-604F304B4D0C.html) and move Kubernetes Node VMs to this folder.
- The disk UUID on the node VMs must be enabled: the `disk.EnableUUID` value must be set to True. This step is necessary so that the VMDK always presents a consistent UUID to the VM, thus allowing the disk to be mounted properly. For each of the virtual machine nodes that will be participating in the cluster, follow the steps below using `govc`
    - Find Node VM Paths `govc ls /datacenter/vm/<vm-folder-name>`
    - Set `disk.EnableUUID` to true for all VMs `govc vm.change -e="disk.enableUUID=1" -vm='VM Path'`

    Note: If Kubernetes Node VMs are created from template VM then `disk.EnableUUID=1` can be set on the template VM. VMs cloned from this template, will automatically inherit this property.

#### Example VSphere Cloud Configuration

```ini
[Global]
user = "Administrator1@vsphere.local"
password = "password"
port = "443"
insecure-flag = "1"
datacenters = "us-east"

[VirtualCenter "1.1.1.1"]

[Workspace]
server = "1.1.1.1"
datacenter = "us-east"
default-datastore="sharedVmfs-0"
folder = "kubernetes"

[Disk]
scsicontrollertype = pvscsi

[Network]
public-network = "VM Network"
```

For more details see [VSphere cloud.conf](https://vmware.github.io/vsphere-storage-for-kubernetes/documentation/) documentation.
