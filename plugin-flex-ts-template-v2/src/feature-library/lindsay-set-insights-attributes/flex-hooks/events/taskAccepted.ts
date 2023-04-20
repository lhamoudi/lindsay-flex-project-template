import * as Flex from '@twilio/flex-ui';
import { WorkerAttributes } from '@twilio/flex-ui';

import { FlexEvent } from '../../../../types/feature-loader';
import { updateTaskAttributesForInsights } from '../../helpers/taskAttributes';

export const eventName = FlexEvent.taskAccepted;
export const eventHook = (_flex: typeof Flex, _manager: Flex.Manager, task: Flex.ITask) => {
  console.log(`lindsay-set-insights-attributes handle ${eventName} for ${task.sid}`);

  const { team_name: teamName } = _manager.workerClient?.attributes as WorkerAttributes;

  updateTaskAttributesForInsights(task, teamName ?? 'Team Lindsay');
};
