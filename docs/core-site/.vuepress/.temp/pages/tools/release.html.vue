<template><div><h1 id="how-to-release-a-new-version" tabindex="-1"><a class="header-anchor" href="#how-to-release-a-new-version"><span>How to release a new version</span></a></h1>
<p>A github workflow is triggered when a tag with following pattern is pushed: <code v-pre>v*.*.*</code> start automatically
with following steps</p>
<ol>
<li>Run <code v-pre>npx nx release --skip-publish</code> locally. This will create a commit with the version and changelog updates, then create a tag for the new version.</li>
<li>Push the changes (including the new tag) to the remote repository with <code v-pre>git push &amp;&amp; git push --tags</code>.</li>
<li>The publish workflow will automatically trigger and publish the packages to the npm registry.</li>
</ol>
</div></template>


