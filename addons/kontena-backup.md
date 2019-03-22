# Addon: Kontena Backup

Kontena Backup provides unified and simple tools to backup cluster resources and persistent volumes. Kontena Backup is built on top of [Ark](https://github.com/heptio/ark).

- version: `0.9.6+kontena.1`
- maturity: `beta`
- architectures: `x86-64`
- available in: `Pro`, `EE`

## Features

- Backup cluster resources
- Restore Cluster resources from existing backup
- Schedule backups

## Configuration

```yaml
addons:
  kontena-backup:
    enabled: true
    cloud_credentials: /path/to/aws_credentials
    aws:
      bucket: pharos-backups
      region: eu-central-1
      # s3_force_path_style: false
      # s3_url: ""
    # gcp:
    #   bucket: ""
```

### Options

- `cloud_credentials` - The path to cloud credentials used when storing the backup artefacts to configured object storage. See [cloud credentials](#cloud-credentials) for details.
- `aws` - Configure backups to be stored in AWS S3 buckets or in S3 compatible object stores (e.g. Minio, Wasabi, etc.)
    - `region` - The region of the bucket
    - `bucket` - Name of the bucket. Kontena Backup addon will also automatically create & use `<name>-restic` bucket to store persistent volume backups
    - `s3_force_path_style` - Set this to true if you are using a S3 compatible storage service other than AWS itself
    - `s3_url` - You can specify the S3 URL here for explicitness, but Ark can already generate it from region, and bucket. This field is primarily for other storage services like Minio.
- `gcp` - Configure bacups to be stored on GCP object storage
    - `bucket` - Name of the bucket. Kontena Backup addon will also automatically create & use `<name>-restic` bucket to store persistent volume backups


#### Cloud Credentials

##### AWS

Kontena Backup addon expects to see the AWS credentials file in the following format:

```
[default]
aws_access_key_id=<AWS_ACCESS_KEY_ID>
aws_secret_access_key=<AWS_SECRET_ACCESS_KEY>
```

Make sure the credentials used have proper IAM roles to allow it to access the configured bucket.

See more details at https://github.com/heptio/ark/blob/v0.9.6/docs/aws-config.md#create-iam-user

##### GCP

You can create the needed credentials by using:

```
gcloud iam service-accounts keys create credentials-ark \
    --iam-account $SERVICE_ACCOUNT_EMAIL
```

Make sure the service account used has proper roles & permissions to use the configured bucket.

See more details at https://github.com/heptio/ark/blob/v0.9.6/docs/gcp-config.md#create-service-account


### Working with backups & restores

**Note:** You need to have cluster admin privileges to work with backups and restores.

Kontena Backup addon comes with a special "toolbox" pod that has all the needed tools pre-installed. You can find the pod name using:
```
kubectl get pod -n kontena-backup
```

To be able to use the tools you need to `exec` into the toolbox pod using:
```
kubectl exec -n kontena-backup -ti  toolbox-6dfd9dc755-78s75 bash
```

Replace the toolbox pod name with the one in your cluster.

#### On-demand backups

Once executed into the backup toolbox pod, you can use `ark backup ...` commands to work with on-demand backups.

For example to take a backup of everything in a namespace called `my-namespace` you can issue command:
```
ark backup create my-backup --include-namespaces my-namespace
```

To see details and status of a backup use
```
ark backup describe my-backup
```

See more information at https://github.com/heptio/ark/blob/v0.9.6/docs/cli-reference/ark_backup_create.md

You can also customize the backup proces by using [hooks](https://github.com/heptio/ark/blob/v0.9.6/docs/hooks.md) as Pod annotations. These allow you e.g. to make sure that the app is in consistent state before the volume backups.

#### Scheduling backups

Kontena Backup addon enables you to schedule backups using `ark schedule ...` commands.

For example to create a daily backup use:
```
ark schedule create my-backups --schedule="@daily" --include-namespaces='*'
```

The `--schedule` option uses "standard" 5-field cron syntax.

See more information at https://github.com/heptio/ark/blob/v0.9.6/docs/cli-reference/ark_schedule_create.md

#### Restoring backups

To see the list of existing backups use:
```
ark backup get
```

Once you've identified which backup you want to restore, use:
```
ark restore create --from-backup backup-1
```

See more information at https://github.com/heptio/ark/blob/v0.9.6/docs/cli-reference/ark_restore_create.md

### Backing up persistent volumes

Kontena Backup addon comes with pre-integrated [Restic](https://github.com/restic/restic). Restic allows backing up and restoring Kubernetes volumes.

To include volumes into backups you need to annotate the pods to include their volumes into backups. For example:
```
apiVersion: v1
 kind: Pod
 metadata:
   name: sample
   namespace: foo
   annotations:
    backup.ark.heptio.com/backup-volumes=pvc-volume,emptydir-volume
 spec:
   containers:
   - image: k8s.gcr.io/test-webserver
     name: test-webserver
     volumeMounts:
     - name: pvc-volume
       mountPath: /volume-1
     - name: emptydir-volume
       mountPath: /volume-2
   volumes:
   - name: pvc-volume
     persistentVolumeClaim:
       claimName: test-volume-claim
   - name: emptydir-volume
     emptyDir: {}
```

This would make both pod volumes to be included in the backup. Naturally during restore, Kontena Backup addon will restore the volume contents too.

See more information at https://github.com/heptio/ark/blob/v0.9.6/docs/restic.md#back-up

