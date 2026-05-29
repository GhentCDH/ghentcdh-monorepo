import comp from "/Users/bovandersteene/project/ugent/annotations/ghentcdh/docs/ui-site/.vuepress/.temp/pages/json-forms/index.html.vue"
const data = JSON.parse("{\"path\":\"/json-forms/\",\"title\":\"Json Forms\",\"lang\":\"en-US\",\"frontmatter\":{\"title\":\"Json Forms\",\"article\":false,\"feed\":false,\"sitemap\":false},\"readingTime\":{\"minutes\":0,\"words\":1},\"filePathRelative\":null}")
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
