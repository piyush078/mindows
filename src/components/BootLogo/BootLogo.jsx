import './BootLogo.scss';

/**
 * The following code is taken from codepen created by Fernando de Almeida Faria.
 * https://codepen.io/feebaa/pen/PPrLQP
 */

const BootLogo = (props) => {
  const { size = 'medium' } = { ...props };
  const componentSizes = {
    loader: size === 'medium' ? '48px' : '32px',
    circle: size === 'medium' ? '32px' : '24px',
  };

  const loaderStyle = { height: componentSizes.loader, width: componentSizes.loader };
  const circleStyle = { height: componentSizes.circle, width: componentSizes.circle };

  return (
    <div className="loader" style={loaderStyle}>
      {[...Array(5)].map((_, i) => (
        <div className="circle" key={i} style={circleStyle} />
      ))}
    </div>
  );
};

export default BootLogo;
