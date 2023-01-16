source $MKLIB/console/abort.sh
source $MKLIB/util/sudo.sh
source $MKLIB/util/check_bin.sh

# Check if these binaries are exists
check_bins magisk
data_base="/data/adb"
magisk_sbin="$(sudo magisk --path)/.magisk"
paths=($data_base/modules/mkshrc/module.prop $magisk_sbin/modules/mkshrc/module.prop)
for module in ${paths[@]}; do
    if sudo [ ! -f $module ]; then
        abort 404 "FATAL ABORT: Mkshrc isn't installed on the device!"
    fi
done
unset module paths magisk_sbin data_base
