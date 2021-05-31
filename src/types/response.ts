import { ItemVehicle } from './model';

export interface ResponseZipcode {
  zipcode: string;
  'times-used': number;
}

export interface ResponseVehicle {
  data: [ItemVehicle];
}
