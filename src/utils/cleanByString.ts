export default (name:string, stringsArr: string[]):string => {
    for (let keyword of stringsArr) {
        keyword = keyword.trim();
        if (keyword.length < 1) {
            continue;
        };
        let expString = keyword;
        const expression = new RegExp(`${expString}`, "i");
        name = name.replace(expression, '').trim();
    }
    return name.trim();
};