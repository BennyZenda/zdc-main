import * as i0 from '@angular/core';
import { inject, Injectable, InjectionToken } from '@angular/core';
import { EventName, MessageBusService } from '@zdc/main';
export { EventName } from '@zdc/main';

const GENERIC_EVENTS = new Set([
    EventName.GET,
    EventName.SEND,
    EventName.GOTO,
]);
class HostBridgeService {
    messageBusService = inject(MessageBusService);
    _handlers = new Map();
    constructor() {
        this._initialize();
    }
    registerHandler(eventName, handler) {
        this._handlers.set(eventName, handler);
    }
    _initialize() {
        this.messageBusService.onRequest().subscribe(async (event) => {
            const handler = this._handlers.get(event.name);
            if (!handler) {
                console.warn(`[HostBridgeService] Handler not found for ${event.name}`);
                return;
            }
            const result = await this._invokeHandler(event.name, handler, event.payload);
            this.messageBusService.emitResponse(event, result);
        });
    }
    _invokeHandler(eventName, handler, payload) {
        if (GENERIC_EVENTS.has(eventName)) {
            const request = payload;
            return handler(request.action, request.payload);
        }
        if (payload === undefined) {
            return handler();
        }
        return handler(payload);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.1.0", ngImport: i0, type: HostBridgeService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "21.1.0", ngImport: i0, type: HostBridgeService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.1.0", ngImport: i0, type: HostBridgeService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: () => [] });

const CORE_FEATURE = new InjectionToken('CORE_FEATURE');

/*
 * @zdc/main/host — host application entry (import from here only in host apps).
 */

/**
 * Generated bundle index. Do not edit.
 */

export { CORE_FEATURE, HostBridgeService };
//# sourceMappingURL=zdc-main-host.mjs.map
