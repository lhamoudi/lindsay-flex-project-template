import { getFeatureFlags } from '../../utils/configuration';
import CustomTaskViewConfig from './types/ServiceConfiguration';

const { enabled = false } = (getFeatureFlags()?.features?.custom_task_view as CustomTaskViewConfig) || {};

export const isFeatureEnabled = () => {
  return enabled;
};
