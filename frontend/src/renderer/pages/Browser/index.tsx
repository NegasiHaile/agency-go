import { useEffect } from 'react';
import Dashboard from '../../components/Dashboard';
import styles from './styles.modules.css';
import { useTheme } from '@mui/material';
import EnhancedTable from './Table';

function getDivBounds(divId: string) {
  const div = document.getElementById(divId);
  console.log(div);
  if (!div) {
    console.error(`Element with id "${divId}" not found.`);
    return null;
  }

  const rect = div.getBoundingClientRect();

  const x = Math.round(rect.left + window.scrollX);
  const y = Math.round(rect.top + window.scrollY);
  const width = Math.round(rect.width);
  const height = Math.round(rect.height);

  return { x, y, width, height };
}

function Browser() {
  useEffect(() => {
    window.electron.ipcRenderer.sendMessage('launch-anty-browser');
  }, []);

  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === 'dark';

  // Determine the class based on the theme
  const mode = isDarkTheme ? styles.darkTheme : styles.lightTheme;
  return (
    <Dashboard>
      <section className={`${styles.wrapper}  ${mode}`}>
        <EnhancedTable />
      </section>
    </Dashboard>
  );
}

/* 

   {/* <Dashboard>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div className="container">
      <div className="tabs">
        <>
          {tabIDs.map(id => {
            // eslint-disable-next-line no-shadow
            const { title, isLoading, favicon } = tabs[id] || {};
            return (
              <div
                key={id}
                className={cx('tab', { active: id === activeID })}
                onClick={() => switchTab(id)}
              >
                {isLoading ? <IconLoading /> : !!favicon && <img src={favicon} width="16" alt="" />}
                <div className="title">
                  <div className="title-content">{title}</div>
                </div>
                <div className="close" onClick={e => close(e, id)}>
                  <IconClose />
                </div>
              </div>
            );
          })}
          <span type="plus" style={{ marginLeft: 10 }} onClick={newTab}>
            <IconPlus />
          </span>
        </>
      </div>
      <div className="bars">
        <div className="bar address-bar">
          <div className="actions">
            <div
              className={cx('action', { disabled: !canGoBack })}
              onClick={canGoBack ? action.sendGoBack : undefined}
            >
              <IconLeft />
            </div>
            <div
              className={cx('action', { disabled: !canGoForward })}
              onClick={canGoForward ? action.sendGoForward : undefined}
            >
              <IconRight />
            </div>
            <div className={cx('action')} onClick={isLoading ? action.sendStop : action.sendReload}>
              {isLoading ? <IconClose /> : <IconReload />}
            </div>
          </div>
          <input
            className="address"
            value={url || 'https://www.google.com'}
            onChange={onUrlChange}
            onKeyDown={onPressEnter}
          />
        </div>
      </div>
    
      <div id='qw' style={{
      background:"none",
      width: "100%",
      height: "73vh"
    }}>

    </div>
    </div>
    </Dashboard>

*/

export default Browser;
