import AttributeRewriter from './rewriters/attribute';
import InnerRewriter from './rewriters/inner';
import paths from './paths';

// HTMLRewriter transformations.
const rewriter = new HTMLRewriter()
  .on('title', new InnerRewriter('replace', 'Entropy'))
  .on('h1#title', new InnerRewriter('replace', 'Welcome to Entropy!'))
  .on('a#url', new AttributeRewriter('href', paths.old_url, paths.my_website))
  .on('a#url', new InnerRewriter('replace', 'Aniruddha Patil\'s website'))
  .on('p#description', new InnerRewriter('append', ' Click the button below to visit my website.'));

export default rewriter;
