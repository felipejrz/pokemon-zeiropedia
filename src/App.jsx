import AppRouter from './AppRouter'
import { PokeContextProvider } from "./context/PokeContext.jsx";


function App() {
  return (
    <PokeContextProvider>
      <AppRouter/>
    </PokeContextProvider>
  );

}

export default App
