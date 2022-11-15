# KeyShort

Simple package to manage keyboard shortcuts

# Install

#### Using npm

```bash
npm i keyshort
```

#### Using Yarn

```bash
yarn add keyshort
```

#### Using pnpm

```bash
pnpm add keyshort
```

# Usage

<sub>You can take a look at the [example](./example) </sub>

### 1. Configuring the KeyShort provider

```tsx
import {KeyShortProvider} from 'keyshort';

const App = () => {
    return (
        <KeyShortProvider>
            hello world
        </KeyShortProvider>
    );
};
```

<sub>It is recommended that you place the provider at the beginning of the component tree.
</sub>

### 2. Global shortcuts

You can register commands globally

```tsx
import {KeyShortProvider, ShortcutType} from 'keyshort';

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
        <KeyShortProvider shortcuts={GLOBAL_COMMANDS}>
            hello world
        </KeyShortProvider>
    );
};
```

### 3. Register shortcuts

You can register a command in a specific part of your application. This is useful when we want to execute logic from a
handler that exists in a specific component.

```tsx
import {KeyShortProvider, useKeyShort} from 'keyshort';

const RegisterShortcutButton = () => {
    const {registerShortcut} = useKeyShort();

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
        <KeyShortProvider>
            <RegisterShortcutButton/>
        </KeyShortProvider>
    );
};
```

### 4. List registered shortcuts

You can list the registered shortcuts using the useKeyShort hook

```tsx
import {KeyShortProvider, useKeyShort} from 'keyshort';

const ShowShortcuts = () => {
    const {shortcuts} = useKeyShort();
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
        <KeyShortProvider>
            <ShowShortcuts/>
        </KeyShortProvider>
    );
};
```
