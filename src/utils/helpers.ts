import { environment } from './config';
import { ENVIRONMENT } from './consts';

export const isDevEnv = (): boolean => environment === ENVIRONMENT.DEVELOPMENT;

export default isDevEnv;
