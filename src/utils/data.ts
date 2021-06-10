import iconAdvantage from 'src/assets/advantage';
import imgCandidate from 'src/assets/candidates';
import imgCustomer from 'src/assets/customers';
import imgBadge from 'src/assets/badges';
import imgService from 'src/assets/services';

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
    img: iconAdvantage.money,
    title: 'Affordable & honest',
    subtitle:
      "Fixed & upfront pricing. No hidden fees and you'll get the lowest prices guaranteed.",
  },
  {
    img: iconAdvantage.ring,
    title: "We'll come to you",
    subtitle:
      'Friendly, car mechanics will come to your home, office or parking lot.',
  },
  {
    img: iconAdvantage.time,
    title: 'Flexible hours',
    subtitle:
      'Open every-day from 9am - 9pm. Book our epxerienced certified technicians today.',
  },
];

export const itemsShop = [
  {
    img: iconAdvantage.shop_money,
    title: 'Expensive & devius',
    subtitle: '30% more expensive and come with additional fees & upsells.',
  },
  {
    img: iconAdvantage.shop_location,
    title: 'Inconvinient service locations',
    subtitle: 'Repairs must be done at a physical auto repair shop.',
  },
  {
    img: iconAdvantage.shop_rigid,
    title: 'Rigid hours',
    subtitle: 'Open limited hours and at times closed on weekends.',
  },
];

export const itemsCustomer = [
  {
    img: imgCustomer.mariah,
    name: 'Mariah Heighl',
  },
  {
    img: imgCustomer.johnny,
    name: 'Johnny Riece',
  },
  {
    img: imgCustomer.marian,
    name: 'Marian Huves',
  },
  {
    img: imgCustomer.alice,
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
    photo: imgCandidate.steven,
    photoASE: 'steven-ase.png',
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
      {
        name: 'Brakes',
        img: imgBadge.brakes,
      },
      {
        name: 'Suspension',
        img: imgBadge.suspension,
      },
      {
        name: 'Engine',
        img: imgBadge.engine,
      },
      {
        name: 'Electrical',
        img: imgBadge.electrical,
      },
      {
        name: 'Diagnosis',
        img: imgBadge.diagnosis,
      },
      {
        name: 'European Cars',
        img: imgBadge.european_cars,
      },
    ],
  },
  {
    name: 'Mark Zuckerberg',
    photo: imgCandidate.mark,
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
      {
        name: 'Brakes',
        img: imgBadge.brakes,
      },
      {
        name: 'Suspension',
        img: imgBadge.suspension,
      },
      {
        name: 'Engine',
        img: imgBadge.engine,
      },
      {
        name: 'Electrical',
        img: imgBadge.electrical,
      },
      {
        name: 'Diagnosis',
        img: imgBadge.diagnosis,
      },
      {
        name: 'European Cars',
        img: imgBadge.european_cars,
      },
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
export const stateList = [
  'AK',
  'AL',
  'AR',
  'AS',
  'AZ',
  'CA',
  'CO',
  'CT',
  'DC',
  'DE',
  'FL',
  'GA',
  'GU',
  'HI',
  'IA',
  'ID',
  'IL',
  'IN',
  'KS',
  'KY',
  'LA',
  'MA',
  'MD',
  'ME',
  'MI',
  'MN',
  'MO',
  'MS',
  'MT',
  'NC',
  'ND',
  'NE',
  'NH',
  'NJ',
  'NM',
  'NV',
  'NY',
  'OH',
  'OK',
  'OR',
  'PA',
  'PR',
  'RI',
  'SC',
  'SD',
  'TN',
  'TX',
  'UT',
  'VA',
  'VI',
  'VT',
  'WA',
  'WI',
  'WV',
  'WY',
];

export const arrCarSelectTypes = {
  [CarSelectType.BY_PLATE_NUMBER]: 'Plate number',
  [CarSelectType.BY_YEAR_MAKE_MODEL]: 'Year/make/model',
};

export const arrQuoteSteps = [
  QuoteStep.QUOTE_SERVICE_DESK,
  QuoteStep.QUOTE_SEARCH_CAR,
  QuoteStep.QUOTE_CONTACT,
];

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
    image: imgService.brakes,
    imageSelected: imgService.brakes_selected,
  },
  {
    name: 'Used car',
    image: imgService.used_car,
    imageSelected: imgService.used_car_selected,
  },
  {
    name: 'Diagnosis / Inspection',
    image: imgService.diagnosis,
    imageSelected: imgService.diagnosis_selected,
  },
  {
    name: 'Oil Change',
    image: imgService.oil_change,
    imageSelected: imgService.oil_change_selected,
  },
  {
    name: 'Replace Starter',
    image: imgService.replace_starter,
    imageSelected: imgService.replace_starter_selected,
  },
  {
    name: 'Replace Battery',
    image: imgService.replace_battery,
    imageSelected: imgService.replace_battery_selected,
  },
];

export const listNotSureReasons = [
  {
    id: 1,
    title: 'I hear something',
    subReason: [
      'Knocking/clunking sound',
      'Whining sound',
      'Squealing sound',
      'Grinding sound',
      'Rattling sound',
      'Humming sound',
      'Starting trouble',
      'Loud noise',
    ],
  },
  {
    id: 2,
    title: 'I smell something',
    subReason: [
      'Burning smell',
      'Musty, stale odor',
      'Rotten eggs',
      'Coolant',
      'Fuel',
    ],
  },
  {
    id: 3,
    title: 'I feel something',
    subReason: [
      'AC blowing hot air',
      'Car stalling',
      'Drifts or pulls to the side',
      'Car is vibrating',
      'Poor acceleration',
      'Poor shifting',
      'Steering has excessive play',
      'Poor braking',
      'Rough idling',
      'Suspension feels uneven',
      'Car is jerking',
    ],
  },
  {
    id: 4,
    title: 'I see something',
    subReason: [
      'Fluid leaking',
      'Warning light on',
      'Smoke',
      'Poor gas mileage',
      'Uneven tire wear',
      'No electrical power',
    ],
  },
  {
    id: 5,
    title: 'Warning light',
    subReason: [
      'Battery Light',
      'Check Engine Light',
      'Low Engine Oil Light',
      'Engine Temperature Light',
      'ABS Warning Light',
      'Brake Warning Light',
      'Air Bag Light',
    ],
  },
  {
    id: 6,
    title: 'Starting trouble',
    subReason: ['Sounds rough', 'Hard to start'],
  },
  {
    id: 7,
    title: 'Failed smog check',
    subReason: [],
  },
  {
    id: 8,
    title: 'Car is dead',
    subReason: [],
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

export const cardTypes = ['visa', 'mastercard', 'american-express'];
