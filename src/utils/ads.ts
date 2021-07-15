import { IAppointment } from 'src/types';
import AdsWindow from './window';

const gtagReportConversion = (userId: number, sendTo: string, url?: string) => {
  const callback = () => {
    if (typeof url !== 'undefined') {
      window.location.href = url;
    }
  };

  const { gtag } = window;

  if (typeof gtag !== 'undefined') {
    gtag('event', 'conversion', {
      send_to: sendTo,
      user_id: userId,
      event_callback: callback,
    });
  }
  return false;
};

const bingTrack = () => {
  window.uetq = window.uetq || [];
  window.uetq.push('event', 'Quote', {
    event_category: 'Quote',
    event_label: 'Quote',
    event_value: '0',
  });
};

const dataLayer = (appointment: IAppointment) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'quoteRequest',
    data: {
      quoteInfo: {
        services: [{ serviceName: appointment.attributes.services.join(', ') }],
        car: {
          make: appointment.attributes.car.make,
          model: appointment.attributes.car.model,
          year: appointment.attributes.car.year,
        },
        userInfo: {
          userId: appointment.attributes.user_id,
          emailAddress: appointment.attributes.estimate?.customer.email,
        },
      },
    },
  });
  window.dataLayer.push({
    event: 'signup',
    data: {
      userInfo: {
        userId: appointment.attributes.user_id,
        emailAddress: appointment.attributes.estimate?.customer.email,
      },
    },
  });
};

const callFbq = () => {
  const { fbq } = window as AdsWindow;
  if (typeof fbq !== 'undefined') {
    fbq('track', 'Quote');
  }
};

const callAds = (appointment: IAppointment): void => {
  gtagReportConversion(appointment.id, 'AW-792197156/tFPlCL7mlPwBEKTw3_kC');
  gtagReportConversion(appointment.id, 'AW-792197156/36WYCNOs37cBEKTw3_kC');
  bingTrack();
  dataLayer(appointment);
  callFbq();
};

export default callAds;
