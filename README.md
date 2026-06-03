# @zdc/main

The `@zdc/main` library provides core application services and components for the Zoho Micro-Frontend (MFE) ecosystem. It facilitates service injection and common UI wrappers like drawers and models.

---

## Versions

| Angular | @zdc/main |
| :--- | :---: |
| ^20.1.0 | v1.0.0-alpha.3 |

---

---

## Features

- [x] **Service Orchestration**: Unified `CORE_FEATURE` injection token for application-wide dependencies.
- [x] **Host / Client entry points**: Scoped imports for host shells vs. feature (client) apps.
- [x] **Drawer & Model Wrappers**: Standardized UI wrappers for consistent interaction patterns.
- [x] **Interactive Components**: Reusable components like `Main` for shared application logic.

---

## Entry points

| Application role | Import from | Use for |
| :--- | :--- | :--- |
| **Host app** (shell) | `@zdc/main/host` | `HostBridgeService`, `CORE_FEATURE`, host-side bridge registration |
| **Feature / client app** (remote MFE) | `@zdc/main/client` | `ClientBridgeService`, `CoreFeatureService` |
| **Either** (shared contracts) | `@zdc/main` | `EventName`, `MessageBusService`, `CoreFeature` types, `Main` component |

**Host applications** must use `@zdc/main/host` for `HostBridgeService`, `CORE_FEATURE`, and provider setup — do not import those from the root package.

**Feature and client applications** must use `@zdc/main/client` for `ClientBridgeService` and `CoreFeatureService`. Import `CORE_FEATURE` only when needed for typing from `@zdc/main/host` (the client service handles injection internally).

---

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Step 1: Installation](#step-1-installation)
  - [Step 2: Configuration](#step-2-configuration)
- [Entry points](#entry-points)
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

## Step 2: Usage

### Method 1: Injection token bridge method

#### Host app: Register injection token

Provide the required application services in your `app.config.ts` or `main.ts` using the `CORE_FEATURE` token (import from `@zdc/main/host`).

#### Option A: Standalone Bootstrap (`main.ts`)

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { CORE_FEATURE } from '@zdc/main/host';

bootstrapApplication(AppComponent, {
  providers: [
    {
      provide: CORE_FEATURE,
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
import { CORE_FEATURE } from '@zdc/main/host';

// In your providers array:
providers: [
  {
    provide: CORE_FEATURE,
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

#### Feature / client app: Use the core feature service

```typescript
import { CoreFeatureService } from '@zdc/main/client';

constructor(private coreFeatureService: CoreFeatureService) {
  const isWeb = this.coreFeatureService.getApiService().isWeb();

  this.coreFeatureService.getParentStateManager()
    .getSelectedStudentId()
    .subscribe({
      next: (studentId) => {
        console.log('studentId', studentId);
      },
    });
}
```

---

### Method 2: Direct Service Bridge Method

#### Host app: Register request handlers

Import from `@zdc/main/host`. Shared event names come from `@zdc/main`.

```typescript
import { EventName } from '@zdc/main';
import { HostBridgeService } from '@zdc/main/host';

constructor(private hostBridgeService: HostBridgeService) {}

this.hostBridgeService.registerHandler(EventName.GET_STUDENT, async () => {
  return {
    id: 'student-123',
    name: 'Alex Student',
    grade: '10',
  };
});

this.hostBridgeService.registerHandler(EventName.GOTO_PAYMENT_SUMMARY, async (payload) => {
  console.log('Navigating to payment summary with', payload);
  return { success: true };
});
```

This pattern lets the host register handlers for client requests and keep host-side logic isolated from the client feature.

#### Feature / client app: Request host data

Import from `@zdc/main/client`.

```typescript
import { ClientBridgeService } from '@zdc/main/client';

constructor(private clientBridgeService: ClientBridgeService) {}

const student = await this.clientBridgeService.getStudent();
console.log('Student from host:', student);

await this.clientBridgeService.gotoPaymentSummary({ orderId: 'order-456' });
```

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

Run `ng generate component component-name --project @zdc/main` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project @zdc/main`.

### Building

Run `npm run build:zdc-main` (or `ng build @zdc/main`) to build the project. Artifacts are stored in `dist/zdc/main` (including `host/` and `client/` entry points).

### Publishing

After building, go to `dist/zdc/main` and run `npm publish`.

### Running unit tests

Run `ng test @zdc/main` to execute the unit tests via [Karma](https://karma-runner.github.io).

---

## Documentation

- [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) — package layout, entry points, and bridge patterns
- [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli)
