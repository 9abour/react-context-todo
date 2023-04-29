import React, { useContext } from "react";
import { TagType } from "../../@types/tags";
import { IoIosRemove } from "react-icons/io";
import { TodoContext } from "../../context/todoContext";
import { TodoContextType } from "../../@types/todo";

interface TagProps {
	tag: TagType;
}

const Tag: React.FC<TagProps> = ({ tag }) => {
	const { removeTag, setShowSelectedTagTodos } = useContext(
		TodoContext
	) as TodoContextType;
	return (
		<div
			onClick={() => {
				setShowSelectedTagTodos(tag.id);
			}}
			className="flex items-center relative my-2 py-1 px-2 bg-gray-100 border-2 rounded-md cursor-pointer"
		>
			<span
				style={{ backgroundColor: tag.color }}
				className={`absolute w-6 h-6 rounded-full opacity-30`}
			/>
			<h3 className="text-xl font-semibold text-gray-800 ml-8">{tag.title}</h3>
			<button
				onClick={() => {
					removeTag(tag.id);
				}}
				className="absolute right-2 rounded-md bg-red-200 text-red-700 cursor-pinter hover:bg-red-700 hover:text-white transition"
			>
				<IoIosRemove size={28} />
			</button>
		</div>
	);
};

export default Tag;
