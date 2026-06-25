import { describe, it, expect } from 'vitest'
import { checkCredentials, VALID_EMAIL, VALID_PASSWORD } from './credentials'

describe('checkCredentials', () => {
  it('returns true for correct credentials', () => {
    expect(checkCredentials(VALID_EMAIL, VALID_PASSWORD)).toBe(true)
  })

  it('returns false for wrong password', () => {
    expect(checkCredentials(VALID_EMAIL, 'wrongpassword')).toBe(false)
  })

  it('returns false for wrong email', () => {
    expect(checkCredentials('wrong@email.com', VALID_PASSWORD)).toBe(false)
  })

  it('returns false for both wrong', () => {
    expect(checkCredentials('a@b.com', 'bad')).toBe(false)
  })

  it('is case-insensitive for email', () => {
    expect(checkCredentials('User@CineView.COM', VALID_PASSWORD)).toBe(true)
  })

  it('is case-sensitive for password', () => {
    expect(checkCredentials(VALID_EMAIL, VALID_PASSWORD.toUpperCase())).toBe(false)
  })
})
