sudo() {
  su -c "$@"
}

set_perm() {
  sudo chown $2:$3 $1 || return 1
  sudo chmod $4 $1 || return 1
  (if [ -z $5 ]; then
    case $1 in
    *"system/vendor/app/"*) sudo chcon 'u:object_r:vendor_app_file:s0' $1 ;;
    *"system/vendor/etc/"*) sudo chcon 'u:object_r:vendor_configs_file:s0' $1 ;;
    *"system/vendor/overlay/"*) sudo chcon 'u:object_r:vendor_overlay_file:s0' $1 ;;
    *"system/vendor/"*) sudo chcon 'u:object_r:vendor_file:s0' $1 ;;
    *"data/chuser/"*) sudo chcon 'u:object_r:system_user_file:s0' $1 ;;
    *) sudo chcon 'u:object_r:system_file:s0' $1 ;;
    esac
  else
    sudo chcon $5 $1
  fi) || return 1
}