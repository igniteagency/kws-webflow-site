import type { Webflow } from '@finsweet/ts-utils';
import type { ScrollTrigger } from 'gsap/ScrollTrigger';

export type SCRIPTS_ENV = 'dev' | 'prod';

declare global {
  interface Window {
    JS_SCRIPTS: Set<string> | undefined;
    Webflow: Webflow;

    SCRIPTS_ENV: ENV;
    setScriptsENV(env: ENV): void;

    IS_DEBUG_MODE: boolean;
    setDebugMode(mode: boolean): void;
    /**
     * A wrapper function to directly console log when debug mode is active
     */
    DEBUG: (...args: any[]) => void;

    gsap: GSAP;
    ScrollTrigger: typeof ScrollTrigger;

    loadExternalScript(url: string, placement: 'head' | 'body', defer: boolean): void;

    Alpine: Alpine;
  }

  // Extend `querySelector` and `querySelectorAll` function to stop the nagging of converting `Element` to `HTMLElement` all the time
  interface ParentNode {
    querySelector<E extends HTMLElement = HTMLElement>(selectors: string): E | null;
    querySelectorAll<E extends HTMLElement = HTMLElement>(selectors: string): NodeListOf<E>;
  }
}

export {};
