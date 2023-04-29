import { useContext, useEffect, useState } from "react";
import { TodoContext } from "../../context/todoContext";
import { TodoContextType } from "../../@types/todo";
import Todo from "./Todo";

const Todos = () => {
	const { todos, hideCompletedTasks } = useContext(
		TodoContext
	) as TodoContextType;
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		if (todos !== null) {
			setIsLoading(false);
		}
	}, [todos]);

	return (
		<div className="md:w-10/12 lg:w-9/12 xl:w-10/12 h-screen bg-gray-200">
			<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 p-3">
				{!isLoading && hideCompletedTasks
					? todos.map(
							item => !item.isCompleted && <Todo key={item.id} todo={item} />
					  )
					: todos.map(item => <Todo key={item.id} todo={item} />)}
				{todos.length === 0 && <h3>there's no tasks</h3>}
			</div>
		</div>
	);
};

export default Todos;
