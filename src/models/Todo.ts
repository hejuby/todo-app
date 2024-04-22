import mongoose from "mongoose";

export interface Todo {
    title: string;
    description?: string;
    completed?: boolean;
    endDate?: Date;
    priority: number;
}

export type MongoTodo = Todo & mongoose.Document;

export type TodoDocument = Todo & {
    _id: string;
    createdAt: Date;
    updatedAt: Date;
};

const TodoSchema = new mongoose.Schema<Todo>({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    completed: {
        type: Boolean,
    },
    endDate: {
        type: Date,
    },
    priority: {
        type: Number,
        required: true,
    },
});

export default mongoose.models.Todo || mongoose.model<Todo>("Todo", TodoSchema);
