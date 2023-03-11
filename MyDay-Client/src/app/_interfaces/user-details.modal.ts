export interface UserDetails{
    userName: string,
    email: string,
    profilePic: Photo,
    firstName: string,
    lastName: string,
    joined: Date,
    city: string,
    links: string[],
    description: string
}

export interface Photo{
    url: string,
    publicID: string
}