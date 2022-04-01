import React, { useEffect, useReducer, useState } from "react";
import Header from "./components/Header";
import TodoInput from "./components/TodoInput";
import Todo from "./components/Todo";
import { v4 as uuidv4 } from "uuid";
const reducer = (state, action) => {
  if (action.type === "INITIAL_DATA") {
    const newTodos = action.payload;

    return {
      ...state,
      todos: newTodos,
    };
  }
  if (action.type === "UPDATE_COMPLETED") {
    const newTodos = action.payload;
    localStorage.setItem("todosData", JSON.stringify(newTodos));
    return {
      ...state,
      todos: newTodos,
    };
  }
  if (action.type === "ADD_TODO") {
    const newTodos = action.payload;
    localStorage.setItem("todosData", JSON.stringify(newTodos));
    return {
      ...state,
      todos: newTodos,
    };
  }
  if (action.type === "DELETE_TODO") {
    const newTodos = action.payload;
    localStorage.setItem("todosData", JSON.stringify(newTodos));
    return {
      ...state,
      todos: newTodos,
    };
  }
  if (action.type === "CLEAR_COMPLETED") {
    const newTodos = action.payload;
    localStorage.setItem("todosData", JSON.stringify(newTodos));
    return {
      ...state,
      todos: newTodos,
    };
  }
};

const defaultState = {
  todos: [
    {
      id: 1,
      title: "Exercise for 2 hours everyday",
      completed: false,
    },
    {
      id: 2,
      title: "Code daily",
      completed: false,
    },
    {
      id: 3,
      title: "Learn Python everyday for 1 hour",
      completed: false,
    },
    {
      id: 4,
      title: "Check mail every morning",
      completed: false,
    },
  ],
};
export const AppContext = React.createContext();
const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [state, dispatch] = useReducer(reducer, defaultState);
  const [displayedTodos, setDisplayedTodos] = useState(state.todos);
  const [activeTodosType, setActiveTodosType] = useState("all");
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("darkMode"))) {
      setIsDarkMode(JSON.parse(localStorage.getItem("darkMode")));
    }
  }, []);
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else if (!isDarkMode) {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
    console.log(isDarkMode);
    console.log(localStorage.getItem("darkMode"));
  }, [isDarkMode]);

  useEffect(() => {
    let todosData = JSON.parse(localStorage.getItem("todosData"));
    if (todosData) {
      dispatch({ type: "INITIAL_DATA", payload: todosData });
    } else {
      localStorage.setItem("todosData", JSON.stringify(state.todos));
    }
  }, []);
  useEffect(() => {
    setDisplayedTodos(state.todos);
  }, [state.todos]);
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  const handleComplete = (checked, todo) => {
    let newTodos = state.todos;
    const i = newTodos.indexOf(todo);
    newTodos[i].completed = checked;
    setDisplayedTodos(newTodos);

    dispatch({ type: "UPDATE_COMPLETED", payload: newTodos });
  };
  const handleAddTodo = (title, checked) => {
    if (title && title.trim().length !== 0) {
      let newTodos = state.todos;
      const newTodo = {
        id: uuidv4(),
        title: title,
        completed: checked,
      };
      newTodos.push(newTodo);
      setDisplayedTodos(newTodos);
      dispatch({ type: "ADD_TODO", payload: newTodos });
    }
  };
  const handleDeleteTodo = (todo) => {
    const newTodos = state.todos.filter((prevTodo) => prevTodo.id !== todo.id);
    setDisplayedTodos(newTodos);
    dispatch({ type: "DELETE_TODO", payload: newTodos });
  };
  const handleClearCompleted = () => {
    const newTodos = state.todos.filter((todo) => todo.completed !== true);
    setDisplayedTodos(newTodos);
    dispatch({ type: "CLEAR_COMPLETED", payload: newTodos });
  };
  const getItemsLeft = () => {
    const num = state.todos.filter((todo) => todo.completed == false).length;
    return num;
  };
  const handleActiveType = () => {
    const activeTodos = state.todos.filter((todo) => todo.completed !== true);
    setDisplayedTodos(activeTodos);
    setActiveTodosType("active");
  };
  const handleCompletedType = () => {
    const completedTodos = state.todos.filter(
      (todo) => todo.completed !== false
    );
    setDisplayedTodos(completedTodos);
    setActiveTodosType("completed");
  };
  const handleAllType = () => {
    setDisplayedTodos(state.todos);
    setActiveTodosType("all");
  };
  return (
    <AppContext.Provider
      value={{
        handleComplete,
        handleAddTodo,
        handleDeleteTodo,
        isDarkMode,
        toggleDarkMode,
      }}
    >
      <div className="wrapper">
        <Header />
        <TodoInput />
        {state.todos.length ? (
          <>
            {displayedTodos.length ? (
              <section className="bg-white dark:bg-d-very-dark-desat-blue  mt-6 shadow-lg rounded-md">
                {displayedTodos.map((todo) => (
                  <Todo key={todo.id} data={todo} />
                ))}

                <div className="flex items-center justify-between p-6 ">
                  <p className="text-l-dark-grayish-blue dark:text-d-dark-grayish-blue font-semibold">
                    {getItemsLeft()} items left
                  </p>
                  <button
                    onClick={handleClearCompleted}
                    className="text-l-dark-grayish-blue dark:text-d-very-dark-grayish-blue font-semibold
             hover:text-l-very-dark-grayish-blue dark:hover:text-d-dark-grayish-blue"
                  >
                    Clear Completed
                  </button>
                </div>
              </section>
            ) : (
              <div
                className="p-6 bg-white dark:bg-d-very-dark-desat-blue mt-10 rounded-md shadow-lg
              text-center text-2xl text-d-dark-grayish-blue
              "
              >
                No todos to show
              </div>
            )}

            <section
              className="bg-white my-7 shadow-lg rounded-md p-6 text-lg
         flex items-center justify-center text-l-dark-grayish-blue 
         dark:text-d-very-dark-grayish-blue dark:bg-d-very-dark-desat-blue"
            >
              <button
                onClick={handleAllType}
                className={`font-bold hover:text-bright-blue mr-10 ${
                  activeTodosType === "all" && " active-todo-type"
                } `}
              >
                All
              </button>
              <button
                onClick={handleActiveType}
                className={`font-bold hover:text-bright-blue mr-10 ${
                  activeTodosType === "active" && " active-todo-type"
                } `}
              >
                Active
              </button>
              <button
                onClick={handleCompletedType}
                className={`font-bold hover:text-bright-blue ${
                  activeTodosType === "completed" && " active-todo-type"
                } `}
              >
                Completed
              </button>
            </section>
          </>
        ) : (
          <div className="bg-white dark:bg-d-very-dark-desat-blue text-center rounded-md text-d-dark-grayish-blue mt-10 px-6 py-12 text-2xl font-semibold shadow-lg">
            No todos to show
          </div>
        )}
      </div>
    </AppContext.Provider>
  );
};

export default App;
