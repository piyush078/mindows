import { FcCalculator, FcCalendar, FcDocument, FcFolder } from 'react-icons/fc';
import { VscSettingsGear } from 'react-icons/vsc';
import Calculator from '../softwares/Calculator/Calculator';
import Calender from '../softwares/Calender/Calender';
import Explorer from '../softwares/Explorer/Explorer';
import Notepad from '../softwares/Notepad/Notepad';
import Settings from '../softwares/Settings/Settings';

const InstalledApps = {
  calculator: {
    id: 'calculator',
    name: 'Calculator',
    icon: FcCalculator,
    component: Calculator,
    config: {
      initWindowWidth: '320px',
      initWindowHeight: '480px',
    },
  },
  calendar: {
    id: 'calendar',
    name: 'Calendar',
    icon: FcCalendar,
    component: Calender,
  },
  fsexplorer: {
    id: 'fsexplorer',
    name: 'File Explorer',
    icon: FcFolder,
    component: Explorer,
    perms: {
      OPEN_DOCUMENT: true,
    },
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
  settings: {
    id: 'settings',
    name: 'Settings',
    icon: VscSettingsGear,
    component: Settings,
  },
};

export default InstalledApps;
