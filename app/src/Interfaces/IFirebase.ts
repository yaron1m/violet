export default interface IFirebase {
    loggedIn?: boolean;
    userId?: string;
    displayName: string;
    photoURL: string;
    isSuperUser: boolean;
}