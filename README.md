# @zdc/main

The `@zdc/main` library provides core application services and components for the Zoho Micro-Frontend (MFE) ecosystem. It facilitates service injection and common UI wrappers like drawers and models.

---

## Versions

| Angular | @zdc/main |
| :--- | :---: |
| ^20.1.0 | v1.0.0-alpha.3 |

---

## Features

- [x] **Service Orchestration**: Unified `APP_SERVICES` injection token for application-wide dependencies.
- [x] **Drawer & Model Wrappers**: Standardized UI wrappers for consistent interaction patterns.
- [x] **Interactive Components**: Reusable components like `Main` for shared application logic.

---

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Step 1: Installation](#step-1-installation)
  - [Step 2: Configuration](#step-2-configuration)
- [Usage](#usage)
- [Development](#development)
- [Documentation](#documentation)

---

## Getting started

### Step 1: Installation

Install the library in your project:

```shell
# Install from the GitHub repository (latest version from the default branch, e.g., main)
npm install https://github.com/BennyZenda/zdc-main.git

# Or install from the GitHub repository (specific branch)
npm install https://github.com/BennyZenda/zdc-main.git#main

# Install from the GitHub repository (specific version)
npm install https://github.com/BennyZenda/zdc-main.git#v1.0.0-alpha.3

# Install from the GitHub repository (semantic versioning)
npm install https://github.com/BennyZenda/zdc-main.git#semver:*

# Or install via NPM (once published, not available yet)
npm install @zdc/main
```

### Step 2: Configuration

Provide the required application services in your `app.config.ts` or `main.ts` using the `APP_SERVICES` token.

#### Option A: Standalone Bootstrap (`main.ts`)

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { APP_SERVICES } from '@zdc/main';

bootstrapApplication(AppComponent, {
  providers: [
    {
      provide: APP_SERVICES,
      useFactory: (api: ApiService, loader: LoaderService) => {
        return {
          apiService: api,
          loaderService: loader,
        };
      },
      deps: [ApiService, LoaderService]
    }
  ]
});
```

#### Option B: AppModule

```typescript
import { APP_SERVICES } from '@zdc/main';

// In your providers array:
providers: [
  {
    provide: APP_SERVICES,
    useFactory: (api: ApiService, loader: LoaderService) => {
      return {
        apiService: api,
        loaderService: loader,
      };
    },
    deps: [ApiService, LoaderService]
  }
]
```

---

## Usage

### Component Usage

To use the library's components, import them into your Angular component.

#### Main Component (`zdc-main`)

**Usage in Template:**
```html
<zdc-main></zdc-main>
```

**Importing in Component:**
```typescript
import { Main } from '@zdc/main';

@Component({
  ...
  imports: [Main],
  ...
})
export class MyComponent {}
```

---

## Development

### Code scaffolding

Run `ng generate component component-name --project zdc-main` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project zdc-main`.

### Building

Run `ng build zdc-main` to build the project. The build artifacts will be stored in the `dist/` directory.

### Publishing

After building your library with `ng build zdc-main`, go to the dist folder `cd dist/zdc/main` and run `npm publish`.

### Running unit tests

Run `ng test zdc-main` to execute the unit tests via [Karma](https://karma-runner.github.io).

---

## Documentation

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
