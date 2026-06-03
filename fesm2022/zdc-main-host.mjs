import * as i0 from '@angular/core';
import { inject, Injectable, InjectionToken } from '@angular/core';
import { MessageBusService } from '@zdc/main';
export { EventName } from '@zdc/main';

class HostBridgeService {
    // The MessageBusService is used to facilitate communication between the host app and the client app
    messageBusService = inject(MessageBusService);
    // The _handlers map is used to store the registered handlers for each event name.
    _handlers = new Map();
    constructor() {
        this._initialize();
    }
    /**
     * Initialize the HostBridgeService by subscribing to requests from the client app and routing them to the appropriate handlers based on the event name. When a request is received, the service checks if a handler is registered for the event name, and if so, it invokes the handler with the payload from the request. The response from the handler is then emitted back to the client app using the MessageBusService. If no handler is registered for the event name, a warning is logged and no response is sent back to the client app.
     */
    _initialize() {
        this.messageBusService.onRequest().subscribe(async (event) => {
            const handler = this._handlers.get(event.name);
            // Guard: Check if the handler is registered, if not, log a warning and return
            if (!handler) {
                console.warn(`[HostBridgeService] Handler not found for ${event.name}`);
                return;
            }
            const result = await handler(event.payload);
            this.messageBusService.emitResponse(event, result);
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
