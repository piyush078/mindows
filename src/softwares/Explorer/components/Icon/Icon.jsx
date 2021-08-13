import { FiHardDrive } from 'react-icons/fi';
import { FcDocument } from 'react-icons/fc';

const Icon = ({ isDir }) =>
  isDir ? (
    <img alt="Folder" src={`${process.env.PUBLIC_URL}/icons/MiFolder.svg`} />
  ) : (
    <FcDocument fill="white" />
  );

export default Icon;
