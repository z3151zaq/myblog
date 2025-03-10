---
title: 'Behaviour questions'
date: '2025-03-11'
tags: ['interview']
---

## 1. Problem-Solving: Tell me about a time you faced a difficult bug in a React project. How did you debug and fix it?

**Answer:**
Situation:
I was working on an old project that had been running smoothly for a long time but had not been updated in a while. The project required deployment on separate servers in China and Hong Kong. One day, I received a new feature request that required integrating a new package.

Task:
After finishing development and test, I was confident because the deployment went well in the test environment. So at the realease day, my goal was to successfully implement the new feature and ensure a smooth deployment in both environments without disrupting existing functionalities.

Action:
After integrating the new package, I proceeded with the deployment in China, but it failed. The issue was puzzling because the server didn’t even start Node.js, meaning there were no logs to debug. I reached out to the operations team, and they informed me that the virtual server had not been updated for a long time and required a new resource allocation. I followed their recommendation, allocated a new resource, and successfully deployed the project.

However, when deploying to Hong Kong, the deployment failed again. Assuming it was the same issue, I immediately allocated a new resource. But this time, the deployment still failed—even with the updated resource. Unlike the previous case, this time, there were logs available, which indicated a build failure due to a missing Node.js native method.

This confused me since native methods should not be missing. After further investigation, I realized that because the project was outdated, it might be using an incompatible Node.js version during the build process. Checking the logs, I discovered that:

The Hong Kong server was using Node.js 12
My local development environment was on Node.js 16
The China server and all test environment servers was using Node.js 14
This meant the issue only occurred in the Hong Kong production deployment, as the new package required a higher Node.js version than what was available.

To resolve this, I downgraded the new package to a version compatible with Node.js 12 and redeployed the project successfully.

Result:
By carefully analyzing the issue and adapting to different environments, I was able to successfully complete the deployment across both China and Hong Kong servers. This experience improved my problem-solving skills and reinforced the importance of checking environment dependencies before integrating new packages in legacy projects.

## 2. Time Management: How do you prioritize multiple tasks in a React project with tight deadlines?

## 3. Code Reviews: How do you handle receiving critical feedback on your React code during a code review?

First, I take a moment to stay calm—maybe by drinking a cup of water—because initial feedback, especially critical ones, can sometimes feel discouraging. Then, I carefully read through the comments to understand their reasoning. If the feedback is valid, I accept it, make the necessary improvements, and see it as an opportunity to grow. After all, having teammates who write better code than me is a great chance to learn.

However, if I disagree with the feedback, I prefer to discuss it directly with the reviewer in private. By having an open conversation, we can clarify our perspectives, and one of us may even change our mind. In the end, the goal is not to ‘win’ an argument but to write better, more maintainable code as a team.

## 4. Team Communication: Describe a situation where you had to explain a technical concept to a non-technical team member.

## 5. Learning & Growth: React is constantly evolving. How do you stay updated with new features and best practices?

## 6. Handling Pressure: Can you give an example of a time when you had to meet a tough deadline? How did you manage your workload?

## 7. Ownership & Initiative: Have you ever suggested a new feature or improvement in a React project? What was the impact?

## 8. Conflict Resolution: Have you ever disagreed with a teammate or stakeholder on a technical decision? How did you resolve it?

## 9. Failure & Recovery: Tell me about a time something went wrong in a project. How did you handle the situation and what did you learn?
