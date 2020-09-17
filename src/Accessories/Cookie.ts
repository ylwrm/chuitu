class Cookie {
    public static GetValue(cookieName: string) {
        let cookieValue = "";
        let result;
        let re = /([^ =]*)=([^;]*)/g;
        while ((result = re.exec(document.cookie)) !== null) {
            const name = result[1];
            const value = result[2];
            if (name === cookieName) {
                cookieValue = value;
                break;
            }
        }
        return cookieValue;
    }
    public static SetValue(cookieName: string, cookieValue: string, date?: Date, path: string = '/', domain: string | undefined = undefined) {
        let cookie = cookieName + '=' + cookieValue;
        if (date) {
            cookie += ';expires=' + (date as any).toGMTString();
        }
        if (path) {
            cookie += ';path=' + path;
        }
        if (domain) {
            cookie += ';domain=' + domain;
        }
        console.log(cookie);
        document.cookie = cookie;
    }
}