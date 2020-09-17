class FrontComponent {
    /**
     * 
     */
    public Name: string;

    /**
     * 
     */
    public ControlInsts: FrontComponent[] = [];

    /**
     * 
     * @param div 
     * @param setting 
     * @param parent 
     */
    constructor(
        public div: HTMLDivElement,
        public setting: Front.FrontComponentSetting,
        public parent?: FrontComponent
    ) {
        // Div
        const instDiv = document.createElement('div');
        instDiv.style.width = '100%';
        instDiv.style.height = '100%';
        instDiv.style.boxSizing = 'border-box';
        div.appendChild(instDiv);

        this.div = instDiv;
        this.Name = setting.name;
        
        parent?.ControlInsts.push(this);
    }


    /**
     * 
     */
    public GetPaths() {
        const paths: string[] = [];
        let current: FrontComponent | undefined = this;
        while (current) {
            paths.splice(0, 0, current.Name ?? '');
            current = current.parent;
        }
        return paths;
    }


    /**
     * 
     * @param div 
     * @param setting 
     * @param parent 
     */
    public static async CreateInstance(
        div: HTMLDivElement,
        setting: Front.FrontComponentSetting,
        parent?: FrontComponent
    ) {
        const obj = new FrontComponent(div, setting, parent);
        return obj;
    }


    /**
     * Hash
     */
    public get Hash(): any {
        return Hash.GetJsonHashValue([...this.GetPaths(), 'data'])
    }
    public set Hash(v: any) {
        if (v === undefined) {
            Hash.SetJsonHashValue([...this.GetPaths()], v)
        } else {
            Hash.SetJsonHashValue([...this.GetPaths(), 'data'], v)
        }
    }



    /**
     * Destroy
     */
    public async Destroy() {
        // Clear Hash
        this.Hash = undefined;
        // Clear Global.Controls
        Global.Controls.splice(Global.Controls.indexOf(this), 1);
        // Clear parent.Controls
        this.parent?.ControlInsts.splice(this.parent?.ControlInsts.indexOf(this), 1);
        // Clear div
        this.div.parentElement?.removeChild(this.div);
    }
}