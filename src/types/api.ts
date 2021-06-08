import { IAppointment, ICarMeta, IVehicle } from './model';

export interface ResponseZipcode {
  zipcode: string;
  'times-used': number;
}

export interface ResponseVehicle {
  data: [IVehicle];
}

export interface ResponseCheckPlateNumber {
  specifications: ICarMeta;
}

export interface RequestCreateAppointment {
  car_attributes: {
    year: string;
    make: string;
    model: string;
    engine_size: string;
  };
  tracking_attributes: {
    utm_source: string;
    utm_medium: string;
    utm_term: string;
    utm_content: string;
    utm_campaign: string;
    gclid: string;
  };
  location_attributes: {
    zip: string;
  };
  address: string;
  diagnosis_input: string;
  services: string[];
  name: string;
  email: string;
  phone: string;
}

export interface RequestUpdateAppointmentTime {
  appointment_day: string;
  appointment_time: string;
  hints_to_find: string;
  exact_address: string;
}

export interface RequestConfirmAppointment {
  token: string;
}

export interface ResponseAppointment {
  data: IAppointment;
}

export interface ResponseAvailability {
  data: {
    id: number;
    type: string;
    attributes: {
      availability: {
        [date: string]: string[];
      };
    };
  };
}
