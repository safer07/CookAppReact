export type HttpErrorResponse = { message: string; errors: { message: string }[] }
export type ZodErrorResponse = { message: string; errors: { message: string; path: string }[] }
