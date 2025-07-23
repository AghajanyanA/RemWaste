import React, { useEffect, useState } from 'react';
import { addTodo, deleteTodo, fetchTodos, updateTodo } from '../../api/axios';
import styles from './TodoList.module.css';
import type { TodoType } from '../../types';

interface Props {
  username: string;
}

const TodoList = ({ username }: Props) => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTodos(username)
      .then((res: { data: TodoType[] }) => setTodos(res.data))
      .catch(() => setError('Failed to load todos'));
  }, [username]);

  const handleAdd = async () => {
    if (!newTitle.trim()) return;
    try {
      const res = await addTodo(username, newTitle);
      setTodos(prev => [...prev, res.data]);
      setNewTitle('');
      setError('');
    } catch {
      setError('Failed to add todo');
    }
  };

  const handleAddOnKeyDown = async (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
    try {
      const res = await addTodo(username, newTitle);
      setTodos(prev => [...prev, res.data]);
      setNewTitle('');
      setError('');
    } catch {
      setError('Failed to add todo');
    }
    }
  }

  const toggleComplete = async (todo: TodoType) => {
    try {
      const updated = await updateTodo(username, todo.id, { completed: !todo.completed });
      setTodos(prev => prev.map(t => (t.id === todo.id ? updated.data : t)));
      setError('');
    } catch(err: any) {
      setError(err.response.data.message || 'Failed to update todo');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTodo(username, id);
      setTodos(prev => prev.filter(t => t.id !== id));
      setError('');
    } catch {
      setError('Failed to delete todo');
    }
  };

  return (
    <section className={styles.container} aria-label="Todo list">
      <h2 className={styles.title}>Your Todos</h2>

      <div className={styles.addContainer}>
        <label htmlFor="new-todo" className={styles.visuallyHidden}>New todo</label>
        <input
          onKeyDown={handleAddOnKeyDown}
          id="new-todo"
          type="text"
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
          placeholder="Add new todo"
          className={styles.input}
          aria-label="Add new todo"
          data-testid="new-todo-input"
        />
        <button
          onClick={handleAdd}
          className={styles.button}
          data-testid="add-todo-button"
          aria-label="Add todo"
          disabled={newTitle.trim().length === 0}
          aria-disabled={newTitle.trim().length === 0}>
          Add
        </button>
      </div>

      {error && (
        <div className={styles.error} role="alert" data-testid="todo-error">
          {error}
        </div>
      )}

      <ul className={styles.list} role="list" aria-live="polite" data-testid="todo-list">
        {todos.map(todo => (
          <li
            key={todo.id}
            className={`${styles.item} ${todo.completed ? styles.completed : ''}`}
            data-testid={`todo-item-${todo.id}`}
          >
            <input
              type="checkbox"
              id={`todo-checkbox-${todo.id}`}
              checked={todo.completed}
              onChange={() => toggleComplete(todo)}
              aria-checked={todo.completed}
              aria-label={`Mark todo '${todo.title}' as completed`}
              data-testid={`todo-checkbox-${todo.id}`}
            />
            <label htmlFor={`todo-checkbox-${todo.id}`} className={styles.label}>
              {todo.title}
            </label>
            <button
              onClick={() => handleDelete(todo.id)}
              className={styles.deleteButton}
              aria-label={`Delete todo '${todo.title}'`}
              data-testid={`todo-delete-${todo.id}`}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TodoList;
