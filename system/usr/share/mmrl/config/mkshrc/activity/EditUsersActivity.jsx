import { Page, Toolbar } from "@mmrl/ui";
import { useActivity } from "@mmrl/hooks";
import { ListItemText, List, ListItemButton } from "@mui/material";

import { EditorActivity } from "./activity/EditorActivity";

function EditUsersActivity() {
  const { context, extra } = useActivity();
  const { rootfs } = extra;

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
        <Toolbar.Center>Edit users</Toolbar.Center>
      </Toolbar>
    );
  };
  const listUsers = React.useMemo(() => {
    const home = new SuFile(`${rootfs}/home`);

    if (home.exist()) {
      return ["root", ...home.list()];
    } else {
      return [];
    }
  }, []);

  return (
    <Page renderToolbar={renderToolbar}>
      <List>
        {listUsers.map((user) => {
          if (user === "root") {
            const rootFile = new SuFile(path.resolve(rootfs, user, ".mkshrc"));

            if (!rootFile.exist()) {
              return null;
            }

            return (
              <ListItemButton
                disablePadding
                onClick={() => {
                  context.pushPage({
                    component: EditorActivity,
                    key: "EditUsersActivity",
                    extra: {
                      file: rootFile,
                    },
                  });
                }}
              >
                <ListItemText primary={user} secondary={rootFile.getPath()} />
              </ListItemButton>
            );
          } else {
            const userFile = new SuFile(path.resolve(rootfs, "home", user, ".mkshrc"));

            if (!userFile.exist()) {
              return null;
            }

            return (
              <ListItemButton
                disablePadding
                onClick={() => {
                  context.pushPage({
                    component: EditorActivity,
                    key: "EditUsersActivity",
                    extra: {
                      file: userFile,
                    },
                  });
                }}
              >
                <ListItemText primary={user} secondary={userFile.getPath()} />
              </ListItemButton>
            );
          }
        })}
      </List>
    </Page>
  );
}

export { EditUsersActivity };
