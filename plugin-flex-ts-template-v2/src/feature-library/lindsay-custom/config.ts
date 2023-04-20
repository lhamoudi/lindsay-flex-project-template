import { getFeatureFlags } from '../../utils/configuration';

const { enabled = false } = getFeatureFlags()?.features?.lindsay_custom || {};

export const isFeatureEnabled = () => {
  return enabled;
};
