SKIPMOUNT=false
PROPFILE=false
POSTFSDATA=false
LATESTARTSERVICE=false

print_modname() {
    ui_print "========================================="
    ui_print "            Systemless Mkshrc            "
    ui_print "-----------------------------------------"
    ui_print " Provides a systemless implementation of "
    ui_print " mkshrc for a better terminal experience "
    ui_print "-----------------------------------------"
    ui_print "      Magisk-Modules-Alt-Repo/mkshrc     "
    ui_print "========================================="
}

on_install() {
    ui_print "- Extracting module files"
    unzip -qq -o "$ZIPFILE" 'system/*' -d $MODPATH >&2

    # Check if conflicts are installed
    [ -d "$MODPATH/../terminalmods" ] && abort "'terminalmods' is installed, please remove it."
    # [ -d "$MODPATH/../ccbins" ] && abort "'ccbins' is installed, please remove it."

    [ -d "$MODPATH/system/bin/" ] || mkdir -p "$MODPATH/system/bin/"

    if [ -f "/system/bin/bash" ]; then
      ui_print "- Skipping bash install, already exist"
    else
      move_stdout "bash-$ARCH" "$MODPATH/system/bin/bash"
    fi
    
}

set_permissions() {
    # The following is the default rule, DO NOT remove
    set_perm_recursive $MODPATH 0 0 0755 0644
    set_perm $MODPATH/system/bin/bash 0 0 0755
    set_perm $MODPATH/system/usr/share/lib-mkshrc/bin/stew 0 0 0755
    set_perm $MODPATH/system/usr/share/lib-mkshrc/bin/open 0 0 0755
}
