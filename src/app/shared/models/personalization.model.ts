export interface PersonalizationText {
    value: string | null,
    font: string | null,
    size?: string | null,
    scaleY: number | null,
    aligment: string | null,
    visible?: boolean | null,
    color: string | null
}

export interface PersonalizationIcon {
    key: string | null,
    aligment: string | null,
    color: string | null,
    visible: boolean | null
}

export interface PersonalizationSubstrate {
    visible: string | null,
    opacity: number | null,
    color: string | null,
}

export interface PersonalizationBackground {
    key: string,
    name?: string,
    src?: string
}

export interface PersonalizationState {
    documentId?: string,
    backgroundKey: string | null,
    backgroundName: string | null,
    background: string | null,
    text: PersonalizationText | null,
    icon: PersonalizationIcon | null,
    substrate: PersonalizationSubstrate | null
}