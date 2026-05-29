import comp from "/Users/bovandersteene/project/ugent/annotations/ghentcdh/docs/ui-site/.vuepress/.temp/pages/ui/test/index.html.vue"
const data = JSON.parse("{\"path\":\"/ui/test/\",\"title\":\"@ghentcdh/ui/testing\",\"lang\":\"en-US\",\"frontmatter\":{},\"readingTime\":{\"minutes\":0.68,\"words\":204},\"filePathRelative\":\"ui/test/README.md\"}")
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
