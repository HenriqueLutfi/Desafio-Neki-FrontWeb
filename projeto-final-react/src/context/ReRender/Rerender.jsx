import { createContext, useEffect, useState } from "react";
export const ReRenderContext = createContext(null);

export default function ReRender(props) {
  const [renderCount, setRenderCount] = useState(true);
  function ChangeRender() {
    if (renderCount) {
      setRenderCount(false);
    } else {
      setRenderCount(true);
    }
  }
  
  return (
    <ReRenderContext.Provider
      value={{
        renderCount,
        ChangeRender
      }}
    >
      {props.children}
    </ReRenderContext.Provider>
  );
}
