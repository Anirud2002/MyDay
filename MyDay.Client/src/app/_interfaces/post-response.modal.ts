import { Comments } from "./comments.modal";

export interface PostReponse{
    postID: string,
    firstName: string,
    lastName: string,
    userName: string,
    postedOn: string,
    body: string,
    category: string,
    hashtags: string[],
    Likes: number,
    Comments: Comments[],
    LikedBy: string[]
}