# enhanced-crm-container-with-video

This feature builds on the Enhanced CRM Container feature, but adds option to render a Video App in the CRMContainer, when a video task is selected. Also provides a popout button to transition to fullscreen, and also inform the agent of any unread chats that are waiting for them.

# flex-user-experience

Screenshot to follow 

# setup and dependencies

See flex-config for the configuration required to enable this feature.

# how does it work?

Similar to the Enhanced CRM Container feature, the component keeps a array of each task and provides an iframe for each one. Based on the currently selected task, the component re-renders and modifies the CSS for the iframe to either hide or show based on whether its the currently selected task. Once the task is removed the iframe is removed.
