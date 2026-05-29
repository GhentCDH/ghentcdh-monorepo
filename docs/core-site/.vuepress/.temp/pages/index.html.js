import comp from "/Users/bovandersteene/project/ugent/annotations/ghentcdh/docs/core-site/.vuepress/.temp/pages/index.html.vue"
const data = JSON.parse("{\"path\":\"/\",\"title\":\"GhentCDH Monorepo for Shared Logic\",\"lang\":\"en-US\",\"frontmatter\":{},\"readingTime\":{\"minutes\":2,\"words\":599},\"filePathRelative\":\"README.md\"}")
export { comp, data }

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
