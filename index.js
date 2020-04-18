import paths from './paths';
import {
  getVariantsList, getVariant, fetchVariant, setCookie,
} from './variants';
import rewriter from './rewriter';

addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request));
});

const handleRequest = async (request) => {
  try {
    const variants = await getVariantsList(paths.variants);
    const variant = getVariant(request, variants);
    const fetchedVariant = await fetchVariant(variants, variant);
    const response = setCookie(fetchedVariant, variant);
    const transformedResponse = rewriter.transform(response);
    return transformedResponse;
  } catch (error) {
    if (error.message === '404') return new Response('Error 404: Not Found.', { status: 404 });
    if (error.message === '500') return new Response('Error 500: Internal Server Error.', { status: 500 });

    return new Response('Whoops! Something went wrong.');
  }
};
