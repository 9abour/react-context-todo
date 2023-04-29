import { useState, useContext } from "react";
import { TodoContext } from "../../context/todoContext";
import { TodoContextType, TodoType } from "../../@types/todo";
import { TagType } from "../../@types/tags";

const UpdateTodoModal = () => {
	const { tags, toggleUpdateTodoModal, submitTodoUpdate, updateTodoInputs } =
		useContext(TodoContext) as TodoContextType;

	const { id, title, description, todoTags, isCompleted } = updateTodoInputs;

	const [todoTitle, setTodoTitle] = useState<string>(title);
	const [todoDesc, setTodoDesc] = useState<string>(description);
	const [selectedTags, setSelectedTags] = useState<TagType[]>(todoTags);

	const handleSubmitTodo = () => {
		if (todoTitle !== "" && todoDesc !== "") {
			const updatedTodo = {
				id: id,
				title: todoTitle,
				description: todoDesc,
				todoTags: selectedTags,
				isCompleted: isCompleted,
			};
			submitTodoUpdate(updatedTodo);
			toggleUpdateTodoModal(false);
		}
	};

	const handleSelectTags = (newTag: TagType) => {
		if (!selectedTags.some(item => item.id === newTag.id)) {
			setSelectedTags([...selectedTags, newTag]);
		} else {
			const updated = selectedTags.filter(tag => tag.id !== newTag.id);
			setSelectedTags([...updated]);
		}
	};

	const todoBodyContent = (
		<form
			onSubmit={e => {
				e.preventDefault();
				handleSubmitTodo();
			}}
		>
			<div className="flex items-center justify-between ">
				<button
					className="modal-btn p-0 text-gray-600"
					onClick={e => {
						e.preventDefault();
						toggleUpdateTodoModal(false);
					}}
				>
					Cancel
				</button>
				<button type="submit" className="modal-btn bg-gray-600 text-white">
					Update
				</button>
			</div>
			<div className="my-3 mt-6">
				<label className="label">Title</label>
				<input
					type="text"
					value={todoTitle}
					onChange={e => setTodoTitle(e.target.value)}
					className="bg-gray-200 text-slate-600 w-full p-2 focus:outline-none border rounded-md"
					placeholder="Add a title..."
				/>
			</div>
			<div className="my-3">
				<label className="label">Description</label>
				<textarea
					rows={4}
					value={todoDesc}
					onChange={e => setTodoDesc(e.target.value)}
					className="bg-gray-200 text-slate-600 w-full p-2 focus:outline-none border rounded-md"
					placeholder="Add a Description..."
				></textarea>
			</div>
			<div className="mb-3">
				<p className="text-lg font-semibold text-gray-600 mb-2">Choose tags</p>
				<div className="grid md:flex gap-3">
					{tags.map((item: TagType, index) => (
						<div
							key={item.id}
							onClick={() => handleSelectTags(item)}
							className={`relative px-3 py-2 rounded-lg text-gray-600 font-semibold transition hover:bg-opacity-70 cursor-pointer ${
								selectedTags.some(tag => tag.id === item.id) && "bg-gray-200"
							}`}
						>
							<span
								style={{ backgroundColor: item.color }}
								className={`absolute left-2 w-6 h-6 opacity-30 rounded-full`}
							/>
							<p className="pl-6">{item.title}</p>
						</div>
					))}
				</div>
			</div>
		</form>
	);

	return (
		<>
			<div className="w-screen h-screen grid place-items-center absolute bg-black bg-opacity-70 z-50">
				<div className="relative bg-white w-[80%] lg:w-[70] xl:w-[40%] h-fit rounded-lg p-4 md:p-8">
					{todoBodyContent}
				</div>
			</div>
		</>
	);
};

export default UpdateTodoModal;
