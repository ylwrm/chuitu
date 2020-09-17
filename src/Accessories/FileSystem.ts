class FileSystem {
    /**
     * 
     * @param url 
     */
    public static async GetFileSystems(url: string) {
        let fses: Accessory.FileSystemItem[] = [];
        const resp = await HttpClient.Get(url + '/' + '__fs.json');
        fses = JSON.parse(resp) ;
        return fses;
    }
}