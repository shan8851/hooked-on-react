# Hooked on React

A collection of React hooks for rapid development and delightful UX.

## Introduction

`hooked-on-react` provides a suite of custom React hooks to solve common problems in modern web development, offering out-of-the-box functionality, performance optimizations, and best practices.

## Installation

```bash
npm install hooked-on-react
# or
yarn add hooked-on-react
```

## Hooks

Many more hooks are in the works! If you have a suggestion for a hook, please feel free to open an issue. I will also be launching a fully deatured documentation and demo site in due course.

- useDebounce
- useClickOutside

## Usage

#### useClickOutside

Detect clicks outside a specified element. This is particularly useful for closing modal windows, dropdowns, or resetting states when the user clicks outside of a component.

```jsx
import { useRef } from 'react';
import { useClickOutside } from 'hooked-on-react';

const MyComponent = () => {
  const ref = useRef();

  useClickOutside(ref, () => {
    // Your custom logic here
    console.log('Clicked outside');
  });

  return <div ref={ref}>My Interactive Area</div>;
};
```
#### useDebounce

Debounce a value or a callback, which delays the execution until after a specified wait time. This hook is ideal for performing tasks like API calls in response to user input.

```jsx
import { useState } from 'react';
import { useDebounce } from 'hooked-on-react';

const SearchInput = () => {
  const [value, setValue] = useState('');
  const debouncedValue = useDebounce(value, 500);

  // Use debouncedValue for API calls or expensive operations
  // ...

  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Search..."
    />
  );
};

```

## Contributing

We welcome contributions to `hooked-on-react`! If you have suggestions or would like to contribute code, please feel free to make a pull request.

## License

hooked-on-react is available under the MIT License
