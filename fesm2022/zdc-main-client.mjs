import * as i0 from '@angular/core';
import { inject, Injectable, Inject } from '@angular/core';
import { MessageBusService, EventName } from '@zdc/main';
import { firstValueFrom } from 'rxjs';
import { CORE_FEATURE } from '@zdc/main/host';

class ClientBridgeService {
    messageBusService = inject(MessageBusService);
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
    gotoPaymentSummary(payload) {
        return firstValueFrom(this.messageBusService.emitRequest(EventName.GOTO_PAYMENT_SUMMARY, payload));
    }
    /** Generic */
    get(action, payload) {
        return firstValueFrom(this.messageBusService.emitRequest(EventName.GET, { action, payload }));
    }
    send(action, payload) {
        return firstValueFrom(this.messageBusService.emitRequest(EventName.SEND, { action, payload }));
    }
    goto(action, payload) {
        return firstValueFrom(this.messageBusService.emitRequest(EventName.GOTO, { action, payload }));
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.1.0", ngImport: i0, type: ClientBridgeService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "21.1.0", ngImport: i0, type: ClientBridgeService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.1.0", ngImport: i0, type: ClientBridgeService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });

class CoreFeatureService {
    services;
    constructor(services) {
        this.services = services;
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

/*
 * @zdc/main/client — client-only APIs (implementation lives in this entry).
 */

/**
 * Generated bundle index. Do not edit.
 */

export { ClientBridgeService, CoreFeatureService };
//# sourceMappingURL=zdc-main-client.mjs.map
