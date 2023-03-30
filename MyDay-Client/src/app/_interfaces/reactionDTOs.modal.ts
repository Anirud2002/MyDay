export interface CommentDTO{
    postID: string, 
    comment: string, 
    userName: string, 
    postCreatedDate: number
}

export interface LikeDTO{
    postID: string, 
    postCreatedDate: number,
    isLiked: boolean
}