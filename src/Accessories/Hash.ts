/**
 * #path#window#json#
 */
class Hash {
    /**
     * HashPath
     */
    public static get HashPath() {
        return Hash.hashPath;
    }
    public static set HashPath(v: string) {
        Hash.hashPath = v;
        Hash.setHash();
    }
    private static hashPath: string = '';

    /**
     * HashWindow
     */
    public static get HashWindow() {
        return Hash.hashWindow;
    }
    public static set HashWindow(v: string) {
        Hash.hashWindow = v;
        Hash.setHash();
    }
    private static hashWindow: string = '';

    /**
     * HashJson
     */
    public static get HashJson() {
        return Hash.hashJson;
    }
    public static set HashJson(v: string) {
        Hash.hashJson = v;
        Hash.setHash();
    }
    private static hashJson: string = '';

    
    public static Paths: string[] = [];
    public static Json: any = undefined;



    /**
     * ParseHash
     */
    public static ParseHash() {
        let hash = window.location.hash;
        if (window.location.hash.startsWith('#')) {
            hash = window.location.hash.substring(1);
        }
        const hahses = hash.split('#');
        Hash.hashPath = hahses[0] ?? '';
        Hash.hashWindow = hahses[1] ?? '';
        Hash.hashJson = hahses[2] ?? '';

        // Window
        const exprs = Hash.HashWindow.split(';');
        for (let iE = 0; iE < exprs.length; iE++) {
            const expr = exprs[iE];
            if (expr) {
                eval('window.' + expr);
            }
        }
        
        // Path
        Hash.Paths = Hash.HashPath.split('/').filter(t => t);

        // Json
        try {
            Hash.Json = JSON.parse(Hash.Base64ToUtf8(Hash.HashJson));
        } catch (error) {
            Hash.Json = undefined;
        }


    }

    /**
     * 
     * @param paths 
     */
    public static GetJsonHashValue(paths: string[] = []): any {
        let obj = Hash.Json;
        if (obj === null || obj === undefined) {
            return obj;
        }
        // ini obj
        let cObj = obj;
        for (let iP = 0; iP < paths.length; iP++) {
            const path = paths[iP];
            if (cObj[path] === null || cObj[path] === undefined) {
                return undefined;
            } else {
                cObj = cObj[path];
            }
        }
        // return
        return cObj;
    }

    /**
     * 
     * @param paths 
     * @param value 
     */
    public static SetJsonHashValue(paths: string[] = [], value: any) {
        let obj = Hash.Json;
        if (obj === undefined) {
            obj = {};
        }
        if (paths.length) {
            let cObj = obj;
            for (let iP = 0; iP < paths.length - 1; iP++) {
                const path = paths[iP];

                if (!(typeof cObj === 'object' && !(cObj === null))) {
                    Object.assign(cObj, {});
                }
                if (cObj[path] === undefined) {
                    cObj[path] = {};
                }
                cObj = cObj[path];
            }
            if (value === undefined) {
                delete cObj[paths.pop()!];
            } else {
                cObj[paths.pop()!] = value;
            }
            // hash
            console.log(JSON.stringify(obj));
            Hash.HashJson = Hash.Utf8ToBase64(JSON.stringify(obj));
        } else {
            if (value === undefined) {

            } else {
                obj = value;
                // hash
                console.log(JSON.stringify(obj));
                Hash.HashJson = Hash.Utf8ToBase64(JSON.stringify(obj));
            }
        }
    }

    /**
     * 
     * @param str value
     */
    public static Utf8ToBase64(str: string) {
        return btoa(unescape(encodeURIComponent(str)));
    }
    /**
     * 
     * @param str code
     */
    public static Base64ToUtf8(str: string) {
        return decodeURIComponent(escape(atob(str)));
    }


    
    private static setHash() {
        window.location.hash = '#' + Hash.HashPath + '#' + Hash.HashWindow + '#' + Hash.HashJson + '#';
    }

}
