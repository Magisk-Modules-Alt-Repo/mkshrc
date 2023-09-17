<List subheader={<ListSubheader>Settings</ListSubheader>}>
  <ListItemDialogEditText
      id="rootfs"
      scope="mkshrc"
      inputLabel="Path"
      type="text"
      title="Change ROOTFS"
      initialValue="/data/mkuser"
      description="Changing this path will move/create a new environment">
    <ListItemText primary="Default ROOTFS" secondary={getprop("persist.mkshrc.rootfs", "/data/mkuser")} />
  </ListItemDialogEditText>
</List>

<Divider/>

<List subheader={<ListSubheader>Project</ListSubheader>}>
  <OnClick handler={openLink("https://github.com/Magisk-Modules-Alt-Repo/mkshrc/issues")}>
    <ListItemButton>
      <ListItemText primary="Report a issue" />
    </ListItemButton>
  </OnClick>
  <OnClick handler={openLink("https://github.com/Magisk-Modules-Alt-Repo/mkshrc")}>
    <ListItemButton>
      <ListItemText primary="Source code" />
    </ListItemButton>
  </OnClick>
  <OnClick handler={openLink("https://github.com/Magisk-Modules-Alt-Repo/node")}>
    <ListItemButton>
      <ListItemText primary="Try Node.js" />
    </ListItemButton>
  </OnClick>
</List>