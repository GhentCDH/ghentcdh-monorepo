[![Build](https://github.com/GhentCDH/ghentcdh-monorepo/actions/workflows/merge-request.yml/badge.svg)](https://github.com/GhentCDH/ghentcdh-monorepo/actions/workflows/merge-request.yml)
[![Publish](https://github.com/GhentCDH/ghentcdh-monorepo/actions/workflows/publish.yml/badge.svg)](https://github.com/GhentCDH/ghentcdh-monorepo/actions/workflows/publish.yml)
[![Publish Docs](https://github.com/GhentCDH/ghentcdh-monorepo/actions/workflows/publish-docs.yml/badge.svg)](https://github.com/GhentCDH/ghentcdh-monorepo/actions/workflows/publish-docs.yml)
[![ui](https://img.shields.io/npm/v/@ghentcdh/ui.svg?label=ui)](https://www.npmjs.com/package/@ghentcdh/ui)
[![tools-vue](https://img.shields.io/npm/v/@ghentcdh/tools-vue.svg?label=tools-vue)](https://www.npmjs.com/package/@ghentcdh/tools-vue)
[![tools-api](https://img.shields.io/npm/v/@ghentcdh/tools-api.svg?label=tools-api)](https://www.npmjs.com/package/@ghentcdh/tools-api)
[![authentication-vue](https://img.shields.io/npm/v/@ghentcdh/authentication-vue.svg?label=authentication-vue)](https://www.npmjs.com/package/@ghentcdh/authentication-vue)
[![authentication-api](https://img.shields.io/npm/v/@ghentcdh/authentication-api.svg?label=authentication-api)](https://www.npmjs.com/package/@ghentcdh/authentication-api)

# **GhentCDH Monorepo for Shared Logic**

This monorepo is designed to manage and share reusable logic across **GhentCDH** projects. It includes **Vue components, TypeScript utilities, custom form elements, authentication modules, and more**. By centralizing shared logic, we ensure consistency, maintainability, and efficiency across multiple applications.

## **Why a Monorepo?**

Using a **monorepo** instead of multiple independent repositories provides several benefits:

### ✅ **Advantages**

- **Consistent Updates** – All projects automatically use the latest versions of shared logic.
- **Easier Maintenance** – Bug fixes and improvements benefit all dependent projects simultaneously.
- **Simplified Major Upgrades** – Updates to frameworks and dependencies can be applied in a controlled manner.
- **Shared Styling and Components** – A uniform UI/UX across different projects enhances maintainability.

### ⚠️ **Potential Challenges**

- **Risk of Breaking Changes** – Updates may require adjustments in dependent projects.
- **Project-Specific Logic** – Some logic may be too specific to be shared effectively.
- **Version Synchronization** – Dependent projects must keep up with updates for improvements and fixes.

## **Best Practices for Managing Shared Logic**

To ensure a **stable and scalable** shared codebase, the following best practices are followed:

- **Use Semantic Versioning** – Clearly indicate breaking changes using major version updates.
- **Automated Testing** – Implement robust tests to prevent regressions across projects.
- **Clear Documentation** – Provide detailed usage guidelines for each shared module.
- **Backward Compatibility** – Maintain compatibility where possible to minimize disruptions.

---

## **Choice of Technologies**

This monorepo is structured to support **TypeScript-based** projects and integrates well with modern tools and frameworks:

### 🛠 **Tooling Stack**

| **Technology**   | **Purpose**                                                                           |
|------------------|---------------------------------------------------------------------------------------|
| **Nx**           | Manages the monorepo, enforces dependencies, and supports efficient builds.           |
| **TypeScript**   | Ensures type safety and better maintainability.                                       |
| **Vue 3**        | Provides reusable UI components and frontend utilities.                               |
| **NestJS**       | Used for backend API modules and core logic.                                          |
| **Vitest**       | A fast and modern testing framework for TypeScript.                                   |
| **Tailwind CSS** | Enables rapid UI development and supports both **Ugent** and **white-label** styling. |
| **Vitepress**    | Generates up-to-date documentation for shared libraries.                              |

### 🔍 **Nx Enforced Dependencies**

- **Vue components** can only depend on **plain JavaScript** and frontend libraries (not backend libraries).
- Backend modules are kept separate from frontend-specific implementations for a clear separation of concerns.

---

## **Project Structure**

A well-structured monorepo ensures **modular development** while enforcing proper dependencies between different modules.

```
/libs
    /authentication
        /api
        /vue
    /core
        /types
    /json-forms
        /api
        /core
        /vue
    /tools
        /api
        /vue
    /ui
```

### 📌 **Folder Breakdown**

| **Folder**            | **Purpose**                                          |
|-----------------------|------------------------------------------------------|
| `libs/authentication` | Handles authentication-related logic.                |
| `libs/core`           | Shared types and core utilities used across modules. |
| `libs/json-forms`     | JSON Forms integration for dynamic form generation.  |
| `libs/tools`          | Utility functions and helpers for API and Vue.       |
| `libs/ui`             | Manages reusable UI components and styles.           |

Each module is further **split into categories**:

- **api** – Backend logic and endpoints.
- **vue** – UI components and frontend-specific implementations.
- **core** – Shared logic used across different layers.
- **types** – TypeScript type definitions.

---

## **Getting Started**

### **Installation**

Clone the repository and install dependencies:

```sh
git clone https://github.com/GhentCDH/ghentcdh-monorepo.git
cd ghentcdh-monorepo
npm install
```

### **Running the Development Server**

This will start a development server including the documentation

```sh
pnpm nx run docs:serve
```

In another terminal, run the UI library in watch mode, so the new style file is building automatically:

```sh
pnpm nx run ui:build --watch
```

Accessing the documentation server: http://localhost:5173

### **Building the Project**

```sh
pnpm nx run-many --target=build --all
```

### **Running Tests**

```sh
pnpm nx run-many --target=test --all
```

---

Documentation will be published to **GitHub Docs** for easy access.

---

## **License**

This project is licensed under the **MIT License**. See the [LICENSE](./LICENSE) file for details.

---

# credits

Bo Vandersteene, Ghent University.

Development by [Ghent Centre for Digital Humanities - Ghent University](https://www.ghentcdh.ugent.be/). Funded by the [GhentCDH research projects](https://www.ghentcdh.ugent.be/projects).

<img src="https://www.ghentcdh.ugent.be/ghentcdh_logo_blue_text_transparent_bg_landscape.svg" alt="Landscape" width="500">
