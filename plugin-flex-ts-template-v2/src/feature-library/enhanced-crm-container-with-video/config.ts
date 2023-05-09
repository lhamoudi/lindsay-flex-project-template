import { getFeatureFlags } from '../../utils/configuration';
import EnhancedCRMContainerWithVideoConfig from './types/ServiceConfiguration';

const {
  enabled = false,
  pop_out_button = false,
  refresh_button = false,
  video_app_url,
  crm_app_url,
} = (getFeatureFlags()?.features?.enhanced_crm_container_with_video as EnhancedCRMContainerWithVideoConfig) || {};

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
