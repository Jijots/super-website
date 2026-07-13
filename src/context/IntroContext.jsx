import { createContext, useContext } from "react";

const IntroContext = createContext(true);

export function IntroProvider({ done, children }) {
  return <IntroContext.Provider value={done}>{children}</IntroContext.Provider>;
}

export function useIntroDone() {
  return useContext(IntroContext);
}
