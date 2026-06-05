import { EventName, Student, Parent, School, CoreFeature } from '@zdc/main';
export { EventName } from '@zdc/main';
import * as i0 from '@angular/core';
import { InjectionToken } from '@angular/core';

/** Handler for generic GET / SEND / GOTO events. */
type GenericBridgeHandler = (action: string, payload?: Record<string, unknown>) => Promise<Record<string, unknown>>;
/**
 * Maps each {@link EventName} to the host handler signature IDE and tsc expect.
 * Hover `registerHandler` with a concrete event to see the required handler shape.
 */
interface HostBridgeHandlerMap {
    [EventName.GET_STUDENT]: () => Promise<Student>;
    [EventName.GET_PARENT]: () => Promise<Parent>;
    [EventName.GET_SCHOOL]: () => Promise<School>;
    [EventName.GET_ACCESS_TOKEN]: () => Promise<string>;
    [EventName.GOTO_PAYMENT_SUMMARY]: (payload: Record<string, unknown>) => Promise<Record<string, unknown>>;
    [EventName.GET]: GenericBridgeHandler;
    [EventName.SEND]: GenericBridgeHandler;
    [EventName.GOTO]: GenericBridgeHandler;
}
declare class HostBridgeService {
    private readonly messageBusService;
    private readonly _handlers;
    constructor();
    registerHandler<E extends EventName>(eventName: E, handler: HostBridgeHandlerMap[E]): void;
    private _initialize;
    private _invokeHandler;
    static ɵfac: i0.ɵɵFactoryDeclaration<HostBridgeService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<HostBridgeService>;
}

declare const CORE_FEATURE: InjectionToken<CoreFeature>;

export { CORE_FEATURE, HostBridgeService };
export type { GenericBridgeHandler, HostBridgeHandlerMap };
