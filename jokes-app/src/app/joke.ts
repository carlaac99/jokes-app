export interface Joke {
    id: number,
    category: string,
    joke: string,
    lang:string,
    likes: number,
    dislikes: number
    comments: string[][]
}
