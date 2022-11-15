# react-keybinds

[<img src="https://img.shields.io/npm/v/react-keybinds?style=for-the-badge">](https://www.npmjs.com/package/react-keybinds)
<img src="https://img.shields.io/npm/types/react-keybinds?label=%20&amp;logo=typescript&amp;logoColor=white&amp;style=for-the-badge">
<img src="https://img.shields.io/npm/dt/react-keybinds?style=for-the-badge" >
[<img src="https://img.shields.io/bundlephobia/minzip/react-keybinds?style=for-the-badge">](https://bundlephobia.com/package/react-keybinds)

Simple package to manage keyboard shortcuts

# Install

#### Using npm

```bash
npm i react-keybinds
```

#### Using Yarn

```bash
yarn add react-keybinds
```

#### Using pnpm

```bash
pnpm add react-keybinds
```

# Usage

<sub>You can take a look at the [example](./example) </sub>

### 1. Configuring the KeyBind provider

```tsx
import {KeyBindProvider} from 'react-keybinds';

const App = () => {
    return (
        <KeyBindProvider>
            hello world
        </KeyBindProvider>
    );
};
```

<sub>It is recommended that you place the provider at the beginning of the component tree.
</sub>

### 2. Global shortcuts

You can register commands globally

```tsx
import {KeyBindProvider, ShortcutType} from 'react-keybinds';

const GLOBAL_COMMANDS: ShortcutType[] = [
    {
        keys: {
            Mac: ['Control', 'Shift', 'P'],
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
        <KeyBindProvider shortcuts={GLOBAL_COMMANDS}>
            hello world
        </KeyBindProvider>
    );
};
```

### 3. Register shortcuts

You can register a command in a specific part of your application. This is useful when we want to execute logic from a
handler that exists in a specific component.

```tsx
import {KeyBindProvider, useKeyBind} from 'react-keybinds';

const RegisterShortcutButton = () => {
    const {registerShortcut} = useKeyBind();

    const handleClickRegister = () => {
        registerShortcut({
            keys: {
                Mac: ['Shift', '*', '_'],
            },
            label: 'This is a keyboard shortcut',
            callback: () => {
                alert('Hello world');
            },
        });
    };

    return (
        <div>
            <button onClick={handleClickRegister}>Register shortcut</button>
        </div>
    );
};

const App = () => {
    return (
        <KeyBindProvider>
            <RegisterShortcutButton/>
        </KeyBindProvider>
    );
};
```

### 4. List registered shortcuts

You can list the registered shortcuts using the useKeyBind hook

```tsx
import {KeyBindProvider, useKeyBind} from 'react-keybinds';

const ShowShortcuts = () => {
    const {shortcuts} = useKeyBind();
    const shortcutsList = shortcuts?.map((shortcut, index) => {
        return (
            <div key={index}>
                <span>{shortcut.label}</span>
                <ul>
                    {Object.entries(shortcut.keys).map(([key, values], i) => (
                        <li key={`${key}-${i}`}>
                            {key}: <strong>{values.join(' + ')}</strong>
                        </li>
                    ))}
                </ul>
            </div>
        );
    });
    return (
        <div>
            <h1>Registered Shortcuts</h1>
            {shortcutsList}
        </div>
    );
};
const App = () => {
    return (
        <KeyBindProvider>
            <ShowShortcuts/>
        </KeyBindProvider>
    );
};
```
