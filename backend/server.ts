import express from 'express';
import type { UsersType } from "./types";

const { v7: uuidv7 } = require('uuid');
const cors = require('cors');
const app = express();

const PORT = 5000;

app.use(cors());
app.use(express.json());


const users: UsersType = [];

app.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Missing fields' });
  }
  if (users.find(u => u.username === username || u.email === email)) {
    return res.status(400).json({ message: 'User or email already exists' });
  }
  const newUser = {
    username,
    id: uuidv7(),
    email,
    password,
    todos: [],
  };
  users.push(newUser);
  res.json({ message: 'Registered successfully' });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Missing username or password' });
  }
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  // Return user info without password
  const { password: _, ...userWithoutPassword } = user;
  res.json(userWithoutPassword);
});

app.get('/todos', (req, res) => {
  const { username } = req.query;
  if (!username) return res.status(400).json({ message: 'Missing username' });

  const user = users.find(u => u.username === username);
  if (!user) return res.status(404).json({ message: 'User not found' });

  res.json(user.todos);
});

app.post('/todos', (req, res) => {
  const { username, title } = req.body;
  if (!username || !title) return res.status(400).json({ message: 'Missing fields' });

  const user = users.find(u => u.username === username);
  if (!user) return res.status(404).json({ message: 'User not found' });

  const newTodo = {
    id: user.todos.length,
    title,
    completed: false,
  };
  user.todos.push(newTodo);
  res.json(newTodo);
});

app.put('/todos/:todoId', (req, res) => {
  const { todoId } = req.params;
  const { username, title, completed } = req.body;
  if (!username) return res.status(400).json({ message: 'Missing username' });

  const user = users.find(u => u.username === username);
  if (!user) return res.status(404).json({ message: 'User not found' });

  const todo = user.todos.find(todo => todo.id === Number(todoId));
  if (!todo) return res.status(404).json({ message: 'Todo not found' });

  if (typeof title === 'string') todo.title = title;
  if (typeof completed === 'boolean') todo.completed = completed;

  res.json(todo);
});

app.delete('/todos/:todoId', (req, res) => {
  const { todoId } = req.params;
  const { username } = req.query;

  if (!username) return res.status(400).json({ message: 'Missing username' });

  const user = users.find(u => u.username === username);
  if (!user) return res.status(404).json({ message: 'User not found' });

  const todoIndex = user.todos.findIndex(t => t.id === Number(todoId));
  if (todoIndex === -1) return res.status(404).json({ message: 'Todo not found' });

  user.todos.splice(todoIndex, 1);
  res.json({ message: 'Todo deleted' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = { app, users }