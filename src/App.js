import logo from './assets/img/logo.svg';
import ghLogo from './assets/img/github-logo.svg';
import './App.css';
import db from './db.json';
import { useCallback, useState } from 'react';
import { useThemes } from './hooks/themes.hook';
import { Filter } from './components/Filter/Filter';

function App() {
  const [setsToRender, setSetsToRender] = useState(Object.values(db));
  const themes = useThemes(db);

  const onFilterChange = useCallback((enabledThemes) => {
    setSetsToRender(Object.values(db).filter((setItem) => enabledThemes[setItem.themeName]));
  }, []);

  return (
    <div className="App">
      <header className="top-menu">
        <div className="top-menu__logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="top-menu__title">My LEGO collection</div>
      </header>

      <Filter themes={themes} onFilterChange={onFilterChange} />

      <section className="catalog">
        {setsToRender.map((set) => {
          return (
            <div className="catalog_item catalog-item" key={set.id}>
              <img className="catalog-item__logo" src={set.img} loading="lazy" alt="" />
              <div className="catalog-item__title">
                ({set.id.replace('-1', '')}) {set.name}
              </div>
            </div>
          );
        })}
      </section>
      <footer className="footer">
        <a href="https://github.com/rodion-arr/lego-collection" target="_blank" rel="noreferrer">
          <img className="gh-logo" src={ghLogo} alt="" />
        </a>
      </footer>
    </div>
  );
}

export default App;
