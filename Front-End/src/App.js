import "./App.css";
import { useRoutes } from "react-router-dom";
import { routes } from "../src/routes";
function App() {
  const element = useRoutes(routes);
  return (
    <>
      {element}
    </>
  )
}

export default App;
