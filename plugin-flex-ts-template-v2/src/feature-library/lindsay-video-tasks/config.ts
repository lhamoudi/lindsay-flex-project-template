import { getFeatureFlags } from '../../utils/configuration';
import LindsayVideoTasksConfig from './types/ServiceConfiguration';

const { enabled = false } = (getFeatureFlags()?.features?.lindsay_video_tasks as LindsayVideoTasksConfig) || {};

export const isFeatureEnabled = () => {
  return enabled;
};
