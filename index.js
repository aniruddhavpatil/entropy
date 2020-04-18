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
    // Get the list of variants.
    const variants = await getVariantsList(paths.variants);
    // Choose a variant, based on whether cookie exists or not.
    const variant = getVariant(request, variants);
    // Fetch the selected variant.
    const fetchedVariant = await fetchVariant(variants, variant);
    // Set a cookie for the response.
    const response = setCookie(fetchedVariant, variant);
    // Make the required HTMLRewrites.
    const transformedResponse = rewriter.transform(response);
    // Return the transformed response.
    return transformedResponse;
  } catch (error) {
    // Handle the most common errors.
    if (error.message === '404') return new Response('Error 404: Not Found.', { status: 404 });
    if (error.message === '500') return new Response('Error 500: Internal Server Error.', { status: 500 });

    // Handle any other errors.
    return new Response('Whoops! Something went wrong.');
  }
};
