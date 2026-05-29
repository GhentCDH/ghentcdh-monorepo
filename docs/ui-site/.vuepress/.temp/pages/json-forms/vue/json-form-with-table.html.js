import comp from "/Users/bovandersteene/project/ugent/annotations/ghentcdh/docs/ui-site/.vuepress/.temp/pages/json-forms/vue/json-form-with-table.html.vue"
const data = JSON.parse("{\"path\":\"/json-forms/vue/json-form-with-table.html\",\"title\":\"Form with table\",\"lang\":\"en-US\",\"frontmatter\":{},\"readingTime\":{\"minutes\":2.34,\"words\":702},\"filePathRelative\":\"json-forms/vue/json-form-with-table.md\"}")
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
