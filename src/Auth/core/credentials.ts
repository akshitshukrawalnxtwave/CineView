export const VALID_EMAIL = 'user@cineview.com'
export const VALID_PASSWORD = 'Pass123'

export function checkCredentials(
  email: string,
  password: string
): boolean {
  return (
    email.toLowerCase() === VALID_EMAIL.toLowerCase() &&
    password === VALID_PASSWORD
  )
}