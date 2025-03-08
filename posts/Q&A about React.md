# React Interview Questions and Answers

## 1. What is React?

**Answer:**
React is an open-source JavaScript library developed by Facebook for building user interfaces, especially for single-page applications where UI updates efficiently without requiring a full-page reload. It allows developers to create reusable UI components and manage state efficiently.

---

## 2. What are React components?

**Answer:**
React components are reusable, self-contained pieces of UI. They can be class-based or functional:

- **Functional Components:** Written as JavaScript functions that return JSX.
- **Class Components:** ES6 classes that extend `React.Component` and use `render()` to return JSX.

## 3. What is JSX?

**Answer**
JSX (JavaScript XML) is a syntax extension for JavaScript that allows writing HTML-like structures in JavaScript code.

## 4. What is the difference between state and props? Can you modify props inside a component?

**Answer:**

**Props (short for properties)**: Read-only attributes passed from parent to child components.
**State**: A component's internal data that can change over time.

No, modify props inside a component will not make react re-render this component.

## 5. Explain the difference between functional components and class components in React. When would you use each?

**Answer:**
**Functional Components**: These are simpler, JavaScript functions that take props as input and return JSX. Initially, they were stateless, but with the introduction of React Hooks in version 16.8, they can now manage state and lifecycle features using hooks like useState and useEffect.
**Class Components**: These are ES6 classes that extend React.Component. They have a render() method that returns JSX and can manage state using this.state and lifecycle methods like componentDidMount().

Today, functional components are preferred because they are more concise, easier to test, and allow for better performance optimizations like automatic React Fiber optimizations.
Class components were commonly used before hooks but are now primarily seen in legacy codebases. However, they might still be useful when dealing with older third-party libraries that rely on class-based lifecycle methods.

## 6. State Management: How does the useState hook work? Can you update the state immediately after calling setState? Why or why not?

**Answer:**
The useState hook in React is used to manage state in functional components. It returns an array with two elements:

- The current state value
- A function to update the state
  In most cases, the state update function does not immediately update the state; instead, it schedules an update. React batches updates and re-renders the component asynchronously. This means that if you try to access the updated state immediately after calling setState, you'll still get the previous value because the state update hasn't been applied yet.
  **Before react 18, if we use setState in some native events, like setTimeout, setInterval, the state update will be synchronous. After react 18, if we build our app with createRoot, every state update will be asynchromous.**

## 7. Lifecycle & Effects: What are React lifecycle methods, and how do they map to hooks like useEffect?

**Answer:**

- componentDidMount() -> useEffect(() => {...}, [])
- componentDidUpdate() -> useEffect(() => {...}, [dependencies])
- componentWillUnmount() -> useEffect(() => { return () => {...}; }, [])

## 8. Virtual DOM: What is the Virtual DOM, and how does React use it to optimize performance?

**Answer:**
The Virtual DOM (VDOM) is a lightweight JavaScript representation of the actual DOM (Document Object Model). Instead of directly updating the real DOM, React first updates this Virtual DOM, compares it with the previous version (diffing), and then efficiently updates only the necessary parts of the real DOM.

## 9. React Performance Optimization: How would you optimize a React application’s performance?

**Answer:**

- Prevent Unnecessary Re-renders
  - Use React.memo()
  - Use useCallback() & useMemo()
  -
- Optimize Component Rendering
  - Lazy Loading & Code Splitting – Load components only when needed using React.lazy() and Suspense.
  - Windowing / Virtualization – For large lists, use react-window or react-virtualized to render only visible items.
- Optimize API Calls & Data Fetching
  - Use pagination or infinite scrolling
  - Use libraries like react-query or SWR for better caching and revalidation.
  - Debounce input handlers – Prevent excessive re-renders when typing.
- Optimize Asset Loading
  - Optimize Asset Loading
  - Minify & bundle assets – Use Webpack or Vite optimizations.
- Enable Performance Monitoring & Analysis
  - Use React DevTools Profiler to identify slow components.
  - Use Lighthouse and Web Vitals to measure real-world performance.

## 10. Context API vs Redux: When would you use React Context API instead of Redux?

- use context api
  - ✅ Simple or Medium-sized Applications – When the state is not too complex and doesn’t require advanced features like middleware or devtools.
  - ✅ Avoiding Prop Drilling – When you need to pass state deeply without manually passing props.
  - ✅ Global State That Changes Infrequently – Ideal for themes, authentication, or user preferences.
  - ✅ Reducing Boilerplate – When you want a lightweight state management solution without extra setup.
- use Redux
  - ✅ Large-Scale Applications – When the state is complex and used across many components.
  - ✅ Frequent and Predictable Updates – When actions need to be tracked, logged, or undone.
  - ✅ Middleware and Side Effects Handling – When using redux-thunk or redux-saga to manage async logic (e.g., API calls).
  - ✅ Time Travel & Debugging – When needing tools like Redux DevTools for state inspection.

## 11. Event Handling: How does event delegation work in React? Why use synthetic events?

- Event delegation is a technique where a single event listener is attached to a parent element instead of multiple listeners on individual child elements. React automatically uses event delegation to improve performance.
- React uses Synthetic Events to provide a consistent event-handling system across all browsers.
  - Cross-Browser Compatibility – Normalizes event behavior across different browsers.
  - Performance Optimization – Uses event pooling, which reuses event objects instead of creating new ones.
  - Consistent API – Ensures all events have the same properties, regardless of browser differences.

## 12. React Router: How does React Router handle navigation without causing a full-page reload?

- React Router leverages the History API (pushState and replaceState) to update the URL without triggering a full-page reload. Instead of sending a request to the server, React Router intercepts navigation events and dynamically updates the UI within the single-page application (SPA).
  - When a user clicks a <Link> component, React Router prevents the default browser behavior (which would normally trigger a full reload).
  - It modifies the URL using window.history.pushState(), allowing users to navigate without refreshing the page.
  - React Router listens for URL changes and dynamically loads the corresponding React component, rather than reloading the entire HTML page.

## 13. Testing: How would you test a React component using Jest and React Testing Library?
