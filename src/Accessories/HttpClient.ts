/**
 * HttpClient
 */
class HttpClient {
    /**
     * Http
     * @param method 
     * @param url 
     * @param body 
     * @param headers 
     */
    public static Http(method: string, url: string, body: Document | BodyInit | null = null, headers: { [key: string]: string } = {}) {
        const promise = new Promise<string>((resolve, reject) => {
            var anHttpRequest = new XMLHttpRequest();
            anHttpRequest.withCredentials = true;
            anHttpRequest.onreadystatechange = () => {
                if (anHttpRequest.readyState === 4) {
                    if (anHttpRequest.status === 200 || anHttpRequest.status === 0) {
                        resolve(anHttpRequest.responseText);
                    } else {
                        reject(anHttpRequest.response);
                    }
                }
            }
            anHttpRequest.open(method, url, true);
            const keys = Object.keys(headers);
            for (let iK = 0; iK < keys.length; iK++) {
                const key = keys[iK];
                anHttpRequest.setRequestHeader(key, headers[key]);
            }
            anHttpRequest.send(body);
        });
        return promise;
    }

    /**
     * Get
     * @param url 
     */
    public static Get(url: string) {
        return HttpClient.Http('GET', url);
    }

    /**
     * Post
     * @param url 
     * @param body 
     * @param headers 
     */
    public static Post(url: string, body: any = {}, headers: { [key: string]: string } = { "Content-Type": "application/json" }) {
        return HttpClient.Http('POST', url, body, headers);
    }
}
