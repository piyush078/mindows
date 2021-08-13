import './MenuBar.scss';

const MenuBar = ({ items }) => {
  const MenubarSubmenu = ({ submenu }) =>
    submenu.map((subitem, j) => (
      <div
        key={j}
        className="Program-menubar-item-submenu-item"
        onClick={subitem.action && subitem.action}
      >
        <span>{subitem.title}</span>
      </div>
    ));

  const MenubarItem = ({ item }) => (
    <div
      className="Program-menubar-item"
      onClick={item.action && item.action}
      role="button"
      tabIndex={0}
    >
      {item.title}
      {item.submenu && (
        <div
          className="Program-menubar-item-submenu"
          onClick={(e) => e.currentTarget.parentNode.blur()}
        >
          <MenubarSubmenu submenu={item.submenu} />
        </div>
      )}
    </div>
  );

  return (
    <div className="Program-menubar">
      {items.map((item, i) => (
        <MenubarItem key={i} item={item} />
      ))}
    </div>
  );
};

export default MenuBar;
