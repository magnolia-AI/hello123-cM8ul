'use client';

import { useTransition } from 'react';
import { toggleTodo, deleteTodo } from '@/app/actions/todo-actions';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Todo } from '@/lib/schema';

interface TodoItemProps {
  todo: Todo;
}

export function TodoItem({ todo }: TodoItemProps) {
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    startTransition(async () => {
      await toggleTodo(todo.id, todo.completed);
    });
  };

  const handleDelete = () => {
    startTransition(async () => {
      await deleteTodo(todo.id);
    });
  };

  return (
    <div className={cn(
      "flex items-center justify-between p-4 border rounded-lg bg-card transition-opacity",
      isPending && "opacity-50"
    )}>
      <div className="flex items-center space-x-3">
        <Checkbox 
          id={`todo-${todo.id}`} 
          checked={todo.completed} 
          onCheckedChange={handleToggle}
          disabled={isPending}
        />
        <label 
          htmlFor={`todo-${todo.id}`}
          className={cn(
            "text-sm font-medium leading-none cursor-pointer",
            todo.completed && "line-through text-muted-foreground"
          )}
        >
          {todo.task}
        </label>
      </div>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={handleDelete}
        disabled={isPending}
        className="text-destructive hover:text-destructive hover:bg-destructive/10"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
