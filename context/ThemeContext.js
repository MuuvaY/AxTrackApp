// // components/ThemeContext.js
// import React, { createContext, useContext } from "react";
// import { principalTheme } from "../utils/theme";

// const ThemeContext = createContext();

// export const ThemeProvider = ({ children }) => {
//   return (
//     <ThemeContext.Provider value={principalTheme}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// export const useTheme = () => useContext(ThemeContext);

import React, { createContext, useContext, useState } from "react";
import { principalTheme } from "../utils/theme";

// Créer le contexte
const ThemeContext = createContext(null);

// Provider component
export const ThemeProvider = ({ children }) => {
  // Utilisez un state pour permettre des changements de thème ultérieurs si nécessaire
  const [theme, setTheme] = useState(principalTheme);

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

// Hook personnalisé pour utiliser le thème
export const useTheme = () => {
  const context = useContext(ThemeContext);

  // Ajoutez une vérification de sécurité
  if (context === null) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};
