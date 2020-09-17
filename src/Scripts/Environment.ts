class Environment {
    /**
     * 
     */
    public static Setting: Environment.Setting;

    /**
     * 
     * @param name 
     */
    public static async Init(name = '') {
        const strContext = await HttpClient.Get('Setting/Environment' + name + '.json');
        Environment.Setting = JSON.parse(strContext);
        if (Environment.Setting && typeof Environment.Setting === 'object') {
            const keys = Object.keys(Environment.Setting);
            for (let iK = 0; iK < keys.length; iK++) {
                const key = keys[iK];
                let value = Environment.Setting[key];
                if (typeof value === 'string') {
                    value = value
                        .split('${origin}')
                        .join(document.location.origin)
                        .split('${hostname}')
                        .join(document.location.hostname)
                        .split('${port}')
                        .join(document.location.port);
                    Environment.Setting[key] = value;
                }
            }
        }
    }
}