# 📝 Full-Stack Todo App

A basic full-stack Todo app built with:

- **React (Vite)** — frontend  
- **Node.js + Express** — backend  
- **CSS Modules** — styling  
- ✅ Form validation + user state handling



## ⚡ How to set up?

### 1. Start the Backend
Navigate to backend folder, install dependencies and run the server:
```bash
cd backend
yarn install
yarn start
```
The server should run at: http://localhost:5000 (edit in server.ts)

### 2. Start the Frontend
On the second terminal do the same:
~~~bash 
cd frontend
yarn install
yarn dev
~~~
Opens at: http://localhost:5173 (by default)

## 🧪 How to run the UI tests?
We have to navigate to UI tests directory at ```frontend/__ui__```, run the ```yarn``` command and start the tests with ```yarn test```.

## Now how do I run backend tests?
Almost pretty the same steps, but this time, you have to navigate to backend folder:
```
cd backend
yarn test
```

## ✅ Features
- Register and login with basic validation
- Add, update, complete, and delete todos
- Field-by-field validation feedback
- No DB (memory only)
- Built with hooks + SCSS modules
- Easy to test with Playwright
- Integrated to GitHub Actions