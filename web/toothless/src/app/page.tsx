"use client";

import { db } from "@/lib/db";
import { type AppSchema } from "@/instant.schema";
import { id, InstaQLEntity } from "@instantdb/react";

type Todo = InstaQLEntity<AppSchema, "todos">;

const room = db.room("todos");

function App() {
  return <div>Hello World</div>
}

export default App;