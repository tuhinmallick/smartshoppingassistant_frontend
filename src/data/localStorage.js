export const saveToLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    console.log(`Saved ${key} to localStorage.`);
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
};

export const getFromLocalStorage = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error(`Error retrieving ${key} from localStorage:`, error);
    return null;
  }
};

export const removeFromLocalStorage = (key) => {
  try {
    localStorage.removeItem(key);
    console.log(`Removed ${key} from localStorage.`);
  } catch (error) {
    console.error(`Error removing ${key} from localStorage:`, error);
  }
};
