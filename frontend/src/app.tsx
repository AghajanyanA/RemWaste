import React, { useState } from 'react';
import AuthForm from './components/authForm/authForm';
import TodoList from './components/todoList/todoList';
import style from './app.module.css'

function App() {
  const [username, setUsername] = useState<string | null>(null);

  return (
    <main className={style.main}>
      {username ? <TodoList username={username} /> : <AuthForm onAuthSuccess={setUsername} />}
    </main>
  );
}

export default App;