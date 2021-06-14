export interface IVehicle {
  id: string;
  type: string;
  attributes: {
    year: string;
    make: string;
    model: string;
    engine_size: string;
  };
}

export interface ICarMeta {
  vin: string;
  year: string;
  make: string;
  model: string;
  trim: string;
  engine: string;
  license_plate: string;
}

export interface IAppointment {
  id: number;
  type: string;
  attributes: {
    user_id: number | undefined;
    services: [string];
    diagnosis_input: string;
    address: string;
    car: {
      id: number;
      year: string;
      make: string;
      model: string;
      engine_size: string;
      mileage: string;
      trim: string;
      one_string: string;
    };
    appointment_type: string;
    appointment_day: string;
    appointment_time: string;
    exact_address: string;
    type_of_site: string;
    mechanic: {
      name: string;
      bio: string;
      phone: string;
      expertise: string;
      years_of_experience: string;
      certification: string;
      photo: string;
      reviews: number;
      mechanic_reviews: [string];
    };
    customer_name: string;
    customer_phone: string;
    payment_type: string;
    status: string;
    problem_name: string;
    diagnosis_fee: number;
    ppi_fee: number;
    platinum: boolean;
    platinum_expired: boolean;
    documents: [
      {
        name: string;
        url: string;
      }
    ];
    tax_rate: string;
    time_for_mechanic: string;
    hourly_rate: number;
    services_auto_offered: [string];
  };
}

export interface IInspection {
  service: string;
  price: number;
}

export interface IUser {
  id: string;
  type: string;
  attributes: {
    name: string;
    email: string;
    phone: string;
    zip_code: string;
    referral_code: string;
    car: {
      id: number;
      year: string;
      make: string;
      model: string;
      engine_size: string;
      mileage: string;
    };
    receipt_count: number;
    inspection: IInspection | null;
    diag_notes: IInspection | null;
    receipts: string[];
    last_inspection: IInspection | null;
    all_cars: [
      {
        car: string;
        inspection: IInspection | null;
      }
    ];
  };
}
