export interface NavigationItem {
    id: string,
    title: string,
    link: string[],
    hidden?: boolean,
    shown?: boolean,
    disabled?: boolean
}