export const urlParser = (url, ...params) => {
  const resources = url.split('/');
  resources.shift();
  const urlParams = {};
  for (const [key, index] of params) {
    urlParams[key] = resources[index];
  }
  return urlParams
}