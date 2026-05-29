import comp from "/Users/bovandersteene/project/ugent/annotations/ghentcdh/docs/ui-site/.vuepress/.temp/pages/ui/e2e/index.html.vue"
const data = JSON.parse("{\"path\":\"/ui/e2e/\",\"title\":\"libs/ui/e2e\",\"lang\":\"en-US\",\"frontmatter\":{},\"readingTime\":{\"minutes\":0.85,\"words\":256},\"filePathRelative\":\"ui/e2e/README.md\"}")
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
