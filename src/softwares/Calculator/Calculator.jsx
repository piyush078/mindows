import { VscDebug } from 'react-icons/vsc';
import './Calculator.scss';

const Calculator = () => (
  <div className="Calculator">
    <div className="Calculator-leftbar">
      <VscDebug />
      <p>Oops! Mindows must be broken!!</p>
    </div>
    <div className="Calculator-rightbar">
      <div>
        <p>There seems to be no Calculator installed on the system.</p>
        <p>But wait... you can always add it and send a pull request.</p>
      </div>
    </div>
  </div>
);

export default Calculator;
