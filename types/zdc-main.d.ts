import * as rxjs from 'rxjs';
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
 * Shared bridge payload contracts.
 */
interface Student {
    id: number | string;
    name: string;
    grade?: string;
}
interface Parent {
    id: number | string;
    name: string;
}
interface School {
    id: number | string;
    name: string;
}
/**
 * Maps bridge event names to their response shapes for type-safe handlers.
 */
interface BridgeContract {
    GET_STUDENT: Student;
    GET_PARENT: Parent;
    GET_ACCESS_TOKEN: string;
    GET_SCHOOL: School;
    GOTO_PAYMENT_SUMMARY: {
        success: boolean;
    };
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
    emitRequest(eventName: EventName, payload?: unknown): rxjs.Observable<unknown>;
    onRequest(): rxjs.Observable<BridgeEvent>;
    emitResponse(event: BridgeEvent, payload: unknown): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MessageBusService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<MessageBusService>;
}

export { EventName, MessageBusService };
export type { BridgeContract, BridgeEvent, CoreFeature, IApiService, IParentStateManager, Parent, School, Student };
