class Entry {
    public static RootDiv: HTMLDivElement;
    public static HideDiv: HTMLDivElement;
    
    public static Path: string = '';

    public static async Init() {
        await DomLoader.LoadScript('Accessories/Cookie.js');
        await DomLoader.LoadScript('Accessories/FileSystem.js');
        await DomLoader.LoadScript('Accessories/Guid.js');
        await DomLoader.LoadScript('Accessories/HttpClient.js');
        await DomLoader.LoadScript('Accessories/Type.js');
        await DomLoader.LoadScript('Accessories/Hash.js');
        // Hash
        Hash.ParseHash();
        Entry.Path = Hash.HashPath;
        window.onhashchange = (ev: HashChangeEvent) => {
            const oldpath = Entry.Path;
            Hash.ParseHash();
            const newpath = Hash.HashPath;
            Entry.Path = Hash.HashPath;
            if (!(newpath === oldpath)) {
                window.location.reload();
            }
        }

        // env
        await DomLoader.LoadScript('Scripts/Environment.js');
        const env = window['env'] ?? '';
        await Environment.Init(env);

        // rootDiv
        Entry.RootDiv = document.createElement('div');
        Entry.RootDiv.className = 'root';
        document.body.appendChild(Entry.RootDiv);

        // hideDiv
        Entry.HideDiv = document.createElement('div');
        Entry.HideDiv.className = 'hide';
        document.body.appendChild(Entry.HideDiv);

        // content
        Entry.RootDiv.innerHTML = '<h1>ChuiTu</h1>';

    }
}


Entry.Init();
