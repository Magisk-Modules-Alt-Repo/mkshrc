source $MKLIB/console/abort.sh

function ppsu {
	if [ -z $1 ]; then
		abort 0 "Seems that this user not exist"
	fi
	__NAME=$(pm list packages -3 | cut -f 2 -d ":" | grep -E "(^|\s)$1($|\s)")
	__USER=$(pm list packages -U | grep "package:$__NAME uid:*" | cut -f 3 -d ":")
	if [ ! -f "/system/bin/su" ]; then
		abort 0 "su binary was not found"
	fi
	if [ -z $__USER ]; then
		abort 0 "Seems that this user not exist"
	fi
	/system/bin/su --login $__USER --shell /system/bin/sh
	unset __NAME __USER
}