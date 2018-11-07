# Addon: Pharos Host Upgrades

Automatic host operating system security updates provided by [Pharos Host Upgrades](https://github.com/kontena/pharos-host-upgrades/) daemonset. Performs a rolling upgrade using a kube resource lock to ensure that only one host node upgrades at a time.

- version: `0.2.0`
- maturity: `stable`
- architectures: `x86-64`, `arm64`
- available in: `OSS`, `Pro`, `EE`

## Configuration

```yaml
host-upgrades:
  enabled: true
  schedule: "30 6 * * *"
  schedule_window: 1h
  reboot: true
```

If `reboot` is enabled, then the host nodes also reboot with the lock held, ensuring that the host upgrades do not resume until the host node has succesfully rebooted and restarted the kube pods. When rebooting, `drain` is also enabled by default, evicing kube workload pods from the kube node before rebooting, and uncordoning the kube node once the reboot is complete.

## Options

* `schedule` - when upgrades are applied (crontab string) (***required***)
* `schedule_window` - limit total length of the rolling upgrade window across all host nodes (default: unlimited)
* `reboot` - automatically reboot host after (kernel) upgrades that require rebooting to apply (default: false)
* `drain` - drain the kube node while rebooting (default: true)

### `schedule`

Standard crontab with five fields: Minutes, Hours, Day of month, Month, Day of week

Examples:

* `15 5 * * *` - every day at 05:15
* `1 0 * * SUN` - every sunday at 01:00
* `@daily` at midnight

### `schedule_window`

Time duration with suffixes: hours, minutes, seconds

Examples:

* `1 hour`
* `1h30m`
