"use client"

import { useState } from "react"
import { Check, Plus, Trash2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type Task = {
  id: string
  text: string
  completed: boolean
}

export default function TodoList()
{
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTask, setNewTask] = useState("")

  const addTask = () =>
  {
    if (newTask.trim() === "") return

    const task: Task = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
      text: newTask,
      completed: false,
    }

    setTasks([...tasks, task])
    setNewTask("")
  }

  const toggleTask = (id: string) =>
  {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const deleteTask = (id: string) =>
  {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const clearCompleted = () =>
  {
    setTasks(tasks.filter((task) => !task.completed))
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold">My Tasks</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex space-x-2">
          <Input
            placeholder="Add a new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) =>
            {
              if (e.key === "Enter") addTask()
            }}
            className="flex-1"
          />
          <Button onClick={addTask} size="icon" variant="default">
            <Plus className="h-5 w-5" />
            <span className="sr-only">Add task</span>
          </Button>
        </div>

        <div className="space-y-2">
          {tasks.length === 0 ? (
            <p className="text-center text-muted-foreground py-4">No tasks yet. Add one above!!</p>
          ) : (
            tasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="flex items-center space-x-3">
                  <Button
                    size="icon"
                    variant={task.completed ? "default" : "outline"}
                    className="h-6 w-6 rounded-full p-0"
                    onClick={() => toggleTask(task.id)}
                  >
                    {task.completed && <Check className="h-3 w-3" />}
                    <span className="sr-only">{task.completed ? "Mark as incomplete" : "Mark as complete"}</span>
                  </Button>
                  <span className={cn("text-sm font-medium", task.completed && "text-muted-foreground line-through")}>
                    {task.text}
                  </span>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  onClick={() => deleteTask(task.id)}
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Delete task</span>
                </Button>
              </div>
            ))
          )}
        </div>
      </CardContent>

      {tasks.some((task) => task.completed) && (
        <CardFooter>
          <Button variant="outline" size="sm" className="ml-auto flex items-center space-x-1" onClick={clearCompleted}>
            <X className="h-4 w-4" />
            <span>Clear completed</span>
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}

