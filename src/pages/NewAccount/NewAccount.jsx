import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { VscArrowLeft } from 'react-icons/vsc';

import { User } from '../../redux/auth/auth.user';
import { selectUsers } from '../../redux/auth/auth.selectors';
import { createNewAccount } from '../../redux/auth/auth.actions';
import ChildView from './ChildView';
import './NewAccount.scss';


const details = [
  {
    title: "Who's going to use this PC?",
    subtitle: 'What name do you want to use?',
    type: 'text',
    placeholder: 'User name',
  },
  {
    title: 'Create a super memorable password',
    subtitle: "Make sure to pick something you'll absolutely remember",
    type: 'password',
    placeholder: 'Password',
  }
];


const NewAccount = () => {

  const users = useSelector(selectUsers);
  const dispatch = useDispatch();
  const history = useHistory();

  const [profileName, updateName] = useState('');
  const [profilePassword, updatePassword] = useState('');
  const [currentView, updateCurrentView] = useState(true);

  useEffect(() => {
    if(currentView === -1) {
      dispatch(createNewAccount(User(profileName, profileName, profilePassword)));
      setTimeout(() => history.push('/switchuser?cover=false'), 2000);
    }
  }, [currentView]);

  return (
    <div className='NewAccount'>
      <div className='view-header'>
        <div>
          {!currentView && <VscArrowLeft onClick={() => updateCurrentView(!currentView)} />}
        </div>
        <div className='view-header-title'>Account</div>
        <div></div>
      </div>

      <div className='view-content'>
        {
          currentView === -1
            ? (
              <ChildView
                childClass='AccountSettingUpView' />
            ) : (
              <ChildView
                childClass={currentView ? 'AccountNameView' : 'AccountPasswordView'}
                onFieldUpdate={currentView ? updateName : updatePassword}
                value={currentView ? profileName : profilePassword}
                signInOpt={currentView ? users.length > 0 : false}
                onSubmit={() => (
                  currentView ? updateCurrentView(!currentView) : updateCurrentView(-1)
                )}
                details={details[+!currentView]}
                validity={(val) => (
                  currentView ? users.filter(user => user.username === val).length !== 0 : false
                )} />
            )
        }
      </div>
    </div>
  );

}

export default NewAccount;