import "@testing-library/jest-dom/vitest";

import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// jsdom has no matchMedia, which framer-motion's reduced-motion hook reads.
if (typeof window !== "undefined" && !window.matchMedia) {
  window.matchMedia = ((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  })) as typeof window.matchMedia;
}

// jsdom has no ResizeObserver, which Radix's popper reads when a tooltip or
// popover opens. Nothing is measured in tests, so observing is a no-op.
if (typeof window !== "undefined" && !window.ResizeObserver) {
  window.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver;
}

// Vitest runs without globals, so Testing Library's auto-cleanup never
// registers itself — unmount between tests explicitly.
afterEach(cleanup);
