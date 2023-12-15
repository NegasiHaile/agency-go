import { ipcMain } from 'electron';
import fetch from '../utils/fetch';

const CreatorService = () => {
  ipcMain.on('get-creator-request', async (e) => {
    try {
      const response = await fetch(`creators`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        withAuth: true,
      });
      const responseJson = await response.json();
      e.reply('get-creator-response', responseJson);
    } catch (error: any) {
      e.reply('get-creator-error', { error: true, message: error?.message });
    }
  });

  ipcMain.on('create-creator-request', async (e, arg) => {
    try {
      const { name, gender, assignEmployee, internalNotes, isAutoRelink } = arg;
      const payload = {
        creatorName: name,
        gender,
        assignEmployee,
        internalNotes,
        autoRelink: isAutoRelink,
      };
      const response = await fetch(`creators`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        },
        withAuth: true,
      });
      const responseJson = await response.json();
      e.reply('create-creator-response', responseJson);
    } catch (error: any) {
      e.reply('create-creator-error', {
        error: true,
        message: error?.message,
      });
    }
  });

  ipcMain.on('update-creator-request', async (e, arg) => {
    try {
      const { name, gender, assignEmployee, internalNotes, isAutoRelink, id } =
        arg;
      const payload = {
        creatorName: name,
        gender,
        assignEmployee,
        internalNotes,
        autoRelink: isAutoRelink,
      };
      const response = await fetch(`creators/${id}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        },
        withAuth: true,
      });
      const responseJson = await response.json();
      e.reply('update-creator-response', responseJson);
    } catch (error: any) {
      e.reply('update-creator-error', {
        error: true,
        message: error?.message,
      });
    }
  });

  ipcMain.on('delete-creator-request', async (e, arg) => {
    try {
      const { id } = arg;
      const response = await fetch(`creators/${id}`, {
        method: 'DELETE',
        withAuth: true,
      });
      const responseJson = await response.json();
      e.reply('delete-creator-response', responseJson);
    } catch (error: any) {
      e.reply('delete-creator-error', {
        error: true,
        message: error?.message,
      });
    }
  });
};

export default CreatorService;
