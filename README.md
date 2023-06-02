# Systemless Mkshrc

Pprovide a systemless implementation of mkshrc for a better terminal experience on Android devices.

# FIRST RUN!

You should after the installation `su` in any terminal, to initialize the user/app folders. Every app has its own folder based on his username (`/data/mkuser/home/<USER>`).

## Important

- Since version **1.2.6 (126)** Mkshrc comes included with [ducaale/xh](https://github.com/ducaale/xh). `curl` and `wget` may not work at all.
- Since version **1.2.7 (127)** Mkshrc comes included with some binaries from [Zackptg5/Cross-Compiled-Binaries-Android](https://github.com/Zackptg5/Cross-Compiled-Binaries-Android).

## Root directory customization

`setprop persist.mkshrc.rootfs /data/<NEW_NAME>`

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

Check if mkshrc is installed

```shell
[ -z $MKLIB ] && echo "Source fail!" && exit 122;
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

## resolv.conf

Cloudflare

```
nameserver 1.1.1.1
nameserver 1.0.0.1
```

Google

```
nameserver 8.8.4.4
nameserver 8.8.8.8
```

# Troubleshooting

## xdg-open was not found

Already created app environments before `1.3.5` need manually link the `xdg-open` binary to thier current environment.

Run this command in your selected app environment
```bash
ln -s $MKBIN/open $PREFIX/bin/xdg-open
```
