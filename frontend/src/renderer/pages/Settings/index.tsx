import Dashboard from 'renderer/components/Dashboard';

import PageTopbar from 'renderer/components/PageTopbar';

import AccountSvg from 'renderer/assets/svg/AccountSvg';
import PreferencesSvg from 'renderer/assets/svg/PreferencesSvg';
import BillingSvg from 'renderer/assets/svg/BillingSvg';
// import WalletSvg from 'renderer/assets/svg/WalletSvg';
import RoleSvg from 'renderer/assets/svg/RoleSvg';
// import SalesSvg from 'renderer/assets/svg/SalesSvg';
import AboutSvg from 'renderer/assets/svg/AboutSvg';
import PartnersSvg from 'renderer/assets/svg/PartnersSvg';
import { useState } from 'react';
import NavTabs from 'renderer/components/NavTabs';
import YourAccount from 'renderer/components/Settings/YourAccount';
import Preferences from 'renderer/components/Settings/Preferences';
import Billing from 'renderer/components/Settings/Billing';
import Wallet from 'renderer/components/Settings/Wallet';
import AboutGO from 'renderer/components/Settings/About';
import Partner from 'renderer/components/Settings/Partner';
import Role from 'renderer/components/Settings/Role';
import styles from './styles.module.css';
import localisation from '../../components/localisation.json';
import WhiteLabelSvg from 'renderer/assets/svg/WhiteLabelSvg';
import WhiteLabel from 'renderer/components/Settings/WhiteLabel';
import { useTranslation } from 'react-i18next';

const navList = [
  {
    label: 'Your account',
    icon: <AccountSvg />,
    value: 'yourAccount',
  },
  {
    label: 'Preferences',
    icon: <PreferencesSvg />,
    value: 'preferences',
  },
  {
    label: 'Billing',
    icon: <BillingSvg />,
    value: 'billing',
  },
  // {
  //   label: 'Wallet',
  //   icon: <WalletSvg />,
  //   value: 'wallet',
  // },
  {
    label: 'Role Settings',
    icon: <RoleSvg />,
    value: 'roleSetting',
  },
  // {
  //   label: 'Sales Settings',
  //   icon: <SalesSvg />,
  //   value: 'salesSettings',
  // },
  {
    label: 'White Label',
    icon: <WhiteLabelSvg />,
    value: 'whiteLabel',
  },
  {
    label: 'About AgencyGo',
    icon: <AboutSvg />,
    value: 'about',
  },
  {
    label: 'Partners',
    icon: <PartnersSvg />,
    value: 'partners',
  },
];
export default function Settings() {
  const { t } = useTranslation();
  const [selectedNav, setSelectedNav] = useState('yourAccount');
  const handleOnChange = (value: string) => {
    setSelectedNav(value);
  };

  const renderScreen = (selected: string) => {
    switch (selected) {
      case 'yourAccount':
        return <YourAccount />;
      case 'preferences':
        return <Preferences />;
      case 'billing':
        return <Billing />;
      // case 'wallet':
      //   return <Wallet />;
      case 'about':
        return <AboutGO />;
      case 'partners':
        return <Partner />;
      case 'roleSetting':
        return <Role />;
      case 'whiteLabel':
        return <WhiteLabel />;
      default:
        return <h1>Not found</h1>;
    }
  };

  return (
    <Dashboard>
      <section className={styles.wrapper}>
        <PageTopbar>
          <PageTopbar.HeaderText>
            {t(`${localisation.settings}`)}
          </PageTopbar.HeaderText>
        </PageTopbar>
        <div className={styles.innerWrapper}>
          <aside className={styles.aside}>
            <div className={styles.navListWrap}>
              {navList.map((navItem, index) => {
                return (
                  <NavTabs
                    isActive={navItem.value === selectedNav}
                    key={index}
                    navItem={navItem}
                    handleOnChange={handleOnChange}
                  />
                );
              })}
            </div>
          </aside>
          <div className={styles.rightSideWrapper}>
            {renderScreen(selectedNav)}
          </div>
        </div>
      </section>
    </Dashboard>
  );
}
