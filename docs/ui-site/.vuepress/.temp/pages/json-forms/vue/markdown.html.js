import comp from "/Users/bovandersteene/project/ugent/annotations/ghentcdh/docs/ui-site/.vuepress/.temp/pages/json-forms/vue/markdown.html.vue"
const data = JSON.parse("{\"path\":\"/json-forms/vue/markdown.html\",\"title\":\"Markdown input\",\"lang\":\"en-US\",\"frontmatter\":{\"title\":\"Markdown input\"},\"readingTime\":{\"minutes\":0.7,\"words\":209},\"filePathRelative\":\"json-forms/vue/markdown.md\"}")
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
