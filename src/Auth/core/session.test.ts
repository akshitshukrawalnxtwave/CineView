import { describe, it, expect, beforeEach } from 'vitest'
import { getSession, setSession, clearSession, isAuthenticated } from '@/Auth/core/session'

describe('session utilities', () => {
  beforeEach(() => {
    sessionStorage.clear()
  })

  it('returns null when no session exists', () => {
    expect(getSession()).toBeNull()
  })

  it('isAuthenticated returns false with no session', () => {
    expect(isAuthenticated()).toBe(false)
  })

  it('sets and retrieves a session', () => {
    setSession('testuser')
    const session = getSession()
    expect(session).not.toBeNull()
    expect(session?.username).toBe('testuser')
    expect(typeof session?.loggedInAt).toBe('number')
  })

  it('isAuthenticated returns true after setSession', () => {
    setSession('testuser')
    expect(isAuthenticated()).toBe(true)
  })

  it('clears session', () => {
    setSession('testuser')
    clearSession()
    expect(getSession()).toBeNull()
    expect(isAuthenticated()).toBe(false)
  })
})
