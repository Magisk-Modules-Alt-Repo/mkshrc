import { Page, Toolbar } from "@mmrl/ui";
import { useActivity, useTheme } from "@mmrl/hooks";
import { TextField } from "@mui/material";
import { Save } from "@mui/icons-material";

function EditorActivity() {
  const { context, extra } = useActivity();
  const { theme } = useTheme();

  const [content, setContent] = React.useState(extra.file.read());

  const handleSave = () => {
    if (content) {
      extra.file.write(content);
    }
  };

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
        <Toolbar.Center>{extra.file.getPath()}</Toolbar.Center>
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
          setContent(e.target.value);
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
        multiline
      />
    </Page>
  );
}

export { EditorActivity };
