"use client"
import TodoList from "@/components/todo-list"

export default function Home()
{
  return (
    <main className="container mx-auto max-w-md p-4 md:p-6">
      <TodoList />
    </main>
  )
}

