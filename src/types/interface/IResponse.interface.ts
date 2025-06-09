export interface ResponseMessageEntity {
  code: number
  status: boolean
  message: string
}

export interface ResponseEntity<T> extends ResponseMessageEntity {
  data: T
}
