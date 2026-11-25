/** Organisation details and contacts (from the old centies.in contact page and the 2026 registration form). */
export const ORG = {
  name: "CENTIES Association",
  fullName: "Coimbatore, Erode, Nilgiris and Tiruppur District Inter Engineering Sports Association",
  regNo: "TN Reg. No. SRG/CBE/40/2023",
  email: "info@centies.in",
  /** Both CENTIES addresses, shown together wherever the office contact is listed (the old Gmail address is no longer used). */
  emails: ["info@centies.in", "support@centies.in"],
  phone: "+91 98424 11828",
  phoneHref: "tel:+919842411828",
  whatsappHref: "https://wa.me/919842411828",
  address: ["4/24 Kendapalayam, Tekkampatti (Post)", "Seeliyur (Via), Coimbatore 641 113"],
  mapsHref: "https://www.google.com/maps/search/?api=1&query=Kendapalayam%2C+Tekkampatti%2C+Seeliyur%2C+Coimbatore+641113",
  hours: "Mon – Fri, 9 AM – 5 PM IST",
};

/** Website & registration support (same team as the registration site: ../form/content/contacts.ts). Shown on /support and /security. */
export const WEBSITE_SUPPORT = {
  name: "Sakthivel S",
  phone: "+91 89254 90989",
  phoneHref: "tel:+918925490989",
  emails: ["info@updone.in", "hello@mendsolution.in"],
  hours: "Available 24 hours",
  helpsWith: "A page or download not working, the registration form, or a payment problem.",
};

/** Championship correspondence (from the 16th CENTIES Championship 2026 registration form). */
export const SECRETARY = {
  name: "Dr. R. Jeyaraman",
  role: "Secretary, CENTIES · Director of Physical Education",
  address: ["E6 Staff Quarters, Kongu Engineering College", "Perundurai, Erode"],
};

/** Office bearers and executive committee (from "CENTIES OFFICE BEARERS.docx", 2026). */
export const OFFICE_BEARERS = [
  { name: "Mr. J. Gerard Arokiaraj", role: "President", institution: "VCET" },
  { name: "Dr. V. Ravikumar", role: "Vice President", institution: "HCET" },
  { name: "Mr. P. Marimuthu", role: "Vice President", institution: "ESEC" },
  { name: "Dr. R. Jeyaraman", role: "Secretary", institution: "KEC" },
  { name: "Ms. M. Nirmala Devi", role: "Joint Secretary", institution: "KCT" },
  { name: "Dr. A. S. John Raja", role: "Joint Secretary", institution: "CIT" },
  { name: "Mr. S. Kumaresan", role: "Treasurer", institution: "NIET" },
  { name: "Dr. K. Amirthavalli", role: "Executive Member", institution: "KGISLIT" },
  { name: "Dr. K. Vellimalai", role: "Executive Member", institution: "SNSCE" },
  { name: "Dr. P. Velusamy", role: "Executive Member", institution: "SRIT" },
  { name: "Mr. A. Jayaprakash", role: "Executive Member", institution: "KIT" },
  { name: "Ms. R. Muthulakshmi", role: "Executive Member", institution: "KPRIET" },
  { name: "Mr. S. Lakshmanan", role: "Executive Member", institution: "NEC" },
  { name: "Mr. K. Kannan", role: "Executive Member", institution: "HIT" },
  { name: "Mr. R. Stalin", role: "Executive Member", institution: "KPRIET" },
];

export const INSTITUTIONS: Record<string, string> = {
  VCET: "Velalar College of Engineering and Technology, Erode",
  HCET: "Hindusthan College of Engineering and Technology, Coimbatore",
  ESEC: "Erode Sengunthar Engineering College, Erode",
  KEC: "Kongu Engineering College, Erode",
  KCT: "Kumaraguru College of Technology, Coimbatore",
  CIT: "Coimbatore Institute of Technology, Coimbatore",
  NIET: "Nehru Institute of Engineering and Technology, Coimbatore",
  KGISLIT: "KGISL Institute of Technology, Coimbatore",
  SNSCE: "SNS College of Engineering, Coimbatore",
  SRIT: "Sri Ramakrishna Institute of Technology, Coimbatore",
  KIT: "KIT – Kalaignarkarunanidhi Institute of Technology, Coimbatore",
  KPRIET: "KPR Institute of Engineering and Technology, Coimbatore",
  NEC: "Nandha Engineering College, Erode",
  HIT: "Hindusthan Institute of Technology, Coimbatore",
};

export const VALUES = [
  { title: "Excellence", text: "Pushing every athlete to achieve their personal best." },
  { title: "Sportsmanship", text: "Fair play and respect are the cornerstones of CENTIES." },
  { title: "Teamwork", text: "Building bonds between engineering colleges across four districts." },
];
