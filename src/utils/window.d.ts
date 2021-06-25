declare global {
  interface Window {
    mixpanel: {
      track: (service: string) => void;
      identify: (id: string | undefined) => void;
    };
  }
}

Window.mixpanel = Window.mixpanel || {};

export default Window;
