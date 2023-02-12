import { Comments } from "./comments.modal";

export interface PostReponse{
    postID: string,
    firstName: string,
    lastName: string,
    userName: string,
    postedOn: number,
    body: string,
    category: string,
    hashtags: string[],
    likes: number,
    comments: Comments[],
    likedBy: string[]
}