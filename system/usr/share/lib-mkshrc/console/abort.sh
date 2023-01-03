#!/system/bin/sh

source $MKLIB/console/ui_print.sh

function abort {
  ui_print red $1
  exit 1
}
