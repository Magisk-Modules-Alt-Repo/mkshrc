#!/system/bin/sh
# Please don't hardcode /magisk/modname/... ; instead, please use $MODDIR/...
# This will make your scripts compatible even if Magisk change its mount point in the future
MODDIR=${0%/*}

# Wait for boot to finish completely
dbg "Sleeping until boot completes."
while [[ `getprop sys.boot_completed` -ne 1 ]]
do
  sleep 1
done

# Sleep an additional 20s to ensure init is finished
sleep 20

mount_error() {
  su -lp 2000 -c "cmd notification post -S bigtext -t 'Mkshrc Service Mount Error' 'Tag' 'There was an errer while mounting your system as read-write or read-only.'"
}

link_error() {
  su -lp 2000 -c "cmd notification post -S bigtext -t 'Mkshrc Symlink Error' 'Tag' 'There was an error while linking /system to /usr. You running probably an read-only system.'"
}

# This is required because "#!/usr/bin/env node" cannot loaded.
if [ ! -d "/usr" ]; then
  mount -o rw,remount / || mount_error
  ln -s -T /system /usr || link_error
  mount -o ro,remount / || mount_error
fi

# This script will be executed in late_start service mode
# More info in the main Magisk thread