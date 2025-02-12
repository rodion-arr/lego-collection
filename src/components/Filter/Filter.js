import './Filter.css';
import { useCallback, useEffect, useState } from 'react';

export const Filter = ({ themes, onFilterChange }) => {
  const [expanded, setExpanded] = useState(false);
  const [checkedThemes, setCheckedThemes] = useState({});

  const updateCheckedThemes = useCallback(
    (stateToUpdate) => {
      const checkedThemesResult = {};
      themes.forEach((theme) => {
        checkedThemesResult[theme.name] = stateToUpdate;
      });
      setCheckedThemes(checkedThemesResult);
      onFilterChange(checkedThemesResult);
    },
    [themes, onFilterChange],
  );

  useEffect(() => {
    updateCheckedThemes(true);
  }, [themes, updateCheckedThemes]);

  if (themes.length === 0) {
    return null;
  }

  const onCheckedThemeChange = (e) => {
    const newFilterState = {
      ...checkedThemes,
      [e.target.name]: e.target.checked,
    };

    setCheckedThemes(newFilterState);
    onFilterChange(newFilterState);
  };

  return (
    <section className="filter">
      <div
        className="filter__title"
        onClick={() => {
          setExpanded(!expanded);
        }}
      >
        Categories filter {expanded ? '↑' : '↓'}
      </div>
      <div className={`filter__list ${expanded ? 'filter__list--expanded' : ''}`}>
        <div className="filter__buttons">
          <button className="filter__button" onClick={() => updateCheckedThemes(true)}>
            Select all
          </button>
          <button className="filter__button" onClick={() => updateCheckedThemes(false)}>
            Unselect all
          </button>
        </div>
        <div className="filter__checkboxes">
          {themes.map((theme, i) => (
            <label key={i}>
              <input
                type="checkbox"
                className="filter__checkbox"
                checked={checkedThemes[theme.name]}
                name={theme.name}
                onChange={onCheckedThemeChange}
              />
              {theme.name} ({theme.count})
            </label>
          ))}
        </div>
      </div>
    </section>
  );
};
