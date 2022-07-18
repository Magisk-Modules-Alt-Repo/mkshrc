# .mkshrc

Systemlessly mksh.rc for better Terminal experience. Termux environment is also useable.

<changelog version="2022-05-22">
    - Removed suhelp
</changelog>

# What works outside?

- `pip` (Please do not execute/install any package as superuser, bc it works when you're in superuser. It brick your device (same as `yarn`))
- `npm` (May not work as superuser, it installs in some cases in the `/` dir, which is read-only bt default. run `sysrw` as superuser to make it read-write)
- `yarn` (Need to install manually. Do not execute/install any package as superuser, bc it'll write to `/` when is read-write)
- `apt` / `apt-get` (Doesn't work as superuser)
- `pkg` (Idk? haven't tested yet...)
- `python[2/3] [-m some_module]` (Works. You can also run an Telegram Userbot (e.g. HyperUBot))
- `bash` (Works)
- `node` (Works)
- `npm` (Install errors when installing modules as superuser)

> You have seen any binary works/not works yet? Tell me please!

## Make an vibrate flashbang

```bash
vibrator --samsung 2000 && flashbang 35
```

## YouTube DL

```bash
# Run in Termux env, not SuperUser env!
pkg upgrade && pkg update

# Install Python
pkg install python
```

**How to run outside of Termux?**

```bash
# In some cases need you to load the mkshrc manually (e.g. fooView Shell Executor)
if [ -f /system/etc/mkshrc ]; then
    . /system/etc/mkshrc
fi

arg1="output"
arg2="https://example.com/dfhjdsfjkbvn"

yt-dlp -o "/storage/emulated/0/Movies/$arg1.mp4" $arg2

# Try to reload the storage, apps won't detect the media files...
am broadcast -a android.intent.action.MEDIA_MOUNTED -d file:///mnt/sdcard
```
