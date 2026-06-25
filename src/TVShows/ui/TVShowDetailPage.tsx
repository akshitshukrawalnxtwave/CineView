import { Outlet } from 'react-router-dom'
import { PlaceholderPage } from '../../Common/ui/PlaceholderPage'

export function TVShowDetailPage() {
  return (
    <>
      <PlaceholderPage
        title="TV Show Detail"
        description="Show metadata, season list, and nested season navigation."
        milestone={3}
      />
      <Outlet />
    </>
  )
}
