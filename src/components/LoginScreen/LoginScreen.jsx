import { AiOutlineUser, AiOutlineArrowRight } from 'react-icons/ai';
import './LoginScreen.scss';

const LoginScreen = () => {

  const styles = {
    background: 'url(' + (
      process.env.PUBLIC_URL + '"/images/d2luMTBfb2ZmaWNpYWxfd2FsbHBhcGVy.jpg") no-repeat center center fixed'),
    backgroundSize: 'cover'
  };

  return (
    <>
      <div className='LoginScreen' style={styles}></div>
      <div className="PseudoLoginScreen">
        <div className='login-form'>
          <div className='login-pfp'>
            <AiOutlineUser />
          </div>
          <div className='login-username'>Piyush Madhusudan</div>
          <div className='login-fields'>
            <div className='login-fields-username'>
              <input type='text' placeholder='User name' required />
            </div>
            <div className='login-fields-password'>
              <input type='password' placeholder='Password' required />
              <div className='login-fields-password-arrow'>
                <AiOutlineArrowRight />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginScreen;