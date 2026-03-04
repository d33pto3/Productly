import "./App.css";
import { FavoritesProvider } from "./context/FavoritesContext";
import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <FavoritesProvider>
      <AppRouter />
    </FavoritesProvider>
  );
}

export default App;
