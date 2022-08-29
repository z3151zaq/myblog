---
title: '为什么react重新渲染'
date: '2022-08-29'
---
**本文是[这篇文章](https://www.joshwcomeau.com/react/why-react-re-renders/)的翻译**
### react循环机制
首先，一个基本的事实：React的每次渲染起始于状态改变（state change）。这是一个React组件重新渲染的唯一触发条件。

现在，这可能听起来不太对。毕竟，props和context的改变难道不会引起组件的重新渲染吗？

事情是这样的：当一个组件重新渲染时，它所有的后代也会重新渲染。

让我们开看一个例子：

```js
import React from 'react';

function App() {
  return (
    <>
      <Counter />
      <footer>
        <p>Copyright 2022 Big Count Inc.</p>
      </footer>
    </>
  );
}

function Counter() {
  const [count, setCount] = React.useState(0);
  
  return (
    <main>
      <BigCountNumber count={count} />
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </main>
  );
}

function BigCountNumber({ count }) {
  return (
    <p>
      <span className="prefix">Count:</span>
      {count}
    </p>
  );
}

export default App;
```

在这个例子中，我们有3个组件：App在最顶层，Counter是其子组件，BigCountNumber是其子孙组件。

在React中，每个状态变量都附在一个特定的组件实例上。在这个例子中，我们有一个状态count，它被附在Counter组件上。

当count变化时，Counter会重新渲染，而由于BigCountNumber时Counter的子组件，它也会重新渲染。

这里有一个交互图展示了这一机制。点击Increment按键来触发一次状态改变。
![alt 重新渲染](/images/why-react-rerender/Snipaste_2022-08-29_16-25-44.png)
（绿色动画表示一个组件被重新渲染了。）

好吧，让我们来破除误解#1:状态改变的时候，整个app都会重新渲染。

我知道有些开发者相信，React中的每一次状态改变会导致一次应用级别的渲染，但这不对。（~~中国开发者都不会这么认为...~~）只有有这个状态的组件及其后代组件（如果有的话）会重新渲染。在这个例子中，count状态变量改变时，App组件不会重新渲染。

与其记住这个规则，不如让我们退一步去了解这背后的机制。

React的“主要任务”是让UI能与状态保持同步。这意味着每次重新渲染的关键是找出哪些东西需要变化。

让我们考虑上面的Counter组件。当应用第一次mount时，React渲染所有的组件，生成一个下面的DOM结构：

```HTML
<main>
  <p>
    <span class="prefix">Count:</span>
    0
  </p>
  <button>
    Increment
  </button>
</main>
<footer>
  <p>Copyright 2022 Big Count Inc.</p>
</footer>
```

当用户点击这个按钮时，count变量从0变为1。这如何影响UI呢？这就是我们希望从另一次渲染中学到的！

React重新执行Counter及BigCountNumber组件中的代码，然后生成一个新的DOM结构：

```HTML
<main>
  <p>
    <span class="prefix">Count:</span>
    1
  </p>
  <button>
    Increment
  </button>
</main>
<footer>
  <p>Copyright 2022 Big Count Inc.</p>
</footer>
```

每次渲染就是一个快照，就像是一张照片，显示根据当前的应用状态，UI应该是啥样的。

然后React会玩一个“找不同”游戏找出两次快照之间有什么变化了（diff算法）。在这个例子中，它找到其中有一个文本节点从0变为1，所以它编辑这个文本节点以符合快照。做完这些后，React退居幕后，等待下一次状态改变。

这就是整个React循环机制。

记住这个框架，让我们再来看看这个渲染图。

count状态被附在Counter组件上。因为在React应用中，数据流无法逆流，我们知道状态变化无法影响到App组件。所以我们没必要重新渲染App组件。

但是我们确实需要重新渲染Count的BigCountNumber子组件。因为它确实展示了count状态。如果我们不重新渲染它，我们就不知道我们的文本节点应该从0变为1。我们必须把这个组件包含在我们的DOM结构中。

每次重新渲染的关键是找出会影响UI的状态改变。所以我们需要重新渲染所有可能会受影响的组件，以获得一个准确的快照。

### 不关props的事
好吧，让我们来聊聊误解#2:一个组件会因为其props变化而重新渲染。

让我们来用一个升级后的例子来研究这个问题。

在下面的代码中，我们的Counter应用有一个全新的组件Decoration。

```js
import React from 'react';

function Decoration() {
  return (
    <div className="decoration">
      ⛵️
    </div>
  );
}

function BigCountNumber({ count }) {
  return (
    <p>
      <span className="prefix">Count:</span>
      {count}
    </p>
  );
}

function Counter() {
  const [count, setCount] = React.useState(0);
  
  return (
    <main>
      <BigCountNumber count={count} />
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
      
      {/* 👇 This fella is new 👇 */}
      <Decoration />
    </main>
  );
}

export default Counter;
```

现在，我们的counter组件的角落里有一个小船，由Decoration组件渲染，它不依赖count，所以当counter变化时，它不会被重新渲染，是吗？呃，不完全对。

![alt 重新渲染](/images/why-react-rerender/Snipaste_2022-08-29_16-28-08.png)

当一个组件重新渲染时，它会尝试重新渲染所有的后代组件，无论他们是否通过props的方式传入了状态变量。

现在，这看起来有些反直觉。如果我们没有把count作为一个prop传入Decoration组件，为什么它需要重新渲染呢？

答案是：React很难100%确定，Decoration是否直接或者间接的依赖count变量。

理想中，React组件总是“纯”组件。“纯”组件意味着当有相同的props时，也会渲染出相同的UI。

现实中，许多组件都不是“纯”组件。很容易就能写出一个非“纯”组件：

```js
function CurrentTime() {
  const now = new Date();
  return (
    <p>It is currently {now.toString()}</p>
  );
}
```

由于它依赖当前的时间，每次渲染时，它都会显示一个不同的值。

这个问题的一个比较隐蔽的版本与ref有关。如果我们把ref作为prop传递，React就无法判断上次渲染后他是否发生了变化。所以为了保险起见，它选择重新渲染。

React的首要目标是保持UI与应用状态保持“同步”。因此，React宁愿“错误地”多次渲染。它也不愿意冒风险给用户展示过时的UI。

所以，回到我们的观点：props与重新渲染无关。BigCountNumber组件并不是因为prop变化而重新渲染。

一个组件重新渲染是因为它的一个状态变量已经更新，这次重新渲染将沿着组件树向下传递，以便 React补充新DOM框架的细节，重新生成新的快照。

这是标准的操作步骤，但是有方法可以微调一下。

#### 创建纯组件

你可能对React.memo或者React.PureComponent类组件很熟悉。这两个工具允许我们忽略某些重新渲染的步骤。

它看起来像：

```js

function Decoration() {
  return (
    <div className="decoration">
      ⛵️
    </div>
  );
}
export default React.memo(Decoration);
```

通过用React.memo包裹Decoration组件，我们告诉React“我知道这是一个纯组件，你没必要重新渲染它，除非它的props变化了”。

这利用了缓存（memoization）这种技术。

可以把这种技术理解为“记忆”。也就是说React会记住之前的快照。如果props没有发生变化，React会重用之前的快照，而不是费劲生成一个新的。

假设我们把BigCountnumber和Decoration都用React.memo包裹。这会使得每次BigCountNumber和Counter会重新渲染。

![alt 重新渲染](/images/why-react-rerender/8727416A-14DE-48BD-B8C0-385F56FB5F44.png)

当count变化时，我们会重新渲染Counter，同时React会尝试重新渲染两个后代组件。

因为BigCountNumber接受count作为prop，而prop变化了，所以BigCountNumber重新渲染了。而Decoration的prop没有变化，原来的快照就会被使用。

我觉得React.memo有点像一个懒惰的摄影师。如果你要求它在同一时间拍摄5张相片，它只会拍一张，然后给你5份副本。只有当你的指令变化时，它才会重新拍一张新照片。

你可能会想：为什么这不是一个默认行为？难道这不是我们大部分时候想要的吗？当然，如果我们渲染时跳过不需要重新渲染的组件，性能可以得到提升。

我认为，作为开发人员，我们倾向于高估重新渲染的成本。就Decoration组件而言，重新渲染是很快的。

如果一个组件有很多props，但是没有多少元素，逐一检查props是否发生变化可能比重新渲染这个组件更慢。

因此如果为了提高性能，而缓存每一个组件，可能会适得其反。React被设计成能很快地捕获快照。但在某些特殊的情况下，对于一些有很多元素，或者有很多内部工作的组件，缓存能有较大提升。（React团队正在积极研究在编译阶段自动缓存组件，可以点击[这里](https://www.youtube.com/watch?v=lGEMwh32soc)查看。）

#### 那context呢？

我们还没有谈过context，但幸运的是，这件事也并不复杂。

默认情况下，如果一个组件的状态改变了，它的所有后代都会重新渲染。因此，如果我们通过context把状态传递给后代组件，其实不会改变任何事。这些后代组件依然会重新渲染！

就纯组件而言，context有点像“不可见”的props，或者是“内部”props。

让我们来看一个例子。这里我们有一个消费UserContext的纯组件。

```js
const GreetUser = React.memo(() => {
  const user = React.useContext(UserContext);
  if (!user) {
    return "Hi there!";
  }
  return `Hello ${user.name}!`;
});
```

这个例子中，GreetUser是一个没有props的纯组件，但它有一个“不可见”/“内部”的依赖：储存在React状态中的user，通过context传递。

如果user状态变量改变了，会重新渲染一次，GreetUser会生成一个新的快照，而不是依赖就的快照。React可以识别到这个组件消费了这个context，因此组件会把user当作一个prop。

有点像下面的代码：

```js
const GreetUser = React.memo(({ user }) => {
  if (!user) {
    return "Hi there!";
  }
  return `Hello ${user.name}!`;
});
```

一个完整的例子：

```js
import React from 'react';

const UserContext = React.createContext();

function UserProvider({ children }) {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    // Pretend that this is a network request,
    // fetching user data from the backend.
    window.setTimeout(() => {
      setUser({ name: 'Kiara' });
    }, 1000)
  }, [])

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
}

function App() {
  return (
    <UserProvider>
      <GreetUser />
    </UserProvider>
  );
}

const GreetUser = React.memo(() => {
  const user = React.useContext(UserContext);

  if (!user) {
    return "Hi there!";
  }

  return `Hello ${user.name}!`;
});

export default App;
```

注意这只会发生在使用React.useContext来消费user context的纯组件中，你不用担心context会影响到其他不消费这个context的组件。

### 使用React Devtools的Profiler功能

如果你已经使用React来工作一段时间了，当你想搞清楚为什么一个特定的组件重新渲染，体验可能有点差。在真实的情况中，它往往是不明显的！还好，React Devtools可以帮你。

首先，你需要确保你的浏览器安装了React Devtool。打开Profiler tab。启用“Record why each component rendered while profiling”选项。

![alt profiler](/images/why-react-rerender/E3F8D309-9C00-46A8-809D-F968BC92EBD7.png)

一般的流程如下：
1. 点击record开始记录
2. 操作你的应用
3. 停止录制
4. 查看记录中的快照来了解发生了什么

每次渲染都被被捕获为一个单独的快照，你可以通过箭头来浏览它们。侧栏中可以看到组件为什么被渲染的相关信息。

通过点击你感兴趣的组件，你可以看到一个特定的组件到底为什么重新渲染了。在纯组件的情况下，它会让你知道是哪个prop(s)导致了此次更新。

我个人比较少用这个工具，但我需要用到的时候，它就是我的大救星！

#### 高亮重新渲染的组件

一个小技巧：React Profiler有一个选项可以让你高亮重新渲染的组件。如下图：
![alt 高亮组件](/images/why-react-rerender/profiler-setting-highlight-updates.webp)

启用了这个设置后，你应该可以在重新渲染的组件外围看到绿色边框：
![alt 高亮组件](/images/why-react-rerender/0DFA3B84-B025-40D6-8A00-A370A727572C.png)

这可以帮我们理解状态更新的影响到底有多大，还可以测试到底我们的纯组件是否成功避免了重新渲染。

### 继续深入

当你开始使用profiler时，你可能会注意到：有时即使看起来没有任何更改，纯组件也会重新渲染！

React令人费解的一点是，组件是一个函数。当我们渲染一个组件时，我们也是在调用这个函数。（对于类组件来说，我们调用的是其中的render函数。）

这意味着，每次渲染时，组件中所有东西都会被重新定义。考虑如下代码：

```js
function App() {
  const dog = {
    name: 'Spot',
    breed: 'Jack Russell Terrier'
  };
  return (
    <DogProfile dog={dog} />
  );
}
```

每次App组件被渲染时，都会有一个全新的对象生成。这会导致无论我们是否用React.memo包裹，DogProfile子组件都会重新渲染。

几周之后，我会写这个博客的“Part 2”。我们会深入两个神秘莫测的hooks，useMemo和useCallback。到时我们会再来看怎么来使用它们来解决这个问题。

我也要坦白，这些教程是从我即将发布的课程中抽出来的，["The Joy of React"](https://joyofreact.com/)

我使用React已经超过7年了，我学到了很多关于如何有效地使用它的知识。我非常喜欢使用 React;我已经尝试了几乎所有的前端框架，没有什么能像React一样让我感到高效。

### 一些优化Tips
React的性能优化是一个巨大的话题，就这个话题，我可以写几篇博客。希望本教程能够帮助您建立一个坚实的基础，在此基础上您可以学习有关React性能的知识！

这里是一些我学到的一些有关React性能优化的技巧：

- React Profiler显示了每次渲染所需要的时间，但这个数字不可信。我们通常在“开发模式”中做分析，而在“生产模式”中React要快得多。为了真正了解应用程序的性能，您应该使用“Performance”选项卡对部署的生产应用程序进行测量。这将显示真实的数字，不仅用于重新渲染，还用于布局/绘制更改。

- 我强烈建议在低端硬件上测试您的应用，看看90%的用户体验是什么样的。这将取决于你正在开发的产品，但在这个博客中，我定期使用红米8来测试，一款几年前在印度流行的廉价智能手机。（哈哈小米走出国门）我在推特上分享了[这段经历](https://twitter.com/JoshWComeau/status/1322552961973821441)。

- Lighthouse性能分数不是真实用户体验的准确反映。我相信使用该应用的定性体验远胜于任何自动化工具显示的统计数据。

- 几年前，我在React Europe做了一个演讲，内容都是关于React的表现！它更关注“后加载”体验，这是很多开发人员忽视的一个领域。你可以在YouTube上[查看](https://www.youtube.com/watch?v=viPhwbusWuE)。

- 不要过度优化！在学习React profiler的时候，我们很想进行一次彻底的优化，目标是尽可能地减少渲染的数量。但是说实话，React的优化已经够好了。这些工具最好用于解决性能问题，如果你的应用开始感觉有点卡顿。