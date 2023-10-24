import React from "react";
import { Page } from "@mmrl/ui";
import { useNativeProperties } from "@mmrl/hooks";
import { BugReport, FolderShared } from "@mui/icons-material";
import { ListItem, ListItemIcon } from "@mui/material";

function MkshrcConfig() {
  const [rootfs, setRootfs] = useNativeProperties("persist.mkshrc.rootfs", "/data/mkuser");

  return (
    <Page sx={{ p: 0 }}>
      <List subheader={<ListSubheader>Settings</ListSubheader>}>
        <ListItemDialogEditText
          onSuccess={(val) => {
            if (val) setRootfs(val);
          }}
          inputLabel="Path"
          type="text"
          initialValue={rootfs}
          title="Change ROOTFS"
          description="Changing this path will move/create a new environment"
        >
          <ListItemIcon>
            <FolderShared />
          </ListItemIcon>
          <ListItemText primary="Default ROOTFS" secondary={rootfs} />
        </ListItemDialogEditText>
      </List>

      <Divider />

      <List subheader={<ListSubheader>Project</ListSubheader>}>

        <ListItem disablePadding>
          <ListItemButton onClick={() => window.open("https://github.com/Magisk-Modules-Alt-Repo/mkshrc")}>
            <ListItemIcon>
              <BugReport />
            </ListItemIcon>
            <ListItemText primary="Report a issue" />
          </ListItemButton>
        </ListItem>
      </List>
    </Page>
  );
}

export default MkshrcConfig;
