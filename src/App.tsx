import React from 'react';
import {Analytics} from "./Analytics/Analytics"


function App() {
  return (
    <div className="App">
      <Analytics apiUrl='http://go-dev.greedygame.com/v3'/>
    </div>
  );
}

export default App;
