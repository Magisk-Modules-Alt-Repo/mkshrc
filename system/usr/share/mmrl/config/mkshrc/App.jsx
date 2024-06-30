import React from "react";
import { Page, Toolbar, ListItemDialogEditText } from "@mmrl/ui";
import { useActivity, useConfig } from "@mmrl/hooks";
import { BugReport, FolderShared, Person } from "@mui/icons-material";
import { ListItemIcon, ListSubheader, List, ListItemButton, Divider, ListItemText } from "@mui/material";

import { EditUsersActivity } from "./activity/EditUsersActivity";

function App() {
  const { context } = useActivity();
  const [config, setConfig] = useConfig();

  const renderToolbar = () => {
    return (
      <Toolbar
        modifier="noshadow"
        sx={{
          background: "rgb(25,159,75)",
          background: "linear-gradient(204deg, rgba(25,159,75,1) 0%, rgba(16,16,16,1) 100%)",
        }}
      >
        <Toolbar.Left>
          <Toolbar.BackButton onClick={context.popPage} />
        </Toolbar.Left>
        <Toolbar.Center>Systemless Mkshrc</Toolbar.Center>
      </Toolbar>
    );
  };

  return (
    <Page renderToolbar={renderToolbar} sx={{ p: 0 }}>
      <List subheader={<ListSubheader>Settings</ListSubheader>}>
        <ListItemDialogEditText
          onSuccess={(val) => {
            if (val) setConfig("rootfs", val);
          }}
          inputLabel="Path"
          type="text"
          initialValue={config.rootfs}
          title="Change ROOTFS"
          description="Changing this path will move/create a new environment"
        >
          <ListItemIcon>
            <FolderShared />
          </ListItemIcon>
          <ListItemText primary="Default ROOTFS" secondary={config.rootfs} />
        </ListItemDialogEditText>
      </List>

      <Divider />

      <List subheader={<ListSubheader>Users</ListSubheader>}>
        <ListItemButton
          disablePadding
          onClick={() => {
            context.pushPage({
              component: EditUsersActivity,
              key: "EditUsersActivity",
              extra: {
                rootfs: config.rootfs,
              },
            });
          }}
        >
          <ListItemIcon>
            <Person />
          </ListItemIcon>
          <ListItemText primary="Edit user configs" />
        </ListItemButton>
      </List>

      <Divider />

      <List subheader={<ListSubheader>Project</ListSubheader>}>
        <ListItemButton disablePadding onClick={() => window.open("https://github.com/Magisk-Modules-Alt-Repo/mkshrc")}>
          <ListItemIcon>
            <BugReport />
          </ListItemIcon>
          <ListItemText primary="Report a issue" />
        </ListItemButton>
      </List>
    </Page>
  );
}

export { App };
