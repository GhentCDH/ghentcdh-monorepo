<template><div><p><a href="https://github.com/GhentCDH/ghentcdh-monorepo/actions/workflows/merge-request.yml" target="_blank" rel="noopener noreferrer"><img src="https://github.com/GhentCDH/ghentcdh-monorepo/actions/workflows/merge-request.yml/badge.svg" alt="Build"></a></p>
<h1 id="ghentcdh-monorepo-for-shared-logic" tabindex="-1"><a class="header-anchor" href="#ghentcdh-monorepo-for-shared-logic"><span><strong>GhentCDH Monorepo for Shared Logic</strong></span></a></h1>
<p>This monorepo is designed to manage and share reusable logic across <strong>GhentCDH</strong> projects. It includes <strong>Vue components, TypeScript utilities, custom form elements, authentication modules, and more</strong>. By centralizing shared logic, we ensure consistency, maintainability, and efficiency across multiple applications.</p>
<h2 id="why-a-monorepo" tabindex="-1"><a class="header-anchor" href="#why-a-monorepo"><span><strong>Why a Monorepo?</strong></span></a></h2>
<p>Using a <strong>monorepo</strong> instead of multiple independent repositories provides several benefits:</p>
<h3 id="✅-advantages" tabindex="-1"><a class="header-anchor" href="#✅-advantages"><span>✅ <strong>Advantages</strong></span></a></h3>
<ul>
<li><strong>Consistent Updates</strong> – All projects automatically use the latest versions of shared logic.</li>
<li><strong>Easier Maintenance</strong> – Bug fixes and improvements benefit all dependent projects simultaneously.</li>
<li><strong>Simplified Major Upgrades</strong> – Updates to frameworks and dependencies can be applied in a controlled manner.</li>
<li><strong>Shared Styling and Components</strong> – A uniform UI/UX across different projects enhances maintainability.</li>
</ul>
<h3 id="⚠️-potential-challenges" tabindex="-1"><a class="header-anchor" href="#⚠️-potential-challenges"><span>⚠️ <strong>Potential Challenges</strong></span></a></h3>
<ul>
<li><strong>Risk of Breaking Changes</strong> – Updates may require adjustments in dependent projects.</li>
<li><strong>Project-Specific Logic</strong> – Some logic may be too specific to be shared effectively.</li>
<li><strong>Version Synchronization</strong> – Dependent projects must keep up with updates for improvements and fixes.</li>
</ul>
<h2 id="best-practices-for-managing-shared-logic" tabindex="-1"><a class="header-anchor" href="#best-practices-for-managing-shared-logic"><span><strong>Best Practices for Managing Shared Logic</strong></span></a></h2>
<p>To ensure a <strong>stable and scalable</strong> shared codebase, the following best practices are followed:</p>
<ul>
<li><strong>Use Semantic Versioning</strong> – Clearly indicate breaking changes using major version updates.</li>
<li><strong>Automated Testing</strong> – Implement robust tests to prevent regressions across projects.</li>
<li><strong>Clear Documentation</strong> – Provide detailed usage guidelines for each shared module.</li>
<li><strong>Backward Compatibility</strong> – Maintain compatibility where possible to minimize disruptions.</li>
</ul>
<hr>
<h2 id="choice-of-technologies" tabindex="-1"><a class="header-anchor" href="#choice-of-technologies"><span><strong>Choice of Technologies</strong></span></a></h2>
<p>This monorepo is structured to support <strong>TypeScript-based</strong> projects and integrates well with modern tools and frameworks:</p>
<h3 id="🛠-tooling-stack" tabindex="-1"><a class="header-anchor" href="#🛠-tooling-stack"><span>🛠 <strong>Tooling Stack</strong></span></a></h3>
<table>
<thead>
<tr>
<th><strong>Technology</strong></th>
<th><strong>Purpose</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Nx</strong></td>
<td>Manages the monorepo, enforces dependencies, and supports efficient builds.</td>
</tr>
<tr>
<td><strong>TypeScript</strong></td>
<td>Ensures type safety and better maintainability.</td>
</tr>
<tr>
<td><strong>Vue 3</strong></td>
<td>Provides reusable UI components and frontend utilities.</td>
</tr>
<tr>
<td><strong>NestJS</strong></td>
<td>Used for backend API modules and core logic.</td>
</tr>
<tr>
<td><strong>Vitest</strong></td>
<td>A fast and modern testing framework for TypeScript.</td>
</tr>
<tr>
<td><strong>Tailwind CSS</strong></td>
<td>Enables rapid UI development and supports both <strong>Ugent</strong> and <strong>white-label</strong> styling.</td>
</tr>
<tr>
<td><strong>Vitepress</strong></td>
<td>Generates up-to-date documentation for shared libraries.</td>
</tr>
</tbody>
</table>
<h3 id="🔍-nx-enforced-dependencies" tabindex="-1"><a class="header-anchor" href="#🔍-nx-enforced-dependencies"><span>🔍 <strong>Nx Enforced Dependencies</strong></span></a></h3>
<ul>
<li><strong>Vue components</strong> can only depend on <strong>plain JavaScript</strong> and frontend libraries (not backend libraries).</li>
<li>Backend modules are kept separate from frontend-specific implementations for a clear separation of concerns.</li>
</ul>
<hr>
<h2 id="project-structure" tabindex="-1"><a class="header-anchor" href="#project-structure"><span><strong>Project Structure</strong></span></a></h2>
<p>A well-structured monorepo ensures <strong>modular development</strong> while enforcing proper dependencies between different modules.</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>/libs</span></span>
<span class="line"><span>    /authentication</span></span>
<span class="line"><span>        /api</span></span>
<span class="line"><span>        /vue</span></span>
<span class="line"><span>    /core</span></span>
<span class="line"><span>        /types</span></span>
<span class="line"><span>    /json-forms</span></span>
<span class="line"><span>        /api</span></span>
<span class="line"><span>        /core</span></span>
<span class="line"><span>        /vue</span></span>
<span class="line"><span>    /tools</span></span>
<span class="line"><span>        /api</span></span>
<span class="line"><span>        /vue</span></span>
<span class="line"><span>    /ui</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="📌-folder-breakdown" tabindex="-1"><a class="header-anchor" href="#📌-folder-breakdown"><span>📌 <strong>Folder Breakdown</strong></span></a></h3>
<table>
<thead>
<tr>
<th><strong>Folder</strong></th>
<th><strong>Purpose</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><code v-pre>libs/authentication</code></td>
<td>Handles authentication-related logic.</td>
</tr>
<tr>
<td><code v-pre>libs/core</code></td>
<td>Shared types and core utilities used across modules.</td>
</tr>
<tr>
<td><code v-pre>libs/json-forms</code></td>
<td>JSON Forms integration for dynamic form generation.</td>
</tr>
<tr>
<td><code v-pre>libs/tools</code></td>
<td>Utility functions and helpers for API and Vue.</td>
</tr>
<tr>
<td><code v-pre>libs/ui</code></td>
<td>Manages reusable UI components and styles.</td>
</tr>
</tbody>
</table>
<p>Each module is further <strong>split into categories</strong>:</p>
<ul>
<li><strong>api</strong> – Backend logic and endpoints.</li>
<li><strong>vue</strong> – UI components and frontend-specific implementations.</li>
<li><strong>core</strong> – Shared logic used across different layers.</li>
<li><strong>types</strong> – TypeScript type definitions.</li>
</ul>
<hr>
<h2 id="getting-started" tabindex="-1"><a class="header-anchor" href="#getting-started"><span><strong>Getting Started</strong></span></a></h2>
<h3 id="installation" tabindex="-1"><a class="header-anchor" href="#installation"><span><strong>Installation</strong></span></a></h3>
<p>Clone the repository and install dependencies:</p>
<div class="language-sh line-numbers-mode" data-highlighter="shiki" data-ext="sh" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-sh"><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">git</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> clone</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> https://github.com/GhentCDH/ghentcdh-monorepo.git</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">cd</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ghentcdh-monorepo</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">npm</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> install</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="running-the-development-server" tabindex="-1"><a class="header-anchor" href="#running-the-development-server"><span><strong>Running the Development Server</strong></span></a></h3>
<p>This will start a development server including the documentation</p>
<div class="language-sh line-numbers-mode" data-highlighter="shiki" data-ext="sh" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-sh"><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">pnpm</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> nx</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> run</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> docs:serve</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>In another terminal, run the UI library in watch mode, so the new style file is building automatically:</p>
<div class="language-sh line-numbers-mode" data-highlighter="shiki" data-ext="sh" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-sh"><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">pnpm</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> nx</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> run</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ui:build</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --watch</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>Accessing the documentation server: http://localhost:5173</p>
<h3 id="building-the-project" tabindex="-1"><a class="header-anchor" href="#building-the-project"><span><strong>Building the Project</strong></span></a></h3>
<div class="language-sh line-numbers-mode" data-highlighter="shiki" data-ext="sh" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-sh"><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">pnpm</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> nx</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> run-many</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --target=build</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --all</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h3 id="running-tests" tabindex="-1"><a class="header-anchor" href="#running-tests"><span><strong>Running Tests</strong></span></a></h3>
<div class="language-sh line-numbers-mode" data-highlighter="shiki" data-ext="sh" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-sh"><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">pnpm</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> nx</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> run-many</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --target=test</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --all</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><hr>
<p>Documentation will be published to <strong>GitHub Docs</strong> for easy access.</p>
<hr>
<h2 id="license" tabindex="-1"><a class="header-anchor" href="#license"><span><strong>License</strong></span></a></h2>
<p>This project is licensed under the <strong>MIT License</strong>. See the <a href="./LICENSE">LICENSE</a> file for details.</p>
<hr>
<h1 id="credits" tabindex="-1"><a class="header-anchor" href="#credits"><span>credits</span></a></h1>
<p>Bo Vandersteene, Ghent University.</p>
<p>Development by <a href="https://www.ghentcdh.ugent.be/" target="_blank" rel="noopener noreferrer">Ghent Centre for Digital Humanities - Ghent University</a>. Funded by the <a href="https://www.ghentcdh.ugent.be/projects" target="_blank" rel="noopener noreferrer">GhentCDH research projects</a>.</p>
<img src="https://www.ghentcdh.ugent.be/ghentcdh_logo_blue_text_transparent_bg_landscape.svg" alt="Landscape" width="500">
</div></template>


