// Illustrative sample data for the demo. Always verify amounts, rules and dates on the official portal.
const D = ['Aadhaar card', 'Latest marksheet', 'Bank passbook', 'Bonafide certificate']
const S = (id, name, provider, amount, levels, o = {}) => ({
  id, name, provider, amount, levels, maxIncome: 1e9, categories: ['All'], gender: 'Any',
  minPercent: 0, states: 'All', ...o, docs: [...D, ...(o.docs || [])],
})
export const SCHOLARSHIPS = [
  S('sc-pm', 'Post Matric Scholarship for SC Students', 'Govt. of India (NSP)', 50000, ['UG', 'PG', 'Diploma'], { maxIncome: 250000, categories: ['SC'], deadline: '2026-12-31', docs: ['Caste certificate', 'Income certificate'], url: 'https://scholarships.gov.in' }),
  S('cs-merit', 'Central Sector Scholarship (merit)', 'Govt. of India (NSP)', 20000, ['UG'], { maxIncome: 450000, minPercent: 80, deadline: '2026-12-31', docs: ['Income certificate', 'Class 12 marksheet'], url: 'https://scholarships.gov.in' }),
  S('minority', 'Merit-cum-Means for Minority Students', 'Ministry of Minority Affairs', 30000, ['UG', 'PG', 'Diploma'], { maxIncome: 250000, categories: ['Minority'], minPercent: 50, deadline: '2026-12-28', docs: ['Minority certificate', 'Income certificate'], url: 'https://scholarships.gov.in' }),
  S('pragati', 'Pragati Scholarship for Girls in Technical Education', 'AICTE', 50000, ['UG', 'Diploma'], { gender: 'Female', maxIncome: 800000, deadline: '2026-12-15', docs: ['Income certificate', 'Admission letter'] }),
  S('kanya', 'Kotak Kanya Scholarship', 'Kotak Education Foundation', 150000, ['UG'], { gender: 'Female', maxIncome: 600000, minPercent: 75, deadline: '2026-11-30', docs: ['Income proof', 'Admission letter'] }),
  S('reliance', 'Reliance Foundation Undergraduate Scholarship', 'Reliance Foundation', 200000, ['UG'], { maxIncome: 1500000, minPercent: 60, deadline: '2026-12-10', docs: ['Income proof', 'Class 12 marksheet'] }),
  S('hdfc', 'HDFC Badhte Kadam Educational Crisis Support', 'HDFC Bank Parivartan', 75000, ['School', 'UG', 'PG', 'Diploma'], { maxIncome: 600000, minPercent: 55, deadline: '2026-12-20', docs: ['Income proof', 'Fee receipt'] }),
  S('pankh', 'Tata Capital Pankh Scholarship', 'Tata Capital', 12000, ['School', 'UG', 'Diploma'], { maxIncome: 400000, minPercent: 60, deadline: '2027-01-15', docs: ['Income proof', 'Fee receipt'] }),
  S('birla', 'Aditya Birla Scholarship', 'Aditya Birla Group', 175000, ['UG'], { minPercent: 85, deadline: '2026-12-05', docs: ['Entrance rank card', 'Admission letter'] }),
  S('inspire', 'INSPIRE-SHE for Natural Sciences', 'Dept. of Science & Technology', 80000, ['UG'], { minPercent: 90, deadline: '2026-11-20', docs: ['Class 12 marksheet', 'Admission letter'] }),
  S('vidyasiri', 'Vidyasiri Scholarship', 'Govt. of Karnataka', 15000, ['UG', 'PG', 'Diploma'], { states: ['Karnataka'], categories: ['OBC', 'SC', 'ST'], maxIncome: 250000, deadline: '2027-01-10', docs: ['Caste certificate', 'Income certificate', 'Domicile certificate'] }),
  S('mh-ebc', 'EBC Fee Concession', 'Govt. of Maharashtra', 30000, ['UG', 'PG'], { states: ['Maharashtra'], maxIncome: 800000, deadline: '2027-01-05', docs: ['Income certificate', 'Domicile certificate'] }),
  S('ts-epass', 'ePASS Post Matric Scholarship', 'Govt. of Telangana', 35000, ['UG', 'PG'], { states: ['Telangana'], categories: ['SC', 'ST', 'OBC', 'EWS'], maxIncome: 200000, deadline: '2027-01-31', docs: ['Caste certificate', 'Income certificate'] }),
  S('tn-pp', 'Pudhumai Penn Monthly Support', 'Govt. of Tamil Nadu', 12000, ['UG', 'Diploma'], { states: ['Tamil Nadu'], gender: 'Female', deadline: '2027-02-10', docs: ['Government school certificate'] }),
  S('jindal', 'Sitaram Jindal Foundation Scholarship', 'Sitaram Jindal Foundation', 24000, ['School', 'UG', 'Diploma'], { maxIncome: 300000, deadline: '2027-01-20', docs: ['Income proof'] }),
  S('st-pm', 'Post Matric Scholarship for ST Students', 'Govt. of India (NSP)', 45000, ['UG', 'PG', 'Diploma'], { maxIncome: 250000, categories: ['ST'], deadline: '2026-12-31', docs: ['Caste certificate', 'Income certificate'], url: 'https://scholarships.gov.in' }),
  S('obc-pm', 'Post Matric Scholarship for OBC Students', 'Govt. of India (NSP)', 30000, ['UG', 'PG', 'Diploma'], { maxIncome: 150000, categories: ['OBC'], deadline: '2026-12-31', docs: ['Caste certificate', 'Income certificate'], url: 'https://scholarships.gov.in' }),
  S('kerala', 'Higher Education Merit Scholarship', 'Govt. of Kerala', 20000, ['UG'], { states: ['Kerala'], minPercent: 75, maxIncome: 600000, deadline: '2027-02-15', docs: ['Domicile certificate'] }),
  S('delhi', 'Delhi Merit Scholarship', 'Govt. of Delhi', 25000, ['UG', 'PG'], { states: ['Delhi'], minPercent: 70, maxIncome: 500000, deadline: '2027-01-18', docs: ['Domicile certificate', 'Income certificate'] }),
  S('up', 'Post Matric Scholarship (UP)', 'Govt. of Uttar Pradesh', 28000, ['UG', 'PG', 'Diploma'], { states: ['Uttar Pradesh'], maxIncome: 200000, deadline: '2027-01-12', docs: ['Domicile certificate', 'Income certificate'] }),
  S('raj', 'Rajasthan Merit Scholarship', 'Govt. of Rajasthan', 22000, ['UG'], { states: ['Rajasthan'], minPercent: 65, deadline: '2027-02-05', docs: ['Domicile certificate'] }),
]
export const LEVELS = ['School', 'Diploma', 'UG', 'PG']
export const CATEGORIES = ['General', 'OBC', 'SC', 'ST', 'EWS', 'Minority']
export const STATES = ['Karnataka', 'Maharashtra', 'Tamil Nadu', 'Telangana', 'Kerala', 'Delhi', 'Uttar Pradesh', 'Rajasthan', 'Other']
