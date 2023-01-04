source $MKLIB/util/sudo.sh

# Usage: grepprop id /data/adb/modules/mkshrc/module.prop
function grepprop {
  local REGEX="s/^$1=//p"
  cat $2 | sed -n "$REGEX"
}

# NOTE: This executed as root!
# Usage: grepprop id /data/adb/modules/mkshrc/module.prop
function grepprop:insecure {
  local REGEX="s/^$1=//p"
  sudo cat $2 | sed -n "$REGEX"
}
