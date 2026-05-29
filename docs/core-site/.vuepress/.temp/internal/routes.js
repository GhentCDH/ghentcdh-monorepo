export const redirects = JSON.parse("{}")

export const routes = Object.fromEntries([
  ["/", { loader: () => import(/* webpackChunkName: "index.html" */"/Users/bovandersteene/project/ugent/annotations/ghentcdh/docs/core-site/.vuepress/.temp/pages/index.html.js"), meta: {"title":"GhentCDH Monorepo for Shared Logic"} }],
  ["/authentication/", { loader: () => import(/* webpackChunkName: "authentication_index.html" */"/Users/bovandersteene/project/ugent/annotations/ghentcdh/docs/core-site/.vuepress/.temp/pages/authentication/index.html.js"), meta: {"title":""} }],
  ["/tools/release.html", { loader: () => import(/* webpackChunkName: "tools_release.html" */"/Users/bovandersteene/project/ugent/annotations/ghentcdh/docs/core-site/.vuepress/.temp/pages/tools/release.html.js"), meta: {"title":"How to release a new version"} }],
  ["/authentication/api/", { loader: () => import(/* webpackChunkName: "authentication_api_index.html" */"/Users/bovandersteene/project/ugent/annotations/ghentcdh/docs/core-site/.vuepress/.temp/pages/authentication/api/index.html.js"), meta: {"title":"Backend nestjs"} }],
  ["/logging/api/", { loader: () => import(/* webpackChunkName: "logging_api_index.html" */"/Users/bovandersteene/project/ugent/annotations/ghentcdh/docs/core-site/.vuepress/.temp/pages/logging/api/index.html.js"), meta: {"title":"logging-api"} }],
  ["/logging/vue/", { loader: () => import(/* webpackChunkName: "logging_vue_index.html" */"/Users/bovandersteene/project/ugent/annotations/ghentcdh/docs/core-site/.vuepress/.temp/pages/logging/vue/index.html.js"), meta: {"title":"logging-frontend"} }],
  ["/authentication/vue/", { loader: () => import(/* webpackChunkName: "authentication_vue_index.html" */"/Users/bovandersteene/project/ugent/annotations/ghentcdh/docs/core-site/.vuepress/.temp/pages/authentication/vue/index.html.js"), meta: {"title":"Vue frontend"} }],
  ["/tools/api/", { loader: () => import(/* webpackChunkName: "tools_api_index.html" */"/Users/bovandersteene/project/ugent/annotations/ghentcdh/docs/core-site/.vuepress/.temp/pages/tools/api/index.html.js"), meta: {"title":"Health api"} }],
  ["/tools/authentication/", { loader: () => import(/* webpackChunkName: "tools_authentication_index.html" */"/Users/bovandersteene/project/ugent/annotations/ghentcdh/docs/core-site/.vuepress/.temp/pages/tools/authentication/index.html.js"), meta: {"title":"Authentication"} }],
  ["/health/api/", { loader: () => import(/* webpackChunkName: "health_api_index.html" */"/Users/bovandersteene/project/ugent/annotations/ghentcdh/docs/core-site/.vuepress/.temp/pages/health/api/index.html.js"), meta: {"title":"health-api"} }],
  ["/tools/vue/", { loader: () => import(/* webpackChunkName: "tools_vue_index.html" */"/Users/bovandersteene/project/ugent/annotations/ghentcdh/docs/core-site/.vuepress/.temp/pages/tools/vue/index.html.js"), meta: {"title":"logging-frontend"} }],
  ["/404.html", { loader: () => import(/* webpackChunkName: "404.html" */"/Users/bovandersteene/project/ugent/annotations/ghentcdh/docs/core-site/.vuepress/.temp/pages/404.html.js"), meta: {"title":""} }],
  ["/tools/", { loader: () => import(/* webpackChunkName: "tools_index.html" */"/Users/bovandersteene/project/ugent/annotations/ghentcdh/docs/core-site/.vuepress/.temp/pages/tools/index.html.js"), meta: {"title":"Tools"} }],
  ["/logging/", { loader: () => import(/* webpackChunkName: "logging_index.html" */"/Users/bovandersteene/project/ugent/annotations/ghentcdh/docs/core-site/.vuepress/.temp/pages/logging/index.html.js"), meta: {"title":"Logging"} }],
  ["/health/", { loader: () => import(/* webpackChunkName: "health_index.html" */"/Users/bovandersteene/project/ugent/annotations/ghentcdh/docs/core-site/.vuepress/.temp/pages/health/index.html.js"), meta: {"title":"Health"} }],
]);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateRoutes) {
    __VUE_HMR_RUNTIME__.updateRoutes(routes)
  }
  if (__VUE_HMR_RUNTIME__.updateRedirects) {
    __VUE_HMR_RUNTIME__.updateRedirects(redirects)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ routes, redirects }) => {
    __VUE_HMR_RUNTIME__.updateRoutes(routes)
    __VUE_HMR_RUNTIME__.updateRedirects(redirects)
  })
}
