import { Link } from "react-router-dom";
import { AiOutlineUser } from 'react-icons/ai';
import React, { useEffect, useState } from "react";
import BootLogo from '../../components/BootLogo/BootLogo';


const ChildView = (props) => {

  const { childClass, onFieldUpdate, value, signInOpt, onSubmit, details, validity } = props;
  const [opacity, updateOpacity] = useState(0);
  useEffect(() => updateOpacity(1), []);
  useEffect(() => updateOpacity(1), [childClass]);

  return (

    <div className={'ChildView ' + childClass} style={{ opacity: opacity }}>
    {
      childClass === 'AccountSettingUpView'
      ? (
        <React.Fragment>
          <BootLogo />
          <div className='heading'>
            <p className='heading-subtitle'>Just a moment...</p>
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div className='heading'>
            <p className='heading-title'>{details.title}</p>
            <p className='heading-subtitle'>{details.subtitle}</p>
          </div>

          <div className='view-form'>
            <div className='view-form-pfp'>
              <AiOutlineUser />
            </div>
            <div className='view-form-input'>
              <input
                type={details.type}
                placeholder={details.placeholder}
                value={value}
                maxLength={40}
                onChange={(e) => onFieldUpdate(e.target.value)} />
            </div>
          </div>

          <div className='view-footer'>
            <div className='view-footer-signin'>
              {
                signInOpt
                && <Link to='/switchuser?cover=false'>Or, even better, sign-in</Link>
              }
            </div>
            <div className='view-footer-next'>
              <button
                type='view-footer-button'
                disabled={!value || validity(value)}
                onClick={() => updateOpacity(0) || setTimeout(onSubmit, 250)}>Next</button>
            </div>
          </div>
        </React.Fragment>
      )

    }
    </div>

  );
}

export default ChildView;