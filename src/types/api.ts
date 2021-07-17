import { IAppointment, ICarMeta, IEstimate, IUser, IVehicle } from './model';

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
  kind?: 'RequestCreateAppointment';
  appointment_type?: string;
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
  category_selected: string;
  level: string;
}

export interface RequestUpdateAppointmentContact {
  kind?: 'RequestUpdateAppointmentContact';
  name: string;
  email: string;
  phone: string;
}

export interface RequestUpdateAppointmentTime {
  kind?: 'RequestUpdateAppointmentTime';
  appointment_day: string;
  appointment_time: string;
  type_of_site: string;
  hints_to_find: string;
  exact_address: string;
}

export interface RequestUpdateEstimateResponse {
  appointment: {
    id?: number;
    mechanic_already_here?: string;
    appointment_day?: string;
    appointment_time?: string;
  };
}

export interface RequestUpdateEstimateService {
  estimate_service: {
    status: string;
  };
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

export interface RequestAuth {
  user: {
    phone: string;
  };
}

export interface ResponseAuth {
  status: string;
  code: string;
}

export interface RequestSignin {
  user: {
    code?: string;
    email?: string;
    password?: string;
  };
}

export interface RequestSignInAppointment {
  id: string;
}

export interface ResponseSignin {
  auth_token: string;
  user: {
    id: number;
    email: string;
    'all-cars': [
      {
        car: string;
        inspection: string | undefined | null;
      }
    ];
  };
}

export interface ResponseGetUser {
  data: IUser;
}

export interface ResponseGetUserAppointments {
  data: IAppointment[];
}

export interface ResponseAppointmentEstimate {
  id: string;
  type: string;
  attributes: {
    appointment_id: number;
    mechanic_id: number;
    mechanic: {
      name: string;
      photo: string;
      phone: string;
    };
  };
}

export interface ResponseEstimate {
  data: IEstimate;
}
