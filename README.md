# Systemless mkshrc

Systemlessly mksh.rc for better Terminal experience to turn your device into a workstation :)

# FIRST RUN!

```
DO SHOULD NOT RUN BASH WITH THIS MODULE
```

You should after the installation `su` in any terminal, to initialize the user/app folders. Every app has its own folder based on his username (`/data/chuser/root`).

## Module mkshrc

Supporting mkshrc for every own magisk module, just simply create `<MODID>/system/etc/mkshrc.d/<name>.d.sh`

Supported APIs:

- `sudo`
- `setperm`
- `setperm:insecure`
  - This method uses root permissions. If you prefer an safer way please use `setperm`

### Extended usage

There are more things to import:

How to import:

```shell
source $MKLIB/<folder>/<file>.sh
```

#### core/installed

> ⚠️ This file includes insecure methods

Check if mkshrc is installed

```shell
[ ! -d $MKLIB ] && echo "Source fail!" && exit 122;
```

#### console/abort

```shell
# abort <code> <content>
abort 404 "Your file does not exist"
```

#### console/ui_print

```shell
# Available colors: none, red, green, yellow, white, cyan
ui_print cyan "Logged content"
```

#### util/setperm

> ⚠️ This file includes insecure methods

```shell
setperm $PREFIX/bin/* $USERID $USERID 0755

# Uses sudo in the backend
setperm:insecure $PREFIX/bin/* $USERID $USERID 0755
```

#### util/sudo

```shell
sudo ls
```

#### util/grepprop

> ⚠️ This file includes insecure methods

```shell
grepprop id /data/adb/modules/mkshrc/module.prop

# Uses sudo in the backend
grepprop:insecure id /data/adb/modules/mkshrc/module.prop
```

#### util/f2c

Alpha Fox2Code library parts. Thanks for the concept of this!

```shell
mkshrc-setenv "TEST_ENV" "Yolo"
mkshrc-getenv "TEST_ENV" # output: Yolo

mkshrc-add-path /data/bin \
          /system/bin
```
