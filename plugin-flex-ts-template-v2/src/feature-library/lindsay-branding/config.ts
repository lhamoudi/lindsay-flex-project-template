import { getFeatureFlags } from '../../utils/configuration';
import LindsayBrandingConfig from './types/ServiceConfiguration';

const { enabled = false } = (getFeatureFlags()?.features?.lindsay_branding as LindsayBrandingConfig) || {};

export const isFeatureEnabled = () => {
  return enabled;
};
