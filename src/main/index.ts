import { mainLogger } from '@/common/logger/main';
import { createMainWindow } from '@/main-window';
import { app, protocol } from 'electron';

mainLogger(app);

console.log('mainLogger:', { main: '1' });

protocol.registerSchemesAsPrivileged([
  {
    scheme: 'app',
    privileges: {
      secure: true,
      standard: true,
      supportFetchAPI: true,
      allowServiceWorkers: true,
    },
  },
]);

app.whenReady().then(() => {
  createMainWindow();
});
