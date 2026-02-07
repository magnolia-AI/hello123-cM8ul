import db from '@/lib/db';
import { todos } from '@/lib/schema';
import { addTodo, deleteTodo, toggleTodo } from '@/app/actions/todo-actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Trash2, 
  Plus, 
  CheckCircle2, 
  Circle, 
  ClipboardList,
  Sparkles
} from 'lucide-react';
import { asc } from 'drizzle-orm';
import { Badge } from '@/components/ui/badge';

export default async function TodoPage() {
  const allTodos = await db.select().from(todos).orderBy(asc(todos.createdAt));
  const completedCount = allTodos.filter(t => t.completed).length;

  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-50 via-white to-slate-100 py-16 px-4">
      <div className="max-w-xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center p-3 bg-indigo-50 rounded-2xl mb-2">
            <ClipboardList className="h-8 w-8 text-indigo-600" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            My <span className="text-indigo-600">Focus</span>
          </h1>
          <p className="text-slate-500 max-w-sm mx-auto text-lg">
            Stay organized and accomplish your goals with style.
          </p>
          
          {allTodos.length > 0 && (
            <div className="flex justify-center gap-2 pt-2">
              <Badge variant="secondary" className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border-none px-3 py-1">
                {allTodos.length} total tasks
              </Badge>
              <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-none px-3 py-1">
                {completedCount} completed
              </Badge>
            </div>
          )}
        </div>

        {/* Action Card */}
        <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white/80 backdrop-blur-sm overflow-hidden">
          <CardContent className="p-6 space-y-8">
            
            {/* Input Form */}
            <form action={addTodo} className="relative group">
              <Input
                name="task"
                placeholder="What's your next big goal?"
                className="h-14 pl-5 pr-14 text-lg border-slate-200 focus-visible:ring-indigo-500 rounded-xl transition-all bg-white/50"
                required
              />
              <Button 
                type="submit" 
                size="icon" 
                className="absolute right-2 top-2 h-10 w-10 bg-indigo-600 hover:bg-indigo-700 transition-all rounded-lg shadow-md hover:shadow-indigo-200"
              >
                <Plus className="h-6 w-6 text-white" />
                <span className="sr-only">Add</span>
              </Button>
            </form>

            {/* Todo List Content */}
            <div className="space-y-4">
              {allTodos.length === 0 ? (
                <div className="text-center py-20 bg-slate-50/50 rounded-2xl border-2 border-dashed border-slate-100">
                  <Sparkles className="h-10 w-10 text-indigo-200 mx-auto mb-4" />
                  <p className="text-slate-400 font-medium">Your list is clear. Time to dream big!</p>
                </div>
              ) : (
                <div className="grid gap-3">
                  {allTodos.map((todo) => (
                    <div
                      key={todo.id}
                      className={`group flex items-center justify-between p-4 rounded-xl border transition-all duration-200 ${
                        todo.completed 
                          ? 'bg-slate-50/50 border-slate-100 opacity-75' 
                          : 'bg-white border-slate-200 hover:border-indigo-200 hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-center gap-4 flex-1 mr-4">
                        <form action={toggleTodo.bind(null, todo.id, todo.completed)}>
                          <button 
                            type="submit" 
                            className="focus:outline-none transition-transform active:scale-90"
                          >
                            {todo.completed ? (
                              <div className="bg-emerald-500 rounded-full p-0.5">
                                <CheckCircle2 className="h-5 w-5 text-white" />
                              </div>
                            ) : (
                              <div className="border-2 border-slate-200 rounded-full p-0.5 group-hover:border-indigo-400 transition-colors">
                                <Circle className="h-5 w-5 text-transparent" />
                              </div>
                            )}
                          </button>
                        </form>
                        <span
                          className={`text-slate-700 font-medium transition-all duration-300 break-all ${
                            todo.completed ? 'line-through text-slate-400' : ''
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
                          className="h-9 w-9 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </form>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <footer className="text-center space-y-4 pt-4">
          <p className="text-slate-400 text-sm font-medium">
            Keep moving forward. One task at a time.
          </p>
          <div className="h-1 w-12 bg-indigo-100 rounded-full mx-auto" />
        </footer>
      </div>
    </main>
  );
}

