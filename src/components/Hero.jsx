import React, { use, useEffect, useRef, useState } from "react";

const Hero = () => {
  const [editPopupOpen, setEditPopupOpen] = useState(false);
  const [editText, setEditText] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [list, setList] = useState(() => {
    const saved = localStorage.getItem("lastList");
    return saved ? JSON.parse(saved) : [];
  });
  const userInput = useRef(null);
  useEffect(() => {
    setEditIndex(null);
  }, []);
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
    if (todo.length === 0) return;
    // Adding a new item
    setList((prevTodos) => [...prevTodos, todo]);
    localStorage.setItem("lastItem", todo);
    userInput.current.value = ""; // clear input
  };
  const removeTodo = (indexToRemove) => {
    setList((prevTodos) =>
      prevTodos.filter((_, index) => index !== indexToRemove)
    );
  };
  const startEditTodo = (index) => {
    setEditText(list[index]);
    setEditIndex(index);
    setEditPopupOpen(true);
  };
  const handleUpdateTodo = () => {
    if (editText.trim().length === 0) return;
    setList((prevTodos) =>
      prevTodos.map((item, index) => (index === editIndex ? editText : item))
    ); // Gives Out A Array!!
    setEditIndex(null);
    setEditPopupOpen(false);
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
              <div className="space-x-2">
                <button
                  className="bg-green-400 px-2 py-1 rounded-md"
                  onClick={() => startEditTodo(index)}
                >
                  <span className="material-symbols-rounded uppercase text-sm font-semibold text-white">
                    brush
                  </span>
                </button>
                <button
                  className="bg-red-500 px-2 py-1 rounded-md"
                  onClick={() => removeTodo(index)}
                >
                  <span className="material-symbols-rounded uppercase text-sm font-semibold text-white">
                    close_small
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
        {editPopupOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm transition-opacity duration-300 ">
            <div
              className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-xl w-[90%] max-w-md text-center 
      transform transition-all duration-300 scale-95 opacity-0 animate-fadeIn"
            >
              <h2 className="text-lg font-semibold mb-4 text-zinc-900 dark:text-white uppercase">
                Edit Todo
              </h2>
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="uppercase w-full p-2 rounded-md outline-none ring-1 ring-inset ring-gray-300 dark:bg-[#242424] dark:text-white mb-4"
              />
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleUpdateTodo}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-semibold uppercase"
                >
                  Update
                </button>
                <button
                  onClick={() => {
                    setEditPopupOpen(false);
                    setEditIndex(null);
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-semibold uppercase"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Hero;
