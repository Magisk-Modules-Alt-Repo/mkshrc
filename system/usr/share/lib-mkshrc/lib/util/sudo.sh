# Usage: sudo [command]
function sudo {
  /system/bin/su -p -c "$@"
}
