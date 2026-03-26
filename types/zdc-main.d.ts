import * as _angular_core from '@angular/core';
import { InjectionToken, OnInit, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import * as i2 from '@angular/common';
import * as i3 from '@angular/forms';
import * as i4 from '@ionic/angular';
import * as i5 from 'ng-zorro-antd/drawer';
import * as i6 from 'ng-zorro-antd/modal';

declare class Main {
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<Main, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<Main, "zdc-main", never, {}, {}, never, never, true, never>;
}

interface AppServices {
    apiService: IApiService;
    loaderService: any;
}
interface IApiService {
    isWeb(): boolean;
    backButtonStack: BackButtonStack;
}
interface BackButtonStack {
    /**
     * Adds a new stack element to the top.
     * @param stack The unique identifier for the stack.
     * @param listener Callback function triggered when the device back button is pressed.
     */
    add(stack: string, listener: Function): void;
    /**
     * Checks if the stack is empty.
     * @returns True if the stack is empty, otherwise false.
     */
    isEmpty(): boolean;
    /**
     * Get the top element of the stack and calls its listener if it exists.
     */
    handleBackPress(): void;
    /**
     * Removes a specific stack by its unique identifier.
     * @param stack The identifier of the stack to be removed.
     */
    remove(stack: string): void;
}

declare const APP_SERVICES: InjectionToken<AppServices>;

declare class Test {
    private mainService;
    constructor();
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<Test, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<Test, "zdc-main-test", never, {}, {}, never, never, true, never>;
}

declare class DrawerModalWrapperComponent implements OnInit, OnChanges, OnDestroy {
    private mainService;
    private apiService;
    visible: _angular_core.ModelSignal<boolean>;
    readonly bar: _angular_core.InputSignal<boolean>;
    readonly nzDrawerheight: _angular_core.InputSignal<string>;
    readonly nzModalWidth: _angular_core.InputSignal<string>;
    readonly showCloseButton: _angular_core.InputSignal<boolean>;
    readonly autoFocus: _angular_core.InputSignal<"auto" | "ok" | "cancel" | null>;
    readonly drawerClassName: _angular_core.InputSignal<string>;
    /** Triggers the onClose event when the device's back button is pressed on an Android mobile device. */
    readonly closeOnBackPress: _angular_core.InputSignal<boolean>;
    readonly onClose: _angular_core.OutputEmitterRef<void>;
    isMobile: boolean;
    /** Inserted by Angular inject() migration for backwards compatibility */
    constructor(...args: unknown[]);
    ngOnInit(): void;
    _findIsMobile(): void;
    ngOnChanges(changes: SimpleChanges): void;
    private backButtonStackName;
    private _addBackButtonStack;
    private _removeBackButtonStack;
    ngOnDestroy(): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<DrawerModalWrapperComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<DrawerModalWrapperComponent, "zdc-main-drawer-modal-wrapper", never, { "visible": { "alias": "visible"; "required": false; "isSignal": true; }; "bar": { "alias": "bar"; "required": false; "isSignal": true; }; "nzDrawerheight": { "alias": "nzDrawerheight"; "required": false; "isSignal": true; }; "nzModalWidth": { "alias": "nzModalWidth"; "required": false; "isSignal": true; }; "showCloseButton": { "alias": "showCloseButton"; "required": false; "isSignal": true; }; "autoFocus": { "alias": "autoFocus"; "required": false; "isSignal": true; }; "drawerClassName": { "alias": "drawerClassName"; "required": false; "isSignal": true; }; "closeOnBackPress": { "alias": "closeOnBackPress"; "required": false; "isSignal": true; }; }, { "visible": "visibleChange"; "onClose": "onClose"; }, never, ["*"], false, never>;
}

declare class DrawerModalWrapperModule {
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<DrawerModalWrapperModule, never>;
    static ɵmod: _angular_core.ɵɵNgModuleDeclaration<DrawerModalWrapperModule, [typeof DrawerModalWrapperComponent], [typeof i2.CommonModule, typeof i3.FormsModule, typeof i4.IonicModule, typeof i5.NzDrawerModule, typeof i6.NzModalModule], [typeof DrawerModalWrapperComponent]>;
    static ɵinj: _angular_core.ɵɵInjectorDeclaration<DrawerModalWrapperModule>;
}

export { APP_SERVICES, DrawerModalWrapperComponent, DrawerModalWrapperModule, Main, Test };
