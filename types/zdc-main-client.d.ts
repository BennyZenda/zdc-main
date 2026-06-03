import * as i0 from '@angular/core';
import * as _zdc_main from '@zdc/main';
import { CoreFeature } from '@zdc/main';

declare class ClientBridgeService {
    private readonly messageBusService;
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
    private readonly services;
    constructor(services: CoreFeature);
    getApiService(): _zdc_main.IApiService;
    getParentStateManager(): _zdc_main.IParentStateManager;
    static ɵfac: i0.ɵɵFactoryDeclaration<CoreFeatureService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CoreFeatureService>;
}

export { ClientBridgeService, CoreFeatureService };
