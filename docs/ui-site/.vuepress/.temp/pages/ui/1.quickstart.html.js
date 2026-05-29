import comp from "/Users/bovandersteene/project/ugent/annotations/ghentcdh/docs/ui-site/.vuepress/.temp/pages/ui/1.quickstart.html.vue"
const data = JSON.parse("{\"path\":\"/ui/1.quickstart.html\",\"title\":\"Quick Start\",\"lang\":\"en-US\",\"frontmatter\":{},\"readingTime\":{\"minutes\":0.14,\"words\":43},\"filePathRelative\":\"ui/1.quickstart.md\"}")
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
