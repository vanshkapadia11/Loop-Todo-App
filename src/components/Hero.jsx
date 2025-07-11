import React, { useEffect, useRef, useState } from "react";

const Hero = () => {
  const [list, setList] = useState(() => {
    const saved = localStorage.getItem("lastList");
    return saved ? JSON.parse(saved) : [];
  });
  const userInput = useRef(null);
  useEffect(() => {
    localStorage.setItem("lastList", JSON.stringify(list));
  }, [list]);
  useEffect(() => {
    const prevList = JSON.parse(localStorage.getItem("lastList"));
    const prevTodo = localStorage.getItem("lastItem");
    if (prevList) setList(prevList);
    if (userInput.current && prevTodo) userInput.current.value = prevTodo;
  }, []);
  const addTodo = () => {
    let todo = userInput.current.value.trim();
    setList((prevTodos) => [...prevTodos, todo]);
    localStorage.setItem("lastItem", todo);
    userInput.current.value = ""; // clear input
  };
  const removeTodo = (indexToRemove) => {
    setList((prevTodos) => {
      prevTodos.filter((_, index) => index !== indexToRemove);
    });
  };
  return (
    <>
      <section className="container1 uppercase mt-10">
        <div className="flex justify-center items-center text-center">
          <h2 className="text-3xl font-semibold heading">todo list!!</h2>
        </div>
        <div className="flex justify-center flex-col items-center text-center mt-6">
          <label htmlFor="input"></label>
          <input
            type="text"
            id="input"
            name="input"
            maxLength={20}
            ref={userInput}
            className="p-4 text-xs font-semibold outline-none dark:bg-[#242424] bg-[#f9f9f9] ring-1 ring-inset ring-[#e8e8e8] rounded-lg"
          />
          <button
            className="p-3 ring-1 ring-inset ring-[#e8e8e8] rounded-xl dark:ring-[#a2a2a2] flex items-center space-x-3 mt-6"
            onClick={addTodo}
          >
            <span className="text-sm font-semibold uppercase">add todo</span>
            <span className="material-symbols-rounded">publish</span>
          </button>
        </div>
        <div className="px-6 py-4 bg-[#f9f9f9] dark:bg-zinc-800 dark:ring-[#2a2a2a] mt-8 rounded-xl ring-1 ring-inset ring-[#e8e8e8] gap-5 w-full ">
          {list.map((todo, index) => (
            <div className="flex justify-between items-center my-4" key={index}>
              <h2 className="text-xs font-semibold">
                {index + 1} : {todo}
              </h2>
              <button
                className="bg-red-500 p-2 rounded-md uppercase text-xs font-semibold text-white"
                onClick={() => removeTodo(index)}
              >
                delete
              </button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Hero;
