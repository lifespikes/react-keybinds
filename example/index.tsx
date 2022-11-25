import 'react-app-polyfill/ie11';
import * as React from 'react';

import { KeyBindProvider, ShortcutType } from '../.';
import ShowShortcuts from './components/ShowShortcuts';
import RegisterShortcut from './components/RegisterShortcut';
import { createRoot } from 'react-dom/client';
import RegisterOnMount from './components/RegisterOnMount';

const GLOBAL_COMMANDS: ShortcutType[] = [
  {
    keys: {
      Mac: ['Control', 'Shift', 'P'],
      Windows: ['Control', 'Shift', 'P'],
    },
    label: 'Test command',
    callback: () => {
      // eslint-disable-next-line no-alert
      alert('Hello world');
    },
  },
];

const App = () => {
  return (
    <div>
      <ShowShortcuts />
      <RegisterShortcut />

      <RegisterOnMount />
    </div>
  );
};
const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <KeyBindProvider shortcuts={GLOBAL_COMMANDS}>
    <App />
  </KeyBindProvider>
);
