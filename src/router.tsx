import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'

// Placeholder page components — replaced milestone by milestone
import { LoginPage } from '@/Auth/ui/LoginPage'
import { ShellLayout } from '@/Common/ui/ShellLayout'
import { HomePage } from '@/Movies/ui/HomePage'
import { MovieDetailPage } from '@/Movies/ui/MovieDetailPage'
import { TVShowDetailPage } from '@/TVShows/ui/TVShowDetailPage'
import { SeasonDetailPage } from '@/TVShows/ui/SeasonDetailPage'
import { SearchPage } from '@/Search/ui/SearchPage'
import { WatchlistPage } from '@/Collection/ui/WatchlistPage'
import { MyListsPage } from '@/Collection/ui/MyListsPage'
import { ListDetailPage } from '@/Collection/ui/ListDetailPage'
import { SettingsPage } from '@/Preferences/ui/SettingsPage'
import { NotFoundPage } from '@/Common/ui/NotFoundPage'
import { ProtectedRoute } from '@/Auth/ui/ProtectedRoute'

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <ShellLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <HomePage /> },
      { path: 'movie/:id', element: <MovieDetailPage /> },
      {
        path: 'tv/:id',
        element: <TVShowDetailPage />,
        children: [
          { path: 'season/:seasonNumber', element: <SeasonDetailPage /> },
        ],
      },
      { path: 'search', element: <SearchPage /> },
      { path: 'watchlist', element: <WatchlistPage /> },
      { path: 'lists', element: <MyListsPage /> },
      { path: 'lists/:id', element: <ListDetailPage /> },
      { path: 'settings', element: <SettingsPage /> },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
