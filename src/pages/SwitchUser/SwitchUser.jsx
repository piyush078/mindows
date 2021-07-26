import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import LockCover from '../../components/LockCover/LockCover';
import { selectBootBackgrounds } from '../../redux/boot/boot.selectors';
import { getBootBackgrounds } from '../../redux/boot/boot.actions';
import LoginView from './LoginView';
import './SwitchUser.scss';


const SwitchUser = ({ users, ...props }) => {

  const backgrounds = useSelector(selectBootBackgrounds);
  const [hasDoneLoading, onDoneLoading] = useState(false);
  const dispatch = useDispatch();
  const params = useParams();
  useEffect(() => dispatch(getBootBackgrounds()), [dispatch]);

  return (
    <React.Fragment>
      { hasDoneLoading && <LoginView users={users} background={backgrounds.login} /> }
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