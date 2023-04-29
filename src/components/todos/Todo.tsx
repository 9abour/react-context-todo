import React, { useContext, useState } from "react";
import { TodoContextType, TodoType } from "../../@types/todo";
import { BsCheckLg } from "react-icons/bs";
import { TodoContext } from "../../context/todoContext";
import { HiOutlineDotsVertical } from "react-icons/hi";
import TodoMenu from "./TodoMenu";

export interface TodoProps {
	todo: TodoType;
}

const Todo: React.FC<TodoProps> = ({ todo }) => {
	const { complete } = useContext(TodoContext) as TodoContextType;
	const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);

	const handleOpenMenu = () => {
		setIsOpenMenu(!isOpenMenu);
	};

	return (
		<div
			className="relative h-auto max-w-full flex flex-col justify-between gap-6 px-3 py-4 border-yellow-50 rounded-lg shadow bg-[#fff9de]"
			id={todo.id}
		>
			<div className="flex items-center justify-between h-full rounded-md p-1">
				<h3
					className={`text-xl font-semibold text-gray-800 ${
						todo.isCompleted ? "line-through" : "no-underline"
					}`}
				>
					{todo.title}
				</h3>
				<button className="cursor-pinter" onClick={handleOpenMenu}>
					<HiOutlineDotsVertical
						size={20}
						className="text-gray-800 cursor-pinter"
					/>
				</button>
				{isOpenMenu && <TodoMenu todo={todo} setIsOpenMenu={setIsOpenMenu} />}
			</div>
			<p className="text-slate-600">{todo.description}</p>
			<div className="flex justify-between items-center">
				<div className="flex gap-1">
					{todo.todoTags?.map(item => (
						<span
							key={item.title}
							style={{ backgroundColor: `${item.color}80` }}
							className={`px-2 py-1 text-sm font-medium text-center text-white shadow-md rounded-md`}
						>
							{item.title}
						</span>
					))}
				</div>
				<div className="flex items-center gap-1">
					<button
						onClick={() => {
							complete(todo.id);
						}}
						className="flex items-center gap-1"
					>
						<span
							className={`flex items-center justify-center w-4 h-4 rounded-sm shadow ring-2 ring-gray-400 ${
								todo.isCompleted && "ring-gray-800"
							}`}
						>
							{todo.isCompleted && (
								<BsCheckLg size={20} className="text-gray-800" />
							)}
						</span>
						<span
							className={`font-semibold text-gray-400 ${
								todo.isCompleted && "!text-gray-800"
							}`}
						>
							Done
						</span>
					</button>
				</div>
			</div>
		</div>
	);
};

export default Todo;
