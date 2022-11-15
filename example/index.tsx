import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { KeyShortProvider, ShortcutType } from '../.';
import ShowShortcuts from './components/ShowShortcuts';
import RegisterShortcut from './components/RegisterShortcut';

const GLOBAL_COMMANDS: ShortcutType[] = [
  {
    keys: {
      Mac: ['Meta', 'Shift', 'P'],
      Windows: ['Control', 'Shift', 'P'],
    },
    label: 'Test command',
    callback: () => {
      alert('Hello world');
    },
  },
];

const App = () => {
  return (
    <div>
      <KeyShortProvider shortcuts={GLOBAL_COMMANDS}>
        <ShowShortcuts />
        <RegisterShortcut />
      </KeyShortProvider>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
