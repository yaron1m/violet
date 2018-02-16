import {history} from "../routes";

export function redirect(path){
    if(history.location.pathname !== path)
        history.push(path);
}