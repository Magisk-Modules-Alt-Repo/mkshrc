source $MKLIB/console/ui_print.sh

# Usage: abort 5 "Canceled!"
function abort {
  ui_print red "$2"
  exit $1
}
