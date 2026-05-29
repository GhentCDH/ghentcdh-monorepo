export const themeData = JSON.parse("{\"encrypt\":{},\"docsRepo\":\"https://github.com/GhentCDH/ghentcdh-monorepo\",\"docsBranch\":\"main\",\"docsDir\":\"docs/core-site\",\"lastUpdated\":true,\"colorMode\":\"light\",\"socialLinks\":[{\"icon\":\"github\",\"link\":\"https://github.com/GhentCDH/ghentcdh-monorepo\"}],\"locales\":{\"/\":{\"lang\":\"en-US\",\"navbarLocales\":{\"langName\":\"English\",\"selectLangAriaLabel\":\"Select language\"},\"metaLocales\":{\"author\":\"Author\",\"date\":\"Writing Date\",\"origin\":\"Original\",\"views\":\"Page views\",\"category\":\"Category\",\"tag\":\"Tag\",\"readingTime\":\"Reading Time\",\"words\":\"Words\",\"toc\":\"On This Page\",\"prev\":\"Prev\",\"next\":\"Next\",\"contributors\":\"Contributors\",\"editLink\":\"Edit this page\",\"print\":\"Print\"},\"outlookLocales\":{\"themeColor\":\"Theme Color\",\"darkmode\":\"Theme Mode\",\"fullscreen\":\"Full Screen\"},\"routerLocales\":{\"skipToContent\":\"Skip to main content\",\"notFoundTitle\":\"Page not found\",\"notFoundMsg\":[\"There’s nothing here.\",\"How did we get here?\",\"That’s a Four-Oh-Four.\",\"Looks like we've got some broken links.\"],\"back\":\"Go back\",\"home\":\"Take me home\"},\"navbar\":[{\"text\":\"Home\",\"link\":\"/\"}],\"sidebar\":[{\"text\":\"Authentication\",\"link\":\"/authentication/\"},{\"text\":\"Data\",\"link\":\"/data/\"},{\"text\":\"Health\",\"link\":\"/health/\"},{\"text\":\"Logging\",\"link\":\"/logging/\"},{\"text\":\"Tools\",\"children\":[{\"text\":\"Api\",\"children\":[],\"items\":[],\"collapsed\":true,\"link\":\"/tools/api/README.md\"},{\"text\":\"Authentication\",\"children\":[],\"items\":[],\"collapsed\":true,\"link\":\"/tools/authentication/README.md\"},\"/tools/release\",{\"text\":\"Vue\",\"children\":[],\"items\":[],\"collapsed\":true,\"link\":\"/tools/vue/README.md\"}]}]}}}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateThemeData) {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ themeData }) => {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  })
}
