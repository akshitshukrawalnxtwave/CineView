import { afterEach } from 'vitest'
import '@testing-library/jest-dom/vitest'

// Reset storage between tests
afterEach(() => {
  sessionStorage.clear()
  localStorage.clear()
})