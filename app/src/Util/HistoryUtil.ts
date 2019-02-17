import history from "./History";
import {Path} from "../Pages/Path";

export function redirect(path: Path) {
    if (history.location.pathname !== path)
        history.push(path);
}