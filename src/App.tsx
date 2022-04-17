import { useState} from 'react';

import { darkContext } from './context/darkModeContext';
import Home from './pages/Home';

function App() {
  const [darkMode, setDarkMode] = useState<string | null>('')

  return (
    <darkContext.Provider value={{darkMode, setDarkMode}}>
    <div className={`${darkMode === 'dark' ? 'dark' : ''}`}>
      <Home/>
  
    </div>  
    </darkContext.Provider>
  );
}

export default App;
