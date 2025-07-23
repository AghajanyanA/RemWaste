type UsersType = {
    username: string;
    id: number;
    email: string;
    password: string;
    todos: {
        id: number;
        title: string;
        completed: boolean;
    }[]
}[]

export type { UsersType };
