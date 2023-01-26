// export const urlParser = (url, ...params) => {
//   const resources = url.split('/');
//   resources.shift();
//   const urlParams = {};
//   for (const [key, index] of params) {
//     urlParams[key] = resources[index];
//   }
//   return urlParams
// }

export const urlParser = (url, urlMatch) => {
  const resources = url.split('/');
  const match = urlMatch.split('/');
  resources.shift();
  match.shift();

  const urlParams = {}

  for (const item in resources) {
    if (resources[item] !== match[item]) {
      const key = match[item].replace(':', '');
      urlParams[key] = resources[item];
    }
  }
  return urlParams;
}