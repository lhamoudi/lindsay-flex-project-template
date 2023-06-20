import * as Flex from '@twilio/flex-ui';
import React from 'react';
import { VideoOnIcon } from '@twilio-paste/icons/esm/VideoOnIcon';
import { VideoOffIcon } from '@twilio-paste/icons/esm/VideoOffIcon';

/**
 * Flex Task Channel Definition for Video Call Tasks that require native Chat (e.g. those created by the Interactions API
 * or escalated from a Chat Task)
 * Use taskType = 'video-call-audio-only' to indicate (via icons) that the task is an audio-only Video Call.
 * @param flex
 * @param _manager
 * @returns
 */
export const channelHook = function createVideoChatCallChannel(flex: typeof Flex, _manager: Flex.Manager) {
  const channelDefinition = flex.DefaultTaskChannels.createChatTaskChannel('video-chat-call', (task) => {
    return task.taskChannelUniqueName === 'video' && task.attributes?.conversationSid !== undefined;
  });

  const { templates } = channelDefinition;
  const VideoChatCallChannel: Flex.TaskChannelDefinition = {
    ...channelDefinition,
    templates: {
      ...templates,
      TaskListItem: {
        ...templates?.TaskListItem,
        firstLine: (task: Flex.ITask) => `${task.queueName}: ${task.defaultFrom}`,
      },
      TaskCanvasHeader: {
        ...templates?.TaskCanvasHeader,
        title: (task: Flex.ITask) => `${task.queueName}: ${task.defaultFrom}`,
      },
      IncomingTaskCanvas: {
        ...templates?.IncomingTaskCanvas,
        firstLine: (task: Flex.ITask) => `${task.defaultFrom}`,
      },
    },
    icons: {
      active: (task: Flex.ITask) =>
        task.attributes?.taskType === 'video-call-audio-only' ? (
          <VideoOffIcon key="active-video-call-icon" decorative={true} />
        ) : (
          <VideoOnIcon key="active-video-call-icon" decorative={true} />
        ),
      list: (task: Flex.ITask) =>
        task.attributes?.taskType === 'video-call-audio-only' ? (
          <VideoOffIcon key="list-video-call-icon" decorative={true} />
        ) : (
          <VideoOnIcon key="list-video-call-icon" decorative={true} />
        ),
      main: (task: Flex.ITask) =>
        task.attributes?.taskType === 'video-call-audio-only' ? (
          <VideoOffIcon key="main-video-call-icon" decorative={true} />
        ) : (
          <VideoOnIcon key="main-video-call-icon" decorative={true} />
        ),
    },
  };

  // Register Channel
  return VideoChatCallChannel;
};
