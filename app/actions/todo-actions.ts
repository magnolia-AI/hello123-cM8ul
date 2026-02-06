'use server';

import db from '@/lib/db';
import { todos } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function getTodos() {
  try {
    return await db.select().from(todos).orderBy(todos.createdAt);
  } catch (error) {
    console.error('Failed to fetch todos:', error);
    return [];
  }
}

export async function addTodo(formData: FormData) {
  const task = formData.get('task') as string;
  if (!task || task.trim() === '') return;

  try {
    await db.insert(todos).values({
      task,
    });
    revalidatePath('/');
  } catch (error) {
    console.error('Failed to add todo:', error);
  }
}

export async function toggleTodo(id: number, completed: boolean) {
  try {
    await db.update(todos)
      .set({ completed: !completed, updatedAt: new Date() })
      .where(eq(todos.id, id));
    revalidatePath('/');
  } catch (error) {
    console.error('Failed to toggle todo:', error);
  }
}

export async function deleteTodo(id: number) {
  try {
    await db.delete(todos).where(eq(todos.id, id));
    revalidatePath('/');
  } catch (error) {
    console.error('Failed to delete todo:', error);
  }
}
