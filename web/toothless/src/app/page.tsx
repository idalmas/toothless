/* File: page.tsx 
  The core home view. 
 */
"use client";
import { AppSchema } from "@/instant.schema";
import { init, i, id, InstaQLEntity } from "@instantdb/react";
import { todo } from "node:test";
import {
  db,
  createTodo,
  deleteTodo,
  toggleTodo,
  reorderTodos,
} from "../lib/db";
import { useState } from "react";
import { text } from "stream/consumers";
import { create } from "domain";
import {
  Sortable,
  SortableContent,
  SortableItem,
  SortableOverlay,
  SortableItemHandle,
} from "@/components/ui/sortable";
type Todo = InstaQLEntity<AppSchema, "todos">;

function App() {
  const [todoText, setTodoText] = useState("");
  const { data, isLoading, error } = db.useQuery({ todos: {} });
  if (isLoading) return <div>Loading ...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const { todos } = data;

  const incompleteTodos = todos
    .filter((t) => !t.isCompleted)
    .sort((a, b) => (a.overallPriority ?? 0) - (b.overallPriority ?? 0));

  return (
    <div style={{ maxWidth: "600px", margin: "10px auto", padding: "20px" }}>
      <div>
        <div style={{ margin: "10px auto" }}>Today's tasks:</div>
        <input
          type="text"
          placeholder="What do you want to get done?"
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
          style={{ padding: "4px" }}
        />

        <div style={{ margin: "10px auto" }}>
          <button
            onClick={() => {
              createTodo(todoText);
              setTodoText("");
            }}
            style={{
              border: "1px solid black",
              borderRadius: "3px",
              padding: "2px",
            }}
          >
            <div>Add Todo</div>
          </button>
        </div>
        <div>
          {" "}
          <Sortable
            value={incompleteTodos}
            onValueChange={reorderTodos}
            getItemValue={(item) => item.id}
          >
            <SortableContent>
              {incompleteTodos.map((t) => (
                <SortableItem key={t.id} value={t.id}>
                  <div style={{}} key={t.id}>
                    <input
                      type="checkbox"
                      checked={t.isCompleted || false}
                      onChange={() => toggleTodo(t)}
                      onPointerDown={(e) => e.stopPropagation()}
                    />
                    <SortableItemHandle><span>{t.text}</span></SortableItemHandle>
                    <button onClick={() => deleteTodo(t.id!)}>Delete</button>
                  </div>
                </SortableItem>
              ))}
            </SortableContent>
            <SortableOverlay />
          </Sortable>
        </div>
      </div>
    </div>
  );
}

export default App;
