import { useContext, useState, useEffect } from "react";
import { TodoContext } from "../../context/todoContext";
import Tag from "./Tag";
import { GrFormAdd } from "react-icons/gr";
import { BsCheckLg } from "react-icons/bs";
import { TodoContextType } from "../../@types/todo";

const Tags = () => {
	const { tags, toggleContext, hideCompletedTasks, setHideCompletedTasks } =
		useContext(TodoContext) as TodoContextType;
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		if (tags !== null) {
			setIsLoading(false);
		}
	}, [isLoading]);

	return (
		<div className="md:w-4/12 lg-w-3/12 xl:w-2/12 p-3">
			<div className="flex justify-between mb-2">
				<h1 className="text-2xl font-semibold text-gray-900 uppercase">Tags</h1>
				<button
					onClick={() => {
						toggleContext(true);
					}}
					className="flex rounded-[10px] p-1 bg-gray-50 hover:bg-gray-100 transition"
				>
					<div className="flex h-6 w-6 flex-none items-center justify-center rounded-md bg-white shadow ring-1 ring-slate-900/10">
						<GrFormAdd className="text-sky-600" />
					</div>
				</button>
			</div>
			<hr />
			<div className="mt-3">
				{!isLoading && tags.map(item => <Tag key={item.id} tag={item} />)}
				{tags.length === 0 && <h3 className="text-center">there's no tags</h3>}
			</div>
			<button
				className="flex items-center gap-1 mt-8 px-3"
				onClick={() => {
					setHideCompletedTasks(!hideCompletedTasks);
					localStorage.setItem(
						"hideCompletedTasks",
						JSON.stringify(!hideCompletedTasks)
					);
				}}
			>
				<span
					className={`flex items-center justify-center w-4 h-4 rounded-sm shadow ring-2 ring-gray-400 ${
						hideCompletedTasks && "ring-gray-800"
					} transition`}
				>
					{hideCompletedTasks && (
						<BsCheckLg size={20} className="text-gray-800" />
					)}
				</span>
				<span
					className={`font-semibold text-gray-400 ${
						hideCompletedTasks && "!text-gray-800"
					} transition`}
				>
					Hide done tasks
				</span>
			</button>
		</div>
	);
};

export default Tags;
