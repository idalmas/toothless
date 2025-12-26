/* File: page.tsx 
  The core home view. 
 */
"use client";
import { AppSchema } from "@/instant.schema";
import { init, i, id, InstaQLEntity } from "@instantdb/react";
import { todo } from "node:test";
import { db, createTodo, deleteTodo, toggleTodo } from "../lib/db";
import { useState } from "react";
import { text } from "stream/consumers";
import { create } from "domain";

type Todo = InstaQLEntity<AppSchema, "todos">;


function App() {
  const [todoText, setTodoText] = useState("");
  const { data, isLoading, error } = db.useQuery({ todos: {} });
  if (isLoading) return <div>Loading ...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const { todos } = data;

  return (
    <div style={{ maxWidth: '600px', margin: '10px auto', padding: '20px'}}>
    <div>
      <div style={{margin: '10px auto'}}>
      Today's tasks: 
      </div>
      <input
        type="text"
        placeholder="What do you want to get done?"
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
      />
      <div style={{margin: '10px auto'}}>
      <button
        onClick={() => {
          createTodo(todoText);
          setTodoText("");
        }}
        style={{ border: "1px solid black"}}
      >
        Add Todo
      </button>
      </div>
      <div>
        {" "}
        {todos.map((t) => {
          return (
            <div key={t.id}>
              <input
                type="checkbox"
                checked={t.isCompleted || false}
                onChange={() => toggleTodo(t)}
              />
              <span>{t.text}</span>
              <button onClick={() => deleteTodo(t.id!)}>Delete</button>
            </div>
          );
        })}
      </div>
    </div>
    </div>
  );
}

export default App;
