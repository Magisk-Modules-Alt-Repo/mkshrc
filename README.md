# .mkshrc

Systemlessly mksh.rc for better Terminal experience to turn your device into a workstation :)

# FIRST RUN!

```
DO NOT RUN BASH WITH THIS MODULE
```

You should after the installation `su` in any terminal, to initialize the user/app folders. Every app has its own folder based on his username (`/data/chuser/root`).

## Module mkshrc

Supporting mkshrc for every own magisk module, just simply create `<MODID>/system/etc/<MODID>.mkshrc`

Supported APIs:

- sudo
- set_perm

## bin-get

There is an global installed `bin-get` bin to install some binaries for the current user. Take a look into [Zackptg5/Cross-Compiled-Binaries-Android](https://github.com/Zackptg5/Cross-Compiled-Binaries-Android), to see which bin can be installed.

### Example

```shell
bin-get install bash/bash
bin-get install zip/zip
```

## Yarn Installation Script

One of the easiest ways to install Yarn on macOS and generic Unix environments is via our shell script. You can install Yarn by running the following code in your terminal:

```shell
curl -o- -L https://raw.githubusercontent.com/Googlers-Repo/extra/master/yarn-install.sh | sh
```

The installation process includes verifying a GPG signature. [View the source on GitHub](https://github.com/yarnpkg/website/blob/master/install.sh)

You can also specify a version by running the following code in your terminal:

```shell
curl -o- -L https://raw.githubusercontent.com/Googlers-Repo/extra/master/yarn-install.sh | sh -s -- --version [version]
```

See [the releases](https://github.com/yarnpkg/yarn/releases) for possible versions.

## Core

- New setted `HOME` path that user specific is.
- Extened `PATH` that includes `system_ext` binaries
- Support for the Node.js module
- `profile.d` script that gets included into the environment
