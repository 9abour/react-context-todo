import { ReactNode } from "react";
export interface TagType {
	id: string;
	title: string;
	color: string;
}

export interface TodoType {
	id: string;
	title: string;
	description: string;
	todoTags: TagType[];
	isCompleted: boolean;
}

export type TodoContextType = {
	todos: TodoType[];
	tags: TagType[];
	updateTodoInputs: TodoType;
	isToAddTodo: boolean;
	isToUpdate: boolean;
	hideCompletedTasks: boolean;
	showSelectedTagTodos: string | null;
	complete: (id: string) => void;
	addTodo: (id, title: string, desc: string, tags: tagType[]) => void;
	removeTodo: (id: string) => void;
	addTag: (id, title: string, color: string) => void;
	removeTag: (id: string) => void;
	getTodoToUpdate: (id: string) => void;
	toggleContext: (booleanConditional: boolean) => void;
	toggleUpdateTodoModal: (booleanConditional: boolean) => void;
	submitTodoUpdate: (todo: TodoType) => void;
	setHideCompletedTasks: (booleanConditional: boolean) => void;
	setShowSelectedTagTodos: (id: string) => void;
	// clearTodos: () => void;
};
