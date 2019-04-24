const API_URL = 'https://mgrinko.github.io/js-20190221/api';

export const getAll = async () => {
  try {
    const response = await fetch(`${API_URL}/phones.json`);
    const data = await response.json();

    return data;
  } catch (e) {
    return [];
  }
};

export const getById = (phoneId) => (
  fetch(`${API_URL}/phones/${phoneId}.json`)
    .then(response => response.json())
    .catch(() => 0)
);
