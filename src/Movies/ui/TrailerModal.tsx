import { useEffect } from 'react'
import { createPortal } from 'react-dom'

interface Props {
  isOpen: boolean
  youtubeKey: string | null
  title: string
  onClose: () => void
}

export function TrailerModal({ isOpen, youtubeKey, title, onClose }: Props) {
  useEffect(() => {
    if (!isOpen) return

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen || !youtubeKey) return null

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${title} trailer`}
    >
      <div
        className="relative w-full max-w-4xl aspect-video rounded-xl overflow-hidden bg-black"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 rounded-full bg-black/60 px-3 py-1 text-sm text-white hover:bg-black/80"
        >
          ✕
        </button>

        <iframe
          src={`https://www.youtube.com/embed/${youtubeKey}?autoplay=1`}
          title={`${title} trailer`}
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>,
    document.body
  )
}