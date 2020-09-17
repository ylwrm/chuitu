class DomLoader {
    private static mapsIdNode = new Map<string, Promise<any>>();
    /**
     * 
     * @param scriptUrl 
     */
    public static LoadScript(scriptUrl: string) {
        const em = document.getElementById(scriptUrl);
        const pr = DomLoader.mapsIdNode.get(scriptUrl);
        if (!em) {
            if (pr) {
                return pr;
            } else {
                const script = document.createElement('script');
                script.src = scriptUrl;
                const prmi = new Promise((resolve, reject) => {
                    const newResolve = () => {
                        script.id = scriptUrl;
                        DomLoader.mapsIdNode.delete(scriptUrl);
                        resolve();
                    };
                    script.onload = newResolve;
                    script.onerror = newResolve;
                });
                DomLoader.mapsIdNode.set(scriptUrl, prmi);
                document.body.appendChild(script);
                return prmi;
            }
        }
    }

    /**
     * 
     * @param cssUrl 
     */
    public static LoadCss(cssUrl: string) {
        const em = document.getElementById(cssUrl);
        const pr = DomLoader.mapsIdNode.get(cssUrl);
        if (!em) {
            if (pr) {
                return pr;
            } else {
                const link = document.createElement('link');
                link.rel = 'stylesheet'
                link.href = cssUrl;
                const prmi = new Promise((resolve, reject) => {
                    const newResolve = () => {
                        link.id = cssUrl;
                        DomLoader.mapsIdNode.delete(cssUrl);
                        resolve();
                    };
                    link.onload = newResolve;
                    link.onerror = newResolve;
                });
                DomLoader.mapsIdNode.set(cssUrl, prmi);
                document.body.appendChild(link);
                return prmi;
            }
        }
    }
}
