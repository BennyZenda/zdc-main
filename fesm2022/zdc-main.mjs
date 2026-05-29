import * as i0 from '@angular/core';
import { Component, InjectionToken, Inject, Injectable, inject, model, input, output, NgModule } from '@angular/core';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i2 from 'ng-zorro-antd/drawer';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import * as i3 from 'ng-zorro-antd/modal';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BehaviorSubject, filter, map, firstValueFrom } from 'rxjs';

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

const CORE_FEATURE = new InjectionToken('CORE_FEATURE');

class CoreFeatureService {
    services;
    constructor(services) {
        this.services = services;
        // Temp
        console.log('CoreFeatureService, isWeb:', this.services.apiService.isWeb());
    }
    getApiService() {
        return this.services.apiService;
    }
    getParentStateManager() {
        return this.services.parentStateManager;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.1.0", ngImport: i0, type: CoreFeatureService, deps: [{ token: CORE_FEATURE }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "21.1.0", ngImport: i0, type: CoreFeatureService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.1.0", ngImport: i0, type: CoreFeatureService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: () => [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [CORE_FEATURE]
                }] }] });

class Test {
    CoreFeatureService = inject(CoreFeatureService);
    constructor() {
        console.log('Test, isWeb:', this.CoreFeatureService.getApiService().isWeb());
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.1.0", ngImport: i0, type: Test, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "21.1.0", type: Test, isStandalone: true, selector: "zdc-main-test", ngImport: i0, template: "<p>Test works! Hello World!!</p>\n", styles: [""], dependencies: [{ kind: "ngmodule", type: CommonModule }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.1.0", ngImport: i0, type: Test, decorators: [{
            type: Component,
            args: [{ selector: 'zdc-main-test', imports: [CommonModule], standalone: true, template: "<p>Test works! Hello World!!</p>\n" }]
        }], ctorParameters: () => [] });

class DrawerModalWrapperComponent {
    // private apiService = inject(ApiService);
    CoreFeatureService = inject(CoreFeatureService);
    apiService = this.CoreFeatureService.getApiService();
    visible = model(false, ...(ngDevMode ? [{ debugName: "visible" }] : []));
    bar = input(false, ...(ngDevMode ? [{ debugName: "bar" }] : []));
    nzDrawerheight = input('auto', ...(ngDevMode ? [{ debugName: "nzDrawerheight" }] : []));
    nzModalWidth = input('500px', ...(ngDevMode ? [{ debugName: "nzModalWidth" }] : []));
    showCloseButton = input(true, ...(ngDevMode ? [{ debugName: "showCloseButton" }] : []));
    autoFocus = input(null, ...(ngDevMode ? [{ debugName: "autoFocus" }] : []));
    drawerClassName = input('', ...(ngDevMode ? [{ debugName: "drawerClassName" }] : []));
    /** Triggers the onClose event when the device's back button is pressed on an Android mobile device. */
    closeOnBackPress = input(false, ...(ngDevMode ? [{ debugName: "closeOnBackPress" }] : []));
    onClose = output();
    isMobile = false;
    constructor() { }
    ngOnInit() {
        this._findIsMobile();
    }
    _findIsMobile() {
        this.isMobile = !this.apiService.isWeb();
    }
    ngOnChanges(changes) {
        if (this.closeOnBackPress()) {
            // @ts-ignore
            if (changes.visible.currentValue)
                this._addBackButtonStack();
            else
                this._removeBackButtonStack();
        }
    }
    /* Back button stack handler */
    // @ts-ignore
    backButtonStackName = null;
    _addBackButtonStack() {
        this.backButtonStackName = Math.random().toString(36).slice(2, 18) + Date.now() + Math.random().toString(36).slice(2, 18);
        this.apiService.backButtonStack.add(this.backButtonStackName, () => {
            this._removeBackButtonStack();
            this.onClose.emit();
        });
    }
    _removeBackButtonStack() {
        if (!this.backButtonStackName)
            return;
        this.apiService.backButtonStack.remove(this.backButtonStackName);
        // @ts-ignore
        this.backButtonStackName = null;
    }
    /* // Back button stack handler */
    ngOnDestroy() {
        this._removeBackButtonStack();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.1.0", ngImport: i0, type: DrawerModalWrapperComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "21.1.0", type: DrawerModalWrapperComponent, isStandalone: false, selector: "zdc-main-drawer-modal-wrapper", inputs: { visible: { classPropertyName: "visible", publicName: "visible", isSignal: true, isRequired: false, transformFunction: null }, bar: { classPropertyName: "bar", publicName: "bar", isSignal: true, isRequired: false, transformFunction: null }, nzDrawerheight: { classPropertyName: "nzDrawerheight", publicName: "nzDrawerheight", isSignal: true, isRequired: false, transformFunction: null }, nzModalWidth: { classPropertyName: "nzModalWidth", publicName: "nzModalWidth", isSignal: true, isRequired: false, transformFunction: null }, showCloseButton: { classPropertyName: "showCloseButton", publicName: "showCloseButton", isSignal: true, isRequired: false, transformFunction: null }, autoFocus: { classPropertyName: "autoFocus", publicName: "autoFocus", isSignal: true, isRequired: false, transformFunction: null }, drawerClassName: { classPropertyName: "drawerClassName", publicName: "drawerClassName", isSignal: true, isRequired: false, transformFunction: null }, closeOnBackPress: { classPropertyName: "closeOnBackPress", publicName: "closeOnBackPress", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { visible: "visibleChange", onClose: "onClose" }, usesOnChanges: true, ngImport: i0, template: "@if (isMobile) {\n  <nz-drawer [nzClosable]=\"false\" [nzVisible]=\"visible()\" nzPlacement=\"bottom\" [nzHeight]=\"nzDrawerheight()\" [nzWrapClassName]=\"'nzDrawerWrapper ' + drawerClassName()\">\n    <ng-container *nzDrawerContent>\n      <div class=\"drawer-container\" dir=\"auto\">\n        @if (showCloseButton()) {\n          <div class=\"drawer-header\">\n            <div class=\"bar\" [ngClass]=\"{'hide': !bar()}\"></div>\n            <div class=\"closeCricle\" (click)=\"onClose.emit()\">\n              <svg width=\"9\" height=\"9\" viewBox=\"0 0 9 9\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                <path d=\"M8.47814 0.375526C8.71672 0.492386 8.9407 0.799142 8.98939 1.07668C9.01374 1.17893 8.99426 1.34448 8.95044 1.5003C8.88227 1.73402 8.77515 1.85574 7.43614 3.18989L5.99975 4.62628L7.40693 6.03833C8.18112 6.81252 8.84819 7.51855 8.88714 7.59645C9.13547 8.08824 8.94557 8.67253 8.46353 8.92086C8.25902 9.02798 7.8208 9.02311 7.60656 8.91112C7.51405 8.86243 6.79828 8.19536 6.02409 7.42116L4.60717 6.01399L3.22434 7.40656C2.43554 8.19536 1.75386 8.83808 1.64187 8.89651C1.22799 9.11562 0.668044 8.97442 0.414849 8.58976C0.24443 8.33169 0.205477 7.90808 0.327205 7.66462C0.371027 7.57211 1.04784 6.85635 1.8269 6.07728L3.24869 4.65063L1.8269 3.22397C0.896894 2.29397 0.375896 1.73888 0.327205 1.62203C-0.00876522 0.813749 0.814118 -0.00426579 1.59318 0.360919C1.71978 0.419349 2.27973 0.945215 3.17565 1.84601C3.9401 2.61046 4.58283 3.23858 4.61204 3.23858C4.63639 3.23858 5.29372 2.60559 6.07278 1.82653C7.00766 0.896524 7.54813 0.395003 7.66499 0.341443C7.91818 0.239191 8.22494 0.248929 8.47814 0.375526Z\" fill=\"black\"/>\n              </svg>\n            </div>\n          </div>\n        }\n        <div class=\"drawer-inner-container\">\n          <div class=\"drawer-content\">\n            <ng-container *ngTemplateOutlet=\"contentTpl\" />\n          </div>\n        </div>\n      </div>\n    </ng-container>\n  </nz-drawer>\n}\n\n\n@if (!isMobile) {\n  <nz-modal [nzWrapClassName]=\"'nzModalWrapper ' + drawerClassName()\" [(nzVisible)]=\"visible\" [nzWidth]=\"nzModalWidth()\" [nzFooter]=\"null\" [nzClosable]=\"false\" [nzCentered]=\"true\" [nzContent]=\"content\" [nzAutofocus]=\"autoFocus()\">\n    <ng-template #content>\n      <div class=\"modal-container\" dir=\"auto\">\n        @if (showCloseButton()) {\n          <div class=\"modal-header\">\n            <div class=\"closeCricle\" (click)=\"onClose.emit()\">\n              <svg width=\"9\" height=\"9\" viewBox=\"0 0 9 9\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                <path d=\"M8.47814 0.375526C8.71672 0.492386 8.9407 0.799142 8.98939 1.07668C9.01374 1.17893 8.99426 1.34448 8.95044 1.5003C8.88227 1.73402 8.77515 1.85574 7.43614 3.18989L5.99975 4.62628L7.40693 6.03833C8.18112 6.81252 8.84819 7.51855 8.88714 7.59645C9.13547 8.08824 8.94557 8.67253 8.46353 8.92086C8.25902 9.02798 7.8208 9.02311 7.60656 8.91112C7.51405 8.86243 6.79828 8.19536 6.02409 7.42116L4.60717 6.01399L3.22434 7.40656C2.43554 8.19536 1.75386 8.83808 1.64187 8.89651C1.22799 9.11562 0.668044 8.97442 0.414849 8.58976C0.24443 8.33169 0.205477 7.90808 0.327205 7.66462C0.371027 7.57211 1.04784 6.85635 1.8269 6.07728L3.24869 4.65063L1.8269 3.22397C0.896894 2.29397 0.375896 1.73888 0.327205 1.62203C-0.00876522 0.813749 0.814118 -0.00426579 1.59318 0.360919C1.71978 0.419349 2.27973 0.945215 3.17565 1.84601C3.9401 2.61046 4.58283 3.23858 4.61204 3.23858C4.63639 3.23858 5.29372 2.60559 6.07278 1.82653C7.00766 0.896524 7.54813 0.395003 7.66499 0.341443C7.91818 0.239191 8.22494 0.248929 8.47814 0.375526Z\" fill=\"black\"/>\n              </svg>\n            </div>\n          </div>\n        }\n        <div class=\"modal-inner-container\">\n          <div class=\"modal-content\">\n            <ng-container *ngTemplateOutlet=\"contentTpl\" />\n          </div>\n        </div>\n      </div>\n    </ng-template>\n  </nz-modal>\n}\n\n\n<ng-template #contentTpl><ng-content /></ng-template>", styles: ["::ng-deep .nzDrawerWrapper.ant-drawer-content-wrapper,::ng-deep .nzDrawerWrapper .ant-drawer-content{border-radius:25px 25px 0 0;max-height:90%!important;overflow-y:scroll}::ng-deep .nzDrawerWrapper .ant-drawer-body{font-family:var(--font-family);font-style:normal;padding:20px 20px 70px;color:var(--font-color-black);height:100%;overflow-y:scroll}::ng-deep .nzModalWrapper .ant-modal-body{padding-bottom:30px}::ng-deep .nzModalWrapper .ant-modal-content{border-radius:18px}.drawer-container,.modal-container{position:relative}.drawer-container .drawer-header,.drawer-container .modal-header,.modal-container .drawer-header,.modal-container .modal-header{width:100%;display:flex;justify-content:flex-end;margin-bottom:25x;position:relative}.drawer-container .drawer-header .bar,.drawer-container .modal-header .bar,.modal-container .drawer-header .bar,.modal-container .modal-header .bar{height:7px;width:64px;border-radius:3px;position:absolute;left:calc(50% - 32px);top:-7px;background-color:#d5d5d5}.drawer-container .drawer-header .bar.hide,.drawer-container .modal-header .bar.hide,.modal-container .drawer-header .bar.hide,.modal-container .modal-header .bar.hide{display:none}.drawer-container .drawer-header .closeCricle,.drawer-container .modal-header .closeCricle,.modal-container .drawer-header .closeCricle,.modal-container .modal-header .closeCricle{width:25px;height:25px;display:flex;justify-content:center;align-items:center;background-color:#d9d9d9;border-radius:50%;font-weight:800;font-size:.75rem;cursor:pointer}.drawer-container .drawer-inner-container,.drawer-container .modal-inner-container,.modal-container .drawer-inner-container,.modal-container .modal-inner-container{display:flex;flex-direction:column;height:100%;overflow-y:auto}.drawer-container .drawer-inner-container::-webkit-scrollbar,.drawer-container .modal-inner-container::-webkit-scrollbar,.modal-container .drawer-inner-container::-webkit-scrollbar,.modal-container .modal-inner-container::-webkit-scrollbar{display:none}.drawer-container .drawer-inner-container .drawer-content,.drawer-container .modal-inner-container .drawer-content,.modal-container .drawer-inner-container .drawer-content,.modal-container .modal-inner-container .drawer-content{height:100%}.drawer-container .drawer-content,.drawer-container .modal-content,.modal-container .drawer-content,.modal-container .modal-content{display:flex;flex-direction:column;margin-top:12px}.drawer-container{height:calc(100% - 25px)}.modal-container{height:100%}.modal-container .modal-header{position:absolute}::ng-deep html[dir=rtl] .drawer-container .drawer-header,::ng-deep html[dir=rtl] .drawer-container .modal-header,::ng-deep html[dir=rtl] .modal-container .drawer-header,::ng-deep html[dir=rtl] .modal-container .modal-header{direction:rtl}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "component", type: i2.NzDrawerComponent, selector: "nz-drawer", inputs: ["nzContent", "nzCloseIcon", "nzClosable", "nzMaskClosable", "nzMask", "nzCloseOnNavigation", "nzNoAnimation", "nzKeyboard", "nzTitle", "nzExtra", "nzFooter", "nzPlacement", "nzSize", "nzMaskStyle", "nzBodyStyle", "nzWrapClassName", "nzWidth", "nzHeight", "nzZIndex", "nzOffsetX", "nzOffsetY", "nzVisible"], outputs: ["nzOnViewInit", "nzOnClose", "nzVisibleChange"], exportAs: ["nzDrawer"] }, { kind: "directive", type: i2.NzDrawerContentDirective, selector: "[nzDrawerContent]", exportAs: ["nzDrawerContent"] }, { kind: "component", type: i3.NzModalComponent, selector: "nz-modal", inputs: ["nzMask", "nzMaskClosable", "nzCloseOnNavigation", "nzVisible", "nzClosable", "nzOkLoading", "nzOkDisabled", "nzCancelDisabled", "nzCancelLoading", "nzKeyboard", "nzNoAnimation", "nzCentered", "nzDraggable", "nzContent", "nzFooter", "nzZIndex", "nzWidth", "nzWrapClassName", "nzClassName", "nzStyle", "nzTitle", "nzCloseIcon", "nzMaskStyle", "nzBodyStyle", "nzOkText", "nzCancelText", "nzOkType", "nzOkDanger", "nzIconType", "nzModalType", "nzAutofocus", "nzOnOk", "nzOnCancel"], outputs: ["nzOnOk", "nzOnCancel", "nzAfterOpen", "nzAfterClose", "nzVisibleChange"], exportAs: ["nzModal"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.1.0", ngImport: i0, type: DrawerModalWrapperComponent, decorators: [{
            type: Component,
            args: [{ selector: 'zdc-main-drawer-modal-wrapper', standalone: false, template: "@if (isMobile) {\n  <nz-drawer [nzClosable]=\"false\" [nzVisible]=\"visible()\" nzPlacement=\"bottom\" [nzHeight]=\"nzDrawerheight()\" [nzWrapClassName]=\"'nzDrawerWrapper ' + drawerClassName()\">\n    <ng-container *nzDrawerContent>\n      <div class=\"drawer-container\" dir=\"auto\">\n        @if (showCloseButton()) {\n          <div class=\"drawer-header\">\n            <div class=\"bar\" [ngClass]=\"{'hide': !bar()}\"></div>\n            <div class=\"closeCricle\" (click)=\"onClose.emit()\">\n              <svg width=\"9\" height=\"9\" viewBox=\"0 0 9 9\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                <path d=\"M8.47814 0.375526C8.71672 0.492386 8.9407 0.799142 8.98939 1.07668C9.01374 1.17893 8.99426 1.34448 8.95044 1.5003C8.88227 1.73402 8.77515 1.85574 7.43614 3.18989L5.99975 4.62628L7.40693 6.03833C8.18112 6.81252 8.84819 7.51855 8.88714 7.59645C9.13547 8.08824 8.94557 8.67253 8.46353 8.92086C8.25902 9.02798 7.8208 9.02311 7.60656 8.91112C7.51405 8.86243 6.79828 8.19536 6.02409 7.42116L4.60717 6.01399L3.22434 7.40656C2.43554 8.19536 1.75386 8.83808 1.64187 8.89651C1.22799 9.11562 0.668044 8.97442 0.414849 8.58976C0.24443 8.33169 0.205477 7.90808 0.327205 7.66462C0.371027 7.57211 1.04784 6.85635 1.8269 6.07728L3.24869 4.65063L1.8269 3.22397C0.896894 2.29397 0.375896 1.73888 0.327205 1.62203C-0.00876522 0.813749 0.814118 -0.00426579 1.59318 0.360919C1.71978 0.419349 2.27973 0.945215 3.17565 1.84601C3.9401 2.61046 4.58283 3.23858 4.61204 3.23858C4.63639 3.23858 5.29372 2.60559 6.07278 1.82653C7.00766 0.896524 7.54813 0.395003 7.66499 0.341443C7.91818 0.239191 8.22494 0.248929 8.47814 0.375526Z\" fill=\"black\"/>\n              </svg>\n            </div>\n          </div>\n        }\n        <div class=\"drawer-inner-container\">\n          <div class=\"drawer-content\">\n            <ng-container *ngTemplateOutlet=\"contentTpl\" />\n          </div>\n        </div>\n      </div>\n    </ng-container>\n  </nz-drawer>\n}\n\n\n@if (!isMobile) {\n  <nz-modal [nzWrapClassName]=\"'nzModalWrapper ' + drawerClassName()\" [(nzVisible)]=\"visible\" [nzWidth]=\"nzModalWidth()\" [nzFooter]=\"null\" [nzClosable]=\"false\" [nzCentered]=\"true\" [nzContent]=\"content\" [nzAutofocus]=\"autoFocus()\">\n    <ng-template #content>\n      <div class=\"modal-container\" dir=\"auto\">\n        @if (showCloseButton()) {\n          <div class=\"modal-header\">\n            <div class=\"closeCricle\" (click)=\"onClose.emit()\">\n              <svg width=\"9\" height=\"9\" viewBox=\"0 0 9 9\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                <path d=\"M8.47814 0.375526C8.71672 0.492386 8.9407 0.799142 8.98939 1.07668C9.01374 1.17893 8.99426 1.34448 8.95044 1.5003C8.88227 1.73402 8.77515 1.85574 7.43614 3.18989L5.99975 4.62628L7.40693 6.03833C8.18112 6.81252 8.84819 7.51855 8.88714 7.59645C9.13547 8.08824 8.94557 8.67253 8.46353 8.92086C8.25902 9.02798 7.8208 9.02311 7.60656 8.91112C7.51405 8.86243 6.79828 8.19536 6.02409 7.42116L4.60717 6.01399L3.22434 7.40656C2.43554 8.19536 1.75386 8.83808 1.64187 8.89651C1.22799 9.11562 0.668044 8.97442 0.414849 8.58976C0.24443 8.33169 0.205477 7.90808 0.327205 7.66462C0.371027 7.57211 1.04784 6.85635 1.8269 6.07728L3.24869 4.65063L1.8269 3.22397C0.896894 2.29397 0.375896 1.73888 0.327205 1.62203C-0.00876522 0.813749 0.814118 -0.00426579 1.59318 0.360919C1.71978 0.419349 2.27973 0.945215 3.17565 1.84601C3.9401 2.61046 4.58283 3.23858 4.61204 3.23858C4.63639 3.23858 5.29372 2.60559 6.07278 1.82653C7.00766 0.896524 7.54813 0.395003 7.66499 0.341443C7.91818 0.239191 8.22494 0.248929 8.47814 0.375526Z\" fill=\"black\"/>\n              </svg>\n            </div>\n          </div>\n        }\n        <div class=\"modal-inner-container\">\n          <div class=\"modal-content\">\n            <ng-container *ngTemplateOutlet=\"contentTpl\" />\n          </div>\n        </div>\n      </div>\n    </ng-template>\n  </nz-modal>\n}\n\n\n<ng-template #contentTpl><ng-content /></ng-template>", styles: ["::ng-deep .nzDrawerWrapper.ant-drawer-content-wrapper,::ng-deep .nzDrawerWrapper .ant-drawer-content{border-radius:25px 25px 0 0;max-height:90%!important;overflow-y:scroll}::ng-deep .nzDrawerWrapper .ant-drawer-body{font-family:var(--font-family);font-style:normal;padding:20px 20px 70px;color:var(--font-color-black);height:100%;overflow-y:scroll}::ng-deep .nzModalWrapper .ant-modal-body{padding-bottom:30px}::ng-deep .nzModalWrapper .ant-modal-content{border-radius:18px}.drawer-container,.modal-container{position:relative}.drawer-container .drawer-header,.drawer-container .modal-header,.modal-container .drawer-header,.modal-container .modal-header{width:100%;display:flex;justify-content:flex-end;margin-bottom:25x;position:relative}.drawer-container .drawer-header .bar,.drawer-container .modal-header .bar,.modal-container .drawer-header .bar,.modal-container .modal-header .bar{height:7px;width:64px;border-radius:3px;position:absolute;left:calc(50% - 32px);top:-7px;background-color:#d5d5d5}.drawer-container .drawer-header .bar.hide,.drawer-container .modal-header .bar.hide,.modal-container .drawer-header .bar.hide,.modal-container .modal-header .bar.hide{display:none}.drawer-container .drawer-header .closeCricle,.drawer-container .modal-header .closeCricle,.modal-container .drawer-header .closeCricle,.modal-container .modal-header .closeCricle{width:25px;height:25px;display:flex;justify-content:center;align-items:center;background-color:#d9d9d9;border-radius:50%;font-weight:800;font-size:.75rem;cursor:pointer}.drawer-container .drawer-inner-container,.drawer-container .modal-inner-container,.modal-container .drawer-inner-container,.modal-container .modal-inner-container{display:flex;flex-direction:column;height:100%;overflow-y:auto}.drawer-container .drawer-inner-container::-webkit-scrollbar,.drawer-container .modal-inner-container::-webkit-scrollbar,.modal-container .drawer-inner-container::-webkit-scrollbar,.modal-container .modal-inner-container::-webkit-scrollbar{display:none}.drawer-container .drawer-inner-container .drawer-content,.drawer-container .modal-inner-container .drawer-content,.modal-container .drawer-inner-container .drawer-content,.modal-container .modal-inner-container .drawer-content{height:100%}.drawer-container .drawer-content,.drawer-container .modal-content,.modal-container .drawer-content,.modal-container .modal-content{display:flex;flex-direction:column;margin-top:12px}.drawer-container{height:calc(100% - 25px)}.modal-container{height:100%}.modal-container .modal-header{position:absolute}::ng-deep html[dir=rtl] .drawer-container .drawer-header,::ng-deep html[dir=rtl] .drawer-container .modal-header,::ng-deep html[dir=rtl] .modal-container .drawer-header,::ng-deep html[dir=rtl] .modal-container .modal-header{direction:rtl}\n"] }]
        }], ctorParameters: () => [], propDecorators: { visible: [{ type: i0.Input, args: [{ isSignal: true, alias: "visible", required: false }] }, { type: i0.Output, args: ["visibleChange"] }], bar: [{ type: i0.Input, args: [{ isSignal: true, alias: "bar", required: false }] }], nzDrawerheight: [{ type: i0.Input, args: [{ isSignal: true, alias: "nzDrawerheight", required: false }] }], nzModalWidth: [{ type: i0.Input, args: [{ isSignal: true, alias: "nzModalWidth", required: false }] }], showCloseButton: [{ type: i0.Input, args: [{ isSignal: true, alias: "showCloseButton", required: false }] }], autoFocus: [{ type: i0.Input, args: [{ isSignal: true, alias: "autoFocus", required: false }] }], drawerClassName: [{ type: i0.Input, args: [{ isSignal: true, alias: "drawerClassName", required: false }] }], closeOnBackPress: [{ type: i0.Input, args: [{ isSignal: true, alias: "closeOnBackPress", required: false }] }], onClose: [{ type: i0.Output, args: ["onClose"] }] } });

class DrawerModalWrapperModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.1.0", ngImport: i0, type: DrawerModalWrapperModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "21.1.0", ngImport: i0, type: DrawerModalWrapperModule, declarations: [DrawerModalWrapperComponent], imports: [CommonModule, FormsModule, IonicModule, NzDrawerModule, NzModalModule], exports: [DrawerModalWrapperComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "21.1.0", ngImport: i0, type: DrawerModalWrapperModule, imports: [CommonModule, FormsModule, IonicModule, NzDrawerModule, NzModalModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.1.0", ngImport: i0, type: DrawerModalWrapperModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule, IonicModule, NzDrawerModule, NzModalModule],
                    exports: [DrawerModalWrapperComponent],
                    declarations: [DrawerModalWrapperComponent]
                }]
        }] });

/**
 * Flow:
 *
 * 1. Client emits REQUEST
 * 2. Host listens REQUEST
 * 3. Host emits RESPONSE
 * 4. Client listens RESPONSE
 *
 * Explanation:
 *
 *  1. Client emits REQUEST  - Yes, the get student emits request using emitRequest in ClientBridgeService
 *
 *  2. Host listens REQUEST     - Yes, the host listens to the request using onRequest in HostBridgeService
 *
 *  3. Host emits RESPONSE      - Yes, the host emits response using emitResponse in HostBridgeService after getting the data from the handler
 *
 *  4. Client listens RESPONSE  - Yes, the client listens to the response using the observable returned by emitRequest in ClientBridgeService
 */
/**
 * Architecture:
 *
 * Feature Component
   ↓
ClientBridgeService
   ↓
MessageBusService.emitRequest()
   ↓
HostBridgeService.onRequest()
   ↓
Host App Handler
   ↓
MessageBusService.emitResponse()
   ↓
ClientBridgeService waits response
   ↓
Feature Component
 */
var EventName;
(function (EventName) {
    EventName["GET_STUDENT"] = "GET_STUDENT";
    EventName["GET_PARENT"] = "GET_PARENT";
    EventName["GET_ACCESS_TOKEN"] = "GET_ACCESS_TOKEN";
    EventName["GET_SCHOOL"] = "GET_SCHOOL";
    EventName["GOTO_PAYMENT_SUMMARY"] = "GOTO_PAYMENT_SUMMARY";
    EventName["GET"] = "GET";
    EventName["SEND"] = "SEND";
    EventName["GOTO"] = "GOTO";
})(EventName || (EventName = {}));
/**
 * The MessageBusService is responsible for facilitating communication between the client app and the host app. It provides methods for emitting requests from the client to the host and for the host to listen to those requests and emit responses back to the client. The service uses RxJS BehaviorSubjects to manage the stream of requests and responses, allowing for asynchronous communication between the two apps. The event structure includes a unique requestId to correlate requests and responses, an event name to identify the type of request, and an optional payload to pass data between the apps.
 */
class MessageBusService {
    _requests$ = new BehaviorSubject(null);
    _responses$ = new BehaviorSubject(null);
    constructor() {
        console.log(`[MessageBusService] [constructor]`);
    }
    emitRequest(eventName, payload) {
        // Generate a unique requestId for each request
        const requestId = Math.random().toString(36) + Date.now().toString(36);
        // Create the event object
        const event = {
            // requestId is used to correlate the request and response between the client and host apps, ensuring that the client receives the correct response for its request, especially when multiple requests are in flight simultaneously.
            requestId,
            // name is used to identify the type of request being made, allowing the host app to determine which handler to invoke based on the event name.
            name: eventName,
            // payload is used to pass data between the client and host apps, enabling the client to send necessary information for the request and the host to provide relevant data in the response. In this case, it can be used to pass parameters or context needed for processing the request and generating the appropriate response.
            payload
        };
        // Emit the event to the host app
        this._requests$.next(event);
        // Return an observable that will emit the response from the host app to the client app
        return this._responses$.pipe(filter(e => !!e), filter(e => e.requestId === event.requestId), map(event => event.payload));
    }
    onRequest() {
        // Listen to the event emitted by the client app
        return this._requests$.asObservable().pipe(filter(e => !!e));
    }
    emitResponse(event, payload) {
        const responseEvent = {
            ...event,
            payload
        };
        // Emit the response event to the client app
        this._responses$.next(responseEvent);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.1.0", ngImport: i0, type: MessageBusService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "21.1.0", ngImport: i0, type: MessageBusService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.1.0", ngImport: i0, type: MessageBusService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [] });

class HostBridgeService {
    // The MessageBusService is used to facilitate communication between the host app and the client app
    messageBusService = inject(MessageBusService);
    // The _handlers map is used to store the registered handlers for each event name.
    _handlers = new Map();
    constructor() {
        console.log(`[HostBridgeService] [constructor]`);
        this._initialize();
    }
    /**
     * Initialize the HostBridgeService by subscribing to requests from the client app and routing them to the appropriate handlers based on the event name. When a request is received, the service checks if a handler is registered for the event name, and if so, it invokes the handler with the payload from the request. The response from the handler is then emitted back to the client app using the MessageBusService. If no handler is registered for the event name, a warning is logged and no response is sent back to the client app.
     */
    _initialize() {
        this.messageBusService.onRequest()
            .subscribe(async (event) => {
            console.log(`[HostBridgeService] [on ${event.name}] event:`, event);
            const handler = this._handlers.get(event.name);
            // Guard: Check if the handler is registered, if not, log a warning and return
            if (!handler) {
                console.warn(`[HostBridgeService] [on ${event.name}] Handler not found for ${event.name}`);
                return;
            }
            const student = await handler(event.payload);
            this.messageBusService.emitResponse(event, student);
        });
    }
    registerHandler(eventName, handler) {
        this._handlers.set(eventName, handler);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.1.0", ngImport: i0, type: HostBridgeService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "21.1.0", ngImport: i0, type: HostBridgeService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.1.0", ngImport: i0, type: HostBridgeService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [] });

class ClientBridgeService {
    messageBusService = inject(MessageBusService);
    constructor() {
        console.log(`[ClientBridgeService] [constructor]`);
    }
    /** Specific */
    getStudent() {
        return firstValueFrom(this.messageBusService.emitRequest(EventName.GET_STUDENT));
    }
    getParent() {
        return firstValueFrom(this.messageBusService.emitRequest(EventName.GET_PARENT));
    }
    getAccessToken() {
        return firstValueFrom(this.messageBusService.emitRequest(EventName.GET_ACCESS_TOKEN));
    }
    getSchool() {
        return firstValueFrom(this.messageBusService.emitRequest(EventName.GET_SCHOOL));
    }
    gotoPaymentSummary(data) {
        return firstValueFrom(this.messageBusService.emitRequest(EventName.GOTO_PAYMENT_SUMMARY, data));
    }
    /** Generic */
    get() {
        return firstValueFrom(this.messageBusService.emitRequest(EventName.GET_STUDENT));
    }
    send(data) {
        return firstValueFrom(this.messageBusService.emitRequest(EventName.SEND, data));
    }
    goto(data) {
        return firstValueFrom(this.messageBusService.emitRequest(EventName.GOTO, data));
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.1.0", ngImport: i0, type: ClientBridgeService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "21.1.0", ngImport: i0, type: ClientBridgeService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.1.0", ngImport: i0, type: ClientBridgeService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [] });

/*
 * Public API Surface of main
 */
/* Export Feature Host and Feature Client */
const FeatureHost = {
    CORE_FEATURE,
    HostBridgeService
};
const FeatureClient = {
    CoreFeatureService,
    ClientBridgeService
};
// Expected usage:
// import { FeatureClient, FeatureHost } from 'your-lib';
// const client = new FeatureClient.ClientBridgeService();
// const host = new FeatureHost.HostBridgeService();

/**
 * Generated bundle index. Do not edit.
 */

export { DrawerModalWrapperComponent, DrawerModalWrapperModule, FeatureClient, FeatureHost, Main, Test };
//# sourceMappingURL=zdc-main.mjs.map
