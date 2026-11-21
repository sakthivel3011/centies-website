/** Organisation details and contacts (from the old centies.in contact page and the 2026 registration form). */
export const ORG = {
  name: "CENTIES Association",
  fullName: "Coimbatore, Erode, Nilgiris and Tiruppur District Inter Engineering Sports Association",
  regNo: "TN Reg. No. SRG/CBE/40/2023",
  email: "centies2010@gmail.com",
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

/** Championship correspondence (from the 15th CENTIES Championship 2026 registration form). */
export const SECRETARY = {
  name: "Dr. R. Jeyaraman",
  role: "Secretary, CENTIES · Director of Physical Education",
  address: ["E6 Staff Quarters, Kongu Engineering College", "Perundurai, Erode"],
};

export const OFFICE_BEARERS = [
  { name: "Mr. N. Dinakaran", role: "President", institution: "CENTIES" },
  { name: "Dr. V. Ravikumar", role: "Vice President", institution: "HCET" },
  { name: "Dr. R. Jeyaraman", role: "Secretary", institution: "KEC" },
  { name: "Mr. J. Gnanasekar", role: "Joint Secretary", institution: "PCET" },
  { name: "Dr. G. Ravindran", role: "Treasurer", institution: "CIT" },
  { name: "Mr. B. Ravikumar", role: "Executive Member", institution: "KCT" },
  { name: "Dr. C. G. S. Saravanan", role: "Executive Member", institution: "MCET" },
  { name: "Mr. S. Gnanasekar", role: "Executive Member", institution: "BIT" },
  { name: "Mr. N. P. Senthilkumar", role: "Executive Member", institution: "GCT" },
];

export const INSTITUTIONS: Record<string, string> = {
  HCET: "Hindusthan College of Engineering and Technology",
  KEC: "Kongu Engineering College",
  PCET: "Park College of Engineering and Technology",
  CIT: "Coimbatore Institute of Technology",
  KCT: "Kumaraguru College of Technology",
  MCET: "Dr. Mahalingam College of Engineering and Technology",
  BIT: "Bannari Amman Institute of Technology",
  GCT: "Government College of Technology",
};

export const VALUES = [
  { title: "Excellence", text: "Pushing every athlete to achieve their personal best." },
  { title: "Sportsmanship", text: "Fair play and respect are the cornerstones of CENTIES." },
  { title: "Teamwork", text: "Building bonds between engineering colleges across four districts." },
];
