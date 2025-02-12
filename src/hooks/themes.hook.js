import { useEffect, useState } from 'react';

export const useThemes = (db) => {
  const [themes, setThemes] = useState([]);

  useEffect(() => {
    const themesObj = {};
    Object.keys(db).forEach((legoSetId) => {
      const set = db[legoSetId];

      if (!themesObj[set.themeName]) {
        themesObj[set.themeName] = {
          name: set.themeName,
          count: 1,
        };
      } else {
        themesObj[set.themeName].count++;
      }
    });
    setThemes(Object.values(themesObj));
  }, [db]);

  return themes;
};
