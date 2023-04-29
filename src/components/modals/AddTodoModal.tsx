import { useState, useContext } from "react";
import { HiArrowSmDown, HiArrowSmUp } from "react-icons/hi";
import { TodoContext } from "../../context/todoContext";
import { TodoContextType, TagType } from "../../@types/todo";
import { v4 as uuid } from "uuid";
import Swal from "sweetalert2";

const Modal = () => {
	const { todos, tags, addTodo, addTag, toggleContext } = useContext(
		TodoContext
	) as TodoContextType;

	const [todoTitle, setTodoTitle] = useState<string>("");
	const [todoDesc, setTodoDesc] = useState<string>("");
	const [selectedTags, setSelectedTags] = useState<TagType[]>([]);

	const [openAddTag, setOpenAddTag] = useState<Boolean>(false);
	const [tagTitle, setTagTitle] = useState<string>("");
	const [tagColor, setTagColor] = useState<string>("#0f518f");

	const handleSubmitTodo = () => {
		const id = uuid();

		if (todoTitle !== "" && todoDesc !== "") {
			if (todos.length > 0) {
				// To check if is duplicated
				const isDuplicated = todos.find(item => item.title === todoTitle);
				if (!isDuplicated) {
					const inputs = [setTodoTitle, setTodoDesc];
					for (let i = 0; i < inputs.length; i++) inputs[i]("");
					addTodo(id, todoTitle, todoDesc, selectedTags);
					toggleContext(false);
					setOpenAddTag(false);
					setSelectedTags([]);
				} else {
					Swal.fire({
						title: "Warning!",
						text: "Please change the title of your task ❤️",
						icon: "warning",
						confirmButtonText: "Cool",
					});
				}
			} else {
				const inputs = [setTodoTitle, setTodoDesc];
				for (let i = 0; i < inputs.length; i++) inputs[i]("");
				addTodo(id, todoTitle, todoDesc, selectedTags);
				toggleContext(false);
				setOpenAddTag(false);
				setSelectedTags([]);
			}
		}
	};

	const handleSubmitTag = () => {
		if (tagTitle !== "") {
			const id = uuid();
			if (tags.length > 0) {
				const isDuplicated = tags.find(item => item.title === tagTitle);
				if (!isDuplicated) {
					addTag(id, tagTitle, tagColor);
					setOpenAddTag(false);
				} else {
					Swal.fire({
						title: "Warning!",
						text: "Please change the title of your tag ❤️",
						icon: "warning",
						confirmButtonText: "Cool",
					});
				}
			} else {
				addTag(id, tagTitle, tagColor);
				setOpenAddTag(false);
			}
		}
	};

	const handleSelectTags = (newTag: TagType) => {
		if (!selectedTags.includes(newTag)) {
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
			<div className="flex items-center justify-between h-8">
				<button
					className="modal-btn p-0 text-gray-600"
					onClick={e => {
						e.preventDefault();
						toggleContext(false);
					}}
				>
					Cancel
				</button>
				<button type="submit" className="modal-btn bg-gray-600 text-white">
					Add
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
				<p className="text-lg font-semibold text-gray-600 mb-2">
					{tags.length > 0 ? (
						"Choose tags"
					) : (
						<button
							onClick={() => {
								setOpenAddTag(!openAddTag);
							}}
							className="underline"
						>
							No tags, click to add some.
						</button>
					)}
				</p>
				<div className="grid md:flex gap-3">
					{tags.map(item => (
						<div
							key={item.id}
							onClick={() => handleSelectTags(item)}
							className={`relative px-3 py-2 rounded-lg text-gray-600 font-semibold transition hover:bg-opacity-70 cursor-pointer ${
								selectedTags.includes(item) && "bg-gray-100"
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

	const tagBodyContent = (
		<form
			onSubmit={e => {
				e.preventDefault();
				handleSubmitTag();
			}}
		>
			<div className="my-3">
				<label className="label">Add new tag</label>
				<input
					onChange={e => {
						setTagTitle(e.target.value);
					}}
					type="text"
					className="bg-gray-200 text-slate-600 w-full p-2 focus:outline-none border rounded-md"
					placeholder="Add a tag..."
				/>
			</div>
			<div className="my-3 flex justify-between h-8">
				<div className="flex items-center gap-3">
					<label className="label mb-0">Color</label>
					<input
						onChange={e => setTagColor(e.target.value)}
						value={tagColor}
						type="color"
						className="w-10 h-full !border-0 bg-transparent !outline-none"
					/>
					<span style={{ color: `${tagColor}` }}>{tagColor}</span>
				</div>
				<button type="submit" className="modal-btn bg-gray-600 text-white">
					Add
				</button>
			</div>
		</form>
	);

	return (
		<>
			<div className="w-screen h-screen grid place-items-center absolute bg-black bg-opacity-70 z-50">
				<div className="relative bg-white w-[80%] lg:w-[70] xl:w-[40%] h-fit rounded-lg p-4 md:p-8">
					{todoBodyContent}
					<hr />
					<button
						onClick={() => setOpenAddTag(!openAddTag)}
						className="flex items-center mt-6 font-semibold text-gray-800"
					>
						<span>{openAddTag ? "Hide" : "Add tag"}</span>
						{openAddTag ? (
							<HiArrowSmUp size={20} />
						) : (
							<HiArrowSmDown size={20} />
						)}
					</button>
					{openAddTag && <>{tagBodyContent}</>}
				</div>
			</div>
		</>
	);
};

export default Modal;
