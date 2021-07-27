import React, { useEffect, useState } from 'react';
import { VscEye, VscArrowRight } from 'react-icons/vsc';
import { AiOutlineUser } from 'react-icons/ai';
import { Link } from 'react-router-dom';

import { Strings } from '../../data.store';
import BootLogo from '../../components/BootLogo/BootLogo';
import Button from '../../components/Button/Button';
import './LoginView.scss';


const LoginError = ({ error, onCancel }) => (
  <div className='LoginError'>
    <span>{error.text}</span>
    <Button
      onClick={onCancel}
      classNames={['login-auth-error-button']}
      text={'OK'} />
  </div>
);


const LoginSuccess = () => (
  <div className='LoginSuccess'>
    <BootLogo size='small' />
    <span>{Strings.SUCCESSFUL_LOGIN_WELCOME_TEXT}</span>
  </div>
);


const LoginForm = ({ onSubmit }) => {

  const [isHiddenPassword, togglePasswordMode] = useState(true);
  const [password, updatePassword] = useState('');

  return (
    <div className='login-fields'>

      {
        false
          && <div className='login-fields-username'>
            <input type='text' placeholder='User name' required />
        </div>
      }

      <div className='login-fields-password'>
        <input required
          value={password}
          onChange={e => updatePassword(e.target.value)}
          onKeyUp={e => e.key === 'Enter' && onSubmit(password)}
          type={isHiddenPassword ? 'password' : 'text'}
          placeholder='Password' />
        
        <div
          className='login-fields-password-eye'
          onMouseDown={() => togglePasswordMode(false)}
          onMouseUp={() => togglePasswordMode(true)}>
          <VscEye />
        </div>

        <div className='login-fields-password-arrow'
          onClick={() => onSubmit(password)}>
          <VscArrowRight />
        </div>
      </div>

    </div>
  )
};


const LoginView = ({ users, background, onLogin, authError, authSuccess }) => {

  const [selectedUser, changeSelectedUser] = useState(0);
  const styles = {backgroundImage: 'url(' + process.env.PUBLIC_URL + '"/images/' + background + '")'};
  const [showError, toggleShowError] = useState(authError);
  useEffect(() => toggleShowError(authError), [authError]);

  return (
    <React.Fragment>
      <div className='LoginScreen' style={styles}></div>
      <div className="PseudoLoginScreen">

        <div className='login-form'>
          <div className='login-pfp'>
            <AiOutlineUser />
          </div>
          <div className='login-username'>
            {users[selectedUser].name}
          </div>
          {
            showError
            ? <LoginError error={authError} onCancel={() => toggleShowError(false)} />
            : authSuccess
              ? <LoginSuccess />
              : <LoginForm onSubmit={(password) => onLogin(selectedUser, password)} />
          }
          {
            !authSuccess
              && (
                <Link to='/newaccount' className='new-account-opt'>
                  {Strings.SIGNUP_LINK_LOGIN_VIEW}
                </Link>
              )
          }
        </div>

        {
          users.length > 1
            && (
              <div className='login-users-list'>
              {
                users.map((user, ind) => (
                  <li key={ind}
                    current={selectedUser === ind ? 1 : 0}
                    className='login-users-list-item'
                    onClick={() => changeSelectedUser(ind)}>
                    <div className='login-users-list-item-pfp'>
                      <AiOutlineUser />
                    </div>
                    <p>{user.name}</p>
                  </li>
                ))
              }
              </div>
            )
        }
      </div>
    </React.Fragment>
  );
};

export default LoginView;