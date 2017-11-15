export class CustomTableOptions {
    cols: any[];
    subTableOptions?: CustomTableOptions;
}

export class CustomTableData {
    rows: any[];
    isSubTable?: boolean;
    first?:boolean
    last?: boolean
}