export const VALID_EMAIL = 'user'
export const VALID_PASSWORD = '123'

export function checkCredentials(email: string, password: string): boolean {
  return email.trim().toLowerCase() === VALID_EMAIL && password === VALID_PASSWORD
}
