#!/system/bin/sh

_getprop() {
	exec /system/bin/getprop $@
}

_log() {
	if command -v log >/dev/null; then
		log -p "$1" "$2" -t "Mkshrc"
	fi
}

ROOTFS=$(_getprop "persist.mkshrc.rootfs" "/data/mkuser")
DISABLE_SERVICE=$(_getprop "persist.mkshrc.service" "true")
DISABLE_NOTIFY=$(_getprop "persist.mkshrc.notify" "true")
ENABLE_LOGGING=$(_getprop "persist.mkshrc.logging" "false")

PIDS_DIR="$ROOTFS/var/mkservice"
PIDS_FILE="$PIDS_DIR/pids.prop"

_setmkservice() {
	if [ ! -d "$PIDS_DIR" ]; then
		mkdir "$PIDS_DIR"
	fi
	
	if [ ! -f "$PIDS_FILE" ]; then
		touch "$PIDS_FILE"
	fi
	
	local thekey="$1"
	local newvalue="$2"
	
	if ! grep -R "^[#]*\s*${thekey}=.*" $PIDS_FILE > /dev/null; then
		_log "w" "APPENDING because '${thekey}' not found"
		echo "$thekey=$newvalue" >> $PIDS_FILE
	else
		_log "w" "SETTING because '${thekey}' found already"
		sed -ir "s/^[#]*\s*${thekey}=.*/$thekey=$newvalue/" $PIDS_FILE
	fi
}

_getmkservice() {
	grep "${1}" "$PIDS_FILE" | cut -d'=' -f2
}

_notify() {
	if [ ! "$DISABLE_NOTIFY" = "false" ]; then
		su -lp 2000 -c "cmd notification post -S bigtext -t '$1' '$RANDOM' '$2'"
	fi
}

main() {
	if [ -f "$PIDS_FILE" ]; then
		rm $PIDS_FILE
	fi
	
	local TITLE="Mkshrc Service Startup"
	local SERVICE_D="$ROOTFS/etc/service.d"

	if ! command -v nohup >/dev/null; then
		_notify "$TITLE" "The \"nohup\" binary was not found! Please ensure you have it installed."
		_log "e" "nohup binary wasn't found"
		exit 1
	fi

	_notify "$TITLE" "Start executing scripts in $ROOTFS/etc/service.d"

	if [ -d "$SERVICE_D" ]; then
		for script_d in $SERVICE_D/*.sh; do
			if [ -f $script_d ]; then
				nohup sh $script_d >/dev/null 2>&1 &
				_setmkservice "$(basename ${script_d%.*})" "$!"
				_log "i" "$script_d has been executed with \"nohup\""
			fi
		done
	else
		_log "w" "unable to find $SERVICE_D folder"
	fi

	unset script_d
}

while [[ $(getprop sys.boot_completed) -ne 1 ]]; do
	sleep 1
done

sleep 120
main "$@"
