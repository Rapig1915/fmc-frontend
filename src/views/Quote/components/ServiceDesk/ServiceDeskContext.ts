import React from 'react';

export interface IServiceDeskContext {
  services: string[];
  handleSetServices: (services: string[]) => void;
}

export const ServiceDeskContext = React.createContext<IServiceDeskContext>({
  services: [],
  handleSetServices: () => {},
});
