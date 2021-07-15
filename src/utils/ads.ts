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

const bingTrack = (event: string) => {
  window.uetq = window.uetq || [];
  window.uetq.push('event', event, {
    event_category: event,
    event_label: event,
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

const callFbq = (event: string, totalVal?: number) => {
  const { fbq } = window as AdsWindow;
  if (typeof fbq !== 'undefined') {
    if (event === 'Quote') {
      fbq('track', event);
    } else {
      fbq('track', event, {
        value: totalVal,
        currency: 'USD',
      });
    }
  }
};

export const callAdsQuote = (appointment: IAppointment): void => {
  gtagReportConversion(appointment.id, 'AW-792197156/tFPlCL7mlPwBEKTw3_kC');
  gtagReportConversion(appointment.id, 'AW-792197156/36WYCNOs37cBEKTw3_kC');
  bingTrack('Quote');
  dataLayer(appointment);
  callFbq('Quote');
};

export const callAdsBooking = (appointment: IAppointment): void => {
  const { attributes } = appointment;

  let sendTo;
  let totalVal;

  if (attributes.appointment_type === 'diagnosis') {
    totalVal = attributes.diagnosis_fee;
    sendTo = 'AW-792197156/iS79CKLb5tEBEKTw3_kC';
    gtagReportConversion(appointment.id, 'AW-792197156/cCWvCIjBz_4BEKTw3_kC');
  } else if (attributes.appointment_type === 'ppi') {
    totalVal = attributes.ppi_fee;
    sendTo = 'AW-792197156/iS79CKLb5tEBEKTw3_kC';
    gtagReportConversion(appointment.id, 'AW-792197156/cCWvCIjBz_4BEKTw3_kC');
  } else {
    totalVal = attributes.estimate?.total_price;
    sendTo = 'AW-792197156/F97FCLfE69EBEKTw3_kC';
    gtagReportConversion(appointment.id, 'AW-792197156/dUT8CJulovwBEKTw3_kC');
  }

  gtagReportConversion(appointment.id, sendTo);
  callFbq('Purchase', totalVal);
  bingTrack('Booking');
};
