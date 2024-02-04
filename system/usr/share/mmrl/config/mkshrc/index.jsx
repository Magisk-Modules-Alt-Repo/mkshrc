import React from "react";
import { Page, Toolbar } from "@mmrl/ui";
import { useNativeProperties, useActivity, useTheme } from "@mmrl/hooks";
import { BugReport, FolderShared, Person, Save } from "@mui/icons-material";
import { ListItemIcon, TextField } from "@mui/material";
import { read, write, list } from "@mmrl/sufile";

const def_id = "persist.mkshrc_v2.rootfs"
const def_rootfs = "/data/mkuser"

function EditorActivity() {
  const { context, extra } = useActivity();
  const { theme } = useTheme();
  const [content, setContent] = React.useState(read(extra.filename))

  const handleSave = () => {
    if (content) {
      write(extra.filename, content)
    }
  }

  const renderToolbar = () => {
    return (
      <Toolbar modifier="noshadow" sx={{
        background: "rgb(25,159,75)",
        background: "linear-gradient(204deg, rgba(25,159,75,1) 0%, rgba(16,16,16,1) 100%)",
      }}>
        <Toolbar.Left>
          <Toolbar.BackButton onClick={context.popPage} />
        </Toolbar.Left>
        <Toolbar.Center>{extra.filename}</Toolbar.Center>
        <Toolbar.Right>
          <Toolbar.Button icon={Save} onClick={handleSave} />
        </Toolbar.Right>
      </Toolbar>
    );
  };

  return (
    <Page renderToolbar={renderToolbar}>
      <TextField
        variant="outlined"
        onChange={(e) => {
          setContent(e.target.value)
        }}
        value={content}
        sx={{
          m: 1,
          height: "calc(100% - 8px)",
          width: "calc(100% - 8px)",
          "& label.Mui-focused": {
            color: theme.palette.primary.main,
          },
          "& .MuiInput-underline:after": {
            borderBottomColor: theme.palette.primary.main,
          },
          "& .MuiOutlinedInput-root": {
            height: "calc(100% - 8px)",
            width: "calc(100% - 8px)",
            "&.Mui-focused fieldset": {
              borderColor: theme.palette.primary.main,
            },
          },
        }}
        inputProps={{
          style: {
            height: "100%",
          },
        }}
        multiline />
    </Page>
  )
}

function EditUsersActivity() {
  const { context } = useActivity();
  const [rootfs] = useNativeProperties(def_id, def_rootfs)

  const renderToolbar = () => {
    return (
      <Toolbar modifier="noshadow" sx={{
        background: "rgb(25,159,75)",
        background: "linear-gradient(204deg, rgba(25,159,75,1) 0%, rgba(16,16,16,1) 100%)",
      }}>
        <Toolbar.Left>
          <Toolbar.BackButton onClick={context.popPage} />
        </Toolbar.Left>
        <Toolbar.Center>Edit users</Toolbar.Center>
      </Toolbar>
    );
  };

  const list_user = React.useMemo(() => list(rootfs + "/home"), [])

  return (
    <Page renderToolbar={renderToolbar}>
      <List>
        <ListItemButton disablePadding onClick={() => {
          context.pushPage({
            component: EditorActivity,
            key: "EditUsersActivity",
            extra: {
              filename: rootfs + "/root/.mkshrc"
            }
          })
        }}>
          <ListItemText primary="root" secondary={rootfs + "/root/.mkshrc"} />
        </ListItemButton>
        {list_user.map((user) => {
          const file = rootfs + "/home/" + user + "/.mkshrc"
          return (
            <ListItemButton disablePadding onClick={() => {
              context.pushPage({
                component: EditorActivity,
                key: "EditUsersActivity",
                extra: {
                  filename: file
                }
              })
            }}>
              <ListItemText primary={user} secondary={file} />
            </ListItemButton>
          )
        })}
      </List>
    </Page>
  )
}


function MkshrcConfig() {
  const { context } = useActivity();
  const [rootfs, setRootfs] = useNativeProperties(def_id, def_rootfs);

  const renderToolbar = () => {
    return (
      <Toolbar modifier="noshadow" sx={{
        background: "rgb(25,159,75)",
        background: "linear-gradient(204deg, rgba(25,159,75,1) 0%, rgba(16,16,16,1) 100%)",
      }}>
        <Toolbar.Left>
          <Toolbar.BackButton onClick={context.popPage} />
        </Toolbar.Left>
        <Toolbar.Center>Systemless Mkshrc Configure</Toolbar.Center>
      </Toolbar>
    );
  };

  return (
    <Page renderToolbar={renderToolbar} sx={{ p: 0 }}>
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

      <List subheader={<ListSubheader>Users</ListSubheader>}>
        <ListItemButton disablePadding onClick={() => {
          context.pushPage({
            component: EditUsersActivity,
            key: "EditUsersActivity",
            extra: {}
          })
        }}>
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

export default MkshrcConfig;
