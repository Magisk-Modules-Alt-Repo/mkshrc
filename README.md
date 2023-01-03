# Systemless mkshrc

Systemlessly mksh.rc for better Terminal experience to turn your device into a workstation :)

# FIRST RUN!

```
DO NOT RUN BASH WITH THIS MODULE
```

You should after the installation `su` in any terminal, to initialize the user/app folders. Every app has its own folder based on his username (`/data/chuser/root`).

## Module mkshrc

Supporting mkshrc for every own magisk module, just simply create `<MODID>/system/etc/mkshrc.d/<name>.d.sh`

Supported APIs:

- `sudo`
- `setperm`
- `setperm:insecure`
  - This method uses root permissions. If you prefer an safer way please use `setperm`

## Core

- New setted `HOME` path that user specific is.
- Extened `PATH` that includes `system_ext` binaries
- Support for the Node.js module
- `profile.d` script that gets included into the environment
