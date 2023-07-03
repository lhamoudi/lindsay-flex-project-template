import * as Flex from '@twilio/flex-ui';

import CustomerAvatarObject from '../../custom-components/CustomerAvatarObject';

export const channelHook = function overrideCallChannelToUseCustomerAttribute(
  flex: typeof Flex,
  _manager: Flex.Manager,
) {
  const channelDefinition = flex.DefaultTaskChannels.Call;
  const { templates, icons } = channelDefinition;

  channelDefinition.templates = {
    ...templates,
    TaskListItem: {
      ...flex.DefaultTaskChannels.Call.templates?.TaskListItem,
      firstLine: (task: Flex.ITask) => `(${task.attributes.customer}) ${task.defaultFrom}`,
    },
    TaskCanvasHeader: {
      ...flex.DefaultTaskChannels.Call.templates?.TaskCanvasHeader,
      title: (task: Flex.ITask) => `(${task.attributes.customer}) ${task.defaultFrom}`,
    },
  };

  channelDefinition.icons = {
    ...icons,
    list: <CustomerAvatarObject key="task-list-customer-avatar" />,
    main: <CustomerAvatarObject key="main-customer-avatar" />,
    active: <CustomerAvatarObject key="active-customer-avatar" />,
  };

  // Nothing to return from hook, since we are overriding the default Call channel versus adding a new channel
};
