# Addon: Kured

***DEPRECATED: The `kured` addon is deprecated in 1.2. Use the new `host-upgrades` addon with `reboot: true` instead.***

[Kured](https://github.com/weaveworks/kured) performs safe automatic node reboots when the need to do so is indicated by the package management system of the underlying OS.

```yaml
kured:
  enabled: true
```
