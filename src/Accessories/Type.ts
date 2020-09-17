class Type {
    /**
     * GetType
     * @param value 
     */
    public static GetType(value: any):
        'null' | 'string' | 'number' | 'boolean' | 'Array' | 'Object' | 'unknown' {
        if (value === null) {
            return 'null';
        } else if (typeof value === 'string') {
            return 'string';
        } else if (typeof value === 'number') {
            return 'number';
        } else if (typeof value === 'boolean') {
            return 'boolean';
        } else if (value instanceof Array) {
            return 'Array';
        } else if (value instanceof Object) {
            return 'Object';
        }
        return 'unknown';
    }
    
    /**
     * GetValueByPath
     * @param obj 
     * @param paths 
     */
    public static GetValueByPath(obj: any, paths: string[]) {
        let cObj = obj;
        for (let iP = 0; iP < paths.length; iP++) {
            const path = paths[iP];
            try {
                cObj = cObj[path];
            } catch (error) {
                return undefined;
            }
        }
        return cObj;
    }
}
