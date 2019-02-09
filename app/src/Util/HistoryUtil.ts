import history from "./History"

export function redirect(path){
    if (history.location.pathname !== path)
        history.push(path);
}