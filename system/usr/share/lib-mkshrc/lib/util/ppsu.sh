source $MKLIB/console/ui_print.sh

function ppsu {
	if [ -z $1 ]; then
		ui_print red "Seems that this user not exist"
		return
	fi
	__NAME=$(pm list packages -3 | cut -f 2 -d ":" | grep -E "(^|\s)$1($|\s)")
	__USER=$(pm list packages -U | grep "package:$__NAME uid:*" | cut -f 3 -d ":")
	if [ ! -f "/system/bin/su" ]; then
		ui_print red "Unable to find 'su' binary"
		return
	fi
	if [ -z $__USER ]; then
		ui_print red "Seems that this user not exist"
		return
	fi
	/system/bin/su --login $__USER --shell /system/bin/sh
	unset __NAME __USER
}
