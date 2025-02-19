

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

| **Technology**   | **Purpose** |
|------------------|------------|
| **Nx**           | Manages the monorepo, enforces dependencies, and supports efficient builds. |
| **TypeScript**   | Ensures type safety and better maintainability. |
| **Vue 3**        | Provides reusable UI components and frontend utilities. |
| **NestJS**       | Used for backend API modules and core logic. |
| **Vitest**       | A fast and modern testing framework for TypeScript. |
| **Tailwind CSS** | Enables rapid UI development and supports both **Ugent** and **white-label** styling. |
| **Vitepress**    | Generates up-to-date documentation for shared libraries. |

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
    /ui
        /components
        /core
        /json-forms
        /icons
    /health
        /api
        /vue
        /core
    /logging
        /api
        /vue
        /core
```

### 📌 **Folder Breakdown**

| **Folder**       | **Purpose** |
|----------------|------------|
| `libs/authentication` | Handles authentication-related logic. |
| `libs/ui` | Manages reusable UI components, core styles, and icons. |
| `libs/health` | Includes health-check functionalities and monitoring tools. |
| `libs/logging` | Provides centralized logging logic for applications. |

Each module is further **split into three categories**:
- **API** – Backend logic and endpoints.
- **vue** – UI components and frontend-specific implementations.
- **Core** – Shared logic used across different layers.

---

## **Getting Started**

### **Installation**

Clone the repository and install dependencies:

```sh
git clone https://github.com/GhentCDH/monorepo.git
cd monorepo
npm install
```

### **Running the Development Server**

This will start a development server including the documentation

```sh
docker compose -f docker-compose.dev.yml up --build --watch
```

Accessing the documentation server: [http://localhost](http://localhost:5000)

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

Would you like to include **additional details** like deployment instructions or CI/CD setup? 🚀

# credits

Bo Vandersteene, Ghent University.
