export interface ItemVehicle {
  id: string;
  type: string;
  attributes: {
    year: string;
    make: string;
    model: string;
    engine_size: string;
  };
}
