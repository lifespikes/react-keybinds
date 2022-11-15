import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { KeyShortProvider, ShortcutType } from '../.';

const GLOBAL_COMMANDS: ShortcutType[] = [
  {
    keys: {
      Mac: ['Meta', 'Shift', 'P'],
      Windows: ['Control', 'Shift', 'P'],
    },
    label: 'Test command',
    callback: () => {
      console.log('Hello world');
    },
  },
];

const App = () => {
  return (
    <div>
      <KeyShortProvider shortcuts={GLOBAL_COMMANDS}>
        <div>test uwu</div>
      </KeyShortProvider>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
