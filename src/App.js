import SvgIcons from './Components/SvgIcons/SvgIcons';

import logo from './assets/chibi.png';
import Layout from './Components/Products/Layout';
import './App.css';

function App() {
  return (
    <div className="App grid-container">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Welcome to Cleric's Cantrips! Since 2014, the Cosplay Cleric has been offering free cosplay repair at conventions across California and Nevada, and has helped over 4,000 cosplayers repair their cosplays in an emergency. Sales from this shop directly help the cleric get to more conventions and help more cosplayers and costumes.
        </p>
      </header>
      <main className="App-main">
        <Layout/>
      </main>
      <footer className="App-footer">
        <SvgIcons/>
        All rights reserved
      </footer>

    </div>
  );
}

export default App;
