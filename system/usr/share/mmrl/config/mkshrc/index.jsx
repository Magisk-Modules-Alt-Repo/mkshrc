import { ConfigProvider } from "@mmrl/providers";
import { withRequireNewVersion } from "@mmrl/hoc";

import { App } from "./App";

const configFIle = new SuFile(`/data/adb/mmrl/${__idname}.prop`);
if (!configFIle.exist()) {
  configFIle.create();
}

export default withRequireNewVersion({
  versionCode: 21918,
  component: () => {
    return (
      <ConfigProvider
        loadFromFile={configFIle.getPath()}
        initialConfig={{
          rootfs: "/data/mkuser",
        }}
        loader="ini"
      >
        <App />
      </ConfigProvider>
    );
  },
});
