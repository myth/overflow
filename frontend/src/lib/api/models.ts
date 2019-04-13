export interface User {
    username: string,
    first_name: string,
    last_name: string,
    email: string,
}

export type Tag = number[];

export interface Post {
    title: string,
    author: User,
    description: string,
    published: string,
    edited: string,
    content: string,
    tags: Tag[]
}
