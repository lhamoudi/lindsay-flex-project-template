import * as Flex from '@twilio/flex-ui';

import { getCrmAppUrl, getVideoAppUrl } from '../../config';
import IFrameCRMContainer from '../../custom-components/IFrameCRMContainer';
import { FlexComponent } from '../../../../types/feature-loader';

export const componentName = FlexComponent.CRMContainer;
export const componentHook = function replaceAndSetCustomCRMContainer(flex: typeof Flex, _manager: Flex.Manager) {
  flex.CRMContainer.Content.replace(
    <IFrameCRMContainer key="custom-crm-container" crmAppUrl={getCrmAppUrl()} videoAppUrl={getVideoAppUrl()} />,
    {
      sortOrder: 1,
    },
  );
};
