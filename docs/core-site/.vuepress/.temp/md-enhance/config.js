import CodeDemo from "/Users/bovandersteene/project/ugent/annotations/ghentcdh/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.102_markdown-it@14.1.1_sass@1.97.3_typescript@5.9.3_cb84f13dffe2669380b70582c672771e/node_modules/vuepress-plugin-md-enhance/lib/client/components/CodeDemo.js";
import MdDemo from "/Users/bovandersteene/project/ugent/annotations/ghentcdh/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.102_markdown-it@14.1.1_sass@1.97.3_typescript@5.9.3_cb84f13dffe2669380b70582c672771e/node_modules/vuepress-plugin-md-enhance/lib/client/components/MdDemo.js";

export default {
  enhance: ({ app }) => {
    app.component("CodeDemo", CodeDemo);
    app.component("MdDemo", MdDemo);
  },
};
