import React, { useState } from 'react';
import { VscEye, VscArrowRight } from 'react-icons/vsc';
import { AiOutlineUser } from 'react-icons/ai';
import './LoginView.scss';
import { Link, useParams } from 'react-router-dom';


const LoginForm = () => {

  const [isHiddenPassword, togglePasswordMode] = useState(true);

  return (
    <div className='login-fields'>
      {false && <div className='login-fields-username'>
        <input type='text' placeholder='User name' required />
      </div>}
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


const LoginView = ({ users, background }) => {

  const [selectedUser, changeSelectedUser] = useState(0);
  const styles = {
    backgroundImage: 'url(' + process.env.PUBLIC_URL + '"/images/' + background + '")'
  };

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
          <LoginForm />
          <Link to='/newaccount' className='new-account-opt'>
            Create a new user account
          </Link>
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