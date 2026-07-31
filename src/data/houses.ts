export interface House {
  id: string;
  name: string;
  banglaName: string;
  description: string;
  banglaDescription: string;
  color: string;
  bgGradient: string;
  borderColor: string;
  flagEmoji: string;
  motto: string;
}

export const HOUSES: House[] = [
  {
    id: 'jagadish',
    name: 'Jagadish Chandra House',
    banglaName: 'জগদীশ চন্দ্র হাউজ',
    description: 'House of Science and Scientific Wonders. Inspired by Acharya Jagadish Chandra Bose.',
    banglaDescription: 'বিজ্ঞান ও জীবজগৎ গবেষণা। আচার্য জগদীশ চন্দ্র বসুর আবিষ্কারের আলোয় উদ্ভাসিত।',
    color: '#3b82f6',
    bgGradient: 'from-blue-600/20 via-blue-900/10 to-slate-900',
    borderColor: 'border-blue-500/30',
    flagEmoji: '🔋',
    motto: 'বৃক্ষেরও প্রাণ আছে, জ্ঞানেরও স্পন্দন আছে।'
  },
  {
    id: 'satyendra',
    name: 'Satyendra Nath House',
    banglaName: 'সত্যেন্দ্রনাথ বোস হাউজ',
    description: 'House of Mathematics and Physics. Inspired by legendary physicist Satyendra Nath Bose.',
    banglaDescription: 'তত্ত্বীয় পদার্থবিজ্ঞান ও মহাবিশ্বের কণা। বোস-আইনস্টাইন সংখ্যাতত্ত্বের ধারক।',
    color: '#a855f7',
    bgGradient: 'from-purple-600/20 via-purple-900/10 to-slate-900',
    borderColor: 'border-purple-500/30',
    flagEmoji: '⚛️',
    motto: 'বোসন কণার অনন্ত শক্তিতে বিশ্বজয়ী।'
  },
  {
    id: 'fazlur',
    name: 'Fazlur Rahman Khan House',
    banglaName: 'ফজলুর রহমান খান হাউজ',
    description: 'House of Engineering and Architectural Pride. Inspired by structural engineer F.R. Khan.',
    banglaDescription: 'প্রকৌশল, অবকাঠামো ও আকাশচুম্বী পরিকল্পনা। সিয়ার্স টাওয়ারের স্রষ্টা এফ. আর. খানের গৌরব।',
    color: '#f59e0b',
    bgGradient: 'from-amber-600/20 via-amber-900/10 to-slate-900',
    borderColor: 'border-amber-500/30',
    flagEmoji: '🏗️',
    motto: 'আকাশ ছুঁতে চাই কাঠামোর দৃঢ়তায়।'
  },
  {
    id: 'rokeya',
    name: 'Begum Rokeya House',
    banglaName: 'বেগম রোকেয়া হাউজ',
    description: 'House of Literature, Social Reform, and Culture. Inspired by pioneer Begum Rokeya Sakhawat.',
    banglaDescription: 'জ্ঞানচর্চা, সামাজিক পরিবর্তন ও নারী জাগরণ। বেগম রোকেয়া সাখাওয়াত হোসেনের আদর্শ।',
    color: '#10b981',
    bgGradient: 'from-emerald-600/20 via-emerald-900/10 to-slate-900',
    borderColor: 'border-emerald-500/30',
    flagEmoji: '🪶',
    motto: 'জ্ঞানের আলো জ্বেলে মানবতার মুক্তি।'
  }
];
