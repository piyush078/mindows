import { FcCalculator, FcCalendar, FcDocument, FcFolder } from 'react-icons/fc';

export const Wallpapers = {
  list: [
    {
      name: '9fa80fd805562a6bc817f01f48b8b93e.jpg',
      description: 'Wharariki Beach Cave, Archway Islands, South Island of New Zealand',
    },
    {
      name: 'd2luMTBfb2ZmaWNpYWxfd2FsbHBhcGVy.jpg',
      description: 'Windows 10 Official wallpaper'
    }
  ],
  defaultWallpaper: 1
};


export const Strings = {
  INCORRECT_PASSWORD: 'The password is incorrect. Try again.',
  LOGIN_LINK_SIGNUP_VIEW: 'Or, even better, sign-in',
  SIGNUP_LINK_LOGIN_VIEW: 'Sign-up options',
  SIGNUP_NAME_VIEW_TITLE: "Who's going to use this PC?",
  SIGNUP_NAME_VIEW_SUBTITLE: 'What name do you want to use?',
  SIGNUP_PASSWORD_VIEW_TITLE: 'Create a super memorable password',
  SIGNUP_PASSWORD_VIEW_SUBTITLE: "Make sure to pick something you'll absolutely remember",
  SUCCESSFUL_LOGIN_WELCOME_TEXT: 'Welcome',

  TASKBAR_SEARCH_PLACEHOLDER: 'Type here to search',
};


export const InstalledApps = {
  calculator: {
    id: 'calculator',
    name: 'Calculator',
    icon: FcCalculator,
  },
  calendar: {
    id: 'calender',
    name: 'Calender',
    icon: FcCalendar,
  },
  fsexplorer: {
    id: 'fsexplorer',
    name: 'Mindows Explorer',
    icon: FcFolder,
  },
  notepad: {
    id: 'notepad',
    name: 'Notepad',
    icon: FcDocument,
  }
};