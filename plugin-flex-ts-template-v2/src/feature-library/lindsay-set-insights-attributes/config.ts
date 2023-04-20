import { getFeatureFlags } from '../../utils/configuration';

const { enabled = false } = getFeatureFlags()?.features?.lindsay_set_insights_attributes || {};

export const isFeatureEnabled = () => {
  return enabled;
};
