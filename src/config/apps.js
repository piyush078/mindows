import { FcCalculator, FcCalendar, FcDocument, FcFolder } from 'react-icons/fc';
import Explorer from '../softwares/Explorer/Explorer';
import Notepad from '../softwares/Notepad/Notepad';

const InstalledApps = {
  calculator: {
    id: 'calculator',
    name: 'Calculator',
    icon: FcCalculator,
  },
  calendar: {
    id: 'calendar',
    name: 'Calendar',
    icon: FcCalendar,
  },
  fsexplorer: {
    id: 'fsexplorer',
    name: 'Mindows Explorer',
    icon: FcFolder,
    component: Explorer,
  },
  notepad: {
    id: 'notepad',
    name: 'Notepad',
    icon: FcDocument,
    component: Notepad,
    config: {
      initTitle: 'Untitled - Notepad',
      initWindowWidth: '480px',
      initWindowHeight: '480px',
    },
  },
};

export default InstalledApps;
