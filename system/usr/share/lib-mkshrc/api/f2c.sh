# Scoped user bases variables
function mkshrc-setenv {
	eval export "\"${USER}_$1\""'="$2"'
}

function mkshrc-getenv {
	eval printenv "${USER}_$1"
}

function mkshrc-add-path {
  for p in "$@"; do
    export PATH="$PATH:$p"
  done
  unset p
}
