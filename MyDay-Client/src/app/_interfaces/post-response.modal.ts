import { Comment } from "./comment.modal";

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
    comments: Comment[],
    likedBy: string[]
}