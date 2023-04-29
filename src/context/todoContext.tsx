import React, { useEffect, useState } from "react";
import { TodoContextType, TodoType } from "../@types/todo";
import { TagsContextType, TagType } from "../@types/tags";

export const TodoContext = React.createContext<
	TodoContextType | TagsContextType | null
>(null);

interface Props {
	children: React.ReactNode;
}

const TodoProvider: React.FC<Props> = ({ children }) => {
	const [todos, setTodos] = useState<TodoType[]>([]);
	const [tags, setTags] = useState<TagType[]>([]);
	const [updateTodoInputs, setUpdateTodoInputs] = useState<TodoType>({
		id: "",
		title: "",
		description: "",
		todoTags: [],
		isCompleted: false,
	});

	const [isToAddTodo, setIsToAddTodo] = useState<boolean>(false);

	const [isToUpdate, setIsToUpdate] = useState<boolean>(false);

	const [hideCompletedTasks, setHideCompletedTasks] = useState<boolean>(false);

	const [showSelectedTagTodos, setShowSelectedTagTodos] = useState<
		string | null
	>(null);

	// import todos when page loads
	useEffect(() => {
		const todosFromLS = localStorage.getItem("todos");
		const tagsFromLS = localStorage.getItem("tags");
		if (todosFromLS !== null) {
			setTodos(JSON.parse(todosFromLS));
		}
		if (tagsFromLS !== null) {
			setTags(JSON.parse(tagsFromLS));
		}
	}, []);

	// handle hide completed tasks from local storage
	useEffect(() => {
		const hideCompletedTasksLS = localStorage.getItem("hideCompletedTasks");
		if (hideCompletedTasksLS !== null) {
			setHideCompletedTasks(JSON.parse(hideCompletedTasksLS));
		}
	}, []);

	// To stop scrolling when modal is open
	useEffect(() => {
		if (isToAddTodo || isToUpdate) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}
	}, [isToAddTodo, isToUpdate]);

	//~ Start(todos)
	function complete(id: string) {
		todos.filter(todo => {
			if (todo.id === id) {
				todo.isCompleted = !todo.isCompleted;
			}

			setTodos([...todos]);

			// just update todos in localStorage
			updateTodosInLS(todos);
		});
	}

	function addTodo(
		id: string,
		title: string,
		description: string,
		todoTags: TagType[]
	) {
		const newTodo = {
			id,
			title,
			description,
			todoTags,
			isCompleted: false,
		};

		setTodos([...todos, newTodo]);

		const todosFromLS = localStorage.getItem("todos");
		// Check if there's any items in localStorage
		if (todosFromLS !== null) {
			// if so Update it with a new todo in localStorage
			localStorage.setItem("todos", JSON.stringify([...todos, newTodo]));
		} else {
			// save the only todo to localStorage
			localStorage.setItem("todos", JSON.stringify([newTodo]));
		}
	}

	function updateTodosInLS(updated: TodoType[]) {
		localStorage.setItem("todos", JSON.stringify([...updated]));
	}

	function removeTodo(id: string) {
		const removed = todos.find(todo => todo.id === id);
		const updated = todos.filter(todo => todo !== removed);

		// Update todos in this state(todos)
		setTodos(updated);

		// Update todos in localStorage
		updateTodosInLS(updated);
	}

	function getTodoToUpdate(id: string) {
		const todoToUpdate = todos.find(todo => todo.id === id);

		todoToUpdate !== undefined && setUpdateTodoInputs(todoToUpdate);
	}

	function toggleContext(booleanConditional: boolean) {
		setIsToAddTodo(booleanConditional);
	}

	function toggleUpdateTodoModal(isUpdate: boolean) {
		if (isUpdate) {
			setIsToUpdate(true);
		} else if (!isUpdate) {
			setIsToUpdate(false);
		}
	}

	function submitTodoUpdate(updatedTodo: TodoType) {
		let updated = todos.map(todo => {
			if (todo.id === updatedTodo.id) {
				todo = updatedTodo;
			}
			return todo;
		});
		setTodos([...updated]);
		updateTodosInLS([...updated]);
	}

	//~ End(todos)

	//~ Start(tags)
	const addTag = (id: string, title: string, color: string) => {
		const newTag = {
			id,
			title,
			color,
		};
		setTags([...tags, newTag]);
		saveTagToLS(newTag);
	};

	const saveTagToLS = (tag: TagType) => {
		const tagsFromLS = localStorage.getItem("tags");

		if (tagsFromLS !== null) {
			localStorage.setItem("tags", JSON.stringify([...tags, tag]));
		} else {
			localStorage.setItem("tags", JSON.stringify([tag]));
		}
	};

	const removeTag = (id: string) => {
		const removed = tags.find(tag => tag.id === id);
		const updated = tags.filter(tag => tag !== removed);

		// Update tags in this state(tags)
		setTags(updated);

		// Update tags in localStorage
		updateTagsInLS(updated);

		todos.map(item => {
			const updatedTags = item.todoTags.filter(tag => tag.id !== id);
			item.todoTags = updatedTags;
			setTodos(todos);
			updateTodosInLS(todos);
		});
	};

	const updateTagsInLS = (updated: TagType[]) => {
		localStorage.setItem("tags", JSON.stringify([...updated]));
	};
	//~ End(tags)

	return (
		<TodoContext.Provider
			value={{
				todos,
				tags,
				isToAddTodo,
				isToUpdate,
				updateTodoInputs,
				hideCompletedTasks,
				showSelectedTagTodos,
				complete,
				addTodo,
				removeTodo,
				addTag,
				removeTag,
				getTodoToUpdate,
				toggleContext,
				toggleUpdateTodoModal,
				submitTodoUpdate,
				setHideCompletedTasks,
				setShowSelectedTagTodos,
			}}
		>
			{children}
		</TodoContext.Provider>
	);
};

export default TodoProvider;

export { TodoProvider };
