import { TodoContextType } from "./@types/todo";
import AddTodoModal from "./components/modals/AddTodoModal";
import Tags from "./components/tags/Tags";
import Todos from "./components/todos/Todos";
import UpdateTodoModal from "./components/modals/UpdateTodoModal";
import { TodoContext } from "./context/todoContext";
import "./globals.scss";
import { useContext, useEffect } from "react";

function App() {
	const { isToAddTodo, isToUpdate } = useContext(
		TodoContext
	) as TodoContextType;

	return (
		<div className="md:flex">
			{isToAddTodo && <AddTodoModal />}
			{isToUpdate && <UpdateTodoModal />}
			<Tags />
			<Todos />
		</div>
	);
}

export default App;
