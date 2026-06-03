import * as i0 from '@angular/core';
import { Injectable } from '@angular/core';
import { Subject, filter, map, take, timeout } from 'rxjs';

/**
 * Bridge event identifiers shared by host and client.
 */
var EventName;
(function (EventName) {
    EventName["GET_STUDENT"] = "GET_STUDENT";
    EventName["GET_PARENT"] = "GET_PARENT";
    EventName["GET_ACCESS_TOKEN"] = "GET_ACCESS_TOKEN";
    EventName["GET_SCHOOL"] = "GET_SCHOOL";
    EventName["GOTO_PAYMENT_SUMMARY"] = "GOTO_PAYMENT_SUMMARY";
    EventName["GET"] = "GET";
    EventName["SEND"] = "SEND";
    EventName["GOTO"] = "GOTO";
})(EventName || (EventName = {}));

const BRIDGE_REQUEST_TIMEOUT_MS = 10_000;
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
/**
 * The MessageBusService is responsible for facilitating communication between the client app and the host app. It provides methods for emitting requests from the client to the host and for the host to listen to those requests and emit responses back to the client. The service uses RxJS Subjects to manage the stream of requests and responses, allowing for asynchronous communication between the two apps. The event structure includes a unique requestId to correlate requests and responses, an event name to identify the type of request, and an optional payload to pass data between the apps.
 */
class MessageBusService {
    _requests$ = new Subject();
    _responses$ = new Subject();
    emitRequest(eventName, payload) {
        // Generate a unique requestId for each request
        const requestId = `${Math.random().toString(36)}${Date.now().toString(36)}`;
        // Create the event object
        const event = {
            // requestId is used to correlate the request and response between the client and host apps, ensuring that the client receives the correct response for its request, especially when multiple requests are in flight simultaneously.
            requestId,
            // name is used to identify the type of request being made, allowing the host app to determine which handler to invoke based on the event name.
            name: eventName,
            // payload is used to pass data between the client and host apps, enabling the client to send necessary information for the request and the host to provide relevant data in the response. In this case, it can be used to pass parameters or context needed for processing the request and generating the appropriate response.
            payload,
        };
        // Emit the event to the host app
        this._requests$.next(event);
        // Return an observable that will emit the response from the host app to the client app
        return this._responses$.pipe(filter((e) => e.requestId === event.requestId), map((e) => e.payload), take(1), timeout(BRIDGE_REQUEST_TIMEOUT_MS));
    }
    onRequest() {
        // Listen to the event emitted by the client app
        return this._requests$.asObservable();
    }
    emitResponse(event, payload) {
        const responseEvent = {
            ...event,
            payload,
        };
        // Emit the response event to the client app
        this._responses$.next(responseEvent);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.1.0", ngImport: i0, type: MessageBusService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "21.1.0", ngImport: i0, type: MessageBusService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.1.0", ngImport: i0, type: MessageBusService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });

/*
 * @zdc/main — shared contracts and bridge primitives only.
 *
 * Host:  @zdc/main/host
 * Client: @zdc/main/client
 */

/**
 * Generated bundle index. Do not edit.
 */

export { EventName, MessageBusService };
//# sourceMappingURL=zdc-main.mjs.map
