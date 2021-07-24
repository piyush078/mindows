import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { VscEye, VscArrowRight } from 'react-icons/vsc';
import { AiOutlineUser } from 'react-icons/ai';

import LockCover from '../../components/LockCover/LockCover';
import { selectBootBackgrounds } from '../../redux/boot/boot.selectors';
import { getBootBackgrounds } from '../../redux/boot/boot.actions';
import './SwitchUser.scss';
import './LoginView.scss';


const LoginForm = () => {

  const [isHiddenPassword, togglePasswordMode] = useState(true);

  return (
    <div className='login-fields'>
      <div className='login-fields-username'>
        <input type='text' placeholder='User name' required />
      </div>
      <div className='login-fields-password'>
        <input required type={isHiddenPassword ? 'password' : 'text'} placeholder='Password' />
        <div
          className='login-fields-password-eye'
          onMouseDown={() => togglePasswordMode(false)}
          onMouseUp={() => togglePasswordMode(true)}>
          <VscEye />
        </div>
        <div className='login-fields-password-arrow'>
          <VscArrowRight />
        </div>
      </div>
    </div>
  )
};


const LoginView = ({ user, background }) => {

  const styles = {
    backgroundImage: 'url(' + process.env.PUBLIC_URL + '"/images/' + background + '")'
  };

  return (
    <React.Fragment>
      <div className='LoginScreen' style={styles}></div>
      <div className="PseudoLoginScreen">
        <div className='login-form'>
          <div className='login-pfp'><AiOutlineUser /></div>
          <div className='login-username'>{user.username || ''}</div>
          <LoginForm />
        </div>
      </div>
    </React.Fragment>
  );
};


const SwitchUser = ({ user }) => {

  const backgrounds = useSelector(selectBootBackgrounds);
  const [hasDoneLoading, onDoneLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => dispatch(getBootBackgrounds()), [dispatch]);

  return (
    <React.Fragment>
      { hasDoneLoading && <LoginView user={user} background={backgrounds.login} /> }
      {
        backgrounds.lock && backgrounds.login
          && 
          <LockCover
            background={backgrounds.lock}
            onDoneLoading={to => setTimeout(() => onDoneLoading(to), 1000)} />
      }
    </React.Fragment>
  );
};

export default SwitchUser;