const fs = require('fs');
const rawText = `
396. প্রশ্ন: নিচের কোনটি মস্তিষ্কের টিউমার শনাক্তকরণে সর্বাধিক ব্যবহৃত হয়? (a)
UV (b) Radio wave (c) IR (d) MRI সঠিক উত্তর: (d)

397. প্রশ্ন: MRI এর অর্থ কী? (a) মডার্ন রেজোন্যান্স ইমেজিং (b) ম্যাগনেটিক
রেডিয়্যাশন ইমেজিং (c) মলিকুলার রেজোন্যান্স ইমেজিং (d) ম্যাগনেটিক
রেজোন্যান্স ইমেজিং সঠিক উত্তর: (d)

398. প্রশ্ন: নিচের কোন নিউক্লিয়াসটি NMR সক্রিয়? (a) ¹⁶₈O (b) ¹²₆C (c) ³²₁₆S (d)
¹₁H সঠিক উত্তর: (d)

399. প্রশ্ন: ব্রেনের চিকিৎসায় কার্যকর থেরাপি কোনটি? (a) MRI থেরাপি (b) IR থেরাপি
(c) X থেরাপি (d) UV থেরাপি সঠিক উত্তর: (a)

400. প্রশ্ন: পরমাণুর কোন ধর্মের উপর নির্ভর করে NMR? (a) বৈদ্যুতিক ধর্ম (b)
চৌম্বক ধর্ম (c) রাসায়নিক ধর্ম (d) তেজস্ক্রিয় ধর্ম সঠিক উত্তর: (b)

401. প্রশ্ন: NMR বর্ণালিমিতির প্রয়োগ নিম্নের কোনটিতে ঘটে? (a) IR (b) MRI (c)
X-ray (d) সিটিস্ক্যান সঠিক উত্তর: (b)

402. প্রশ্ন: বর্ণালিমিতিক বিশ্লেষণ কোনটি? (a) HPLC (b) NMR (c) GPC (d) TGA সঠিক
উত্তর: (b)

403. প্রশ্ন: MRI যন্ত্রের সাহায্যে মানবদেহের রোগ নির্ণয়ে কোন মৌলটির ভূমিকা
রয়েছে? (a) হাইড্রোজেন (b) অক্সিজেন (c) নিয়ন (d) সিলিকন সঠিক উত্তর: (a)

404. প্রশ্ন: নিচের কোনটিতে ক্ষতিকর রশ্মির কোন ঝুঁকি থাকে না? (a) MRI (b) X-ray
(c) CAT (d) CT সঠিক উত্তর: (a)

405. প্রশ্ন: MRI মেশিনে কোন তরঙ্গ ব্যবহৃত হয়? (a) UV ray (b) Radio wave (c) IR
ray (d) Cosmic ray সঠিক উত্তর: (b)

406. প্রশ্ন: MRI মেশিনের তরঙ্গের কম্পাঙ্ক কত? (a) 10² Hz (b) 10³ Hz (c) 10⁴ Hz
(d) 10⁵ Hz সঠিক উত্তর: (d)

407. প্রশ্ন: মস্তিষ্ক কোষের কোন উপাদান থেকে NMR সিগন্যাল পাওয়া যায়? (a) গ্লুকোজ
(b) প্রোটিন (c) H₂O (d) Na⁺ সঠিক উত্তর: (c)

408. প্রশ্ন: MRI- উদ্ভাবন করেন কে? (a) Joe Baider (b) Peter Mansfield (c) John
Sina (d) Barack Cathrin সঠিক উত্তর: (b)

409. প্রশ্ন: কোন মেশিনে শক্তিশালী চৌম্বকক্ষেত্র থাকে? (a) FIR (b) UV (c) MIR (d)
MRI সঠিক উত্তর: (d)

410. প্রশ্ন: MRI প্রাপ্তির লক্ষ্যে কত মাত্রার চৌম্বকক্ষেত্র প্রয়োজন? (a) 0.5 - 3
Tesla (b) 1.5 - 4 Tesla (c) 1 - 3 Tesla (d) 2 - 6 Tesla সঠিক উত্তর: (a)

411. প্রশ্ন: CT scan মেশিনে কোন রশ্মি ব্যবহার করা হয়? (a) Radio wave (b) UV ray
(c) IR ray (d) X ray সঠিক উত্তর: (d)

412. প্রশ্ন: NMR এর পূর্ণরূপ হলো- (a) Nucleus Magnetic Resonance (b) Nuclear
Magnet Resonance (c) Nuclear Magnetic Resonance (d) Nuclear Magnetic Reading
সঠিক উত্তর: (c)
`;

function parseQuestions(text, topic, timeLimit) {
  const blocks = text.split(/(?=\d{2,3}\.\s+প্রশ্ন:)/);
  const result = [];
  
  for (const block of blocks) {
      if (!block.trim()) continue;
      
      let norm = block.replace(/\r?\n/g, ' ').replace(/\s+/g, ' ').trim();
      
      const numMatch = norm.match(/^(\d{2,3})\.\s+প্রশ্ন:\s+(.*?)\s+\((?:a|A)\)/);
      if (!numMatch) continue;
      
      const id = parseInt(numMatch[1], 10);
      const questionText = numMatch[2].trim();
      
      let remain = norm.substring(numMatch[0].length - 3);
      
      const optMatch = remain.match(/\((?:a|A)\)\s*(.*?)\s+\((?:b|B)\)\s*(.*?)\s+\((?:c|C)\)\s*(.*?)\s+\((?:d|D)\)\s*(.*?)\s+সঠিক উত্তর:/);
      if (!optMatch) continue;
      
      const options = [optMatch[1].trim(), optMatch[2].trim(), optMatch[3].trim(), optMatch[4].trim()];
      
      let correctAnswerIndex = -1;
      const ansMatch = remain.match(/সঠিক উত্তর:\s*\(((?:a|b|c|d|a,\s*c|a,c))\)/);
      let correctAnswer = '';
      if (ansMatch) {
          const val = ansMatch[1];
          if (val === 'a') correctAnswerIndex = 0;
          else if (val === 'b') correctAnswerIndex = 1;
          else if (val === 'c') correctAnswerIndex = 2;
          else if (val === 'd') correctAnswerIndex = 3;
          else if (val === 'a, c' || val === 'a,c') correctAnswerIndex = 0;
          
          if (correctAnswerIndex !== -1) {
             correctAnswer = options[correctAnswerIndex];
          }
      }
      
      let explanation = '';
      const expMatch = remain.match(/ব্যাখ্যা:\s*(.*)$/);
      if (expMatch && expMatch[1]) {
          explanation = expMatch[1].trim();
      }
      
      result.push({
          id,
          topic,
          question_text: questionText,
          options,
          correct_answer: correctAnswer,
          explanation,
          time_limit: timeLimit
      });
  }
  return result;
}

const qs = parseQuestions(rawText, "রোগ নির্ণয়ে MRI এই পরীক্ষা", 35);

const filePath = 'src/data/questions_chem1_chap2.ts';
let existing = fs.readFileSync(filePath, 'utf-8');

const newQsStr = JSON.stringify(qs, null, 2);
const innerQs = newQsStr.substring(newQsStr.indexOf('[') + 1, newQsStr.lastIndexOf(']'));

const lastBracketIdx = existing.lastIndexOf(']');
if (lastBracketIdx !== -1) {
    const updated = existing.substring(0, lastBracketIdx) + ',' + innerQs + existing.substring(lastBracketIdx);
    fs.writeFileSync(filePath, updated);
    console.log('Successfully appended ' + qs.length + ' questions.');
} else {
    console.error('Could not find questions array in file.');
}
