import LegalDocumentPage from '../components/LegalDocumentPage.jsx';
import termsOfUseMarkdown from '../content/terms-of-use.md?raw';

const navigation = [
  ['Overview', 'terms-overview'],
  ['Using the website', 'terms-section-2'],
  ['Agreements & IP', 'terms-section-5'],
  ['Risk & liability', 'terms-section-13'],
  ['Contact', 'terms-section-22'],
];

export default function TermsOfUse() {
  return (
    <LegalDocumentPage
      anchorPrefix="terms"
      documentIntro="These Terms govern your access to and use of kitebaze.com and the pages, materials, forms, tools, and content made available through it."
      documentTitle="The terms that govern this website"
      eyebrow="Website terms"
      lastUpdated="September 24, 2026"
      markdown={termsOfUseMarkdown}
      navigation={navigation}
      title="Terms of Use"
    />
  );
}
