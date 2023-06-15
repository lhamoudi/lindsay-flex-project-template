import * as Flex from '@twilio/flex-ui';
import React from 'react';
import { VideoOnIcon } from '@twilio-paste/icons/esm/VideoOnIcon';
import { VideoOffIcon } from '@twilio-paste/icons/esm/VideoOffIcon';

/**
 * Flex Task Channel Definition for Video Call Tasks that have no need for native Chat
 * Use taskType = 'audio-only-call' to indicate (via icons) that the task is an audio-only Video Call.
 * @param flex
 * @param _manager
 * @returns
 */
export const channelHook = function createVideoCallChannel(flex: typeof Flex, _manager: Flex.Manager) {
  const channelDefinition = flex.DefaultTaskChannels.createDefaultTaskChannel('video-call', (task) => {
    return (
      (task.taskChannelUniqueName === 'videointerpreter' || task.taskChannelUniqueName === 'audiointerpreter') &&
      task.attributes?.conversationSid === undefined
    );
  });

  const { templates } = channelDefinition;
  const VideoCallChannel: Flex.TaskChannelDefinition = {
    ...channelDefinition,
    templates: {
      ...templates,
      TaskListItem: {
        ...templates?.TaskListItem,
        firstLine: (task: Flex.ITask) =>
          `${task.queueName}: ${task.defaultFrom}${
            task.taskChannelUniqueName === 'audiointerpreter' ? ' (audio-only)' : ''
          }`,
      },
      TaskCanvasHeader: {
        ...templates?.TaskCanvasHeader,
        title: (task: Flex.ITask) =>
          `${task.queueName}: ${task.defaultFrom}${
            task.taskChannelUniqueName === 'audiointerpreter' ? ' (audio-only)' : ''
          }`,
      },
      IncomingTaskCanvas: {
        ...templates?.IncomingTaskCanvas,
        firstLine: (task: Flex.ITask) =>
          `${task.queueName}${task.taskChannelUniqueName === 'audiointerpreter' ? ' (audio-only)' : ''}`,
      },
    },
    icons: {
      active: (task: Flex.ITask) =>
        task.taskChannelUniqueName === 'audiointerpreter' ? (
          <VideoOffIcon key="active-video-call-icon" decorative={true} />
        ) : (
          <VideoOnIcon key="active-video-call-icon" decorative={true} />
        ),
      list: (task: Flex.ITask) =>
        task.taskChannelUniqueName === 'audiointerpreter' ? (
          <VideoOffIcon key="list-video-call-icon" decorative={true} />
        ) : (
          <VideoOnIcon key="list-video-call-icon" decorative={true} />
        ),
      main: (task: Flex.ITask) =>
        task.taskChannelUniqueName === 'audiointerpreter' ? (
          <VideoOffIcon key="main-video-call-icon" decorative={true} />
        ) : (
          <VideoOnIcon key="main-video-call-icon" decorative={true} />
        ),
    },
  };

  // Register Channel
  return VideoCallChannel;
};
