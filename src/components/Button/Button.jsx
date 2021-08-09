import './Button.scss';

const Button = ({ styles, classNames, text, ...props }) => (
  <button
    type="button"
    {...props}
    style={styles || {}}
    className={(classNames || []).concat('Button').join(' ')}
  >
    {text}
  </button>
);

export default Button;
