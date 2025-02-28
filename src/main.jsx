import React, {useEffect} from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import 'bootstrap/dist/css/bootstrap.min.css';


const loadScriptsWithRequireJS = () => {
  const requireScript = document.createElement("script");
  requireScript.src = "./assets/js/require.min.js";
  requireScript.onload = () => {
    
    requirejs(["./assets/js/dashboard.js"], () => {
        console.log("All scripts loaded!");
      });
    
  };
  document.body.appendChild(requireScript);
};


const Main = () => {
  useEffect(() => {
    loadScriptsWithRequireJS();
  }, []);

  return (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<Main />);