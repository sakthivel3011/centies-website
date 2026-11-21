import { Link } from "react-router";
import { ORG, SECRETARY, WEBSITE_SUPPORT } from "../content/site";
import { LegalLayout } from "../components/LegalLayout";
import { FORM_URL, REGISTER_URL, SITE_URL } from "../lib/config";

/** Change this date whenever the wording of these pages changes. */
const UPDATED = "20 November 2026";

const host = (url: string) => new URL(url).host;
const Office = () => (
  <p>
    {ORG.name}, {ORG.address.join(", ")} · <a href={`mailto:${ORG.email}`}>{ORG.email}</a> · <a href={ORG.phoneHref}>{ORG.phone}</a>
  </p>
);

export function TermsPage() {
  return (
    <LegalLayout
      title="Terms of Service"
      intro="The terms for using the CENTIES Association website and the documents published on it."
      updated={UPDATED}
      sections={[
        {
          id: "about",
          title: "About these terms",
          body: (
            <>
              <p>
                This website ({host(SITE_URL)}) is published by the {ORG.name} ({ORG.regNo}) to share information about the CENTIES Championship. By using it, you agree to these terms.
              </p>
              <p>
                College registration and payment happen on our separate registration site, which has its own <a href={`${FORM_URL}/terms`}>registration terms</a> and{" "}
                <a href={`${FORM_URL}/refund-policy`}>refund policy</a>.
              </p>
            </>
          ),
        },
        {
          id: "use",
          title: "Using the website",
          body: (
            <ul>
              <li>The website is free to use and needs no account.</li>
              <li>Do not try to disrupt the website, get around its security, or overload it with automated requests.</li>
              <li>Do not copy the website or present it, or any part of it, as an official CENTIES channel elsewhere.</li>
            </ul>
          ),
        },
        {
          id: "downloads",
          title: "Forms, fixtures and documents",
          body: (
            <ul>
              <li>You may download, print and share the forms, fixtures, score sheets and other documents for CENTIES events and for running college sports.</li>
              <li>Do not change an official document and present the changed version as official.</li>
              <li>
                Championship matters are governed by the <Link to="/championship/rules">CENTIES rules and regulations</Link>. The Executive Committee is the final deciding authority.
              </li>
            </ul>
          ),
        },
        {
          id: "content",
          title: "Photographs and content",
          body: (
            <>
              <p>The text, photographs, logo and documents on this website belong to the {ORG.name} unless stated otherwise.</p>
              <ul>
                <li>You may share photographs for personal, non-commercial use, with credit to CENTIES.</li>
                <li>Commercial use of any content, or use of the CENTIES name and logo, needs our written permission.</li>
                <li>
                  If you appear in a photograph and would like it removed, see the <Link to="/privacy">privacy policy</Link>.
                </li>
              </ul>
            </>
          ),
        },
        {
          id: "accuracy",
          title: "Accuracy of information",
          body: (
            <p>
              Results, fixtures and other documents are published as provided by the organising committee. We work to keep them correct, but mistakes can happen. The official record is held by the
              CENTIES Executive Committee. If you notice an error, please <Link to="/contact">tell us</Link>.
            </p>
          ),
        },
        {
          id: "links",
          title: "Links to other sites",
          body: (
            <p>
              Some links open other services, such as the registration site, WhatsApp and Google Maps. Those services have their own terms and policies, and we are not responsible for their content.
            </p>
          ),
        },
        {
          id: "liability",
          title: "Availability and liability",
          body: (
            <p>
              We may change, pause or remove any part of the website at any time. The website is provided “as is”. As far as the law allows, CENTIES Association is not liable for any loss arising from
              use of the website or from reliance on its content.
            </p>
          ),
        },
        {
          id: "law",
          title: "Changes and governing law",
          body: (
            <p>We may update these terms; the date at the top of this page shows the latest version. These terms are governed by the laws of India, and the courts at Coimbatore have jurisdiction.</p>
          ),
        },
        { id: "contact", title: "Contact", body: <Office /> },
      ]}
    />
  );
}

export function PrivacyPage() {
  return (
    <LegalLayout
      title="Privacy policy"
      intro="What information this website collects — very little — and how it is handled."
      updated={UPDATED}
      sections={[
        {
          id: "summary",
          title: "In short",
          body: (
            <p>
              This website is for information only. It has no accounts, no sign-up and no forms, and it uses no advertising, analytics or tracking. We do not collect personal information while you
              browse.
            </p>
          ),
        },
        {
          id: "browsing",
          title: "When you visit",
          body: (
            <p>
              Like every website, our hosting provider automatically records basic technical details of each visit: IP address, browser type, the page requested and the time. These logs are used only
              to deliver the website and keep it secure, are kept for a short time, and are not used to identify you.
            </p>
          ),
        },
        {
          id: "contacting",
          title: "When you contact us",
          body: (
            <p>
              If you call, email or message us on WhatsApp, we receive what you choose to send, such as your name, phone number, email address and message. We use it only to reply to you and to deal
              with your request. Messages sent through WhatsApp are also covered by WhatsApp’s own privacy policy.
            </p>
          ),
        },
        {
          id: "registration",
          title: "College registration",
          body: (
            <p>
              Registration and payment happen on our separate registration site. This website does not receive or store any registration or payment details. The{" "}
              <a href={`${FORM_URL}/privacy`}>registration privacy policy</a> explains what is collected there and why.
            </p>
          ),
        },
        {
          id: "photos",
          title: "Photographs",
          body: (
            <p>
              Gallery photographs were taken at CENTIES events. Location and camera data are removed from every photo before it is published. If you appear in a photograph and would like it removed,
              write to <a href={`mailto:${ORG.email}`}>{ORG.email}</a> with the album name and photo number, and we will remove it.
            </p>
          ),
        },
        {
          id: "rights",
          title: "Your rights",
          body: (
            <p>
              Under the Digital Personal Data Protection Act, 2023, you can ask us what personal information we hold about you, and ask us to correct or delete it. Write to{" "}
              <a href={`mailto:${ORG.email}`}>{ORG.email}</a> and we will reply as soon as we can.
            </p>
          ),
        },
        {
          id: "changes",
          title: "Changes to this policy",
          body: <p>If we change this policy, we will update it here and change the date at the top of the page.</p>,
        },
        { id: "contact", title: "Contact", body: <Office /> },
      ]}
    />
  );
}

export function CookiePage() {
  return (
    <LegalLayout
      title="Cookie policy"
      intro="This website sets no cookies and uses no tracking. Here is exactly what it stores."
      updated={UPDATED}
      sections={[
        {
          id: "summary",
          title: "In short",
          body: <p>This website does not use cookies. There are no advertising, analytics or tracking tools, so there is nothing to accept or reject and no cookie banner.</p>,
        },
        {
          id: "stored",
          title: "What the website stores",
          body: (
            <ul>
              <li>No cookies, and nothing saved in your browser’s local storage.</li>
              <li>Every page, font, image and document is served from this website itself. No third-party scripts or services are loaded while you browse.</li>
            </ul>
          ),
        },
        {
          id: "cache",
          title: "Your browser’s cache",
          body: (
            <p>
              Your browser may keep copies of pages, images and documents so the website loads faster next time. This stays on your device, is not a cookie, and can be cleared at any time in your
              browser settings.
            </p>
          ),
        },
        {
          id: "registration",
          title: "The registration site",
          body: (
            <p>
              The separate registration site uses one essential cookie and saves your form progress in your browser so you can finish later. Its <a href={`${FORM_URL}/cookie-policy`}>cookie policy</a>{" "}
              explains this.
            </p>
          ),
        },
        {
          id: "changes",
          title: "Changes",
          body: <p>If this website ever starts using cookies, this page will be updated first and the date at the top will change.</p>,
        },
      ]}
    />
  );
}

export function SecurityPage() {
  return (
    <LegalLayout
      title="Security"
      intro="How this website is protected, how to stay safe, and how to report a security problem."
      updated={UPDATED}
      sections={[
        {
          id: "design",
          title: "A simple, static website",
          body: (
            <p>
              Every page of this website is a ready-made static page. There are no logins, no database and no forms on this site, so there is no personal data here to steal and very little to attack.
            </p>
          ),
        },
        {
          id: "protection",
          title: "Protection in place",
          body: (
            <ul>
              <li>The whole website uses an encrypted connection (HTTPS), and browsers are told to always use it.</li>
              <li>A strict security policy lets pages load code, fonts and images only from this website. No third-party scripts or trackers run here.</li>
              <li>Other websites cannot show our pages inside their own (protection against click-jacking).</li>
              <li>All documents and photographs are hosted on this website itself, not loaded from other sites.</li>
            </ul>
          ),
        },
        {
          id: "payments",
          title: "Registration and payments",
          body: (
            <p>
              Registration and payment happen on the separate registration site ({host(FORM_URL)}). Payments are made on the payment provider’s secure checkout page, so card, UPI and bank details
              never reach CENTIES. Read the <a href={`${FORM_URL}/security`}>registration site security page</a> for details.
            </p>
          ),
        },
        {
          id: "stay-safe",
          title: "Stay safe",
          body: (
            <ul>
              <li>CENTIES will never call or message you asking for an OTP, card PIN, CVV or UPI PIN.</li>
              <li>
                Register and pay only through the official registration site, reached from the <a href={REGISTER_URL}>Register</a> button on this website.
              </li>
              <li>If you receive a suspicious message that claims to be from CENTIES, do not pay. Check with us first.</li>
            </ul>
          ),
        },
        {
          id: "report",
          title: "Report a security problem",
          body: (
            <>
              <p>
                If you find a security problem on this website or the registration site, please tell us privately and give us time to fix it before sharing it: {WEBSITE_SUPPORT.name},{" "}
                <a href={`mailto:${WEBSITE_SUPPORT.emails[0]}`}>{WEBSITE_SUPPORT.emails[0]}</a> or <a href={WEBSITE_SUPPORT.phoneHref}>{WEBSITE_SUPPORT.phone}</a>. You can also write to the CENTIES
                office at <a href={`mailto:${ORG.email}`}>{ORG.email}</a>.
              </p>
              <p>
                Our contact details for security reports are also published in the standard <a href="/.well-known/security.txt">security.txt</a> file. Please do not access, change or delete other
                people’s data while testing.
              </p>
            </>
          ),
        },
      ]}
    />
  );
}

export function SupportPage() {
  return (
    <LegalLayout
      eyebrow="Help"
      title="Support"
      intro="Who to contact for help with this website, registration or the championship."
      updated={UPDATED}
      sections={[
        {
          id: "contacts",
          title: "Who to contact",
          body: (
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-line p-5">
                <p className="text-[13px] font-semibold text-royal-600">Championship questions</p>
                <p className="mt-1 font-semibold text-ink">CENTIES office</p>
                <p className="mt-1 text-[14px] leading-6 text-muted">Rules, fixtures, venues, results, adding or removing teams, and refunds.</p>
                <p className="mt-3 text-[14px] leading-6">
                  <a href={ORG.phoneHref}>{ORG.phone}</a>
                  <br />
                  <a href={`mailto:${ORG.email}`}>{ORG.email}</a>
                  <br />
                  <span className="text-muted">{ORG.hours}</span>
                </p>
              </div>
              <div className="rounded-xl border border-line p-5">
                <p className="text-[13px] font-semibold text-royal-600">Website & registration support</p>
                <p className="mt-1 font-semibold text-ink">{WEBSITE_SUPPORT.name}</p>
                <p className="mt-1 text-[14px] leading-6 text-muted">{WEBSITE_SUPPORT.helpsWith}</p>
                <p className="mt-3 text-[14px] leading-6">
                  <a href={WEBSITE_SUPPORT.phoneHref}>{WEBSITE_SUPPORT.phone}</a>
                  {WEBSITE_SUPPORT.emails.map((e) => (
                    <span key={e}>
                      <br />
                      <a href={`mailto:${e}`}>{e}</a>
                    </span>
                  ))}
                </p>
              </div>
            </div>
          ),
        },
        {
          id: "questions",
          title: "Common questions",
          body: (
            <ul>
              <li>
                <b>How do I register my college?</b> Use the <a href={REGISTER_URL}>registration site</a>. The steps and fees are on the <Link to="/championship">2026 Championship</Link> page.
              </li>
              <li>
                <b>Where are the forms and fixtures?</b> On the <Link to="/downloads">Downloads</Link> page. Enter the number of teams to get the right fixture.
              </li>
              <li>
                <b>A document will not open.</b> Use the Download button and open the file with a PDF reader. If it still fails, tell website support the name of the document.
              </li>
              <li>
                <b>Money was taken but the registration shows unpaid.</b> Check the <a href={`${FORM_URL}/register/status`}>payment status page</a> on the device you used. If it still shows unpaid,
                call website support with your registration ID.
              </li>
              <li>
                <b>A result is wrong, or I want a photo removed.</b> Email the CENTIES office at <a href={`mailto:${ORG.email}`}>{ORG.email}</a>.
              </li>
            </ul>
          ),
        },
        {
          id: "post",
          title: "Championship correspondence",
          body: (
            <p>
              {SECRETARY.name}, {SECRETARY.role} — {SECRETARY.address.join(", ")}.
            </p>
          ),
        },
        {
          id: "tips",
          title: "Before you contact us",
          body: (
            <p>Please mention your college name, and your registration ID if you have one. Never share an OTP, card PIN, CVV or UPI PIN with anyone, including people who say they are from CENTIES.</p>
          ),
        },
      ]}
    />
  );
}
