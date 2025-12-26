/* db.ts
   This file has key helper funcitons that serve as 
   abstraction over the core db operations. 
*/
import { init, id, InstaQLEntity} from "@instantdb/react";
import schema from "../instant.schema";
import { AppSchema } from "@/instant.schema";

type Todo = InstaQLEntity<AppSchema, "todos">;

export const db = init({
  appId: process.env.NEXT_PUBLIC_INSTANT_APP_ID!,
  schema,
  useDateObjects: true,
});

/* 
  Create a todo, given a string descriptions (defaults to not completed)
*/
export function createTodo(text: string) {
  db.transact(db.tx.todos[id()].create({ text, isCompleted: false }));
}

/* 
  Given a todoId, delete the todo. 
*/
export function deleteTodo(todoId: string) {
  db.transact(db.tx.todos[todoId].delete());
}

/* 
  Change the "isCompleted" value of a todo. (Update to the oposite of what it was)
 */
export function toggleTodo(todo: Todo) {
  db.transact(db.tx.todos[todo.id].update({ isCompleted: !todo.isCompleted }));
}

/* 
  Update the overallPriority field of a todo based on it's index in our array. 
*/
export function reorderTodos(newTodos: Todo[]) {
  newTodos.forEach((todo, index) => {
    db.transact(db.tx.todos[todo.id].update({ overallPriority: index }));
  });
}