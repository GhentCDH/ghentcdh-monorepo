import { hasGlobalComponent } from "/Users/bovandersteene/project/ugent/annotations/ghentcdh/node_modules/.pnpm/@vuepress+helper@2.0.0-rc.121_typescript@5.9.3_vuepress@2.0.0-rc.26_@vuepress+bundler-v_9d66bc6e00fd7bbe0fc4735b5f153ec6/node_modules/@vuepress/helper/lib/client/index.js";
import Badge from "/Users/bovandersteene/project/ugent/annotations/ghentcdh/node_modules/.pnpm/vuepress-plugin-components@2.0.0-rc.102_sass@1.97.3_typescript@5.9.3_vuepress@2.0.0-rc._7475224e9b0267cb727e5e982bd10dd0/node_modules/vuepress-plugin-components/lib/client/components/Badge.js";

import "/Users/bovandersteene/project/ugent/annotations/ghentcdh/node_modules/.pnpm/@vuepress+helper@2.0.0-rc.121_typescript@5.9.3_vuepress@2.0.0-rc.26_@vuepress+bundler-v_9d66bc6e00fd7bbe0fc4735b5f153ec6/node_modules/@vuepress/helper/lib/client/styles/sr-only.css";

export default {
  enhance: ({ app }) => {
    if(!hasGlobalComponent("Badge")) app.component("Badge", Badge);
    
  },
  setup: () => {

  },
  rootComponents: [

  ],
};
