import React from "react";
import { useState } from "react";
import SelectDemo from "./d3/SelectDemo.tsx";

export default function MyApp() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <>
      <div>
        <SelectDemo></SelectDemo>
        <h1>Welcome to my app</h1>
        <MyButton />
        <MyButton />
        <AboutPage />
      </div>
    </>
  );

  function MyButton() {
    return <button onClick={handleClick}>Clicked {count} times</button>;
  }
}

// function MyButton() {
//   return <button>I'm a button</button>;
// }

// 注意，onClick={handleClick} 的结尾没有小括号！不要 调用 事件处理函数：你只需 把函数传递给事件 即可。当用户点击按钮时 React 会调用你传递的事件处理函数。
// function MyButton() {
//   const [count, setCount] = useState(0);

//   function handleClick() {
//     setCount(count + 1);
//   }

//   return <button onClick={handleClick}>Clicked {count} times</button>;
// }

function AboutPage() {
  return (
    <>
      <h1>About</h1>
      <p>
        Hello there.
        <br />
        How do you do?
      </p>
    </>
  );
}
