export function redirect(history, path){
    if(history.location.pathname !== path)
        history.push(path);
}