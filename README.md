# .mkshrc

Systemlessly mksh.rc for better Terminal experience to turn your device into a workstation :)

# FIRST RUN!

```
DO NOT RUN BASH WITH THIS MODULE
```

You should after the installation `su` in any terminal, to initialize the user/app folders. Every app has its own folder based on his username (`/data/chuser/root`).

## bin-get

There is an global installed `bin-get` bin to install some binaries for the current user. Take a look into [Zackptg5/Cross-Compiled-Binaries-Android](https://github.com/Zackptg5/Cross-Compiled-Binaries-Android), to see which bin can be installed.

### Example

```shell
bin-get install bash/bash
bin-get install zip/zip
```

## Core

- New setted `HOME` path that user specific is.
- Extened `PATH` that includes `system_ext` binaries
- Support for the Node.js module
- `profile.d` script that gets included into the environment
