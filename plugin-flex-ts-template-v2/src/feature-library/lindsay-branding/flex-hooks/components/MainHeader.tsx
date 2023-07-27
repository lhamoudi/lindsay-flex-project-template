import * as Flex from '@twilio/flex-ui';

import { FlexComponent } from '../../../../types/feature-loader';
import { getFeatureFlags } from '../../../../utils/configuration';

const {
  serverless_functions_domain = '',
  serverless_functions_port = '',
  serverless_functions_protocol = 'https',
} = getFeatureFlags() || {};

let serverlessBaseUrl = `${serverless_functions_protocol}://${serverless_functions_domain}`;
if (serverless_functions_port) {
  serverlessBaseUrl += `:${serverless_functions_port}`;
}
const logoUrl = `${serverlessBaseUrl}/features/lindsay-branding/mgl-rgb.white.horizontal.1.0.png`;

export const componentName = FlexComponent.MainHeader;
export const componentHook = function overrideLogo(flex: typeof Flex, _manager: Flex.Manager) {
  flex.MainHeader.defaultProps.logoUrl = logoUrl;
};
