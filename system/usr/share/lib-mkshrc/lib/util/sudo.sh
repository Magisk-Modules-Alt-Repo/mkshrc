# Usage: sudo [command]
function sudo {
  su -p -c "$@"
}
