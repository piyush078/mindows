import { GrWindows } from 'react-icons/gr';

import BootLogo from '../../components/BootLogo/BootLogo';
import './BootScreen.scss';

const BootScreen = () => (
  <div className="BootScreen">
    <div className="brandlogo">
      <GrWindows />
    </div>
    <div className="bootlogo">
      <BootLogo />
    </div>
  </div>
);

export default BootScreen;
