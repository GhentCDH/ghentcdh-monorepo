import { Layout, NotFound, injectDarkMode, setupDarkMode, setupSidebarItems, scrollPromise } from "/Users/bovandersteene/project/ugent/annotations/ghentcdh/node_modules/.pnpm/vuepress-theme-hope@2.0.0-rc.102_markdown-it@14.1.1_sass@1.97.3_typescript@5.9.3_vuepre_7cba9b558c37bc2bdf437ed0ec954af6/node_modules/vuepress-theme-hope/lib/bundle/exports/base.js";

import { defineCatalogInfoGetter } from "/Users/bovandersteene/project/ugent/annotations/ghentcdh/node_modules/.pnpm/@vuepress+plugin-catalog@2.0.0-rc.121_typescript@5.9.3_vuepress@2.0.0-rc.26_@vuepress+b_720f2016b88e2bf1863860b40bb2b44f/node_modules/@vuepress/plugin-catalog/lib/client/index.js"
import { h } from "vue"
import { resolveComponent } from "vue"

import "/Users/bovandersteene/project/ugent/annotations/ghentcdh/node_modules/.pnpm/@vuepress+helper@2.0.0-rc.121_typescript@5.9.3_vuepress@2.0.0-rc.26_@vuepress+bundler-v_9d66bc6e00fd7bbe0fc4735b5f153ec6/node_modules/@vuepress/helper/lib/client/styles/colors.css";
import "/Users/bovandersteene/project/ugent/annotations/ghentcdh/node_modules/.pnpm/@vuepress+helper@2.0.0-rc.121_typescript@5.9.3_vuepress@2.0.0-rc.26_@vuepress+bundler-v_9d66bc6e00fd7bbe0fc4735b5f153ec6/node_modules/@vuepress/helper/lib/client/styles/normalize.css";
import "/Users/bovandersteene/project/ugent/annotations/ghentcdh/node_modules/.pnpm/@vuepress+helper@2.0.0-rc.121_typescript@5.9.3_vuepress@2.0.0-rc.26_@vuepress+bundler-v_9d66bc6e00fd7bbe0fc4735b5f153ec6/node_modules/@vuepress/helper/lib/client/styles/sr-only.css";
import "/Users/bovandersteene/project/ugent/annotations/ghentcdh/node_modules/.pnpm/vuepress-theme-hope@2.0.0-rc.102_markdown-it@14.1.1_sass@1.97.3_typescript@5.9.3_vuepre_7cba9b558c37bc2bdf437ed0ec954af6/node_modules/vuepress-theme-hope/lib/bundle/styles/bundle.scss";

defineCatalogInfoGetter((meta) => {
  const title = meta.title;
  const shouldIndex = meta.index ?? true;
  const icon = meta.icon;

  return shouldIndex ? {
    title,
    content: icon ? () =>[h(resolveComponent("VPIcon"), { icon, sizing: "both" }), title] : null,
    order: meta.order,
    index: meta.index,
  } : null;
});

export default {
  enhance: ({ app, router }) => {
    const { scrollBehavior } = router.options;

    router.options.scrollBehavior = async (...args) => {
      await scrollPromise.wait();

      return scrollBehavior(...args);
    };

    // inject global properties
    injectDarkMode(app);


  },
  setup: () => {
    setupDarkMode();
    setupSidebarItems();

  },
  layouts: {
    Layout,
    NotFound,

  }
};
