---
title: 'useMemo 和 useCallback'
date: '2023-01-05'
---

如果你也搞不懂 useMemo 和 useCallback，那我们就是好朋友。很多 react 开发者都会对这两个 hooks 感到困惑。

这篇文章的目标就是扫清你所有的疑虑。我们将会学到它们是什么，以及为什么它们很有用，发挥它们的最大作用。

开始吧！

### 基本概念

让我们从 useMemo 开始吧。

useMemo 的基本作用是让我们能够在两次渲染之间“记住”一个计算值。

这个定义需要进一步展开。事实上，它需要我们有一个关于 React 如何工作的心智模型！所以，让我们先来解决这个问题。

React 主要做的事就是让我们的 UI 界面与应用中的状态保持同步。它完成这件事所使用的方法就是重新渲染（re-render）。

每次重新渲染就相当于基于当前状态生成的一张快照。我们可以想象连拍的照片，每张照片显示了在给定的状态变量下 UI 的样子。

事实上，这些快照就是一连串的 JS 对象，也就是 virtual DOM 的概念。

我们不会直接告诉 React 哪些 DOM 需要改变。我们告诉 React，基于当前的 state，UI 应该是怎样的。通过重新渲染，React 创造一个新快照，通过比较不同的快照，它就能够找出哪些需要变化，有点像“找不同”的游戏。

React 内部有很多优化，因此一般情况下，重新渲染耗费不了多少资源。但是在某些情况下，生成快照需要较长的时间，这可能导致性能问题，比如用户操作后，UI 没有及时更新。

而 useMemo 和 useCallback 就是两个帮助优化重新渲染的工具。它们通过两种方式：

1. 减少在某次渲染中需要完成的工作量。
2. 减少组件需要重新渲染的次数。

让我们逐一讨论这些方法。

### 使用场景 1:大量计算

假设我们需要开发一个工具帮用户找到 1 ～ n 之间的所有质数，n 由用户提供，保存在 seletedNum 中。实现代码如下：

```js
import React from 'react';

function App() {
  // We hold the user's selected number in state.
  const [selectedNum, setSelectedNum] = React.useState(100);

  // We calculate all of the prime numbers between 0 and the
  // user's chosen number, `selectedNum`:
  const allPrimes = [];
  for (let counter = 2; counter < selectedNum; counter++) {
    if (isPrime(counter)) {
      allPrimes.push(counter);
    }
  }

  return (
    <>
      <form>
        <label htmlFor="num">Your number:</label>
        <input
          type="number"
          value={selectedNum}
          onChange={event => {
            // To prevent computers from exploding,
            // we'll max out at 100k
            let num = Math.min(100_000, Number(event.target.value));

            setSelectedNum(num);
          }}
        />
      </form>
      <p>
        There are {allPrimes.length} prime(s) between 1 and {selectedNum}:{' '}
        <span className="prime-list">{allPrimes.join(', ')}</span>
      </p>
    </>
  );
}

// Helper function that calculates whether a given
// number is prime or not.
function isPrime(n) {
  const max = Math.ceil(Math.sqrt(n));

  if (n === 2) {
    return true;
  }

  for (let counter = 2; counter <= max; counter++) {
    if (n % counter === 0) {
      return false;
    }
  }

  return true;
}

export default App;
```

你可以不用逐行去读上面的代码，这段代码的重点如下：

- 我们有一个 state——selectedNum。
- 我们通过一个 for 循环计算 0-slectedNum 之间的指数。
- 我们有一个受控 input，让用户能够改变 seletedNum。
- 我们把计算出来的所有质数展示给用户。

这段代码需要大量的计算。当用户输入一个新的 selectedNum 时，我们确实需要做一些计算。但是如果我们还需要做一些不相关的事情时，再去做一次计算，就可能遭遇性能问题。

比如，假设我们的案例中还包括一个时钟：

```js
import React from 'react';
import format from 'date-fns/format';

function App() {
  const [selectedNum, setSelectedNum] = React.useState(100);

  // `time` is a state variable that changes once per second,
  // so that it's always in sync with the current time.
  const time = useTime();

  // Calculate all of the prime numbers.
  // (Unchanged from the earlier example.)
  const allPrimes = [];
  for (let counter = 2; counter < selectedNum; counter++) {
    if (isPrime(counter)) {
      allPrimes.push(counter);
    }
  }

  return (
    <>
      <p className="clock">{format(time, 'hh:mm:ss a')}</p>
      <form>
        <label htmlFor="num">Your number:</label>
        <input
          type="number"
          value={selectedNum}
          onChange={event => {
            // To prevent computers from exploding,
            // we'll max out at 100k
            let num = Math.min(100_000, Number(event.target.value));

            setSelectedNum(num);
          }}
        />
      </form>
      <p>
        There are {allPrimes.length} prime(s) between 1 and {selectedNum}:{' '}
        <span className="prime-list">{allPrimes.join(', ')}</span>
      </p>
    </>
  );
}

function useTime() {
  const [time, setTime] = React.useState(new Date());

  React.useEffect(() => {
    const intervalId = window.setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  return time;
}

function isPrime(n) {
  const max = Math.ceil(Math.sqrt(n));

  if (n === 2) {
    return true;
  }

  for (let counter = 2; counter <= max; counter++) {
    if (n % counter === 0) {
      return false;
    }
  }

  return true;
}

export default App;
```

我们的应用现在有两个状态，selectNum 和 time。每秒钟，time 都会更新，UI 的右上角就会重新渲染出当前的时间。

问题是：无论是哪个状态的变化，开销较大的计算质数的函数都会重新运行。而 time 每秒钟都会变化，这意味着，即使 selectedNum 不变，质数列表都会重新生成。

![alt clock-prime](/images/usememo-usecallback/clock-prime.webp)

JavaScript 只有一条主线程，也就是说每秒钟，计算质数的代码都会反复执行。也就是说，当用户想要做别的事情时，应用可能就会卡顿，特别是在配置较低的设备上。

那我们能否跳过这些计算呢？如果我们已经有了给定数字的质数列表，为什么我们不重用它呢？

这正是 useMemo 能做到的。下面是正确的使用姿势：

```js
const allPrimes = React.useMemo(() => {
  const result = [];
  for (let counter = 2; counter < selectedNum; counter++) {
    if (isPrime(counter)) {
      result.push(counter);
    }
  }
  return result;
}, [selectedNum]);
```

useMemo 接受两个参数：

1. 要执行的大量工作，用函数包裹
2. 一个依赖的列表

挂载时，也就是组件被第一次渲染时，React 会调用这个函数，计算所有的质数。这个函数的返回结果会被赋值给 allPrimes 变量。

后续的每次渲染中，React 都必须做一个选择，它可以：

1. 再次调用这个函数，重新计算
2. 重用上次计算的结果

为了做出这个选择，React 会查看依赖的列表。自上次渲染，依赖项是否有变化呢？如果有，React 会重新运行函数，计算出一个新的值。否则，它会跳过，重用之前的计算结果。

useMemo 有点像一个小型缓存，依赖项就是缓存的失效策略。

在这个例子中，我们希望“只有在 selectedNum 变化的时候才重新计算质数列表”。当组件因为其他原因（比如 time 状态变化）重新渲染时，useMemo 略过函数并且直接给出缓存的值。

这种技术被称为 memoization，这也是为什么这个 hook 被称为 useMemo。

完整代码如下：

```js
import React from 'react';
import format from 'date-fns/format';

function App() {
  const [selectedNum, setSelectedNum] = React.useState(100);
  const time = useTime();

  const allPrimes = React.useMemo(() => {
    const result = [];

    for (let counter = 2; counter < selectedNum; counter++) {
      if (isPrime(counter)) {
        result.push(counter);
      }
    }

    return result;
  }, [selectedNum]);

  return (
    <>
      <p className="clock">{format(time, 'hh:mm:ss a')}</p>
      <form>
        <label htmlFor="num">Your number:</label>
        <input
          type="number"
          value={selectedNum}
          onChange={event => {
            // To prevent computers from exploding,
            // we'll max out at 100k
            let num = Math.min(100_000, Number(event.target.value));

            setSelectedNum(num);
          }}
        />
      </form>
      <p>
        There are {allPrimes.length} prime(s) between 1 and {selectedNum}:{' '}
        <span className="prime-list">{allPrimes.join(', ')}</span>
      </p>
    </>
  );
}

function useTime() {
  const [time, setTime] = React.useState(new Date());

  React.useEffect(() => {
    const intervalId = window.setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  return time;
}

function isPrime(n) {
  const max = Math.ceil(Math.sqrt(n));

  if (n === 2) {
    return true;
  }

  for (let counter = 2; counter <= max; counter++) {
    if (n % counter === 0) {
      return false;
    }
  }

  return true;
}

export default App;
```

#### 其他可选方案

看来，useMemo 确实能帮我们避免不必要的计算。但在这个场景中，这是最佳方案吗？

一般，我们可以通过重构代码来避免使用 useMemo。只需要把计算质数和时钟的功能拆分成两个组件就可以避免。

我们经常能看到“状态提升”，但是有时，最好的方法是“状态下沉”！每个组件最好只有单一职责。

然而，这并不是总是奏效。在一个真实的大型 app 中，可能有许多状态需要被放在很上层的组件中。

在这种情况下，我还有一招。

让我来看下面这个例子，假设我们需要 time 变量在上层组件中。

```js
// App.js
import React from 'react';
import { getHours } from 'date-fns';

import Clock from './Clock';
import PrimeCalculator from './PrimeCalculator';

// Transform our PrimeCalculator into a pure component:
const PurePrimeCalculator = React.memo(PrimeCalculator);

function App() {
  const time = useTime();

  // Come up with a suitable background color,
  // based on the time of day:
  const backgroundColor = getBackgroundColorFromTime(time);

  return (
    <div style={{ backgroundColor }}>
      <Clock time={time} />
      <PurePrimeCalculator />
    </div>
  );
}

const getBackgroundColorFromTime = (time) => {
  const hours = getHours(time);

  if (hours < 12) {
    // A light yellow for mornings
    return 'hsl(50deg 100% 90%)';
  } else if (hours < 18) {
    // Dull blue in the afternoon
    return 'hsl(220deg 60% 92%)'
  } else {
    // Deeper blue at night
    return 'hsl(220deg 100% 80%)';
  }
}

function useTime() {
  const [time, setTime] = React.useState(new Date());

  React.useEffect(() => {
    const intervalId = window.setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    }
  }, []);

  return time;
}

export default App;

//PrimeCalculator.js
import React from 'react';

function PrimeCalculator() {
  const [selectedNum, setSelectedNum] = React.useState(100);

  const allPrimes = [];
  for (let counter = 2; counter < selectedNum; counter++) {
    if (isPrime(counter)) {
      allPrimes.push(counter);
    }
  }

  return (
    <>
      <form>
        <label htmlFor="num">Your number:</label>
        <input
          type="number"
          value={selectedNum}
          onChange={(event) => {
            // To prevent computers from exploding,
            // we'll max out at 100k
            let num = Math.min(100_000, Number(event.target.value));

            setSelectedNum(num);
          }}
        />
      </form>
      <p>
        There are {allPrimes.length} prime(s) between 1 and {selectedNum}:
        {' '}
        <span className="prime-list">
          {allPrimes.join(', ')}
        </span>
      </p>
    </>
  );
}

function isPrime(n){
  const max = Math.ceil(Math.sqrt(n));

  if (n === 2) {
    return true;
  }

  for (let counter = 2; counter <= max; counter++) {
    if (n % counter === 0) {
      return false;
    }
  }

  return true;
}

export default PrimeCalculator;

//Clock.js
import React from 'react';
import format from 'date-fns/format';

function Clock({ time }) {
  return (
    <p className="clock">
      {format(time, 'hh:mm:ss a')}
    </p>
  );
}

export default Clock;
```

我们可以把 PrimeCalculator 变成一个纯组件。就像一个力场，用 React.memo 包裹的组件不受无关更新的影响。PurePrimeCalculator 只会在接受到新数据或者其内部状态发生变化时才会重新渲染。

这里有一个视角转化：之前我们缓存一个计算的结果。在这个例子中，我们缓存了整个组件。

无论是哪种方式，开销较大的计算只会在 selectedNum 变化的时候执行一次。但是我们优化了父组件，而不是特定的某行代码。

我并不是说一种方式一定比另一种好，每种工具都有自己的作用。但在这个具体的场景中，我更倾向缓存整个组件。

如果你在工作场景中尝试使用纯组件，你会奇怪地发现，有时似乎什么东西都没有变，但纯组件经常重新渲染了。这就要介绍 useMemo 的第二种使用场景了。

> 事实上，还有一种方案不需要使用任何 api，[点击查看](https://overreacted.io/before-you-memo/)。

### 使用场景 2:保存引用

在下面的例子中，我创建了一个 Boxes 组件。它展示了一些五颜六色的盒子，用作装饰。我还有一个无关的状态，用户的名字。

```js
//App.js
import React from 'react';

import Boxes from './Boxes';

function App() {
  const [name, setName] = React.useState('');
  const [boxWidth, setBoxWidth] = React.useState(1);

  const id = React.useId();

  // Try changing some of these values!
  const boxes = [
    { flex: boxWidth, background: 'hsl(345deg 100% 50%)' },
    { flex: 3, background: 'hsl(260deg 100% 40%)' },
    { flex: 1, background: 'hsl(50deg 100% 60%)' },
  ];

  return (
    <>
      <Boxes boxes={boxes} />

      <section>
        <label htmlFor={`${id}-name`}>
          Name:
        </label>
        <input
          id={`${id}-name`}
          type="text"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <label htmlFor={`${id}-box-width`}>
          First box width:
        </label>
        <input
          id={`${id}-box-width`}
          type="range"
          min={1}
          max={5}
          step={0.01}
          value={boxWidth}
          onChange={(event) => {
            setBoxWidth(Number(event.target.value));
          }}
        />
      </section>
    </>
  );
}

export default App;

//Boxes.js
import React from 'react';

function Boxes({ boxes }) {
  return (
    <div className="boxes-wrapper">
      {boxes.map((boxStyles, index) => (
        <div
          key={index}
          className="box"
          style={boxStyles}
        />
      ))}
    </div>
  );
}

export default React.memo(Boxes);
```

由于被 React.memo 包裹，Boxes 是一个纯组件。这意味着只有它的 props 变化了，它才会重新渲染。

然而，你会发现，当 name 变化时，Boxes 也会重新渲染！

什么鬼？React.memo 失效了？

Boxes 组件只有一个 prop，boxes，显然每次 App 渲染时，它都会被赋同样的值。

问题其实是：每次 React 重新渲染时，我们生成了一个全新的数组。它们在值的形式上相等，但是在并不是相同的引用。

让我们回到基本的 js 中，考虑以下代码:

```js
function getNumbers() {
  return [1, 2, 3];
}
const firstResult = getNumbers();
const secondResult = getNumbers();
console.log(firstResult === secondResult); //false
```

我们创建了两个不同的数组。它们可能包含相同的内容，但它们不是同一个数组，就像两个同卵双胞胎不是同一个人。

> 你可以在[这里](https://daveceddia.com/javascript-references/)找到详细的说明。

回到 React，Boxes 组件也是一个 JS 函数。当我们渲染时，我们也是在调用一个函数。

```js
// Every time we render this component, we call this function...
function App() {
  // ...and wind up creating a brand new array...
  const boxes = [
    { flex: boxWidth, background: 'hsl(345deg 100% 50%)' },
    { flex: 3, background: 'hsl(260deg 100% 40%)' },
    { flex: 1, background: 'hsl(50deg 100% 60%)' },
  ];
  // ...which is then passed as a prop to this component!
  return <Boxes boxes={boxes} />;
}
```

当 name 变化时，App 组件会重新渲染，其所有代码会重新运行。我们构建了一个全新的 boxes 数组，并将它传递给了 Boxes 组件。因此 Boxes 组件重新渲染了。

使用 React.memo 也可以解决这个问题：

```js
const boxes = React.useMemo(() => {
  return [
    { flex: boxWidth, background: 'hsl(345deg 100% 50%)' },
    { flex: 3, background: 'hsl(260deg 100% 40%)' },
    { flex: 1, background: 'hsl(50deg 100% 60%)' },
  ];
}, [boxWidth]);
```

不像我们之前看到的那个找质数的例子，这里我们不关心计算的开销。我们的目标时保存特定数组的引用。

我们把 boxWidth 作为一个依赖项，因为我们希望用户在调整了红色盒子的宽度时，Boxes 可以重新渲染。

### useCallback 钩子

好吧，这才刚讲完 useMemo，那 useCallback 呢？

简单来讲，它们其实是同样的，缓存的从数组、对象变成了函数。

函数也是根据引用地址来比较，而不是通过值:

```js
const functionOne = function () {
  return 5;
};
const functionTwo = function () {
  return 5;
};
console.log(functionOne === functionTwo); // false
```

这意味着如果我们在一个组件中定义一个函数，它会在每次渲染中重新生成，每一次都会生成相同但不完全相同的函数。

来看一个例子:

```js
//App.js
import React from 'react';

import MegaBoost from './MegaBoost';

function App() {
  const [count, setCount] = React.useState(0);

  function handleMegaBoost() {
    setCount((currentValue) => currentValue + 1234);
  }

  return (
    <>
      Count: {count}
      <button
        onClick={() => {
          setCount(count + 1)
        }}
      >
        Click me!
      </button>
      <MegaBoost handleClick={handleMegaBoost} />
    </>
  );
}

export default App;

//MegaBoost.js
import React from 'react';

function MegaBoost({ handleClick }) {
  console.log('Render MegaBoost');

  return (
    <button
      className="mega-boost-button"
      onClick={handleClick}
    >
      MEGA BOOST!
    </button>
  );
}

export default React.memo(MegaBoost);
```

上面的代码展示了一个普通的计数器应用，但是有一个“Mega Boost”按键。MegaBoost 组件是一个纯组件。但是 Count 变化的时候它也会重新渲染。

其中的问题和 Boxes 案例一样，每次 App 渲染时，都会生成相同但不完全相同的 handleMegaBoost 函数。

因此我们可以用 useMemo 或者 useCallback 将其缓存。因此，完全可以把 useCallback 看成是一个语法糖。

```js
const handleMegaBoost = React.useMemo(() => {
  return function () {
    setCount(currentValue => currentValue + 1234);
  };
}, []);
//等同于
const handleMegaBoost = React.useCallback(() => {
  setCount(currentValue => currentValue + 1234);
}, []);
```

### 何时使用这两个 hook

好了，所以我们已经看到了 useMemo 和 useCallback 如何允许我们在多个渲染中线程建立引用，以重用复杂的计算或避免破坏纯组件。问题是：我们应该什么时候使用他们呢？

从我个人来看，每个对象、数组、函数都用这两个钩子包一层是一种浪费。在大多数情况下，这两个钩子的增益微乎其微。React 本身的优化已经很好了，每次重新渲染并不是我们想象得那么慢。

最佳实践是视问题而定。如果你观察到你的应用有点慢，你可以用 React Profile 来捕捉到比较慢的渲染。在一些情况下，你可以重构你的应用来提升性能。在另外一些情况下，useMemo 和 useCallback 才可以加速。

也就是说，在一些场景中，我会预先使用这些钩子。

> > > React 团队正在考虑自动缓存，黄玄大神的 Forget 项目，[React without memo](https://www.youtube.com/watch?v=lGEMwh32soc)

#### 在自定义钩子中使用

我最喜欢的一个自定义钩子是 useToggle ，他适用于布尔型的 state。

```js
function App() {
  const [isDarkMode, toggleDarkMode] = useToggle(false);
  return <button onClick={toggleDarkMode}>Toggle color theme</button>;
}
```

这个钩子的具体定义是:

```js
function useToggle(initialValue) {
  const [value, setValue] = React.useState(initialValue);
  const toggle = React.useCallback(() => {
    setValue(v => !v);
  }, []);
  return [value, toggle];
}
```

注意，这个 toggle 函数使用了 useCallback 缓存。

当我自定义像这样的可重用钩子时，我会尽量让他们尽可能高效率，因为我不知道未来他们会被用在什么地方。比如如果他要被调用几十次，这样做将提升整个应用的性能。

#### 在 context provider 中使用

当我们通过 context 在应用中共享数据时，把一个对象装进 value 传递是很常见的。

那么缓存这个 value 是个好主意。

```js
const AuthContext = React.createContext({});
function AuthProvider({ user, status, forgotPwLink, children }) {
  const memoizedValue = React.useMemo(() => {
    return {
      user,
      status,
      forgotPwLink,
    };
  }, [user, status, forgotPwLink]);
  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
```

为什么这样做有好处？有可能很多个纯组件在消费这个 context 。如果没有 useMemo ，AuthProvider 的父组件重新渲染时，所有消费这个 context 的纯组件都需要重新渲染。

### React 的快乐之处

我知道这个教程涵盖了很多难点。

这两个钩子很麻烦，React 让他们变成了一种很复杂的工具。

但是，如果你克服了刚开始的困难，React 使用起来就会很快乐。

作者使用了很多种 JS 框架，没有哪种像 React 一样高效。

后面就是作者的课程广告......
