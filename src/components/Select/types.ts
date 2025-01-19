export interface SelectItemType<T> {
    uniqueId?: string;
    text: string;
    value: T | any;
}

export interface SelectProps<T> {
    items: SelectItemType<T>[];

    placeholder: string;

    currentItem: SelectItemType<T> | null;

    setCurrentItem: (value: any | null) => void;

    type?: "default" | "text"
}
