import { EventName, CoreFeature } from '@zdc/main';
export { EventName } from '@zdc/main';
import * as i0 from '@angular/core';
import { InjectionToken } from '@angular/core';

type Handler = (payload?: unknown) => Promise<unknown>;
declare class HostBridgeService {
    private readonly messageBusService;
    private readonly _handlers;
    constructor();
    /**
     * Initialize the HostBridgeService by subscribing to requests from the client app and routing them to the appropriate handlers based on the event name. When a request is received, the service checks if a handler is registered for the event name, and if so, it invokes the handler with the payload from the request. The response from the handler is then emitted back to the client app using the MessageBusService. If no handler is registered for the event name, a warning is logged and no response is sent back to the client app.
     */
    private _initialize;
    registerHandler(eventName: EventName, handler: Handler): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<HostBridgeService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<HostBridgeService>;
}

declare const CORE_FEATURE: InjectionToken<CoreFeature>;

export { CORE_FEATURE, HostBridgeService };
