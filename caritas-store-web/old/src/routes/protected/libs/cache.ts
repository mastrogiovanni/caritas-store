
export async function getOrExecute(key: string, method) {
    try {
        const item = get(key);
        if (item) {
            console.log("Using cache: " + item);
            return JSON.parse(item);
        }
        else {
            const result = await method();
            set(key, JSON.stringify(result), 60 * 10);
            return result;
        }
    }
    catch (e) {
        console.log(e);
    }
    return undefined;
}

export function set(key: string, value: string, seconds: number) {
    localStorage.setItem(key, value);
    localStorage.setItem(key + ".expire", "" + (Date.now() + seconds * 1000));
}

export function get(key: string) {
    const expire: number = +localStorage.getItem(key + ".expire");
    if (expire < Date.now()) {
        localStorage.removeItem(key);
        localStorage.removeItem(key + ".expire");
    }
    else {
        return localStorage.getItem(key);
    }
}