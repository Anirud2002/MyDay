export interface UserDetails{
    userName: string,
    email: string,
    profilePic: {
        url: string,
        publicID: string,
    },
    firstName: string,
    lastName: string,
    joined: Date,
    city: string,
    links: string[],
    description: string
}