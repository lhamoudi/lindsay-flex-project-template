import { getFeatureFlags } from '../../utils/configuration';
import LindsayVideoTasksConfig from './types/ServiceConfiguration';

const {
  enabled = false,
  pop_out_button = false,
  refresh_button = false,
  video_app_url,
  crm_app_url,
} = (getFeatureFlags()?.features?.lindsay_video_tasks as LindsayVideoTasksConfig) || {};

export const isFeatureEnabled = () => {
  return enabled;
};

export const isPopOutButtonEnabled = () => {
  return pop_out_button;
};

export const isRefreshButtonEnabled = () => {
  return refresh_button;
};

export const getVideoAppUrl = () => {
  return video_app_url;
};

export const getCrmAppUrl = () => {
  return crm_app_url;
};
