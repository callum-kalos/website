/**
 * Per-location data for Kalos location pages.
 * Add a new location here + a route in main.tsx and a new page is live.
 */

export interface LocationData {
  slug: 'san-francisco' | 'palo-alto' | 'san-jose'
  city: string // "San Francisco"
  shortName: string // "SF"
  eyebrow: string // "Kalos San Francisco"
  heroHeadline: string
  heroSubcopy: string
  address: {
    line1: string
    line2?: string
    cityStateZip: string
    neighborhood: string
  }
  mapsUrl: string
  hours: string[]
  phone: string | null
  transit: string
  parking: string
  narrativeTitle: string
  narrativeBody: string[]
  narrativeQuote: {
    text: string
    attribution: string
  }
  serviceArea: string[]
  /** Map-style gradient fallback color pair — used until real photos land */
  colorSwatch: [string, string]
  /** Optional image paths (relative to /public). Omit for placeholders. */
  images?: {
    hero?: string
    feature?: string
    consultation?: string
    lobby?: string
    exterior?: string
    detail?: string
  }
}

const SF: LocationData = {
  slug: 'san-francisco',
  city: 'San Francisco',
  shortName: 'SF',
  eyebrow: 'Kalos San Francisco',
  heroHeadline: 'DEXA scans in the heart of the city.',
  heroSubcopy:
    "Clinical-grade body composition scanning and expert analysis in the Financial District. Walk in, scan, sit down with an analyst, walk out with a plan. All in under 30 minutes.",
  address: {
    line1: '98a Battery Street',
    cityStateZip: 'San Francisco, CA 94111',
    neighborhood: 'Financial District, steps from the Embarcadero',
  },
  mapsUrl: 'https://maps.google.com/?q=98a+Battery+St,+San+Francisco,+CA+94111',
  hours: ['Mon–Fri · 8am–6pm', 'Saturday · 9am–5pm', 'Sunday · Closed'],
  phone: null,
  transit: 'Two blocks from Embarcadero BART / Muni. Ferry Building a 4-minute walk.',
  parking: 'Street parking on Battery and Pine. Embarcadero Center garage nearby.',
  narrativeTitle: 'Inside our San Francisco location',
  narrativeBody: [
    "We built the SF space to feel nothing like a medical office. Warm wood, soft lighting, a quiet private consultation room. You change, you scan, you sit with your analyst over a coffee. No waiting rooms, no clipboards, no paper gowns.",
    "Our downtown location is where we see the highest concentration of long-term members, many of whom return every 6-8 weeks to track how their training, travel, and nutrition changes are showing up in the data.",
  ],
  narrativeQuote: {
    text: "The SF location is designed to feel like the nicest 30 minutes of your week, not a trip to the doctor.",
    attribution: 'Alex Shultz, General Manager',
  },
  serviceArea: [
    'Financial District',
    'SoMa',
    'Mission Bay',
    'Pacific Heights',
    'Marina',
    'North Beach',
  ],
  colorSwatch: ['#2a2420', '#1A1A1A'],
}

const PA: LocationData = {
  slug: 'palo-alto',
  city: 'Palo Alto',
  shortName: 'PA',
  eyebrow: 'Kalos Palo Alto',
  heroHeadline: 'DEXA scans on University Avenue.',
  heroSubcopy:
    "Our downtown Palo Alto location sits between Nobu and Whole Foods, a block from University Ave. Clinical-grade body composition scanning with expert analysis built for the most data-literate crowd in the Bay.",
  address: {
    line1: '195 Forest Avenue',
    cityStateZip: 'Palo Alto, CA 94301',
    neighborhood: 'Downtown Palo Alto, between Nobu and Whole Foods',
  },
  mapsUrl: 'https://maps.google.com/?q=195+Forest+Ave,+Palo+Alto,+CA+94301',
  hours: ['Mon–Fri · 8am–6pm', 'Saturday · 9am–5pm', 'Sunday · Closed'],
  phone: null,
  transit: "8-minute walk from Palo Alto Caltrain. Two blocks to University Ave.",
  parking: 'Forest Ave public garage directly across the street. Free 3-hour street parking on Forest.',
  narrativeTitle: 'Inside our Palo Alto location',
  narrativeBody: [
    "The Palo Alto location is our most research-heavy. Our members here tend to show up with spreadsheets, Whoop data, and sharp questions about ALMI percentile curves. Your analyst comes prepared to go deep.",
    "The space itself is quiet, private, and purpose-built: one DEXA room, one consultation room, and a lounge that looks out onto Forest Avenue. You're in and out in 30 minutes with clarity you can't get anywhere else on the Peninsula.",
  ],
  narrativeQuote: {
    text: "Palo Alto members don't want a lecture. They want the raw numbers, the right context, and a plan they can A/B test on themselves.",
    attribution: 'Matteo Ascherio-Victoria, General Manager',
  },
  serviceArea: [
    'Palo Alto',
    'Menlo Park',
    'Atherton',
    'Stanford',
    'Mountain View',
    'Los Altos',
  ],
  colorSwatch: ['#2c2420', '#1A1A1A'],
}

const SJ: LocationData = {
  slug: 'san-jose',
  city: 'San Jose',
  shortName: 'SJ',
  eyebrow: 'Kalos San Jose',
  heroHeadline: 'DEXA scans at The Pruneyard.',
  heroSubcopy:
    "Our South Bay location in The Pruneyard serves San Jose, Campbell, Los Gatos, Willow Glen, and Saratoga. Same clinical-grade scan, same 30-minute in-person analysis, same expert coaching.",
  address: {
    line1: '1875 S Bascom Avenue',
    line2: 'Unit 2550',
    cityStateZip: 'Campbell, CA 95008',
    neighborhood: 'The Pruneyard shopping center',
  },
  mapsUrl: 'https://maps.google.com/?q=1875+S+Bascom+Ave+Unit+2550,+Campbell,+CA+95008',
  hours: ['Mon–Fri · 8am–6pm', 'Saturday · 9am–5pm', 'Sunday · Closed'],
  phone: null,
  transit: 'Right off Highway 17 and 880. 5-minute drive from downtown Campbell.',
  parking: 'Free surface parking throughout The Pruneyard. No time limit.',
  narrativeTitle: 'Inside our San Jose location',
  narrativeBody: [
    "The Pruneyard location is our newest and largest space. South Bay families and working professionals come here for the convenience: free parking, easy highway access, and weekend hours that actually work around a real schedule.",
    "We designed the space with privacy in mind. Your scan, your consultation, and your follow-up plan all happen in quiet, one-on-one rooms. No shared floor space, no crowd.",
  ],
  narrativeQuote: {
    text: "Our San Jose members come back because we meet them where they live. Easy parking, flexible hours, and analysts who treat their time like it matters.",
    attribution: 'Your Kalos San Jose team',
  },
  serviceArea: [
    'San Jose',
    'Campbell',
    'Los Gatos',
    'Willow Glen',
    'Saratoga',
    'Cupertino',
  ],
  colorSwatch: ['#2a2620', '#1A1A1A'],
  images: {
    hero: '/San Jose/Hero.jpg',
    feature: '/San Jose/Person on scan.jpg',
    consultation: '/San Jose/Consultation together.jpg',
    lobby: '/San Jose/Consult room.jpg',
    exterior: '/San Jose/Exterior.JPG',
    detail: '/San Jose/Looking at the report.jpg',
  },
}

export const locations: Record<LocationData['slug'], LocationData> = {
  'san-francisco': SF,
  'palo-alto': PA,
  'san-jose': SJ,
}

export const locationsList: LocationData[] = [SF, PA, SJ]
