const Icon = ({ isDir }) =>
  isDir ? (
    <img alt="Folder" src={`${process.env.PUBLIC_URL}/icons/MiFolder.svg`} />
  ) : (
    <img alt="Folder" src={`${process.env.PUBLIC_URL}/icons/MiDocument.svg`} />
  );

export default Icon;
