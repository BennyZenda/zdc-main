import * as i0 from '@angular/core';
import { Component, InjectionToken, Inject, Injectable, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

class Main {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.1.0", ngImport: i0, type: Main, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "21.1.0", type: Main, isStandalone: true, selector: "zdc-main", ngImport: i0, template: `
    <p>
      main works!
    </p>
  `, isInline: true, styles: [""] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.1.0", ngImport: i0, type: Main, decorators: [{
            type: Component,
            args: [{ selector: 'zdc-main', imports: [], template: `
    <p>
      main works!
    </p>
  ` }]
        }] });

const APP_SERVICES = new InjectionToken('APP_SERVICES');

class MainService {
    services;
    constructor(services) {
        this.services = services;
        // Temp
        console.log('MainService, isWeb:', this.services.apiService.isWeb());
    }
    getApiService() {
        return this.services.apiService;
    }
    getLoaderService() {
        return this.services.loaderService;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.1.0", ngImport: i0, type: MainService, deps: [{ token: APP_SERVICES }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "21.1.0", ngImport: i0, type: MainService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.1.0", ngImport: i0, type: MainService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: () => [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [APP_SERVICES]
                }] }] });

class Test {
    mainService = inject(MainService);
    constructor() {
        console.log('Test, isWeb:', this.mainService.getApiService().isWeb());
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.1.0", ngImport: i0, type: Test, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "21.1.0", type: Test, isStandalone: true, selector: "zdc-main-test", ngImport: i0, template: "<p>Test works! Hello World!!</p>\n", styles: [""], dependencies: [{ kind: "ngmodule", type: CommonModule }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.1.0", ngImport: i0, type: Test, decorators: [{
            type: Component,
            args: [{ selector: 'zdc-main-test', imports: [CommonModule], standalone: true, template: "<p>Test works! Hello World!!</p>\n" }]
        }], ctorParameters: () => [] });

/*
 * Public API Surface of main
 */
// export * from './lib/modules';

/**
 * Generated bundle index. Do not edit.
 */

export { APP_SERVICES, Main, Test };
//# sourceMappingURL=zdc-main.mjs.map
