source $MKLIB/util/sudo.sh

function grepprop {
  local REGEX="s/^$1=//p"
  cat $2 | sed -n "$REGEX"
}

function grepprop:insecure {
  local REGEX="s/^$1=//p"
  sudo cat $2 | sed -n "$REGEX"
}