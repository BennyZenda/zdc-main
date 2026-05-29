import * as i0 from '@angular/core';
import { OnInit, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import * as i2 from '@angular/common';
import * as i3 from '@angular/forms';
import * as i4 from '@ionic/angular';
import * as i5 from 'ng-zorro-antd/drawer';
import * as i6 from 'ng-zorro-antd/modal';

interface CoreFeature {
    apiService: IApiService;
    parentStateManager: IParentStateManager;
}
interface IParentStateManager {
    /**
     * Returns an observable that emits the currently selected student ID whenever it changes.
     */
    getSelectedStudentId(): Observable<number>;
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

declare class Main {
    static ɵfac: i0.ɵɵFactoryDeclaration<Main, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<Main, "zdc-main", never, {}, {}, never, never, true, never>;
}

declare class Test {
    private CoreFeatureService;
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<Test, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<Test, "zdc-main-test", never, {}, {}, never, never, true, never>;
}

declare class DrawerModalWrapperComponent implements OnInit, OnChanges, OnDestroy {
    private CoreFeatureService;
    private apiService;
    visible: i0.ModelSignal<boolean>;
    readonly bar: i0.InputSignal<boolean>;
    readonly nzDrawerheight: i0.InputSignal<string>;
    readonly nzModalWidth: i0.InputSignal<string>;
    readonly showCloseButton: i0.InputSignal<boolean>;
    readonly autoFocus: i0.InputSignal<"auto" | "ok" | "cancel" | null>;
    readonly drawerClassName: i0.InputSignal<string>;
    /** Triggers the onClose event when the device's back button is pressed on an Android mobile device. */
    readonly closeOnBackPress: i0.InputSignal<boolean>;
    readonly onClose: i0.OutputEmitterRef<void>;
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
    static ɵfac: i0.ɵɵFactoryDeclaration<DrawerModalWrapperComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DrawerModalWrapperComponent, "zdc-main-drawer-modal-wrapper", never, { "visible": { "alias": "visible"; "required": false; "isSignal": true; }; "bar": { "alias": "bar"; "required": false; "isSignal": true; }; "nzDrawerheight": { "alias": "nzDrawerheight"; "required": false; "isSignal": true; }; "nzModalWidth": { "alias": "nzModalWidth"; "required": false; "isSignal": true; }; "showCloseButton": { "alias": "showCloseButton"; "required": false; "isSignal": true; }; "autoFocus": { "alias": "autoFocus"; "required": false; "isSignal": true; }; "drawerClassName": { "alias": "drawerClassName"; "required": false; "isSignal": true; }; "closeOnBackPress": { "alias": "closeOnBackPress"; "required": false; "isSignal": true; }; }, { "visible": "visibleChange"; "onClose": "onClose"; }, never, ["*"], false, never>;
}

declare class DrawerModalWrapperModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<DrawerModalWrapperModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<DrawerModalWrapperModule, [typeof DrawerModalWrapperComponent], [typeof i2.CommonModule, typeof i3.FormsModule, typeof i4.IonicModule, typeof i5.NzDrawerModule, typeof i6.NzModalModule], [typeof DrawerModalWrapperComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<DrawerModalWrapperModule>;
}

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
declare enum EventName {
    GET_STUDENT = "GET_STUDENT",
    GET_PARENT = "GET_PARENT",
    GET_ACCESS_TOKEN = "GET_ACCESS_TOKEN",
    GET_SCHOOL = "GET_SCHOOL",
    GOTO_PAYMENT_SUMMARY = "GOTO_PAYMENT_SUMMARY",
    GET = "GET",
    SEND = "SEND",
    GOTO = "GOTO"
}

type Handler = (payload?: unknown) => Promise<unknown>;
declare class HostBridgeService {
    private readonly messageBusService;
    private _handlers;
    constructor();
    /**
     * Initialize the HostBridgeService by subscribing to requests from the client app and routing them to the appropriate handlers based on the event name. When a request is received, the service checks if a handler is registered for the event name, and if so, it invokes the handler with the payload from the request. The response from the handler is then emitted back to the client app using the MessageBusService. If no handler is registered for the event name, a warning is logged and no response is sent back to the client app.
     */
    private _initialize;
    registerHandler(eventName: EventName, handler: Handler): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<HostBridgeService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<HostBridgeService>;
}

declare class ClientBridgeService {
    private readonly messageBusService;
    constructor();
    /** Specific */
    getStudent(): Promise<unknown>;
    getParent(): Promise<unknown>;
    getAccessToken(): Promise<unknown>;
    getSchool(): Promise<unknown>;
    gotoPaymentSummary(data: unknown): Promise<unknown>;
    /** Generic */
    get(): Promise<unknown>;
    send(data: unknown): Promise<unknown>;
    goto(data: unknown): Promise<unknown>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ClientBridgeService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ClientBridgeService>;
}

declare class CoreFeatureService {
    private services;
    constructor(services: CoreFeature);
    getApiService(): IApiService;
    getParentStateManager(): IParentStateManager;
    static ɵfac: i0.ɵɵFactoryDeclaration<CoreFeatureService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CoreFeatureService>;
}

declare const FeatureHost: {
    CORE_FEATURE: i0.InjectionToken<CoreFeature>;
    HostBridgeService: typeof HostBridgeService;
};
declare const FeatureClient: {
    CoreFeatureService: typeof CoreFeatureService;
    ClientBridgeService: typeof ClientBridgeService;
};

export { DrawerModalWrapperComponent, DrawerModalWrapperModule, FeatureClient, FeatureHost, Main, Test };
