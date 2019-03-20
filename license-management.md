# License Management

Kontena Pharos PRO version requires a valid Kontena Pharos license. However, you can freely evaluate all features for 30 days.

After the trial period or license expiration Kontena Pharos cluster will be iceboxed. It means that Kubernetes [controller manager](https://kubernetes.io/docs/reference/command-line-tools-reference/kube-controller-manager/#kube-controller-manager) and [scheduler](https://kubernetes.io/docs/reference/command-line-tools-reference/kube-scheduler/) components will be shutdown and no deployments and scheduling is possible anymore. To solve the issue, user must assign a valid license to Kontena Pharos cluster.

## Buying a License

To buy Kontena Pharos licenses, please contact [sales@kontena.io](mailto:sales@kontena.io).

## Assigning a License to Kontena Pharos cluster

All Kontena Pharos licenses are visible at [Kontena Account](https://account.kontena.io) service. To assign the license to the cluster, user need first to obtain the license key from Kontena Account. Then user can assign the license with Pharos CLI tool and execute `pharos license assign` command and enter the license key. Alternatively, the license key can be entered on Kontena Lens dashboard.

**Note** User can assign the same license only to one cluster at a time. To transfer the license to other cluster user must unassign the license at Kontena Account before assigning it to a new cluster.
