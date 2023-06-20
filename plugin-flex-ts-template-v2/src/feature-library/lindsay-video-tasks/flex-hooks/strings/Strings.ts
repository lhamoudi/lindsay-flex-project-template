// Export the template names as an enum for better maintainability when accessing them elsewhere
export enum StringTemplates {}

export const stringHook = () => ({
  'en-US': {},
});

export const systemStringHook = () => ({
  'en-US': {
    TaskLineChatReserved: 'Incoming {{task.taskChannelUniqueName}} request',
    TaskHeaderEndChat: 'END SESSION',
  },
});
