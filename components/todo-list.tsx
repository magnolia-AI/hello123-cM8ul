'use client';

import { useRef, useTransition } from 'react';
import { addTodo } from '@/app/actions/todo-actions';
import { TodoItem } from './todo-item';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { Todo } from '@/lib/schema';

interface TodoListProps {
  initialTodos: Todo[];
}

export function TodoList({ initialTodos }: TodoListProps) {
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  const action = (formData: FormData) => {
    startTransition(async () => {
      await addTodo(formData);
      formRef.current?.reset();
    });
  };

  const completedCount = initialTodos.filter(t => t.completed).length;

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex justify-between items-center">
          Todos
          <span className="text-sm font-normal text-muted-foreground bg-muted px-2 py-1 rounded">
            {completedCount}/{initialTodos.length}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <form ref={formRef} action={action} className="flex space-x-2">
          <Input 
            name="task" 
            placeholder="What needs to be done?" 
            required 
            disabled={isPending}
            className="flex-1"
          />
          <Button type="submit" disabled={isPending} size="icon">
            <Plus className="h-4 w-4" />
          </Button>
        </form>

        <div className="space-y-3">
          {initialTodos.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground border border-dashed rounded-lg">
              No tasks yet. Add one to get started!
            </div>
          ) : (
            initialTodos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
