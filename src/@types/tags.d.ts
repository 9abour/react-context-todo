import { TodoToUpdateType, TodoType } from "./todo";

export interface TagType {
	id: string;
	title: string;
	color: string;
}

export interface TagsContextType {
	tags: TagType[];
	isOpenState: boolean;
	addTag: (title: string, color: string) => void;
	removeTag: (id: string) => void;
	toggleContext: (booleanConditional: boolean) => void;
}
