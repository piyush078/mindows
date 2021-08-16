import React, { useState } from 'react';
import { VscMenu, VscFolder, VscSettingsGear } from 'react-icons/vsc';
import { AiOutlineUser } from 'react-icons/ai';
import { RiShutDownLine } from 'react-icons/ri';

import Promotions from './Promotions';
import InstalledApps from '../../config/apps';
import { getName } from '../../redux/auth/auth.user';
import './StartMenu.scss';

const StartMenuDrawer = React.memo(
  ({ user, onLogout, onLaunchApp }) => {
    const [drawer, toggleDrawer] = useState(false);

    return (
      <div className="StartMenu-account" active={drawer.toString()}>
        <div className="StartMenu-account-list StartMenu-account-nav">
          <div className="StartMenu-account-list-item">
            <div className="StartMenu-account-list-item-icon" onClick={() => toggleDrawer(!drawer)}>
              <VscMenu />
            </div>
            <div className="StartMenu-account-list-item-label">START</div>
          </div>
        </div>
        <div className="StartMenu-account-list">
          <div className="StartMenu-account-list-item">
            <div className="StartMenu-account-list-item-icon">
              <AiOutlineUser />
            </div>
            <div className="StartMenu-account-list-item-label">{getName(user)}</div>
          </div>
          <div
            className="StartMenu-account-list-item"
            onClick={() => onLaunchApp(InstalledApps.fsexplorer)}
          >
            <div className="StartMenu-account-list-item-icon">
              <VscFolder />
            </div>
            <div className="StartMenu-account-list-item-label">File Explorer</div>
          </div>
          <div
            className="StartMenu-account-list-item"
            onClick={() => onLaunchApp(InstalledApps.settings)}
          >
            <div className="StartMenu-account-list-item-icon">
              <VscSettingsGear />
            </div>
            <div className="StartMenu-account-list-item-label">Settings</div>
          </div>
          <div className="StartMenu-account-list-item" onClick={onLogout}>
            <div className="StartMenu-account-list-item-icon">
              <RiShutDownLine />
            </div>
            <div className="StartMenu-account-list-item-label">Log Off</div>
          </div>
        </div>
      </div>
    );
  },
  () => true
);

const StartMenuApps = React.memo(
  ({ onClick }) => {
    const Apps = ({ apps, category }) =>
      apps.map((app, i) => (
        <div
          key={category + i.toString()}
          onClick={() => onClick(app)}
          className="StartMenu-apps-category-list-item"
        >
          <div className="StartMenu-apps-category-list-item-icon">{app.icon()}</div>
          <div className="StartMenu-apps-category-list-item-label">{app.name}</div>
        </div>
      ));

    const Category = ({ category }) => (
      <div className="StartMenu-apps-category">
        <div className="StartMenu-apps-category-header">{category.category}</div>
        <div className="StartMenu-apps-category-list">
          <Apps apps={category.apps} category={category.category} />
        </div>
      </div>
    );

    const smApps = [];
    const apps = Object.keys(InstalledApps).map((id) => InstalledApps[id]);
    [...new Set(apps.map((app) => app.name[0].toLowerCase()))].sort().forEach((c) => {
      smApps.push({
        category: c.toUpperCase(),
        apps: apps.filter((app) => app.name[0].toLowerCase() === c),
      });
    });

    return (
      <div className="StartMenu-apps">
        {smApps.map((cat) => (
          <Category category={cat} key={cat.category} />
        ))}
      </div>
    );
  },
  () => true
);

const StartMenuPromotions = React.memo(
  () => {
    let promotions = [...Promotions];
    for (let i = 0; i < promotions.length - 1; i += 1) {
      const j = Math.floor(Math.random * promotions.length) % promotions.length;
      [promotions[i], promotions[j]] = [promotions[j], promotions[i]];
    }
    promotions = promotions.filter((pr) => pr);
    const colors = ['#3e3c91', 'green', 'orange', 'red'];

    const Blocks = ({ list }) =>
      list.map((item, i) => (
        <a href={item.action ? item.action : '#'} key={i} tabIndex={-1}>
          <div
            className="StartMenu-promotions-list-item"
            style={{ background: colors[Math.floor(Math.random() * 4)] }}
            wsize={Math.floor(Math.random() * 6) === 3 ? 'large' : 'small'}
          >
            <div className="StartMenu-promotions-list-item-icon">{item.icon()}</div>
            <div className="StartMenu-promotions-list-item-label">{item.text}</div>
          </div>
        </a>
      ));

    return (
      <div className="StartMenu-promotions">
        <div className="StartMenu-promotions-left">
          <div className="StartMenu-promotions-header">Life at a glance</div>
          <div className="StartMenu-promotions-list">
            <Blocks list={promotions.slice(0, 7)} />
          </div>
        </div>
        <div className="StartMenu-promotions-right">
          <div className="StartMenu-promotions-header">Explore</div>
          <div className="StartMenu-promotions-list">
            <Blocks list={promotions.slice(7, 13)} />
          </div>
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => nextProps.hide
);

const StartMenu = React.memo(
  ({ user, hide, onLogout, onProgramClick }) => (
    <div className="StartMenu" style={{ bottom: hide ? '-512px' : '48px' }}>
      <StartMenuDrawer user={user} onLaunchApp={onProgramClick} onLogout={onLogout} />
      <StartMenuApps onClick={onProgramClick} />
      <StartMenuPromotions hide={hide} />
    </div>
  ),
  (prevProps, nextProps) => prevProps.hide === nextProps.hide
);

export default StartMenu;
