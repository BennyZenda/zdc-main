import * as i0 from '@angular/core';
import { InjectionToken } from '@angular/core';

declare class Main {
    static ɵfac: i0.ɵɵFactoryDeclaration<Main, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<Main, "zdc-main", never, {}, {}, never, never, true, never>;
}

interface AppServices {
    apiService: IApiService;
    loaderService: any;
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

declare const APP_SERVICES: InjectionToken<AppServices>;

declare class Test {
    private mainService;
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<Test, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<Test, "zdc-main-test", never, {}, {}, never, never, true, never>;
}

export { APP_SERVICES, Main, Test };
