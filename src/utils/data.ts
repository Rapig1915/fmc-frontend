import { QuoteStep, CarSelectType } from 'src/types';

export const integrations = [
  {
    logo: '/images/logos/slack.svg',
    name: 'Slack',
  },
  {
    logo: '/images/logos/mailchimp.svg',
    name: 'Mailchimp',
  },
  {
    logo: '/images/logos/dropbox.svg',
    name: 'Dropbox',
  },
  {
    logo: '/images/logos/google-drive.svg',
    name: 'Google Drive',
  },
  {
    logo: '/images/logos/google-ad-manager.svg',
    name: 'Google Ad Manager',
  },
  {
    logo: '/images/logos/atlassian.svg',
    name: 'Atlassian',
  },
];

export const advantageCompareList = {
  FIXMYCAR: 'Fixmycar',
  REPAIR_SHOP: 'Repair Shop',
};

export const itemsAdvantage = [
  {
    img: 'badges/advantage-money.svg',
    title: 'Affordable & honest',
    subtitle:
      "Fixed & upfront pricing. No hidden fees and you'll get the lowest prices guaranteed.",
  },
  {
    img: 'badges/advantage-ring.svg',
    title: "We'll come to you",
    subtitle:
      'Friendly, car mechanics will come to your home, office or parking lot.',
  },
  {
    img: 'badges/advantage-time.svg',
    title: 'Flexible hours',
    subtitle:
      'Open every-day from 9am - 9pm. Book our epxerienced certified technicians today.',
  },
];

export const itemsShop = [
  {
    img: 'badges/advantage-shop-money.svg',
    title: 'Expensive & devius',
    subtitle: '30% more expensive and come with additional fees & upsells.',
  },
  {
    img: 'badges/advantage-shop-location.svg',
    title: 'Inconvinient service locations',
    subtitle: 'Repairs must be done at a physical auto repair shop.',
  },
  {
    img: 'badges/advantage-shop-rigid.svg',
    title: 'Rigid hours',
    subtitle: 'Open limited hours and at times closed on weekends.',
  },
];

export const itemsCustomer = [
  {
    img: 'customers/mariah.png',
    name: 'Mariah Heighl',
  },
  {
    img: 'customers/johnny.png',
    name: 'Johnny Riece',
  },
  {
    img: 'customers/marian.png',
    name: 'Marian Huves',
  },
  {
    img: 'customers/alice.png',
    name: 'Alice Bleu',
  },
];

export const itemsLocation = [
  {
    state: 'Michigan',
    description: 'Metro Detroit',
    city: [
      'Detroit',
      'Sterling Heights',
      'Warren',
      'Ann Arbor',
      'Dearborn',
      'Livonia',
      'Detroitt',
      'Sterling Heightst',
      'Warrent',
      'Ann Arbort',
      'Dearbornt',
      'Livoniat',
      'Detroitr',
      'Sterling Heightsr',
      'Warrenr',
      'Ann Arborr',
      'Dearbornr',
      'Livoniar',
      'Detroite',
      'Sterling Heightsa',
      'Warrenq',
    ],
  },
  {
    state: 'Texas',
    description: 'Dallas Fort Worth & Houston',
    city: [
      'Detroit',
      'Sterling Heights',
      'Warren',
      'Ann Arbor',
      'Dearborn',
      'Livonia',
      'Detroitt',
      'Sterling Heightst',
      'Warrent',
      'Ann Arbort',
      'Dearbornt',
      'Livoniat',
      'Detroitr',
      'Sterling Heightsr',
      'Warrenr',
      'Ann Arborr',
      'Dearbornr',
      'Livoniar',
      'Detroite',
      'Sterling Heightsa',
      'Warrene',
    ],
  },
];

export const itemsCandidates = [
  {
    name: 'Steve Gerrard',
    photo: 'steven.png',
    rating: 5,
    review: 106,
    bio:
      'I have a Master Certification and I pride on good work. Really enjoy working on cars',
    mention: [
      '22 years of experience',
      'Background checked',
      "Passed FixMyCar's test",
    ],
    badge: [
      'Brakes',
      'Suspension',
      'Engine',
      'Electrical',
      'Diagnosis',
      'European Cars',
    ],
  },
  {
    name: 'Mark Zuckerberg',
    photo: 'mark.png',
    rating: 5,
    review: 106,
    bio:
      'I have a Master Certification and I pride on good work. Really enjoy working on cars',
    mention: [
      '22 years of experience',
      'Background checked',
      "Passed FixMyCar's test",
    ],
    badge: [
      'Brakes',
      'Suspension',
      'Engine',
      'Electrical',
      'Diagnosis',
      'European Cars',
    ],
  },
];

export const itemFooter = {
  menu: ['Services', 'Advice', 'Help'],
  carMakers: [
    'Acura',
    'Aston Martin',
    'Bentley',
    'Cadilac',
    'Ferrari',
    'Infinity',
    'Lexus',
    'Lincoin',
    'Maserati',
    'Maybach',
    'Mazda',
    'Mercury',
    'Mini',
    'Bmw',
    'Buick',
    'Hummer',
    'Acurat',
    'Aston Martint',
    'Bentleyt',
    'Cadilact',
    'Ferrarit',
    'Infinityt',
    'Lexust',
    'Lincoint',
    'Maseratit',
    'Maybacht',
    'Mazdat',
    'Mercuryt',
    'Minit',
    'Bmwt',
    'Buickt',
    'Hummert',
    'Acurar',
    'Aston Martinr',
    'Bentleyr',
    'Cadilacr',
    'Ferrarir',
    'Infinityr',
    'Lexusr',
    'Lincoinr',
    'Maseratir',
    'Maybachr',
    'Mazdar',
    'Mercuryr',
    'Minir',
    'Bmwr',
    'Buickr',
    'Hummerr',
  ],
};

// quote variables
export const arrCarSelectTypes = {
  [CarSelectType.BY_PLATE_NUMBER]: 'Plate number',
  [CarSelectType.BY_YEAR_MAKE_MODEL]: 'Year/make/model',
};

export const arrQuoteSteps = [
  QuoteStep.QUOTE_SEARCH_CAR,
  QuoteStep.QUOTE_SERVICE_DESK,
  QuoteStep.QUOTE_REVIEW,
];

export const allYears = {
  2015: 2015,
  2016: 2016,
  2017: 2017,
  2018: 2018,
  2019: 2019,
  2020: 2020,
  2021: 2021,
};

export const allBrands = {
  Audi: 'Audi',
  Ford: 'Ford',
  Benz: 'Benz',
};

export const allModels = {
  V3: 'V3',
  MM1: 'MM1',
  H123: 'H123',
};

export const allMotors = {
  V3: 'V3',
  MM1: 'MM1',
  H123: 'H123',
};

export const allStaticServices = [
  {
    name: 'Front brakes pads & rotors',
    image: 'brakes',
    select: false,
  },
  {
    name: 'Used car',
    image: 'used-car',
    select: false,
  },
  {
    name: 'Diagnosis / Inspection',
    image: 'diagnosis',
    select: true,
  },
  {
    name: 'Oil Change',
    image: 'oil-change',
    select: false,
  },
  {
    name: 'Replace Starter',
    image: 'replace-starter',
    select: true,
  },
  {
    name: 'Replace Battery',
    image: 'replace-battery',
    select: false,
  },
];

export const listNotSureReasons = [
  {
    id: 1,
    title: 'I hear something',
    subReason: [
      'Knocking/Clunking sound',
      'Whining sound',
      'Grinding sound',
      'Rattling sound',
      'Humming sound',
      'Starting trouble',
    ],
  },
  {
    id: 2,
    title: 'I smell something',
    subReason: [
      'Knocking/Clunking sound',
      'Whining sound',
      'Grinding sound',
      'Rattling sound',
      'Humming sound',
      'Starting trouble',
    ],
  },
  {
    id: 3,
    title: 'I feel something',
    subReason: [
      'Knocking/Clunking sound',
      'Whining sound',
      'Grinding sound',
      'Rattling sound',
      'Humming sound',
      'Starting trouble',
    ],
  },
  {
    id: 4,
    title: 'I see something',
    subReason: [
      'Knocking/Clunking sound',
      'Whining sound',
      'Grinding sound',
      'Rattling sound',
      'Humming sound',
      'Starting trouble',
    ],
  },
  {
    id: 5,
    title: 'Warning light',
    subReason: [
      'Knocking/Clunking sound',
      'Whining sound',
      'Grinding sound',
      'Rattling sound',
      'Humming sound',
      'Starting trouble',
    ],
  },
  {
    id: 6,
    title: 'Starting trouble',
    subReason: [
      'Knocking/Clunking sound',
      'Whining sound',
      'Grinding sound',
      'Rattling sound',
      'Humming sound',
      'Starting trouble',
    ],
  },
  {
    id: 7,
    title: 'Failed smog check',
    subReason: [
      'Knocking/Clunking sound',
      'Whining sound',
      'Grinding sound',
      'Rattling sound',
      'Humming sound',
      'Starting trouble',
    ],
  },
  {
    id: 8,
    title: 'Car is dead',
    subReason: [
      'Knocking/Clunking sound',
      'Whining sound',
      'Grinding sound',
      'Rattling sound',
      'Humming sound',
      'Starting trouble',
    ],
  },
];

export const faq = [
  {
    q: 'Does the inspection include the travel fee?',
    a:
      'The insepction service includes all the travel fees. The fixed price you get, is the fixed price you pay.',
  },
  {
    q: 'How long does it take for a tech to contact me?',
    a:
      'The insepction service includes all the travel fees. The fixed price you get, is the fixed price you pay.',
  },
  {
    q: 'If a tech cannot find me, will they call?',
    a:
      'The insepction service includes all the travel fees. The fixed price you get, is the fixed price you pay.',
  },
  {
    q: 'If my car cannot be fixed, what happens?',
    a:
      'The insepction service includes all the travel fees. The fixed price you get, is the fixed price you pay.',
  },
  {
    q: 'May I use the same tech in the future?',
    a:
      'The insepction service includes all the travel fees. The fixed price you get, is the fixed price you pay.',
  },
  {
    q: 'What if I find a cheaper alternative?',
    a:
      'The insepction service includes all the travel fees. The fixed price you get, is the fixed price you pay.',
  },
];

export const carLocations = [
  'Driveway',
  'Business Parking Lot',
  'Apartment Parking Lot',
  'Street Parking',
  'Other',
];
