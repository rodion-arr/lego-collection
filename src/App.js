import logo from './assets/img/logo.svg';
import ghLogo from './assets/img/github-logo.svg';
import './App.css';
import db from './db.json';

function App() {
  return (
    <div className="App">
      <header className="top-menu">
        <div className="top-menu__logo"><img src={logo} alt="logo" /></div>
        <div className="top-menu__title">My LEGO collection</div>
      </header>
      <section className="catalog">
        {Object.keys(db).map((legoSetId) => {
          const set = db[legoSetId];
          return (
            <div className="catalog_item catalog-item" key={legoSetId}>
                <img
                  className="catalog-item__logo"
                  src={set.img}
                  loading="lazy"
                  alt=""
                />
              <div className="catalog-item__title">({legoSetId}) {set.name}</div>
            </div>
          )
        })}
      </section>
      <footer className="footer">
        <a
          href="https://github.com/rodion-arr/lego-collection"
          target="_blank"
          rel="noreferrer"
        >
          <img className="gh-logo" src={ghLogo} alt="" />
        </a>
      </footer>
    </div>
  );
}

export default App;
