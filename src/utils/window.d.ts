declare global {
  interface Window {
    mixpanel: {
      track: (service: string) => void;
      identify: (id: string | undefined) => void;
    };

    fbq: (
      a: string,
      b: string,
      c?: { value: number; currency: string }
    ) => void;
    dataLayer: Array;
    uetq: Array;
  }
}

Window.mixpanel = Window.mixpanel || {};

export default Window;
