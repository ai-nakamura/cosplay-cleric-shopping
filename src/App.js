import SvgIcons from './Components/SvgIcons/SvgIcons';

import logo from './assets/chibi.png';
import './App.css';

function App() {
  return (
    <div className="App grid-container">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <main className="App-main">
        <p>Main</p>
      </main>
      <footer className="App-footer">
        <SvgIcons/>
        All rights reserved
      </footer>

    </div>
  );
}

export default App;
