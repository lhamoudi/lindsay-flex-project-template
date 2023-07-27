import * as Flex from '@twilio/flex-ui';

import { FlexComponent } from '../../../../types/feature-loader';

export const componentName = FlexComponent.AgentDesktopView;
export const componentHook = function hidePanel2(flex: typeof Flex, _manager: Flex.Manager) {
  flex.AgentDesktopView.defaultProps.showPanel2 = false;
};
