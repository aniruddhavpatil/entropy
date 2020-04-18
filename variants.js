import fetch from 'node-fetch';

const getVariantsList = (url) => fetch(url)
  .then((response) => {
    if (!response || response.status !== 200) throw new Error(response.status);
    return response.json();
  })
  .then((json) => json.variants);

const chooseVariant = (variants) => {
  const roll = Math.random();
  return Math.floor(roll * variants.length);
};

const getCookie = (headers, key) => {
  const cookies = headers.get('cookie');
  if (!cookies) return null;
  const c = cookies.match(`(^|;) ?${key}=([^;]*)(;|$)`);
  return c ? c[2] : null;
};

const getVariant = (request, variants) => {
  const variant = parseInt(getCookie(request.headers, 'variant'), 10);
  return variant || chooseVariant(variants);
};

const fetchVariant = async (variants, variant) => fetch(variants[variant])
  .then((response) => {
    if (!response || response.status !== 200) throw new Error(response.data);
    return response;
  });

const setCookie = (fetchedVariant, variant) => {
  const response = new Response(fetchedVariant.body, fetchedVariant.headers);
  response.headers.append('Set-Cookie', `variant=${variant.toString()}; path=/`);
  return response;
};

export {
  getVariantsList, chooseVariant, getVariant, fetchVariant, setCookie,
};
