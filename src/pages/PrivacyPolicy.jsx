import LegalDocumentPage from '../components/LegalDocumentPage.jsx';
import privacyPolicyMarkdown from '../content/privacy-policy.md?raw';

const navigation = [
  ['Overview', 'privacy-overview'],
  ['Collection & use', 'privacy-section-1'],
  ['Sharing & security', 'privacy-section-7'],
  ['Your rights', 'privacy-section-13'],
  ['Contact', 'privacy-section-16'],
];

export default function PrivacyPolicy() {
  return (
    <LegalDocumentPage
      anchorPrefix="privacy"
      documentIntro="This policy applies when you visit our website, contact us, become a client, or interact with a workflow or service we configure or operate."
      documentTitle="How we handle personal information"
      eyebrow="Privacy & data"
      lastUpdated="September 24, 2026"
      markdown={privacyPolicyMarkdown}
      navigation={navigation}
      title="Privacy Policy"
    />
  );
}
