interface ReplaceToSelectType {
    textKey: string;
    valueKey: string;
    array: any;
}

const replaceToSelectHandler = ({
    textKey,
    valueKey,
    array,
}: ReplaceToSelectType) => {
    return array.map((item: any) => ({
        ...item,
        text: item[textKey],
        value: item[valueKey],
    }));
};

export default replaceToSelectHandler;
