import { hasGlobalComponent } from "/Users/bovandersteene/project/ugent/annotations/ghentcdh/node_modules/.pnpm/@vuepress+helper@2.0.0-rc.121_typescript@5.9.3_vuepress@2.0.0-rc.26_@vuepress+bundler-v_9d66bc6e00fd7bbe0fc4735b5f153ec6/node_modules/@vuepress/helper/lib/client/index.js";
import { useScriptTag } from "/Users/bovandersteene/project/ugent/annotations/ghentcdh/node_modules/.pnpm/@vueuse+core@14.2.1_vue@3.5.29_typescript@5.9.3_/node_modules/@vueuse/core/dist/index.js";
import { h } from "vue";
import { VPIcon } from "/Users/bovandersteene/project/ugent/annotations/ghentcdh/node_modules/.pnpm/@vuepress+plugin-icon@2.0.0-rc.121_markdown-it@14.1.1_typescript@5.9.3_vuepress@2.0.0-r_ac81c2da6807bdf2f9048f7f7707c791/node_modules/@vuepress/plugin-icon/lib/client/index.js"

export default {
  enhance: ({ app }) => {
    if(!hasGlobalComponent("VPIcon")) {
      app.component(
        "VPIcon",
        (props) =>
          h(VPIcon, {
            type: "iconify",
            prefix: "",
            ...props,
          })
      )
    }
  },
  setup: () => {
    useScriptTag(`https://cdn.jsdelivr.net/npm/iconify-icon@2`);
  },
}
