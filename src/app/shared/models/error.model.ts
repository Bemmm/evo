export interface Error {
    code: string,
    type: string,
    text: string,
}

export interface ErrorResponse {
    success: boolean,
    messages: Error[]
}
