const { prepareStudioFunction, extractStandardResponse } = require(Runtime.getFunctions()[
  'common/helpers/function-helper'
].path);
const TaskOperations = require(Runtime.getFunctions()['common/twilio-wrappers/taskrouter'].path);

const requiredParameters = [
  { key: 'caller', purpose: 'the caller ANI/CLI' },
  { key: 'name', purpose: 'name to be displayed for incoming task' },
  { key: 'callSid', purpose: 'the call SID to be connected to the room' },
];

exports.handler = prepareStudioFunction(requiredParameters, async (context, event, callback, response, handleError) => {
  try {
    const {
      workflowSid: overriddenWorkflowSid,
      timeout: overriddenTimeout,
      priority: overriddenPriority,
      attempts: retryAttempt,
      caller,
      name,
      callSid,
      taskChannel: overriddenTaskChannel,
      taskType: overriddenTaskType,
      name: overriddenName,
    } = event;

    const result = await createVideoTask({
      context,
      overriddenWorkflowSid,
      overriddenTimeout,
      overriddenPriority,
      retryAttempt,
      caller,
      name,
      callSid,
      overriddenTaskChannel,
      overriddenTaskType,
      overriddenName,
    });

    const { status, taskSid } = result;
    response.setStatusCode(status);
    response.setBody({ taskSid, ...extractStandardResponse(result) });
    return callback(null, response);
  } catch (error) {
    return handleError(error);
  }
});

createVideoTask = async (parameters) => {
  const {
    context,
    overriddenWorkflowSid,
    overriddenTimeout,
    overriddenPriority,
    retryAttempt,
    caller,
    name,
    callSid,
    overriddenTaskChannel,
    overriddenTaskType,
  } = parameters;

  // use assigned values or use defaults
  const workflowSid = overriddenWorkflowSid || process.env.TWILIO_FLEX_VIDEO_WORKFLOW_SID;
  const timeout = overriddenTimeout || 86400;
  const priority = overriddenPriority || 0;
  const attempts = retryAttempt || 0;
  const taskChannel = overriddenTaskChannel || 'video';
  const taskType = overriddenTaskType || 'video';

  // setup required task attributes for task
  const attributes = {
    taskType,
    name,
    videoTaskData: {
      caller,
      callSid,
      attempts,
    },
    direction: 'inbound',
    // conversations: {
    //   conversation_id,
    // },
  };

  return TaskOperations.createTask({
    context,
    workflowSid,
    taskChannel,
    attributes,
    priority,
    timeout,
  });
};
