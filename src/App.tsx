import './index.css'
import { AppRouter } from './router'
import { observer } from 'mobx-react-lite'
import { preferencesStore } from './Preferences/core/preferencesStore'


const App = observer(function App() {
  // re-render on theme/lang if needed at root
  return <AppRouter />
})
export default App
