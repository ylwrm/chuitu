class Global {
    public static Controls: FrontComponent[] = [];

    public static CreateFrontComponent = async (
        div: HTMLDivElement,
        frontComponentSetting: Front.FrontComponentSetting,
        parent?: FrontComponent
    ) => {
        const typeFullName = frontComponentSetting.type
        try {
            // Load Component
            const paths = typeFullName.split('/');
            const typeName = paths[paths.length - 1];
            await DomLoader.LoadScript(
                typeFullName + '.js'
            );

            // CreateInstance
            const control = await (window[typeName] as typeof FrontComponent)
                .CreateInstance(div, frontComponentSetting, parent);

            // Push
            Global.Controls.push(control);

            // Return
            return control;
        } catch (error) {
            console.error(error);
            throw new Error(`[${typeFullName}]创建失败!`)
        }
    }

}
