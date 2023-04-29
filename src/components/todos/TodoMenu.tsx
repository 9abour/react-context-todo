import { useContext } from "react";
import { TodoContext } from "../../context/todoContext";
import { TodoContextType } from "../../@types/todo";
import { TodoProps } from "./Todo";

const TodoMenu = (props: TodoProps | any) => {
	const { removeTodo, getTodoToUpdate, toggleUpdateTodoModal } = useContext(
		TodoContext
	) as TodoContextType;

	const { id } = props.todo;

	return (
		<div id={id} className="absolute w-[10rem] right-[2.5rem] top-[1rem] z-10">
			<div className="flex flex-col gap-1 bg-white rounded-xl border">
				<button
					onClick={e => {
						getTodoToUpdate(id);
						toggleUpdateTodoModal(true);
					}}
					className="todoBtn rounded-t-xl"
				>
					Edit...
				</button>
				<button
					onClick={() => {
						removeTodo(id);
					}}
					className="todoBtn rounded-b-xl"
				>
					Delete
				</button>
			</div>
		</div>
	);
};

export default TodoMenu;
