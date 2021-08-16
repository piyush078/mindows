import BootLogo from '../BootLogo/BootLogo';
import './Loading.scss';

const Loading = (props) => {
  const { message = 'Loading...', background = '#1f1e49' } = props;
  const style = { background };

  return (
    <div className="Loading" style={style}>
      <BootLogo />
      <div className="heading">
        <p className="heading-subtitle">{message}</p>
      </div>
    </div>
  );
};

export default Loading;
