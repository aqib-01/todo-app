import React from "react";
import { useRef } from "react";
import { useContext } from "react";
import { AppContext } from "../App";
const TodoInput = () => {
  const textInputRef = useRef("");
  const checkboxInputRef = useRef();
  const { handleAddTodo } = useContext(AppContext);
  return (
    <section className="todo-input-sect">
      <div className="checkbox-input">
        <input ref={checkboxInputRef} type="checkbox" name="" id="" />
      </div>
      <div className="text-input">
        <input
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddTodo(
                textInputRef.current.value,
                checkboxInputRef.current.checked
              );
              textInputRef.current.value = "";
              checkboxInputRef.current.checked = false;
            }
          }}
          ref={textInputRef}
          type="text"
          placeholder="Create a new todo..."
          name=""
          id=""
        />
      </div>
    </section>
  );
};

export default TodoInput;
