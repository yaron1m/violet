import history from "./History"

export function redirect(path: string){
    if (history.location.pathname !== path)
        history.push(path);
}