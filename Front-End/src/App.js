import "./App.css";
import { useRoutes, useLocation } from "react-router-dom";
import { routes } from "../src/routes";
import { useEffect } from 'react';

function App() {
  const element = useRoutes(routes);
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);
  return (
    <>
      {element}
    </>
  )
}

export default App;
