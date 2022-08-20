import React from "react";
import { Rotas } from "../projeto-final-react/src/routes/rotas.jsx";
import Context from "./src/context/AuthContext/index.jsx";
// import Theme from "./src/context/ThemeMode/style.jsx";
import ReRender from "./src/context/ReRender/Rerender.jsx";
function App() {
  return (
    <Context>
      {/* <Theme> */}
        <ReRender>
          <Rotas />
        </ReRender>
      {/* </Theme> */}
    </Context>
  );
}

export default App;
