import fetch from 'node-fetch';

// Get a list of variants from the specified URL.
const getVariantsList = (url) => fetch(url)
  .then((response) => {
    if (!response || response.status !== 200) throw new Error(response.status);
    return response.json();
  })
  .then((json) => json.variants);

// Choose a variant from the list of variants (uniform distribution).
const chooseVariant = (variants) => {
  const roll = Math.random();
  return Math.floor(roll * variants.length);
};

// Get cookie information of a key.
const getCookie = (headers, key) => {
  const cookies = headers.get('cookie');
  if (!cookies) return null;
  const c = cookies.match(`(^|;) ?${key}=([^;]*)(;|$)`);
  return c ? c[2] : null;
};

// Get variant whether cookie exists or not.
const getVariant = (request, variants) => {
  const variant = getCookie(request.headers, 'variant');
  if (!variant) return chooseVariant(variants);
  return parseInt(variant, 10);
};

// Fetch variant based on given selected variant.
const fetchVariant = async (variants, variant) => fetch(variants[variant])
  .then((response) => {
    if (!response || response.status !== 200) throw new Error(response.data);
    return response;
  });

// Set cookie based on given selected variant.
const setCookie = (fetchedVariant, variant) => {
  const response = new Response(fetchedVariant.body, fetchedVariant.headers);
  response.headers.append('Set-Cookie', `variant=${variant.toString()}; path=/`);
  return response;
};

export {
  getVariantsList, chooseVariant, getVariant, fetchVariant, setCookie,
};
