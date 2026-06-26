import './index.css'
import { AppRouter } from './router'
import { observer } from 'mobx-react-lite'


const App = observer(function App() {
  // re-render on theme/lang if needed at root
  return <AppRouter />
})
export default App
