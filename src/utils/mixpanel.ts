import MixpanelWindow from './window';

const mixPanel = (event: string, identifier = undefined): void => {
  const { mixpanel } = window as MixpanelWindow;
  if (typeof mixpanel !== 'undefined') {
    if (identifier) {
      mixpanel.identify(identifier);
    }
    mixpanel.track(event);
  }
};

export default mixPanel;
