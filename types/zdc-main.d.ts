import { Observable } from 'rxjs';
import * as i0 from '@angular/core';

/**
 * Bridge event identifiers shared by host and client.
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

/**
 * Shared bridge payload contracts exported for host and client apps.
 *
 * Naming convention:
 * - Interfaces with a `Request` suffix describe request payloads sent by the client.
 * - Interfaces without a `Request` suffix describe response payloads returned by the host.
 * - When a payload is only an open object bag, use `Record<string, unknown>` directly
 *   instead of an interface that adds no typed fields.
 * - All generic requests (`GET`, `SEND`, `GOTO`) must use `BridgeActionRequest`.
 * - All generic responses (`GET`, `SEND`, `GOTO`) must use `Record<string, unknown>`.
 */
interface Student extends Record<string, unknown> {
    id: number | string;
}
interface Parent extends Record<string, unknown> {
    id: number | string;
}
interface School extends Record<string, unknown> {
    id: number | string;
}
/**
 * Generic request envelope for `GET`, `SEND`, and `GOTO` bridge events.
 * The client distinguishes intent with `action`; the host resolves handlers by `action`.
 */
interface BridgeActionRequest {
    action: string;
    payload?: Record<string, unknown>;
}

/**
 * Internal message-bus event envelope.
 */
interface BridgeEvent {
    requestId: string;
    name: EventName;
    payload?: unknown;
}

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

/** Internal event-to-request mapping used only by MessageBusService. */
interface BridgeRequestContract {
    GET_STUDENT: void;
    GET_PARENT: void;
    GET_SCHOOL: void;
    GET_ACCESS_TOKEN: void;
    GOTO_PAYMENT_SUMMARY: Record<string, unknown>;
    GET: BridgeActionRequest;
    SEND: BridgeActionRequest;
    GOTO: BridgeActionRequest;
}
/** Internal event-to-response mapping used only by MessageBusService. */
interface BridgeResponseContract {
    GET_STUDENT: Student;
    GET_PARENT: Parent;
    GET_SCHOOL: School;
    GET_ACCESS_TOKEN: string;
    GOTO_PAYMENT_SUMMARY: Record<string, unknown>;
    GET: Record<string, unknown>;
    SEND: Record<string, unknown>;
    GOTO: Record<string, unknown>;
}
type BridgeEventName = keyof BridgeRequestContract & keyof BridgeResponseContract;
type BridgeRequestPayload<E extends BridgeEventName> = BridgeRequestContract[E];
type BridgeResponsePayload<E extends BridgeEventName> = BridgeResponseContract[E];
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
declare class MessageBusService {
    private readonly _requests$;
    private readonly _responses$;
    emitRequest<E extends BridgeEventName>(eventName: E, ...args: BridgeRequestPayload<E> extends void ? [] : [payload: BridgeRequestPayload<E>]): Observable<BridgeResponsePayload<E>>;
    onRequest(): Observable<BridgeEvent>;
    emitResponse(event: BridgeEvent, payload: unknown): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MessageBusService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<MessageBusService>;
}

export { EventName, MessageBusService };
export type { BridgeActionRequest, BridgeEvent, CoreFeature, IApiService, IParentStateManager, Parent, School, Student };
