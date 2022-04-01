import React from "react";
import { useContext } from "react";
import { AppContext } from "../App";
const Todo = ({ data }) => {
  const { handleComplete, handleDeleteTodo } = useContext(AppContext);

  return (
    <>
      <div
        className={`${
          data.completed && "todo-completed"
        }  p-6 flex items-center justify-between border-b-2 
        dark:border-d-very-dark-grayish-blue`}
      >
        <div className="checkbox-input">
          <input
            onClick={(e) => {
              handleComplete(e.target.checked, data);
            }}
            defaultChecked={data.completed}
            type="checkbox"
            name=""
            id=""
          />
        </div>
        <p className="mr-auto text-l-very-dark-grayish-blue dark:text-d-dark-grayish-blue font-semibold">
          {data.title}
        </p>
        <button onClick={() => handleDeleteTodo(data)} className="ml-4">
          <img src="images/icon-cross.svg" alt="Icon Cross" />
        </button>
      </div>
    </>
  );
};

export default Todo;
