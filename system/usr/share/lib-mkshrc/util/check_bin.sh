source $MKLIB/console/abort.sh

# Usage: check_bin magisk getprop
function check_bin {
    for bin in $@; do
        if ! command -v $bin >/dev/null; then
            abort 402 "$bin is missing"
        fi
    done
    unset bin
}
