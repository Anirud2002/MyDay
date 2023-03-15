import { Comment } from "./comment.modal";
import { Photo } from "./user-details.modal";

export interface PostReponse{
    postID: string,
    firstName: string,
    lastName: string,
    userName: string,
    postedOn: number,
    creatorPic: Photo,
    body: string,
    category: string,
    hashtags: string[],
    likes: number,
    comments: Comment[],
    likedBy: string[]
}