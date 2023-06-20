import React, { useState, useRef } from 'react';
import * as Flex from '@twilio/flex-ui';
import { TaskContext, TaskHelper } from '@twilio/flex-ui';
import { Badge, Stack } from '@twilio-paste/core';
import { CustomizationProvider } from '@twilio-paste/core/dist/customization';

import { Worker } from '../../../../../types/task-router';
import { isRefreshButtonEnabled, isPopOutButtonEnabled } from '../../../config';
import { wrapperStyle, frameStyle } from './IFrameWrapperStyles';

export interface Props {
  thisTask: Flex.ITask; // task assigned to iframe
  task: Flex.ITask; // task in Context
  crmAppUrl: string;
  videoAppUrl: string;
}

export const IFrameWrapper = ({ thisTask, task, crmAppUrl, videoAppUrl }: Props) => {
  const iFrameRef = useRef<HTMLIFrameElement>(null);
  const [iFrameKey, setIframeKey] = useState(0 as number);
  const wrapperDivRef = useRef<HTMLDivElement>(null);
  const isVideoTask = thisTask?.taskChannelUniqueName === 'video';

  const getWorkerFriendlyName = (worker: Worker) => {
    return (
      // worker?.attributes?.public_identity || worker?.attributes?.full_name?.split(' ')?.[0] || 'Customer Service Agent'
      worker?.attributes?.public_identity || worker?.attributes?.full_name || 'Customer Service Agent'
    );
  };

  const urlParamAppender = (url: string, param: string, value: string) => {
    return `${url}${url.includes('?') ? '&' : '?'}${param}=${encodeURIComponent(value)}`;
  };

  const handleRefreshClick = () => {
    // Changing the key will re-render the iframe
    setIframeKey(Math.floor(Math.random() * (Number.MAX_SAFE_INTEGER + 1)));
  };

  const handlePopoutClick = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      wrapperDivRef.current?.requestFullscreen();
    }
  };

  // This allows short-lived tasks (e.g. callback tasks) to share/show
  // the same iframe as their parent task so CRM work can continue after
  // the short-lived task completes and disappears
  const visibility =
    task?.taskSid === thisTask.taskSid || task?.attributes?.parentTask === thisTask.sid ? 'visible' : ('hidden' as any);

  let url = 'https://www.bing.com';

  if (isVideoTask && videoAppUrl) {
    url = videoAppUrl;
    const roomName = thisTask.attributes.conversationSid || thisTask.attributes.videoTaskData?.callSid;
    const identity = getWorkerFriendlyName(Flex.Manager.getInstance().workerClient as unknown as Worker);
    // Take the room name from the chat conversation SID
    if (roomName) {
      url = urlParamAppender(url, 'roomName', roomName);
      url = urlParamAppender(url, 'identity', identity);
      url = urlParamAppender(url, 'skipPreflight', 'true');
    }
  } else if (crmAppUrl) {
    url = crmAppUrl;
    url = urlParamAppender(url, 'iframe', 'true');
    // Example of passing CRM-specific params
    if (thisTask?.attributes?.case_id) {
      url = urlParamAppender(url, 'ticket_id', thisTask.attributes.case_id);
    } else if (TaskHelper.isCallTask(task)) {
      url = urlParamAppender(url, 'q', task.attributes.caller);
    }
  }

  return (
    <div ref={wrapperDivRef} style={{ ...wrapperStyle, visibility }}>
      <CustomizationProvider
        elements={{
          CUSTOM_STACK: {
            top: 'space10',
            position: 'absolute',
            right: 'space10',
            zIndex: 'zIndex90',
          },
        }}
      >
        <TaskContext.Consumer>
          {(context) => {
            const unreadMessageCount = context.conversation?.unreadMessages?.length as number;
            return (
              <Stack orientation="horizontal" spacing="space10" element="CUSTOM_STACK">
                {TaskHelper.isChatBasedTask(thisTask) && document.fullscreenElement && unreadMessageCount > 0 && (
                  <Badge as="span" variant="neutral_counter">
                    {unreadMessageCount}
                  </Badge>
                )}
                {isRefreshButtonEnabled() && (
                  <Flex.IconButton variant="primary" icon="Loading" onClick={handleRefreshClick} />
                )}
                {isPopOutButtonEnabled() && (
                  <Flex.IconButton
                    variant="primary"
                    icon={document.fullscreenElement ? 'SideMenuOff' : 'SideMenuOn'}
                    onClick={handlePopoutClick}
                  />
                )}
              </Stack>
            );
          }}
        </TaskContext.Consumer>
        <iframe
          key={iFrameKey}
          style={frameStyle}
          src={url}
          ref={iFrameRef}
          allow={isVideoTask ? 'camera; microphone; clipboard-write; display-capture' : 'clipboard-write'}
          allowFullScreen={true}
        />
      </CustomizationProvider>
    </div>
  );
};
