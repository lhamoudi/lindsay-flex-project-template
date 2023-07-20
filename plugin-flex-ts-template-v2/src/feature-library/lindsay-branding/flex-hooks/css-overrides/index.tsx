import * as Flex from '@twilio/flex-ui';

export const cssOverrideHook = (_flex: typeof Flex, _manager: Flex.Manager) => {
  return {
    MainHeader: {
      Container: {
        background: '#000000', // Macquarie header (black)
        color: '#ffffff',
        'div:nth-of-type(2)>img': {
          maxHeight: '50px',
        },
      },
    },
    SideNav: {
      Container: {
        background: '#2e323f', // Macquarie deselected (grey)
        '.Twilio-Side-Link': {
          '.Twilio-Side-Link-IconContainer': {
            color: '#ffffff',
          },
        },
        '.Twilio-Side-Link:hover': {
          '.Twilio-Side-Link-IconContainer': {
            color: '#000000',
          },
        },
        '.Twilio-Side-Link--Active': {
          background: '#4472c4 !important', // Macquarie selected (blue)
          '.Twilio-Side-Link-IconContainer': {
            color: '#ffffff',
          },
        },
      },
    },
  };
};
