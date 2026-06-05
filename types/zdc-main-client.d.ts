import * as _zdc_main from '@zdc/main';
import { Student, Parent, School, CoreFeature } from '@zdc/main';
import * as i0 from '@angular/core';

declare class ClientBridgeService {
    private readonly messageBusService;
    /** Specific */
    getStudent(): Promise<Student>;
    getParent(): Promise<Parent>;
    getAccessToken(): Promise<string>;
    getSchool(): Promise<School>;
    gotoPaymentSummary(payload: Record<string, unknown>): Promise<Record<string, unknown>>;
    /** Generic */
    get(action: string, payload?: Record<string, unknown>): Promise<Record<string, unknown>>;
    send(action: string, payload?: Record<string, unknown>): Promise<Record<string, unknown>>;
    goto(action: string, payload?: Record<string, unknown>): Promise<Record<string, unknown>>;
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
