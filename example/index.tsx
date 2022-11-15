import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { KeyBindProvider, ShortcutType } from '../.';
import ShowShortcuts from './components/ShowShortcuts';
import RegisterShortcut from './components/RegisterShortcut';

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
      <KeyBindProvider shortcuts={GLOBAL_COMMANDS}>
        <ShowShortcuts />
        <RegisterShortcut />
      </KeyBindProvider>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
