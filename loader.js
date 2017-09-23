/**
 * Utility functions to load assets
 * (images, json, text) in your browser.
 */
function loadAll(loadFn) {
  return function(...urls) {
    return Promise.all(urls.map(u => loadFn(u)));
  };
}

function load(url, type) {
  return fetch(url).then(r => {
    if (!r.ok) {
      throw new Error(r.statusText);
    }
    return r[type]();
  });
}

const loader = {
  image: (...urls) => {
    return loadAll((u) => load(u, 'blob'))(...urls)
      .then(res => res.map(r => {
        const img = new Image();
        img.src = URL.createObjectURL(r);
        return img;
      }));
  },

  json: loadAll((u) => load(u, 'json')),
  text: loadAll((u) => load(u, 'text'))
};

export default loader;

