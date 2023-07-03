import { ITask } from '@twilio/flex-ui';
import { Avatar } from '@twilio-paste/core';

interface CustomerAvatarObjectProps {
  task: ITask;
}

const CustomerAvatarObject = ({ task }: CustomerAvatarObjectProps) => {
  const { customer } = task.attributes;

  return <Avatar size="sizeIcon70" name={customer ?? '?'} />;
};

export default CustomerAvatarObject;
