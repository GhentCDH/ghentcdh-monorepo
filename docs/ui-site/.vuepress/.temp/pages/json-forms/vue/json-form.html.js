import comp from "/Users/bovandersteene/project/ugent/annotations/ghentcdh/docs/ui-site/.vuepress/.temp/pages/json-forms/vue/json-form.html.vue"
const data = JSON.parse("{\"path\":\"/json-forms/vue/json-form.html\",\"title\":\"Form\",\"lang\":\"en-US\",\"frontmatter\":{},\"readingTime\":{\"minutes\":3.88,\"words\":1165},\"filePathRelative\":\"json-forms/vue/json-form.md\"}")
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
