const { expect } = require('chai');
const request = require('supertest');
const { app, users } = require('../server');

beforeEach(()=> {
    users.length = 0;
});

describe('Users API', () => {
    describe('POST /register', () => {
        it('registers a new user', async () => {
            const res = await request(app)
                .post('/register')
                .send({ username: 'user1', email: 'user1@mail.com', password: 'pass' })
                .expect(200);
            expect(res.body).to.have.property('message', 'Registered successfully');
        });

        it('fails if missing required fields', async () => {
            await request(app)
                .post('/register')
                .send({ username: 'user2' })
                .expect(400);
        });

        it('fails if username or email is taken', async () => {
            await request(app)
                .post('/register')
                .send({ username: 'user1', email: 'user1@mail.com', password: 'pass' });

            await request(app)
                .post('/register')
                .send({ username: 'user1', email: 'new@mail.com', password: 'pass' })
                .expect(400);

            await request(app)
                .post('/register')
                .send({ username: 'newuser', email: 'user1@mail.com', password: 'pass' })
                .expect(400);
        });
    });

    describe('POST /login', () => {
        beforeEach(async () => {
            await request(app)
                .post('/register')
                .send({ username: 'user3', email: 'user3@mail.com', password: 'testpass' });
        });

        it('logs in a registered user', async () => {
            const res = await request(app)
                .post('/login')
                .send({ username: 'user3', password: 'testpass' })
                .expect(200);

            expect(res.body).to.have.property('username', 'user3');
            expect(res.body).to.have.property('email', 'user3@mail.com');
            expect(res.body).to.not.have.property('password');
            expect(res.body).to.have.property('todos').that.is.an('array');
        });

        it('rejects invalid credentials', async () => {
            await request(app)
                .post('/login')
                .send({ username: 'user3', password: 'wrongpass' })
                .expect(401);

            await request(app)
                .post('/login')
                .send({ username: 'noexist', password: 'testpass' })
                .expect(401);
        });

        it('fails if missing username or password', async () => {
            await request(app)
                .post('/login')
                .send({ username: 'user3' })
                .expect(400);

            await request(app)
                .post('/login')
                .send({ password: 'testpass' })
                .expect(400);
        });
    });

    describe('POST /todos', () => {

        beforeEach(async () => {
            await request(app)
                .post('/register')
                .send({ username: 'todoUser', email: 'todo@mail.com', password: 'pass' });
        });

        it('adds a new todo for the user', async () => {
            const res = await request(app)
                .post('/todos')
                .send({ username: 'todoUser', title: 'Test Todo' })
                .expect(200);

            expect(res.body).to.have.property('id', 0);
            expect(res.body).to.have.property('title', 'Test Todo');
            expect(res.body).to.have.property('completed', false);
        });

        it('fails if missing fields', async () => {
            await request(app)
                .post('/todos')
                .send({ username: 'todoUser' })
                .expect(400);

            await request(app)
                .post('/todos')
                .send({ title: 'No User' })
                .expect(400);
        });

        it('fails if user not found', async () => {
            await request(app)
                .post('/todos')
                .send({ username: 'nonexistent', title: 'Test' })
                .expect(404);
        });
    });

    describe('GET /todos', () => {
        beforeEach(async () => {
            await request(app)
                .post('/register')
                .send({ username: 'listUser', email: 'list@mail.com', password: 'pass' });
            await request(app)
                .post('/todos')
                .send({ username: 'listUser', title: 'First Todo' });
            await request(app)
                .post('/todos')
                .send({ username: 'listUser', title: 'Second Todo' });
        });

        it('lists todos for a user', async () => {
            const res = await request(app)
                .get('/todos?username=listUser')
                .expect(200);

            expect(res.body).to.be.an('array').with.lengthOf(2);
            expect(res.body[0]).to.have.property('title', 'First Todo');
            expect(res.body[1]).to.have.property('title', 'Second Todo');
        });

        it('fails if missing username', async () => {
            await request(app)
                .get('/todos')
                .expect(400);
        });

        it('fails if user not found', async () => {
            await request(app)
                .get('/todos?username=nonexistent')
                .expect(404);
        });
    });

    describe('PUT /todos/:todoId', () => {
        let username = 'putUser';

        beforeEach(async () => {
            await request(app)
                .post('/register')
                .send({ username, email: 'put@mail.com', password: 'pass' });
            await request(app)
                .post('/todos')
                .send({ username, title: 'Todo to Update' });
        });

        it('updates a todo title', async () => {
            const res = await request(app)
                .put('/todos/0')
                .send({ username, title: 'New Title' })
                .expect(200);

            expect(res.body).to.have.property('title', 'New Title');
        });

        it('updates a todo completion status', async () => {
            const res = await request(app)
                .put('/todos/0')
                .send({ username, completed: true })
                .expect(200);

            expect(res.body).to.have.property('completed', true);
        });

        it('updates both title and completion status', async () => {
            const res = await request(app)
                .put('/todos/0')
                .send({ username, title: 'Updated', completed: true })
                .expect(200);

            expect(res.body).to.have.property('title', 'Updated');
            expect(res.body).to.have.property('completed', true);
        });

        it('fails if missing username', async () => {
            await request(app)
                .put('/todos/0')
                .send({ title: 'New Title' })
                .expect(400);
        });

        it('fails if user not found', async () => {
            await request(app)
                .put('/todos/0')
                .send({ username: 'nonexistent', title: 'New Title' })
                .expect(404);
        });

        it('fails if todo not found', async () => {
            await request(app)
                .put('/todos/999')
                .send({ username, title: 'New Title' })
                .expect(404);
        });
    });

    describe('DELETE /todos/:todoId', () => {
        let username = 'deleteUser';

        beforeEach(async () => {
            await request(app)
                .post('/register')
                .send({ username, email: 'delete@mail.com', password: 'pass' });
            await request(app)
                .post('/todos')
                .send({ username, title: 'Todo to Delete' });
        });

        it('deletes a todo', async () => {
            const res = await request(app)
                .delete('/todos/0?username=' + username)
                .expect(200);

            expect(res.body).to.have.property('message', 'Todo deleted');

            const todosRes = await request(app)
                .get('/todos?username=' + username)
                .expect(200);

            expect(todosRes.body).to.be.an('array').that.is.empty;
        });

        it('fails if missing username', async () => {
            await request(app)
                .delete('/todos/0')
                .expect(400);
        });

        it('fails if user not found', async () => {
            await request(app)
                .delete('/todos/0?username=nonexistent')
                .expect(404);
        });

        it('fails if todo not found', async () => {
            await request(app)
                .delete('/todos/999?username=' + username)
                .expect(404);
        });
    });
});
