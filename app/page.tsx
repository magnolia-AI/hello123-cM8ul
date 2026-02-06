import db from '@/lib/db';
import { todos } from '@/lib/schema';
import { addTodo, deleteTodo, toggleTodo } from '@/app/actions/todo-actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Trash2, PlusCircle, CheckCircle2, Circle } from 'lucide-react';
import { asc } from 'drizzle-orm';

export default async function TodoPage() {
  const allTodos = await db.select().from(todos).orderBy(asc(todos.createdAt));

  return (
    <main className="min-h-screen bg-slate-50/50 py-12 px-4">
      <div className="max-w-md mx-auto">
        <Card className="shadow-lg border-slate-200">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold tracking-tight">Todo List</CardTitle>
            <CardDescription>
              Keep track of your tasks and stay organized.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Add Todo Form */}
            <form action={addTodo} className="flex gap-2">
              <Input
                name="task"
                placeholder="What needs to be done?"
                className="flex-1"
                required
              />
              <Button type="submit" size="icon" className="shrink-0">
                <PlusCircle className="h-5 w-5" />
                <span className="sr-only">Add Task</span>
              </Button>
            </form>

            {/* Todo List */}
            <div className="space-y-3">
              {allTodos.length === 0 ? (
                <div className="text-center py-10 text-slate-500">
                  <p>No tasks yet. Add one above to get started!</p>
                </div>
              ) : (
                allTodos.map((todo) => (
                  <div
                    key={todo.id}
                    className="flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-white shadow-sm hover:border-slate-200 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <form action={toggleTodo.bind(null, todo.id, todo.completed)}>
                        <button type="submit" className="focus:outline-none">
                          {todo.completed ? (
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                          ) : (
                            <Circle className="h-5 w-5 text-slate-300 group-hover:text-slate-400" />
                          )}
                        </button>
                      </form>
                      <span
                        className={`text-sm font-medium transition-all ${
                          todo.completed ? 'line-through text-slate-400' : 'text-slate-700'
                        }`}
                      >
                        {todo.task}
                      </span>
                    </div>
                    
                    <form action={deleteTodo.bind(null, todo.id)}>
                      <Button
                        type="submit"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-slate-400 hover:text-red-500 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete Task</span>
                      </Button>
                    </form>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
        
        <footer className="mt-8 text-center text-slate-400 text-xs">
          Built with Next.js & Drizzle ORM
        </footer>
      </div>
    </main>
  );
}

