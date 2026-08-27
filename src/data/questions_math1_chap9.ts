import { ChapterData } from '../types';

export const math1Chap9Data: ChapterData = {
  "subject": "উচ্চতর গণিত ১ম পত্র",
  "chapter": "৯. অন্তরীকরণ",
  "questions": [
    {
      "id": 1,
      "topic": "২. বীজগাণিতিক লিমিট, অসীম লিমিট ও L'Hôpital's Rule",
      "question_text": "১. $\\lim_{x \\to 3} \\frac{x^3 - 27}{x^2 - 9}$ এর মান কোনটি? [সি. বো. ২৩; অনুরূপ প্রশ্ন: য. বো. ১৯]",
      "options": [
        "$\\infty$",
        "$0$",
        "$\\frac{9}{2}$",
        "$6$"
      ],
      "correct_answer": "$\\frac{9}{2}$",
      "explanation": "$$ \\lim_{x \\to 3} \\frac{(x - 3)(x^2 + 3x + 9)}{(x - 3)(x + 3)} = \\lim_{x \\to 3} \\frac{x^2 + 3x + 9}{x + 3} = \\frac{9}{2} $$",
      "time_limit": 60
    },
    {
      "id": 2,
      "topic": "২. বীজগাণিতিক লিমিট, অসীম লিমিট ও L'Hôpital's Rule",
      "question_text": "২. $\\lim_{x \\to 0} \\frac{2x + 1}{5x^2 - 6} = $ কত? [দি. বো. ২১]",
      "options": [
        "$-\\frac{1}{6}$",
        "$\\frac{1}{5}$",
        "$\\frac{2}{5}$",
        "$0$"
      ],
      "correct_answer": "$-\\frac{1}{6}$",
      "explanation": "$$ \\lim_{x \\to 0} \\frac{2x + 1}{5x^2 - 6} = \\frac{\\text{লবে } x^0 \\text{ এর সহগ}}{\\text{হরে } x^0 \\text{ এর সহগ}} = \\frac{1}{-6} = -\\frac{1}{6} $$",
      "time_limit": 60
    },
    {
      "id": 3,
      "topic": "২. বীজগাণিতিক লিমিট, অসীম লিমিট ও L'Hôpital's Rule",
      "question_text": "৩. $\\lim_{x \\to \\infty} \\frac{4x^2}{4x^2 - 3} = ?$ [দি. বো. ২৩; অনুরূপ প্রশ্ন: ব. বো. ২৩; রা. বো. ২৩; সি. বো. ২১, ১৭; ঢা. বো. ২১]",
      "options": [
        "$-1$",
        "$\\frac{4}{3}$",
        "$1$",
        "$16$"
      ],
      "correct_answer": "$1$",
      "explanation": "$$ \\lim_{x \\to \\infty} \\frac{4x^2}{4x^2 - 3} = \\lim_{x \\to 0} \\frac{4x^2}{4x^2(1 - \\frac{3}{4x^2})} = \\frac{1}{(1 - 0)} = 1 $$\nShortcut: $\\frac{\\text{লবে সর্বোচ্চ ঘাতের সহগ}}{\\text{হরে সর্বোচ্চ ঘাতের সহগ}} = \\frac{4}{4} = 1$",
      "time_limit": 60
    },
    {
      "id": 4,
      "topic": "২. বীজগাণিতিক লিমিট, অসীম লিমিট ও L'Hôpital's Rule",
      "question_text": "৪. $\\lim_{x \\to \\infty} \\frac{-x}{\\sqrt{x^2 + 3x} + 4}$ এর মান কত? [ঢা. বো. ২২]",
      "options": [
        "$-\\infty$",
        "$-1$",
        "$1$",
        "$4$"
      ],
      "correct_answer": "$-1$",
      "explanation": "$$ \\lim_{x \\to \\infty} \\frac{-x}{\\sqrt{x^2(1 + \\frac{3}{x} + \\frac{4}{x^2})}} = \\lim_{x \\to \\infty} \\frac{-x}{x \\sqrt{1 + \\frac{3}{x} + \\frac{4}{x^2}}} = \\frac{-1}{\\sqrt{1 + 0 + 0}} = -1 $$\n$\\left[ \\frac{\\text{something}}{\\infty} = 0 \\right]$\nShortcut: $\\frac{\\text{লবে সর্বোচ্চ ঘাতের সহগ}}{\\text{হরে সর্বোচ্চ ঘাতের সহগ}} = \\frac{-1}{1} = -1$",
      "time_limit": 60
    },
    {
      "id": 5,
      "topic": "২. বীজগাণিতিক লিমিট, অসীম লিমিট ও L'Hôpital's Rule",
      "question_text": "৫. $\\lim_{x \\to 0} (1 + 2x)^{\\frac{1}{x}} = ?$ [রা. বো. ২১]",
      "options": [
        "$0$",
        "$1$",
        "$e$",
        "$e^2$"
      ],
      "correct_answer": "$e^2$",
      "explanation": "$$ \\lim_{x \\to 0} (1 + 2x)^{\\frac{1}{2x} \\cdot 2} = \\lim_{2x \\to 0} \\left\\{ (1 + 2x)^{\\frac{1}{2x}} \\right\\}^2 = e^2 $$\n$\\left[ \\because \\lim_{x \\to 0} (1 + x)^{\\frac{1}{x}} = e \\right]$",
      "time_limit": 60
    },
    {
      "id": 6,
      "topic": "২. বীজগাণিতিক লিমিট, অসীম লিমিট ও L'Hôpital's Rule",
      "question_text": "৬. $\\lim_{x \\to \\infty} \\left(1 + \\frac{1}{x}\\right)^{x+2} = $ কত? [য. বো. ২০]",
      "options": [
        "$1$",
        "$e$",
        "$e^2$",
        "$\\infty$"
      ],
      "correct_answer": "$e$",
      "explanation": "$$ \\lim_{x \\to \\infty} \\left(1 + \\frac{1}{x}\\right)^{x+2} = \\lim_{x \\to \\infty} \\left(1 + \\frac{1}{x}\\right)^x \\left(1 + \\frac{1}{x}\\right)^2 = e \\cdot 1^2 = e $$\nNote: (i) $\\lim_{x \\to 0} (1 + x)^{\\frac{1}{x}} = e$ (ii) $\\lim_{x \\to \\infty} \\left(1 + \\frac{1}{x}\\right)^x = e$",
      "time_limit": 60
    },
    {
      "id": 7,
      "topic": "২. বীজগাণিতিক লিমিট, অসীম লিমিট ও L'Hôpital's Rule",
      "question_text": "৭. $f(x)$ ফাংশন $x = b$ বিন্দুতে অবিচ্ছিন্ন হলে- [ব. বো. ২১; অনুরূপ প্রশ্ন: য. বো. ১৭]\ni. $f(b)$ সংজ্ঞায়িত হয়\nii. $\\lim_{x \\to b} f(x)$ বিদ্যমান থাকে না\niii. $\\lim_{x \\to b} f(x) = f(b)$ হয়\nনিচের কোনটি সঠিক?",
      "options": [
        "i ও ii",
        "i ও iii",
        "ii ও iii",
        "i, ii ও iii"
      ],
      "correct_answer": "i ও iii",
      "explanation": "ব্যাখ্যা: (ii) $\\lim_{x \\to b} f(x)$ বিদ্যমান থাকে।",
      "time_limit": 60
    },
    {
      "id": 8,
      "topic": "২. বীজগাণিতিক লিমিট, অসীম লিমিট ও L'Hôpital's Rule",
      "question_text": "৮. যদি $\\lim_{x \\to a} f(x) = l$ এবং $\\lim_{x \\to a} g(x) = m$ হয়- [য. বো. ২১]\ni. $\\lim_{x \\to a} \\{f(x) - g(x)\\} = l - m$\nii. $\\lim_{x \\to a} g(x)f(x) = ml$\niii. $\\lim_{x \\to a} \\frac{g(x)}{f(x)} = \\frac{l}{m}$\nনিচের কোনটি সঠিক?",
      "options": [
        "i ও ii",
        "i ও iii",
        "ii ও iii",
        "i, ii ও iii"
      ],
      "correct_answer": "i ও ii",
      "explanation": "(i) $\\lim_{x \\to a} \\{f(x) - g(x)\\} = \\lim_{x \\to a} f(x) - \\lim_{x \\to a} g(x) = l - m$\n(ii) $\\lim_{x \\to a} g(x)f(x) = \\lim_{x \\to a} g(x) \\cdot \\lim_{x \\to a} f(x) = ml$\n(iii) $\\lim_{x \\to a} \\frac{g(x)}{f(x)} = \\frac{\\lim_{x \\to a} g(x)}{\\lim_{x \\to a} f(x)} = \\frac{m}{l}$",
      "time_limit": 60
    },
    {
      "id": 9,
      "topic": "২. বীজগাণিতিক লিমিট, অসীম লিমিট ও L'Hôpital's Rule",
      "question_text": "৯. নিচের কোনটি অসীম লিমিট? [কু. বো. ১৯; অনুরূপ প্রশ্ন: য. বো. ১৭]",
      "options": [
        "$\\lim_{x \\to 0} \\frac{2}{5x}$",
        "$\\lim_{x \\to 0} e^{-3x}$",
        "$\\lim_{x \\to \\infty} \\frac{1}{4^x}$",
        "$\\lim_{x \\to 0} \\frac{3}{5x^4}$"
      ],
      "correct_answer": "$\\lim_{x \\to 0} \\frac{3}{5x^4}$",
      "explanation": "লিমিটের মান বসিয়ে অপশন টেস্ট করো।\nঅপশন (ক) $x$ এর ঘাত বিজোড়\n$$ \\text{L.H.L} = -\\infty \\text{ এবং } \\text{R.H.L} = \\infty $$\nঅতএব, লিমিট অস্তিত্বশীল নয়।\nঅপশন (ঘ) $\\lim_{x \\to 0} \\frac{3}{5x^4} = \\infty$",
      "time_limit": 60
    },
    {
      "id": 10,
      "topic": "২. বীজগাণিতিক লিমিট, অসীম লিমিট ও L'Hôpital's Rule",
      "question_text": "১০. উদ্দীপক:\n$X, Y \\subset \\mathbb{R}$ এবং $f: x \\to Y$ যেখানে $f(x) = \\frac{2x - 3}{4x + 5}$\n\n$\\lim_{x \\to \\infty} f(x)$ এর মান কত? [দি. বো. ১৯]",
      "options": [
        "$\\frac{1}{2}$",
        "$\\frac{3}{5}$",
        "$-\\frac{1}{2}$",
        "$-\\frac{3}{5}$"
      ],
      "correct_answer": "$\\frac{1}{2}$",
      "explanation": "Shortcut: $\\frac{\\text{সর্বোচ্চ ঘাতের সহগ}}{\\text{সর্বোচ্চ ঘাতের সহগ}} = \\frac{2}{4} = \\frac{1}{2}$",
      "time_limit": 60
    },
    {
      "id": 11,
      "topic": "২. বীজগাণিতিক লিমিট, অসীম লিমিট ও L'Hôpital's Rule",
      "question_text": "১১. $\\lim_{x \\to 0} \\frac{8^x - 2^x}{x}$ এর মান কত? [DU'25-'26]",
      "options": [
        "$16$",
        "$\\ln 4$",
        "$\\ln 2$",
        "$1$"
      ],
      "correct_answer": "$\\ln 4$",
      "explanation": "$$ \\lim_{x \\to 0} \\frac{8^x - 2^x}{x} = \\lim_{x \\to 0} \\frac{8^x \\ln 8 - 2^x \\ln 2}{1} $$\nL'Hopital's rule প্রয়োগ করে,\n$$ = 8^0 \\ln 8 - 2^0 \\ln 2 = \\ln \\frac{8}{2} = \\ln 4 $$",
      "time_limit": 60
    },
    {
      "id": 12,
      "topic": "২. বীজগাণিতিক লিমিট, অসীম লিমিট ও L'Hôpital's Rule",
      "question_text": "১২. $\\lim_{x \\to 0} \\frac{1 - \\cos x}{x^2 \\cos x} = ?$ [RU'25-'26]",
      "options": [
        "$1$",
        "$\\frac{1}{2}$",
        "$0$",
        "$\\infty$"
      ],
      "correct_answer": "$\\frac{1}{2}$",
      "explanation": "$$ \\lim_{x \\to 0} \\frac{1 - \\cos x}{x^2 \\cos x} \\left[ \\frac{0}{0} \\text{ আকার} \\right] = \\lim_{x \\to 0} \\frac{\\sin x}{2x \\cos x - x^2 \\sin x} $$\n$$ = \\lim_{x \\to 0} \\frac{\\cos x}{2 \\cos x - 2x \\sin x - 2x \\sin x - x^2 \\cos x} \\left[ \\frac{0}{0} \\text{ আকার} \\right] $$\n$$ = \\frac{1}{2 - 0 - 0 - 0} = \\frac{1}{2} $$",
      "time_limit": 60
    },
    {
      "id": 13,
      "topic": "২. বীজগাণিতিক লিমিট, অসীম লিমিট ও L'Hôpital's Rule",
      "question_text": "১৩. $\\lim_{x \\to y} \\frac{\\sin x - \\sin y}{x - y} = $ কত? [KU'25-'26]",
      "options": [
        "$\\sin y$",
        "$\\cos y$",
        "$\\sec y$",
        "$\\operatorname{cosec} y$"
      ],
      "correct_answer": "$\\cos y$",
      "explanation": "$$ \\lim_{x \\to y} \\frac{\\sin x - \\sin y}{x - y} $$\nL'Hôpital's rule ব্যবহার করে,\n$$ = \\lim_{x \\to y} \\frac{\\cos x}{1} = \\cos y $$",
      "time_limit": 60
    },
    {
      "id": 14,
      "topic": "২. বীজগাণিতিক লিমিট, অসীম লিমিট ও L'Hôpital's Rule",
      "question_text": "১৪. $\\lim_{x \\to \\frac{\\pi}{2}} \\frac{1 - \\sin x}{\\cos x} = ?$ [RU'24-'25]",
      "options": [
        "$\\frac{1}{2}$",
        "$2$",
        "$0$",
        "$1$"
      ],
      "correct_answer": "$0$",
      "explanation": "$$ \\lim_{x \\to \\frac{\\pi}{2}} \\frac{1 - \\sin x}{\\cos x} \\left[ \\frac{0}{0} \\text{ আকার} \\right] = \\lim_{x \\to \\frac{\\pi}{2}} \\frac{-\\cos x}{-\\sin x} = \\lim_{x \\to \\frac{\\pi}{2}} \\cot x = 0 $$",
      "time_limit": 60
    },
    {
      "id": 15,
      "topic": "২. বীজগাণিতিক লিমিট, অসীম লিমিট ও L'Hôpital's Rule",
      "question_text": "১৫. $\\lim_{\\theta \\to 0} \\frac{2^\\theta - 1}{\\theta} = $ কোনটি? [RU'23-'24]",
      "options": [
        "$2$",
        "$\\ln 2$",
        "$\\ln \\frac{1}{2}$",
        "$\\ln \\theta$"
      ],
      "correct_answer": "$\\ln 2$",
      "explanation": "$$ \\lim_{\\theta \\to 0} \\frac{2^\\theta - 1}{\\theta} \\left[ \\frac{0}{0} \\text{ আকার} \\right] $$\nUsing L'Hôpital Rule,\n$$ \\lim_{\\theta \\to 0} \\frac{2^\\theta \\ln 2}{1} = \\ln 2 $$\n($\\theta = 0$ বসিয়ে)",
      "time_limit": 60
    },
    {
      "id": 16,
      "topic": "২. বীজগাণিতিক লিমিট, অসীম লিমিট ও L'Hôpital's Rule",
      "question_text": "১৬. $\\lim_{x \\to 0} \\frac{e^x - 2e^{3x} + e^{5x}}{x^2}$ এর মান কত? [CU'23-24; GST'21-22]",
      "options": [
        "$4$",
        "$2$",
        "$0$",
        "$1$"
      ],
      "correct_answer": "$4$",
      "explanation": "$$ \\lim_{x \\to 0} \\frac{e^x - 2e^{3x} + e^{5x}}{x^2} \\left[ \\frac{0}{0} \\text{ আকার} \\right] $$\n$$ = \\lim_{x \\to 0} \\frac{e^x - 6e^{3x} + 5e^{5x}}{2x} \\left[ \\frac{0}{0} \\text{ আকার} \\right] $$\n$$ = \\lim_{x \\to 0} \\frac{e^x - 18e^{3x} + 25e^{5x}}{2} $$\n($x = 0$ বসিয়ে)\n$$ = \\frac{e^0 - 18e^0 + 25e^0}{2} = \\frac{1 - 18 + 25}{2} = \\frac{8}{2} = 4 $$",
      "time_limit": 60
    },
    {
      "id": 17,
      "topic": "২. বীজগাণিতিক লিমিট, অসীম লিমিট ও L'Hôpital's Rule",
      "question_text": "১৭. $\\lim_{x \\to 1} \\frac{2x^3 - (2k+1)x^2 + 2x + k}{x - 1} = -6$ হলে, k-এর মান কত? [DU'22-23]",
      "options": [
        "$1$",
        "$-1$",
        "$3$",
        "$-\\frac{1}{2}$"
      ],
      "correct_answer": "$3$",
      "explanation": "$$ \\lim_{x \\to 1} \\frac{2x^3 - (2k+1)x^2 + 2x + k}{x - 1} = -6 $$\n$$ \\Rightarrow \\lim_{x \\to 1} \\frac{2x^3 - (2k+1)x^2 + 2x + k}{x - 1} = -6 $$\n$$ \\Rightarrow \\lim_{x \\to 1} \\{2x^3 - (2k+1)x^2 + 2x + k\\} = -6 \\lim_{x \\to 1} (x - 1) $$\n$$ \\Rightarrow 2(1)^3 - (2k+1)(1)^2 + 2(1) + k = -6 \\times 1 \\times (1-1) = -6(1-1) $$\n$$ \\Rightarrow 2 - (2k+1) + 2 + k = 0 $$\n$$ \\Rightarrow 2 - 2k - 1 + 2 + k = 0 \\Rightarrow 3 - k = 0 \\therefore k = 3 $$",
      "time_limit": 60
    },
    {
      "id": 18,
      "topic": "২. বীজগাণিতিক লিমিট, অসীম লিমিট ও L'Hôpital's Rule",
      "question_text": "১৮. $\\lim_{x \\to 0} \\frac{x}{2 - \\sqrt{4+x}}$ এর মান কত? [RU'22-13]",
      "options": [
        "$-2$",
        "$-1$",
        "$-3$",
        "$-4$"
      ],
      "correct_answer": "$-4$",
      "explanation": "$$ \\lim_{x \\to 0} \\frac{x}{2 - \\sqrt{4+x}} \\left[ \\frac{0}{0} \\text{ form} \\right] = \\lim_{x \\to 0} \\frac{1}{-\\frac{1}{2\\sqrt{4+x}}} = -4 $$",
      "time_limit": 60
    },
    {
      "id": 19,
      "topic": "২. বীজগাণিতিক লিমিট, অসীম লিমিট ও L'Hôpital's Rule",
      "question_text": "১৯. $\\lim_{h \\to 0} \\frac{\\ln(2+h) - \\ln 2}{h}$ এর মান কোনটি? [CU'21-22, 20-21]",
      "options": [
        "$\\sqrt{e}$",
        "$\\frac{1}{2}$",
        "$e^2$",
        "$\\frac{1}{e}$"
      ],
      "correct_answer": "$\\frac{1}{2}$",
      "explanation": "$$ \\lim_{h \\to 0} \\frac{\\ln(2+h) - \\ln 2}{h} = \\lim_{h \\to 0} \\frac{\\ln(\\frac{2+h}{2})}{h} $$\n$$ = \\lim_{h \\to 0} \\frac{\\ln(1 + \\frac{h}{2})}{h} = \\lim_{h \\to 0} \\frac{\\ln(1 + \\frac{h}{2})}{\\frac{h}{2}} \\cdot \\frac{1}{2} = 1 \\cdot \\frac{1}{2} = \\frac{1}{2} $$\n$\\left[ \\because \\lim_{x \\to 0} \\frac{\\ln(1+x)}{x} = 1 \\right]$\nShortcut: L'Hôpital rule অনুযায়ী,\n$$ \\lim_{h \\to 0} \\frac{\\frac{1}{2+h}}{1} = \\frac{1}{2+0} = \\frac{1}{2} $$",
      "time_limit": 60
    },
    {
      "id": 20,
      "topic": "২. বীজগাণিতিক লিমিট, অসীম লিমিট ও L'Hôpital's Rule",
      "question_text": "২০. $\\lim_{x \\to 0} \\frac{1 - \\cos x}{\\sin^2 2x}$ এর মান হবে- [DU'20-21]",
      "options": [
        "$\\frac{1}{4}$",
        "$\\frac{1}{8}$",
        "$\\frac{1}{2}$",
        "$1$"
      ],
      "correct_answer": "$\\frac{1}{8}$",
      "explanation": "$$ \\lim_{x \\to 0} \\frac{1 - \\cos x}{\\sin^2 2x} \\left[ \\frac{0}{0} \\right] $$\n$$ = \\lim_{x \\to 0} \\frac{0 + \\sin x}{2 \\times 2 \\sin 2x \\cos 2x} \\text{ [L'Hôpital's rule]} $$\n$$ = \\frac{1}{4} \\left( \\lim_{x \\to 0} \\frac{\\sin x}{x} \\times \\frac{2x}{\\sin 2x} \\times \\frac{1}{2} \\right) \\left( \\lim_{x \\to 0} \\frac{1}{\\cos 2x} \\right) $$\n$$ = \\frac{1}{4} \\times 1 \\times 1 \\times \\frac{1}{2} = \\frac{1}{8} $$",
      "time_limit": 60
    },
    {
      "id": 21,
      "topic": "২. বীজগাণিতিক লিমিট, অসীম লিমিট ও L'Hôpital's Rule",
      "question_text": "২১. $\\lim_{x \\to \\frac{\\pi}{2}} \\frac{1 - \\sin x}{x - \\frac{\\pi}{2}} = ?$ [JU'18-19, 14-15, 11-12; RU'17-18]",
      "options": [
        "$2$",
        "$0.5$",
        "$1$",
        "$0$"
      ],
      "correct_answer": "$0$",
      "explanation": "$$ \\lim_{x \\to \\frac{\\pi}{2}} \\frac{1 - \\sin x}{x - \\frac{\\pi}{2}} \\left[ \\frac{0}{0} \\text{ form} \\right] $$\n$$ = \\lim_{x \\to \\frac{\\pi}{2}} \\frac{-\\cos x}{1 - 0} \\left[ \\frac{0}{0} \\text{ form} \\right] $$\n$x = \\frac{\\pi}{2}$ বসিয়ে,\n$$ = \\lim_{x \\to \\frac{\\pi}{2}} \\frac{-\\sin x}{2(0 - 1)} = \\frac{1}{2} = 0.5 $$\n(বি.দ্র: অপশন অনুযায়ী সমাধানটি এখানে অস্পষ্ট, তবে সমাধানের প্রথম ধাপে $-\\cos(\\frac{\\pi}{2}) = 0$ হওয়ায় সঠিক উত্তর $0$ হবে।)",
      "time_limit": 60
    },
    {
      "id": 22,
      "topic": "২. বীজগাণিতিক লিমিট, অসীম লিমিট ও L'Hôpital's Rule",
      "question_text": "২২. $\\lim_{x \\to 0} \\frac{\\sqrt{1+2x} - \\sqrt{1-3x}}{x} = ?$ [JU'18-19]",
      "options": [
        "$\\frac{11}{2}$",
        "$\\frac{1}{2}$",
        "$\\frac{5}{2}$",
        "$\\frac{11}{32}$"
      ],
      "correct_answer": "$\\frac{5}{2}$",
      "explanation": "$$ \\lim_{x \\to 0} \\frac{\\sqrt{1+2x} - \\sqrt{1-3x}}{x} \\left[ \\frac{0}{0} \\text{ form} \\right] $$\n$$ = \\lim_{x \\to 0} \\frac{\\frac{1}{2\\sqrt{1+2x}} (2) - \\frac{1}{2\\sqrt{1-3x}} (-3)}{1} = \\frac{1 + \\frac{3}{2}}{1} = \\frac{5}{2} $$",
      "time_limit": 60
    },
    {
      "id": 23,
      "topic": "২. বীজগাণিতিক লিমিট, অসীম লিমিট ও L'Hôpital's Rule",
      "question_text": "২৩. $\\lim_{x \\to 0} \\frac{1 - \\cos x}{x} $ এর মান হবে- [JnU'24-25; CU'18-19]",
      "options": [
        "$\\frac{1}{2}$",
        "$1$",
        "$-\\frac{1}{2}$",
        "$0$"
      ],
      "correct_answer": "$0$",
      "explanation": "$$ \\lim_{x \\to 0} \\frac{1 - \\cos x}{x} \\left[ \\frac{0}{0} \\right] $$\n$$ = \\lim_{x \\to 0} \\frac{\\sin x}{1} \\text{ (L'Hôpital's rule)} = 0 $$",
      "time_limit": 60
    },
    {
      "id": 24,
      "topic": "২. বীজগাণিতিক লিমিট, অসীম লিমিট ও L'Hôpital's Rule",
      "question_text": "২৪. $\\lim_{x \\to 0} \\frac{\\cos 2x - \\cos 3x}{x^2}$ এর মান কত? [CU'17-18]",
      "options": [
        "$0$",
        "$\\frac{5}{2}$",
        "$5$",
        "$\\infty$"
      ],
      "correct_answer": "$\\frac{5}{2}$",
      "explanation": "$$ \\lim_{x \\to 0} \\frac{\\cos 2x - \\cos 3x}{x^2} \\left[ \\frac{0}{0} \\right] $$\n$$ = \\lim_{x \\to 0} \\frac{-2 \\sin 2x + 3 \\sin 3x}{2x} \\left[ \\frac{0}{0} \\right] = \\lim_{x \\to 0} \\frac{-4 \\cos 2x + 9 \\cos 3x}{2} $$\n$$ = \\frac{9 - 4}{2} = \\frac{5}{2} $$",
      "time_limit": 60
    },
    {
      "id": 25,
      "topic": "২. বীজগাণিতিক লিমিট, অসীম লিমিট ও L'Hôpital's Rule",
      "question_text": "২৫. $\\lim_{x \\to 0} \\frac{\\sqrt{1-x} - 1}{x} = ?$ [JU'17-18]",
      "options": [
        "$1$",
        "$\\frac{1}{2}$",
        "$-1$",
        "$-\\frac{1}{2}$"
      ],
      "correct_answer": "$-\\frac{1}{2}$",
      "explanation": "$$ \\lim_{x \\to 0} \\frac{\\sqrt{1-x} - 1}{x} \\left[ \\frac{0}{0} \\text{ form} \\right] $$\n$$ = \\lim_{x \\to 0} \\frac{-\\frac{1}{2\\sqrt{1-x}}}{1} \\text{ [L' Hôpital's Rule]} $$\n$$ = \\lim_{x \\to 0} \\frac{-1}{2\\sqrt{1-x}} = -\\frac{1}{2} $$",
      "time_limit": 60
    },
    {
      "id": 26,
      "topic": "২. বীজগাণিতিক লিমিট, অসীম লিমিট ও L'Hôpital's Rule",
      "question_text": "২৬. $\\lim_{x \\to 0} \\frac{e^x - e^{-x} - 2x}{x - \\sin x}$ এর মান কোনটি? [KU'17-18]",
      "options": [
        "$0$",
        "$1$",
        "$2$",
        "$3$"
      ],
      "correct_answer": "$2$",
      "explanation": "$$ \\lim_{x \\to 0} \\frac{e^x - e^{-x} - 2x}{x - \\sin x} \\left[ \\frac{0}{0} \\text{ form} \\right] $$\n$$ = \\lim_{x \\to 0} \\frac{e^x + e^{-x} - 2}{1 - \\cos x} \\left[ \\frac{0}{0} \\text{ form} \\right] $$\n$$ = \\lim_{x \\to 0} \\frac{e^x - e^{-x}}{\\sin x} \\left[ \\frac{0}{0} \\text{ form} \\right] \\text{ [L'Hôpital's Rule]} $$\n$$ = \\lim_{x \\to 0} \\frac{e^x + e^{-x}}{\\cos x} = \\frac{e^0 + e^{-0}}{\\cos 0^\\circ} = \\frac{1+1}{1} = 2 $$",
      "time_limit": 60
    },
    {
      "id": 27,
      "topic": "২. বীজগাণিতিক লিমিট, অসীম লিমিট ও L'Hôpital's Rule",
      "question_text": "২৭. $\\lim_{x \\to 0} \\frac{1}{x} (\\sqrt{1+x} - \\sqrt{1-x}) = ?$ [Agri.'20-21; JU'14-15]",
      "options": [
        "$0$",
        "$1$",
        "$a$",
        "$x$"
      ],
      "correct_answer": "$1$",
      "explanation": "$$ \\lim_{x \\to 0} \\frac{\\sqrt{1+x} - \\sqrt{1-x}}{x} = \\lim_{x \\to 0} \\frac{1+x-(1-x)}{x(\\sqrt{1+x}+\\sqrt{1-x})} $$\n$$ = \\lim_{x \\to 0} \\frac{2}{x \\cdot \\frac{2}{x}} \\text{ (লব ও হরকে অনুবন্ধী দিয়ে গুণ করে)} = 1 $$\n$$ \\lim_{x \\to 0} \\frac{2}{\\sqrt{1+x}+\\sqrt{1-x}} = 1 $$",
      "time_limit": 60
    },
    {
      "id": 28,
      "topic": "২. বীজগাণিতিক লিমিট, অসীম লিমিট ও L'Hôpital's Rule",
      "question_text": "২৮. $\\lim_{x \\to 0} \\frac{\\sqrt{1+3x} - \\sqrt{1-4x}}{x}$ এর মান হবে - [RU'19-20]",
      "options": [
        "$\\frac{7}{2}$",
        "$\\frac{1}{2}$",
        "$\\frac{9}{2}$",
        "$-\\frac{1}{2}$"
      ],
      "correct_answer": "$\\frac{7}{2}$",
      "explanation": "$$ \\lim_{x \\to 0} \\frac{\\sqrt{1+3x} - \\sqrt{1-4x}}{x} $$\n$$ = \\lim_{x \\to 0} \\frac{(\\sqrt{1+3x} - \\sqrt{1-4x})(\\sqrt{1+3x} + \\sqrt{1-4x})}{x(\\sqrt{1+3x} + \\sqrt{1-4x})} $$\n$$ = \\lim_{x \\to 0} \\frac{1+3x-1+4x}{x(\\sqrt{1+3x} + \\sqrt{1-4x})} = \\lim_{x \\to 0} \\frac{7}{\\sqrt{1+3x} + \\sqrt{1-4x}} $$\n$$ = \\frac{7}{\\sqrt{1} + \\sqrt{1}} = \\frac{7}{2} $$",
      "time_limit": 60
    },
    {
      "id": 29,
      "topic": "২. বীজগাণিতিক লিমিট, অসীম লিমিট ও L'Hôpital's Rule",
      "question_text": "২৯. $\\lim_{x \\to a} \\frac{x^3 - a^3}{\\sqrt{x} - \\sqrt{a}} =$ কত? [SUST'15-26; JU'18-19]",
      "options": [
        "$0$",
        "$a$",
        "$2a$",
        "$3a$"
      ],
      "correct_answer": "$3a$",
      "explanation": "$$ \\lim_{x \\to a} \\frac{x^3 - a^3}{\\sqrt{x} - \\sqrt{a}} = \\lim_{\\sqrt{x} \\to \\sqrt{a}} \\frac{(\\sqrt{x})^6 - (\\sqrt{a})^6}{\\sqrt{x} - \\sqrt{a}} $$\n$$ = 3(\\sqrt{a})^{3-1} = 3a $$",
      "time_limit": 60
    },
    {
      "id": 30,
      "topic": "২. বীজগাণিতিক লিমিট, অসীম লিমিট ও L'Hôpital's Rule",
      "question_text": "৩০. $\\lim_{x \\to 2} \\left(\\frac{x^2 - 4}{x - 2}\\right) = k$ হলে, $k = ?$ [Agri'25-26]",
      "options": [
        "$a$",
        "$2a$",
        "$a^2$",
        "$0$"
      ],
      "correct_answer": "$2a$",
      "explanation": "$$ \\lim_{x \\to a} \\frac{x^2 - a^2}{x - a} = \\lim_{x \\to a} \\frac{(x+a)(x-a)}{x-a} $$\n$$ = \\lim_{x \\to a} (x + a) = a + a = 2a $$",
      "time_limit": 60
    },
    {
      "id": 31,
      "topic": "২. বীজগাণিতিক লিমিট, অসীম লিমিট ও L'Hôpital's Rule",
      "question_text": "৩১. $\\lim_{x \\to 4} \\frac{x^2 - 16}{x - 4}$ এর মান কোনটি? [JU'16-17]",
      "options": [
        "$0$",
        "$8$",
        "অসংজ্ঞায়িত",
        "কোনটিই নয়"
      ],
      "correct_answer": "$8$",
      "explanation": "$$ \\lim_{x \\to 4} \\frac{x^2 - 16}{x - 4} = \\lim_{x \\to 4} \\frac{x^2 - 4^2}{x - 4} = 2 \\cdot 4^{2-1} = 2 \\cdot 4 = 8 $$",
      "time_limit": 60
    },
    {
      "id": 32,
      "topic": "২. বীজগাণিতিক লিমিট, অসীম লিমিট ও L'Hôpital's Rule",
      "question_text": "৩২. $\\lim_{n \\to \\infty} \\frac{\\cos 2x - \\cos 3x}{x^3} = ?$ [CU'25-26]",
      "options": [
        "$\\frac{1}{2}$",
        "$\\frac{5}{2}$",
        "$0$",
        "$\\infty$"
      ],
      "correct_answer": "$0$",
      "explanation": "ব্যাখ্যা: প্রশ্নটি ত্রুটিপূর্ণ। এখানে $n \\to \\infty$ এর পরিবর্তে $x \\to \\infty$ হবে।\nএখানে, $-1 \\le \\cos 2x \\le 1$ এবং $-1 \\le \\cos 3x \\le 1$\nসুতরাং $-2 \\le \\cos 2x - \\cos 3x \\le 2$\n$$ \\Rightarrow -\\frac{2}{x^3} \\le \\frac{\\cos 2x - \\cos 3x}{x^3} \\le \\frac{2}{x^3} $$\n$$ \\Rightarrow \\lim_{x \\to \\infty} \\left(-\\frac{2}{x^3}\\right) \\le \\lim_{x \\to \\infty} \\frac{\\cos 2x - \\cos 3x}{x^3} \\le \\lim_{x \\to \\infty} \\left(\\frac{2}{x^3}\\right) $$\nএখানে, $\\lim_{x \\to \\infty} \\left(-\\frac{2}{x^3}\\right) = 0 \\therefore \\lim_{x \\to \\infty} \\left(\\frac{2}{x^3}\\right) = 0$\nঅর্থাৎ, $0 \\le \\lim_{x \\to \\infty} \\frac{\\cos 2x - \\cos 3x}{x^3} \\le 0$\n$\\therefore$ স্যান্ডউইচ উপপাদ্য অনুসারে, $\\lim_{x \\to \\infty} \\frac{\\cos 2x - \\cos 3x}{x^3} = 0$",
      "time_limit": 60
    },
    {
      "id": 33,
      "topic": "২. বীজগাণিতিক লিমিট, অসীম লিমিট ও L'Hôpital's Rule",
      "question_text": "৩৩. $\\lim_{x \\to -\\infty} \\frac{\\sqrt{x^2+x}}{x+1} = ?$ [DU'23-24]",
      "options": [
        "$1$",
        "$-\\infty$",
        "$\\infty$",
        "$-1$"
      ],
      "correct_answer": "$-1$",
      "explanation": "$$ \\lim_{x \\to -\\infty} \\frac{\\sqrt{x^2+x}}{x+1} = \\lim_{x \\to -\\infty} \\frac{\\sqrt{x^2(1+\\frac{1}{x})}}{x(1+\\frac{1}{x})} $$\n$$ = \\lim_{x \\to -\\infty} \\frac{|x|\\sqrt{1+\\frac{1}{x}}}{x(1+\\frac{1}{x})} = \\lim_{x \\to -\\infty} \\frac{(-x)\\sqrt{1+\\frac{1}{x}}}{x(1+\\frac{1}{x})} $$\n$\\left[ \\sqrt{x^2} = |x| = -x \\because x \\to -\\infty \\Rightarrow x < 0 \\right]$\n$$ = \\lim_{x \\to -\\infty} \\frac{-\\sqrt{1+\\frac{1}{x}}}{1+\\frac{1}{x}} = \\frac{-\\sqrt{1+0}}{1+0} = -1 $$",
      "time_limit": 60
    },
    {
      "id": 34,
      "topic": "২. বীজগাণিতিক লিমিট, অসীম লিমিট ও L'Hôpital's Rule",
      "question_text": "৩৪. $\\lim_{x \\to \\infty} 2^x \\sin\\left(\\frac{y}{2^x}\\right) = ?$ [GST'23-24]",
      "options": [
        "$\\infty$",
        "$2$",
        "$2^y$",
        "$y$"
      ],
      "correct_answer": "$y$",
      "explanation": "ধরি, $\\frac{y}{2^x} = \\theta \\Rightarrow 2^x = \\frac{y}{\\theta}$ হবে\n$\\because x \\to \\infty \\Rightarrow 2^x \\to 2^\\infty \\Rightarrow \\infty \\Rightarrow \\frac{1}{2^x} \\to \\frac{1}{\\infty} \\to 0$\n$\\Rightarrow \\frac{y}{2^x} \\to 0$ হবে তাহলে $\\theta \\to 0$ হবে।\n$$ \\therefore \\lim_{x \\to \\infty} 2^x \\sin\\left(\\frac{y}{2^x}\\right) = \\lim_{\\theta \\to 0} \\frac{y}{\\theta} \\sin \\theta $$\n$$ = y \\lim_{\\theta \\to 0} \\frac{\\sin \\theta}{\\theta} = y \\times 1 = y $$\nShortcut: $\\lim_{x \\to \\infty} a^x \\sin\\left(\\frac{b}{a^x}\\right)$ এবং $\\lim_{x \\to \\infty} a^x \\tan\\left(\\frac{b}{a^x}\\right)$ আকৃতির হলে উত্তর হবে: $b$\n$\\therefore$ প্রদত্ত ক্ষেত্রে; $\\lim_{x \\to \\infty} 2^x \\sin\\left(\\frac{y}{2^x}\\right) = y$ হবে।",
      "time_limit": 60
    },
    {
      "id": 35,
      "topic": "২. বীজগাণিতিক লিমিট, অসীম লিমিট ও L'Hôpital's Rule",
      "question_text": "৩৫. $\\lim_{x \\to \\infty} \\frac{3^x - 3^{-x}}{3^x + 3^{-x}}$ এর মান কোনটি? [JU'23-24]",
      "options": [
        "$0$",
        "$1$",
        "$3$",
        "$\\infty$"
      ],
      "correct_answer": "$1$",
      "explanation": "$$ \\lim_{x \\to \\infty} \\frac{3^x - 3^{-x}}{3^x + 3^{-x}} = \\lim_{x \\to \\infty} \\frac{3^x(1 - \\frac{1}{3^{2x}})}{3^x(1 + \\frac{1}{3^{2x}})} $$\n$$ = \\lim_{x \\to \\infty} \\frac{1 - \\frac{1}{3^{2x}}}{1 + \\frac{1}{3^{2x}}} = \\frac{1 - 0}{1 + 0} = 1 $$",
      "time_limit": 60
    },
    {
      "id": 36,
      "topic": "২. বীজগাণিতিক লিমিট, অসীম লিমিট ও L'Hôpital's Rule",
      "question_text": "৩৬. $\\lim_{x \\to \\infty} x^2 \\left( \\frac{2}{x^4+1} + \\frac{3}{x^3+7} + \\frac{5}{x^2+1} + \\frac{6}{x^2-5} \\right)$ এর মান কত? [GST'22-23]",
      "options": [
        "$8$",
        "$10$",
        "$11$",
        "$16$"
      ],
      "correct_answer": "$11$",
      "explanation": "$$ \\lim_{x \\to \\infty} x^2 \\left( \\frac{2}{x^4+1} + \\frac{3}{x^3+7} + \\frac{5}{x^2+1} + \\frac{6}{x^2-5} \\right) $$\n$$ = \\lim_{x \\to \\infty} \\left( \\frac{2}{x^2+\\frac{1}{x^2}} + \\frac{3}{x+\\frac{7}{x^2}} + \\frac{5}{1+\\frac{1}{x^2}} + \\frac{6}{1-\\frac{5}{x^2}} \\right) $$\n$$ = \\frac{2}{\\infty+0} + \\frac{3}{\\infty+0} + \\frac{5}{1+0} + \\frac{6}{1-0} \\left[ \\because \\frac{1}{\\infty} \\text{ কে আমরা } 0 \\text{ ধরতে পারি} \\right] $$\n$$ = 0 + 0 + 5 + 6 = 11 $$",
      "time_limit": 60
    },
    {
      "id": 37,
      "topic": "২. বীজগাণিতিক লিমিট, অসীম লিমিট ও L'Hôpital's Rule",
      "question_text": "৩৭. $\\lim_{x \\to -\\infty} \\frac{\\sqrt{x^2+2x}}{-x}$ এর মান কত? [CU'22-23]",
      "options": [
        "$1$",
        "$-1$",
        "$-\\infty$",
        "$\\infty$"
      ],
      "correct_answer": "$1$",
      "explanation": "$$ \\lim_{x \\to -\\infty} \\frac{\\sqrt{x^2+2x}}{-x} = \\lim_{x \\to -\\infty} \\frac{\\sqrt{x^2(1+\\frac{2}{x})}}{-x} = \\lim_{x \\to -\\infty} \\frac{|x|\\sqrt{1+\\frac{2}{x}}}{-x} $$\n$$ = -\\sqrt{1} = -1 $$\n(বি.দ্র. ডানপাশের বৃত্তাকার অপশন ও অন্যান্য সূত্র অনুযায়ী সঠিক উত্তর ১ চিহ্নিত রয়েছে।)",
      "time_limit": 60
    },
    {
      "id": 38,
      "topic": "২. বীজগাণিতিক লিমিট, অসীম লিমিট ও L'Hôpital's Rule",
      "question_text": "৩৮. $\\lim_{x \\to -\\infty} \\frac{\\sqrt{x^2+2x}}{-x}$ এর মান হলো- [DU'19-20]",
      "options": [
        "$1$",
        "$\\infty$",
        "$-\\infty$",
        "$-1$"
      ],
      "correct_answer": "$1$",
      "explanation": "$$ \\lim_{x \\to -\\infty} \\frac{\\sqrt{x^2+2x}}{-x} = \\lim_{x \\to -\\infty} \\frac{\\sqrt{x^2(1+\\frac{2}{x})}}{-x} = \\lim_{x \\to -\\infty} \\frac{|x|\\sqrt{1+\\frac{2}{x}}}{-x} $$\n$\\left[ x \\to -\\infty \\text{ হওয়ায় } x < 0 \\text{, যার জন্য } |x| = -x \\right]$\n$$ = \\lim_{x \\to -\\infty} \\frac{-x\\sqrt{1+\\frac{2}{x}}}{-x} = \\lim_{x \\to -\\infty} \\sqrt{1+\\frac{2}{x}} $$\n$$ = \\lim_{x \\to -\\infty} \\sqrt{1+\\frac{2}{x}} = \\sqrt{1+0} = 1 $$",
      "time_limit": 60
    },
    {
      "id": 39,
      "topic": "২. বীজগাণিতিক লিমিট, অসীম লিমিট ও L'Hôpital's Rule",
      "question_text": "৩৯. $\\lim_{x \\to \\infty} \\frac{x^2 - 4}{2+x-4x^2}$ এর মান কত? [JU'18-19]",
      "options": [
        "$-2$",
        "$-\\frac{1}{4}$",
        "$\\frac{1}{2}$",
        "$1$"
      ],
      "correct_answer": "$-\\frac{1}{4}$",
      "explanation": "$$ \\lim_{x \\to \\infty} \\frac{x^2 - 4}{2+x-4x^2} = \\lim_{x \\to \\infty} \\frac{1 - \\frac{4}{x^2}}{\\frac{2}{x^2} + \\frac{1}{x} - 4} = -\\frac{1}{4} $$\nShortcut: লব ও হরের সর্বোচ্চ ঘাতের সহগের অনুপাত $= \\frac{1}{-4} = -\\frac{1}{4}$",
      "time_limit": 60
    },
    {
      "id": 40,
      "topic": "২. বীজগাণিতিক লিমিট, অসীম লিমিট ও L'Hôpital's Rule",
      "question_text": "৪০. $\\lim_{x \\to \\infty} \\left(\\frac{2}{x} - 1\\right)$ এর মান কত? [JU'18-19]",
      "options": [
        "$1$",
        "$-1$",
        "$0$",
        "$3$"
      ],
      "correct_answer": "$-1$",
      "explanation": "$$ \\lim_{x \\to \\infty} \\left(\\frac{2}{x} - 1\\right) = 0 - 1 = -1 $$",
      "time_limit": 60
    },
    {
      "id": 41,
      "topic": "২. বীজগাণিতিক লিমিট, অসীম লিমিট ও L'Hôpital's Rule",
      "question_text": "৪১. $\\lim_{x \\to -\\infty} \\frac{2x^2+3x+5}{-3x^2+5x-6}$ এর মান- [DU'17-18]",
      "options": [
        "$\\frac{1}{2}$",
        "$-\\frac{1}{3}$",
        "$\\frac{2}{3}$",
        "$-\\frac{2}{3}$"
      ],
      "correct_answer": "$-\\frac{2}{3}$",
      "explanation": "$$ \\lim_{x \\to -\\infty} \\frac{2x^2+3x+5}{-3x^2+5x-6} = \\lim_{x \\to -\\infty} \\frac{2 + \\frac{3}{x} + \\frac{5}{x^2}}{-3 + \\frac{5}{x} - \\frac{6}{x^2}} = -\\frac{2}{3} $$\nShortcut: লব ও হরের সর্বোচ্চ ঘাতের সহগের অনুপাত $= -\\frac{2}{3}$",
      "time_limit": 60
    },
    {
      "id": 42,
      "topic": "২. বীজগাণিতিক লিমিট, অসীম লিমিট ও L'Hôpital's Rule",
      "question_text": "৪২. $\\lim_{x \\to \\infty} \\frac{x^2(\\sin x + \\cos^3 x)}{(x^2+1)(x-3)} = ?$ [RU'15-16]",
      "options": [
        "$0$",
        "$1$",
        "$2$",
        "$3$"
      ],
      "correct_answer": "$0$",
      "explanation": "$$ \\lim_{x \\to \\infty} \\frac{x^2(\\sin x + \\cos^3 x)}{(x^2+1)(x-3)} = \\lim_{x \\to \\infty} \\frac{\\sin x + \\cos^3 x}{(1+\\frac{1}{x^2})(x-3)} $$\n$$ = \\lim_{x \\to \\infty} \\frac{\\sin x + \\cos^3 x}{(1+\\frac{1}{x^2})(x-3)} = \\lim_{x \\to \\infty} \\frac{1}{1+\\frac{1}{x^2}} \\lim_{x \\to \\infty} \\frac{\\sin x + \\cos^3 x}{x-3} $$\n$$ = \\frac{1}{1+0} \\times \\frac{\\sin(\\infty) + \\cos^3(\\infty)}{\\infty-3} = 1 \\times \\frac{\\text{finite value}}{\\infty} = 1 \\times 0 = 0 $$\n$\\left[ \\because \\sin x \\text{, } \\cos^3 x \\text{ এর মান } (-1, 1) \\text{ হয়। তাই একে } \\infty \\text{ দিয়ে ভাগ করলে } 0 \\text{ পাওয়া যায়} \\right]$",
      "time_limit": 60
    },
    {
      "id": 43,
      "topic": "২. বীজগাণিতিক লিমিট, অসীম লিমিট ও L'Hôpital's Rule",
      "question_text": "৪৩. $\\lim_{x \\to \\infty} \\left(\\frac{1}{x} + 1\\right) \\left(\\frac{5x^2-1}{x^2}\\right) = ?$ [JU'14-15]",
      "options": [
        "$1$",
        "$0$",
        "$5$",
        "$2$"
      ],
      "correct_answer": "$5$",
      "explanation": "$$ \\lim_{x \\to \\infty} \\left(\\frac{1}{x} + 1\\right) \\left(\\frac{5x^2-1}{x^2}\\right) $$\n$$ = \\lim_{x \\to \\infty} \\left(\\frac{1}{x} + 1\\right) \\cdot \\lim_{x \\to \\infty} \\left(5 - \\frac{1}{x^2}\\right) = 1 \\times 5 = 5 $$",
      "time_limit": 60
    },
    {
      "id": 44,
      "topic": "২. বীজগাণিতিক লিমিট, অসীম লিমিট ও L'Hôpital's Rule",
      "question_text": "৪৪. $\\lim_{x \\to \\frac{\\pi}{2}} \\left(\\frac{\\pi}{2} - x\\right) \\tan x$ এর সীমান্ত মান কত? [BUTEX'14-15]",
      "options": [
        "$1$",
        "$\\frac{1}{2}$",
        "$\\frac{\\pi}{2}$",
        "$\\pi$"
      ],
      "correct_answer": "$1$",
      "explanation": "$x = \\frac{\\pi}{2} + h$ ধরে নিলে $h \\to 0$\n$$ \\lim_{h \\to 0} \\left(\\frac{\\pi}{2} - x\\right) \\tan x = \\lim_{h \\to 0} (-h)(-\\cot h) $$\n$$ = \\lim_{h \\to 0} \\frac{h}{\\tan h} = 1 $$",
      "time_limit": 60
    },
    {
      "id": 45,
      "topic": "২. বীজগাণিতিক লিমিট, অসীম লিমিট ও L'Hôpital's Rule",
      "question_text": "৪৫. $\\lim_{x \\to 2^-} \\frac{\\sqrt{x-2} + \\sqrt{x} - \\sqrt{2}}{\\sqrt{x^2-4}}$ এর মান কত? [CUET'25-26]",
      "options": [
        "$-\\frac{1}{2}$",
        "$\\frac{1}{2}$",
        "$-1$",
        "$1$",
        "$2$"
      ],
      "correct_answer": "$\\frac{1}{2}$",
      "explanation": "Solⁿ: এখানে $\\lim$ রয়েছে এবং $\\sqrt{x-2}$ রয়েছে, তাই শুধুমাত্র $x \\to 2^+$ এর জন্যই ফাংশনটির সীমান্ত মান থাকবে। $x \\to 2^-$ এর জন্য থাকবে না। তাই এখানে উত্তর হওয়া উচিত সীমান্ত মান নেই। কিন্তু প্রশ্নে উক্ত অপশন না থাকায় ডানদিকবর্তী সীমা ($x \\to 2^+$) নির্ণয় করা হচ্ছে।\n$$ \\lim_{x \\to 2^+} \\frac{\\sqrt{x-2} + \\sqrt{x} - \\sqrt{2}}{\\sqrt{x^2-4}} \\left[ \\frac{0}{0} \\text{ আকৃতি} \\right] $$\n$$ = \\lim_{x \\to 2^+} \\frac{\\frac{1}{2\\sqrt{x-2}} + \\frac{1}{2\\sqrt{x}}}{\\frac{2x}{2\\sqrt{x^2-4}}} \\text{ [L'Hôpital Rule]} $$\n$$ = \\lim_{x \\to 2^+} \\frac{\\frac{1}{2\\sqrt{x-2}}}{\\frac{2x}{2\\sqrt{x^2-4}}} $$\n$$ = \\frac{1}{2} \\times \\frac{\\sqrt{2^2-4}}{\\sqrt{2-2}} = \\frac{1}{2} \\times \\frac{0}{0} $$\n(বিকল্প সমাধান)\n$$ = \\lim_{x \\to 2^+} \\frac{\\sqrt{x-2}}{\\sqrt{x-2}\\sqrt{x+2}} = \\frac{1}{\\sqrt{2+2}} = \\frac{1}{2} $$",
      "time_limit": 60
    },
    {
      "id": 46,
      "topic": "২. বীজগাণিতিক লিমিট, অসীম লিমিট ও L'Hôpital's Rule",
      "question_text": "৪৬. যদি $\\lim_{x \\to 0} \\frac{\\sqrt{1+3x} - \\sqrt{1-cx}}{x} = 1$ হয় তাহলে c এর মান কত? [KUET, MIST'24-25]",
      "options": [
        "$3$",
        "$-1$",
        "$-3$",
        "$2$",
        "$1$"
      ],
      "correct_answer": "$-1$",
      "explanation": "$$ \\lim_{x \\to 0} \\frac{\\sqrt{1+3x} - \\sqrt{1-cx}}{x} = 1 $$\n$$ \\Rightarrow \\lim_{x \\to 0} \\frac{\\frac{3}{2\\sqrt{1+3x}} - \\frac{-c}{2\\sqrt{1-cx}}}{1} = 1 \\text{ [by using L'Hôpital Rule]} $$\n$$ \\Rightarrow \\frac{3}{2} + \\frac{c}{2} = 1 \\Rightarrow 3 + c = 2 $$\n$$ \\Rightarrow c = -1 $$",
      "time_limit": 60
    },
    {
      "id": 47,
      "topic": "২. বীজগাণিতিক লিমিট, অসীম লিমিট ও L'Hôpital's Rule",
      "question_text": "৪৭. Value of $\\lim_{x \\to \\infty} (\\sqrt{x^2+1} - x)$ is - [IUT'14-15]",
      "options": [
        "$0$",
        "$\\infty$",
        "$-\\infty$",
        "$1$"
      ],
      "correct_answer": "$0$",
      "explanation": "$$ \\lim_{x \\to \\infty} (\\sqrt{x^2+1} - x) $$\n$$ = \\lim_{x \\to \\infty} \\frac{(\\sqrt{x^2+1}-x)(\\sqrt{x^2+1}+x)}{\\sqrt{x^2+1}+x} \\text{ [লব এবং হরকে } (\\sqrt{x^2+1}+x) \\text{ দ্বারা গুণ করে]} $$\n$$ = \\lim_{x \\to \\infty} \\frac{x^2+1-x^2}{\\sqrt{x^2+1}+x} = \\lim_{x \\to \\infty} \\frac{1}{\\sqrt{x^2+1}+x} = 0 $$",
      "time_limit": 60
    },
    {
      "id": 48,
      "topic": "২. বীজগাণিতিক লিমিট, অসীম লিমিট ও L'Hôpital's Rule",
      "question_text": "৪৮. $\\lim_{x \\to a} \\frac{x^{\\frac{3}{2}} - a^{\\frac{3}{2}}}{\\sqrt{x} - \\sqrt{a}} = $ কত? [SUST'25-26]",
      "options": [
        "$0$",
        "$a$",
        "$2a$",
        "$3a$"
      ],
      "correct_answer": "$3a$",
      "explanation": "$$ \\lim_{x \\to a} \\frac{x^{\\frac{3}{2}} - a^{\\frac{3}{2}}}{\\sqrt{x} - \\sqrt{a}} = \\lim_{\\sqrt{x} \\to \\sqrt{a}} \\frac{(\\sqrt{x})^3 - (\\sqrt{a})^3}{\\sqrt{x} - \\sqrt{a}} = 3(\\sqrt{a})^{3-1} = 3a $$",
      "time_limit": 60
    },
    {
      "id": 49,
      "topic": "২. বীজগাণিতিক লিমিট, অসীম লিমিট ও L'Hôpital's Rule",
      "question_text": "৪৯. $\\lim_{x \\to \\infty} b^x \\sin\\left(\\frac{a}{b^x}\\right) = ?$ [BUET'24-25; KUET'16-17]",
      "options": [
        "$a$",
        "$b$",
        "$0$",
        "$1$"
      ],
      "correct_answer": "$a$",
      "explanation": "$$ \\lim_{x \\to \\infty} b^x \\sin\\left(\\frac{a}{b^x}\\right) = \\lim_{x \\to \\infty} \\frac{\\sin(\\frac{a}{b^x})}{\\frac{a}{b^x}} \\cdot a $$\n$$ = \\lim_{y \\to 0} \\left( \\frac{\\sin y}{y} \\right) \\times a = a $$",
      "time_limit": 60
    },
    {
      "id": 50,
      "topic": "২. বীজগাণিতিক লিমিট, অসীম লিমিট ও L'Hôpital's Rule",
      "question_text": "৫০. $\\lim_{n \\to \\infty} \\frac{1}{n e^n} = ?$ [BUET'24-25]",
      "options": [
        "$1$",
        "$0$",
        "$\\infty$",
        "$-1$"
      ],
      "correct_answer": "$0$",
      "explanation": "$n \\to \\infty$ হলে, $\\frac{1}{n} \\to 0 \\therefore \\lim_{n \\to \\infty} \\frac{1}{ne^n}$\n$$ = \\lim_{n \\to \\infty} \\frac{1}{n} \\cdot \\frac{1}{e^n} = 0 $$",
      "time_limit": 60
    },
    {
      "id": 51,
      "topic": "২. বীজগাণিতিক লিমিট, অসীম লিমিট ও L'Hôpital's Rule",
      "question_text": "৫১. What is the value of $\\lim_{x \\to \\infty} \\frac{x}{x^2+1}$ ? [$\\lim_{x \\to \\infty} \\frac{x}{x^2+1}$ এর মান কত?] [IUT'20-21]",
      "options": [
        "$2$",
        "$0$",
        "$3$",
        "$0.5$"
      ],
      "correct_answer": "$0$",
      "explanation": "$$ \\lim_{x \\to \\infty} \\frac{x}{x^2(1+\\frac{1}{x^2})} = \\lim_{x \\to \\infty} \\frac{1}{x(1+\\frac{1}{x^2})} = \\frac{0}{1} = 0 $$",
      "time_limit": 60
    },
    {
      "id": 52,
      "topic": "২. বীজগাণিতিক লিমিট, অসীম লিমিট ও L'Hôpital's Rule",
      "question_text": "৫২. $\\lim_{x \\to \\infty} \\frac{e^{x^{-1}} - 1}{2\\tan^{-1}(x) - \\pi}$ is equal to - [$\\lim_{x \\to \\infty} \\frac{e^{x^{-1}} - 1}{2\\tan^{-1}(x) - \\pi}$ এর মান-] [IUT'20-21]",
      "options": [
        "$1$",
        "$-1$",
        "$\\frac{1}{2}$",
        "$-\\frac{1}{2}$"
      ],
      "correct_answer": "$-\\frac{1}{2}$",
      "explanation": "$$ \\lim_{x \\to \\infty} \\frac{e^{x^{-1}} - 1}{2\\tan^{-1}(x) - \\pi} \\left[ \\frac{0}{0} \\text{ form} \\right] $$\n$$ = \\lim_{x \\to \\infty} \\frac{e^{x^{-1}} (-x^{-2})}{2\\frac{1}{1+x^2} - 0} \\text{ [L'Hôpital's Rule]} $$\n$$ = \\lim_{x \\to \\infty} \\frac{-e^{x^{-1}} (1+x^2)}{2x^2} = \\lim_{x \\to \\infty} -\\frac{1}{2} e^{x^{-1}} \\left(\\frac{1}{x^2} + 1\\right) $$\n$$ = -\\frac{1}{2} e^0 (0 + 1) = -\\frac{1}{2} $$",
      "time_limit": 60
    },
    {
      "id": 53,
      "topic": "২. বীজগাণিতিক লিমিট, অসীম লিমিট ও L'Hôpital's Rule",
      "question_text": "৫৩. $\\lim_{n \\to \\infty} \\frac{1}{n^4} \\sum_{r=1}^n r^3 = ?$ [IUT'19-20]",
      "options": [
        "$\\frac{1}{2}$",
        "$\\frac{1}{3}$",
        "$4$",
        "$\\frac{1}{4}$"
      ],
      "correct_answer": "$\\frac{1}{4}$",
      "explanation": "$$ \\lim_{n \\to \\infty} \\frac{1}{n^4} \\sum_{r=1}^n r^3 $$\n$$ \\sum_{r=1}^n r^3 = \\lim_{n \\to \\infty} \\frac{1}{n^4} [1^3 + 2^3 + 3^3 + \\dots + n^3] $$\n$$ = \\lim_{n \\to \\infty} \\frac{1}{n^4} \\left\\{ \\frac{n(n+1)}{2} \\right\\}^2 $$\n$$ = \\lim_{n \\to \\infty} \\frac{n^2(n^2+2n+1)}{4n^4} = \\lim_{n \\to \\infty} \\frac{n^4+2n^3+n^2}{4n^4} $$\n$$ = \\lim_{n \\to \\infty} \\frac{n^4}{4n^4} = \\lim_{n \\to \\infty} \\frac{1}{4} = \\frac{1}{4} $$",
      "time_limit": 60
    },
    {
      "id": 54,
      "topic": "২. বীজগাণিতিক লিমিট, অসীম লিমিট ও L'Hôpital's Rule",
      "question_text": "৫৪. $\\lim_{x \\to \\infty} (\\sqrt{x+\\sqrt{x}} - \\sqrt{x}) = ?$ [RUET'14-15]",
      "options": [
        "$\\infty$",
        "$0$",
        "$e$",
        "$0.5$",
        "None"
      ],
      "correct_answer": "$0.5$",
      "explanation": "$$ \\lim_{x \\to \\infty} (\\sqrt{x+\\sqrt{x}} - \\sqrt{x}) = \\lim_{x \\to \\infty} \\frac{(x+\\sqrt{x}) - x}{\\sqrt{x+\\sqrt{x}} + \\sqrt{x}} $$\n$$ = \\lim_{x \\to \\infty} \\frac{\\sqrt{x}}{\\sqrt{x+\\sqrt{x}} + \\sqrt{x}} = \\lim_{x \\to \\infty} \\frac{1}{\\sqrt{1+\\frac{1}{\\sqrt{x}}} + 1} = \\frac{1}{\\sqrt{1+0} + 1} = \\frac{1}{2} $$",
      "time_limit": 60
    },
    {
      "id": 55,
      "topic": "২. বীজগাণিতিক লিমিট, অসীম লিমিট ও L'Hôpital's Rule",
      "question_text": "৫৫. $\\lim_{n \\to \\infty} \\frac{5^{n+1} + 7^{n+1}}{5^n - 7^n}$ এর মান হল- [BUET'12-13]",
      "options": [
        "$\\frac{1}{5}$",
        "$-5$",
        "$\\frac{1}{7}$",
        "$-7$"
      ],
      "correct_answer": "$-7$",
      "explanation": "$$ \\lim_{n \\to \\infty} \\frac{5^{n+1} + 7^{n+1}}{5^n - 7^n} $$\n$$ = \\lim_{n \\to \\infty} \\frac{7^{n+1} \\left\\{ (\\frac{5}{7})^{n+1} + 1 \\right\\}}{7^n \\left\\{ (\\frac{5}{7})^n - 1 \\right\\}} = \\lim_{n \\to \\infty} 7 \\frac{(\\frac{5}{7})^{n+1} + 1}{(\\frac{5}{7})^n - 1} $$\n$$ = 7 \\frac{0 + 1}{0 - 1} = -7 $$\n$\\left[ \\because |r| < 1 \\text{ হলে } \\lim_{n \\to \\infty} r^n = 0 \\right]$",
      "time_limit": 60
    },
    {
      "id": 56,
      "topic": "২. বীজগাণিতিক লিমিট, অসীম লিমিট ও L'Hôpital's Rule",
      "question_text": "৫৬. $a$ এবং $b$ এর মান যথাক্রমে কত হলে $\\lim_{x \\to 0} \\frac{ae^x - b\\cos x + e^{-x}}{\\sin x} = 2$ হয়? [KUET'16-17]",
      "options": [
        "$3, 3$",
        "$3, 4$",
        "$4, 3$",
        "$-3, 4$",
        "$-3, -4$"
      ],
      "correct_answer": "$3, 4$",
      "explanation": "$$ \\lim_{x \\to 0} \\frac{ae^x - b\\cos x + e^{-x}}{\\sin x} = 2 $$\nএখানে, $x = 0$ বসালে হরে $0$ হয় এবং limit টির একটি সসীম মান আছে। অর্থাৎ, $x = 0$ বসালে লবেও $0$ আসতে হবে। যাতে সসীম মান পাওয়ার জন্য L'Hôpital's rule ব্যবহার করা যায় $\\left[ \\frac{0}{0} \\text{ আকারে হতে হবে} \\right]$।\n$\\therefore$ লব $= a \\cdot e^0 - b\\cos 0 + e^{-0} = a - b + 1 = 0$\n$\\therefore b = a + 1$ যা শুধুমাত্র (খ) অপশন দ্বারাই সিদ্ধ হয়।",
      "time_limit": 60
    },
    {
      "id": 57,
      "topic": "২. বীজগাণিতিক লিমিট, অসীম লিমিট ও L'Hôpital's Rule",
      "question_text": "৫৭. 'a' এর যে মানের জন্য $\\lim_{x \\to 0} \\frac{a\\sin x - 3x}{5x}$ এর মান $0$ হবে তা হলো- [KUET'14-15]",
      "options": [
        "$\\frac{3}{5}$",
        "$5$",
        "$3$",
        "$2$",
        "$8$"
      ],
      "correct_answer": "$3$",
      "explanation": "$$ \\lim_{x \\to 0} \\left( \\frac{a\\sin x}{5x} - \\frac{3x}{5x} \\right) = 0 \\Rightarrow \\left( \\frac{a}{5} - \\frac{3}{5} \\right) = 0 $$\n$\\therefore a = 3$",
      "time_limit": 60
    },
    {
      "id": 58,
      "topic": "২. বীজগাণিতিক লিমিট, অসীম লিমিট ও L'Hôpital's Rule",
      "question_text": "৫৮. 'k' এর কোন মানের জন্য $\\lim_{x \\to 0} \\frac{2e^x - 2e^{-kx} + kx}{x^2}$ এর মান $-15$ হবে? [KUET'13-14]",
      "options": [
        "$0$",
        "$-3$",
        "$-20$",
        "$8$",
        "$-10$"
      ],
      "correct_answer": "$-10$",
      "explanation": "$$ \\lim_{x \\to 0} \\frac{2e^x - 2e^{-kx} + kx}{x^2} \\left[ \\frac{0}{0} \\text{ আকারের} \\right] $$\n$$ = \\lim_{x \\to 0} \\frac{2e^x + 2ke^{-kx} + k}{2x} \\text{ [L'Hôpital's Rule প্রয়োগ করে]} $$\n$k = -10$ হলেই কেবল এটি $\\frac{0}{0}$ আকারের হবে এবং L'Hôpital's Rule প্রয়োগ করা যাবে।\n$\\left[ \\because 2 \\cdot e^0 + 8 \\cdot e^0 + k = 0 \\Rightarrow 10 + k = 0 \\therefore k = -10 \\right]$\nসেক্ষেত্রে, $\\lim_{x \\to 0} \\frac{2e^x - 32e^{-kx}}{2} = \\frac{2 - 32}{2} = -15$ হয়।\n$\\therefore k = -10$",
      "time_limit": 60
    },
    {
      "id": 59,
      "topic": "৩. ত্রিকোণমিতিক, সূচকীয় ও লগারিদমিক লিমিট",
      "question_text": "১. $\\lim_{x \\to \\infty} x \\sin\\left(\\frac{2}{x}\\right) = ?$ [ঢা. বো. ২২]",
      "options": [
        "$\\infty$",
        "$0$",
        "$\\frac{1}{2}$",
        "$2$"
      ],
      "correct_answer": "$2$",
      "explanation": "ধরি, $\\frac{2}{x} = h$\n$x \\to \\infty$ হলে, $h \\to 0$\n$$\\lim_{x \\to \\infty} x \\sin\\left(\\frac{2}{x}\\right) = \\lim_{h \\to 0} \\frac{2}{h} \\sin h = 2 \\lim_{h \\to 0} \\frac{\\sin h}{h} = 2$$",
      "time_limit": 60
    },
    {
      "id": 60,
      "topic": "৩. ত্রিকোণমিতিক, সূচকীয় ও লগারিদমিক লিমিট",
      "question_text": "২. $\\lim_{x \\to 0} \\frac{\\sin 2x}{2x - x^{2}} = \\text{কত}?$ [চ. বো. ২০]",
      "options": [
        "$0$",
        "$-1$",
        "$1$",
        "$2$"
      ],
      "correct_answer": "$1$",
      "explanation": "$$\\lim_{x \\to 0} \\frac{\\sin 2x}{x(2 - x)} = \\lim_{x \\to 0} \\frac{\\sin 2x}{2x} \\times \\frac{2}{2-x} = 1 \\times \\frac{2}{2-0} = 1$$",
      "time_limit": 60
    },
    {
      "id": 61,
      "topic": "৩. ত্রিকোণমিতিক, সূচকীয় ও লগারিদমিক লিমিট",
      "question_text": "৩. $\\lim_{x \\to 0} \\frac{\\tan^{-1} 2x}{3x} = \\text{কত}?$ [কু. বো. ২০; অনুরূপ প্রশ্ন: সি. বো. ২২, ২১; ঢা. বো. ২১; য. বো. ২১; চ. বো. ২১]",
      "options": [
        "$\\frac{1}{6}$",
        "$\\frac{1}{3}$",
        "$\\frac{1}{2}$",
        "$\\frac{2}{3}$"
      ],
      "correct_answer": "$\\frac{2}{3}$",
      "explanation": "$$\\lim_{x \\to 0} \\frac{\\tan^{-1} 2x}{3x} = \\frac{2}{3} \\lim_{x \\to 0} \\frac{\\tan^{-1} 2x}{2x} = \\frac{2}{3} \\times 1 = \\frac{2}{3}$$\nShortcut: $\\lim_{x \\to 0} \\frac{\\tan^{-1} ax}{bx} = \\frac{a}{b}$ $\\therefore \\lim_{x \\to 0} \\frac{\\tan^{-1} 2x}{3x} = \\frac{2}{3}$",
      "time_limit": 60
    },
    {
      "id": 62,
      "topic": "৩. ত্রিকোণমিতিক, সূচকীয় ও লগারিদমিক লিমিট",
      "question_text": "৪. $\\lim_{x \\to 0} \\frac{1 - \\cos 4x}{2x^{2}}$ এর মান কত? [ঢা. বো. ২৫; অনুরূপ প্রশ্ন: সি. বো. ২০; কু. বো. ২১]",
      "options": [
        "$\\frac{1}{2}$",
        "$0$",
        "$2$",
        "$4$"
      ],
      "correct_answer": "$4$",
      "explanation": "$$\\lim_{x \\to 0} \\frac{1 - \\cos 4x}{2x^{2}} = \\lim_{x \\to 0} \\frac{2 \\sin^{2} 2x}{2x^{2}}$$\n$$= \\left(\\lim_{x \\to 0} \\frac{\\sin 2x}{2x}\\right)^{2} \\times 4 = 1^{2} \\times 4 = 4$$",
      "time_limit": 60
    },
    {
      "id": 63,
      "topic": "৩. ত্রিকোণমিতিক, সূচকীয় ও লগারিদমিক লিমিট",
      "question_text": "৫. $\\lim_{x \\to 0} \\frac{\\sin x}{\\sin 2x}$ এর মান নিচের কোনটি? [য. বো. ২০]",
      "options": [
        "$0$",
        "$1$",
        "$-1$",
        "$\\frac{1}{2}$"
      ],
      "correct_answer": "$\\frac{1}{2}$",
      "explanation": "$$\\lim_{x \\to 0} \\frac{\\sin x}{\\sin 2x} = \\lim_{x \\to 0} \\frac{\\sin x}{2 \\sin x \\cos x} = \\lim_{x \\to 0} \\frac{1}{2 \\cos x} = \\frac{1}{2}$$\nShortcut: $\\lim_{x \\to 0} \\frac{\\sin ax}{\\sin bx} = \\frac{a}{b}$, $\\therefore \\lim_{x \\to 0} \\frac{\\sin x}{\\sin 2x} = \\frac{1}{2}$",
      "time_limit": 60
    },
    {
      "id": 64,
      "topic": "৩. ত্রিকোণমিতিক, সূচকীয় ও লগারিদমিক লিমিট",
      "question_text": "৬. $\\lim_{x \\to 0} \\frac{\\sin 2x}{\\tan 3x} = \\text{কত}?$ [রা. বো. ২৫; অনুরূপ প্রশ্ন: চ. বো. ২২; চ. বো. ১৯]",
      "options": [
        "$0$",
        "$\\frac{2}{3}$",
        "$3$",
        "$\\frac{3}{2}$"
      ],
      "correct_answer": "$\\frac{2}{3}$",
      "explanation": "$$\\lim_{x \\to 0} \\frac{\\sin 2x}{\\tan 3x} = \\lim_{x \\to 0} \\frac{\\sin 2x}{2x} \\times \\frac{3x}{\\tan 3x} \\times \\frac{2x}{3x} = 1 \\times 1 \\times \\frac{2}{3} = \\frac{2}{3}$$\nShortcut: $\\lim_{x \\to 0} \\frac{\\sin px}{\\tan qx} = \\frac{p}{q}$",
      "time_limit": 60
    },
    {
      "id": 65,
      "topic": "৩. ত্রিকোণমিতিক, সূচকীয় ও লগারিদমিক লিমিট",
      "question_text": "৭. $\\lim_{x \\to 0} \\frac{\\sqrt{1 + \\sin x} - \\sqrt{1 - \\sin x}}{x}$ এর মান কত? [সি. বো. ২২]",
      "options": [
        "$0$",
        "$-2$",
        "$-1$",
        "$1$"
      ],
      "correct_answer": "$1$",
      "explanation": "$$\\lim_{x \\to 0} \\frac{\\sqrt{1 + \\sin x} - \\sqrt{1 - \\sin x}}{x}$$\n$$= \\lim_{x \\to 0} \\frac{(\\sqrt{1 + \\sin x} - \\sqrt{1 - \\sin x})(\\sqrt{1 + \\sin x} + \\sqrt{1 - \\sin x})}{x(\\sqrt{1 + \\sin x} + \\sqrt{1 - \\sin x})}$$\n$$= \\lim_{x \\to 0} \\frac{(\\sqrt{1 + \\sin x})^{2} - (\\sqrt{1 - \\sin x})^{2}}{x(\\sqrt{1 + \\sin x} + \\sqrt{1 - \\sin x})}$$\n$$= \\lim_{x \\to 0} \\frac{(1 + \\sin x) - (1 - \\sin x)}{x(\\sqrt{1 + \\sin x} + \\sqrt{1 - \\sin x})}$$\n$$= \\lim_{x \\to 0} \\frac{2 \\sin x}{x(\\sqrt{1 + \\sin x} + \\sqrt{1 - \\sin x})}$$\n$$= 2 \\times \\lim_{x \\to 0} \\frac{\\sin x}{x} \\times \\lim_{x \\to 0} \\frac{1}{\\sqrt{1 + \\sin x} + \\sqrt{1 - \\sin x}}$$\n$$= 2 \\times 1 \\times \\frac{1}{1 + 1} = 1$$\nবিকল্প পদ্ধতি: (L' Hôpital's Rule)\n$$\\lim_{x \\to 0} \\frac{\\sqrt{1 + \\sin x} - \\sqrt{1 - \\sin x}}{x} \\quad \\left[\\frac{0}{0} \\text{ Form}\\right]$$\n$$= \\lim_{x \\to 0} \\frac{\\frac{1}{2\\sqrt{1 + \\sin x}}(\\cos x) - \\frac{1}{2\\sqrt{1 - \\sin x}}(-\\cos x)}{1}$$\n$$= \\frac{1}{2\\sqrt{1 + 0}} \\times 1 + \\frac{1}{2\\sqrt{1 - 0}} \\times 1 = 1$$",
      "time_limit": 60
    },
    {
      "id": 66,
      "topic": "৩. ত্রিকোণমিতিক, সূচকীয় ও লগারিদমিক লিমিট",
      "question_text": "৮. $\\lim_{x \\to 0} \\frac{x(\\sin 2x + \\sin 3x)}{\\sin x}$ এর মান- [য. বো. ২১]",
      "options": [
        "$-2$",
        "$-1$",
        "$0$",
        "$1$"
      ],
      "correct_answer": "$0$",
      "explanation": "$$\\lim_{x \\to 0} \\frac{x(\\sin 2x + \\sin 3x)}{\\sin x} = \\lim_{x \\to 0} \\frac{x}{\\sin x} \\times \\lim_{x \\to 0} (\\sin 2x + \\sin 3x)$$\n$$= 1 \\times (0 + 0) = 0$$",
      "time_limit": 60
    },
    {
      "id": 67,
      "topic": "৩. ত্রিকোণমিতিক, সূচকীয় ও লগারিদমিক লিমিট",
      "question_text": "৯. $\\lim_{x \\to \\frac{\\pi}{2}} \\frac{\\sin 2x}{\\cos x} = \\text{কত}?$ [ঢা. বো. ২১]",
      "options": [
        "$-2$",
        "$0$",
        "$2$",
        "$\\infty$"
      ],
      "correct_answer": "$2$",
      "explanation": "$$\\lim_{x \\to \\frac{\\pi}{2}} \\frac{\\sin 2x}{\\cos x} = \\lim_{x \\to \\frac{\\pi}{2}} \\frac{2 \\sin x \\cos x}{\\cos x}$$\n$$= \\lim_{x \\to \\frac{\\pi}{2}} 2 \\sin x$$\n$$= 2 \\sin\\left(\\frac{\\pi}{2}\\right) = 2$$",
      "time_limit": 60
    },
    {
      "id": 68,
      "topic": "৩. ত্রিকোণমিতিক, সূচকীয় ও লগারিদমিক লিমিট",
      "question_text": "১০. $\\lim_{x \\to 0} \\frac{\\sqrt{1 - \\cos 2x}}{x}$ এর মান কত? [কু. বো. ২১]",
      "options": [
        "$2\\sqrt{2}$",
        "$\\sqrt{2}$",
        "$\\frac{1}{\\sqrt{2}}$",
        "$0$"
      ],
      "correct_answer": "$\\sqrt{2}$",
      "explanation": "$$\\lim_{x \\to 0} \\frac{\\sqrt{1 - \\cos 2x}}{x} = \\lim_{x \\to 0} \\frac{\\sqrt{2 \\sin^{2} x}}{x}$$\n$$= \\lim_{x \\to 0} \\frac{\\sqrt{2} \\sin x}{x}$$\n$$= \\sqrt{2} \\lim_{x \\to 0} \\frac{\\sin x}{x} = \\sqrt{2} \\times 1 = \\sqrt{2}$$",
      "time_limit": 60
    },
    {
      "id": 69,
      "topic": "৩. ত্রিকোণমিতিক, সূচকীয় ও লগারিদমিক লিমিট",
      "question_text": "১১. $\\lim_{x \\to 0} \\frac{\\tan^{-1} 2x}{3x}$ এর মান কত? [সি. বো. ২১]",
      "options": [
        "$\\frac{3}{2}$",
        "$\\frac{2}{3}$",
        "$-\\frac{2}{3}$",
        "$-\\frac{3}{2}$"
      ],
      "correct_answer": "$\\frac{2}{3}$",
      "explanation": "$$\\lim_{x \\to 0} \\frac{\\tan^{-1} 2x}{3x} = \\lim_{x \\to 0} \\frac{\\tan^{-1} 2x}{2x} \\times \\frac{2}{3} = 1 \\times \\frac{2}{3} = \\frac{2}{3}$$",
      "time_limit": 60
    },
    {
      "id": 70,
      "topic": "৩. ত্রিকোণমিতিক, সূচকীয় ও লগারিদমিক লিমিট",
      "question_text": "১২. $\\lim_{x \\to 0} \\frac{\\sin 2x}{x \\cos 3x}$ এর মান- [ঢা. বো. ১৯]",
      "options": [
        "$3$",
        "$2$",
        "$\\frac{2}{3}$",
        "$\\frac{1}{2}$"
      ],
      "correct_answer": "$2$",
      "explanation": "$$\\lim_{x \\to 0} \\frac{\\sin 2x}{x \\cos 3x} = \\lim_{x \\to 0} \\frac{\\sin 2x}{2x} \\times 2$$\n$$= \\lim_{x \\to 0} \\frac{\\sin 2x}{2x} \\times \\lim_{x \\to 0} \\frac{1}{\\cos 3x} \\times 2 = 1 \\times 1 \\times 2 = 2$$",
      "time_limit": 60
    },
    {
      "id": 71,
      "topic": "৩. ত্রিকোণমিতিক, সূচকীয় ও লগারিদমিক লিমিট",
      "question_text": "১৩. $\\lim_{x \\to 0} \\frac{\\sin 2x^{\\circ}}{x}$ এর মান কোনটি? [য. বো. ১৯; অনুরূপ প্রশ্ন: কু. বো. ২০; য. বো. ২২; সি. বো. ২১]",
      "options": [
        "$\\frac{\\pi}{180}$",
        "$\\frac{\\pi}{90}$",
        "$0$",
        "$\\frac{90}{\\pi}$"
      ],
      "correct_answer": "$\\frac{\\pi}{90}$",
      "explanation": "$$\\lim_{x \\to 0} \\frac{\\sin\\left(2 \\times \\frac{x\\pi}{180}\\right)}{x} \\quad \\left[1^{\\circ} = \\frac{\\pi}{180} \\text{ Radian}\\right]$$\n$$= \\lim_{x \\to 0} \\frac{\\sin\\left(\\frac{2\\pi x}{180}\\right)}{\\frac{2\\pi x}{180}} \\times \\frac{2\\pi}{180}$$\n$$= 1 \\times \\frac{2\\pi}{180} = \\frac{\\pi}{90}$$",
      "time_limit": 60
    },
    {
      "id": 72,
      "topic": "৩. ত্রিকোণমিতিক, সূচকীয় ও লগারিদমিক লিমিট",
      "question_text": "১৪. $\\lim_{x \\to 0} \\frac{\\sin bx}{x} = \\text{কত}?$ [সি. বো. ২০; অনুরূপ প্রশ্ন: সি. বো. ২৫, ১৯; য. বো. ১৯; ঢা. বো. ১৭]",
      "options": [
        "$b$",
        "$\\frac{1}{b}$",
        "$0$",
        "$\\infty$"
      ],
      "correct_answer": "$b$",
      "explanation": "$$\\lim_{x \\to 0} \\frac{\\sin bx}{x} = \\lim_{x \\to 0} \\frac{\\sin bx}{bx} \\times b = 1 \\times b = b$$",
      "time_limit": 60
    },
    {
      "id": 73,
      "topic": "৩. ত্রিকোণমিতিক, সূচকীয় ও লগারিদমিক লিমিট",
      "question_text": "১৫. $\\lim_{x \\to 0} \\frac{\\ln(1 - 3x)}{3x} = \\text{কত}?$ [ঢা. বো. ২০]",
      "options": [
        "$1$",
        "$\\frac{1}{3}$",
        "$-1$",
        "$-3$"
      ],
      "correct_answer": "$-1$",
      "explanation": "$$\\lim_{x \\to 0} \\frac{\\frac{-3}{1 - 3x}}{3} \\quad [\\text{L' Hôpital's Rule}]$$\n$$= \\frac{-3}{3} = -1$$",
      "time_limit": 60
    },
    {
      "id": 74,
      "topic": "৩. ত্রিকোণমিতিক, সূচকীয় ও লগারিদমিক লিমিট",
      "question_text": "১৬. $\\lim_{n \\to \\infty} \\frac{3^{n+1} + 5^{n+1}}{3^{n} - 5^{n}}$ এর মান কত? [য. বো. ২০; অনুরূপ প্রশ্ন: রা. বো. ২২]",
      "options": [
        "$-3$",
        "$3$",
        "$-5$",
        "$5$"
      ],
      "correct_answer": "$-5$",
      "explanation": "$$\\lim_{n \\to \\infty} \\frac{3^{n+1} + 5^{n+1}}{3^{n} - 5^{n}}$$\n$$= \\lim_{n \\to \\infty} \\frac{3^{n} \\times 3 + 5^{n} \\times 5}{3^{n} - 5^{n}}$$\n$$= \\lim_{n \\to \\infty} \\frac{5^{n}\\left(3 \\times \\left(\\frac{3}{5}\\right)^{n} + 5\\right)}{5^{n}\\left(\\left(\\frac{3}{5}\\right)^{n} - 1\\right)}$$\n$$= \\lim_{n \\to \\infty} \\frac{3 \\times \\left(\\frac{3}{5}\\right)^{n} + 5}{\\left(\\frac{3}{5}\\right)^{n} - 1}$$\n$$= \\frac{0 + 5}{0 - 1} \\quad \\left[n \\to \\infty \\text{ হলে } \\left(\\frac{3}{5}\\right)^{n} \\to 0\\right]$$\n$$= -5$$",
      "time_limit": 60
    },
    {
      "id": 75,
      "topic": "৩. ত্রিকোণমিতিক, সূচকীয় ও লগারিদমিক লিমিট",
      "question_text": "১৭. $\\lim_{x \\to 0} \\frac{e^{2x} - 1}{2x} = \\text{কত}?$ [য. বো. ২২; অনুরূপ প্রশ্ন: ঢা. বো. ২১]",
      "options": [
        "$-1$",
        "$0$",
        "$1$",
        "$\\frac{1}{2}$"
      ],
      "correct_answer": "$1$",
      "explanation": "$$\\lim_{x \\to 0} \\frac{e^{2x} - 1}{2x} = \\lim_{x \\to 0} \\frac{2e^{2x}}{2} = \\frac{2 \\times 1}{2} = 1 \\quad \\text{[L' Hôpital's Rule]}$$\nShortcut: $\\lim_{x \\to 0} \\frac{e^{ax} - 1}{ax} = 1 \\Rightarrow \\lim_{x \\to 0} \\frac{e^{2x} - 1}{2x} = 1$",
      "time_limit": 60
    },
    {
      "id": 76,
      "topic": "৩. ত্রিকোণমিতিক, সূচকীয় ও লগারিদমিক লিমিট",
      "question_text": "১৮. $\\lim_{x \\to 0} \\frac{2\\ln(1 + x) - \\ln(1 - x)}{x}$ এর মান- [সি. বো. ২২]",
      "options": [
        "$0$",
        "$1$",
        "$2$",
        "$3$"
      ],
      "correct_answer": "$3$",
      "explanation": "L'Hôpital's Rule প্রয়োগ করে,\n$$\\lim_{x \\to 0} \\frac{\\frac{2}{1 + x} + \\frac{1}{1 - x}}{1} = \\frac{2}{1 + 0} + \\frac{1}{1 - 0} = 3$$",
      "time_limit": 60
    },
    {
      "id": 77,
      "topic": "৩. ত্রিকোণমিতিক, সূচকীয় ও লগারিদমিক লিমিট",
      "question_text": "১৯. $\\lim_{x \\to \\infty} \\frac{5^{x} - 5^{-x}}{5^{x} + 5^{-x}}$ এর মান কোনটি? [সকল বোর্ড ১৮]",
      "options": [
        "$-5$",
        "$-2$",
        "$1$",
        "$5$"
      ],
      "correct_answer": "$1$",
      "explanation": "$$\\lim_{x \\to \\infty} \\frac{5^{x} - 5^{-x}}{5^{x} + 5^{-x}} = \\lim_{x \\to \\infty} \\frac{5^{x} - \\frac{1}{5^{x}}}{5^{x} + \\frac{1}{5^{x}}}$$\n$$= \\lim_{x \\to \\infty} \\frac{5^{x} \\left(1 - \\frac{1}{5^{2x}}\\right)}{5^{x} \\left(1 + \\frac{1}{5^{2x}}\\right)} = \\frac{1 - 0}{1 + 0} = 1$$",
      "time_limit": 60
    },
    {
      "id": 78,
      "topic": "৩. ত্রিকোণমিতিক, সূচকীয় ও লগারিদমিক লিমিট",
      "question_text": "২০. $\\lim_{x \\to \\infty} \\frac{3^{x} - 3^{-x}}{4 \\cdot 3^{x} + 3^{-x}}$ এর মান কত? [সি. বো. ১৭]",
      "options": [
        "$\\frac{1}{4}$",
        "$\\frac{3}{4}$",
        "$1$",
        "$\\infty$"
      ],
      "correct_answer": "$\\frac{1}{4}$",
      "explanation": "$$\\lim_{x \\to \\infty} \\frac{3^{x} - 3^{-x}}{4 \\cdot 3^{x} + 3^{-x}} = \\lim_{x \\to \\infty} \\frac{3^{x} - \\frac{1}{3^{x}}}{4 \\cdot 3^{x} + \\frac{1}{3^{x}}}$$\n$$= \\lim_{x \\to \\infty} \\frac{3^{x} \\left(1 - \\frac{1}{3^{2x}}\\right)}{3^{x} \\left(4 + \\frac{1}{3^{2x}}\\right)} = \\frac{1 - 0}{4 + 0} = \\frac{1}{4}$$",
      "time_limit": 60
    },
    {
      "id": 79,
      "topic": "৩. ত্রিকোণমিতিক, সূচকীয় ও লগারিদমিক লিমিট",
      "question_text": "২১. $\\lim_{x \\to 0} \\frac{\\tan^{-1} x}{x} = ?$ [JnU'25-26; DU'24-25]",
      "options": [
        "$0$",
        "$\\frac{1}{2}$",
        "$-1$",
        "$1$"
      ],
      "correct_answer": "$1$",
      "explanation": "$$\\lim_{x \\to 0} \\frac{\\tan^{-1} x}{x} = 1$$",
      "time_limit": 60
    },
    {
      "id": 80,
      "topic": "৩. ত্রিকোণমিতিক, সূচকীয় ও লগারিদমিক লিমিট",
      "question_text": "২২. $\\lim_{x \\to 0} \\frac{\\tan^{-1} 2x}{x} = ?$ [RU'12-13; JnU'24-25]",
      "options": [
        "$1$",
        "$0$",
        "$2$",
        "$\\frac{1}{2}$"
      ],
      "correct_answer": "$2$",
      "explanation": "$$\\lim_{x \\to 0} \\frac{\\tan^{-1} 2x}{x} = \\lim_{x \\to 0} \\frac{\\tan^{-1} 2x}{2x} \\times 2 = 1 \\times 2 = 2$$",
      "time_limit": 60
    },
    {
      "id": 81,
      "topic": "৩. ত্রিকোণমিতিক, সূচকীয় ও লগারিদমিক লিমিট",
      "question_text": "২৩. $\\lim_{x \\to 0} \\frac{\\ln(1+x)}{x}$ এর মান কোনটি? [JU'22-23]",
      "options": [
        "$0$",
        "$\\infty$",
        "$1$",
        "$-1$"
      ],
      "correct_answer": "$1$",
      "explanation": "$$\\lim_{x \\to 0} \\frac{\\ln(1+x)}{x} = \\lim_{x \\to 0} \\frac{x - \\frac{x^{2}}{2} + \\frac{x^{3}}{3} - \\dots}{x}$$\n$$= \\lim_{x \\to 0} \\left(1 - \\frac{x}{2} + \\frac{x^{2}}{3} - \\dots\\right) = 1 - 0 + 0 - \\dots = 1$$",
      "time_limit": 60
    },
    {
      "id": 82,
      "topic": "৩. ত্রিকোণমিতিক, সূচকীয় ও লগারিদমিক লিমিট",
      "question_text": "২৪. $\\lim_{x \\to 0} \\frac{\\sin^{-1}(2x)}{x}$ এর মান কোনটি? [JU'22-23]",
      "options": [
        "$1$",
        "$0$",
        "$2$",
        "$\\frac{1}{2}$"
      ],
      "correct_answer": "$2$",
      "explanation": "$$\\lim_{x \\to 0} \\frac{\\sin^{-1}(2x)}{x} = \\lim_{x \\to 0} \\frac{\\sin^{-1} 2x}{2x} \\times 2$$\n$$= \\left(\\lim_{2x \\to 0} \\frac{\\sin^{-1} 2x}{2x}\\right) \\times 2 = 1 \\times 2 = 2$$",
      "time_limit": 60
    },
    {
      "id": 83,
      "topic": "৩. ত্রিকোণমিতিক, সূচকীয় ও লগারিদমিক লিমিট",
      "question_text": "২৫. $\\lim_{x \\to 0} \\frac{(e^{x} - 1)\\tan^{2} x}{x^{3}} = \\text{কত}?$ [RU'22-23]",
      "options": [
        "$-1$",
        "$1$",
        "$4$",
        "$3$"
      ],
      "correct_answer": "$1$",
      "explanation": "$$\\lim_{x \\to 0} \\left(\\frac{e^{x} - 1}{x}\\right) \\left(\\frac{\\tan^{2} x}{x^{2}}\\right)$$\n$$= \\lim_{x \\to 0} \\left(\\frac{e^{x} - 1}{x}\\right) \\times \\left(\\lim_{x \\to 0} \\frac{\\tan x}{x}\\right)^{2} = 1 \\times 1^{2} = 1$$",
      "time_limit": 60
    },
    {
      "id": 84,
      "topic": "৩. ত্রিকোণমিতিক, সূচকীয় ও লগারিদমিক লিমিট",
      "question_text": "২৬. $\\lim_{x \\to 0} \\frac{e^{\\sin x} - 1}{x} = \\text{কত}?$ [RU'22-23]",
      "options": [
        "$0$",
        "$1$",
        "$2$",
        "$e$"
      ],
      "correct_answer": "$1$",
      "explanation": "$$\\lim_{x \\to 0} \\frac{e^{\\sin x} - 1}{x} = \\lim_{x \\to 0} \\frac{e^{\\sin x} - 1}{\\sin x} \\times \\frac{\\sin x}{x} = 1 \\times 1 = 1$$",
      "time_limit": 60
    },
    {
      "id": 85,
      "topic": "৩. ত্রিকোণমিতিক, সূচকীয় ও লগারিদমিক লিমিট",
      "question_text": "২৭. $\\lim_{x \\to 0} \\frac{\\sin x}{\\tan^{-1}(3x)} = ?$ [DU'18-19]",
      "options": [
        "$0$",
        "$\\frac{1}{3}$",
        "$1$",
        "$3$"
      ],
      "correct_answer": "$\\frac{1}{3}$",
      "explanation": "$$\\lim_{x \\to 0} \\frac{\\sin x}{\\tan^{-1} 3x} = \\frac{\\lim_{x \\to 0} \\frac{\\sin x}{x}}{\\lim_{x \\to 0} \\frac{\\tan^{-1} 3x}{3x} \\times 3} = \\frac{1}{1 \\times 3} = \\frac{1}{3}$$",
      "time_limit": 60
    },
    {
      "id": 86,
      "topic": "৩. ত্রিকোণমিতিক, সূচকীয় ও লগারিদমিক লিমিট",
      "question_text": "২৮. $\\lim_{x \\to 0} \\frac{\\sin x^{\\circ}}{x} = \\text{কত}?$ [RU'17-18]",
      "options": [
        "$1$",
        "$0$",
        "$\\frac{\\pi}{180}$",
        "$\\frac{180}{\\pi}$"
      ],
      "correct_answer": "$\\frac{\\pi}{180}$",
      "explanation": "$$\\lim_{x \\to 0} \\frac{\\sin x^{\\circ}}{x} = \\lim_{x \\to 0} \\frac{\\sin\\left(\\frac{\\pi x}{180}\\right)}{x} = \\frac{\\pi}{180} \\lim_{x \\to 0} \\frac{\\sin\\left(\\frac{\\pi x}{180}\\right)}{\\frac{\\pi x}{180}} = \\frac{\\pi}{180} \\times 1 = \\frac{\\pi}{180}$$",
      "time_limit": 60
    },
    {
      "id": 87,
      "topic": "৩. ত্রিকোণমিতিক, সূচকীয় ও লগারিদমিক লিমিট",
      "question_text": "২৯. $\\lim_{x \\to 0} \\frac{e^{x}}{\\cos x}$ এর মান- [DU'16-17]",
      "options": [
        "$e$",
        "$1$",
        "$\\frac{1}{e}$",
        "$0$"
      ],
      "correct_answer": "$1$",
      "explanation": "$$\\lim_{x \\to 0} \\frac{e^{x}}{\\cos x} = \\frac{e^{0}}{\\cos 0} = \\frac{1}{1} = 1$$",
      "time_limit": 60
    },
    {
      "id": 88,
      "topic": "৩. ত্রিকোণমিতিক, সূচকীয় ও লগারিদমিক লিমিট",
      "question_text": "৩০. $\\lim_{x \\to 0} \\frac{\\sin ax}{\\sin bx}$ এর মান কত? [JU'15-16]",
      "options": [
        "$\\frac{a}{b}$",
        "$\\frac{b}{a}$",
        "$ab$",
        "কোনোটিই নয়"
      ],
      "correct_answer": "$\\frac{a}{b}$",
      "explanation": "$$\\lim_{x \\to 0} \\frac{\\sin ax}{\\sin bx} = \\lim_{x \\to 0} \\frac{\\frac{\\sin ax}{ax} \\cdot ax}{\\frac{\\sin bx}{bx} \\cdot bx} = \\frac{a}{b}$$",
      "time_limit": 60
    },
    {
      "id": 89,
      "topic": "৩. ত্রিকোণমিতিক, সূচকীয় ও লগারিদমিক লিমিট",
      "question_text": "৩১. $\\lim_{x \\to 0} \\frac{x(\\cos x + \\cos 2x)}{\\sin x} = ?$ [RU'14-15; KU'13-14; DU'03-04]",
      "options": [
        "$1$",
        "$2$",
        "$3$",
        "$4$"
      ],
      "correct_answer": "$2$",
      "explanation": "$$\\lim_{x \\to 0} \\frac{x(\\cos x + \\cos 2x)}{\\sin x} = \\lim_{x \\to 0} \\frac{(\\cos x + \\cos 2x)}{\\left(\\frac{\\sin x}{x}\\right)}$$\n$$= \\lim_{x \\to 0} (\\cos x + \\cos 2x) = 1 + 1 = 2$$",
      "time_limit": 60
    },
    {
      "id": 90,
      "topic": "৩. ত্রিকোণমিতিক, সূচকীয় ও লগারিদমিক লিমিট",
      "question_text": "৩২. $\\lim_{x \\to -1} \\frac{\\log(2 + 2x + x^{2})}{(x+1)^{2}}$ এর মান কত? [CU'13-14]",
      "options": [
        "$5$",
        "$2$",
        "$1$",
        "$\\frac{3}{2}$"
      ],
      "correct_answer": "$1$",
      "explanation": "$$\\lim_{x \\to -1} \\frac{\\log(2 + 2x + x^{2})}{(x+1)^{2}}$$\n$$= \\lim_{(x+1) \\to 0} \\frac{\\log(1 + (x+1)^{2})}{(x+1)^{2}} = 1$$",
      "time_limit": 60
    },
    {
      "id": 91,
      "topic": "৩. ত্রিকোণমিতিক, সূচকীয় ও লগারিদমিক লিমিট",
      "question_text": "৩৩. $\\log_{e}(1+x) = ?$ [JnU'12-13]",
      "options": [
        "$x + \\frac{x^{2}}{2} + \\frac{x^{3}}{3} + \\dots$",
        "$x - \\frac{x^{2}}{2!} + \\frac{x^{3}}{3!} - \\dots$",
        "$1 + \\frac{x}{1!} + \\frac{x^{2}}{2!} + \\dots$",
        "$x - \\frac{x^{2}}{2} + \\frac{x^{3}}{3} - \\dots$"
      ],
      "correct_answer": "$x - \\frac{x^{2}}{2} + \\frac{x^{3}}{3} - \\dots$",
      "explanation": "$\\log_e(1+x)$ এর ধারা বিস্তার: $x - \\frac{x^2}{2} + \\frac{x^3}{3} - \\dots$",
      "time_limit": 60
    },
    {
      "id": 92,
      "topic": "৩. ত্রিকোণমিতিক, সূচকীয় ও লগারিদমিক লিমিট",
      "question_text": "৩৪. $\\lim_{x \\to \\infty} \\left(\\frac{x+1}{x}\\right)^{x}$ এর মান কোনটি? [JU'24-25]",
      "options": [
        "$1$",
        "$0$",
        "$e$",
        "$\\frac{1}{e}$"
      ],
      "correct_answer": "$e$",
      "explanation": "$$\\lim_{x \\to \\infty} \\left(\\frac{x+1}{x}\\right)^{x} = \\lim_{x \\to \\infty} \\left(1 + \\frac{1}{x}\\right)^{x}$$\n$$= \\lim_{\\frac{1}{x} \\to 0} \\left(1 + \\frac{1}{x}\\right)^{\\frac{1}{\\frac{1}{x}}} = e$$",
      "time_limit": 60
    },
    {
      "id": 93,
      "topic": "৩. ত্রিকোণমিতিক, সূচকীয় ও লগারিদমিক লিমিট",
      "question_text": "৩৫. $\\lim_{x \\to 0} (1+x)^{\\frac{1}{x}}$ এর মান কোনটি? [JU'24-25]",
      "options": [
        "$1$",
        "$0$",
        "$e$",
        "$\\frac{1}{e}$"
      ],
      "correct_answer": "$e$",
      "explanation": "$$\\lim_{x \\to 0} (1+x)^{\\frac{1}{x}} = e$$",
      "time_limit": 60
    },
    {
      "id": 94,
      "topic": "৩. ত্রিকোণমিতিক, সূচকীয় ও লগারিদমিক লিমিট",
      "question_text": "৩৬. $\\lim_{x \\to 0} (1 + 4x)^{\\frac{x+2}{x}}$ এর মান কত? [RU'21-22]",
      "options": [
        "$e^{2}$",
        "$e^{4}$",
        "$e^{3}$",
        "$e^{8}$"
      ],
      "correct_answer": "$e^{8}$",
      "explanation": "$$\\lim_{x \\to 0} (1 + 4x)^{\\frac{x+2}{x}} = \\lim_{x \\to 0} (1 + 4x)^{1 + \\frac{2}{x}}$$\n$$= e^{4 \\times 2} = e^{8}$$",
      "time_limit": 60
    },
    {
      "id": 95,
      "topic": "৩. ত্রিকোণমিতিক, সূচকীয় ও লগারিদমিক লিমিট",
      "question_text": "৩৭. $\\lim_{x \\to 0} (1 + ax)^{\\frac{b+xc}{x}} = \\text{কত}?$ [RU'18-19]",
      "options": [
        "$ac$",
        "$bc$",
        "$e^{ac}$",
        "$e^{ab}$"
      ],
      "correct_answer": "$e^{ab}$",
      "explanation": "$$\\lim_{x \\to 0} (1 + ax)^{\\frac{b+xc}{x}} = \\lim_{x \\to 0} (1 + ax)^{\\frac{b}{x} + c}$$\n$$= \\lim_{x \\to 0} (1 + ax)^{\\frac{b}{x}} \\cdot \\lim_{x \\to 0} (1 + ax)^{c}$$\n$$= 1 \\cdot \\lim_{x \\to 0} (1 + ax)^{\\frac{b}{x}} = e^{ab}$$",
      "time_limit": 60
    },
    {
      "id": 96,
      "topic": "৩. ত্রিকোণমিতিক, সূচকীয় ও লগারিদমিক লিমিট",
      "question_text": "৩৮. $\\lim_{x \\to \\infty} \\left(1 + \\frac{1}{x}\\right)^{x}$ এর মান কোনটি? [JU'23-24]",
      "options": [
        "$1$",
        "$\\infty$",
        "$0$",
        "$e$"
      ],
      "correct_answer": "$e$",
      "explanation": "ধরি, $\\frac{1}{x} = y \\Rightarrow x = \\frac{1}{y} \\therefore x \\to \\infty, y \\to 0$\n$$L = \\lim_{x \\to \\infty} \\left(1 + \\frac{1}{x}\\right)^{x} \\Rightarrow L = \\lim_{y \\to 0} (1 + y)^{\\frac{1}{y}}$$\n$$\\Rightarrow \\log L = \\lim_{y \\to 0} \\frac{1}{y} \\log(1 + y) = \\lim_{y \\to 0} \\frac{\\log(1 + y)}{y}$$\n$$\\Rightarrow \\log L = 1$$\n$$\\therefore L = e^{1} = e$$",
      "time_limit": 60
    },
    {
      "id": 97,
      "topic": "৩. ত্রিকোণমিতিক, সূচকীয় ও লগারিদমিক লিমিট",
      "question_text": "৩৯. $\\lim_{x \\to 0} \\left(1 + \\frac{x}{2}\\right)^{\\frac{x+2}{x}} = \\text{কত}?$ [JU'17-18]",
      "options": [
        "$e^{\\frac{1}{2}}$",
        "$e$",
        "$e^{2}$",
        "$1$"
      ],
      "correct_answer": "$e$",
      "explanation": "$$\\lim_{x \\to 0} \\left(1 + \\frac{x}{2}\\right)^{\\frac{x+2}{x}}$$\n$$= \\lim_{x \\to 0} \\left(1 + \\frac{x}{2}\\right)^{1} \\cdot \\lim_{x \\to 0} \\left(1 + \\frac{x}{2}\\right)^{\\frac{2}{x}} = e \\times 1 = e$$",
      "time_limit": 60
    },
    {
      "id": 98,
      "topic": "৩. ত্রিকোণমিতিক, সূচকীয় ও লগারিদমিক লিমিট",
      "question_text": "৪০. $\\lim_{x \\to 0} (\\sec x)^{x} = ?$ [JnU'13-14]",
      "options": [
        "$0$",
        "$1$",
        "$-1$",
        "অসংজ্ঞায়িত"
      ],
      "correct_answer": "$1$",
      "explanation": "$$\\lim_{x \\to 0} (\\sec x)^{x} = (\\sec 0)^{0} = 1^{0} = 1$$",
      "time_limit": 60
    },
    {
      "id": 99,
      "topic": "৩. ত্রিকোণমিতিক, সূচকীয় ও লগারিদমিক লিমিট",
      "question_text": "৪১. $\\lim_{x \\to \\frac{\\pi}{2}} (1 - \\sin x) \\tan x = ?$ [RU'25-26]",
      "options": [
        "$1$",
        "$0$",
        "$-1$",
        "কোনটিই নয়"
      ],
      "correct_answer": "$0$",
      "explanation": "$$\\lim_{x \\to \\frac{\\pi}{2}} (1 - \\sin x) \\tan x = \\lim_{x \\to \\frac{\\pi}{2}} \\frac{1 - \\sin x}{\\cot x}$$\n$$= \\lim_{x \\to \\frac{\\pi}{2}} \\frac{-\\cos x}{-\\text{cosec}^{2} x} = 0$$",
      "time_limit": 60
    },
    {
      "id": 100,
      "topic": "৩. ত্রিকোণমিতিক, সূচকীয় ও লগারিদমিক লিমিট",
      "question_text": "৪২. $\\lim_{x \\to 0} \\frac{\\tan^{-1} 2x}{x} = \\text{কত}?$ [BUP'24-25]",
      "options": [
        "$1$",
        "$0$",
        "$2$",
        "$-1$"
      ],
      "correct_answer": "$2$",
      "explanation": "$$\\lim_{x \\to 0} \\frac{\\tan^{-1} 2x}{x} = 2 \\lim_{x \\to 0} \\frac{\\tan^{-1} 2x}{2x} = 2 \\times 1 = 2$$",
      "time_limit": 60
    },
    {
      "id": 101,
      "topic": "৩. ত্রিকোণমিতিক, সূচকীয় ও লগারিদমিক লিমিট",
      "question_text": "৪৩. $\\lim_{x \\to 0} \\frac{1 - \\cos x}{x^{2}} = ?$ [RU'24-25, 19-20; JU'17-18]",
      "options": [
        "$\\frac{1}{2}$",
        "$2$",
        "$-2$",
        "$1$"
      ],
      "correct_answer": "$\\frac{1}{2}$",
      "explanation": "$$\\lim_{x \\to 0} \\frac{1 - \\cos x}{x^{2}} = \\lim_{x \\to 0} \\frac{2 \\sin^{2} \\frac{x}{2}}{x^{2}}$$\n$$= \\lim_{x \\to 0} \\frac{2 \\left(\\sin \\frac{x}{2}\\right)^{2}}{4 \\left(\\frac{x}{2}\\right)^{2}} = \\frac{2}{4} \\times 1 = \\frac{1}{2}$$",
      "time_limit": 60
    },
    {
      "id": 102,
      "topic": "৩. ত্রিকোণমিতিক, সূচকীয় ও লগারিদমিক লিমিট",
      "question_text": "৪৪. $\\lim_{x \\to 0} \\frac{1 - \\cos x}{x} = \\text{কত}?$ [JnU'24-25]",
      "options": [
        "$1$",
        "$x$",
        "$\\infty$",
        "$0$"
      ],
      "correct_answer": "$0$",
      "explanation": "$$\\lim_{x \\to 0} \\frac{1 - \\cos x}{x} = \\lim_{x \\to 0} \\frac{0 + \\sin x}{1} = \\frac{0 + 0}{1} = 0$$",
      "time_limit": 60
    },
    {
      "id": 103,
      "topic": "৩. ত্রিকোণমিতিক, সূচকীয় ও লগারিদমিক লিমিট",
      "question_text": "৪৫. $\\lim_{a \\to 0} \\frac{2}{\\sqrt{2 + \\sqrt{2 + 2\\cos 4a}}}$ এর মান কত? [SUST'24-25]",
      "options": [
        "$-1$",
        "$1$",
        "$0$",
        "$\\infty$"
      ],
      "correct_answer": "$1$",
      "explanation": "$$\\lim_{a \\to 0} \\frac{2}{\\sqrt{2 + \\sqrt{2(1 + \\cos 4a)}}} = \\lim_{a \\to 0} \\frac{2}{\\sqrt{2 + \\sqrt{2 \\cdot 2\\cos^{2} 2a}}}$$\n$$= \\lim_{a \\to 0} \\frac{2}{\\sqrt{2 + 2\\cos 2a}} = \\lim_{a \\to 0} \\frac{2}{\\sqrt{2(1 + \\cos 2a)}}$$\n$$= \\lim_{a \\to 0} \\frac{2}{\\sqrt{4\\cos^{2} a}} = \\lim_{a \\to 0} \\frac{2}{2\\cos a} = 1$$",
      "time_limit": 60
    },
    {
      "id": 104,
      "topic": "৩. ত্রিকোণমিতিক, সূচকীয় ও লগারিদমিক লিমিট",
      "question_text": "৪৬. $\\lim_{x \\to 0} \\frac{\\cos 7x - \\cos 9x}{\\cos 3x - \\cos 5x} = \\text{কত}?$ [RU'20-21]",
      "options": [
        "$1$",
        "$\\frac{1}{2}$",
        "$2$",
        "$0$"
      ],
      "correct_answer": "$2$",
      "explanation": "$$\\lim_{x \\to 0} \\frac{2 \\sin 8x \\sin x}{2 \\sin 4x \\sin x} = \\lim_{x \\to 0} \\frac{\\sin 8x}{8x} \\cdot \\frac{4x}{\\sin 4x} \\cdot \\frac{8}{4} = 2$$",
      "time_limit": 60
    },
    {
      "id": 105,
      "topic": "৩. ত্রিকোণমিতিক, সূচকীয় ও লগারিদমিক লিমিট",
      "question_text": "৪৭. $\\lim_{x \\to 0} \\frac{\\sin 9x - \\sin 7x}{\\sin 7x - \\sin 5x} = ?$ [JU'19-20]",
      "options": [
        "$1$",
        "$-1$",
        "$2$",
        "$-2$"
      ],
      "correct_answer": "$1$",
      "explanation": "$$\\lim_{x \\to 0} \\frac{\\sin 9x - \\sin 7x}{\\sin 7x - \\sin 5x} = \\lim_{x \\to 0} \\frac{2 \\cos 8x \\sin x}{2 \\cos 6x \\sin x}$$\n$$= \\lim_{x \\to 0} \\frac{\\cos 8x}{\\cos 6x} = 1$$",
      "time_limit": 60
    },
    {
      "id": 106,
      "topic": "৩. ত্রিকোণমিতিক, সূচকীয় ও লগারিদমিক লিমিট",
      "question_text": "৪৮. $\\lim_{x \\to 1} \\left(\\frac{1}{x-1} - \\frac{1}{\\ln x}\\right) = ?$ [RUET'25-26]",
      "options": [
        "$1$",
        "$\\frac{1}{2}$",
        "$-\\frac{1}{2}$",
        "$-1$",
        "$0$"
      ],
      "correct_answer": "$-\\frac{1}{2}$",
      "explanation": "$$\\lim_{x \\to 1} \\left(\\frac{1}{x-1} - \\frac{1}{\\ln x}\\right) = \\lim_{x \\to 1} \\left(\\frac{\\ln x - x + 1}{(x-1)\\ln x}\\right) \\quad \\left[\\frac{0}{0}\\right]$$\n$$= \\lim_{x \\to 1} \\frac{\\frac{1}{x} - 1}{\\frac{x-1}{x} + \\ln x} \\quad [\\text{using L'Hôpital}]$$\n$$= \\lim_{x \\to 1} \\frac{\\frac{1-x}{x}}{\\frac{x-1+x\\ln x}{x}} \\quad \\left[\\frac{0}{0}\\right]$$\n$$= \\lim_{x \\to 1} \\frac{1-x}{x-1+x\\ln x}$$\n$$= \\lim_{x \\to 1} \\frac{-1}{1 - 0 + \\ln x + 1} \\quad [\\text{using L'Hôpital}]$$\n$$= \\lim_{x \\to 1} \\frac{-1}{\\ln x + 2} = \\frac{-1}{0+2} = -\\frac{1}{2}$$",
      "time_limit": 60
    },
    {
      "id": 107,
      "topic": "৩. ত্রিকোণমিতিক, সূচকীয় ও লগারিদমিক লিমিট",
      "question_text": "৪৯. $\\lim_{x \\to 0} \\frac{3^{2x} - 2^{3x}}{x}$ এর মান- [IUT'22-23]",
      "options": [
        "$\\log\\left(\\frac{9}{8}\\right)$",
        "$\\log\\left(\\frac{8}{9}\\right)$",
        "$\\log\\left(\\frac{3}{2}\\right)$",
        "$\\log\\left(\\frac{2}{3}\\right)$"
      ],
      "correct_answer": "$\\log\\left(\\frac{9}{8}\\right)$",
      "explanation": "$$\\lim_{x \\to 0} \\frac{3^{2x} - 2^{3x}}{x}$$\n$$= \\lim_{x \\to 0} (3^{2x}(\\ln 3) 2 - 2^{3x}(\\ln 2) 3)$$\n$$= 2\\ln 3 - 3\\ln 2 = \\ln 9 - \\ln 8 = \\ln \\frac{9}{8} = \\log \\frac{9}{8}$$\n[লিমিটের ক্ষেত্রে $\\log$ দ্বারা $\\log_{e}$ বা, $\\ln$ বোঝানো হয়]",
      "time_limit": 60
    },
    {
      "id": 108,
      "topic": "৩. ত্রিকোণমিতিক, সূচকীয় ও লগারিদমিক লিমিট",
      "question_text": "৫০. $\\lim_{x \\to 2} \\frac{x^{2} - 2^{x}}{x^{x} - 4}$ এর মান কত হবে? [CKRUET'22-23]",
      "options": [
        "$\\frac{1 + \\ln 2}{1 - \\ln 2}$",
        "$\\frac{1 - \\ln 2}{1 + \\ln 2}$",
        "$\\frac{2 - \\ln 2}{2 + \\ln 2}$",
        "$\\frac{2 + \\ln 2}{2 - \\ln 2}$",
        "$\\frac{\\ln 2 - 1}{\\ln 2 + 1}$"
      ],
      "correct_answer": "$\\frac{1 - \\ln 2}{1 + \\ln 2}$",
      "explanation": "$$\\lim_{x \\to 2} \\frac{x^{2} - 2^{x}}{x^{x} - 4}$$\n$$= \\lim_{x \\to 2} \\frac{2x - 2^{x} \\ln 2}{x^{x}(1 + \\ln x) - 0}$$\n$$= \\frac{2 \\cdot 2 - 2^{2} \\ln 2}{2^{2} (1 + \\ln 2)} = \\frac{4(1 - \\ln 2)}{4(1 + \\ln 2)} = \\frac{1 - \\ln 2}{1 + \\ln 2} \\quad [\\text{L'Hôpital's rule}]$$",
      "time_limit": 60
    },
    {
      "id": 109,
      "topic": "৩. ত্রিকোণমিতিক, সূচকীয় ও লগারিদমিক লিমিট",
      "question_text": "৫১. $\\lim_{x \\to 0} \\frac{e^{x} - 2e^{3x} + e^{5x}}{x^{2}}$ এর মান কত? [CKRUET'21-22]",
      "options": [
        "$4$",
        "$2$",
        "$0$",
        "$1$",
        "$-4$"
      ],
      "correct_answer": "$4$",
      "explanation": "$$\\lim_{x \\to 0} \\frac{e^{x} - 2e^{3x} + e^{5x}}{x^{2}}$$\n$$= \\lim_{x \\to 0} \\frac{e^{x} - 6e^{3x} + 5e^{5x}}{2x} \\quad \\text{[L' Hôpital's Rule]}$$\n$$= \\lim_{x \\to 0} \\frac{e^{x} - 18e^{3x} + 25e^{5x}}{2} = \\frac{1 - 18 + 25}{2} = 4$$",
      "time_limit": 60
    },
    {
      "id": 110,
      "topic": "৩. ত্রিকোণমিতিক, সূচকীয় ও লগারিদমিক লিমিট",
      "question_text": "৫২. যদি $y = 1 - x + \\frac{x^{2}}{2!} - \\frac{x^{3}}{3!} + \\dots \\infty$ এবং $z = -y - \\frac{y^{2}}{2} - \\frac{y^{3}}{3} - \\dots \\infty$ হয়; তাহলে $x$ এর মান কত? [KUET'16-17]",
      "options": [
        "$(1 + e^{z})$",
        "$(1 + e^{-z})$",
        "$\\ln(1 + 3z)$",
        "$\\ln\\left(\\frac{1}{1+z}\\right)$",
        "$\\ln\\left(\\frac{1}{1-e^{z}}\\right)$"
      ],
      "correct_answer": "$\\ln\\left(\\frac{1}{1-e^{z}}\\right)$",
      "explanation": "$$y = e^{-x}$$\n$$z = \\ln(1-y) \\Rightarrow e^{z} = 1-y \\Rightarrow y = 1-e^{z}$$\n$$\\therefore x = -\\ln y = -\\ln(1-e^{z}) = \\ln\\left(\\frac{1}{1-e^{z}}\\right)$$",
      "time_limit": 60
    },
    {
      "id": 111,
      "topic": "৩. ত্রিকোণমিতিক, সূচকীয় ও লগারিদমিক লিমিট",
      "question_text": "৫৩. Evaluate $\\lim_{x \\to 0} \\frac{e^{x} - 1}{e^{2x} - 1}$ এর মান কত? [IUT'16-17]",
      "options": [
        "$\\frac{1}{4}$",
        "$0$",
        "$\\frac{1}{2}$",
        "$1$"
      ],
      "correct_answer": "$\\frac{1}{2}$",
      "explanation": "$$\\left(\\frac{0}{0} \\text{ form}\\right) \\lim_{x \\to 0} \\frac{e^{x}}{2e^{2x}} = \\frac{1}{2}$$",
      "time_limit": 60
    },
    {
      "id": 112,
      "topic": "৩. ত্রিকোণমিতিক, সূচকীয় ও লগারিদমিক লিমিট",
      "question_text": "৫৪. $\\lim_{x \\to 1} \\left(\\frac{1}{x-1} - \\frac{1}{\\log x}\\right)$ এর মান কত? [KUET'11-12]",
      "options": [
        "$\\frac{1}{3}$",
        "$-\\frac{1}{3}$",
        "$3$",
        "$-\\frac{1}{2}$",
        "$\\frac{1}{2}$"
      ],
      "correct_answer": "$-\\frac{1}{2}$",
      "explanation": "$$\\lim_{x \\to 1} \\left(\\frac{1}{x-1} - \\frac{1}{\\log x}\\right)$$\n$$= \\lim_{x \\to 1} \\frac{\\log x - x + 1}{(x-1)\\log x}$$\n$$= \\lim_{x \\to 1} \\frac{\\frac{1}{x} - 1}{\\log x + 1 - \\frac{1}{x}} \\quad \\text{[L' Hôpital's Rule]}$$\n$$= \\lim_{x \\to 1} \\frac{-\\frac{1}{x^{2}}}{\\frac{1}{x} + \\frac{1}{x^{2}}} = \\frac{-1}{1+1} = -\\frac{1}{2}$$",
      "time_limit": 60
    },
    {
      "id": 113,
      "topic": "৩. ত্রিকোণমিতিক, সূচকীয় ও লগারিদমিক লিমিট",
      "question_text": "৫৫. মান নির্ণয় কর: $\\lim_{x \\to 0} \\frac{a^{x}-1}{x}$ [IUT'11-12]",
      "options": [
        "$0$",
        "$e^{a}$",
        "$\\ln(a)$",
        "$a$"
      ],
      "correct_answer": "$\\ln(a)$",
      "explanation": "$$\\lim_{x \\to 0} \\frac{a^{x} - 1}{x} = \\lim_{x \\to 0} \\frac{a^{x}\\ln a}{1} = \\ln(a)$$",
      "time_limit": 60
    },
    {
      "id": 114,
      "topic": "৩. ত্রিকোণমিতিক, সূচকীয় ও লগারিদমিক লিমিট",
      "question_text": "৫৬. $\\lim_{x \\to 0} \\frac{\\cos(\\sin x) - \\cos x}{x^{4}} = ?$ [BUET'24-25]",
      "options": [
        "$0$",
        "$1$",
        "$\\infty$",
        "$-1$"
      ],
      "correct_answer": "সঠিক উত্তর নেই",
      "explanation": "$$\\lim_{x \\to 0} \\frac{\\cos(\\sin x) - \\cos x}{x^{4}}$$\n$$= \\lim_{x \\to 0} \\frac{2 \\sin\\left(\\frac{x + \\sin x}{2}\\right) \\sin\\left(\\frac{x - \\sin x}{2}\\right)}{x^{4}}$$\n$$= \\lim_{x \\to 0} 2 \\times 1 \\times \\left(\\frac{x + \\sin x}{2}\\right) \\times 1 \\times \\left(\\frac{x - \\sin x}{2}\\right) \\times \\frac{1}{x^{4}}$$\n$$= \\lim_{x \\to 0} 2 \\times \\frac{x^{2} - \\sin^{2} x}{4x^{4}}$$\n$$= \\lim_{x \\to 0} \\frac{x^{2} - \\sin^{2} x}{2x^{4}} \\quad \\left[\\frac{0}{0}\\right]$$\n$$= \\lim_{x \\to 0} \\frac{2x - \\sin 2x}{8x^{3}} \\quad \\left[\\frac{0}{0}\\right]$$\n$$= \\lim_{x \\to 0} \\frac{2 - 2\\cos 2x}{24x^{2}} \\quad \\left[\\frac{0}{0}\\right]$$\n$$= \\lim_{x \\to 0} \\frac{4\\sin 2x}{48x} \\quad \\left[\\frac{0}{0}\\right]$$\n$$= \\lim_{x \\to 0} \\frac{8\\cos 2x}{48} = \\frac{8 \\times 1}{48} = \\frac{1}{6}$$\nসুতরাং সঠিক উত্তর নেই।",
      "time_limit": 60
    },
    {
      "id": 115,
      "topic": "৩. ত্রিকোণমিতিক, সূচকীয় ও লগারিদমিক লিমিট",
      "question_text": "৫৭. $\\lim_{x \\to \\pi} \\left(\\frac{1 + \\cos x}{\\sin x}\\right)$ এর মান হল- [CUET'14-15]",
      "options": [
        "$0$",
        "$1$",
        "$-1$",
        "None of them"
      ],
      "correct_answer": "$0$",
      "explanation": "$$\\lim_{x \\to \\pi} \\frac{1 + \\cos x}{\\sin x} = \\lim_{x \\to \\pi} \\frac{2\\cos^{2} \\frac{x}{2}}{2\\sin \\frac{x}{2} \\cos \\frac{x}{2}}$$\n$$= \\lim_{x \\to \\pi} \\cot \\frac{x}{2} = \\cot \\frac{\\pi}{2} = 0$$",
      "time_limit": 60
    },
    {
      "id": 116,
      "topic": "৩. ত্রিকোণমিতিক, সূচকীয় ও লগারিদমিক লিমিট",
      "question_text": "৫৮. $\\lim_{x \\to 2} \\frac{\\cos \\frac{\\pi}{x}}{x - 2}$ এর মান- [IUT'14-15]",
      "options": [
        "$\\frac{\\pi}{4}$",
        "$\\frac{\\pi}{2}$",
        "$\\frac{\\pi}{8}$",
        "$2$"
      ],
      "correct_answer": "$\\frac{\\pi}{4}$",
      "explanation": "$$\\lim_{x \\to 2} \\frac{\\cos \\frac{\\pi}{x}}{x-2} \\quad \\left[\\frac{0}{0} \\text{ form}\\right]$$\n$$= \\lim_{x \\to 2} \\frac{-\\sin\\left(\\frac{\\pi}{x}\\right) \\left(-\\frac{\\pi}{x^{2}}\\right)}{1} = \\frac{\\pi}{4}$$",
      "time_limit": 60
    },
    {
      "id": 117,
      "topic": "৩. ত্রিকোণমিতিক, সূচকীয় ও লগারিদমিক লিমিট",
      "question_text": "৫৯. $\\lim_{x \\to \\frac{\\pi}{2}} \\frac{1 - \\sin x}{\\cos x} = ?$ [BUET'11-12; IUT'23-24]",
      "options": [
        "$1$",
        "$\\frac{1}{2}$",
        "$2$",
        "$0$"
      ],
      "correct_answer": "$0$",
      "explanation": "$$\\lim_{x \\to \\frac{\\pi}{2}} \\frac{1 - \\sin x}{\\cos x} \\quad \\left[\\frac{0}{0} \\text{ form}\\right] = \\lim_{x \\to \\frac{\\pi}{2}} \\frac{-\\cos x}{-\\sin x} = 0$$",
      "time_limit": 60
    },
    {
      "id": 118,
      "topic": "৩. ত্রিকোণমিতিক, সূচকীয় ও লগারিদমিক লিমিট",
      "question_text": "৬০. $\\lim_{a \\to 0} \\frac{2}{\\sqrt{2 + \\sqrt{2 + 2\\cos 4a}}}$ এর মান কত? [SUST'24-25]",
      "options": [
        "$-1$",
        "$1$",
        "$0$",
        "$\\infty$"
      ],
      "correct_answer": "$1$",
      "explanation": "$$\\lim_{a \\to 0} \\frac{2}{\\sqrt{2 + \\sqrt{2(1 + \\cos 4a)}}}$$\n$$= \\lim_{a \\to 0} \\frac{2}{\\sqrt{2 + \\sqrt{2 \\cdot 2\\cos^{2} 2a}}}$$\n$$= \\lim_{a \\to 0} \\frac{2}{\\sqrt{2 + 2\\cos 2a}} = \\lim_{a \\to 0} \\frac{2}{\\sqrt{2(1 + \\cos 2a)}}$$\n$$= \\lim_{a \\to 0} \\frac{2}{\\sqrt{4\\cos^{2} a}} = \\lim_{a \\to 0} \\frac{2}{2\\cos a} = 1$$",
      "time_limit": 60
    },
    {
      "id": 119,
      "topic": "৩. ত্রিকোণমিতিক, সূচকীয় ও লগারিদমিক লিমিট",
      "question_text": "৬১. $\\lim_{x \\to 0} \\frac{\\cos 5x - \\cos x}{x^{2}}$ এর মান কত? [RUET'24-25]",
      "options": [
        "$12$",
        "$6$",
        "$-6$",
        "$24$",
        "$-12$"
      ],
      "correct_answer": "$-12$",
      "explanation": "$$\\lim_{x \\to 0} \\frac{\\cos 5x - \\cos x}{x^{2}} \\quad \\left[\\frac{0}{0}\\right]$$\n$$= \\lim_{x \\to 0} \\frac{-5\\sin 5x + \\sin x}{2x} \\quad \\left[\\frac{0}{0}\\right]$$\n$$= \\lim_{x \\to 0} \\frac{-25\\cos 5x + \\cos x}{2} = \\frac{-25 + 1}{2} = -12$$",
      "time_limit": 60
    },
    {
      "id": 120,
      "topic": "৩. ত্রিকোণমিতিক, সূচকীয় ও লগারিদমিক লিমিট",
      "question_text": "৬২. $\\lim_{x \\to 0} \\frac{e^{x} - e^{-x} - 2x}{x - \\sin x} = ?$ [IUT'23-24]",
      "options": [
        "$\\frac{1}{2}$",
        "$2$",
        "$1$",
        "None"
      ],
      "correct_answer": "$2$",
      "explanation": "$$\\lim_{x \\to 0} \\frac{e^{x} - e^{-x} - 2x}{x - \\sin x} \\quad \\left[\\frac{0}{0}\\right]$$\n$$= \\lim_{x \\to 0} \\frac{e^{x} + e^{-x} - 2}{1 - \\cos x} \\quad \\text{[L' Hôpital's rule]}$$\n$$= \\lim_{x \\to 0} \\frac{e^{x} - e^{-x}}{\\sin x} = \\lim_{x \\to 0} \\frac{e^{x} + e^{-x}}{\\cos x} = \\frac{1+1}{1} = 2$$",
      "time_limit": 60
    },
    {
      "id": 121,
      "topic": "৩. ত্রিকোণমিতিক, সূচকীয় ও লগারিদমিক লিমিট",
      "question_text": "৬৩. $\\lim_{x \\to 1} \\frac{x - 1}{\\sqrt{x} - 1} = ?$ [BUET'21-22]",
      "options": [
        "$1$",
        "$0$",
        "$2$",
        "$\\alpha$"
      ],
      "correct_answer": "$2$",
      "explanation": "$$\\lim_{x \\to 1} \\frac{x - 1}{\\sqrt{x} - 1} = \\lim_{x \\to 1} \\frac{1}{\\frac{1}{2\\sqrt{x}}} = \\lim_{x \\to 1} 2\\sqrt{x} = 2\\sqrt{1} = 2 \\quad \\text{[L' Hôpital প্রয়োগ করে]}$$",
      "time_limit": 60
    },
    {
      "id": 122,
      "topic": "৩. ত্রিকোণমিতিক, সূচকীয় ও লগারিদমিক লিমিট",
      "question_text": "৬৪. $\\lim_{x \\to \\frac{\\pi}{2}} (\\sin x)^{\\tan x}$ এর মান কোনটি? [CKRUET'20-21; KUET'16-17]",
      "options": [
        "$\\frac{\\pi}{2}$",
        "$0$",
        "$1$",
        "$-1$",
        "$\\frac{1}{2}$"
      ],
      "correct_answer": "$1$",
      "explanation": "$$L = \\lim_{x \\to \\frac{\\pi}{2}} (\\sin x)^{\\tan x} \\quad [1^{\\infty}, \\text{ তাই এখানে L' Hôpital ব্যবহার করা যাবে না}]$$\n$$\\Rightarrow \\log L = \\lim_{x \\to \\frac{\\pi}{2}} \\tan x \\log(\\sin x)$$\n$$[\\text{সাধারণত অন্তর্ভীকরণ ও যোগজীকরণে log দ্বারা } \\log_{e} \\text{ বা } \\ln \\text{ বোঝানো হয়}]$$\n$$\\Rightarrow L = e^{\\lim_{x \\to \\frac{\\pi}{2}} \\tan x \\log(\\sin x)} = \\lim_{x \\to \\frac{\\pi}{2}} \\frac{\\log(\\sin x)}{\\cot x}$$\n$$\\left[\\lim_{x \\to \\frac{\\pi}{2}} \\frac{\\log(\\sin x)}{\\cot x} \\text{ is a } \\frac{0}{0} \\text{ form}\\right]$$\nএখন, L' Hôpital's Rule প্রয়োগ করে পাই,\n$$L = e^{\\lim_{x \\to \\frac{\\pi}{2}} \\frac{\\cot x}{-\\text{cosec}^{2} x}} = e^{0} = 1$$",
      "time_limit": 60
    },
    {
      "id": 123,
      "topic": "৩. ত্রিকোণমিতিক, সূচকীয় ও লগারিদমিক লিমিট",
      "question_text": "৬৫. $[f(x) = \\sin x$ হলে, $\\lim_{x \\to 0} \\frac{f(x^{2})}{x}$ এর মান কত?] [BUTEX'13-14; IUT'18-19]",
      "options": [
        "$-1$",
        "$0$",
        "$1$",
        "Undefined"
      ],
      "correct_answer": "$0$",
      "explanation": "$$\\lim_{x \\to 0} \\frac{f(x^{2})}{x} = \\lim_{x \\to 0} \\frac{\\sin(x^{2})}{x} \\quad \\left[\\frac{0}{0} \\text{ form}\\right]$$\n$$= \\lim_{x \\to 0} \\frac{\\cos(x^{2}) \\cdot 2x}{1} \\quad \\text{[L' Hôpital's Rule]}$$\n$$= 2 \\times 0 \\times \\cos 0^{\\circ} = 0$$",
      "time_limit": 60
    },
    {
      "id": 124,
      "topic": "৩. ত্রিকোণমিতিক, সূচকীয় ও লগারিদমিক লিমিট",
      "question_text": "৬৬. $\\lim_{x \\to 0} \\frac{\\sin x - \\ln(e^{x} \\cos x)}{x \\sin x}$ এর মান কোনটি? [KUET'17-18, 15-16]",
      "options": [
        "$\\frac{1}{2}$",
        "$3$",
        "$\\frac{1}{3}$",
        "$2$",
        "$\\frac{3}{2}$"
      ],
      "correct_answer": "$\\frac{1}{2}$",
      "explanation": "$$\\lim_{x \\to 0} \\frac{\\sin x - \\ln(e^{x} \\cos x)}{x \\sin x} = \\lim_{x \\to 0} \\frac{\\sin x - \\ln e^{x} - \\ln \\cos x}{x \\sin x}$$\n$$= \\lim_{x \\to 0} \\frac{\\sin x - x - \\ln \\cos x}{x \\sin x} \\quad \\left[\\frac{0}{0}\\right]$$\n$$= \\lim_{x \\to 0} \\frac{\\cos x - 1 + \\frac{\\sin x}{\\cos x}}{\\sin x + x\\cos x} \\quad \\left[\\frac{0}{0}\\right]$$\n$$= \\lim_{x \\to 0} \\frac{-\\sin x - 0 + \\sec^{2} x}{\\cos x + \\cos x - x\\sin x} = \\frac{-0 + 1}{1 + 1} = \\frac{1}{2}$$",
      "time_limit": 60
    },
    {
      "id": 125,
      "topic": "৩. ত্রিকোণমিতিক, সূচকীয় ও লগারিদমিক লিমিট",
      "question_text": "৬৭. $\\lim_{x \\to 0} \\frac{x}{\\sqrt{1 - \\cos x}} = ?$ [IUT'17-18]",
      "options": [
        "$2$",
        "$\\frac{1}{2}$",
        "$\\sqrt{2}$",
        "$\\frac{1}{\\sqrt{2}}$"
      ],
      "correct_answer": "$\\sqrt{2}$",
      "explanation": "$$\\lim_{x \\to 0} \\frac{x}{\\sqrt{1 - \\cos x}} \\quad \\left[\\frac{0}{0} \\text{ form}\\right] = \\lim_{x \\to 0} \\frac{1}{\\frac{\\sin x}{2\\sqrt{1-\\cos x}}} = \\sqrt{2}$$",
      "time_limit": 60
    },
    {
      "id": 126,
      "topic": "৩. ত্রিকোণমিতিক, সূচকীয় ও লগারিদমিক লিমিট",
      "question_text": "৬৮. $\\lim_{x \\to 0} \\frac{\\sin 5x - \\sin 3x}{\\sin 3x - \\sin 2x}$ এর মান- [BUTEX'16-17, 07-08; CUET'11-12]",
      "options": [
        "$3$",
        "$0$",
        "$2$",
        "$1$"
      ],
      "correct_answer": "$2$",
      "explanation": "$$\\lim_{x \\to 0} \\frac{\\sin 5x - \\sin 3x}{\\sin 3x - \\sin 2x} \\quad \\left[\\frac{0}{0}\\right]$$\n$$= \\lim_{x \\to 0} \\frac{5\\cos 5x - 3\\cos 3x}{3\\cos 3x - 2\\cos 2x} \\quad \\text{[Using L' Hôpital's Rule]}$$\n$$= \\frac{5-3}{3-2} = 2$$\nShortcut: $\\lim_{x \\to 0} \\frac{\\sin ax - \\sin bx}{\\sin cx - \\sin dx} = \\frac{a-b}{c-d}$",
      "time_limit": 60
    },
    {
      "id": 127,
      "topic": "৩. ত্রিকোণমিতিক, সূচকীয় ও লগারিদমিক লিমিট",
      "question_text": "৬৯. মান নির্ণয় কর: $\\lim_{x \\to 0} \\frac{1 - \\cos 7x}{3x^{2}}$ [BUTEX'15-16, 07-08; CUET'15-16]",
      "options": [
        "$\\frac{2}{3}$",
        "$\\frac{7}{3}$",
        "$\\frac{49}{6}$",
        "$\\frac{49}{9}$"
      ],
      "correct_answer": "$\\frac{49}{6}$",
      "explanation": "$$\\lim_{x \\to 0} \\frac{1 - \\cos 7x}{3x^{2}} \\quad \\left[\\frac{0}{0}\\right]$$\n$$= \\lim_{x \\to 0} \\frac{7\\sin 7x}{6x} \\quad \\left[\\frac{0}{0}\\right] = \\lim_{x \\to 0} \\frac{49\\cos 7x}{6} = \\frac{49}{6}$$",
      "time_limit": 60
    },
    {
      "id": 128,
      "topic": "৩. ত্রিকোণমিতিক, সূচকীয় ও লগারিদমিক লিমিট",
      "question_text": "৭০. $\\lim_{x \\to 0} \\frac{x - \\sin x}{x^{3}}$ এর মান কোনটি? [RUET'14-15]",
      "options": [
        "$1$",
        "$0$",
        "$\\frac{1}{3}$",
        "$\\frac{1}{2}$",
        "$\\frac{1}{6}$"
      ],
      "correct_answer": "$\\frac{1}{6}$",
      "explanation": "$$\\lim_{x \\to 0} \\frac{x - \\sin x}{x^{3}} \\quad \\left[\\frac{0}{0}\\right]$$\n$$\\Rightarrow \\lim_{x \\to 0} \\frac{1 - \\cos x}{3x^{2}} \\quad \\left[\\frac{0}{0}\\right]$$\n$$\\Rightarrow \\lim_{x \\to 0} \\frac{\\sin x}{6x} = \\lim_{x \\to 0} \\frac{\\sin x}{x} \\times \\frac{1}{6} = 1 \\times \\frac{1}{6} = \\frac{1}{6}$$",
      "time_limit": 60
    },
    {
      "id": 129,
      "topic": "৩. ত্রিকোণমিতিক, সূচকীয় ও লগারিদমিক লিমিট",
      "question_text": "৭১. $\\lim_{x \\to 0} \\frac{x(\\cos 2x + \\cos 3x)}{2\\sin x}$ এর মান- [RUET'13-14]",
      "options": [
        "$0$",
        "$1$",
        "$2$",
        "$3$",
        "None"
      ],
      "correct_answer": "$1$",
      "explanation": "$$\\lim_{x \\to 0} \\left(\\left(\\frac{x}{\\sin x}\\right) \\times \\frac{\\cos 2x + \\cos 3x}{2}\\right)$$\n$$= 1 \\times \\frac{1+1}{2} = 1$$",
      "time_limit": 60
    },
    {
      "id": 130,
      "topic": "৩. ত্রিকোণমিতিক, সূচকীয় ও লগারিদমিক লিমিট",
      "question_text": "৭২. $\\lim_{x \\to 0} \\frac{3^{x} - 3^{-x} - 2x \\log_{e} 3}{x - \\sin x}$ এর মান হলো- [KUET'12-13]",
      "options": [
        "$2(\\log_{e} 3)^{3}$",
        "$2(\\log_{e} 3)^{2}$",
        "$2(\\log_{e} e)^{3}$",
        "$2(\\log_{e} e)^{2}$",
        "$6 \\log_{e} 3$"
      ],
      "correct_answer": "$2(\\log_{e} 3)^{3}$",
      "explanation": "$$\\lim_{x \\to 0} \\frac{3^{x} - 3^{-x} - 2x\\ln 3}{x - \\sin x} \\quad \\left[\\frac{0}{0}\\right]$$\n$$= \\lim_{x \\to 0} \\frac{3^{x}\\ln 3 + 3^{-x}\\ln 3 - 2\\ln 3}{1 - \\cos x} \\quad \\left[\\frac{0}{0}\\right]$$\n$$= \\lim_{x \\to 0} \\frac{3^{x}(\\ln 3)^{2} - 3^{-x}(\\ln 3)^{2}}{\\sin x} \\quad \\left[\\frac{0}{0}\\right]$$\n$$= \\lim_{x \\to 0} \\frac{3^{x}(\\ln 3)^{3} + 3^{-x}(\\ln 3)^{3}}{\\cos x} = \\frac{(\\ln 3)^{3} + (\\ln 3)^{3}}{1}$$\n$$= 2(\\ln 3)^{3} = 2(\\log_{e} 3)^{3}$$",
      "time_limit": 60
    },
    {
      "id": 131,
      "topic": "৩. ত্রিকোণমিতিক, সূচকীয় ও লগারিদমিক লিমিট",
      "question_text": "৭৩. $\\lim_{x \\to 0} \\frac{2 - \\sqrt{x+4}}{\\sin 2x} = ?$ [RUET'11-12]",
      "options": [
        "$-\\frac{1}{8}$",
        "$-\\frac{1}{4}$",
        "$-\\frac{1}{2}$",
        "$\\frac{1}{8}$",
        "None"
      ],
      "correct_answer": "$-\\frac{1}{8}$",
      "explanation": "$$\\lim_{x \\to 0} \\frac{2 - \\sqrt{x+4}}{\\sin 2x} \\quad \\left[\\frac{0}{0}\\right]$$\n$$= \\lim_{x \\to 0} \\frac{-\\frac{1}{2\\sqrt{x+4}}}{2\\cos 2x} \\quad \\text{[L' Hôpital's Rule]}$$\n$$= \\frac{-\\frac{1}{2\\sqrt{4}}}{2\\cos 0} = \\frac{-\\frac{1}{4}}{2} = -\\frac{1}{8}$$",
      "time_limit": 60
    },
    {
      "id": 132,
      "topic": "৩. ত্রিকোণমিতিক, সূচকীয় ও লগারিদমিক লিমিট",
      "question_text": "৭৪. নির্ণয় কর: $\\lim_{x \\to 1} (\\log_{5} 5x^{2})^{\\frac{\\log_{x} 5}{2}}$ [IUT'24-25]",
      "options": [
        "$e$",
        "$e^{2}$",
        "$e^{5}$",
        "None"
      ],
      "correct_answer": "$e$",
      "explanation": "$$\\lim_{x \\to 1} (\\log_{5} 5x^{2})^{\\frac{\\log_{x} 5}{2}}$$\n$$= \\lim_{x \\to 1} (\\log_{5} 5 + \\log_{5} x^{2})^{\\frac{\\log_{x} 5}{2}}$$\nlet, $\\log_{5} x^{2} = z \\Rightarrow 2\\log_{5} x = z$\n$\\Rightarrow \\frac{1}{z} = \\frac{1}{2\\log_{5} x} = \\frac{\\log_{x} 5}{2}$\n$\\therefore \\lim_{x \\to 1} (\\log_{5} 5x^{2})^{\\frac{\\log_{x} 5}{2}} = \\lim_{z \\to 0} (1 + z)^{\\frac{1}{z}} = e$",
      "time_limit": 60
    },
    {
      "id": 133,
      "topic": "৩. ত্রিকোণমিতিক, সূচকীয় ও লগারিদমিক লিমিট",
      "question_text": "৭৫. $\\lim_{x \\to 0} (1 + 5x)^{\\frac{1 + 5x}{10x}}$ এর মান নির্ণয় কর। [BUET'23-24; IUT'19-20]",
      "options": [
        "$e$",
        "$\\sqrt[5]{e}$",
        "$\\infty$",
        "$\\sqrt{e}$"
      ],
      "correct_answer": "$\\sqrt{e}$",
      "explanation": "$$\\lim_{x \\to 0} (1 + 5x)^{\\frac{1+5x}{10x}} = \\lim_{x \\to 0} (1 + 5x)^{\\frac{1}{10x} + \\frac{1}{2}}$$\n$$= e^{5 \\times \\frac{1}{10}} \\cdot \\lim_{x \\to 0} (1 + ax)^{c} = e^{ab} = e^{\\frac{1}{2}} = \\sqrt{e}$$",
      "time_limit": 60
    },
    {
      "id": 134,
      "topic": "৩. ত্রিকোণমিতিক, সূচকীয় ও লগারিদমিক লিমিট",
      "question_text": "৭৬. $\\lim_{x \\to 0} (1 + 5x)^{\\frac{3x+2}{x}}$ এর মান কোনটি? [BUET'21-22, 18-19; KUET'18-19]",
      "options": [
        "$e$",
        "$e^{5}$",
        "$e^{7}$",
        "$e^{10}$",
        "$e^{3}$"
      ],
      "correct_answer": "$e^{10}$",
      "explanation": "$$\\lim_{x \\to 0} (1 + 5x)^{\\frac{3x+2}{x}}$$\n$$= 1 \\times \\lim_{x \\to 0} \\left[(1 + 5x)^{\\frac{1}{5x}}\\right]^{10} = e^{10}$$",
      "time_limit": 60
    },
    {
      "id": 135,
      "topic": "৩. ত্রিকোণমিতিক, সূচকীয় ও লগারিদমিক লিমিট",
      "question_text": "৭৭. $\\lim_{x \\to \\infty} \\left(\\frac{x}{1+x}\\right)^{x} = ?$ [RUET'10-11]",
      "options": [
        "$-\\infty$",
        "$-1$",
        "$e^{-1}$",
        "$e$",
        "$1$"
      ],
      "correct_answer": "$e^{-1}$",
      "explanation": "$$\\lim_{x \\to \\infty} \\left(\\frac{x}{1+x}\\right)^{x} = \\lim_{x \\to \\infty} \\left(\\frac{1}{\\frac{1+x}{x}}\\right)^{x}$$\n$$= \\lim_{x \\to \\infty} \\left(\\frac{1}{1+\\frac{1}{x}}\\right)^{x} = \\lim_{x \\to \\infty} \\left\\{\\left(1+\\frac{1}{x}\\right)^{x}\\right\\}^{-1} = e^{-1}$$",
      "time_limit": 60
    },
    {
      "id": 136,
      "topic": "৩. ত্রিকোণমিতিক, সূচকীয় ও লগারিদমিক লিমিট",
      "question_text": "৭৮. $\\lim_{x \\to 0} (1 + kx)^{\\frac{1}{x}}$ এর মান- [BUTEX'12-13; RUET'12-13]",
      "options": [
        "$\\log_{k} x$",
        "$\\ln(kx)$",
        "$\\ln(k+x)$",
        "$a^{k}$",
        "$e^{k}$"
      ],
      "correct_answer": "$e^{k}$",
      "explanation": "$$\\lim_{x \\to 0} (1 + kx)^{\\frac{1}{x}} = \\lim_{x \\to 0} (1 + kx)^{\\frac{1}{kx} \\cdot k}$$\n$$= \\lim_{kx \\to 0} \\left\\{(1 + kx)^{\\frac{1}{kx}}\\right\\}^{k} = e^{k}$$",
      "time_limit": 60
    },
    {
      "id": 137,
      "topic": "৩. ত্রিকোণমিতিক, সূচকীয় ও লগারিদমিক লিমিট",
      "question_text": "৭৯. $x$ এর ক্রমবর্ধমান শক্তিতে $\\log_{e}(1 - 3x + 2x^{2})^{-1}$ এর বিস্তারে $x^{n}$ এর সহগ হলো- [KUET'12-13]",
      "options": [
        "$\\frac{1+2^{n}}{n}$",
        "$\\frac{3^{n}-11}{2}$",
        "$\\frac{4^{n}-5}{7}$",
        "$\\frac{n-5}{6}$",
        "$\frac{11n-9}{2}$"
      ],
      "correct_answer": "$\\frac{1+2^{n}}{n}$",
      "explanation": "$$\\ln(1 - 3x + 2x^{2})^{-1}$$\n$$= (-1) \\ln\\{1(1-2x) - x(1-2x)\\}$$\n$$= -\\ln\\{(1-2x)(1-x)\\}$$\n$$= -\\ln(1-2x) - \\ln(1-x)$$\n$$= -\\left\\{-2x - \\frac{(2x)^{2}}{2} - \\frac{(2x)^{3}}{3} - \\dots - \\frac{(2x)^{n}}{n} - \\dots\\right\\} - \\left\\{-x - \\frac{x^{2}}{2} - \\frac{x^{3}}{3} - \\dots - \\frac{x^{n}}{n} - \\dots\\right\\}$$\n$$= \\left\\{2x + \\frac{(2x)^{2}}{2} + \\frac{(2x)^{3}}{3} + \\dots + \\frac{(2x)^{n}}{n} + \\dots \\infty\\right\\} + \\left\\{x + \\frac{x^{2}}{2} + \\frac{x^{3}}{3} + \\dots + \\frac{x^{n}}{n} + \\dots \\infty\\right\\}$$\n$\\therefore x^{n}$ এর সহগ $= \\frac{2^{n}}{n} + \\frac{1^{n}}{n} = \\frac{1+2^{n}}{n}$",
      "time_limit": 60
    },
    {
      "id": 138,
      "topic": "৪. মূল নিয়মে অন্তরজ ও অন্তরীকরণের মৌলিক সূত্রাবলি",
      "question_text": "১. $\\frac{d}{dx}(3^{x}) = \\text{কত}?$ [য. বো. ২৩; অনুরূপ প্রশ্ন: য. বো. ২২; রা. বো. ২১, ১৯; ব. বো. ২১; সি. বো. ২১; চ. বো. ১৭]",
      "options": [
        "$x 3^{x-1}$",
        "$3^{x}$",
        "$3 \\ln x$",
        "$3^{x} \\ln 3$",
        "$\\frac{3^{x}}{\\ln 3}$"
      ],
      "correct_answer": "$3^{x} \\ln 3$",
      "explanation": "$\\frac{d}{dx}(a^{x}) = a^{x} \\ln a \\therefore \\frac{d}{dx}(3^{x}) = 3^{x} \\ln 3$",
      "time_limit": 60
    },
    {
      "id": 139,
      "topic": "৪. মূল নিয়মে অন্তরজ ও অন্তরীকরণের মৌলিক সূত্রাবলি",
      "question_text": "২. $\\frac{d}{dx}(\\log_{x} 2x) = \\text{কত}?$ [কু. বো. ২২; অনুরূপ প্রশ্ন: ঢা. বো. ২২, ২১]",
      "options": [
        "$\\frac{1}{x}$",
        "$\\frac{1}{x} \\log_{x} a$",
        "$-\\frac{1}{x} \\log_{x} e$",
        "$\\frac{1}{2x} \\log_{x} a$"
      ],
      "correct_answer": "$-\\frac{1}{x} \\log_{x} e$",
      "explanation": "$y = \\log_{x} 2x = \\frac{\\ln 2x}{\\ln x}$\n$$\\therefore \\frac{dy}{dx} = \\frac{1}{\\ln x} \\cdot \\frac{1}{2x} \\cdot 2 - \\frac{\\ln 2x}{(\\ln x)^{2}} \\cdot \\frac{1}{x} = -\\frac{1}{x \\ln x} = -\\frac{1}{x} \\log_{x} e$$",
      "time_limit": 60
    },
    {
      "id": 140,
      "topic": "৪. মূল নিয়মে অন্তরজ ও অন্তরীকরণের মৌলিক সূত্রাবলি",
      "question_text": "৩. $\\frac{d}{dx}(e^{\\ln x}) = \\text{কত}?$ [সি. বো. ২৫]",
      "options": [
        "$1$",
        "$e^{\\ln x}$",
        "$0$"
      ],
      "correct_answer": "$1$",
      "explanation": "$\\frac{d}{dx}(e^{\\ln x}) = \\frac{d}{dx}(x) = 1$",
      "time_limit": 60
    },
    {
      "id": 141,
      "topic": "৪. মূল নিয়মে অন্তরজ ও অন্তরীকরণের মৌলিক সূত্রাবলি",
      "question_text": "৪. $\\frac{d}{dx}(x e^{x}) = \\text{কত}?$ [সি. বো. ২৫]",
      "options": [
        "$(1+x)e^{x}$",
        "$x e^{x}$",
        "$(1-x)e^{x}$"
      ],
      "correct_answer": "$(1+x)e^{x}$",
      "explanation": "$\\frac{d}{dx}(x e^{x}) = x e^{x} + e^{x} \\cdot 1 \\quad [uv \\text{ এর formula প্রয়োগ করে}]$\n$$= e^{x}(x+1)$$",
      "time_limit": 60
    },
    {
      "id": 142,
      "topic": "৪. মূল নিয়মে অন্তরজ ও অন্তরীকরণের মৌলিক সূত্রাবলি",
      "question_text": "৫. $y^{2} = x$ হলে $y_{1}$ নিচের কোনটি? [কু. বো. ২২]",
      "options": [
        "$2y$",
        "$2x$",
        "$2\\sqrt{x}$",
        "$\\frac{1}{2\\sqrt{x}}$"
      ],
      "correct_answer": "$\\frac{1}{2\\sqrt{x}}$",
      "explanation": "$y^{2} = x \\implies y = \\sqrt{x}$\n$$\\therefore \\frac{dy}{dx} = \\frac{1}{2\\sqrt{x}}$$",
      "time_limit": 60
    },
    {
      "id": 143,
      "topic": "৪. মূল নিয়মে অন্তরজ ও অন্তরীকরণের মৌলিক সূত্রাবলি",
      "question_text": "৬. $\\sec^{-1}\\left(\\frac{1+x^{2}}{1-x^{2}}\\right)$ এর অন্তরক সহগ কত? [চ. বো. ২২]",
      "options": [
        "$\\frac{1}{x\\sqrt{x^{2}-1}}$",
        "$\\frac{-2}{\\sqrt{1-x^{2}}}$",
        "$\\frac{2}{1+x^{2}}$",
        "$\\frac{-2}{1+x^{2}}$"
      ],
      "correct_answer": "$\\frac{2}{1+x^{2}}$",
      "explanation": "ধরি, $y = \\sec^{-1}\\left(\\frac{1+x^{2}}{1-x^{2}}\\right) = \\cos^{-1}\\left(\\frac{1-x^{2}}{1+x^{2}}\\right) = 2\\tan^{-1} x$\n$$\\therefore \\frac{dy}{dx} = \\frac{d}{dx}(2\\tan^{-1} x) = \\frac{2}{1+x^{2}}$$",
      "time_limit": 60
    },
    {
      "id": 144,
      "topic": "৪. মূল নিয়মে অন্তরজ ও অন্তরীকরণের মৌলিক সূত্রাবলি",
      "question_text": "৭. $f(x) = 5$ হলে $\\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h} = ?$ [ঢা. বো. ২২]",
      "options": [
        "$-1$",
        "$0$",
        "$1$",
        "$\\infty$"
      ],
      "correct_answer": "$0$",
      "explanation": "$\\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h} = f'(x) = \\frac{d}{dx}(f(x))$\nএখন, $f(x) = 5$\n$\\therefore f'(x) = 0$",
      "time_limit": 60
    },
    {
      "id": 145,
      "topic": "৪. মূল নিয়মে অন্তরজ ও অন্তরীকরণের মৌলিক সূত্রাবলি",
      "question_text": "৮. সরণ $s = 5t^{3} - 9t^{2} + 3t + 2$ হলে $t = 4\\,\\mathrm{s}$ সময় পর বেগ কত একক হবে? [সি. বো. ২২]",
      "options": [
        "$71$",
        "$171$",
        "$243$",
        "$343$"
      ],
      "correct_answer": "$171$",
      "explanation": "$v = \\frac{ds}{dt} = 15t^{2} - 18t + 3$\n$4\\,\\mathrm{s}$ পর $v = 15 \\times 4^{2} - 18 \\times 4 + 3 = 171$",
      "time_limit": 60
    },
    {
      "id": 146,
      "topic": "৪. মূল নিয়মে অন্তরজ ও অন্তরীকরণের মৌলিক সূত্রাবলি",
      "question_text": "৯. $\\frac{d}{dx}(\\cot^{-1} x)$ এর মান কোনটি? [কু. বো. ২৫]",
      "options": [
        "$\\frac{1}{1+x^{2}}$",
        "$-\\frac{1}{1+x^{2}}$",
        "$\\frac{1}{x\\sqrt{x^{2}-1}}$",
        "$-\\frac{1}{x\\sqrt{x^{2}-1}}$"
      ],
      "correct_answer": "$-\\frac{1}{1+x^{2}}$",
      "explanation": "$\\frac{d}{dx}(\\cot^{-1} x) = -\\frac{1}{1+x^{2}}$",
      "time_limit": 60
    },
    {
      "id": 147,
      "topic": "৪. মূল নিয়মে অন্তরজ ও অন্তরীকরণের মৌলিক সূত্রাবলি",
      "question_text": "১০. $f(x) = \\tan^{-1}\\left(\\frac{2x}{1-x^{2}}\\right)$ এবং $g(x) = \\sin^{-1}(\\sin \\sqrt{x})$ হলে- [ঢা. বো. ২৫]\ni. $f'(x) = \\frac{2}{1+x^{2}}$\nii. $g'(x) = \\frac{1}{2\\sqrt{x}}$\niii. $f(1) = \\frac{\\pi}{2}$\nনিচের কোনটি সঠিক?",
      "options": [
        "i ও ii",
        "ii ও iii",
        "i ও iii",
        "i, ii ও iii"
      ],
      "correct_answer": "i, ii ও iii",
      "explanation": "(i) $f(x) = \\tan^{-1}\\frac{2x}{1-x^{2}} = 2\\tan^{-1} x \\implies f'(x) = \\frac{2}{1+x^{2}}$\n(ii) $g(x) = \\sin^{-1}(\\sin \\sqrt{x}) = \\sqrt{x} \\implies g'(x) = \\frac{1}{2\\sqrt{x}}$\n(iii) $f(x) = 2\\tan^{-1} x \\implies f(1) = 2\\tan^{-1} 1 = 2 \\times \\frac{\\pi}{4} = \\frac{\\pi}{2}$",
      "time_limit": 60
    },
    {
      "id": 148,
      "topic": "৪. মূল নিয়মে অন্তরজ ও অন্তরীকরণের মৌলিক সূত্রাবলি",
      "question_text": "১১. $\\frac{d}{dx}(x^{-9}) = \\text{কত}?$ [রা. বো. ২১]",
      "options": [
        "$-9x^{8}$",
        "$-\\frac{1}{9}x^{-10}$",
        "$-9x^{-10}$",
        "$-\\frac{1}{9}x^{8}$"
      ],
      "correct_answer": "$-9x^{-10}$",
      "explanation": "$\\frac{d}{dx}(x^{-9}) = -9x^{-10}$",
      "time_limit": 60
    },
    {
      "id": 149,
      "topic": "৪. মূল নিয়মে অন্তরজ ও অন্তরীকরণের মৌলিক সূত্রাবলি",
      "question_text": "১২. $\\frac{d}{dx}(a^{10})$ এর মান কোনটি? [য. বো. ২১; অনুরূপ প্রশ্ন: ব. বো. ১৭]",
      "options": [
        "$0$",
        "$a^{10}$",
        "$10a^{9}$",
        "$a^{10} \\ln a$"
      ],
      "correct_answer": "$0$",
      "explanation": "$a^{10}$ হল ধ্রুবক।\n$\\therefore \\frac{d}{dx}(a^{10}) = 0$",
      "time_limit": 60
    },
    {
      "id": 150,
      "topic": "৪. মূল নিয়মে অন্তরজ ও অন্তরীকরণের মৌলিক সূত্রাবলি",
      "question_text": "১৩. $y = \\tan^{-1} \\frac{1+x}{1-x}$ হলে $\\frac{dy}{dx} = \\text{কত}?$ [সি. বো. ২৫; অনুরূপ প্রশ্ন: ঢা. বো. ১৯]",
      "options": [
        "$\\frac{1}{1-x}$",
        "$\\frac{1}{1+x}$",
        "$\\frac{1}{1+x^{2}}$",
        "$\\frac{1}{1-x^{2}}$"
      ],
      "correct_answer": "$\\frac{1}{1+x^{2}}$",
      "explanation": "$y = \\tan^{-1}\\frac{1+x}{1-x \\cdot 1} = \\tan^{-1}(1) + \\tan^{-1}(x) = \\frac{\\pi}{4} + \\tan^{-1} x$\n$$\\therefore \\frac{dy}{dx} = \\frac{1}{1+x^{2}}$$",
      "time_limit": 60
    },
    {
      "id": 151,
      "topic": "৪. মূল নিয়মে অন্তরজ ও অন্তরীকরণের মৌলিক সূত্রাবলি",
      "question_text": "১৪. $y = \\cot^{-1} \\frac{1-x}{1+x}$ হলে $\\frac{dy}{dx} = ?$ [রা. বো. ২৫]",
      "options": [
        "$\\frac{1}{1-x^{2}}$",
        "$\\frac{-1}{1+x^{2}}$",
        "$\\frac{1}{1+x^{2}}$",
        "$\\frac{-1}{1-x^{2}}$"
      ],
      "correct_answer": "$\\frac{1}{1+x^{2}}$",
      "explanation": "$y = \\cot^{-1}\\frac{1-x}{1+x} = \\tan^{-1}\\frac{1+x}{1-1 \\cdot x} = \\tan^{-1} 1 + \\tan^{-1} x$\n$$\\therefore \\frac{dy}{dx} = 0 + \\frac{1}{1+x^{2}} = \\frac{1}{1+x^{2}}$$",
      "time_limit": 60
    },
    {
      "id": 152,
      "topic": "৪. মূল নিয়মে অন্তরজ ও অন্তরীকরণের মৌলিক সূত্রাবলি",
      "question_text": "১৫. $y = \\tan^{-1} \\frac{2\\sqrt{x}}{1-x}$ হলে $\\frac{dy}{dx} = ?$ [বো. বো. ২৫]",
      "options": [
        "$\\frac{1}{2(1+x)\\sqrt{x}}$",
        "$\\frac{1}{(1+x)\\sqrt{x}}$",
        "$\\frac{2}{(1+x)\\sqrt{x}}$",
        "$\\frac{1}{(1+x^{2})x}$"
      ],
      "correct_answer": "$\\frac{1}{(1+x)\\sqrt{x}}$",
      "explanation": "$y = \\tan^{-1}\\frac{2\\sqrt{x}}{1-(\\sqrt{x})^{2}} = 2\\tan^{-1}(\\sqrt{x})$\n$$\\therefore \\frac{dy}{dx} = \\frac{d}{dx}(2\\tan^{-1}\\sqrt{x}) = 2 \\cdot \\frac{1}{1+(\\sqrt{x})^{2}} \\cdot \\frac{1}{2\\sqrt{x}} = \\frac{1}{(1+x)\\sqrt{x}}$$",
      "time_limit": 60
    },
    {
      "id": 153,
      "topic": "৪. মূল নিয়মে অন্তরজ ও অন্তরীকরণের মৌলিক সূত্রাবলি",
      "question_text": "১৬. $y = \\sin^{-1} \\frac{4x}{1+4x^{2}}$ হলে $\\frac{dy}{dx}$ এর মান- [য. বো. ২৫]",
      "options": [
        "$\\frac{4}{1-4x^{2}}$",
        "$\\frac{4}{1+4x^{2}}$",
        "$\\frac{1}{1-4x^{2}}$",
        "$\\frac{2}{1+4x^{2}}$"
      ],
      "correct_answer": "$\\frac{4}{1+4x^{2}}$",
      "explanation": "$y = \\sin^{-1} \\frac{4x}{1+4x^{2}} = \\sin^{-1} \\frac{2(2x)}{1+(2x)^{2}} = 2\\tan^{-1}(2x)$\n$$\\therefore \\frac{dy}{dx} = \\frac{2}{1+(2x)^{2}} \\frac{d}{dx}(2x) = \\frac{4}{1+4x^{2}}$$",
      "time_limit": 60
    },
    {
      "id": 154,
      "topic": "৪. মূল নিয়মে অন্তরজ ও অন্তরীকরণের মৌলিক সূত্রাবলি",
      "question_text": "১৭. $\\frac{d}{dx} \\sqrt{\\frac{1+\\sin 2x}{\\sin x + \\cos x}} = ?$ [ব. বো. ১৭]",
      "options": [
        "$0$",
        "$\\sin 2x$",
        "$\\cos 2x$",
        "$2 \\cos 2x$"
      ],
      "correct_answer": "$0$",
      "explanation": "$\\sqrt{1+\\sin 2x} = \\sqrt{\\cos^{2} x + \\sin^{2} x + 2\\sin x \\cos x}$\n$$= \\sqrt{(\\sin x + \\cos x)^{2}} = \\sin x + \\cos x$$\n$$\\therefore \\frac{d}{dx}\\left(\\sqrt{\\frac{1+\\sin 2x}{\\sin x + \\cos x}}\\right) = \\frac{d}{dx}\\left(\\frac{\\sin x + \\cos x}{\\sin x + \\cos x}\\right) = \\frac{d}{dx}(1) = 0$$",
      "time_limit": 60
    },
    {
      "id": 155,
      "topic": "৪. মূল নিয়মে অন্তরজ ও অন্তরীকরণের মৌলিক সূত্রাবলি",
      "question_text": "১৮. $\\lim_{h \\to 0} \\frac{\\sec(x+h) - \\sec x}{h}$ এর মান কত? [BAU'18-19]",
      "options": [
        "$\\sec^{2} x$",
        "$\\tan x$",
        "$\\sec x \\text{cosec} x$",
        "$\\sec x \\tan x$"
      ],
      "correct_answer": "$\\sec x \\tan x$",
      "explanation": "$\\lim_{h \\to 0} \\frac{\\sec(x+h) - \\sec x}{h} = \\frac{d}{dx}(\\sec x) = \\sec x \\tan x$",
      "time_limit": 60
    },
    {
      "id": 156,
      "topic": "৪. মূল নিয়মে অন্তরজ ও অন্তরীকরণের মৌলিক সূত্রাবলি",
      "question_text": "১৯. ক্যালকুলাস আবিষ্কারের পেছনে অবদান আছে কার? [RU'13-14]",
      "options": [
        "পীথাগোরাস",
        "গাউস",
        "জগদীশচন্দ্র বসু",
        "নিউটন"
      ],
      "correct_answer": "নিউটন",
      "explanation": "স্যার আইজ্যাক নিউটন ও গটফ্রিড লাইবনিজ স্বাধীনভাবে ক্যালকুলাস আবিষ্কার ও বিকাশ সাধন করেন।",
      "time_limit": 60
    },
    {
      "id": 157,
      "topic": "৪. মূল নিয়মে অন্তরজ ও অন্তরীকরণের মৌলিক সূত্রাবলি",
      "question_text": "২০. $\\frac{d}{dx}[\\tan^{-1}(\\cot x) + \\cot^{-1}(\\tan x)] = ?$ [CU'25-26]",
      "options": [
        "$0$",
        "$1$",
        "$2$",
        "$-2$"
      ],
      "correct_answer": "$-2$",
      "explanation": "$\\frac{d}{dx}[\\tan^{-1}(\\cot x) + \\cot^{-1}(\\tan x)]$\n$$= \\frac{d}{dx}\\left[\\tan^{-1}\\left(\\tan\\left(\\frac{\\pi}{2}-x\\right)\\right) + \\cot^{-1}\\left(\\cot\\left(\\frac{\\pi}{2}-x\\right)\\right)\\right]$$\n$$= \\frac{d}{dx}\\left(\\frac{\\pi}{2} - x + \\frac{\\pi}{2} - x\\right)$$\n$$= \\frac{d}{dx}(\\pi - 2x) = -2$$",
      "time_limit": 60
    },
    {
      "id": 158,
      "topic": "৪. মূল নিয়মে অন্তরজ ও অন্তরীকরণের মৌলিক সূত্রাবলি",
      "question_text": "২১. $y = |x|\\ (x < 0)$ হলে $\\frac{dy}{dx} = ?$ [RU'24-25]",
      "options": [
        "$1$",
        "$-1$",
        "$0$",
        "কোনটিই নয়"
      ],
      "correct_answer": "$-1$",
      "explanation": "$y = |x| = -x \\quad (\\because x < 0)$\n$$\\therefore \\frac{dy}{dx} = \\frac{d}{dx}(-x) = -1$$",
      "time_limit": 60
    },
    {
      "id": 159,
      "topic": "৪. মূল নিয়মে অন্তরজ ও অন্তরীকরণের মৌলিক সূত্রাবলি",
      "question_text": "২২. $\\frac{d}{dx}(\\log_{2} x \\cdot \\log_{x} 2) = ?$ [SUST'24-25]",
      "options": [
        "$0$",
        "$1$",
        "$\\frac{1}{x}$",
        "$\\infty$"
      ],
      "correct_answer": "$0$",
      "explanation": "$\\frac{d}{dx}(\\log_{2} x \\cdot \\log_{x} 2) = \\frac{d}{dx}(1) = 0$",
      "time_limit": 60
    },
    {
      "id": 160,
      "topic": "৪. মূল নিয়মে অন্তরজ ও অন্তরীকরণের মৌলিক সূত্রাবলি",
      "question_text": "২৩. $\\frac{d}{dx}(\\log_{10} x) = \\text{কোনটি}?$ [RU'23-24]",
      "options": [
        "$\\frac{1}{x}$",
        "$\\frac{1}{10} \\log_{10} e$",
        "$\\frac{1}{x} \\log_{e} 10$",
        "$\\frac{1}{x} \\log_{10} e$"
      ],
      "correct_answer": "$\\frac{1}{x} \\log_{10} e$",
      "explanation": "$\\frac{d}{dx}(\\log_{10} x) = \\frac{d}{dx}\\left(\\frac{1}{\\log_{e} 10} \\ln x\\right) = \\frac{1}{x} \\log_{10} e$\n$\\left[\\because \\log_{10} x = \\frac{\\ln x}{\\ln 10}\\right]$",
      "time_limit": 60
    },
    {
      "id": 161,
      "topic": "৪. মূল নিয়মে অন্তরজ ও অন্তরীকরণের মৌলিক সূত্রাবলি",
      "question_text": "২৪. $a > 1$ হলে, $\\frac{d}{dx}(\\ln a^{x}) = ?$ [GST'22-23]",
      "options": [
        "$\\frac{a^{x}}{\\ln a}$",
        "$\\ln a$",
        "$a^{x}$",
        "$x \\ln a$"
      ],
      "correct_answer": "$\\ln a$",
      "explanation": "$\\frac{d}{dx}[\\ln a^{x}] = \\frac{d}{dx}[x \\ln a]$\n$= \\ln a \\frac{d}{dx}[x] \\quad [\\text{যেহেতু } \\log_{a}(b^{x}) = x \\log_{a} b]$\n$= \\ln a \\cdot 1 \\quad [\\ln a \\text{ একটি ধ্রুবক}] = \\ln a \\times 1 = \\ln a$",
      "time_limit": 60
    },
    {
      "id": 162,
      "topic": "৪. মূল নিয়মে অন্তরজ ও অন্তরীকরণের মৌলিক সূত্রাবলি",
      "question_text": "২৫. $y = \\frac{\\sin x + \\cos x}{\\sqrt{1 + \\sin 2x}}$ হলে, $\\frac{dy}{dx} = \\text{কত}?$ [RU'22-23; DU'15-16]",
      "options": [
        "$0$",
        "$1$",
        "$-1$",
        "$2 \\sin 2x$"
      ],
      "correct_answer": "$0$",
      "explanation": "$y = \\frac{\\sin x + \\cos x}{\\sqrt{1 + \\sin 2x}} = \\frac{\\sin x + \\cos x}{\\sqrt{\\sin^{2} x + \\cos^{2} x + 2\\sin x \\cos x}}$\n$$= \\frac{\\sin x + \\cos x}{\\sqrt{(\\sin x + \\cos x)^{2}}} = \\frac{\\sin x + \\cos x}{\\sin x + \\cos x} \\implies y = 1 \\implies \\frac{dy}{dx} = 0$$",
      "time_limit": 60
    },
    {
      "id": 163,
      "topic": "৪. মূল নিয়মে অন্তরজ ও অন্তরীকরণের মৌলিক সূত্রাবলি",
      "question_text": "২৬. যদি $f(x) = \\ln(2x + e^{2x})$ হয়, তবে $f'(0) = \\text{কত}?$ [RU'22-23]",
      "options": [
        "$0$",
        "$1$",
        "$5$",
        "$10$"
      ],
      "correct_answer": "$5$",
      "explanation": "$f'(x) = \\frac{2 + 2e^{2x}}{2x + e^{2x}} \\implies f'(0) = \\frac{4}{1} = 4$\n(অপশন অনুযায়ী সঠিক উত্তর ৪ হলেও প্রদত্ত উত্তর গ চিহ্নিত।)",
      "time_limit": 60
    },
    {
      "id": 164,
      "topic": "৪. মূল নিয়মে অন্তরজ ও অন্তরীকরণের মৌলিক সূত্রাবলি",
      "question_text": "২৭. যদি $y = \\sin^{-1}(\\sin x)$ হয়, তবে $\\frac{dy}{dx}$ এর মান কোনটি? [JU'22-23; DU'16-17]",
      "options": [
        "$\\sin x$",
        "$\\cos x$",
        "$x$",
        "$1$"
      ],
      "correct_answer": "$1$",
      "explanation": "$y = \\sin^{-1}(\\sin x) = x \\therefore \\frac{dy}{dx} = \\frac{d}{dx}(x) = 1$",
      "time_limit": 60
    },
    {
      "id": 165,
      "topic": "৪. মূল নিয়মে অন্তরজ ও অন্তরীকরণের মৌলিক সূত্রাবলি",
      "question_text": "২৮. $\\frac{d}{dx}(10^{x}) = ?$ [Agri.'21-22]",
      "options": [
        "$10^{x} \\log_{e} 10$",
        "$x 10^{x-1}$",
        "$10^{x} \\log 10_{e}$",
        "$x 10^{x+1}$"
      ],
      "correct_answer": "$10^{x} \\log_{e} 10$",
      "explanation": "$\\frac{d}{dx}(a^{x}) = a^{x} \\ln a$\n$$\\therefore \\frac{d}{dx}(10^{x}) = 10^{x} \\ln 10 = 10^{x} \\log_{e} 10$$",
      "time_limit": 60
    },
    {
      "id": 166,
      "topic": "৪. মূল নিয়মে অন্তরজ ও অন্তরীকরণের মৌলিক সূত্রাবলি",
      "question_text": "২৯. $y = \\ln x$ হলে, $\\frac{dx}{dy} = \\text{কত}?$ [CU'17-18]",
      "options": [
        "$e^{y}$",
        "$e^{x}$",
        "$x$",
        "$\\frac{1}{y}$"
      ],
      "correct_answer": "$e^{y}$",
      "explanation": "$y = \\ln x \\implies 1 = \\frac{1}{x} \\frac{dx}{dy} \\implies \\frac{dx}{dy} = x = e^{y}$",
      "time_limit": 60
    },
    {
      "id": 167,
      "topic": "৪. মূল নিয়মে অন্তরজ ও অন্তরীকরণের মৌলিক সূত্রাবলি",
      "question_text": "৩০. $y = 3\\log_{e} x - 5e^{x}$ হলে, $\\frac{dy}{dx}$ এর মান কত? [JU'16-17]",
      "options": [
        "$\\frac{3}{x} - 5e^{x}$",
        "$\\frac{3}{x} \\log_{e} e - 5e^{x}$",
        "$\\frac{3}{x} \\log_{x} x - 5e^{x}$",
        "কোনটিই নয়"
      ],
      "correct_answer": "$\\frac{3}{x} - 5e^{x}$",
      "explanation": "$y = 3\\log_{e} x - 5e^{x} = 3\\log_{e} e \\ln x - 5e^{x}$\n$$\\therefore \\frac{dy}{dx} = \\frac{3}{x} \\log_{e} e - 5e^{x} = \\frac{3}{x} - 5e^{x}$$",
      "time_limit": 60
    },
    {
      "id": 168,
      "topic": "৪. মূল নিয়মে অন্তরজ ও অন্তরীকরণের মৌলিক সূত্রাবলি",
      "question_text": "৩১. $x+y=a^{2}$ হলে, $\\frac{dy}{dx}$ এবং $\\frac{dx}{dy}$ এর মান যথাক্রমে- [CU'16-17]",
      "options": [
        "$0, 0$",
        "$0, 2a$",
        "$2a, 0$",
        "$-1, -1$"
      ],
      "correct_answer": "$-1, -1$",
      "explanation": "$x+y=a^{2} ; 1 + \\frac{dy}{dx} = 0$\n$$\\therefore \\frac{dy}{dx} = -1 \\therefore \\frac{dx}{dy} = \\frac{1}{-1} = -1$$",
      "time_limit": 60
    },
    {
      "id": 169,
      "topic": "৪. মূল নিয়মে অন্তরজ ও অন্তরীকরণের মৌলিক সূত্রাবলি",
      "question_text": "৩২. $p(x) = a+1$ হলে, $p'(a)$ এবং $p'(1)$ এর মান যথাক্রমে কত? [CU'16-17]",
      "options": [
        "$a+1, 0$",
        "$0, a$",
        "$0, 0$",
        "$a+1, a+1$",
        "$0, 1$"
      ],
      "correct_answer": "$0, 0$",
      "explanation": "$p(x) = a + 1 \\implies p'(x) = 0$ [$\\because (a+1)$ একটি ধ্রুবক]; অর্থাৎ $p'(a) = p'(1) = 0$",
      "time_limit": 60
    },
    {
      "id": 170,
      "topic": "৪. মূল নিয়মে অন্তরজ ও অন্তরীকরণের মৌলিক সূত্রাবলি",
      "question_text": "৩৩. $\\frac{d}{dy}\\left(\\frac{1+y}{y}\\right) = \\text{কত}?$ [JU'14-15]",
      "options": [
        "$-\\frac{1}{y^{2}}$",
        "$1-\\frac{1}{y}$",
        "$1+\\frac{1}{y^{2}}$",
        "$1+\\frac{1}{y}$"
      ],
      "correct_answer": "$-\\frac{1}{y^{2}}$",
      "explanation": "$\\frac{d}{dy}\\left(\\frac{1+y}{y}\\right) = \\frac{d}{dy}\\left(\\frac{1}{y}+1\\right)$\n$$= -\\frac{1}{y^{2}} + 0 = -\\frac{1}{y^{2}}$$",
      "time_limit": 60
    },
    {
      "id": 171,
      "topic": "৪. মূল নিয়মে অন্তরজ ও অন্তরীকরণের মৌলিক সূত্রাবলি",
      "question_text": "৩৪. $y = x(3 - x^{2})$ এবং $\\frac{dy}{dx} = 0$ হলে, $x$ এর মান কত? [JU'14-15]",
      "options": [
        "$1$",
        "$-1$",
        "$\\pm 1$",
        "$0$"
      ],
      "correct_answer": "$\\pm 1$",
      "explanation": "$y = 3x - x^{3} ; y_{1} = 3 - 3x^{2} = 0$\n$$\\implies 3 = 3x^{2} ; x^{2} = 1 \\therefore x = \\pm 1$$",
      "time_limit": 60
    },
    {
      "id": 172,
      "topic": "৪. মূল নিয়মে অন্তরজ ও অন্তরীকরণের মৌলিক সূত্রাবলি",
      "question_text": "৩৫. $\\frac{d}{dx}\\left(\\frac{x}{x^{2}-4}\\right) = \\text{কত}?$ [JU'21-22; KU'16-17]",
      "options": [
        "$-\\frac{x^{2}+4}{(x^{2}-4)^{2}}$",
        "$\\frac{x^{2}+4}{(x^{2}-4)^{2}}$",
        "$-\\frac{2x}{(x^{2}-4)^{2}}$",
        "$\\frac{2x}{(x^{2}-4)^{2}}$"
      ],
      "correct_answer": "$-\\frac{x^{2}+4}{(x^{2}-4)^{2}}$",
      "explanation": "$\\frac{d}{dx}\\left(\\frac{x}{x^{2}-4}\\right) = \\frac{(x^{2}-4)\\frac{d}{dx}(x) - x\\frac{d}{dx}(x^{2}-4)}{(x^{2}-4)^{2}}$\n$$= \\frac{(x^{2}-4) \\cdot 1 - x \\cdot 2x}{(x^{2}-4)^{2}} = \\frac{x^{2}-4-2x^{2}}{(x^{2}-4)^{2}} = \\frac{-x^{2}-4}{(x^{2}-4)^{2}} = -\\frac{x^{2}+4}{(x^{2}-4)^{2}}$$",
      "time_limit": 60
    },
    {
      "id": 173,
      "topic": "৪. মূল নিয়মে অন্তরজ ও অন্তরীকরণের মৌলিক সূত্রাবলি",
      "question_text": "৩৬. $y = \\frac{\\ln x}{x^{2}}$ হলে, $\\frac{dy}{dx} = ?$ [RU'19-20]",
      "options": [
        "$\\frac{1-\\ln x}{x^{3}}$",
        "$\\frac{1-2\\ln x}{x^{3}}$",
        "$-\\frac{\\ln x}{x^{3}}$",
        "$\\frac{1-\\ln x}{x^{2}}$"
      ],
      "correct_answer": "$\\frac{1-2\\ln x}{x^{3}}$",
      "explanation": "$y = \\frac{\\ln x}{x^{2}} \\implies \\frac{dy}{dx} = \\frac{x^{2}\\frac{1}{x} - \\ln x \\cdot 2x}{(x^{2})^{2}} = \\frac{x - 2x\\ln x}{x^{4}} = \\frac{1-2\\ln x}{x^{3}}$",
      "time_limit": 60
    },
    {
      "id": 174,
      "topic": "৪. মূল নিয়মে অন্তরজ ও অন্তরীকরণের মৌলিক সূত্রাবলি",
      "question_text": "৩৭. $y = \\frac{1+x}{1-x}$ হলে, $\\frac{dy}{dx}$ এর মান- [DU'18-19]",
      "options": [
        "$\\frac{2}{(x-1)^{2}}$",
        "$\\frac{2}{1-x^{2}}$",
        "$\\frac{2}{(1-x)^{2}}$",
        "$\\frac{2x}{(1-x)^{2}}$"
      ],
      "correct_answer": "$\\frac{2}{(1-x)^{2}}$",
      "explanation": "$y = \\frac{1+x}{1-x} \\implies \\frac{dy}{dx} = \\frac{(1-x) \\cdot 1 - (1+x)(-1)}{(1-x)^{2}} = \\frac{1-x+1+x}{(1-x)^{2}} = \\frac{2}{(1-x)^{2}}$",
      "time_limit": 60
    },
    {
      "id": 175,
      "topic": "৪. মূল নিয়মে অন্তরজ ও অন্তরীকরণের মৌলিক সূত্রাবলি",
      "question_text": "৩৮. $\\frac{\\log x}{x}$ এর অন্তরক সহগ কত? [CU'18-19, 12-13, 11-12, 09-10, 05-06]",
      "options": [
        "$1 - \\log x$",
        "$\\frac{1+\\log x}{x^{2}}$",
        "$\\frac{1-\\log x}{x^{2}}$",
        "$\\frac{1-\\log x}{x}$",
        "$-\\frac{1+\\log x}{x^{2}}$"
      ],
      "correct_answer": "$\\frac{1-\\log x}{x^{2}}$",
      "explanation": "$y = \\frac{\\log x}{x} \\implies \\frac{dy}{dx} = \\frac{x \\cdot \\frac{1}{x} - \\log x \\cdot 1}{x^{2}} = \\frac{1-\\log x}{x^{2}}$",
      "time_limit": 60
    },
    {
      "id": 176,
      "topic": "৪. মূল নিয়মে অন্তরজ ও অন্তরীকরণের মৌলিক সূত্রাবলি",
      "question_text": "৩৯. $y = \\frac{1}{3} x^{3} \\log x$ হলে, $\\frac{d^{4}y}{dx^{4}}$ এর মান কত? [KU'17-18]",
      "options": [
        "$1$",
        "$\\frac{2}{x}$",
        "$\\frac{11}{x}$",
        "$\\log x$"
      ],
      "correct_answer": "$\\frac{2}{x}$",
      "explanation": "$y = \\frac{1}{3} x^{3} \\log x$\n$$\\implies \\frac{dy}{dx} = \\frac{1}{3} \\cdot 3x^{2} \\log x + \\frac{1}{3} x^{3} \\cdot \\frac{1}{x} = x^{2} \\log x + \\frac{1}{3} x^{2}$$\n$$\\implies \\frac{d^{2}y}{dx^{2}} = 2x \\log x + x^{2} \\cdot \\frac{1}{x} + \\frac{2}{3} x = 2x \\log x + \\frac{5}{3} x$$\n$$\\implies \\frac{d^{3}y}{dx^{3}} = 2\\log x + 2x \\cdot \\frac{1}{x} + \\frac{5}{3} = 2\\log x + \\frac{11}{3}$$\n$$\\implies \\frac{d^{4}y}{dx^{4}} = 2 \\times \\frac{1}{x} + 0 = \\frac{2}{x}$$",
      "time_limit": 60
    },
    {
      "id": 177,
      "topic": "৪. মূল নিয়মে অন্তরজ ও অন্তরীকরণের মৌলিক সূত্রাবলি",
      "question_text": "৪০. $\\frac{d}{dx}(x^{3} \\ln(x)) = ?$ [RU'15-16]",
      "options": [
        "$x + 2x \\ln(x)$",
        "$x^{2} + 2x \\ln(x)$",
        "$x^{2} + 2x^{2} \\ln(x)$",
        "$x^{2} + 3x^{2} \\ln(x)$"
      ],
      "correct_answer": "$x^{2} + 3x^{2} \\ln(x)$",
      "explanation": "$\\frac{d}{dx}(x^{3} \\ln(x)) = x^{3} \\cdot \\frac{1}{x} + (\\ln x) \\cdot 3x^{2} = x^{2} + 3x^{2} \\ln(x)$",
      "time_limit": 60
    },
    {
      "id": 178,
      "topic": "৪. মূল নিয়মে অন্তরজ ও অন্তরীকরণের মৌলিক সূত্রাবলি",
      "question_text": "৪১. $g(y) = e^{-y} + x\\cos y + \\sin t$ এর $y$ সাপেক্ষে অন্তরক সহগ হচ্ছে- [CU'13-14]",
      "options": [
        "$-e^{-y} + \\cos y - x\\sin y$",
        "$\\cos y$",
        "$-x\\sin y + \\cos t$",
        "$-e^{-y} - x\\sin y$"
      ],
      "correct_answer": "$-e^{-y} - x\\sin y$",
      "explanation": "$\\frac{d(g(y))}{dy} = \\frac{d}{dy}(e^{-y} + x\\cos y + \\sin t)$\n$$= -e^{-y} - x\\sin y + 0 = -e^{-y} - x\\sin y$$",
      "time_limit": 60
    },
    {
      "id": 179,
      "topic": "৪. মূল নিয়মে অন্তরজ ও অন্তরীকরণের মৌলিক সূত্রাবলি",
      "question_text": "৪২. যদি $f(x) = 2^{-4x}$ হয়, তবে $\\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}$ এর মান হবে- [BUET'11-12]",
      "options": [
        "$-4 \\times 2^{-4x} \\log_{e} 2$",
        "$4 \\times 2^{-4x} \\log_{e} 2$",
        "$2^{-4x} \\log_{e} 2$",
        "$-4 \\times 2^{-4x-1}$"
      ],
      "correct_answer": "$-4 \\times 2^{-4x} \\log_{e} 2$",
      "explanation": "$f(x) = 2^{-4x}$\n$$\\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h} = f'(x) = 2^{-4x} \\log_{e} 2 \\cdot (-4) = -4 \\times 2^{-4x} \\log_{e} 2$$",
      "time_limit": 60
    },
    {
      "id": 180,
      "topic": "৪. মূল নিয়মে অন্তরজ ও অন্তরীকরণের মৌলিক সূত্রাবলি",
      "question_text": "৪৩. $\\sin^{-1}\\frac{2x}{1+x^{2}}$ এর সাপেক্ষে $\\cos^{-1}\\frac{1-x^{2}}{1+x^{2}}$ এর অন্তরীকরণ কত? [BUET'24-25]",
      "options": [
        "$0$",
        "$1$",
        "$\\frac{2}{1+x^{2}}$",
        "None"
      ],
      "correct_answer": "$1$",
      "explanation": "$\\frac{d(\\cos^{-1}\\frac{1-x^{2}}{1+x^{2}})}{d(\\sin^{-1}\\frac{2x}{1+x^{2}})}$\n$$= \\frac{\\frac{d}{dx}(2\\tan^{-1} x)}{\\frac{d}{dx}(2\\tan^{-1} x)} = 1$$",
      "time_limit": 60
    },
    {
      "id": 181,
      "topic": "৪. মূল নিয়মে অন্তরজ ও অন্তরীকরণের মৌলিক সূত্রাবলি",
      "question_text": "৪৪. $y = \\sin^{2} 2x + e^{2\\log \\cos 2x}$ হলে $\\frac{dy}{dx}$ এর মান কত? [RUET'24-25; KUET'13-14]",
      "options": [
        "$1$",
        "$-1$",
        "$0$",
        "$2$",
        "$-2$"
      ],
      "correct_answer": "$0$",
      "explanation": "$y = \\sin^{2} 2x + e^{\\log(\\cos 2x)^{2}} = \\sin^{2} 2x + \\cos^{2} 2x \\quad [\\log e^{x} \\text{ properties}]$\n$$= 1$$\n$$\\therefore \\frac{dy}{dx}(1) = 0$$",
      "time_limit": 60
    },
    {
      "id": 182,
      "topic": "৪. মূল নিয়মে অন্তরজ ও অন্তরীকরণের মৌলিক সূত্রাবলি",
      "question_text": "৪৫. $\\frac{d}{dx}(\\log_{2} x^{x} \\cdot \\log_{x} 2) = ?$ [SUST'24-25]",
      "options": [
        "$0$",
        "$1$",
        "$\\frac{1}{x}$",
        "$\\infty$"
      ],
      "correct_answer": "$1$",
      "explanation": "$\\frac{d}{dx}(\\log_{2} x^{x} \\cdot \\log_{x} 2)$\n$$= \\frac{d}{dx}(x\\log_{2} x \\cdot \\log_{x} 2) = \\frac{d}{dx}(x\\log_{2} 2) = \\frac{d}{dx}(x \\cdot 1) = \\frac{d}{dx}(x) = 1$$",
      "time_limit": 60
    },
    {
      "id": 183,
      "topic": "৪. মূল নিয়মে অন্তরজ ও অন্তরীকরণের মৌলিক সূত্রাবলি",
      "question_text": "৪৬. $\\log_{\\sin x} \\sin^{2} x$ এর অন্তরক সহগ কোনটি? [KUET'17-18]",
      "options": [
        "$2$",
        "$(\\sin x)^{\\sin^{2} x - 1}$",
        "$2(\\sin x)^{\\cos^{2} x - 1}$",
        "$0$",
        "$\\cot x$"
      ],
      "correct_answer": "$0$",
      "explanation": "$\\frac{d}{dx}(\\log_{\\sin x} \\sin^{2} x) = \\frac{d}{dx}(2) = 0$",
      "time_limit": 60
    },
    {
      "id": 184,
      "topic": "৪. মূল নিয়মে অন্তরজ ও অন্তরীকরণের মৌলিক সূত্রাবলি",
      "question_text": "৪৭. If $y = \\sec^{2}(\\tan^{-1} x)$, then $\\frac{dy}{dx} = ?$ [IUT'17-18]",
      "options": [
        "$\\frac{2x}{1+x^{2}}$",
        "$\\frac{2x}{\\sqrt{1+x^{2}}}$",
        "$x$",
        "$2x$"
      ],
      "correct_answer": "$2x$",
      "explanation": "$y = \\sec^{2}(\\tan^{-1} x) \\implies y = 1 + \\{\\tan(\\tan^{-1} x)\\}^{2} \\implies y = 1 + x^{2}$\n$$\\frac{dy}{dx} = 2x$$",
      "time_limit": 60
    },
    {
      "id": 185,
      "topic": "৪. মূল নিয়মে অন্তরজ ও অন্তরীকরণের মৌলিক সূত্রাবলি",
      "question_text": "৪৮. যদি $y = \\tan^{-1}\\left(\\frac{\\sqrt{1+\\sin x} - \\sqrt{1-\\sin x}}{\\sqrt{1+\\sin x} + \\sqrt{1-\\sin x}}\\right)$ হয় তাহলে, $\\frac{dy}{dx} = ?$ [KUET'16-17]",
      "options": [
        "$1$",
        "$\\frac{1}{2}$",
        "$-\\frac{1}{2}$",
        "$2$",
        "$4$"
      ],
      "correct_answer": "$\\frac{1}{2}$",
      "explanation": "$y = \\tan^{-1} \\frac{\\sqrt{1+\\sin x} - \\sqrt{1-\\sin x}}{\\sqrt{1+\\sin x} + \\sqrt{1-\\sin x}}$\n$[\\because \\sqrt{1 \\pm \\sin x} = \\sqrt{\\sin^{2} \\frac{x}{2} + \\cos^{2} \\frac{x}{2} \\pm 2\\sin \\frac{x}{2} \\cos \\frac{x}{2}} = \\sqrt{(\\cos \\frac{x}{2} \\pm \\sin \\frac{x}{2})^{2}} = \\cos \\frac{x}{2} \\pm \\sin \\frac{x}{2}]$\n$$\\therefore y = \\tan^{-1} \\frac{2\\sin \\frac{x}{2}}{2\\cos \\frac{x}{2}} = \\tan^{-1} \\tan \\frac{x}{2} = \\frac{x}{2} \\therefore \\frac{dy}{dx} = \\frac{1}{2}$$",
      "time_limit": 60
    },
    {
      "id": 186,
      "topic": "৪. মূল নিয়মে অন্তরজ ও অন্তরীকরণের মৌলিক সূত্রাবলি",
      "question_text": "৪৯. $\\frac{d}{dx} \\tan^{-1} \\sqrt{\\frac{1-\\cos x}{1+\\cos x}} = ?$ [IUT'16-17]",
      "options": [
        "$\\frac{1}{2}$",
        "$-\\frac{1}{2}$",
        "$\\sin \\frac{x}{2}$",
        "$\\cos \\frac{x}{2}$"
      ],
      "correct_answer": "$\\frac{1}{2}$",
      "explanation": "$\\frac{d}{dx} \\tan^{-1} \\sqrt{\\frac{1-\\cos x}{1+\\cos x}} = \\frac{d}{dx} \\tan^{-1} \\sqrt{\\frac{2\\sin^{2} \\frac{x}{2}}{2\\cos^{2} \\frac{x}{2}}}$\n$$= \\frac{d}{dx} \\tan^{-1}\\left(\\tan \\frac{x}{2}\\right) = \\frac{d}{dx}\\left(\\frac{x}{2}\\right) = \\frac{1}{2}$$",
      "time_limit": 60
    },
    {
      "id": 187,
      "topic": "৪. মূল নিয়মে অন্তরজ ও অন্তরীকরণের মৌলিক সূত্রাবলি",
      "question_text": "৫০. যদি $x = \\tan^{-1} \\sqrt{\\frac{1-\\cos \\theta}{1+\\cos \\theta}}$ এবং $y = \\tan^{-1} \\frac{\\cos \\theta}{1+\\sin \\theta}$ হয় তাহলে $\\frac{dy}{dx}$ এর মান কত? [CUET'14-15]",
      "options": [
        "$-1$",
        "$1$",
        "$\\pm 1$",
        "$0$"
      ],
      "correct_answer": "$-1$",
      "explanation": "$x = \\tan^{-1} \\sqrt{\\frac{1-\\cos \\theta}{1+\\cos \\theta}} = \\tan^{-1} \\sqrt{\\frac{2\\sin^{2} \\frac{\\theta}{2}}{2\\cos^{2} \\frac{\\theta}{2}}} = \\tan^{-1}\\left(\\tan \\frac{\\theta}{2}\\right) = \\frac{\\theta}{2}$\n$$y = \\tan^{-1} \\frac{\\cos \\theta}{1+\\sin \\theta} = \\tan^{-1} \\frac{\\cos^{2} \\frac{\\theta}{2} - \\sin^{2} \\frac{\\theta}{2}}{\\cos^{2} \\frac{\\theta}{2} + \\sin^{2} \\frac{\\theta}{2} + 2\\sin \\frac{\\theta}{2} \\cos \\frac{\\theta}{2}} = \\tan^{-1} \\frac{\\cos \\frac{\\theta}{2} - \\sin \\frac{\\theta}{2}}{\\cos \\frac{\\theta}{2} + \\sin \\frac{\\theta}{2}} = \\tan^{-1} \\frac{1 - \\tan \\frac{\\theta}{2}}{1 + \\tan \\frac{\\theta}{2}} = \\frac{\\pi}{4} - \\frac{\\theta}{2} = \\frac{\\pi}{4} - x$$\n$$\\therefore \\frac{dy}{dx} = -1$$",
      "time_limit": 60
    },
    {
      "id": 188,
      "topic": "৪. মূল নিয়মে অন্তরজ ও অন্তরীকরণের মৌলিক সূত্রাবলি",
      "question_text": "৫১. $\\frac{d}{dx}[\\tan^{-1}(\\cot x) + \\cot^{-1}(\\tan x)] = ?$ [RUET'14-15]",
      "options": [
        "$0$",
        "$-1$",
        "$1$",
        "$2$",
        "$-2$"
      ],
      "correct_answer": "$-2$",
      "explanation": "$\\frac{d}{dx}[\\tan^{-1}(\\cot x) + \\cot^{-1}(\\tan x)]$\n$$= \\tan^{-1}\\left\\{\\tan\\left(\\frac{\\pi}{2}-x\\right)\\right\\} + \\cot^{-1}\\left\\{\\cot\\left(\\frac{\\pi}{2}-x\\right)\\right\\}$$\n$$\\therefore \\frac{d}{dx}(\\pi - 2x) = -2$$",
      "time_limit": 60
    },
    {
      "id": 189,
      "topic": "৪. মূল নিয়মে অন্তরজ ও অন্তরীকরণের মৌলিক সূত্রাবলি",
      "question_text": "৫২. $\\tan^{-1}(\\sec x + \\tan x)$ ফাংশনটির অন্তরক কত? [BUTEX'13-14]",
      "options": [
        "$\\frac{1}{2}$",
        "$-1$",
        "$-2\\sin x(d) \\frac{x^{2}}{x^{2}-1}$",
        "$\\frac{x^{2}}{x^{2}-1}$"
      ],
      "correct_answer": "$\\frac{1}{2}$",
      "explanation": "$y = \\tan^{-1}\\left(\\frac{1+\\sin x}{\\cos x}\\right)$\n$$= \\tan^{-1}\\left(\\frac{1+\\cos(\\frac{\\pi}{2}-x)}{\\sin(\\frac{\\pi}{2}-x)}\\right)$$\n$$= \\tan^{-1}\\left(\\frac{2\\cos^{2}(\\frac{\\pi}{4}-\\frac{x}{2})}{2\\sin(\\frac{\\pi}{4}-\\frac{x}{2})\\cos(\\frac{\\pi}{4}-\\frac{x}{2})}\\right)$$\n$$= \\tan^{-1} \\cot\\left(\\frac{\\pi}{4}-\\frac{x}{2}\\right)$$\n$$= \\tan^{-1} \\tan\\left(\\frac{\\pi}{4}+\\frac{x}{2}\\right)$$\n$$y = \\frac{\\pi}{4} + \\frac{x}{2} ; y_{1} = \\frac{1}{2}$$",
      "time_limit": 60
    },
    {
      "id": 190,
      "topic": "৪. মূল নিয়মে অন্তরজ ও অন্তরীকরণের মৌলিক সূত্রাবলি",
      "question_text": "৫৩. If $y = \\cot^{-1} \\frac{x^{2}}{2} + \\cot^{-1} \\frac{2}{x^{2}}$ then $\\frac{dy}{dx} = ?$ [RUET'05-06; IUT'11-12]",
      "options": [
        "$1$",
        "$0$",
        "$e$",
        "$-1$"
      ],
      "correct_answer": "$0$",
      "explanation": "We know, $\\cot^{-1} x + \\cot^{-1} \\frac{1}{x} = \\frac{\\pi}{2}$\nNow $y = \\cot^{-1} \\frac{x^{2}}{2} + \\cot^{-1} \\frac{2}{x^{2}} = \\frac{\\pi}{2} \\therefore \\frac{dy}{dx} = 0$",
      "time_limit": 60
    },
    {
      "id": 191,
      "topic": "৫. সংযোজিত ফাংশনের অন্তরীকরণ ও চেইন রুল",
      "question_text": "১. $\\frac{d}{dx}(e^{\\sqrt{2x-3}}) = \\text{কত}?$ [ঢা. বো. ২০; অনুরূপ প্রশ্ন: য. বো. ২১, ১৯; কু. বো. ২১; রা. বো. ১৭]",
      "options": [
        "$\\sqrt{2}(e^{\\sqrt{2x-3}})$",
        "$\\frac{e^{\\sqrt{2x-3}}}{\\sqrt{2}}$",
        "$\\frac{e^{\\sqrt{2x-3}}}{\\sqrt{2x-3}}$",
        "$\\frac{\\sqrt{2}(e^{\\sqrt{2x-3}})}{\\sqrt{x}}$"
      ],
      "correct_answer": "$\\frac{e^{\\sqrt{2x-3}}}{\\sqrt{2x-3}}$",
      "explanation": "$\\frac{d}{dx}(e^{\\sqrt{2x-3}}) = e^{\\sqrt{2x-3}} \\cdot \\frac{1}{2\\sqrt{2x-3}} \\cdot 2 = \\frac{e^{\\sqrt{2x-3}}}{\\sqrt{2x-3}}$",
      "time_limit": 60
    },
    {
      "id": 192,
      "topic": "৫. সংযোজিত ফাংশনের অন্তরীকরণ ও চেইন রুল",
      "question_text": "২. $f(1) = 6, f'(1) = 3$ হলে, $x = 0$ বিন্দুতে $\\frac{d}{dx}(\\log f(e^{x}))$ এর মান কোনটি? [ঢা. বো. ২০]",
      "options": [
        "$2$",
        "$1$",
        "$\\frac{1}{2}$",
        "$0$"
      ],
      "correct_answer": "$\\frac{1}{2}$",
      "explanation": "$\\frac{d}{dx}(\\log f(e^{x})) = \\frac{1}{f(e^{x})} f'(e^{x}) \\cdot e^{x}$\n$x = 0$ বিন্দুতে, $\\frac{dy}{dx} = \\frac{1}{f(e^{0})} f'(e^{0}) e^{0} = \\frac{1}{f(1)} f'(1) = \\frac{1}{6} \\cdot 3 = \\frac{1}{2}$",
      "time_limit": 60
    },
    {
      "id": 193,
      "topic": "৫. সংযোজিত ফাংশনের অন্তরীকরণ ও চেইন রুল",
      "question_text": "৩. $\\sin \\frac{x}{2}$ এর অন্তরজ কোনটি? [ঢা. বো. ২১; অনুরূপ প্রশ্ন: দি. বো. ২৩; কু. বো. ১৯]",
      "options": [
        "$-\\frac{1}{2}\\cos\\frac{x}{2}$",
        "$-\\frac{1}{2}\\sin\\frac{x}{2}$",
        "$\\frac{1}{2}\\cos\\frac{x}{2}$",
        "$\\frac{1}{2}\\sin\\frac{x}{2}$"
      ],
      "correct_answer": "$\\frac{1}{2}\\cos\\frac{x}{2}$",
      "explanation": "$\\frac{d}{dx}(\\sin\\frac{x}{2}) = \\cos\\frac{x}{2} \\cdot \\frac{d}{dx}(\\frac{x}{2}) = \\frac{1}{2}\\cos\\frac{x}{2}$",
      "time_limit": 60
    },
    {
      "id": 194,
      "topic": "৫. সংযোজিত ফাংশনের অন্তরীকরণ ও চেইন রুল",
      "question_text": "৪. $f(x) = \\frac{1-\\cos x}{1+\\cos x}$ হলে, $f'(x)$ এর মান কত? [য. বো. ২০]",
      "options": [
        "$2\\tan\\frac{x}{2}$",
        "$2\\tan\\frac{x}{2}\\sec^{2}\\frac{x}{2}$",
        "$\\sec^{2}\\frac{x}{2}$",
        "$\\tan\\frac{x}{2}\\sec^{2}\\frac{x}{2}$"
      ],
      "correct_answer": "$\\tan\\frac{x}{2}\\sec^{2}\\frac{x}{2}$",
      "explanation": "$f(x) = \\frac{1-\\cos x}{1+\\cos x} = \\frac{2\\sin^{2}\\frac{x}{2}}{2\\cos^{2}\\frac{x}{2}} = \\tan^{2}\\frac{x}{2}$\n$$\\therefore f'(x) = \\frac{d}{dx}(\\tan^{2}\\frac{x}{2}) = \\frac{d}{dx}((\\tan\\frac{x}{2})^{2})$$\n$$= 2\\tan\\frac{x}{2} \\frac{d}{dx}(\\tan\\frac{x}{2})$$\n$$= 2\\tan\\frac{x}{2}\\sec^{2}\\frac{x}{2} \\frac{d}{dx}(\\frac{x}{2})$$\n$$= 2\\tan\\frac{x}{2}\\sec^{2}\\frac{x}{2}(\\frac{1}{2}) = \\tan\\frac{x}{2}\\sec^{2}\\frac{x}{2}$$",
      "time_limit": 60
    },
    {
      "id": 195,
      "topic": "৫. সংযোজিত ফাংশনের অন্তরীকরণ ও চেইন রুল",
      "question_text": "৫. $\\frac{d}{dx}(\\tan^{-1}(e^{x})) = \\text{কত}?$ [ঢা. বো. ২০]",
      "options": [
        "$\\frac{1}{1+e^{x}}$",
        "$\\frac{e^{x}}{1+e^{x}}$",
        "$\\frac{1}{1+e^{2x}}$",
        "$\\frac{e^{x}}{1+e^{2x}}$"
      ],
      "correct_answer": "$\\frac{e^{x}}{1+e^{2x}}$",
      "explanation": "$\\frac{d}{dx}(\\tan^{-1}(e^{x})) = \\frac{1}{1+(e^{x})^{2}} \\frac{d}{dx}(e^{x}) = \\frac{e^{x}}{1+e^{2x}}$",
      "time_limit": 60
    },
    {
      "id": 196,
      "topic": "৫. সংযোজিত ফাংশনের অন্তরীকরণ ও চেইন রুল",
      "question_text": "৬. $y = \\tan^{-1}\\frac{4x}{1-4x^{2}}$ হলে $\\frac{dy}{dx} = \\text{কত}?$ [ব. বো. ২০; অনুরূপ প্রশ্ন: য. বো. ২১; দি. বো. ১৯]",
      "options": [
        "$\\frac{2}{1+4x^{2}}$",
        "$\\frac{4}{1-4x^{2}}$",
        "$\\frac{4}{1-4x^{2}}$",
        "$\\frac{4}{1+4x^{2}}$"
      ],
      "correct_answer": "$\\frac{4}{1+4x^{2}}$",
      "explanation": "$y = \\tan^{-1}\\frac{2 \\cdot 2x}{1-(2x)^{2}} = 2\\tan^{-1} 2x$\n$$\\frac{dy}{dx} = 2 \\cdot \\frac{1}{1+(2x)^{2}} \\frac{d}{dx}(2x) = \\frac{4}{1+4x^{2}}$$",
      "time_limit": 60
    },
    {
      "id": 197,
      "topic": "৫. সংযোজিত ফাংশনের অন্তরীকরণ ও চেইন রুল",
      "question_text": "৭. $\\sin^{-1} 2x$ এর অন্তরজ কত? [ম. বো. ২০]",
      "options": [
        "$\\frac{2}{\\sqrt{1-4x^{2}}}$",
        "$\\frac{1}{\\sqrt{1-4x^{2}}}$",
        "$\\frac{-2}{\\sqrt{1-4x^{2}}}$",
        "$\\frac{1}{2\\sqrt{1-4x^{2}}}$"
      ],
      "correct_answer": "$\\frac{2}{\\sqrt{1-4x^{2}}}$",
      "explanation": "$\\frac{d}{dx}(\\sin^{-1} 2x) = \\frac{1}{\\sqrt{1-(2x)^{2}}} \\frac{d}{dx}(2x) = \\frac{2}{\\sqrt{1-4x^{2}}}$",
      "time_limit": 60
    },
    {
      "id": 198,
      "topic": "৫. সংযোজিত ফাংশনের অন্তরীকরণ ও চেইন রুল",
      "question_text": "৮. $\\frac{d}{dx}(e^{x^{2}\\ln x})$ এর মান কোনটি? [কু. বো. ২৫]",
      "options": [
        "$e^{x^{2}\\ln x}(x+\\ln x)$",
        "$e^{x^{2}\\ln x} \\cdot \\frac{1}{x}$",
        "$e^{x^{2}\\ln x}(x^{2}+\\frac{1}{x})$",
        "$e^{x^{2}\\ln x}(x+2x\\ln x)$"
      ],
      "correct_answer": "$e^{x^{2}\\ln x}(x+2x\\ln x)$",
      "explanation": "$\\frac{d}{dx}(e^{x^{2}\\ln x}) = e^{x^{2}\\ln x} \\frac{d}{dx}(x^{2}\\ln x) = e^{x^{2}\\ln x}(x^{2} \\cdot \\frac{1}{x} + \\ln x \\cdot 2x) = e^{x^{2}\\ln x}(x+2x\\ln x)$",
      "time_limit": 60
    },
    {
      "id": 199,
      "topic": "৫. সংযোজিত ফাংশনের অন্তরীকরণ ও চেইন রুল",
      "question_text": "৯. $x$-এর সাপেক্ষে $e^{\\sin^{2} x}$ এর অন্তরজ কোনটি? [ঢা. বো. ২২; অনুরূপ প্রশ্ন: কু. বো. ১৭]",
      "options": [
        "$e^{\\sin^{2} x} \\cdot \\sin 2x$",
        "$2e^{\\sin^{2} x} \\cdot \\sin x$",
        "$-e^{\\sin^{2} x} \\cdot \\sin 2x$",
        "$e^{\\sin^{2} x}$"
      ],
      "correct_answer": "$e^{\\sin^{2} x} \\cdot \\sin 2x$",
      "explanation": "$\\frac{d}{dx}(e^{\\sin^{2} x}) = e^{\\sin^{2} x} \\cdot 2\\sin x \\cdot \\cos x = e^{\\sin^{2} x} \\cdot \\sin 2x$",
      "time_limit": 60
    },
    {
      "id": 200,
      "topic": "৫. সংযোজিত ফাংশনের অন্তরীকরণ ও চেইন রুল",
      "question_text": "১০. $\\frac{d}{dx}(\\sin^{2} x^{2})$ এর মান কত? [ঘ. বো. ২২]",
      "options": [
        "$2\\sin x^{2}$",
        "$2x\\sin x^{2}$",
        "$2x\\sin 2x^{2}$",
        "$2x^{2}\\sin 2x^{2}$"
      ],
      "correct_answer": "$2x\\sin 2x^{2}$",
      "explanation": "$\\frac{dy}{dx} = \\frac{d}{dx}(\\sin x^{2})^{2} = 2\\sin x^{2} \\cdot \\cos x^{2} \\cdot 2x$\n$$= 2x \\cdot 2\\sin x^{2} \\cos x^{2} = 2x\\sin 2x^{2} \\quad [\\because 2\\sin\\theta \\cos\\theta = \\sin 2\\theta]$$",
      "time_limit": 60
    },
    {
      "id": 201,
      "topic": "৫. সংযোজিত ফাংশনের অন্তরীকরণ ও চেইন রুল",
      "question_text": "১১. $y = (x^{2}+1)\\tan^{-1} x - x$ হলে $\\frac{dy}{dx} = ?$ [য. বো. ২২]",
      "options": [
        "$2\\tan^{-1} x$",
        "$2x\\tan^{-1} x$",
        "$x\\tan^{-1} x$",
        "$\\frac{2x}{1+x^{2}}$"
      ],
      "correct_answer": "$2x\\tan^{-1} x$",
      "explanation": "$\\frac{dy}{dx} = \\frac{d}{dx}((x^{2}+1)\\tan^{-1} x - x)$\n$$= (x^{2}+1)\\frac{1}{1+x^{2}} + \\tan^{-1} x(2x+0) - 1$$\n$$= 1 + 2x\\tan^{-1} x - 1 = 2x\\tan^{-1} x$$",
      "time_limit": 60
    },
    {
      "id": 202,
      "topic": "৫. সংযোজিত ফাংশনের অন্তরীকরণ ও চেইন রুল",
      "question_text": "১২. $y = \\sqrt{\\sec 2x}$ হলে $\\frac{dy}{dx}$ কোনটি? [ব. বো. ২২]",
      "options": [
        "$y\\tan 2x$",
        "$2\\tan 2x$",
        "$\\frac{\\tan 2x}{2}$",
        "$y\\cot 2x$"
      ],
      "correct_answer": "$y\\tan 2x$",
      "explanation": "$y = \\sqrt{\\sec 2x}$\n$$\\implies \\frac{dy}{dx} = \\frac{1}{2\\sqrt{\\sec 2x}} \\frac{d}{dx}(\\sec 2x) = \\frac{1 \\times \\sec 2x \\tan 2x \\times 2}{2\\sqrt{\\sec 2x}}$$\n$$= \\tan 2x \\cdot \\sqrt{\\sec 2x} \\quad [y = \\sqrt{\\sec 2x}] = y\\tan 2x$$",
      "time_limit": 60
    },
    {
      "id": 203,
      "topic": "৫. সংযোজিত ফাংশনের অন্তরীকরণ ও চেইন রুল",
      "question_text": "১৩. $\\frac{d}{dx} \\cot(2\\sqrt{x}) = \\text{কত}?$ [রা. বো. ২১]",
      "options": [
        "$\\frac{-\\text{cosec}^{2}(2\\sqrt{x})}{2\\sqrt{x}}$",
        "$\\frac{-\\text{cosec}^{2}(2\\sqrt{x})}{\\sqrt{x}}$",
        "$-\\text{cosec}^{2}(2\\sqrt{x})$",
        "$\\frac{\\text{cosec}^{2}(2\\sqrt{x})}{2\\sqrt{x}}$"
      ],
      "correct_answer": "$\\frac{-\\text{cosec}^{2}(2\\sqrt{x})}{\\sqrt{x}}$",
      "explanation": "$\\frac{d}{dx}(\\cot(2\\sqrt{x})) = -\\text{cosec}^{2}(2\\sqrt{x}) \\frac{d}{dx}(2\\sqrt{x})$\n$$= -\\text{cosec}^{2}(2\\sqrt{x}) \\times 2 \\times \\frac{1}{2\\sqrt{x}} = \\frac{-\\text{cosec}^{2}(2\\sqrt{x})}{\\sqrt{x}}$$",
      "time_limit": 60
    },
    {
      "id": 204,
      "topic": "৫. সংযোজিত ফাংশনের অন্তরীকরণ ও চেইন রুল",
      "question_text": "১৪. $\\cos\\sqrt{x}$ এর অন্তরক সহগ কোনটি? [কু. বো. ২১; অনুরূপ প্রশ্ন: ঢা. বো. ১৭]",
      "options": [
        "$-\\sin\\sqrt{x}$",
        "$-\\frac{\\sin\\sqrt{x}}{\\sqrt{x}}$",
        "$-\\frac{\\sin\\sqrt{x}}{2\\sqrt{x}}$",
        "$\\frac{\\sin\\sqrt{x}}{2\\sqrt{x}}$"
      ],
      "correct_answer": "$-\\frac{\\sin\\sqrt{x}}{2\\sqrt{x}}$",
      "explanation": "$y = \\cos\\sqrt{x}$\n$$\\implies \\frac{dy}{dx} = -\\sin\\sqrt{x} \\times \\frac{1}{2\\sqrt{x}} = -\\frac{\\sin\\sqrt{x}}{2\\sqrt{x}}$$",
      "time_limit": 60
    },
    {
      "id": 205,
      "topic": "৫. সংযোজিত ফাংশনের অন্তরীকরণ ও চেইন রুল",
      "question_text": "১৫. $\\frac{d}{dx}(\\cos 7x^{\\circ}) = \\text{কত}?$ [য. বো. ২১]",
      "options": [
        "$\\sin 7x^{\\circ}$",
        "$-7\\sin 7x^{\\circ}$",
        "$-\\frac{7\\pi}{180}\\sin 7x^{\\circ}$",
        "$\\frac{7\\pi}{180}\\sin 7x^{\\circ}$"
      ],
      "correct_answer": "$-\\frac{7\\pi}{180}\\sin 7x^{\\circ}$",
      "explanation": "$\\cos 7x^{\\circ} = \\cos(7x \\cdot \\frac{\\pi}{180})$\n$$\\therefore \\frac{d}{dx}(\\cos 7x^{\\circ}) = \\frac{d}{dx}(\\cos\\frac{7\\pi x}{180}) = -\\frac{7\\pi}{180}\\sin\\frac{7\\pi x}{180} = -\\frac{7\\pi}{180}\\sin 7x^{\\circ}$$",
      "time_limit": 60
    },
    {
      "id": 206,
      "topic": "৫. সংযোজিত ফাংশনের অন্তরীকরণ ও চেইন রুল",
      "question_text": "১৬. $x$ এর সাপেক্ষে $\\tan^{-1} 3x$ এর অন্তরজ- [ব. বো. ২১]",
      "options": [
        "$\\frac{1}{1+3x^{2}}$",
        "$\\frac{3}{1+3x^{2}}$",
        "$\\frac{1}{1+9x^{2}}$",
        "$\\frac{3}{1+9x^{2}}$"
      ],
      "correct_answer": "$\\frac{3}{1+9x^{2}}$",
      "explanation": "$\\frac{d}{dx}(\\tan^{-1} 3x) = \\frac{1}{1+(3x)^{2}} \\frac{d}{dx}(3x) = \\frac{3}{1+9x^{2}}$",
      "time_limit": 60
    },
    {
      "id": 207,
      "topic": "৫. সংযোজিত ফাংশনের অন্তরীকরণ ও চেইন রুল",
      "question_text": "১৭. $\\frac{d}{dx}(\\frac{1}{\\ln x}) = \\text{কত}?$ [ব. বো. ২৫]",
      "options": [
        "$\\frac{1}{x(\\ln x)^{2}}$",
        "$-\\frac{1}{x(\\ln x)^{2}}$",
        "$\\frac{1}{x}$",
        "$x$"
      ],
      "correct_answer": "$-\\frac{1}{x(\\ln x)^{2}}$",
      "explanation": "$\\frac{d}{dx}(\\frac{1}{\\ln x}) = \\frac{d}{dx}((\\ln x)^{-1}) = -(\\ln x)^{-2} \\cdot \\frac{1}{x} = -\\frac{1}{x(\\ln x)^{2}}$",
      "time_limit": 60
    },
    {
      "id": 208,
      "topic": "৫. সংযোজিত ফাংশনের অন্তরীকরণ ও চেইন রুল",
      "question_text": "১৮. $x$ এর সাপেক্ষে $\\ln ax$-এর অন্তরজ- [চ. বো. ২১]",
      "options": [
        "$\\frac{1}{x}$",
        "$\\frac{a}{x}$",
        "$\\frac{1}{a}$",
        "$\\frac{1}{ax}$"
      ],
      "correct_answer": "$\\frac{1}{x}$",
      "explanation": "$\\frac{d}{dx}(\\ln ax) = \\frac{1}{ax} \\cdot a = \\frac{1}{x}$",
      "time_limit": 60
    },
    {
      "id": 209,
      "topic": "৫. সংযোজিত ফাংশনের অন্তরীকরণ ও চেইন রুল",
      "question_text": "১৯. $\\frac{d}{dx}(a^{x} e^{x})$ এর মান কোনটি? [কু. বো. ২৫]",
      "options": [
        "$a^{x} e^{x}$",
        "$a^{x} e^{x} \\ln a$",
        "$a^{x} e^{x} (1+\\ln a)$",
        "$a^{x} \\ln a$"
      ],
      "correct_answer": "$a^{x} e^{x} (1+\\ln a)$",
      "explanation": "$\\frac{d}{dx}(a^{x} e^{x}) = a^{x} e^{x} + e^{x} \\cdot a^{x} \\ln a = a^{x} e^{x}(1+\\ln a)$",
      "time_limit": 60
    },
    {
      "id": 210,
      "topic": "৫. সংযোজিত ফাংশনের অন্তরীকরণ ও চেইন রুল",
      "question_text": "২০. $y = \\sin\\sqrt{x}$ হলে $\\frac{dy}{dx}$ এর মান কোনটি? [ঢা. বো. ১৯]",
      "options": [
        "$\\frac{\\cos\\sqrt{x}}{2\\sqrt{x}}$",
        "$\\frac{\\sin\\sqrt{x}}{2\\sqrt{x}}$",
        "$\\frac{\\cos\\sqrt{x}}{\\sqrt{x}}$",
        "$\\frac{\\sin\\sqrt{x}}{\\sqrt{x}}$"
      ],
      "correct_answer": "$\\frac{\\cos\\sqrt{x}}{2\\sqrt{x}}$",
      "explanation": "$\\frac{dy}{dx} = \\cos\\sqrt{x} \\times \\frac{1}{2\\sqrt{x}} = \\frac{\\cos\\sqrt{x}}{2\\sqrt{x}}$",
      "time_limit": 60
    },
    {
      "id": 211,
      "topic": "৫. সংযোজিত ফাংশনের অন্তরীকরণ ও চেইন রুল",
      "question_text": "২১. $f(x) = \\ln(\\ln 2x)$ হলে $f'(x) = \\text{কত}?$ [যে. বো. ১৯; অনুরূপ প্রশ্ন: য. বো. ২১]",
      "options": [
        "$\\frac{1}{x\\ln 2x}$",
        "$\\frac{2}{x\\ln 2x}$",
        "$\\frac{1}{2x\\ln 2x}$",
        "$\\frac{2x}{\\ln 2x}$"
      ],
      "correct_answer": "$\\frac{1}{x\\ln 2x}$",
      "explanation": "$f(x) = \\ln(\\ln 2x)$\n$$\\implies f'(x) = \\frac{1}{\\ln 2x} \\times \\frac{1}{2x} \\times 2 = \\frac{1}{x\\ln 2x}$$",
      "time_limit": 60
    },
    {
      "id": 212,
      "topic": "৫. সংযোজিত ফাংশনের অন্তরীকরণ ও চেইন রুল",
      "question_text": "২২. যদি $f(x) = \\sin x$ হয় তবে $f(\\cos^{-1} x)$ এর অন্তরজ কোনটি? [য. বো. ১৯]",
      "options": [
        "$\\frac{-x}{2\\sqrt{1-x^{2}}}$",
        "$\\frac{-1}{2\\sqrt{1-x^{2}}}$",
        "$\\frac{x}{\\sqrt{1-x^{2}}}$",
        "$\\frac{-x}{\\sqrt{1-x^{2}}}$"
      ],
      "correct_answer": "$\\frac{-x}{\\sqrt{1-x^{2}}}$",
      "explanation": "$f(x) = \\sin x$\n$$f(\\cos^{-1} x) = \\sin(\\cos^{-1} x)$$\n$$\\therefore \\frac{d}{dx}(f(\\cos^{-1} x)) = \\cos(\\cos^{-1} x) \\cdot \\frac{-1}{\\sqrt{1-x^{2}}} = x \\cdot \\frac{-1}{\\sqrt{1-x^{2}}} = \\frac{-x}{\\sqrt{1-x^{2}}}$$",
      "time_limit": 60
    },
    {
      "id": 213,
      "topic": "৫. সংযোজিত ফাংশনের অন্তরীকরণ ও চেইন রুল",
      "question_text": "২৩. $f(x) = \\sin^{-1}\\frac{2x}{1+x^{2}}$ এবং $g(x) = \\tan^{-1}(\\tan\\sqrt{x})$ হলে- [রা. বো. ২৫]\ni. $f'(x) = \\frac{2}{1+x^{2}}$\nii. $g'(x) = \\frac{1}{\\sqrt{x}}$\niii. $f(\\frac{1}{\\sqrt{3}}) = \\frac{\\pi}{3}$\nনিচের কোনটি সঠিক?",
      "options": [
        "i ও ii",
        "i ও iii",
        "ii ও iii",
        "i, ii ও iii"
      ],
      "correct_answer": "i ও iii",
      "explanation": "(i) $f(x) = \\sin^{-1}\\frac{2x}{1+x^{2}} = 2\\tan^{-1} x \\therefore f'(x) = \\frac{2}{1+x^{2}}$\n(ii) $g(x) = \\tan^{-1}(\\tan\\sqrt{x}) = \\sqrt{x} \\therefore g'(x) = \\frac{1}{2\\sqrt{x}}$\n(iii) $f(\\frac{1}{\\sqrt{3}}) = 2\\tan^{-1}(\\frac{1}{\\sqrt{3}}) = 2 \\cdot \\frac{\\pi}{6} = \\frac{\\pi}{3}$",
      "time_limit": 60
    },
    {
      "id": 214,
      "topic": "৫. সংযোজিত ফাংশনের অন্তরীকরণ ও চেইন রুল",
      "question_text": "২৪. $x$ এর সাপেক্ষে $\\sin^{2}(2\\ln x)^{2}$ এর অন্তরজ কোনটি? [JU'25-26]",
      "options": [
        "$\\frac{8\\ln x \\sin(8(\\ln x)^{2})}{x}$",
        "$\\frac{2\\ln x \\sin(2(\\ln x)^{2})}{x}$",
        "$\\frac{4\\ln x \\sin(2(\\ln x)^{2})}{x}$",
        "$\\frac{8\\ln x \\sin(4(\\ln x)^{2})}{x}$"
      ],
      "correct_answer": "$\\frac{8\\ln x \\sin(8(\\ln x)^{2})}{x}$",
      "explanation": "$\\frac{d}{dx}[\\sin^{2}(2\\ln x)^{2}]$\n$$= 2\\sin((2\\ln x)^{2}) \\cdot \\cos((2\\ln x)^{2}) \\cdot \\frac{d}{dx}(4(\\ln x)^{2})$$\n$$= \\sin(2(2\\ln x)^{2}) \\cdot 8\\ln x \\cdot \\frac{1}{x}$$\n$$= \\sin(8(\\ln x)^{2}) \\cdot \\frac{8\\ln x}{x}$$",
      "time_limit": 60
    },
    {
      "id": 215,
      "topic": "৫. সংযোজিত ফাংশনের অন্তরীকরণ ও চেইন রুল",
      "question_text": "২৫. $f(x) = \\sqrt{1-\\sqrt{x}}$ হলে, $\\frac{df}{dx} = ?$ [DU'24-25]",
      "options": [
        "$\\frac{1}{4\\sqrt{x}\\sqrt{1-\\sqrt{x}}}$",
        "$-\\frac{1}{2\\sqrt{x}\\sqrt{1-\\sqrt{x}}}$",
        "$\\frac{1}{2\\sqrt{x}\\sqrt{1-\\sqrt{x}}}$",
        "$-\\frac{1}{4\\sqrt{x}\\sqrt{1-\\sqrt{x}}}$"
      ],
      "correct_answer": "$-\\frac{1}{4\\sqrt{x}\\sqrt{1-\\sqrt{x}}}$",
      "explanation": "$f(x) = \\sqrt{1-\\sqrt{x}} ; \\frac{df}{dx} = \\frac{1}{2\\sqrt{1-\\sqrt{x}}} \\frac{d}{dx}(1-\\sqrt{x}) = \\frac{1}{2\\sqrt{1-\\sqrt{x}}} (-\\frac{1}{2\\sqrt{x}}) = -\\frac{1}{4\\sqrt{x}\\sqrt{1-\\sqrt{x}}}$",
      "time_limit": 60
    },
    {
      "id": 216,
      "topic": "৫. সংযোজিত ফাংশনের অন্তরীকরণ ও চেইন রুল",
      "question_text": "২৬. $\\frac{d}{dx}(\\ln(ax^{2}))$ এর মান কোনটি? [JU'24-25]",
      "options": [
        "$\\frac{1}{x^{2}}$",
        "$\\frac{2a}{x}$",
        "$\\frac{2}{x}$",
        "$\\frac{2}{x^{2}}$"
      ],
      "correct_answer": "$\\frac{2}{x}$",
      "explanation": "$\\frac{d}{dx}(\\ln(ax^{2})) = \\frac{1}{ax^{2}} \\cdot \\frac{d}{dx}(ax^{2}) = \\frac{1}{ax^{2}} \\cdot 2ax = \\frac{2}{x}$",
      "time_limit": 60
    },
    {
      "id": 217,
      "topic": "৫. সংযোজিত ফাংশনের অন্তরীকরণ ও চেইন রুল",
      "question_text": "২৭. $y = 2x^{2} + e^{\\sin x}$ হলে $\\frac{dy}{dt} = ?$ [CU'24-25]",
      "options": [
        "$4x$",
        "$0$",
        "$1$",
        "$4x + \\cos x e^{\\sin x}$"
      ],
      "correct_answer": "$0$",
      "explanation": "$\\frac{dy}{dt} = \\frac{d}{dt}(2x^{2} + e^{\\sin x}) = 0$",
      "time_limit": 60
    },
    {
      "id": 218,
      "topic": "৫. সংযোজিত ফাংশনের অন্তরীকরণ ও চেইন রুল",
      "question_text": "২৮. $\\frac{d}{dx}(\\log_{x} e) = ?$ [KU'24-25]",
      "options": [
        "$\\frac{\\log_{x} e}{x}$",
        "$\\frac{1}{x\\ln x}$",
        "$-\\frac{\\ln x}{x}$",
        "$-\\frac{1}{x(\\ln x)^{2}}$"
      ],
      "correct_answer": "$-\\frac{1}{x(\\ln x)^{2}}$",
      "explanation": "$\\frac{d}{dx}(\\log_{x} e) = \\frac{d}{dx}(\\frac{1}{\\ln x}) = -(\\ln x)^{-2} \\cdot \\frac{1}{x} = -\\frac{1}{x(\\ln x)^{2}}$",
      "time_limit": 60
    },
    {
      "id": 219,
      "topic": "৫. সংযোজিত ফাংশনের অন্তরীকরণ ও চেইন রুল",
      "question_text": "২৯. $y = e^{2x}$ হলে $\\frac{dy}{dx}$ এর মান কত? [HSTU'24-25]",
      "options": [
        "$e^{2x}$",
        "$2e^{2x}$",
        "$\\frac{1}{2} e^{2x}$",
        "$d e^{x}$"
      ],
      "correct_answer": "$2e^{2x}$",
      "explanation": "$\\frac{dy}{dx} = \\frac{d(e^{2x})}{dx} = 2e^{2x}$",
      "time_limit": 60
    },
    {
      "id": 220,
      "topic": "৫. সংযোজিত ফাংশনের অন্তরীকরণ ও চেইন রুল",
      "question_text": "৩০. $e^{y} = \\tan^{-1} x$ হলে $\\frac{dx}{dy} = ?$ [GST'22-23]",
      "options": [
        "$\\sqrt{1+x^{2}}\\tan^{-1} x$",
        "$(1+x^{2})\\tan^{-1} x$",
        "$\\sqrt{1-x^{2}}\\tan^{-1} x$",
        "$(1-x^{2})\\tan^{-1} x$"
      ],
      "correct_answer": "$(1+x^{2})\\tan^{-1} x$",
      "explanation": "$e^{y} = \\tan^{-1} x \\implies \\ln e^{y} = \\ln(\\tan^{-1} x) \\implies y\\ln e = \\ln(\\tan^{-1} x) \\implies y = \\ln(\\tan^{-1} x)$\n$$\\therefore \\frac{dy}{dx} = \\frac{d}{dx}[\\ln(\\tan^{-1} x)] = \\frac{1}{\\tan^{-1} x} \\cdot \\frac{1}{1+x^{2}}$$\n$$\\implies \\frac{dx}{dy} = \\frac{1}{\\frac{dy}{dx}} = (1+x^{2})\\tan^{-1} x$$",
      "time_limit": 60
    },
    {
      "id": 221,
      "topic": "৫. সংযোজিত ফাংশনের অন্তরীকরণ ও চেইন রুল",
      "question_text": "৩১. $\\frac{d}{dx}(\\cos\\sqrt{x})$ এর মান কোনটি? [JU'22-23, 21-22, 19-20]",
      "options": [
        "$-\\sin\\sqrt{x}$",
        "$\\frac{-\\sin\\sqrt{x}}{2\\sqrt{x}}$",
        "$-\\frac{\\sin\\sqrt{x}}{\\sqrt{x}}$",
        "$\\frac{\\sin\\sqrt{x}}{2\\sqrt{x}}$"
      ],
      "correct_answer": "$\\frac{-\\sin\\sqrt{x}}{2\\sqrt{x}}$",
      "explanation": "$\\frac{d}{dx}[\\cos\\sqrt{x}] = \\frac{d}{d\\sqrt{x}}[\\cos\\sqrt{x}] \\times \\frac{d(\\sqrt{x})}{dx} = -\\sin\\sqrt{x} \\times \\frac{1}{2\\sqrt{x}} = \\frac{-\\sin\\sqrt{x}}{2\\sqrt{x}}$",
      "time_limit": 60
    },
    {
      "id": 222,
      "topic": "৫. সংযোজিত ফাংশনের অন্তরীকরণ ও চেইন রুল",
      "question_text": "৩২. $y = \\log_{x} a^{5}$ হলে, $\\frac{dy}{dx} = \\text{কত}?$ [GST'21-22]",
      "options": [
        "$5x\\ln a$",
        "$\\frac{5\\ln a}{x(\\ln x)^{2}}$",
        "$\\frac{-\\ln a^{5}}{x\\ln x}$",
        "$\\frac{-5\\ln a}{x(\\ln x)^{2}}$"
      ],
      "correct_answer": "$\\frac{-5\\ln a}{x(\\ln x)^{2}}$",
      "explanation": "$y = \\log_{x} a^{5} = 5\\log_{x} a = 5\\log_{x} e \\times \\log_{e} a = \\frac{5\\ln a}{\\log_{e} x} = \\frac{5\\ln a}{\\ln x}$\n$$\\therefore \\frac{dy}{dx} = \\frac{d}{dx}(\\frac{5\\ln a}{\\ln x}) = 5\\ln a \\times (-1)(\\ln x)^{-2} \\times \\frac{1}{x} = -\\frac{5\\ln a}{x(\\ln x)^{2}}$$",
      "time_limit": 60
    },
    {
      "id": 223,
      "topic": "৫. সংযোজিত ফাংশনের অন্তরীকরণ ও চেইন রুল",
      "question_text": "৩৩. $\\frac{d}{dx}[\\ln(e^{x} + e^{-x})] = \\text{কত}?$ [JU'21-22, 18-19]",
      "options": [
        "$\\frac{e^{x}}{e^{x}+e^{-x}}$",
        "$\\frac{e^{-x}}{e^{x}+e^{-x}}$",
        "$\\frac{e^{x}-e^{-x}}{e^{x}+e^{-x}}$",
        "$\\frac{e^{-x}-e^{x}}{e^{x}+e^{-x}}$"
      ],
      "correct_answer": "$\\frac{e^{x}-e^{-x}}{e^{x}+e^{-x}}$",
      "explanation": "$\\frac{d}{dx}[\\ln(e^{x} + e^{-x})] = \\frac{1}{e^{x}+e^{-x}} \\frac{d}{dx}(e^{x}+e^{-x}) = \\frac{e^{x}-e^{-x}}{e^{x}+e^{-x}}$",
      "time_limit": 60
    },
    {
      "id": 224,
      "topic": "৫. সংযোজিত ফাংশনের অন্তরীকরণ ও চেইন রুল",
      "question_text": "৩৪. $\\frac{d}{dx}(\\cos^{2}(\\ln x)) = ?$ [DU'20-21]",
      "options": [
        "$-\\frac{\\sin(2\\ln x)}{2}$",
        "$-\\frac{2\\cos(\\ln x)}{x}$",
        "$-\\frac{\\sin(2\\ln x)}{x}$",
        "$2\\cos(\\ln x)\\sin(\\ln x)$"
      ],
      "correct_answer": "$-\\frac{\\sin(2\\ln x)}{x}$",
      "explanation": "$\\frac{d}{dx}(\\cos^{2}(\\ln x)) = 2\\cos(\\ln x)(-\\sin(\\ln x))\\frac{1}{x} = -\\frac{2\\sin(\\ln x)\\cos(\\ln x)}{x} = \\frac{-\\sin(2\\ln x)}{x}$",
      "time_limit": 60
    },
    {
      "id": 225,
      "topic": "৫. সংযোজিত ফাংশনের অন্তরীকরণ ও চেইন রুল",
      "question_text": "৩৫. $y = \\log\\sin x^{2}$ হলে $\\frac{dy}{dx}$ এর মান কোনটি? [CU'20-21]",
      "options": [
        "$2x\\cot x^{2}$",
        "$2x\\cot x$",
        "$\\frac{1}{\\sin x^{2}}$",
        "$\\frac{1}{\\cos x^{2}}$"
      ],
      "correct_answer": "$2x\\cot x^{2}$",
      "explanation": "$y = \\log\\sin x^{2} \\implies \\frac{dy}{dx} = \\frac{1}{\\sin x^{2}} \\frac{d}{dx}(\\sin x^{2}) = \\frac{1}{\\sin x^{2}} \\times \\cos x^{2} \\times \\frac{d}{dx}(x^{2}) = \\frac{\\cos x^{2}}{\\sin x^{2}} \\cdot 2x = 2x\\cot x^{2}$",
      "time_limit": 60
    },
    {
      "id": 226,
      "topic": "৫. সংযোজিত ফাংশনের অন্তরীকরণ ও চেইন রুল",
      "question_text": "৩৬. $\\frac{d}{dx}(\\sqrt{e^{-x}}) = ?$ [CU'20-21]",
      "options": [
        "$-\\frac{1}{2}e^{-x}$",
        "$\\frac{1}{2}e^{-x}$",
        "$\\frac{1}{2}e^{x}$",
        "$-\\frac{1}{2}e^{x}$"
      ],
      "correct_answer": "সঠিক উত্তর নেই",
      "explanation": "$\\frac{d}{dx}(\\sqrt{e^{-x}}) = \\frac{1}{2\\sqrt{e^{-x}}} \\frac{d}{dx}(e^{-x}) = \\frac{1}{2\\sqrt{e^{-x}}} (-e^{-x}) = -\\frac{1}{2}\\sqrt{e^{-x}} = -\\frac{1}{2}e^{-\\frac{x}{2}}$\nসুতরাং সঠিক উত্তর নেই।",
      "time_limit": 60
    },
    {
      "id": 227,
      "topic": "৫. সংযোজিত ফাংশনের অন্তরীকরণ ও চেইন রুল",
      "question_text": "৩৭. $y = \\ln\\cos x^{\\circ}$ হলে, $\\frac{dy}{dx} = \\text{কত}?$ [RU'17-18]",
      "options": [
        "$-\\tan x^{\\circ}$",
        "$\\tan x^{\\circ}$",
        "$\\frac{\\pi}{180}\\tan x^{\\circ}$",
        "$-\\frac{\\pi}{180}\\tan x^{\\circ}$"
      ],
      "correct_answer": "$-\\frac{\\pi}{180}\\tan x^{\\circ}$",
      "explanation": "$\\frac{dy}{dx} = \\frac{1}{\\cos x^{\\circ}} \\times (-\\sin x^{\\circ}) \\times \\frac{\\pi}{180} = \\frac{-\\pi\\tan x^{\\circ}}{180}$",
      "time_limit": 60
    },
    {
      "id": 228,
      "topic": "৫. সংযোজিত ফাংশনের অন্তরীকরণ ও চেইন রুল",
      "question_text": "৩৮. $y = e^{1+\\log x}$ হলে, $\\frac{dy}{dx}$ এর মান কত? [RU'17-18; CU'13-14]",
      "options": [
        "$e^{1+\\log x}$",
        "$\\frac{1}{x} e^{1+\\log x}$",
        "$\\frac{1}{ex}(1+\\log x)$",
        "$e$"
      ],
      "correct_answer": "$\\frac{1}{x} e^{1+\\log x}$",
      "explanation": "$y = e^{1+\\log x} \\implies \\ln y = 1+\\ln x \\implies \\frac{1}{y} \\frac{dy}{dx} = \\frac{1}{x} \\implies \\frac{dy}{dx} = \\frac{y}{x} = \\frac{e^{1+\\log x}}{x} = \\frac{e \\cdot e^{\\log x}}{x} = \\frac{ex}{x} = e$",
      "time_limit": 60
    },
    {
      "id": 229,
      "topic": "৫. সংযোজিত ফাংশনের অন্তরীকরণ ও চেইন রুল",
      "question_text": "৩৯. $y = \\ln(\\ln x)$ হলে, $\\frac{dy}{dx}$ এর মান কত? [JU'16-17]",
      "options": [
        "$\\frac{1}{\\ln x}$",
        "$\\frac{1}{x\\ln x}$",
        "$\\frac{1}{\\ln^{2} x}$",
        "কোনটিই নয়"
      ],
      "correct_answer": "$\\frac{1}{x\\ln x}$",
      "explanation": "$y = \\ln(\\ln x) \\implies \\frac{dy}{dx} = \\frac{1}{\\ln x} \\cdot \\frac{d}{dx}(\\ln x) = \\frac{1}{x\\ln x}$",
      "time_limit": 60
    },
    {
      "id": 230,
      "topic": "৫. সংযোজিত ফাংশনের অন্তরীকরণ ও চেইন রুল",
      "question_text": "৪০. $y = e^{5-2x}$ হলে, $\\frac{dy}{dx}$ এর মান কত? [JU'16-17]",
      "options": [
        "$e^{5-2x}$",
        "$2e^{5-2x}$",
        "$-2e^{5-2x}$",
        "$(5-2x)e^{5-2x}$"
      ],
      "correct_answer": "$-2e^{5-2x}$",
      "explanation": "$\\frac{dy}{dx} = \\frac{d}{dx}(e^{5-2x}) = e^{5-2x} \\cdot (-2) = -2e^{5-2x}$",
      "time_limit": 60
    },
    {
      "id": 231,
      "topic": "৫. সংযোজিত ফাংশনের অন্তরীকরণ ও চেইন রুল",
      "question_text": "৪১. $y = x\\log_{e} x$ হলে, $\\frac{dy}{dx} = ?$ [CU'16-17]",
      "options": [
        "$\\log_{e} x + \\log_{e} e$",
        "$\\log_{e} x$",
        "$\\log_{e} x + 1$",
        "$1$"
      ],
      "correct_answer": "$\\log_{e} x + \\log_{e} e$",
      "explanation": "$y = x\\log_{e} x = x\\log_{e} e \\times \\log_{e} x = (\\log_{e} e) x\\ln x$\n$$\\therefore \\frac{dy}{dx} = \\log_{e} e (\\ln x + x \\cdot \\frac{1}{x}) = \\log_{e} x + \\log_{e} e$$",
      "time_limit": 60
    },
    {
      "id": 232,
      "topic": "৫. সংযোজিত ফাংশনের অন্তরীকরণ ও চেইন রুল",
      "question_text": "৪২. $\\frac{d}{dx}[\\log\\tan(\\frac{\\pi}{4} + \\frac{x}{2})] = ?$ [CU'16-17]",
      "options": [
        "$\\sec x$",
        "$2\\sec x$",
        "$\\sec x \\tan x$",
        "$\\frac{1}{2}\\sec(\\frac{\\pi}{4}+\\frac{x}{2})$"
      ],
      "correct_answer": "$\\sec x$",
      "explanation": "$\\frac{d}{dx}[\\log\\tan(\\frac{\\pi}{4}+\\frac{x}{2})] = \\frac{1}{\\tan(\\frac{\\pi}{4}+\\frac{x}{2})} \\cdot \\sec^{2}(\\frac{\\pi}{4}+\\frac{x}{2}) \\cdot \\frac{1}{2} = \\frac{\\cos(\\frac{\\pi}{4}+\\frac{x}{2})}{\\sin(\\frac{\\pi}{4}+\\frac{x}{2})} \\cdot \\frac{1}{\\cos^{2}(\\frac{\\pi}{4}+\\frac{x}{2})} \\cdot \\frac{1}{2}$\n$$= \\frac{1}{2\\sin(\\frac{\\pi}{4}+\\frac{x}{2})\\cos(\\frac{\\pi}{4}+\\frac{x}{2})} = \\frac{1}{\\sin(\\frac{\\pi}{2}+x)} = \\frac{1}{\\cos x} = \\sec x$$",
      "time_limit": 60
    },
    {
      "id": 233,
      "topic": "৫. সংযোজিত ফাংশনের অন্তরীকরণ ও চেইন রুল",
      "question_text": "৪৩. $\\sqrt{e^{\\sqrt{x}}}$ এর অন্তরক সহগ (derivative) কত? [JnU'15-16]",
      "options": [
        "$\\frac{\\sqrt{e^{\\sqrt{x}}}}{4\\sqrt{x}}$",
        "$\\frac{\\sqrt{e^{x}}}{4\\sqrt{x}}$",
        "$\\frac{\\sqrt{e^{\\sqrt{x}}}}{2\\sqrt{x}}$",
        "$\\frac{e^{\\sqrt{x}}}{4\\sqrt{x}}$"
      ],
      "correct_answer": "$\\frac{\\sqrt{e^{\\sqrt{x}}}}{4\\sqrt{x}}$",
      "explanation": "$\\frac{d}{dx}(\\sqrt{e^{\\sqrt{x}}}) = \\frac{1}{2\\sqrt{e^{\\sqrt{x}}}} \\cdot e^{\\sqrt{x}} \\cdot \\frac{1}{2\\sqrt{x}} = \\frac{e^{\\sqrt{x}}}{4\\sqrt{x}\\sqrt{e^{\\sqrt{x}}}} = \\frac{\\sqrt{e^{\\sqrt{x}}}}{4\\sqrt{x}}$",
      "time_limit": 60
    },
    {
      "id": 234,
      "topic": "৫. সংযোজিত ফাংশনের অন্তরীকরণ ও চেইন রুল",
      "question_text": "৪৪. $y = 2x^{2} + e^{\\sin x}$ হলে $\\frac{dy}{dx}|_{x=0} = ?$ [RU'14-15]",
      "options": [
        "$4x$",
        "$1$",
        "$\\cos x e^{\\sin x}$",
        "$0$"
      ],
      "correct_answer": "$1$",
      "explanation": "$y = 2x^{2} + e^{\\sin x} \\implies \\frac{dy}{dx} = 4x + e^{\\sin x} \\cos x$\n$x=0$ বসিয়ে, $\\frac{dy}{dx} = 0 + e^{0} \\cos 0 = 1$",
      "time_limit": 60
    },
    {
      "id": 235,
      "topic": "৫. সংযোজিত ফাংশনের অন্তরীকরণ ও চেইন রুল",
      "question_text": "৪৫. যদি $y = x\\sqrt{x^{2}+a^{2}}$ হয়, তবে $\\frac{dy}{dx} = ?$ [CU'14-15]",
      "options": [
        "$\\frac{x^{2}+a^{2}}{\\sqrt{x^{2}+a^{2}}}$",
        "$\\frac{2x^{2}+a^{2}}{\\sqrt{x^{2}+a^{2}}}$",
        "$\\frac{2x^{2}+2a^{2}}{\\sqrt{x^{2}+a^{2}}}$",
        "$\\frac{2x^{2}+a^{2}}{2\\sqrt{x^{2}+a^{2}}}$"
      ],
      "correct_answer": "$\\frac{2x^{2}+a^{2}}{\\sqrt{x^{2}+a^{2}}}$",
      "explanation": "$y = x\\sqrt{x^{2}+a^{2}}$\n$$\\implies y_{1} = \\sqrt{x^{2}+a^{2}} + x \\cdot \\frac{1}{2\\sqrt{x^{2}+a^{2}}} \\cdot 2x = \\sqrt{x^{2}+a^{2}} + \\frac{x^{2}}{\\sqrt{x^{2}+a^{2}}} = \\frac{x^{2}+a^{2}+x^{2}}{\\sqrt{x^{2}+a^{2}}} = \\frac{2x^{2}+a^{2}}{\\sqrt{x^{2}+a^{2}}}$$",
      "time_limit": 60
    },
    {
      "id": 236,
      "topic": "৫. সংযোজিত ফাংশনের অন্তরীকরণ ও চেইন রুল",
      "question_text": "৪৬. $y = \\log_{x} a$ হলে, $\\frac{dy}{dx} = \\text{কত}?$ [JnU'14-15; RU'10-11]",
      "options": [
        "$\\frac{\\log_{x} a}{x(\\log x)^{2}}$",
        "$-\\frac{\\ln a}{x(\\ln x)^{2}}$",
        "$-\\frac{\\log a}{x(\\log x)^{2}}$",
        "$\\frac{\\ln a}{x(\\ln x)^{2}}$"
      ],
      "correct_answer": "$-\\frac{\\ln a}{x(\\ln x)^{2}}$",
      "explanation": "$y = \\log_{x} a = \\log_{e} a \\times \\log_{x} e = \\ln a \\times \\frac{1}{\\ln x}$\n$$\\therefore \\frac{dy}{dx} = \\ln a \\times \\frac{d}{dx}(\\frac{1}{\\ln x}) = -\\frac{\\ln a}{x(\\ln x)^{2}}$$",
      "time_limit": 60
    },
    {
      "id": 237,
      "topic": "৫. সংযোজিত ফাংশনের অন্তরীকরণ ও চেইন রুল",
      "question_text": "৪৭. $x$ কে পরিবর্তনশীল ধরে $\\log(x - \\sqrt{x^{2}-1})$ এর অন্তরক সহগ কোনটি? [KU'14-15]",
      "options": [
        "$\\frac{1}{\\sqrt{x^{2}-1}}$",
        "$\\frac{-1}{\\sqrt{x^{2}-1}}$",
        "$\\frac{x}{\\sqrt{x^{2}-1}}$",
        "$\\frac{-x}{\\sqrt{x^{2}-1}}$"
      ],
      "correct_answer": "$\\frac{-1}{\\sqrt{x^{2}-1}}$",
      "explanation": "$\\frac{d}{dx}(\\log(x - \\sqrt{x^{2}-1}))$\n$$= \\frac{1}{x-\\sqrt{x^{2}-1}} \\times (1 - \\frac{1}{2\\sqrt{x^{2}-1}} \\times 2x) = \\frac{1}{x-\\sqrt{x^{2}-1}} \\times \\frac{\\sqrt{x^{2}-1}-x}{\\sqrt{x^{2}-1}} = \\frac{-1}{\\sqrt{x^{2}-1}}$$",
      "time_limit": 60
    },
    {
      "id": 238,
      "topic": "৫. সংযোজিত ফাংশনের অন্তরীকরণ ও চেইন রুল",
      "question_text": "৪৮. $y = e^{e^{x}}$ হলে, $\\frac{dy}{dx} = ?$ [BUET'24-25]",
      "options": [
        "$\\frac{e^{x}}{1+x}$",
        "$e^{e^{x}}$",
        "$e^{x} e^{e^{x}}$",
        "$\\frac{xe^{x}}{1+e^{x}}$"
      ],
      "correct_answer": "$e^{x} e^{e^{x}}$",
      "explanation": "$\\frac{dy}{dx} = e^{e^{x}} \\frac{d}{dx}(e^{x}) = e^{x} e^{e^{x}}$",
      "time_limit": 60
    },
    {
      "id": 239,
      "topic": "৫. সংযোজিত ফাংশনের অন্তরীকরণ ও চেইন রুল",
      "question_text": "৪৯. $\\frac{d}{dx}\\tan^{-1}(\\frac{\\cos x}{1+\\sin x}) = ?$ [IUT'23-24]",
      "options": [
        "$0$",
        "$\\frac{1}{2}$",
        "$-1$",
        "$-\\frac{1}{2}$"
      ],
      "correct_answer": "$-\\frac{1}{2}$",
      "explanation": "Let, $y = \\tan^{-1}(\\frac{\\cos x}{1+\\sin x})$\n$$= \\tan^{-1}\\left(\\frac{\\cos^{2}\\frac{x}{2}-\\sin^{2}\\frac{x}{2}}{(\\sin\\frac{x}{2}+\\cos\\frac{x}{2})^{2}}\\right) = \\tan^{-1}\\left(\\frac{\\cos\\frac{x}{2}-\\sin\\frac{x}{2}}{\\cos\\frac{x}{2}+\\sin\\frac{x}{2}}\\right) = \\tan^{-1}\\left(\\frac{1-\\tan\\frac{x}{2}}{1+\\tan\\frac{x}{2}}\\right) = \\frac{\\pi}{4} - \\frac{x}{2}$$\n$$\\therefore \\frac{dy}{dx} = -\\frac{1}{2}$$",
      "time_limit": 60
    },
    {
      "id": 240,
      "topic": "৫. সংযোজিত ফাংশনের অন্তরীকরণ ও চেইন রুল",
      "question_text": "৫০. $y = \\sin^{2} 3x + 2\\cos x\\ln(\\cos 3x)$ হলে $\\frac{dy}{dx} \\text{ কত}?$ [BUET'22-23]",
      "options": [
        "$\\frac{1}{\\sin x}$",
        "$3\\sin 3x$",
        "$3\\cos 3x$",
        "$6\\sin 3x \\cos 3x - 2[3\\cos x \\tan 3x + \\ln(\\cos 3x) \\cdot \\sin x]$"
      ],
      "correct_answer": "$6\\sin 3x \\cos 3x - 2[3\\cos x \\tan 3x + \\ln(\\cos 3x) \\cdot \\sin x]$",
      "explanation": "$\\frac{dy}{dx} = 2\\sin 3x\\cos 3x \\cdot 3 + 2[\\cos x \\frac{-\\sin 3x}{\\cos 3x} \\cdot 3 + \\ln(\\cos 3x)(-\\sin x)]$\n$$= 6\\sin 3x\\cos 3x - 2[3\\cos x\\tan 3x + \\ln(\\cos 3x)\\sin x]$$",
      "time_limit": 60
    },
    {
      "id": 241,
      "topic": "৫. সংযোজিত ফাংশনের অন্তরীকরণ ও চেইন রুল",
      "question_text": "৫১. $\\frac{d}{dx}\\ln\\frac{\\sin x}{1-\\cos x} = ?$ [IUT'14-15]",
      "options": [
        "$-1$",
        "$\\cot x - \\tan x + 1$",
        "$\\text{cosec } x$",
        "$-\\text{cosec } x$"
      ],
      "correct_answer": "$-\\text{cosec } x$",
      "explanation": "$\\frac{d}{dx}\\left[\\ln\\left(\\frac{\\sin x}{1-\\cos x}\\right)\\right] = \\frac{d}{dx}\\left[\\ln\\left(\\frac{2\\sin\\frac{x}{2}\\cos\\frac{x}{2}}{2\\sin^{2}\\frac{x}{2}}\\right)\\right] = \\frac{d}{dx}[\\ln(\\cot\\frac{x}{2})]$\n$$= \\frac{1}{\\cot\\frac{x}{2}} (-\\text{cosec}^{2}\\frac{x}{2}) \\frac{1}{2} = -\\frac{\\sin\\frac{x}{2}}{\\cos\\frac{x}{2}} \\frac{1}{\\sin^{2}\\frac{x}{2}} \\frac{1}{2} = -\\frac{1}{2\\sin\\frac{x}{2}\\cos\\frac{x}{2}} = -\\text{cosec } x$$",
      "time_limit": 60
    },
    {
      "id": 242,
      "topic": "৫. সংযোজিত ফাংশনের অন্তরীকরণ ও চেইন রুল",
      "question_text": "৫২. $y = \\frac{x}{\\sqrt{x^{2}+1}}$ হলে $\\frac{dy}{dx}$ এর মান- [BUTEX'13-14]",
      "options": [
        "$\\frac{1}{\\sqrt{x^{2}+1}}$",
        "$\\frac{1}{(x^{2}+1)^{\\frac{3}{2}}}$",
        "$\\frac{1}{2\\sqrt{x^{2}+1}}$",
        "$-\\frac{1}{(x^{2}+1)^{\\frac{3}{2}}}$"
      ],
      "correct_answer": "$\\frac{1}{(x^{2}+1)^{\\frac{3}{2}}}$",
      "explanation": "$y_{1} = \\frac{\\sqrt{x^{2}+1} \\cdot 1 - x \\cdot \\frac{1}{2\\sqrt{x^{2}+1}} \\cdot 2x}{x^{2}+1} = \\frac{\\sqrt{x^{2}+1} - \\frac{x^{2}}{\\sqrt{x^{2}+1}}}{x^{2}+1} = \\frac{x^{2}+1-x^{2}}{(x^{2}+1)^{\\frac{3}{2}}} = \\frac{1}{(x^{2}+1)^{\\frac{3}{2}}}$",
      "time_limit": 60
    },
    {
      "id": 243,
      "topic": "৫. সংযোজিত ফাংশনের অন্তরীকরণ ও চেইন রুল",
      "question_text": "৫৩. $\\frac{dy}{dx}$ নির্ণয় কর: $y = \\sqrt{\\sec x}$ [RUET'13-14]",
      "options": [
        "$\\frac{y\\tan x}{2}$",
        "$\\frac{\\tan x}{2}$",
        "$\\cot x$",
        "$\\frac{\\cot x}{2}$",
        "None"
      ],
      "correct_answer": "$\\frac{y\\tan x}{2}$",
      "explanation": "$y = \\sqrt{\\sec x} \\implies y^{2} = \\sec x \\implies 2y\\frac{dy}{dx} = \\sec x \\tan x \\implies \\frac{dy}{dx} = \\frac{1}{2y}\\sec x \\tan x = \\frac{y\\tan x}{2}$",
      "time_limit": 60
    },
    {
      "id": 244,
      "topic": "৫. সংযোজিত ফাংশনের অন্তরীকরণ ও চেইন রুল",
      "question_text": "৫৪. যদি $y = 10^{\\log(\\sin x)}$ হয়, তবে $\\frac{dy}{dx}$ এর মান কত? [CUET'11-12]",
      "options": [
        "$10^{\\log(\\sin x)} \\log 10 \\cdot \\cot x$",
        "$10^{\\log(\\sin x)} \\log_{10}(\\sin x)$",
        "$10^{\\log(\\sin x)} \\log_{e} 10$",
        "None of these"
      ],
      "correct_answer": "$10^{\\log(\\sin x)} \\log 10 \\cdot \\cot x$",
      "explanation": "$y = 10^{\\log(\\sin x)}$\n$$\\therefore \\frac{dy}{dx} = 10^{\\log(\\sin x)}\\log_{e} 10 \\frac{d}{dx}(\\log \\sin x) \\quad [\\because a^{x} = a^{x}\\ln a = a^{x}\\log_{e} a]$$\n$$= 10^{\\log(\\sin x)}\\log_{e} 10 \\frac{1}{\\sin x} \\cos x = 10^{\\log(\\sin x)}\\log_{e} 10 \\cot x$$",
      "time_limit": 60
    },
    {
      "id": 245,
      "topic": "৫. সংযোজিত ফাংশনের অন্তরীকরণ ও চেইন রুল",
      "question_text": "৫৫. অন্তরীকরণ কর: $\\frac{d}{dx} \\sqrt[3]{(5x^{2}-4)}$ [CUET'10-11]",
      "options": [
        "$\\frac{x}{3\\sqrt[3]{(5x^{2}-4)^{2}}} + c$",
        "$\\frac{10x}{3\\sqrt[3]{(5x^{2}-4)^{2}}} + c$",
        "$\\frac{10x}{\\sqrt[3]{(5x^{2}-4)^{2}}} + c$",
        "None of these"
      ],
      "correct_answer": "None of these",
      "explanation": "$\\frac{d}{dx}\\sqrt[3]{(5x^{2}-4)} = \\frac{d}{dx}(5x^{2}-4)^{\\frac{1}{3}} = \\frac{1}{3}(5x^{2}-4)^{-\\frac{2}{3}} \\cdot 10x = \\frac{10x}{3(5x^{2}-4)^{\\frac{2}{3}}} = \\frac{10x}{3\\sqrt[3]{(5x^{2}-4)^{2}}}$",
      "time_limit": 60
    },
    {
      "id": 246,
      "topic": "৫. সংযোজিত ফাংশনের অন্তরীকরণ ও চেইন রুল",
      "question_text": "৫৬. $x$ এর সাপেক্ষে $\\sqrt{\\sin\\sqrt{x}}$ এর অন্তরক সহগ নির্ণয় কর। [CUET'10-11]",
      "options": [
        "$\\frac{\\cos\\sqrt{x}}{4\\sqrt{\\sin\\sqrt{x}}}$",
        "$\\frac{\\sin\\sqrt{x}}{4\\sqrt{x}\\cos\\sqrt{x}}$",
        "$\\frac{\\cos\\sqrt{x}}{4\\sqrt{x\\sin\\sqrt{x}}}$",
        "None of these"
      ],
      "correct_answer": "$\\frac{\\cos\\sqrt{x}}{4\\sqrt{x\\sin\\sqrt{x}}}$",
      "explanation": "$\\frac{d}{dx}(\\sqrt{\\sin\\sqrt{x}}) = \\frac{1}{2\\sqrt{\\sin\\sqrt{x}}} \\frac{d}{dx}(\\sin\\sqrt{x}) = \\frac{1}{2\\sqrt{\\sin\\sqrt{x}}} \\cos\\sqrt{x} \\frac{1}{2\\sqrt{x}} = \\frac{\\cos\\sqrt{x}}{4\\sqrt{x\\sin\\sqrt{x}}}$",
      "time_limit": 60
    },
    {
      "id": 247,
      "topic": "৫. সংযোজিত ফাংশনের অন্তরীকরণ ও চেইন রুল",
      "question_text": "৫৭. If $f(x) = e^{x}, g(x) = \\sin^{-1} x, h(x) = f(g(x))$, then $\\frac{h'(x)}{h(x)} = ?$ [IUT'10-11]",
      "options": [
        "$e^{\\sin^{-1} x}$",
        "$\\frac{1}{\\sqrt{1-x^{2}}}$",
        "$\\sin^{-1} x$",
        "$\\frac{1}{1-x^{2}}$"
      ],
      "correct_answer": "$\\frac{1}{\\sqrt{1-x^{2}}}$",
      "explanation": "$h(x) = f(g(x)) = f(\\sin^{-1} x) = e^{\\sin^{-1} x}$\n$h'(x) = e^{\\sin^{-1} x} \\cdot \\frac{1}{\\sqrt{1-x^{2}}}$\n$$\\therefore \\frac{h'(x)}{h(x)} = \\frac{e^{\\sin^{-1} x}}{\\sqrt{1-x^{2}} \\cdot e^{\\sin^{-1} x}} = \\frac{1}{\\sqrt{1-x^{2}}}$",
      "time_limit": 60
    },
    {
      "id": 248,
      "topic": "৬. বিপরীত ত্রিকোণমিতিক ফাংশন ও প্রতিস্থাপন পদ্ধতি",
      "question_text": "১. $y = 1+x^{2}$ এবং $z = \\tan^{-1}x$ হলে $\\frac{dy}{dz} = ?$ [RU'24-25]",
      "options": [
        "$\\frac{2x}{1+x^{2}}$",
        "$2x(1+x^{2})$",
        "$\\frac{1+x^{2}}{2x}$",
        "$\\frac{1}{2x(1+x^{2})}$"
      ],
      "correct_answer": "$2x(1+x^{2})$",
      "explanation": "$\\frac{dy}{dz} = \\frac{\\frac{dy}{dx}}{\\frac{dz}{dx}} = \\frac{\\frac{d}{dx}(1+x^{2})}{\\frac{d}{dx}(\\tan^{-1} x)} = 2x \\times \\frac{1}{\\frac{1}{1+x^{2}}} = 2x(1+x^{2})$",
      "time_limit": 60
    },
    {
      "id": 249,
      "topic": "৬. বিপরীত ত্রিকোণমিতিক ফাংশন ও প্রতিস্থাপন পদ্ধতি",
      "question_text": "২. $y = \\tan^{-1} \\frac{1+x}{1-x}$ হলে $\\frac{dy}{dx} = ?$ [RU, BUP'24-25; Agri'20-21; DU'19-20; JU'19-20]",
      "options": [
        "$\\frac{1}{1+x^{2}}$",
        "$-\\frac{1}{1+x^{2}}$",
        "$\\frac{1}{1+x}$",
        "$-\\frac{1}{1+x}$"
      ],
      "correct_answer": "$\\frac{1}{1+x^{2}}$",
      "explanation": "$y = \\tan^{-1} \\frac{1+x}{1-x} = \\tan^{-1}(1) + \\tan^{-1} x = \\frac{\\pi}{4} + \\tan^{-1} x$\n$$\\therefore \\frac{dy}{dx} = 0 + \\frac{d}{dx}(\\tan^{-1} x) = \\frac{1}{1+x^{2}}$$",
      "time_limit": 60
    },
    {
      "id": 250,
      "topic": "৬. বিপরীত ত্রিকোণমিতিক ফাংশন ও প্রতিস্থাপন পদ্ধতি",
      "question_text": "৩. $\\frac{d}{dx}(\\sin^{-1}(x^{2}))$ -এর মান কোনটি? [JU'24-25, 18-19]",
      "options": [
        "$\\frac{2x^{2}}{\\sqrt{1-x^{4}}}$",
        "$\\frac{x}{\\sqrt{1-x^{4}}}$",
        "$\\frac{2x}{\\sqrt{1-x^{4}}}$",
        "$\\frac{-2x}{\\sqrt{1-x^{4}}}$"
      ],
      "correct_answer": "$\\frac{2x}{\\sqrt{1-x^{4}}}$",
      "explanation": "$\\frac{d}{dx}\\sin^{-1}(x^{2}) = \\frac{1}{\\sqrt{1-x^{4}}} \\times \\frac{d}{dx} x^{2} = \\frac{2x}{\\sqrt{1-x^{4}}}$",
      "time_limit": 60
    },
    {
      "id": 251,
      "topic": "৬. বিপরীত ত্রিকোণমিতিক ফাংশন ও প্রতিস্থাপন পদ্ধতি",
      "question_text": "৪. $y = \\tan^{-1}(ax)$ হলে, $\\frac{dy}{dx}$ এর মান কত? [Agri'24-25]",
      "options": [
        "$\\frac{a}{1+ax^{2}}$",
        "$\\frac{a}{1+a^{2}x^{2}}$",
        "$\\frac{1}{1+x^{2}}$",
        "কোনটিই নয়"
      ],
      "correct_answer": "$\\frac{a}{1+a^{2}x^{2}}$",
      "explanation": "$y = \\tan^{-1} ax \\implies \\frac{dy}{dx} = \\frac{a}{1+a^{2}x^{2}}$",
      "time_limit": 60
    },
    {
      "id": 252,
      "topic": "৬. বিপরীত ত্রিকোণমিতিক ফাংশন ও প্রতিস্থাপন পদ্ধতি",
      "question_text": "৫. $y = (x^{2}+1)\\tan^{-1} x - x$ হলে $y_{1} = ?$ [KU'24-25]",
      "options": [
        "$\\tan^{-1} x$",
        "$2x\\tan^{-1} x$",
        "$1+\\tan^{-1} x$",
        "$2x\\tan^{-1} x - 1$"
      ],
      "correct_answer": "$2x\\tan^{-1} x$",
      "explanation": "$y = (x^{2}+1)\\tan^{-1} x - x$\n$$y_{1} = 2x\\tan^{-1} x + (x^{2}+1)\\frac{1}{(x^{2}+1)} - 1$$\n$$y_{1} = 2x\\tan^{-1} x \\text{ (Ans.)}$$",
      "time_limit": 60
    },
    {
      "id": 253,
      "topic": "৬. বিপরীত ত্রিকোণমিতিক ফাংশন ও প্রতিস্থাপন পদ্ধতি",
      "question_text": "৬. $y = \\tan^{-1} \\sqrt{\\frac{1-\\cos x}{1+\\cos x}}$ হলে $\\frac{dy}{dx}$ এর মান কত? [CoU'24-25; BAU'18-19; RU'17-18]",
      "options": [
        "$0$",
        "$1$",
        "$-1$",
        "$\\frac{1}{2}$"
      ],
      "correct_answer": "$\\frac{1}{2}$",
      "explanation": "$y = \\tan^{-1} \\sqrt{\\frac{2\\sin^{2}\\frac{x}{2}}{2\\cos^{2}\\frac{x}{2}}} = \\tan^{-1} \\tan \\frac{x}{2} = \\frac{x}{2}$\n$$\\therefore \\frac{dy}{dx} = \\frac{1}{2}$$",
      "time_limit": 60
    },
    {
      "id": 254,
      "topic": "৬. বিপরীত ত্রিকোণমিতিক ফাংশন ও প্রতিস্থাপন পদ্ধতি",
      "question_text": "৭. যদি $y = \\tan^{-1} \\frac{p+qx}{q-px}$ হয়, তবে $\\frac{dy}{dx}$ এর মান কত? [RU, CU'23-24]",
      "options": [
        "$1+7s$",
        "$p+qx$",
        "$\\frac{1}{1+x^{2}}$",
        "$\\frac{1}{1-x^{2}}$"
      ],
      "correct_answer": "$\\frac{1}{1+x^{2}}$",
      "explanation": "$y = \\tan^{-1} \\frac{p+qx}{q-px} = \\tan^{-1}\\left(\\frac{\\frac{p}{q}+x}{1-\\frac{p}{q}x}\\right) = \\tan^{-1}(\\frac{p}{q}) + \\tan^{-1} x$;\n$\\left[\\text{যেহেতু } \\tan^{-1} x \\pm \\tan^{-1} y = \\tan^{-1} \\frac{x\\pm y}{1\\mp xy}\\right]$\n$\\therefore \\frac{dy}{dx} = \\frac{d}{dx}[\\tan^{-1} \\frac{p}{q} + \\tan^{-1} x] = 0 + \\frac{d}{dx}[\\tan^{-1} x] = \\frac{1}{1+x^{2}}$",
      "time_limit": 60
    },
    {
      "id": 255,
      "topic": "৬. বিপরীত ত্রিকোণমিতিক ফাংশন ও প্রতিস্থাপন পদ্ধতি",
      "question_text": "৮. $y = \\tan^{-1} \\frac{4x}{1-4x^{2}}$ হলে, $\\frac{dy}{dx}$ সমান কত? [RU'23-24; JU'21-22, 19-20, 18-19; JnU'16-17]",
      "options": [
        "$\\frac{4}{1+4x^{2}}$",
        "$\\frac{4}{1-4x^{2}}$",
        "$\\frac{1}{1-4x^{2}}$",
        "$\\frac{4}{4x^{2}-1}$"
      ],
      "correct_answer": "$\\frac{4}{1+4x^{2}}$",
      "explanation": "$y = \\tan^{-1} \\frac{4x}{1-4x^{2}} = \\tan^{-1} \\frac{2\\cdot 2x}{1-(2x)^{2}} = 2\\tan^{-1} 2x$\n$$\\therefore \\frac{dy}{dx} = \\frac{2\\cdot 2}{1+(2x)^{2}} = \\frac{4}{1+4x^{2}}$$",
      "time_limit": 60
    },
    {
      "id": 256,
      "topic": "৬. বিপরীত ত্রিকোণমিতিক ফাংশন ও প্রতিস্থাপন পদ্ধতি",
      "question_text": "৯. $y = \\tan^{-1}\\sqrt{x}$ হলে, $\\frac{dy}{dx} = ?$ [CU'21-22]",
      "options": [
        "$\\frac{\\sqrt{x}}{1+x}$",
        "$\\frac{1}{2\\sqrt{x}(1+x)}$",
        "$\\frac{1}{2\\sqrt{x}(1+x)}$",
        "$\\frac{1}{1+x^{2}}$"
      ],
      "correct_answer": "$\\frac{1}{2\\sqrt{x}(1+x)}$",
      "explanation": "$y = \\tan^{-1}\\sqrt{x}$\n$$\\therefore \\frac{dy}{dx} = \\frac{1}{1+(\\sqrt{x})^{2}} \\frac{1}{2\\sqrt{x}} = \\frac{1}{2\\sqrt{x}(1+x)}$$",
      "time_limit": 60
    },
    {
      "id": 257,
      "topic": "৬. বিপরীত ত্রিকোণমিতিক ফাংশন ও প্রতিস্থাপন পদ্ধতি",
      "question_text": "১০. $x$ এর সাপেক্ষে $\\tan^{-1}(e^{x})$ এর অন্তরজ কত? [KU'19-20]",
      "options": [
        "$\\frac{e^{x}}{1+e^{2x}}$",
        "$\\frac{e^{x}}{1-e^{2x}}$",
        "$\\frac{1+e^{2x}}{e^{x}}$",
        "$\\frac{1-e^{2x}}{e^{x}}$"
      ],
      "correct_answer": "$\\frac{e^{x}}{1+e^{2x}}$",
      "explanation": "$\\frac{d}{dx}(\\tan^{-1}(e^{x})) = \\frac{1}{1+(e^{x})^{2}} \\times e^{x} = \\frac{e^{x}}{1+e^{2x}}$",
      "time_limit": 60
    },
    {
      "id": 258,
      "topic": "৬. বিপরীত ত্রিকোণমিতিক ফাংশন ও প্রতিস্থাপন পদ্ধতি",
      "question_text": "১১. $\\frac{d}{dx}\\left(\\tan^{-1}(\\frac{e^{x}}{x}) + \\tan^{-1}(\\frac{x}{e^{x}})\\right)$ এর মান কত? [BAU'18-19]",
      "options": [
        "$0$",
        "$1$",
        "$3x^{2}e^{x}$",
        "$\\frac{e^{x}}{x}$"
      ],
      "correct_answer": "$0$",
      "explanation": "$\\frac{d}{dx}\\left\\{\\tan^{-1}\\left(\\frac{e^{x}}{x}\\right) + \\cot^{-1}\\left(\\frac{e^{x}}{x}\\right)\\right\\} = \\frac{d}{dx}\\left(\\frac{\\pi}{2}\\right) = 0$;\n$\\left[\\because \\tan^{-1} x + \\cot^{-1} x = \\frac{\\pi}{2}\\right]$",
      "time_limit": 60
    },
    {
      "id": 259,
      "topic": "৬. বিপরীত ত্রিকোণমিতিক ফাংশন ও প্রতিস্থাপন পদ্ধতি",
      "question_text": "১২. $x$ এর সাপেক্ষে $\\tan^{-1} \\frac{3x-x^{3}}{1-3x^{2}}$ এর অন্তরজ কত? [KU'16-17]",
      "options": [
        "$\\frac{3}{1+x^{2}}$",
        "$\\frac{2}{x\\sqrt{1-x^{2}}}$",
        "$\\frac{3}{1-x^{2}}$",
        "$\\frac{-x}{\\sqrt{1-x^{2}}}$"
      ],
      "correct_answer": "$\\frac{3}{1+x^{2}}$",
      "explanation": "$\\tan^{-1} \\frac{3x-x^{3}}{1-3x^{2}} = 3\\tan^{-1} x$\n$\\therefore$ অন্তরক সহগ $= \\frac{3}{1+x^{2}}$",
      "time_limit": 60
    },
    {
      "id": 260,
      "topic": "৬. বিপরীত ত্রিকোণমিতিক ফাংশন ও প্রতিস্থাপন পদ্ধতি",
      "question_text": "১৩. যদি $y = \\tan^{-1}\\left(\\frac{a\\cos x - b\\sin x}{b\\cos x + a\\sin x}\\right)$ হয়, তবে $\\frac{dy}{dx}$ এর মান নির্ণয় কর: [CU'12-13]",
      "options": [
        "$\\frac{a^{2}}{1+b^{2}} - 1$",
        "$1$",
        "$-1$",
        "None"
      ],
      "correct_answer": "$-1$",
      "explanation": "$y = \\tan^{-1}\\left(\\frac{\\frac{a}{b} - \\tan x}{1 + \\frac{a}{b}\\tan x}\\right)$\n$$= \\tan^{-1}\\left(\\frac{a}{b}\\right) - \\tan^{-1}(\\tan x) = \\tan^{-1}\\left(\\frac{a}{b}\\right) - x$$\n$$\\therefore \\frac{dy}{dx} = -1$$",
      "time_limit": 60
    },
    {
      "id": 261,
      "topic": "৬. বিপরীত ত্রিকোণমিতিক ফাংশন ও প্রতিস্থাপন পদ্ধতি",
      "question_text": "১৪. $\\tan^{-1} \\frac{4\\sqrt{x}}{1-4x}$ এর অন্তরক সহগ কোনটি? [KUET'18-19]",
      "options": [
        "$\\frac{2}{x(1+4x)}$",
        "$\\frac{2}{\\sqrt{x}(1+4\\sqrt{x})}$",
        "$\\frac{2}{\\sqrt{x}(1+4x)}$",
        "$\\frac{4}{\\sqrt{x}(1+4x)}$",
        "$\\frac{e}{\\sqrt{x}(1+4x)}$"
      ],
      "correct_answer": "$\\frac{2}{\\sqrt{x}(1+4x)}$",
      "explanation": "ধরি, $y = \\tan^{-1} \\frac{4\\sqrt{x}}{1-4x} = \\tan^{-1} \\frac{2(2\\sqrt{x})}{1-(2\\sqrt{x})^{2}} = 2\\tan^{-1}(2\\sqrt{x})$\n$$\\therefore \\frac{dy}{dx} = 2 \\times \\frac{1}{1+4x} \\times \\frac{2}{2\\sqrt{x}} = \\frac{2}{\\sqrt{x}(1+4x)}$$",
      "time_limit": 60
    },
    {
      "id": 262,
      "topic": "৬. বিপরীত ত্রিকোণমিতিক ফাংশন ও প্রতিস্থাপন পদ্ধতি",
      "question_text": "১৫. If $y = \\tan^{-1} \\frac{x}{\\sqrt{1-x^{2}}}$ then find the value of $\\frac{dy}{dx}?$ [IUT'14-15, 08-09]",
      "options": [
        "$\\frac{x}{\\sqrt{1-x^{2}}}$",
        "$1$",
        "$\\tan^{-1} \\frac{x}{\\sqrt{1-x^{2}}}$",
        "$\\pi$"
      ],
      "correct_answer": "সঠিক উত্তর নেই",
      "explanation": "$y = \\tan^{-1} \\frac{x}{\\sqrt{1-x^{2}}} = \\sin^{-1} x$\n[এখানে একটি সমকোণী ত্রিভুজ ছিল যার লম্ব $x$, ভূমি $\\sqrt{1-x^{2}}$ এবং অতিভুজ $1$]\n$\\therefore \\frac{dy}{dx} = \\frac{1}{\\sqrt{1-x^{2}}}$",
      "time_limit": 60
    },
    {
      "id": 263,
      "topic": "৬. বিপরীত ত্রিকোণমিতিক ফাংশন ও প্রতিস্থাপন পদ্ধতি",
      "question_text": "১৬. যদি $y = \\tan^{-1} \\frac{5+6x}{6-5x}$ হয়, $\\frac{dy}{dx}$ এর মান কত? [CUET'13-14; KUET'11-12]",
      "options": [
        "$\\frac{1}{1+x^{2}}$",
        "$-\\frac{1}{1+x^{2}}$",
        "$\\frac{1}{6(1+x^{2})}$",
        "None of these"
      ],
      "correct_answer": "$\\frac{1}{1+x^{2}}$",
      "explanation": "$y = \\tan^{-1} \\frac{5+6x}{6-5x} = \\tan^{-1} \\frac{\\frac{5}{6}+x}{1-\\frac{5}{6}x}$\n$$= \\tan^{-1}\\frac{5}{6} + \\tan^{-1} x$$\n$$\\therefore \\frac{dy}{dx} = \\frac{1}{1+x^{2}}$$",
      "time_limit": 60
    },
    {
      "id": 264,
      "topic": "৬. বিপরীত ত্রিকোণমিতিক ফাংশন ও প্রতিস্থাপন পদ্ধতি",
      "question_text": "১৭. যদি $y = \\sin^{-1}(\\frac{4\\sqrt{x}}{1+4x})$ হয় তাহলে $(\\frac{dy}{dx})_{(4,2)}$ এর মান হচ্ছে- [BUET'10-11]",
      "options": [
        "$4$",
        "$\\frac{1}{17}$",
        "$\\frac{1}{4}$",
        "None"
      ],
      "correct_answer": "None",
      "explanation": "$y = \\sin^{-1}|\\frac{4\\sqrt{x}}{1+4x}|$\n$x=4$ হলে, $y = \\sin^{-1}\\left(\\frac{4\\sqrt{4}}{1+4\\times 4}\\right) = \\sin^{-1}\\left(\\frac{8}{17}\\right)$\n$= 0.489957\\dots \\neq 2 \\dots \\approx 0.5 \\neq 2$\n$\\therefore y = \\sin^{-1}\\left(\\frac{4\\sqrt{x}}{1+4x}\\right)$ বক্ররেখাটি $(4,2)$ বিন্দুগামী নয়।\n$\\therefore (4,2)$ বিন্দুতে $\\frac{dy}{dx}$ অস্তিত্বহীন",
      "time_limit": 60
    },
    {
      "id": 265,
      "topic": "৬. বিপরীত ত্রিকোণমিতিক ফাংশন ও প্রতিস্থাপন পদ্ধতি",
      "question_text": "১৮. যদি $y = \\sin\\left\\{2\\tan^{-1} \\sqrt{\\frac{1-x}{1+x}}\\right\\}$ হয়, তবে $\\frac{dy}{dx}$ কোনটি? [IUT'14-15; KUET'11-12; CUET'09-10]",
      "options": [
        "$\\frac{7x}{(x^{2}-1)}$",
        "$\\frac{3x}{\\sqrt{(x^{2}+1)}}$",
        "$\\frac{1}{\\sqrt{(1-x^{2})}}$",
        "$\\frac{5x}{\\sqrt{(1-x^{2})}}$",
        "$\\frac{-x}{\\sqrt{(1-x^{2})}}$"
      ],
      "correct_answer": "$\\frac{-x}{\\sqrt{(1-x^{2})}}$",
      "explanation": "$y = \\sin\\left\\{2\\tan^{-1} \\sqrt{\\frac{1-x}{1+x}}\\right\\}$\n$$= \\sin\\left\\{2\\tan^{-1} \\sqrt{\\frac{1-\\cos\\theta}{1+\\cos\\theta}}\\right\\} \\quad [x = \\cos\\theta]$$\n$$= \\sin\\left\\{2\\tan^{-1} \\tan\\frac{\\theta}{2}\\right\\} = \\sin\\theta$$\n$$= \\sin(\\cos^{-1} x) \\therefore \\frac{dy}{dx} = \\cos(\\cos^{-1} x) \\cdot \\frac{-1}{\\sqrt{1-x^{2}}} = \\frac{-x}{\\sqrt{1-x^{2}}}$$",
      "time_limit": 60
    },
    {
      "id": 266,
      "topic": "৭. লগারিদমিক অন্তরীকরণ: u^v আকার ও অসীম ধারা",
      "question_text": "১. $\\frac{d}{dx}(x^{2x}) =$ কত? [সি. বো. ২৩]",
      "options": [
        "$2x.x^{2x-1}$",
        "$x^{2x+1}$",
        "$x^{x}(1+\\ln 2x)$",
        "$x^{2x}(2+2\\ln x)$"
      ],
      "correct_answer": "$x^{2x}(2+2\\ln x)$",
      "explanation": "ধরি, $y = x^{2x}$\n$$\\ln y = \\ln x^{2x}$$\n$$\\ln y = 2x\\ln x$$\n$$\\frac{1}{y}\\frac{dy}{dx} = 2x \\cdot \\frac{1}{x} + \\ln x \\cdot 2$$\n$$\\frac{dy}{dx} = y(2+2\\ln x) \\therefore \\frac{d}{dx}(x^{2x}) = x^{2x}(2+2\\ln x)$$\nবিকল্প পদ্ধতি: যদি $y = u^{v}$ হয় যেখানে, $u = f(x)$ ও $v = g(x)$ তাহলে-\n$$\\frac{dy}{dx} = \\frac{d(u^{v})}{dx} = u^{v}\\left(\\frac{v}{u}\\cdot\\frac{du}{dx} + \\ln u \\cdot \\frac{dv}{dx}\\right)$$\n$$\\frac{d(x^{2x})}{dx} = x^{2x}\\left(\\frac{2x}{x}\\cdot\\frac{dx}{dx} + \\ln x \\cdot \\frac{d(2x)}{dx}\\right) = x^{2x}(2+2\\ln x)$$",
      "time_limit": 60
    },
    {
      "id": 267,
      "topic": "৭. লগারিদমিক অন্তরীকরণ: u^v আকার ও অসীম ধারা",
      "question_text": "২. $y = x^{\\frac{1}{x}}$ হলে $\\frac{dy}{dx} = ?$ [য. বো. ২৩]",
      "options": [
        "$x^{2-\\frac{1}{x}}(1-\\ln x)$",
        "$x^{x+2}(\\ln x-1)$",
        "$x^{-2+\\frac{1}{x}}(1-\\ln x)$",
        "$x^{-2+\\frac{1}{x}}(\\ln x-1)$"
      ],
      "correct_answer": "$x^{-2+\\frac{1}{x}}(1-\\ln x)$",
      "explanation": "$$\\frac{d}{dx}(x^{\\frac{1}{x}}) = x^{\\frac{1}{x}} \\left\\{ \\frac{1}{x} \\frac{d}{dx} (\\ln x) + \\ln x \\cdot \\frac{d}{dx} \\left( \\frac{1}{x} \\right) \\right\\}$$\n$$= x^{\\frac{1}{x}} \\left( \\frac{1}{x} \\cdot \\frac{1}{x} + \\ln x \\cdot \\left( -\\frac{1}{x^2} \\right) \\right)$$\n$$= x^{\\frac{1}{x}} \\cdot \\frac{1}{x^2} (1 - \\ln x) = x^{-2 + \\frac{1}{x}} (1 - \\ln x)$$",
      "time_limit": 60
    },
    {
      "id": 268,
      "topic": "৭. লগারিদমিক অন্তরীকরণ: u^v আকার ও অসীম ধারা",
      "question_text": "৩. $\\frac{d}{dx}(x^{x^2}) = ?$ [ব. বো. ২১]",
      "options": [
        "$x^{x^2}2(1+\\ln x)$",
        "$x^{x^2}2x(1+\\ln x)$",
        "$x^{x^2}(x+2x\\ln x)$",
        "$x^{x^2-1}\\cdot 2x$"
      ],
      "correct_answer": "$x^{x^2}(x+2x\\ln x)$",
      "explanation": "$$\\frac{d}{dx}(x^{x^2}) = x^{x^2}\\left(\\frac{x^2}{x}\\cdot\\frac{dx}{dx} + \\ln x\\cdot\\frac{d}{dx}(x^2)\\right) = x^{x^2}(x+2x\\ln x)$$",
      "time_limit": 60
    },
    {
      "id": 269,
      "topic": "৭. লগারিদমিক অন্তরীকরণ: u^v আকার ও অসীম ধারা",
      "question_text": "৪. $x$ এর সাপেক্ষে $x^{e^{-x}}$ এর অন্তরজ কোনটি? [JU '15-16]",
      "options": [
        "$e^x x^{e^{-x}-1}(1+x\\ln x)$",
        "$e^x x^{e^x-1}(1+x\\ln x)$",
        "$e^{-x} x^{e^{-x}-1}(1-x\\ln x)$",
        "$e^{-x} x^{e^{-x}-1}(1-x\\ln x)$"
      ],
      "correct_answer": "$e^{-x} x^{e^{-x}-1}(1-x\\ln x)$",
      "explanation": "ধরি, $y = x^{e^{-x}}$\n$$\\ln y = e^{-x}\\ln x$$\n$$\\frac{1}{y}\\frac{dy}{dx} = e^{-x}\\cdot\\frac{1}{x} - e^{-x}\\ln x$$\n$$\\frac{dy}{dx} = y\\left(\\frac{e^{-x}}{x} - e^{-x}\\ln x\\right)$$\n$$= x^{e^{-x}}\\left(\\frac{e^{-x}}{x} - e^{-x}\\ln x\\right)$$\n$$= e^{-x} x^{e^{-x}-1}(1-x\\ln x)$$",
      "time_limit": 60
    },
    {
      "id": 270,
      "topic": "৭. লগারিদমিক অন্তরীকরণ: u^v আকার ও অসীম ধারা",
      "question_text": "৫. $x$ এর সাপেক্ষে $x^{2x}$ এর অন্তরজ কোনটি? [JU '15-16]",
      "options": [
        "$2x^{2x}(1+\\ln x)$",
        "$2x^{2x}(1+\\ln 2x)$",
        "$2x^x(1+\\ln 2x)$",
        "$x^{2x}(1+\\ln 2x)$"
      ],
      "correct_answer": "$2x^{2x}(1+\\ln x)$",
      "explanation": "$$y = x^{2x} \\Rightarrow \\ln y = 2x\\ln x$$\n$$\\therefore \\frac{1}{y}\\frac{dy}{dx} = 2x\\cdot\\frac{1}{x} + \\ln x\\cdot 2$$\n$$\\Rightarrow \\frac{dy}{dx} = y(2+2\\ln x) = 2y(1+\\ln x)$$\n$$\\therefore \\frac{dy}{dx} = 2x^{2x}(1+\\ln x)$$",
      "time_limit": 60
    },
    {
      "id": 271,
      "topic": "৭. লগারিদমিক অন্তরীকরণ: u^v আকার ও অসীম ধারা",
      "question_text": "৬. $y = e^{xe^x}$ হলে $\\frac{dy}{dx}$ এর মান কোনটি? [RU '15-16]",
      "options": [
        "$e^{xe^x}$",
        "$(1+x)e^x$",
        "$(1+x)e^{x+xe^x}$",
        "$xe^{xe^x}$"
      ],
      "correct_answer": "$(1+x)e^{x+xe^x}$",
      "explanation": "$$y = e^{xe^x}$$\n$$\\frac{dy}{dx} = e^{xe^x}(xe^x + e^x) = (1+x)e^{x+xe^x}$$",
      "time_limit": 60
    },
    {
      "id": 272,
      "topic": "৭. লগারিদমিক অন্তরীকরণ: u^v আকার ও অসীম ধারা",
      "question_text": "৭. $y = x^x$ হলে, $\\frac{dy}{dx} = ?$ [RU '20-21]",
      "options": [
        "$x^{x-1}$",
        "$x \\cdot x^{x-1}$",
        "$x\\ln x$",
        "$x^x(1+\\ln x)$"
      ],
      "correct_answer": "$x^x(1+\\ln x)$",
      "explanation": "$$\\frac{dy}{dx} = x^x \\frac{d}{dx}(x\\ln x)$$\n$$= x^x\\left(x\\cdot\\frac{1}{x} + \\ln x \\cdot 1\\right) = x^x(1+\\ln x)$$",
      "time_limit": 60
    },
    {
      "id": 273,
      "topic": "৭. লগারিদমিক অন্তরীকরণ: u^v আকার ও অসীম ধারা",
      "question_text": "৮. $y = \\log_y x$ হলে $\\frac{dy}{dx}$ এর মান কত? [SUST '19-20]",
      "options": [
        "$\\frac{1}{x(1+\\ln x)}$",
        "$\\frac{1}{x(1+\\ln y)}$",
        "$\\frac{1}{x\\ln y}$",
        "$\\frac{1}{x\\ln x}$",
        "$\\frac{1}{y(1+\\ln x)}$"
      ],
      "correct_answer": "$\\frac{1}{x(1+\\ln y)}$",
      "explanation": "$$y = \\log_y x$$\n$$\\Rightarrow x = y^y \\Rightarrow \\ln x = y\\ln y$$\n$$\\Rightarrow \\frac{1}{x} = y\\times \\frac{1}{y}\\times\\frac{dy}{dx} + \\ln y \\times \\frac{dy}{dx}$$\n$$\\therefore \\frac{1}{x} = \\frac{dy}{dx}(1+\\ln y) \\therefore \\frac{dy}{dx} = \\frac{1}{x(1+\\ln y)}$$",
      "time_limit": 60
    },
    {
      "id": 274,
      "topic": "৭. লগারিদমিক অন্তরীকরণ: u^v আকার ও অসীম ধারা",
      "question_text": "৯. $\\frac{d}{dx}(x^{x^x})$ এর মান কত? [KU '13-14]",
      "options": [
        "$x^{x^x}\\left[\\frac{1}{x} + (1+\\ln x)\\ln x\\right]$",
        "$x^{x}\\left[\\frac{1}{x} + (1+\\ln x)\\ln x\\right]$",
        "$x^{x^x} x^x \\left[\\frac{1}{x} + (1+\\ln x)\\ln x\\right]$",
        "$x^x x^{x-1} \\left[\\left(\\frac{1}{x} + \\ln x\\right)\\ln x\\right]$"
      ],
      "correct_answer": "$x^{x^x} x^x \\left[\\frac{1}{x} + (1+\\ln x)\\ln x\\right]$",
      "explanation": "ধরি, $y = x^{x^x}$ বা, $\\ln y = x^x \\ln x$\n$$\\text{বা, } \\frac{1}{y}\\frac{dy}{dx} = \\left\\{ x^x\\cdot\\frac{1}{x} + \\ln x\\frac{d}{dx}(x^x) \\right\\}$$\nধরি, $z = x^x$ বা, $\\ln z = x\\ln x$\n$$\\text{বা, } \\frac{1}{z}\\frac{dz}{dx} = \\ln x + 1 \\text{ বা, } \\frac{dz}{dx} = x^x(1+\\ln x)$$\n$$\\text{বা, } \\frac{dy}{dx} = x^{x^x} \\left[ x^x \\frac{1}{x} + x^x\\ln x(1+\\ln x) \\right]$$\n$$= x^{x^x} \\cdot x^x \\left[ \\frac{1}{x} + \\ln x(1+\\ln x) \\right]$$",
      "time_limit": 60
    },
    {
      "id": 275,
      "topic": "৭. লগারিদমিক অন্তরীকরণ: u^v আকার ও অসীম ধারা",
      "question_text": "১০. যদি $y = e^{x+e^{x+e^{x+\\dots\\infty}}}$ হয়, $\\frac{dy}{dx} = ?$ [CU '23-24]",
      "options": [
        "$\\frac{1+y}{y}$",
        "$\\frac{y}{1-y}$",
        "$\\frac{1-y}{y}$",
        "$\\frac{y}{y-1}$"
      ],
      "correct_answer": "$\\frac{y}{1-y}$",
      "explanation": "$$y = e^{x+e^{x+e^{x+\\dots\\infty}}} \\Rightarrow \\ln y = \\ln\\left(e^{x+e^{x+e^{x+\\dots\\infty}}}\\right)$$\n$$\\Rightarrow \\ln y = \\left(x+e^{x+e^{x+\\dots\\infty}}\\right)\\ln e$$\n$$\\Rightarrow \\ln y = (x+y) \\Rightarrow \\ln y - y = x$$\n$$\\Rightarrow \\frac{d}{dy}[\\ln y - y] = \\frac{dx}{dy} \\Rightarrow \\frac{1}{y} - 1 = \\frac{dx}{dy}$$\n$$\\Rightarrow \\frac{dx}{dy} = \\frac{1-y}{y} \\therefore \\frac{dy}{dx} = \\frac{y}{1-y}$$",
      "time_limit": 60
    },
    {
      "id": 276,
      "topic": "৭. লগারিদমিক অন্তরীকরণ: u^v আকার ও অসীম ধারা",
      "question_text": "১১. $y = \\sqrt{x+\\sqrt{x+\\sqrt{x+\\dots\\infty}}}$ হলে, $\\frac{dy}{dx}$ এর মান কত? [JnU '13-14]",
      "options": [
        "$\\frac{1}{2y-1}$",
        "$\\frac{x}{1-2y}$",
        "$\\frac{x}{2y-1}$",
        "$\\frac{y}{1-2y}$"
      ],
      "correct_answer": "$\\frac{1}{2y-1}$",
      "explanation": "$$y = \\sqrt{x+y}$$\n$$\\text{অথবা, } y^2 = x+y$$\n$$\\text{অথবা, } y^2 - y = x \\Rightarrow 2y\\frac{dy}{dx} - \\frac{dy}{dx} = 1$$\n$$\\therefore \\frac{dy}{dx} = \\frac{1}{2y-1}$$",
      "time_limit": 60
    },
    {
      "id": 277,
      "topic": "৭. লগারিদমিক অন্তরীকরণ: u^v আকার ও অসীম ধারা",
      "question_text": "১২. $y = \\left(\\frac{1}{x}\\right)^{\\frac{1}{x}}$ হলে $\\frac{dy}{dx}$ এর মান কোনটি? [CKRUET '20-21; KUET '15-16]",
      "options": [
        "$\\frac{y(\\log x - 1)}{x}$",
        "$3y(\\log x - 2)$",
        "$\\frac{(\\log x - y)}{y}$",
        "$\\frac{y(\\log x - 1)}{x^3}$",
        "$\\frac{y(\\log x - 1)}{x^2}$"
      ],
      "correct_answer": "$\\frac{y(\\log x - 1)}{x^2}$",
      "explanation": "$$y = \\left(\\frac{1}{x}\\right)^{\\frac{1}{x}} = (x^{-1})^{\\frac{1}{x}} = x^{-\\frac{1}{x}}$$\n$$\\Rightarrow \\log y = \\log x^{-\\frac{1}{x}} = -\\frac{1}{x}\\log x$$\n$$\\Rightarrow \\frac{1}{y}\\frac{dy}{dx} = \\frac{-1}{x} \\times \\frac{1}{x} + \\log x \\left(\\frac{1}{x^2}\\right)$$\n$$\\Rightarrow \\frac{1}{y}\\frac{dy}{dx} = \\frac{-1}{x^2} + \\frac{1}{x^2}\\log x \\Rightarrow \\frac{dy}{dx} = \\frac{y}{x^2}(\\log x - 1)$$",
      "time_limit": 60
    },
    {
      "id": 278,
      "topic": "৭. লগারিদমিক অন্তরীকরণ: u^v আকার ও অসীম ধারা",
      "question_text": "১৩. Given $y = \\cos x^{\\cos x^{\\cos x\\dots\\infty}}$, then evaluate $\\frac{dy}{dx}$ [IUT '21-22]",
      "options": [
        "$\\frac{-y^2\\tan x}{y\\ln\\cos x - 1}$",
        "$\\frac{y^2\\tan x}{y\\ln\\cos x - 1}$",
        "$\\frac{-y^2\\cot x}{1 - y\\ln\\cos x}$",
        "$\\frac{y^2\\cot x}{1 - y\\ln\\cos x}$"
      ],
      "correct_answer": "$\\frac{y^2\\tan x}{y\\ln\\cos x - 1}$",
      "explanation": "$$y = (\\cos x)^{\\cos x^{\\cos x\\dots\\infty}}$$\n$$\\Rightarrow y = (\\cos x)^y \\Rightarrow \\ln y = y\\ln(\\cos x)$$\n$$\\Rightarrow \\frac{1}{y}\\times\\frac{dy}{dx} = \\frac{y}{\\cos x}(-\\sin x) + \\ln(\\cos x)\\frac{dy}{dx}$$\n$$\\Rightarrow \\frac{dy}{dx}\\left(\\frac{1}{y} - \\ln(\\cos x)\\right) = -y\\tan x$$\n$$\\Rightarrow \\frac{dy}{dx} = \\frac{-y^2\\tan x}{1 - y\\ln(\\cos x)} = \\frac{y^2\\tan x}{y\\ln(\\cos x) - 1}$$",
      "time_limit": 60
    },
    {
      "id": 279,
      "topic": "৭. লগারিদমিক অন্তরীকরণ: u^v আকার ও অসীম ধারা",
      "question_text": "১৪. Differentiation of $\\sqrt{x\\sqrt{x\\sqrt{x\\dots\\infty}}}$ is- [IUT '19-20]",
      "options": [
        "$\\sqrt{x}$",
        "$1$",
        "$\\sqrt{2}$",
        "$\\sqrt{3}$"
      ],
      "correct_answer": "$1$",
      "explanation": "ধরি, $y = \\sqrt{x\\sqrt{x\\sqrt{x\\dots\\infty}}}$\n$$\\Rightarrow y^2 = x\\sqrt{x\\sqrt{x\\dots\\infty}}$$\n$$\\Rightarrow y^2 = xy \\Rightarrow y = x \\quad [\\because y \\neq 0]$$\n$$\\therefore \\frac{dy}{dx} = 1$$",
      "time_limit": 60
    },
    {
      "id": 280,
      "topic": "৮. অব্যক্ত, পরামিতিক ও ফাংশনের সাপেক্ষে ফাংশনের অন্তরীকরণ",
      "question_text": "১. $x^y = y^x$ হলে $\\frac{dy}{dx} = ?$ [রা. বো. ২২]",
      "options": [
        "$\\frac{x(y\\ln y-y)}{y(x\\ln y-x)}$",
        "$\\frac{y(x\\ln y-y)}{x(y\\ln x-x)}$",
        "$\\frac{y(x\\ln y+y)}{x(y\\ln x+x)}$",
        "$\\frac{x(y\\ln y-y)}{y(x\\ln y-x)}$"
      ],
      "correct_answer": "$\\frac{y(x\\ln y-y)}{x(y\\ln x-x)}$",
      "explanation": "$$x^y = y^x$$\n$$\\Rightarrow \\ln x^y = \\ln y^x$$\n$$\\Rightarrow y\\ln x = x\\ln y$$\n$$\\Rightarrow y\\cdot\\frac{1}{x} + \\ln x\\cdot\\frac{dy}{dx} = x\\cdot\\frac{1}{y}\\frac{dy}{dx} + \\ln y$$\n$$\\Rightarrow \\frac{dy}{dx}\\left(\\ln x - \\frac{x}{y}\\right) = \\ln y - \\frac{y}{x}$$\n$$\\Rightarrow \\frac{dy}{dx}\\left(\\frac{y\\ln x-x}{y}\\right) = \\frac{x\\ln y-y}{x}$$\n$$\\Rightarrow \\frac{dy}{dx} = \\frac{y(x\\ln y-y)}{x(y\\ln x-x)}$$",
      "time_limit": 60
    },
    {
      "id": 281,
      "topic": "৮. অব্যক্ত, পরামিতিক ও ফাংশনের সাপেক্ষে ফাংশনের অন্তরীকরণ",
      "question_text": "২. $\\cos x = \\frac{1-t^2}{1+t^2}$ এবং $\\sin y = \\frac{2t}{1+t^2}$ হলে $\\frac{dy}{dx} = ?$ [ঢা. বো. ২৩; অনুরূপ প্রশ্ন: রা. বো. ২২]",
      "options": [
        "$0$",
        "$\\frac{1}{2}$",
        "$\\frac{2}{3}$",
        "$1$"
      ],
      "correct_answer": "$1$",
      "explanation": "$$\\cos x = \\frac{1-t^2}{1+t^2} \\Rightarrow x = \\cos^{-1}\\frac{1-t^2}{1+t^2} = 2\\tan^{-1}t$$\n$$\\sin y = \\frac{2t}{1+t^2} \\Rightarrow y = \\sin^{-1}\\frac{2t}{1+t^2} = 2\\tan^{-1}t$$\n$$\\therefore y = x \\Rightarrow \\frac{dy}{dx} = 1$$",
      "time_limit": 60
    },
    {
      "id": 282,
      "topic": "৮. অব্যক্ত, পরামিতিক ও ফাংশনের সাপেক্ষে ফাংশনের অন্তরীকরণ",
      "question_text": "৩. $x^y = e^{x-y}$ হলে $\\frac{dy}{dx} = ?$ [কু. বো. ২৩]",
      "options": [
        "$\\frac{x-y}{x(1-\\ln x)}$",
        "$\\frac{x-y}{x(\\ln x-1)}$",
        "$\\frac{y-x}{x(\\ln x-1)}$",
        "$\\frac{x-y}{\\ln x-1}$"
      ],
      "correct_answer": "$\\frac{x-y}{x(\\ln x-1)}$",
      "explanation": "$$x^y = e^{x-y}$$\n$$\\Rightarrow \\ln x^y = \\ln e^{x-y}$$\n$$\\Rightarrow y\\ln x = (x-y)\\ln e$$\n$$\\Rightarrow y\\ln x = (x-y)\\cdot 1$$\n$$\\Rightarrow y\\cdot\\frac{1}{x} + \\ln x\\cdot\\frac{dy}{dx} = 1 - \\frac{dy}{dx}$$\n$$\\Rightarrow (\\ln x - 1)\\frac{dy}{dx} = 1 - \\frac{y}{x} = \\frac{x-y}{x} \\Rightarrow \\frac{dy}{dx} = \\frac{x-y}{x(\\ln x-1)}$$",
      "time_limit": 60
    },
    {
      "id": 283,
      "topic": "৮. অব্যক্ত, পরামিতিক ও ফাংশনের সাপেক্ষে ফাংশনের অন্তরীকরণ",
      "question_text": "৪. $e^{xy+3} = 2$ হলে $\\frac{dy}{dx}$ এর মান কোনটি? [সি. বো. ২৩]",
      "options": [
        "$-\\frac{y}{x}$",
        "$-\\frac{x}{y}$",
        "$\\frac{\\ln 2}{x}$",
        "$\\frac{\\ln 2}{xy}$"
      ],
      "correct_answer": "$-\\frac{y}{x}$",
      "explanation": "$$e^{xy+3} = 2$$\n$$\\Rightarrow \\ln(e^{xy+3}) = \\ln 2$$\n$$\\Rightarrow (xy+3) = \\ln 2 \\quad [\\because \\ln e = 1]$$\n$$\\Rightarrow x\\frac{dy}{dx} + y\\cdot 1 + 0 = 0$$\n$$\\therefore \\frac{dy}{dx} = -\\frac{y}{x}$$",
      "time_limit": 60
    },
    {
      "id": 284,
      "topic": "৮. অব্যক্ত, পরামিতিক ও ফাংশনের সাপেক্ষে ফাংশনের অন্তরীকরণ",
      "question_text": "৫. $x = a\\cos\\theta, y = a\\sin\\theta$ হলে $\\frac{dy}{dx} = \\text{কত}?$ [ব. বো. ২৪]",
      "options": [
        "$-\\frac{x}{y}$",
        "$-\\frac{y}{x}$",
        "$\\frac{x}{y}$",
        "$\\frac{y}{x}$"
      ],
      "correct_answer": "$-\\frac{x}{y}$",
      "explanation": "$$x = a\\cos\\theta \\text{ এবং } y = a\\sin\\theta$$\n$$\\therefore x^2+y^2 = a^2(\\cos^2\\theta + \\sin^2\\theta) = a^2$$\n$$\\Rightarrow 2x + 2y\\frac{dy}{dx} = 0$$\n$$\\therefore \\frac{dy}{dx} = -\\frac{2x}{2y} = -\\frac{x}{y}$$",
      "time_limit": 60
    },
    {
      "id": 285,
      "topic": "৮. অব্যক্ত, পরামিতিক ও ফাংশনের সাপেক্ষে ফাংশনের অন্তরীকরণ",
      "question_text": "৬. যদি $x = a(\\theta-\\sin\\theta)$ এবং $y = a(1+\\cos\\theta)$ হয়, তবে $\\frac{dy}{dx}$ এর মান কোনটি? [ব. বো. ২১]",
      "options": [
        "$-\\cot\\frac{\\theta}{2}$",
        "$-\\sin\\theta$",
        "$1-\\cos\\theta$",
        "$-\\tan\\frac{\\theta}{2}$"
      ],
      "correct_answer": "$-\\cot\\frac{\\theta}{2}$",
      "explanation": "$$\\frac{dy}{d\\theta} = \\frac{d}{d\\theta}(a(1+\\cos\\theta)) = -a\\sin\\theta$$\n$$\\text{এবং } \\frac{dx}{d\\theta} = \\frac{d}{d\\theta}(a(\\theta-\\sin\\theta)) = a(1-\\cos\\theta)$$\n$$\\therefore \\frac{dy}{dx} = \\frac{\\frac{dy}{d\\theta}}{\\frac{dx}{d\\theta}} = \\frac{-a\\sin\\theta}{a(1-\\cos\\theta)} = \\frac{-a\\cdot 2\\sin\\frac{\\theta}{2}\\cos\\frac{\\theta}{2}}{a\\cdot 2\\sin^2\\frac{\\theta}{2}} = -\\frac{\\cos\\frac{\\theta}{2}}{\\sin\\frac{\\theta}{2}} = -\\cot\\frac{\\theta}{2}$$",
      "time_limit": 60
    },
    {
      "id": 286,
      "topic": "৮. অব্যক্ত, পরামিতিক ও ফাংশনের সাপেক্ষে ফাংশনের অন্তরীকরণ",
      "question_text": "৭. $x^3+x^2y+xy^2 = 0$ একটি- [য. বো. ১৭]",
      "options": [
        "ব্যক্ত ফাংশন",
        "অব্যক্ত ফাংশন",
        "পরামিতিক ফাংশন",
        "সংযোজিত ফাংশন"
      ],
      "correct_answer": "অব্যক্ত ফাংশন",
      "explanation": "অব্যক্ত ফাংশন: যে ফাংশন এ $y$ কে $x$ এর মাধ্যমে বা $x$ কে $y$ এর মাধ্যমে প্রকাশ করা যায় না। তাকে অব্যক্ত ফাংশন বলে। অব্যক্ত ফাংশনকে $f(x, y) = 0$ আকারে প্রকাশ করা যায়।",
      "time_limit": 60
    },
    {
      "id": 287,
      "topic": "৮. অব্যক্ত, পরামিতিক ও ফাংশনের সাপেক্ষে ফাংশনের অন্তরীকরণ",
      "question_text": "৮. $5y^2 + \\sin y = x^2$ হলে, $\\frac{dy}{dx} = ?$ [DU '25-26; CU '12-23]",
      "options": [
        "$\\frac{2x}{5y-\\cos y}$",
        "$\\frac{x}{5y+\\cos y}$",
        "$\\frac{2x}{10y+\\cos y}$",
        "$\\frac{2y}{5y-\\cos y}$"
      ],
      "correct_answer": "$\\frac{2x}{10y+\\cos y}$",
      "explanation": "$$\\text{দেওয়া আছে, } 5y^2 + \\sin y = x^2$$\n$$\\Rightarrow 5\\cdot 2y\\cdot \\frac{dy}{dx} + \\cos y\\frac{dy}{dx} = 2x$$\n$$\\Rightarrow \\frac{dy}{dx}(10y+\\cos y) = 2x$$\n$$\\Rightarrow \\frac{dy}{dx} = \\frac{2x}{10y+\\cos y}$$",
      "time_limit": 60
    },
    {
      "id": 288,
      "topic": "৮. অব্যক্ত, পরামিতিক ও ফাংশনের সাপেক্ষে ফাংশনের অন্তরীকরণ",
      "question_text": "৯. $x^y = y^x$ হলে, $\\frac{dy}{dx} = ?$ [BUP '23-24]",
      "options": [
        "$\\frac{x(\\ln y-y)}{y(\\ln x-y)}$",
        "$\\frac{y(x\\ln y-x)}{x(y\\ln x-y)}$",
        "$\\frac{y(x\\ln y-y)}{x(y\\ln x-x)}$",
        "কোনোটিই নয়"
      ],
      "correct_answer": "$\\frac{y(x\\ln y-y)}{x(y\\ln x-x)}$",
      "explanation": "$$x^y = y^x \\Rightarrow \\ln(x^y) = \\ln(y^x)$$\n$$\\Rightarrow y\\ln x = x\\ln y$$\n$$\\Rightarrow y\\frac{1}{x} + \\ln x\\frac{dy}{dx} = x\\cdot\\frac{1}{y}\\cdot\\frac{dy}{dx} + \\ln y$$\n$$\\Rightarrow \\frac{dy}{dx}\\left(\\ln x - \\frac{x}{y}\\right) = \\ln y - \\frac{y}{x}$$\n$$\\Rightarrow \\frac{dy}{dx}\\cdot\\frac{y\\ln x-x}{y} = \\frac{x\\ln y-y}{x}$$\n$$\\Rightarrow \\frac{dy}{dx} = \\frac{y(x\\ln y-y)}{x(y\\ln x-x)}$$",
      "time_limit": 60
    },
    {
      "id": 289,
      "topic": "৮. অব্যক্ত, পরামিতিক ও ফাংশনের সাপেক্ষে ফাংশনের অন্তরীকরণ",
      "question_text": "১০. যদি $e^{xy+1} = 5$ হয়, তবে $\\frac{dy}{dx}$ এর মান কত? [RU '23-24, 20-21; Agri. '20-21; DU '14-15]",
      "options": [
        "$\\frac{\\ln 5}{xy}$",
        "$\\frac{-\\ln 5}{xy}$",
        "$\\frac{-y}{x}$",
        "$\\frac{\\ln 5}{x}$"
      ],
      "correct_answer": "$\\frac{-y}{x}$",
      "explanation": "$$e^{xy+1} = 5 ; \\quad xy + 1 = \\ln 5$$\n$$\\Rightarrow xy = \\ln 5 - 1$$\n$$\\therefore x\\frac{dy}{dx} + y = 0 \\Rightarrow \\frac{dy}{dx} = -\\frac{y}{x}$$",
      "time_limit": 60
    },
    {
      "id": 290,
      "topic": "৮. অব্যক্ত, পরামিতিক ও ফাংশনের সাপেক্ষে ফাংশনের অন্তরীকরণ",
      "question_text": "১১. $(x+y)^2 - xy = 1$ হলে, $\\frac{dy}{dx} =$ কত? [CU '22-23]",
      "options": [
        "$\\frac{x+2y}{y+2x}$",
        "$\\frac{2x+y}{x+2y}$",
        "$\\frac{-2x-y}{x+2y}$",
        "$\\frac{-x-2y}{y+2x}$"
      ],
      "correct_answer": "$\\frac{-2x-y}{x+2y}$",
      "explanation": "$$(x+y)^2 - xy = 1$$\n$$\\Rightarrow x^2 + 2xy + y^2 - xy - 1 = 0$$\n$$\\Rightarrow x^2 + xy + y^2 - 1 = 0$$\n$$\\text{তাহলে, } \\frac{dy}{dx} = -\\frac{2x+y+0-0}{0+x+2y-0} = \\frac{-2x-y}{x+2y}$$",
      "time_limit": 60
    },
    {
      "id": 291,
      "topic": "৮. অব্যক্ত, পরামিতিক ও ফাংশনের সাপেক্ষে ফাংশনের অন্তরীকরণ",
      "question_text": "১২. $x^x y^y = 1$ হলে, $\\frac{dy}{dx} =$ কত? [RU '22-23]",
      "options": [
        "$\\frac{1+\\ln x}{1+\\ln y}$",
        "$-\\frac{1+\\ln x}{1+\\ln y}$",
        "$\\frac{1-\\ln x}{1+\\ln y}$",
        "$\\frac{1+\\ln x}{1-\\ln y}$"
      ],
      "correct_answer": "$-\\frac{1+\\ln x}{1+\\ln y}$",
      "explanation": "$$x^x\\cdot y^y = 1 \\Rightarrow \\ln(x^x\\cdot y^y) = \\ln 1 = 0$$\n$$\\Rightarrow x\\ln x + y\\ln y = 0$$\n$$\\therefore \\left(x\\cdot\\frac{1}{x} + \\ln x\\right) + \\left(y\\cdot\\frac{1}{y}\\cdot\\frac{dy}{dx} + \\ln y\\cdot\\frac{dy}{dx}\\right) = 0$$\n$$\\frac{dy}{dx} = -\\frac{1+\\ln x}{1+\\ln y}$$",
      "time_limit": 60
    },
    {
      "id": 292,
      "topic": "৮. অব্যক্ত, পরামিতিক ও ফাংশনের সাপেক্ষে ফাংশনের অন্তরীকরণ",
      "question_text": "১৩. যদি $x^2 + 3xy + 5y^2 = 1$ হয়, তাহলে $\\frac{dy}{dx}$ সমান হবে- [JU '14-15; DU '12-13]",
      "options": [
        "$-\\frac{2x+3y}{3x+10y}$",
        "$\\frac{2x+3y}{3x+10y}$",
        "$\\frac{2x-3y}{3x+10y}$",
        "$\\frac{2x+3y}{2x-10y}$"
      ],
      "correct_answer": "$-\\frac{2x+3y}{3x+10y}$",
      "explanation": "$$x^2 + 3xy + 5y^2 = 1$$\n$$\\Rightarrow 2x + 3y + 3x\\frac{dy}{dx} + 10y\\frac{dy}{dx} = 0$$\n$$\\Rightarrow \\frac{dy}{dx} = -\\frac{2x+3y}{3x+10y}$$",
      "time_limit": 60
    },
    {
      "id": 293,
      "topic": "৮. অব্যক্ত, পরামিতিক ও ফাংশনের সাপেক্ষে ফাংশনের অন্তরীকরণ",
      "question_text": "১৪. যদি $x^n + y^n = a^n$ হয়, তবে $\\frac{dy}{dx} = ?$ [DU '13-14]",
      "options": [
        "$\\left(\\frac{y}{x}\\right)^n$",
        "$\\left(-\\frac{x}{y}\\right)^n$",
        "$-\\left(\\frac{x}{y}\\right)^{n-1}$",
        "$\\left(\\frac{x}{y}\\right)^{n-1}$"
      ],
      "correct_answer": "$-\\left(\\frac{x}{y}\\right)^{n-1}$",
      "explanation": "$$x^n + y^n = a^n \\Rightarrow nx^{n-1} + ny^{n-1}\\frac{dy}{dx} = 0$$\n$$\\Rightarrow \\frac{dy}{dx} = -\\frac{nx^{n-1}}{ny^{n-1}} = -\\left(\\frac{x}{y}\\right)^{n-1}$$",
      "time_limit": 60
    },
    {
      "id": 294,
      "topic": "৮. অব্যক্ত, পরামিতিক ও ফাংশনের সাপেক্ষে ফাংশনের অন্তরীকরণ",
      "question_text": "১৫. $x = a(\\theta-\\sin\\theta), y = a(1+\\cos\\theta)$ এবং $\\frac{dy}{dx} = \\sqrt{3}$ হলে, $\\theta =$ কত? [RU '22-23]",
      "options": [
        "$\\frac{2\\pi}{3}$",
        "$\\frac{2\\pi}{5}$",
        "$\\frac{5\\pi}{6}$",
        "$\\frac{\\pi}{3}$"
      ],
      "correct_answer": "$\\frac{2\\pi}{3}$",
      "explanation": "$$x = a(\\theta-\\sin\\theta) \\Rightarrow \\frac{dx}{d\\theta} = a - a\\cos\\theta$$\n$$\\text{আবার, } y = a(1+\\cos\\theta) \\Rightarrow \\frac{dy}{d\\theta} = -a\\sin\\theta$$\n$$\\frac{dy}{dx} = \\frac{\\frac{dy}{d\\theta}}{\\frac{dx}{d\\theta}} = \\frac{-a\\sin\\theta}{a-a\\cos\\theta} = \\frac{-2\\sin\\frac{\\theta}{2}\\cos\\frac{\\theta}{2}}{2\\sin^2\\frac{\\theta}{2}} = -\\cot\\frac{\\theta}{2}$$\n$$\\text{প্রশ্নমতে, } -\\cot\\frac{\\theta}{2} = \\sqrt{3}$$\n$$\\Rightarrow \\cot\\frac{\\theta}{2} = -\\sqrt{3} = \\cot\\left(\\pi-\\frac{\\pi}{6}\\right) = \\cot\\frac{5\\pi}{6}$$\n$$\\Rightarrow \\frac{\\theta}{2} = \\frac{\\pi}{3} \\therefore \\theta = \\frac{2\\pi}{3}$$",
      "time_limit": 60
    },
    {
      "id": 295,
      "topic": "৮. অব্যক্ত, পরামিতিক ও ফাংশনের সাপেক্ষে ফাংশনের অন্তরীকরণ",
      "question_text": "১৬. $\\tan y = \\frac{2t}{1-t^2}$ এবং $\\cos x = \\frac{1-t^2}{1+t^2}$ হলে, $\\frac{dy}{dx} = ?$ [JU '17-18; RU '14-15]",
      "options": [
        "$2$",
        "$1$",
        "$0$",
        "$\\sqrt{2}$"
      ],
      "correct_answer": "$1$",
      "explanation": "$$\\tan y = \\frac{2t}{1-t^2} \\Rightarrow y = \\tan^{-1}\\frac{2t}{1-t^2} = 2\\tan^{-1}t$$\n$$\\text{আবার, } \\cos x = \\frac{1-t^2}{1+t^2} \\Rightarrow x = 2\\tan^{-1}t \\therefore x = y$$\n$$\\text{এখন, } \\frac{dy}{dx} = 1$$",
      "time_limit": 60
    },
    {
      "id": 296,
      "topic": "৮. অব্যক্ত, পরামিতিক ও ফাংশনের সাপেক্ষে ফাংশনের অন্তরীকরণ",
      "question_text": "১৭. $\\tan y = \\frac{2t}{1-t^2}, \\sin x = \\frac{2t}{1+t^2}$ হলে, $\\frac{dy}{dx} =$ কত? [JU '17-18; KU '14-15, 09-10]",
      "options": [
        "$2\\tan^{-1}t$",
        "$2\\sin^{-1}t$",
        "$\\sin^{-1}\\frac{2t}{1+t^2}$",
        "$1$"
      ],
      "correct_answer": "$1$",
      "explanation": "$$y = \\tan^{-1}\\frac{2t}{1-t^2} = 2\\tan^{-1}t;$$\n$$x = \\sin^{-1}\\frac{2t}{1+t^2} = 2\\tan^{-1}t$$\n$$\\therefore y = x \\Rightarrow \\frac{dy}{dx} = 1$$",
      "time_limit": 60
    },
    {
      "id": 297,
      "topic": "৮. অব্যক্ত, পরামিতিক ও ফাংশনের সাপেক্ষে ফাংশনের অন্তরীকরণ",
      "question_text": "১৮. $x = f(\\theta) = r\\cos\\theta$ এবং $y = g(\\theta) = r\\sin\\theta$ হলে, $\\frac{dy}{dx}$ এবং $\\frac{dx}{dy}$ এর মান যথাক্রমে- [CU '16-17]",
      "options": [
        "$-\\cot\\theta, -\\tan\\theta$",
        "$\\tan\\theta, \\cot\\theta$",
        "$-\\tan\\theta, -\\cot\\theta$",
        "$-\\cot\\theta, \\tan\\theta$",
        "$\\cot\\theta, -\\tan\\theta$"
      ],
      "correct_answer": "$-\\cot\\theta, -\\tan\\theta$",
      "explanation": "$$\\frac{dy}{dx} = \\frac{\\frac{dy}{d\\theta}}{\\frac{dx}{d\\theta}} = \\frac{r\\cos\\theta}{-r\\sin\\theta} = -\\cot\\theta$$\n$$\\therefore \\frac{dx}{dy} = \\frac{1}{\\frac{dy}{dx}} = -\\tan\\theta$$",
      "time_limit": 60
    },
    {
      "id": 298,
      "topic": "৮. অব্যক্ত, পরামিতিক ও ফাংশনের সাপেক্ষে ফাংশনের অন্তরীকরণ",
      "question_text": "১৯. যদি $y = e^{\\sin^{-1}x}$ এবং $z = e^{-\\cos^{-1}x}$ হয়, তবে $\\frac{dy}{dz}$ এর মান কত? [RU '25-26]",
      "options": [
        "$e^{\\frac{\\pi}{2}}$",
        "$e^{-\\frac{\\pi}{2}}$",
        "$e^{\\sin^{-1}x}$",
        "$e^{\\cos^{-1}x}$"
      ],
      "correct_answer": "$e^{\\frac{\\pi}{2}}$",
      "explanation": "$$y = e^{\\sin^{-1}x} \\Rightarrow \\frac{dy}{dx} = \\frac{e^{\\sin^{-1}x}}{\\sqrt{1-x^2}}$$\n$$\\text{এবং } z = e^{-\\cos^{-1}x} \\Rightarrow \\frac{dz}{dx} = \\frac{e^{-\\cos^{-1}x}}{\\sqrt{1-x^2}}$$\n$$\\therefore \\frac{dy}{dz} = \\frac{\\frac{dy}{dx}}{\\frac{dz}{dx}} = \\frac{e^{\\sin^{-1}x}}{e^{-\\cos^{-1}x}} = e^{\\sin^{-1}x + \\cos^{-1}x} = e^{\\frac{\\pi}{2}}$$",
      "time_limit": 60
    },
    {
      "id": 299,
      "topic": "৮. অব্যক্ত, পরামিতিক ও ফাংশনের সাপেক্ষে ফাংশনের অন্তরীকরণ",
      "question_text": "২০. $e^x$ এর সাপেক্ষে $e^{5x}$ এর অন্তরীকরণ কর? [CU '24-25]",
      "options": [
        "$e^{5x}$",
        "$5e^{5x}$",
        "$e^x$",
        "$5e^{4x}$"
      ],
      "correct_answer": "$5e^{4x}$",
      "explanation": "$$\\frac{d}{d(e^x)}(e^{5x}) = \\frac{\\frac{d}{dx}(e^{5x})}{\\frac{d}{dx}(e^x)} = \\frac{5e^{5x}}{e^x} = 5e^{4x}$$",
      "time_limit": 60
    },
    {
      "id": 300,
      "topic": "৮. অব্যক্ত, পরামিতিক ও ফাংশনের সাপেক্ষে ফাংশনের অন্তরীকরণ",
      "question_text": "২১. $\\frac{d}{d\\cos x}(\\sin x) = ?$ [GST '20-21]",
      "options": [
        "$\\cot x$",
        "$-\\cot x$",
        "$\\sec^2 x$",
        "$\\text{cosec}^2 x$"
      ],
      "correct_answer": "$-\\cot x$",
      "explanation": "$$\\frac{d}{d\\cos x}(\\sin x) = \\frac{\\frac{d}{dx}(\\sin x)}{\\frac{d}{dx}(\\cos x)} = \\frac{\\cos x}{-\\sin x} = -\\cot x$$",
      "time_limit": 60
    },
    {
      "id": 301,
      "topic": "৮. অব্যক্ত, পরামিতিক ও ফাংশনের সাপেক্ষে ফাংশনের অন্তরীকরণ",
      "question_text": "২২. $x^2 + xy + y^2 = 1$ হলে, $\\frac{dy}{dx}$ এর মান কত? [RUET '24-25]",
      "options": [
        "$\\frac{x+2y}{x-2y}$",
        "$\\frac{2x+y}{y+2x}$",
        "$\\frac{2x+y}{x+2y}$",
        "$\\frac{-x-2y}{y+2x}$",
        "$\\frac{-2x-y}{x+2y}$"
      ],
      "correct_answer": "$\\frac{-2x-y}{x+2y}$",
      "explanation": "$$x^2 + xy + y^2 = 1$$\n$$\\Rightarrow 2x + y + x\\frac{dy}{dx} + 2y\\frac{dy}{dx} = 0$$\n$$\\Rightarrow \\frac{dy}{dx} = \\frac{-2x-y}{x+2y}$$",
      "time_limit": 60
    },
    {
      "id": 302,
      "topic": "৮. অব্যক্ত, পরামিতিক ও ফাংশনের সাপেক্ষে ফাংশনের অন্তরীকরণ",
      "question_text": "২৩. If $xy + x^2y^2 - 5 = 0$, find $\\frac{dy}{dx}$ [IUT '23-24]",
      "options": [
        "$-\\frac{y}{x}$",
        "$-\\frac{x}{y}$",
        "$\\frac{y}{x}$",
        "$\\frac{x}{y}$"
      ],
      "correct_answer": "$-\\frac{y}{x}$",
      "explanation": "$$x\\cdot\\frac{dy}{dx} + y + y^2\\cdot 2x + x^2\\cdot 2y\\cdot\\frac{dy}{dx} = 0$$\n$$\\Rightarrow \\frac{dy}{dx}(x + 2x^2y) = -y - 2xy^2$$\n$$\\Rightarrow \\frac{dy}{dx} = \\frac{-y(1+2xy)}{x(1+2xy)} = -\\frac{y}{x}$$",
      "time_limit": 60
    },
    {
      "id": 303,
      "topic": "৮. অব্যক্ত, পরামিতিক ও ফাংশনের সাপেক্ষে ফাংশনের অন্তরীকরণ",
      "question_text": "২৪. $x^{\\frac{1}{3}} + \\sin y = x^2$ সমীকরণে $x = 1$ এর জন্য $\\frac{dy}{dx}$ এর মান কত হবে? [CKRUET '22-23]",
      "options": [
        "$\\frac{5}{3}$",
        "$-\\frac{5}{3}$",
        "$0$",
        "$\\frac{1}{3}$",
        "$-\\frac{1}{3}$"
      ],
      "correct_answer": "$\\frac{5}{3}$",
      "explanation": "$$x=1 \\text{ হলে, } 1^{\\frac{1}{3}} + \\sin y = 1^2 \\Rightarrow \\sin y = 0 \\Rightarrow y = 0$$\n$$\\text{এখন } x^{\\frac{1}{3}} + \\sin y = x^2$$\n$$\\Rightarrow \\frac{1}{3}x^{-\\frac{2}{3}} + \\cos y\\cdot\\frac{dy}{dx} = 2x \\Rightarrow \\frac{dy}{dx} = \\frac{2x - \\frac{1}{3}x^{-\\frac{2}{3}}}{\\cos y}$$\n$$(1,0) \\text{ বিন্দুতে, } \\left.\\frac{dy}{dx}\\right|_{(1,0)} = \\frac{2\\cdot 1 - \\frac{1}{3}(1)^{-\\frac{2}{3}}}{\\cos 0^{\\circ}} = 2 - \\frac{1}{3} = \\frac{5}{3}$$",
      "time_limit": 60
    },
    {
      "id": 304,
      "topic": "৮. অব্যক্ত, পরামিতিক ও ফাংশনের সাপেক্ষে ফাংশনের অন্তরীকরণ",
      "question_text": "২৫. $x^y = y^x$ এর ক্ষেত্রে $\\frac{dy}{dx} = ?$ [BUET '21-22]",
      "options": [
        "$\\frac{x(\\ln y-x)}{y(\\ln x-y)}$",
        "$\\frac{y(x\\ln y-x)}{x(y\\ln x-y)}$",
        "$\\frac{y(x\\ln y-y)}{x(y\\ln x-x)}$",
        "None"
      ],
      "correct_answer": "$\\frac{y(x\\ln y-y)}{x(y\\ln x-x)}$",
      "explanation": "$$x^y = y^x \\Rightarrow y\\ln x = x\\ln y$$\n$$\\Rightarrow \\frac{y}{x} + \\ln x\\frac{dy}{dx} = \\ln y + \\frac{x}{y}\\cdot\\frac{dy}{dx}$$\n$$\\Rightarrow \\frac{dy}{dx} \\cdot \\frac{y\\ln x-x}{y} = \\frac{x\\ln y-y}{x} \\Rightarrow \\frac{dy}{dx} = \\frac{y(x\\ln y-y)}{x(y\\ln x-x)}$$",
      "time_limit": 60
    },
    {
      "id": 305,
      "topic": "৮. অব্যক্ত, পরামিতিক ও ফাংশনের সাপেক্ষে ফাংশনের অন্তরীকরণ",
      "question_text": "২৬. $y = \\sqrt{(\\sin x + y)}$ হলে, $\\frac{dy}{dx}$ এর মান নির্ণয় কর। [CKRUET '21-22]",
      "options": [
        "$\\frac{\\cos x}{1-2y}$",
        "$\\frac{\\cos x}{2y-1}$",
        "$\\frac{\\sin x}{2y-1}$",
        "$\\frac{\\sin x}{1-2y}$",
        "$2y-\\cos x$"
      ],
      "correct_answer": "$\\frac{\\cos x}{2y-1}$",
      "explanation": "$$y = \\sqrt{(\\sin x + y)} \\Rightarrow y^2 = \\sin x + y$$\n$$\\therefore 2y\\cdot y_1 = \\cos x + y_1$$\n$$\\Rightarrow y_1(2y-1) = \\cos x \\Rightarrow \\frac{dy}{dx} = y_1 = \\frac{\\cos x}{2y-1}$$",
      "time_limit": 60
    },
    {
      "id": 306,
      "topic": "৮. অব্যক্ত, পরামিতিক ও ফাংশনের সাপেক্ষে ফাংশনের অন্তরীকরণ",
      "question_text": "২৭. $y^x = e^{x+y}$ হলে $\\frac{dy}{dx}$ এর মান কোনটি? [KUET '16-17]",
      "options": [
        "$\\frac{y}{x+y}(1+\\ln y)$",
        "$\\frac{y}{x+y}(1-\\ln y)$",
        "$\\frac{y}{x-y}(1+\\ln y)$",
        "$\\frac{y}{x-y}(1-\\ln y)$",
        "$\\frac{x}{x-y}(\\ln y - 1)$"
      ],
      "correct_answer": "$\\frac{y}{x-y}(1-\\ln y)$",
      "explanation": "$$y^x = e^{x+y} \\Rightarrow x\\ln y = x+y$$\n$$\\therefore \\frac{x}{y}\\frac{dy}{dx} + \\ln y = 1 + \\frac{dy}{dx}$$\n$$\\Rightarrow \\frac{dy}{dx}\\cdot\\frac{x-y}{y} = 1-\\ln y \\Rightarrow \\frac{dy}{dx} = \\frac{y}{x-y}(1-\\ln y)$$",
      "time_limit": 60
    },
    {
      "id": 307,
      "topic": "৮. অব্যক্ত, পরামিতিক ও ফাংশনের সাপেক্ষে ফাংশনের অন্তরীকরণ",
      "question_text": "২৮. যদি $x^p y^q = (x+y)^{p+q}$ হয় তাহলে $\\frac{dy}{dx} = ?$ [BUTEX '15-16; RUET '10-11]",
      "options": [
        "$\\frac{x}{y}$",
        "$\\frac{y}{x}$",
        "$\\frac{y^2}{x}$",
        "$\\frac{x}{y^2}$"
      ],
      "correct_answer": "$\\frac{y}{x}$",
      "explanation": "$$x^p y^q = (x+y)^{p+q}$$\n$$\\Rightarrow \\ln(x^p y^q) = \\ln(x+y)^{p+q}$$\n$$\\Rightarrow \\ln x^p + \\ln y^q = (p+q)\\ln(x+y)$$\n$$\\Rightarrow p\\ln x + q\\ln y = (p+q)\\ln(x+y)$$\n$$\\Rightarrow p\\cdot\\frac{1}{x} + q\\cdot\\frac{1}{y}\\frac{dy}{dx} = \\frac{p+q}{x+y}\\left(1+\\frac{dy}{dx}\\right)$$\n$$\\Rightarrow \\frac{dy}{dx}\\left(\\frac{q}{y} - \\frac{p+q}{x+y}\\right) = \\frac{p+q}{x+y} - \\frac{p}{x}$$\n$$\\Rightarrow \\frac{dy}{dx}\\cdot\\frac{qx-py}{y(x+y)} = \\frac{qx-py}{x(x+y)} \\Rightarrow \\frac{dy}{dx} = \\frac{y}{x}$$",
      "time_limit": 60
    },
    {
      "id": 308,
      "topic": "৮. অব্যক্ত, পরামিতিক ও ফাংশনের সাপেক্ষে ফাংশনের অন্তরীকরণ",
      "question_text": "২৯. $xy + x^2y^2 = c$ সমীকরণটির $\\frac{dy}{dx}$ এর মান কত হবে? [CUET '15-16]",
      "options": [
        "$-\\frac{y}{x}$",
        "$\\frac{y}{x}$",
        "$\\frac{y}{x^2}$",
        "None"
      ],
      "correct_answer": "$-\\frac{y}{x}$",
      "explanation": "$$xy + x^2y^2 = c$$\n$$\\Rightarrow x\\frac{dy}{dx} + y + 2x^2y\\frac{dy}{dx} + 2xy^2 = 0$$\n$$\\Rightarrow (x+2x^2y)\\frac{dy}{dx} + y + 2xy^2 = 0$$\n$$\\Rightarrow \\frac{dy}{dx} = -\\frac{y(1+2xy)}{x(1+2xy)} = -\\frac{y}{x}$$",
      "time_limit": 60
    },
    {
      "id": 309,
      "topic": "৮. অব্যক্ত, পরামিতিক ও ফাংশনের সাপেক্ষে ফাংশনের অন্তরীকরণ",
      "question_text": "৩০. যদি $\\sin y = x\\sin(a+y)$ হয়, তবে $\\frac{dy}{dx}$ এর মান কোনটি? [KUET '14-15]",
      "options": [
        "$\\frac{\\sin^2(a+y)}{\\tan a}$",
        "$\\frac{\\sin^2(a+y)}{\\sin a}$",
        "$\\frac{\\sin^2(a+y)}{\\cos a}$",
        "$\\frac{\\sin^2(a+y)}{\\sec a}$",
        "$\\frac{\\sin^2(a+y)}{\\cos y}$"
      ],
      "correct_answer": "$\\frac{\\sin^2(a+y)}{\\sin a}$",
      "explanation": "$$\\sin y = x\\sin(a+y)$$\n$$\\Rightarrow \\cos y\\frac{dy}{dx} = \\sin(a+y) + x\\cos(a+y)\\frac{dy}{dx}$$\n$$\\therefore \\frac{dy}{dx} = \\frac{-\\sin(a+y)}{x\\cos(a+y)-\\cos y} = \\frac{-\\sin(a+y)}{\\frac{\\sin y}{\\sin(a+y)}\\cos(a+y)-\\cos y}$$\n$$= \\frac{\\sin^2(a+y)}{\\sin(a+y)\\cos y-\\sin y\\cos(a+y)} = \\frac{\\sin^2(a+y)}{\\sin a}$$",
      "time_limit": 60
    },
    {
      "id": 310,
      "topic": "৮. অব্যক্ত, পরামিতিক ও ফাংশনের সাপেক্ষে ফাংশনের অন্তরীকরণ",
      "question_text": "৩১. যদি $x = t - \\sin t$ এবং $y = 1 - \\cos t$ তাহলে $\\frac{dy}{dx}$ কত হবে? [CKRUET '20-21; KUET '12-13, 11-12]",
      "options": [
        "$\\cot\\frac{t}{2}$",
        "$\\tan\\frac{t}{2}$",
        "$\\tan t$",
        "$\\cot t$",
        "None of them"
      ],
      "correct_answer": "$\\cot\\frac{t}{2}$",
      "explanation": "$$x = t - \\sin t \\Rightarrow \\frac{dx}{dt} = 1 - \\cos t$$\n$$\\Rightarrow y = 1 - \\cos t \\Rightarrow \\frac{dy}{dt} = \\sin t$$\n$$\\therefore \\frac{dy}{dx} = \\frac{\\frac{dy}{dt}}{\\frac{dx}{dt}} = \\frac{\\sin t}{1-\\cos t} = \\frac{2\\sin\\frac{t}{2}\\cos\\frac{t}{2}}{2\\sin^2\\frac{t}{2}} = \\cot\\frac{t}{2}$$",
      "time_limit": 60
    },
    {
      "id": 311,
      "topic": "৮. অব্যক্ত, পরামিতিক ও ফাংশনের সাপেক্ষে ফাংশনের অন্তরীকরণ",
      "question_text": "৩২. If $x = a\\cos^3\\theta$ and $y = b\\sin^3\\theta$ then $\\frac{dy}{dx} = ?$ [IUT '14-15, 11-12]",
      "options": [
        "$-\\frac{b}{a}\\cot\\theta$",
        "$\\frac{b}{a}\\tan\\theta$",
        "$\\frac{a}{b}\\cot\\theta$",
        "$-\\frac{b}{a}\\tan\\theta$"
      ],
      "correct_answer": "$-\\frac{b}{a}\\tan\\theta$",
      "explanation": "$$\\frac{dx}{d\\theta} = 3a\\cos^2\\theta(-\\sin\\theta)$$\n$$\\Rightarrow \\frac{dy}{d\\theta} = 3b\\sin^2\\theta\\cos\\theta$$\n$$\\therefore \\frac{dy}{dx} = \\frac{\\frac{dy}{d\\theta}}{\\frac{dx}{d\\theta}} = -\\frac{b}{a}\\tan\\theta$$",
      "time_limit": 60
    },
    {
      "id": 312,
      "topic": "৯. পর্যায়ক্রমিক অন্তরীকরণ ও n-তম অন্তরজ",
      "question_text": "১. $y = \\ln e^{x^2}$ হলে $y_2 = ?$ [রা. বো. ২০]",
      "options": [
        "$2x$",
        "$e^{x^2}\\ln e^{x^2}$",
        "$2$",
        "$e^{x^2}$"
      ],
      "correct_answer": "$2$",
      "explanation": "$y = \\ln e^{x^2} = x^2.1 \\quad [\\because \\ln e = 1]$\n$\\Rightarrow \\frac{dy}{dx} = y_1 = 2x$\n$\\Rightarrow \\frac{d}{dx}(y_1) = y_2 = 2$",
      "time_limit": 60
    },
    {
      "id": 313,
      "topic": "৯. পর্যায়ক্রমিক অন্তরীকরণ ও n-তম অন্তরজ",
      "question_text": "২. যদি $y = \\sec x$ হয় তবে $y_2 + y$ এর মান কোনটি? [কু. বো. ২৩]",
      "options": [
        "$2$",
        "$2y$",
        "$2y^2$",
        "$2y^3$"
      ],
      "correct_answer": "$2y^3$",
      "explanation": "$y = \\sec x$\n$\\Rightarrow y_1 = \\sec x.\\tan x \\quad \\left[\\frac{dy}{dx} = y_1\\right]$\n$\\Rightarrow y_2 = \\sec x.\\sec^2 x + \\tan x.\\sec x.\\tan x$\n$= \\sec^3 x + \\tan^2 x.\\sec x$\n$= \\sec^3 x + \\sec x(\\sec^2 x - 1)$\n$= y^3 + y(y^2 - 1)$\n$\\Rightarrow y_2 = 2y^3 - y \\Rightarrow y_2 + y = 2y^3$",
      "time_limit": 60
    },
    {
      "id": 314,
      "topic": "৯. পর্যায়ক্রমিক অন্তরীকরণ ও n-তম অন্তরজ",
      "question_text": "৩. $\\cos(ax + b)$ এর $n$ তম অন্তরক সহগ কত? [য. বো. ২৫; ঢা. বো. ২২; অনুরূপ প্রশ্ন: ঢা. বো. ১৯]",
      "options": [
        "$(-1)^n a^n \\sin\\left(\\frac{n\\pi}{2} + ax + b\\right)$",
        "$a^n \\sin\\left(\\frac{n\\pi}{2} + ax + b\\right)$",
        "$\\cos\\left(\\frac{n\\pi}{2} + ax + b\\right)$",
        "$a^n \\cos\\left(\\frac{n\\pi}{2} + ax + b\\right)$"
      ],
      "correct_answer": "$a^n \\cos\\left(\\frac{n\\pi}{2} + ax + b\\right)$",
      "explanation": "$y = \\cos(ax + b)$\n$y_1 = -\\sin(ax + b).a$\n$= a\\sin(ax + b) = a\\cos\\left\\{\\frac{\\pi}{2} + (ax + b)\\right\\}$\n$y_2 = -a.a\\cos(ax + b)$\n$= -a^2\\cos(ax + b) = a^2\\cos\\left\\{2 \\times \\frac{\\pi}{2} + (ax + b)\\right\\}$\n$\\therefore y_n = a^n\\cos\\left(\\frac{n\\pi}{2} + ax + b\\right)$ [মুখস্থ রেখো]",
      "time_limit": 60
    },
    {
      "id": 315,
      "topic": "৯. পর্যায়ক্রমিক অন্তরীকরণ ও n-তম অন্তরজ",
      "question_text": "৪. $x$ এর সাপেক্ষে $\\cos 2x$ এর $n$-তম অন্তরক সহগ- [সি. বো. ২৫; অনুরূপ প্রশ্ন: চ. বো. ২২]",
      "options": [
        "$2^n \\cos\\left(\\frac{n\\pi}{2} - 2x\\right)$",
        "$2^n \\cos\\left(\\frac{n\\pi}{2} + 2x\\right)$",
        "$\\cos\\left(\\frac{n\\pi}{2} - 2x\\right)$",
        "$\\cos\\left(\\frac{n\\pi}{2} + 2x\\right)$"
      ],
      "correct_answer": "$2^n \\cos\\left(\\frac{n\\pi}{2} + 2x\\right)$",
      "explanation": "$y = \\cos(ax + b)$ হলে, $y_n = a^n \\cos\\left\\{\\frac{n\\pi}{2} + (ax + b)\\right\\}$\n$\\therefore y = \\cos 2x$ হলে, $y_n = 2^n \\cos\\left(\\frac{n\\pi}{2} + 2x\\right)$",
      "time_limit": 60
    },
    {
      "id": 316,
      "topic": "৯. পর্যায়ক্রমিক অন্তরীকরণ ও n-তম অন্তরজ",
      "question_text": "৫. $y = \\frac{2}{3x}$ হলে, $y_3 =$ কত? [দ. বো. ২২]",
      "options": [
        "$-\\frac{4}{x^4}$",
        "$\\frac{4}{x^4}$",
        "$4x^4$",
        "$-4x^4$"
      ],
      "correct_answer": "$-\\frac{4}{x^4}$",
      "explanation": "$y = \\frac{2}{3x} = \\frac{2}{3}x^{-1}$\n$y_1 = -\\frac{2}{3}x^{-2}$\n$y_2 = -\\frac{2}{3}\\times(-2)x^{-3}$\n$y_3 = -\\frac{2}{3}\\times(-2)(-3)\\times x^{-4} = -\\frac{4}{x^4}$",
      "time_limit": 60
    },
    {
      "id": 317,
      "topic": "৯. পর্যায়ক্রমিক অন্তরীকরণ ও n-তম অন্তরজ",
      "question_text": "৬. $y = \\sin 2x$ হলে $y_n$ এর মান কোনটি? [ঢা. বো. ২৫; অনুরূপ প্রশ্ন: সি. বো. ২২; দি. বো. ১৯]",
      "options": [
        "$2^n \\sin\\left(\\frac{n\\pi}{2} - 2x\\right)$",
        "$2^n \\sin\\left(\\frac{n\\pi}{2} + 2x\\right)$",
        "$\\sin\\left(\\frac{n\\pi}{2} - 2x\\right)$",
        "$\\sin\\left(\\frac{n\\pi}{2} + 2x\\right)$"
      ],
      "correct_answer": "$2^n \\sin\\left(\\frac{n\\pi}{2} + 2x\\right)$",
      "explanation": "$y = \\sin(ax + b)$ হলে, $y_n = a^n \\sin\\left\\{\\frac{n\\pi}{2} + (ax + b)\\right\\}$\n$\\therefore y = \\sin 2x$ হলে, $y_n = 2^n \\sin\\left(\\frac{n\\pi}{2} + 2x\\right)$\nউদ্দীপক: উদ্দীপকের আলোকে ৭ ও ৮ নং প্রশ্নের উত্তর দাও:\n$f(x) = \\ln(1 - x)$ এবং $g(x) = \\tan x^2$",
      "time_limit": 60
    },
    {
      "id": 318,
      "topic": "৯. পর্যায়ক্রমিক অন্তরীকরণ ও n-তম অন্তরজ",
      "question_text": "৭. $g(x)$ এর অন্তরজ কোনটি? [কু. বো. ২২]",
      "options": [
        "$\\sec^2 x^2$",
        "$2x\\sec x^2$",
        "$2x\\sec^2 x^2$",
        "$2\\tan x\\sec^2 x$"
      ],
      "correct_answer": "$2x\\sec^2 x^2$",
      "explanation": "$g(x) = \\tan x^2 \\Rightarrow g'(x) = \\sec^2 x^2 \\times 2x = 2x\\sec^2 x^2$\nউদ্দীপক: উদ্দীপকের আলোকে ৭ ও ৮ নং প্রশ্নের উত্তর দাও:\n$f(x) = \\ln(1 - x)$ এবং $g(x) = \\tan x^2$",
      "time_limit": 60
    },
    {
      "id": 319,
      "topic": "৯. পর্যায়ক্রমিক অন্তরীকরণ ও n-তম অন্তরজ",
      "question_text": "৮. $f''(2)$ এর মান কত? [কু. বো. ২২; অনুরূপ প্রশ্ন: ঢা. বো. ২১]",
      "options": [
        "$-2$",
        "$-1$",
        "$1$",
        "$2$"
      ],
      "correct_answer": "$-1$",
      "explanation": "$f(x) = \\ln(1 - x)$\n$\\Rightarrow f'(x) = \\frac{1}{1 - x} \\times (-1) = (-1)(1 - x)^{-1}$\n$\\therefore f''(x) = (-1)(-1)(1 - x)^{-2}(-1) = -(1 - x)^{-2} = -\\frac{1}{(1 - x)^2}$\n$\\therefore f''(2) = \\frac{-1}{(1 - 2)^2} = -1$",
      "time_limit": 60
    },
    {
      "id": 320,
      "topic": "৯. পর্যায়ক্রমিক অন্তরীকরণ ও n-তম অন্তরজ",
      "question_text": "৯. $\\frac{d^{10}}{dx^{10}}(x^{10})$ এর মান কত? [রা. বো. ২১]",
      "options": [
        "$10!$",
        "$10!.x$",
        "$10!.x^2$",
        "$0$"
      ],
      "correct_answer": "$10!$",
      "explanation": "$\\frac{d^n}{dx^n}(x^n) = n!$ এবং $\\frac{d^n}{dx^n}(x^m) = 0$\n$\\therefore \\frac{d^{10}}{dx^{10}}(x^{10}) = 10!$",
      "time_limit": 60
    },
    {
      "id": 321,
      "topic": "৯. পর্যায়ক্রমিক অন্তরীকরণ ও n-তম অন্তরজ",
      "question_text": "১০. $f(x) = \\sin\\frac{x}{2}$ হলে, $f''\\left(\\frac{\\pi}{2}\\right) = \\text{কত}?$ [ব. বো. ২১]",
      "options": [
        "$\\frac{1}{2\\sqrt{2}}$",
        "$\\frac{1}{4\\sqrt{2}}$",
        "$\\frac{-1}{2\\sqrt{2}}$",
        "$\\frac{-1}{4\\sqrt{2}}$"
      ],
      "correct_answer": "$\\frac{-1}{4\\sqrt{2}}$",
      "explanation": "$f(x) = \\sin\\frac{x}{2} = \\sin\\left(\\frac{1}{2}\\right)x$\n$f''(x) = \\left(\\frac{1}{2}\\right)^2 \\sin\\left((2)\\frac{\\pi}{2} + \\frac{x}{2}\\right) = -\\frac{1}{4}\\sin\\frac{x}{2}$\n$\\therefore f''\\left(\\frac{\\pi}{2}\\right) = -\\frac{1}{4}\\sin\\frac{\\pi}{4} = -\\frac{1}{4\\sqrt{2}}$",
      "time_limit": 60
    },
    {
      "id": 322,
      "topic": "৯. পর্যায়ক্রমিক অন্তরীকরণ ও n-তম অন্তরজ",
      "question_text": "১১. $\\frac{d^{50}}{dx^{50}}(5x)^6$ এর মান কত? [সি. বো. ২১]",
      "options": [
        "$6!$",
        "$7!$",
        "$0$",
        "$30$"
      ],
      "correct_answer": "$0$",
      "explanation": "$x$ এর সর্বোচ্চ ঘাতের চেয়ে বেশি বার অন্তরীকরণ করায় এর মান শূন্য।",
      "time_limit": 60
    },
    {
      "id": 323,
      "topic": "৯. পর্যায়ক্রমিক অন্তরীকরণ ও n-তম অন্তরজ",
      "question_text": "১২. $y = \\sin 2x$ হলে- [কু. বো. ২১; অনুরূপ প্রশ্ন: কু. বো. ২২]\ni. $y_1 = 2\\cos 2x$\nii. $y_2 + 4y = 0$\niii. $y_3 - 4y_1 = 0$\nনিচের কোনটি সঠিক?",
      "options": [
        "i ও ii",
        "i ও iii",
        "ii ও iii",
        "i, ii ও iii"
      ],
      "correct_answer": "i ও ii",
      "explanation": "(i) $y = \\sin 2x \\Rightarrow y_1 = 2\\cos 2x$\n(ii) $y_2 = -4\\sin 2x = -4y$\n$\\therefore y_2 + 4y = 0$\n(iii) $y_3 = -8\\cos 2x = -4y_1$\n$y_3 - 4y_1 = -4y_1 - 4y_1 = -8y_1$",
      "time_limit": 60
    },
    {
      "id": 324,
      "topic": "৯. পর্যায়ক্রমিক অন্তরীকরণ ও n-তম অন্তরজ",
      "question_text": "১৩. $y = ne^{-nx}$ হলে $y_3$ কোনটি? [কু. বো. ১৯]",
      "options": [
        "$-n^4 e^{-nx}$",
        "$-n^3 e^{-nx}$",
        "$n^4 e^{-nx}$",
        "$ne^{-nx}$"
      ],
      "correct_answer": "$-n^4 e^{-nx}$",
      "explanation": "$y = ne^{-nx} \\Rightarrow y_1 = -n^2 e^{-nx} \\Rightarrow y_2 = n^3 e^{-nx} \\Rightarrow y_3 = -n^4 e^{-nx}$",
      "time_limit": 60
    },
    {
      "id": 325,
      "topic": "৯. পর্যায়ক্রমিক অন্তরীকরণ ও n-তম অন্তরজ",
      "question_text": "১৪. $y = \\frac{1}{x}$ হলে, $y_3 = \\text{কত}?$ [দি. বো. ২০; অনুরূপ প্রশ্ন: সি. বো. ১৯; ব. বো. ১৯]",
      "options": [
        "$-\\frac{3!}{x^3}$",
        "$-\\frac{3!}{x^4}$",
        "$-\\frac{1}{x^3}$",
        "$\\frac{1}{x^4}$"
      ],
      "correct_answer": "$-\\frac{3!}{x^4}$",
      "explanation": "$y = \\frac{1}{x} = x^{-1}$\n$\\therefore y_1 = -1x^{-1-1} = -x^{-2}$\n$\\therefore y_2 = +2x^{-2-1} = 2x^{-3}$\n$\\therefore y_3 = -2\\times 3x^{-3-1} = -\\frac{6}{x^4} = -\\frac{3!}{x^4}$",
      "time_limit": 60
    },
    {
      "id": 326,
      "topic": "৯. পর্যায়ক্রমিক অন্তরীকরণ ও n-তম অন্তরজ",
      "question_text": "১৫. $y = e^{-x}$ হলে $y_5$ কোনটি? [সকল বোর্ড ১৮]",
      "options": [
        "$-e^{-x}$",
        "$e^{-x}$",
        "$-5e^{-x}$",
        "$5e^{-x}$"
      ],
      "correct_answer": "$-e^{-x}$",
      "explanation": "$y = e^{-x}$\nএখন, $y_1 = -e^{-x}; y_2 = e^{-x}$\n$\\therefore y_{\\text{odd}} = -e^{-x}; y_{\\text{even}} = e^{-x}$\n$\\therefore y_5 = -e^{-x}$",
      "time_limit": 60
    },
    {
      "id": 327,
      "topic": "৯. পর্যায়ক্রমিক অন্তরীকরণ ও n-তম অন্তরজ",
      "question_text": "১৬. $\\frac{d^n}{dx^n}(x^n)$ এর মান কোনটি? [দি. বো. ১৭]",
      "options": [
        "$n!$",
        "$x$",
        "$1$",
        "$0$"
      ],
      "correct_answer": "$n!$",
      "explanation": "$x^n$ এর $n$ তম অন্তরজ $\\frac{d^n}{dx^n}(x^n) = n!$",
      "time_limit": 60
    },
    {
      "id": 328,
      "topic": "৯. পর্যায়ক্রমিক অন্তরীকরণ ও n-তম অন্তরজ",
      "question_text": "১৭. যদি $y = \\frac{1}{x}$ হয়, তবে $y$ এর ২০ তম অন্তরকসহগ কত? [JnU '25-26]",
      "options": [
        "$\\frac{20!}{x^{21}}$",
        "$\\frac{20!}{x^{20}}$",
        "$\\frac{21!}{x^{20}}$",
        "$\\frac{22!}{x^{21}}$"
      ],
      "correct_answer": "$\\frac{20!}{x^{21}}$",
      "explanation": "$y = \\frac{1}{x}$ হলে, $y_n = (-1)^n \\frac{n!}{x^{n+1}}$\n$\\therefore y_{20} = (-1)^{20} \\frac{20!}{x^{20+1}} = \\frac{20!}{x^{21}}$",
      "time_limit": 60
    },
    {
      "id": 329,
      "topic": "৯. পর্যায়ক্রমিক অন্তরীকরণ ও n-তম অন্তরজ",
      "question_text": "১৮. $y = 1 + x + x^2 + \\dots + x^{10}$ হলে $y_9 = ?$ [RU '25-26]",
      "options": [
        "$10!$",
        "$9!$",
        "$9!(1 + x)$",
        "$9!(1 + 10x)$"
      ],
      "correct_answer": "$9!(1 + 10x)$",
      "explanation": "$y = 1 + x + x^2 + x^3 + \\dots + x^9 + x^{10}$\n$y_1 = 0 + 1 + 2x + 3x^2 + \\dots + 9\\cdot x^8 + 10x^9$\n$y_2 = 0 + 0 + 2 + (3\\times 2)x + \\dots + 9\\cdot 8x^7 + (10\\times 9)x^8$\n$y_9 = 9! + 10!x = 9!(1 + 10x)$",
      "time_limit": 60
    },
    {
      "id": 330,
      "topic": "৯. পর্যায়ক্রমিক অন্তরীকরণ ও n-তম অন্তরজ",
      "question_text": "১৯. $y = \\frac{1}{x}$ হলে, $y$ এর $18$ তম অন্তরীকরণ কোনটি? [CU '25-26; CoU '25-26]",
      "options": [
        "$\\frac{18!}{x^{19}}$",
        "$-\\frac{18!}{x^{19}}$",
        "$\\frac{18!}{x^{18}}$",
        "কোনোটিই নয়"
      ],
      "correct_answer": "$\\frac{18!}{x^{19}}$",
      "explanation": "$y = \\frac{1}{x} \\therefore y_1 = (-1)x^{-2}$\n$y_2 = (-1)(-2)x^{-3}$\n$\\dots$\n$y_n = (-1)^n \\times \\frac{n!}{x^{n+1}}$\n$y_{18} = (-1)^{18} \\frac{18!}{x^{18+1}} = \\frac{18!}{x^{19}}$",
      "time_limit": 60
    },
    {
      "id": 331,
      "topic": "৯. পর্যায়ক্রমিক অন্তরীকরণ ও n-তম অন্তরজ",
      "question_text": "২০. $y = \\frac{1}{x}$ হলে, $y_n = \\text{কত}?$ [GST '23-24; RU '22-23, 13-14; BAU '14-15; CU '07-08]",
      "options": [
        "$\\frac{(-1)^{n+1} n!}{x^{n+1}}$",
        "$\\frac{(-1)^n n!}{x^{n+1}}$",
        "$\\frac{(-1)^{n+1} n!}{(n+1)!}$",
        "$\\frac{(-1)^n n!}{(n-1)!}$"
      ],
      "correct_answer": "$\\frac{(-1)^n n!}{x^{n+1}}$",
      "explanation": "$y = \\frac{1}{x} = x^{-1}$\n$y_1 = (-1)x^{-2} = -\\frac{1}{x^2}$\n$\\Rightarrow y_n = (-1)(-2)x^{-3} = \\frac{(-1)^2 \\cdot 2!}{x^3} \\dots$\n$y_3 = (-1)(-2)(-3)x^{-4} = -\\frac{6}{x^4} = \\frac{(-1)^3 \\cdot 3!}{x^{3+1}}$\n$\\therefore y_n = n!\\times (-1)^n \\times x^{-(n+1)} = \\frac{(-1)^n n!}{x^{n+1}}$",
      "time_limit": 60
    },
    {
      "id": 332,
      "topic": "৯. পর্যায়ক্রমিক অন্তরীকরণ ও n-তম অন্তরজ",
      "question_text": "২১. $y = x^{-2} \\ln x$ হলে, $\\frac{d^2 y}{dx^2}$ এর মান কত? [DU '22-23]",
      "options": [
        "$x^{-4} \\ln x - 2x^{-2} - 3x^{-4}$",
        "$6x^{-4} \\ln x - 5x^{-4}$",
        "$6x^{-4} \\ln x - 2x^{-2} - 3x^{-4}$",
        "$x^{-4} \\ln x - 2x^{-2} + 3x^{-4}$"
      ],
      "correct_answer": "$6x^{-4} \\ln x - 5x^{-4}$",
      "explanation": "$y = x^{-2} \\ln x$\n$\\Rightarrow \\frac{dy}{dx} = x^{-2}\\cdot\\frac{1}{x} + (\\ln x)(-2)x^{-3} = x^{-3} - 2x^{-3} \\ln x$\n$\\Rightarrow \\frac{dy}{dx} = x^{-3}(1 - 2\\ln x)$\n$\\Rightarrow \\frac{d^2 y}{dx^2} = x^{-3}\\left(0 - \\frac{2}{x}\\right) + (1 - 2\\ln x)(-3)x^{-4}$\n$\\Rightarrow \\frac{d^2 y}{dx^2} = -2x^{-4} - 3x^{-4} + 6x^{-4}\\ln x$\n$\\therefore \\frac{d^2 y}{dx^2} = 6x^{-4}\\ln x - 5x^{-4}$",
      "time_limit": 60
    },
    {
      "id": 333,
      "topic": "৯. পর্যায়ক্রমিক অন্তরীকরণ ও n-তম অন্তরজ",
      "question_text": "২২. $y = e^{-x}$ হলে, $y_5$ কোনটি? [Agri. '21-22]",
      "options": [
        "$-e^{-x}$",
        "$e^{-x}$",
        "$-5e^{-x}$",
        "$5e^{-x}$"
      ],
      "correct_answer": "$-e^{-x}$",
      "explanation": "$y = e^{-x} \\Rightarrow y_1 = -e^{-x} \\Rightarrow y_2 = e^{-x}$\n$\\Rightarrow y_3 = -e^{-x} \\Rightarrow y_4 = e^{-x} \\Rightarrow y_5 = -e^{-x}$\nShortcut: $y = e^{-x}$ এমন একটি প্যাটার্ন যাকে বিজোড় সংখ্যক বার অন্তরীকরণ করা হলে অন্তরজ সহগ পাওয়া যায় $-e^{-x}$ এবং জোড় সংখ্যক বার অন্তরীকরণ করা হলে পাওয়া যায় $e^{-x}$। এক্ষেত্রে $5$ বার (বিজোড়) অন্তরীকরণ করলে $y_5 = -e^{-x}$",
      "time_limit": 60
    },
    {
      "id": 334,
      "topic": "৯. পর্যায়ক্রমিক অন্তরীকরণ ও n-তম অন্তরজ",
      "question_text": "২৩. $y_1 = \\frac{1}{x}$ হলে, $y_n = \\text{কত}?$ [RU '21-22]",
      "options": [
        "$\\frac{(n-1)!}{x^{n+1}}$",
        "$\\frac{(-1)^n n!}{x^n}$",
        "$\\frac{(-1)^{n-1}(n-1)!}{x^n}$",
        "$\\frac{(-1)^n n!}{x^{n+1}}$"
      ],
      "correct_answer": "$\\frac{(-1)^{n-1}(n-1)!}{x^n}$",
      "explanation": "$y_1 = \\frac{1}{x} \\Rightarrow y_2 = \\frac{(-1)}{x^2}$\n$\\Rightarrow y_3 = \\frac{(-1)(-2)}{x^3} = \\frac{(-1)^2\\cdot 2!}{x^3} = \\frac{(-1)^{3-1}(3-1)!}{x^3}$\n$\\Rightarrow y_n = \\frac{(-1)^{n-1}(n-1)!}{x^n}$",
      "time_limit": 60
    },
    {
      "id": 335,
      "topic": "৯. পর্যায়ক্রমিক অন্তরীকরণ ও n-তম অন্তরজ",
      "question_text": "২৪. $f(x) = \\sin x$ হলে, $f^{11}(0)$ এর মান কত? [SUST '19-20]",
      "options": [
        "$1$",
        "$0$",
        "$-1$",
        "$\\frac{1}{2}$"
      ],
      "correct_answer": "$-1$",
      "explanation": "$y_n = \\sin\\left(\\frac{n\\pi}{2} + x\\right)$\n$\\therefore f^{11}(x) = \\sin\\left(\\frac{11\\pi}{2} + x\\right) = -\\cos x$\n$\\therefore f^{11}(0) = -\\cos 0 = -1$",
      "time_limit": 60
    },
    {
      "id": 336,
      "topic": "৯. পর্যায়ক্রমিক অন্তরীকরণ ও n-তম অন্তরজ",
      "question_text": "২৫. যদি $y = x^3 \\ln x$ হয়, তবে $\\frac{d^4 y}{dx^4} = ?$ [BAU '18-19; JU '14-15; RU '10-11, 09-10]",
      "options": [
        "$\\frac{1}{x^3}$",
        "$\\frac{1}{x^2}$",
        "$\\frac{6}{x}$",
        "$\\frac{6}{x^2}$"
      ],
      "correct_answer": "$\\frac{6}{x}$",
      "explanation": "$y = x^3 \\ln x \\therefore y_1 = 3x^2 \\ln x + x^2;$\n$y_2 = 6x\\ln x + 3x + 2x = 6x\\ln x + 5x$\n$\\therefore y_3 = 6\\ln x + 6 + 5 = 6\\ln x + 11 ; y_4 = \\frac{6}{x}$",
      "time_limit": 60
    },
    {
      "id": 337,
      "topic": "৯. পর্যায়ক্রমিক অন্তরীকরণ ও n-তম অন্তরজ",
      "question_text": "২৬. $f(x) = \\cos a$ হলে $f'(a)$ এবং $f''(a)$ এর মান যথাক্রমে কত? [CU '16-17]",
      "options": [
        "$-\\sin a, -\\cos a$",
        "$0, -\\sin a$",
        "$-\\cos a, -\\sin a$",
        "$0, 0$",
        "$-\\sin a, 0$"
      ],
      "correct_answer": "$0, 0$",
      "explanation": "$f(x) = \\cos a ; \\quad [\\cos a \\text{ একটি ধ্রুবক}]$\n$\\therefore f'(x) = 0 ; f''(x) = 0 \\text{ অর্থাৎ } f'(a) = 0 ; f''(a) = 0$",
      "time_limit": 60
    },
    {
      "id": 338,
      "topic": "৯. পর্যায়ক্রমিক অন্তরীকরণ ও n-তম অন্তরজ",
      "question_text": "২৭. $y = (x - 1)^3$ হলে, $y_4$ এর মান? [JU '14-15; RU '09-10]",
      "options": [
        "$0$",
        "$6$",
        "$3$",
        "$-6$"
      ],
      "correct_answer": "$0$",
      "explanation": "$y = (x - 1)^3 \\Rightarrow y_1 = 3(x - 1)^2$\n$\\Rightarrow y_2 = 6(x - 1) \\Rightarrow y_3 = 6 \\Rightarrow y_4 = 0$\nShortcut: $y = (x - 1)^3$ কে বিশেষ একটি প্যাটার্নে বিবেচনা করলে $y_4 = 0$ হয়। $[y = x^m, \\text{যেখানে, } m < n \\text{ হলে } y_n = 0]$",
      "time_limit": 60
    },
    {
      "id": 339,
      "topic": "৯. পর্যায়ক্রমিক অন্তরীকরণ ও n-তম অন্তরজ",
      "question_text": "২৮. $y = (2x - 5)^3$ হলে $y_n = \\text{কত}?$ [CU '14-15, 10-11]",
      "options": [
        "$24$",
        "$48$",
        "$0$",
        "অনির্ণেয়",
        "$50$"
      ],
      "correct_answer": "অনির্ণেয়",
      "explanation": "$y = (2x - 5)^3,$\n$y_1 = 3 \\cdot (2x - 5)^2 \\cdot 2 = 6(2x - 5)^2,$\n$y_2 = 6 \\cdot 2(2x - 5) \\cdot 2 = 24(2x - 5)$\n$y_3 = 24(2x - 5)^0 \\cdot 2 = 48, y_4 = 0$ যদি $n > 4$ তবে $y_n$ অনির্ণেয়।",
      "time_limit": 60
    },
    {
      "id": 340,
      "topic": "৯. পর্যায়ক্রমিক অন্তরীকরণ ও n-তম অন্তরজ",
      "question_text": "২৯. $y = \\ln(1 + x)$ হলে, $\\frac{d^2 y}{dx^2} = ?$ [SAU '14-15; JU '09-10]",
      "options": [
        "$\\frac{1}{1+x^2}$",
        "$1 + x^2$",
        "$\\frac{-1}{(1+x)^2}$",
        "$-1(1 + x)^2$"
      ],
      "correct_answer": "$\\frac{-1}{(1+x)^2}$",
      "explanation": "$y = \\ln(1 + x), \\frac{dy}{dx} = \\frac{1}{(1+x)} = (1 + x)^{-1};$\n$\\frac{d^2 y}{dx^2} = -1(1 + x)^{-1-1} = -\\frac{1}{(1+x)^2}$",
      "time_limit": 60
    },
    {
      "id": 341,
      "topic": "৯. পর্যায়ক্রমিক অন্তরীকরণ ও n-তম অন্তরজ",
      "question_text": "৩০. কোন ফাংশনটির জন্য $(1 - x^2)\\frac{d^2 y}{dx^2} - x\\frac{dy}{dx} = 2$ সত্য? [DU '21-22]",
      "options": [
        "$y = \\cos^{-1} x$",
        "$y = (\\cos^{-1} x)^2$",
        "$y = \\sin^{-1} x$",
        "$y = \\tan^{-1} x$"
      ],
      "correct_answer": "$y = (\\cos^{-1} x)^2$",
      "explanation": "$y = (\\cos^{-1} x)^2$\n$\\Rightarrow \\frac{dy}{dx} = 2\\cos^{-1} x\\left(-\\frac{1}{\\sqrt{1 - x^2}}\\right)$\n$\\Rightarrow \\sqrt{1 - x^2}\\frac{dy}{dx} = -2\\cos^{-1} x$\n$\\Rightarrow (1 - x^2)\\left(\\frac{dy}{dx}\\right)^2 = 4(\\cos^{-1} x)^2$\n$\\Rightarrow (1 - x^2)\\left(\\frac{dy}{dx}\\right)^2 = 4y$\n$\\Rightarrow (1 - x^2)\\cdot 2\\frac{dy}{dx}\\cdot\\frac{d^2 y}{dx^2} + \\left(\\frac{dy}{dx}\\right)^2\\cdot (-2x) = 4\\frac{dy}{dx}$\n$\\Rightarrow (1 - x^2)\\frac{d^2 y}{dx^2} - x\\frac{dy}{dx} = 2$",
      "time_limit": 60
    },
    {
      "id": 342,
      "topic": "৯. পর্যায়ক্রমিক অন্তরীকরণ ও n-তম অন্তরজ",
      "question_text": "৩১. $y = ax + \\frac{b}{x}$ হলে, নিচের কোনটি সঠিক? [RU '21-22]",
      "options": [
        "$x^2 \\frac{d^2 y}{dx^2} + 2\\frac{dy}{dx} = -2a$",
        "$\\frac{d^2 y}{dx^2} + 2\\frac{dy}{dx} = 4a$",
        "$x\\frac{d^2 y}{dx^2} + 2\\frac{dy}{dx} = 2a$",
        "$x^2 \\frac{d^2 y}{dx^2} + 2\\frac{dy}{dx} = 3a$"
      ],
      "correct_answer": "$x\\frac{d^2 y}{dx^2} + 2\\frac{dy}{dx} = 2a$",
      "explanation": "$y = ax + \\frac{b}{x} \\therefore \\frac{dy}{dx} = a - \\frac{b}{x^2}$\n$\\Rightarrow x^2 \\frac{dy}{dx} = ax^2 - b \\Rightarrow x^2 \\cdot \\frac{d^2 y}{dx^2} + \\frac{dy}{dx} \\cdot 2x = 2ax$\n[$x$ এর সাপেক্ষে আবার অন্তরীকরণ করে]\n$\\therefore x\\frac{d^2 y}{dx^2} + 2\\frac{dy}{dx} = 2a$ [$x$ দ্বারা ভাগ করে]",
      "time_limit": 60
    },
    {
      "id": 343,
      "topic": "৯. পর্যায়ক্রমিক অন্তরীকরণ ও n-তম অন্তরজ",
      "question_text": "৩২. $y = x^y$ হলে, $(1 - y\\ln x)\\frac{dy}{dx} = \\text{কত}?$ [RU '18-19]",
      "options": [
        "$x^{2y} - 1$",
        "$x^{2y-1}$",
        "$x^{y-\\frac{1}{x}}$",
        "$x^{2(y-1)}$"
      ],
      "correct_answer": "$x^{2y-1}$",
      "explanation": "$y = x^y \\Rightarrow \\ln y = y\\ln x \\Rightarrow \\frac{y_1}{y} = \\frac{y}{x} + y_1 \\ln x$\n$\\Rightarrow y_1(1 - y\\ln x) = \\frac{y^2}{x} = x^{2y-1} ; \\quad [\\text{যেহেতু, } y^2 = x^{2y}]$",
      "time_limit": 60
    },
    {
      "id": 344,
      "topic": "৯. পর্যায়ক্রমিক অন্তরীকরণ ও n-তম অন্তরজ",
      "question_text": "৩৩. যদি $y = \\frac{\\ln x}{x}$ হয়, তবে $x^3 y_2 - 2xy$ এর মান কোনটি? [RU '17-18]",
      "options": [
        "$-3$",
        "$-2$",
        "$-1$",
        "$0$"
      ],
      "correct_answer": "$-3$",
      "explanation": "$y = \\frac{\\ln x}{x} ; y_1 = \\frac{x\\cdot\\frac{1}{x} - \\ln x\\cdot 1}{x^2} = \\frac{1 - \\ln x}{x^2} ;$\n$y_2 = \\frac{x^2\\left(-\\frac{1}{x}\\right) - (1 - \\ln x)2x}{x^4} = \\frac{-3 + 2\\ln x}{x^3}$\n$\\therefore x^3 y_2 - 2xy = -3 ; \\quad [\\because \\ln x = xy]$",
      "time_limit": 60
    },
    {
      "id": 345,
      "topic": "৯. পর্যায়ক্রমিক অন্তরীকরণ ও n-তম অন্তরজ",
      "question_text": "৩৪. $y = pe^{mx} + qe^{-mx}$ হলে, $y_2 - m^2 y = ?$ [CU '16-17]",
      "options": [
        "$y$",
        "$y^2$",
        "$1$",
        "কোনোটিই নয়"
      ],
      "correct_answer": "কোনোটিই নয়",
      "explanation": "$y = pe^{mx} + qe^{-mx}$\n$\\therefore y_1 = m(pe^{mx} - qe^{-mx})$\n$\\therefore y_2 = m^2(pe^{mx} + qe^{-mx}) = m^2 y$\n$\\therefore y_2 - m^2 y = 0$",
      "time_limit": 60
    },
    {
      "id": 346,
      "topic": "৯. পর্যায়ক্রমিক অন্তরীকরণ ও n-তম অন্তরজ",
      "question_text": "৩৫. $y = \\cos(2\\sin^{-1} x)$ হলে, $y_2(0) = ?$ [RUET '25-26]",
      "options": [
        "$0$",
        "$4$",
        "$-4$",
        "$-8$",
        "$16$"
      ],
      "correct_answer": "$-4$",
      "explanation": "$y = \\cos(2\\sin^{-1} x) = \\cos(\\sin^{-1}(2x\\sqrt{1 - x^2}))$\n$\\Rightarrow y = \\cos(\\cos^{-1}(1 - 2x^2))$\n$\\Rightarrow y = 1 - 2x^2 \\Rightarrow y_1 = -4x$\n$\\Rightarrow y_2 = -4 \\therefore y_2(0) = -4$",
      "time_limit": 60
    },
    {
      "id": 347,
      "topic": "৯. পর্যায়ক্রমিক অন্তরীকরণ ও n-তম অন্তরজ",
      "question_text": "৩৬. $y = 3e^{mx} + 4e^{-mx}$ এবং $\\left(\\frac{d^2 y}{dx^2}\\right)_{x=0} = 28$ হলে, $m$ এর মান কত? [CUET '25-26]",
      "options": [
        "$0$",
        "$1$",
        "$2$",
        "$3$",
        "$4$"
      ],
      "correct_answer": "$2$",
      "explanation": "$y = 3e^{mx} + 4e^{-mx}$\n$\\therefore \\frac{dy}{dx} = 3me^{mx} - 4me^{-mx}$\n$\\frac{d^2 y}{dx^2} = 3m^2 e^{mx} + 4m^2 e^{-mx} = m^2(3e^{mx} + 4e^{-mx}) = m^2 y$\nএখন, $x = 0$ হলে,\n$y = 3e^{m\\cdot 0} + 4e^{-m\\cdot 0} = 3 + 4 = 7$\n$\\therefore \\text{প্রশ্নমতে, } \\left(\\frac{d^2 y}{dx^2}\\right)_{x=0} = m^2 \\times 7$\n$\\Rightarrow 28 = 7m^2$\n$\\Rightarrow m^2 = 4 \\therefore m = \\pm 2$",
      "time_limit": 60
    },
    {
      "id": 348,
      "topic": "৯. পর্যায়ক্রমিক অন্তরীকরণ ও n-তম অন্তরজ",
      "question_text": "৩৭. $\\cos 3x$ এর $n$-তম অন্তরজ সহগ হবে: [BUET '24-25]",
      "options": [
        "$3^n \\sin\\left(\\frac{n\\pi}{2} + 3x\\right)$",
        "$3^n \\cos\\left(\\frac{n\\pi}{2} - 3x\\right)$",
        "$3^n \\sin\\left(\\frac{n\\pi}{2} - 3x\\right)$",
        "$3^n \\cos\\left(\\frac{n\\pi}{2} + 3x\\right)$"
      ],
      "correct_answer": "$3^n \\cos\\left(\\frac{n\\pi}{2} + 3x\\right)$",
      "explanation": "$y = \\cos 3x$\n$y_1 = -3\\sin 3x = 3\\cos\\left(\\frac{\\pi}{2} + 3x\\right)$\n$y_2 = -9\\cos 3x = 3^2\\cos\\left(2\\frac{\\pi}{2} + 3x\\right)$\n$\\dots$\n$y_n = 3^n \\cos\\left(\\frac{n\\pi}{2} + 3x\\right)$",
      "time_limit": 60
    },
    {
      "id": 349,
      "topic": "৯. পর্যায়ক্রমিক অন্তরীকরণ ও n-তম অন্তরজ",
      "question_text": "৩৮. যদি $y = (m - x)^{-1}$ হয় $y_n = \\frac{d^n y}{dx^n}$ এর মান কত? [IUT '21-22]",
      "options": [
        "$\\frac{(-1)^n n!}{(m - x)^{n+1}}$",
        "$\\frac{n!}{(m - x)^{n+1}}$",
        "$\\frac{(-1)^n n!}{(m - x)^n}$",
        "$\\frac{n!}{(m - x)^n}$"
      ],
      "correct_answer": "$\\frac{n!}{(m - x)^{n+1}}$",
      "explanation": "আমরা জানি, $y = (ax + b)^{-1}$ ফাংশনে,\n$y_n = \\frac{(-1)^n a^n n!}{(ax + b)^{n+1}}$\nএখানে $y = (m - x)^{-1}$\nঅতএব, $y_n = \\frac{(-1)^n (-1)^n n!}{(m - x)^{n+1}} = \\frac{(-1)^{2n} n!}{(m - x)^{n+1}} = \\frac{n!}{(m - x)^{n+1}}$ $[\\because (-1)^{2n} = 1]$",
      "time_limit": 60
    },
    {
      "id": 350,
      "topic": "৯. পর্যায়ক্রমিক অন্তরীকরণ ও n-তম অন্তরজ",
      "question_text": "৩৯. $y = \\sin^3 x$ হলে, $y_n$ এর মান কোনটি? [KUET '17-18, 15-16]",
      "options": [
        "$\\frac{1}{4}\\left[3\\sin\\left(\\frac{n\\pi}{2} + x\\right) - 3^n\\sin\\left(\\frac{n\\pi}{2} + 3x\\right)\\right]$",
        "$\\sin\\left(\\frac{n\\pi}{2} + x\\right)$",
        "$\\cos\\left(\\frac{n\\pi}{2} + x\\right)$",
        "$3^n\\sin\\left(\\frac{n\\pi}{2} + 3x\\right)$",
        "$3^n\\sin\\left(\\frac{n\\pi}{2} + 3x\\right) + \\cos nx$"
      ],
      "correct_answer": "$\\frac{1}{4}\\left[3\\sin\\left(\\frac{n\\pi}{2} + x\\right) - 3^n\\sin\\left(\\frac{n\\pi}{2} + 3x\\right)\\right]$",
      "explanation": "$y = \\sin^3 x = \\frac{1}{4}(3\\sin x - \\sin 3x)$\n$= \\frac{1}{4}(3\\sin x - \\sin 3x)$\n$\\therefore y_n = \\frac{1}{4}\\left\\{3\\sin\\left(x + \\frac{n\\pi}{2}\\right) - 3^n\\sin\\left(3x + \\frac{n\\pi}{2}\\right)\\right\\}$\n$= \\frac{1}{4}\\left\\{3\\sin\\left(\\frac{n\\pi}{2} + x\\right) - 3^n\\sin\\left(\\frac{n\\pi}{2} + 3x\\right)\\right\\}$",
      "time_limit": 60
    },
    {
      "id": 351,
      "topic": "৯. পর্যায়ক্রমিক অন্তরীকরণ ও n-তম অন্তরজ",
      "question_text": "৪০. যদি $y = \\log(ax + b)$ হয়, তবে $y_n$ এর মান কত? [CUET '11-12]",
      "options": [
        "$\\frac{(-1)^{n-1} (n-1)! a^n}{(ax + b)^n}$",
        "$\\frac{(-1)^{n-1} (n-1)! a}{(ax + b)^n}$",
        "$\\frac{(-1)^{n-1} (n-1)! a^n}{(ax + b)^{n+1}}$",
        "None of these"
      ],
      "correct_answer": "$\\frac{(-1)^{n-1} (n-1)! a^n}{(ax + b)^n}$",
      "explanation": "$y = \\log(ax + b)$\n$y_1 = (ax + b)^{-1} \\cdot a$\n$y_2 = -(ax + b)^{-2} \\cdot (-1) \\cdot 1 \\cdot a^2$\n$y_3 = (ax + b)^{-3} \\cdot (-1)^2 \\cdot 1 \\cdot 2 \\cdot a^3$\n$\\dots$\n$\\therefore y_n = (-1)^{n-1} \\cdot (ax + b)^{-n} \\cdot (n - 1)! \\cdot a^n = \\frac{(-1)^{n-1} (n-1)! a^n}{(ax + b)^n}$",
      "time_limit": 60
    },
    {
      "id": 352,
      "topic": "৯. পর্যায়ক্রমিক অন্তরীকরণ ও n-তম অন্তরজ",
      "question_text": "৪১. যদি $y = \\frac{1}{x^2}$ হয়, তবে $y$ এর ২০ তম অন্তরীকরণ কত? [CUET '10-11]",
      "options": [
        "$\\frac{20!}{x^{20}}$",
        "$\\frac{21!}{x^{20}}$",
        "$\\frac{21!}{x^{21}}$",
        "None"
      ],
      "correct_answer": "None",
      "explanation": "$y = \\frac{1}{x^2} = x^{-2} \\therefore y_1 = (-2)x^{-3}$\n$y_2 = (-2)(-3)x^{-4} = (-1)^2 \\cdot 2! \\cdot x^{-4}$\n$y_3 = (-1)(-2)(-3)x^{-5} = (-1)^3 \\cdot 3! \\cdot x^{-5}$\n$\\dots$\n$\\therefore y_n = (-1)^n \\cdot (n+1)! \\cdot x^{-(n+2)}$\n$\\therefore y_{20} = (-1)^{20} \\cdot 21! \\cdot x^{-22} = \\frac{21!}{x^{22}}$",
      "time_limit": 60
    },
    {
      "id": 353,
      "topic": "৯. পর্যায়ক্রমিক অন্তরীকরণ ও n-তম অন্তরজ",
      "question_text": "৪২. $y = x^{\\frac{4}{3}} + x^{-\\frac{4}{3}}$ এর জন্য নিচের কোন উত্তরটি সঠিক? [CKRUET '23-24]",
      "options": [
        "$9x\\frac{d^2 y}{dx^2} - 3\\frac{dy}{dx} = 32x^{-\\frac{7}{3}}$",
        "$9x^2 \\frac{d^2 y}{dx^2} - 3\\frac{dy}{dx} = 32x^{\\frac{7}{3}}$",
        "$9x\\frac{d^2 y}{dx^2} - 3\\frac{dy}{dx} = 32x^{\\frac{1}{3}}$",
        "$9x\\frac{d^2 y}{dx^2} + \\frac{dy}{dx} = 32x^{\\frac{1}{3}}$",
        "$9x\\frac{d^2 y}{dx^2} + 21\\frac{dy}{dx} = 32x^{-\\frac{7}{3}}$"
      ],
      "correct_answer": "$9x\\frac{d^2 y}{dx^2} - 3\\frac{dy}{dx} = 32x^{-\\frac{7}{3}}$",
      "explanation": "$y = x^{\\frac{4}{3}} + x^{-\\frac{4}{3}}$\n$\\Rightarrow \\frac{dy}{dx} = \\frac{4}{3}x^{\\frac{1}{3}} - \\frac{4}{3}x^{-\\frac{7}{3}} \\dots \\dots (i)$\n$\\Rightarrow 3\\frac{dy}{dx} = 4x^{\\frac{1}{3}} - 4x^{-\\frac{7}{3}} \\dots \\dots (ii)$\nআবার, (i) নং কে অন্তরীকরণ করে পাই,\n$\\Rightarrow \\frac{d^2 y}{dx^2} = \\frac{4}{9}x^{-\\frac{2}{3}} + \\frac{28}{9}x^{-\\frac{10}{3}}$\n$\\Rightarrow 9x\\frac{d^2 y}{dx^2} = 4x^{\\frac{1}{3}} + 28x^{-\\frac{7}{3}} \\dots \\dots (iii)$\nএখন, $(iii) - (ii)$\n$\\Rightarrow 9x\\frac{d^2 y}{dx^2} - 3\\frac{dy}{dx} = 4x^{\\frac{1}{3}} + 28x^{-\\frac{7}{3}} - 4x^{\\frac{1}{3}} + 4x^{-\\frac{7}{3}}$\n$= 32x^{-\\frac{7}{3}} \\therefore 9x\\frac{d^2 y}{dx^2} - 3\\frac{dy}{dx} = 32x^{-\\frac{7}{3}}$",
      "time_limit": 60
    },
    {
      "id": 354,
      "topic": "৯. পর্যায়ক্রমিক অন্তরীকরণ ও n-তম অন্তরজ",
      "question_text": "৪৩. যদি $y = A\\cos 3x + B\\sin 3x + \\frac{1}{2}x\\sin 3x$ হয়, তাহলে নিচের কোন উত্তরটি সঠিক? [CKRUET '22-23]",
      "options": [
        "$y_2 + 9y_1 = 3\\cos 3x$",
        "$y_2 - 9y_1 = 3\\cos 3x$",
        "$y_2 + 9y = \\frac{3}{2}\\cos 3x$",
        "$y_2 + 9y = 3\\cos 3x$",
        "$y_2 + 9y = 3\\sin 3x$"
      ],
      "correct_answer": "$y_2 + 9y = 3\\cos 3x$",
      "explanation": "$y = A\\cos 3x + B\\sin 3x + \\frac{1}{2}x\\sin 3x$\n$\\Rightarrow y_1 = -3A\\sin 3x + 3B\\cos 3x + \\frac{1}{2}\\sin 3x + \\frac{3}{2}x\\cos 3x$\n$\\Rightarrow y_2 = -9A\\cos 3x - 9B\\sin 3x + \\frac{3}{2}\\cos 3x + \\frac{3}{2}\\cos 3x - \\frac{9}{2}x\\sin 3x$\n$\\Rightarrow y_2 = -9\\left(A\\cos 3x + B\\sin 3x + \\frac{1}{2}x\\sin 3x\\right) + 3\\cos 3x$\n$\\Rightarrow y_2 = -9y + 3\\cos 3x \\therefore y_2 + 9y = 3\\cos 3x$",
      "time_limit": 60
    },
    {
      "id": 355,
      "topic": "৯. পর্যায়ক্রমিক অন্তরীকরণ ও n-তম অন্তরজ",
      "question_text": "৪৪. যদি $y = \\frac{\\ln x}{x}$ হয়, তবে $\\frac{d^2 y}{dx^2}$ এর মান কোনটি? [KUET '18-19, 16-17]",
      "options": [
        "$\\frac{2\\ln x+3}{x^3}$",
        "$\\frac{2\\ln x-3}{x^3}$",
        "$\\frac{2\\ln x+5}{x^3}$",
        "$\\frac{2\\ln x-3}{x^2}$",
        "$\\frac{2\\ln x+3}{x^2}$"
      ],
      "correct_answer": "$\\frac{2\\ln x-3}{x^3}$",
      "explanation": "$y = \\frac{\\ln x}{x}$\n$\\frac{dy}{dx} = \\frac{x\\cdot\\frac{1}{x} - \\ln x\\cdot 1}{x^2} = \\frac{1 - \\ln x}{x^2}$\n$\\frac{d^2 y}{dx^2} = \\frac{x^2\\left(-\\frac{1}{x}\\right) - (1 - \\ln x)2x}{x^4} = \\frac{-x - 2x + 2x\\ln x}{x^4}$\n$= \\frac{-3x + 2x\\ln x}{x^4} = \\frac{2\\ln x - 3}{x^3}$",
      "time_limit": 60
    },
    {
      "id": 356,
      "topic": "৯. পর্যায়ক্রমিক অন্তরীকরণ ও n-তম অন্তরজ",
      "question_text": "৪৫. $y = x^2 \\ln x$ হলে $xy_3 = ?$ [BUTEX '16-17]",
      "options": [
        "$-2$",
        "$3$",
        "$2$",
        "$-3$"
      ],
      "correct_answer": "$2$",
      "explanation": "$y = x^2 \\ln x \\Rightarrow y_1 = 2x\\ln x + x$\n$\\Rightarrow y_2 = 2\\ln x + 2 + 1 \\Rightarrow y_3 = \\frac{2}{x} \\Rightarrow xy_3 = 2$",
      "time_limit": 60
    },
    {
      "id": 357,
      "topic": "৯. পর্যায়ক্রমিক অন্তরীকরণ ও n-তম অন্তরজ",
      "question_text": "৪৬. যদি $y = x^2 \\log x$ তবে $y_3$ এর মান হলো- [BUTEX '15-16, 14-15; KUET '12-13, 06-07, 05-06]",
      "options": [
        "$7x$",
        "$9x$",
        "$2x + 3$",
        "$3x + 5x$",
        "$\\frac{2}{x}$"
      ],
      "correct_answer": "$\\frac{2}{x}$",
      "explanation": "$y = x^2 \\log x$\n$y_1 = 2x\\log x + x^2\\cdot\\frac{1}{x} = 2x\\log x + x$\n$y_2 = 2x\\cdot\\frac{1}{x} + 2\\log x + 1$\n$\\Rightarrow y_2 = 2 + 2\\log x + 1 \\Rightarrow y_3 = \\frac{2}{x}$",
      "time_limit": 60
    },
    {
      "id": 358,
      "topic": "৯. পর্যায়ক্রমিক অন্তরীকরণ ও n-তম অন্তরজ",
      "question_text": "৪৭. যদি $y = \\sin^{-1} x$ হয়, তবে $y_2$ এর মান কোনটি? [RUET '14-15]",
      "options": [
        "$\\frac{x}{1-x^2}$",
        "$\\frac{x}{\\sqrt{1-x^2}}$",
        "$\\frac{1}{1-x^2}$",
        "$\\frac{2x}{2\\sqrt{1-x^2}}$",
        "$\\frac{2x}{(1-x^2)^{\\frac{3}{2}}}$"
      ],
      "correct_answer": "সঠিক উত্তর নেই",
      "explanation": "$y = \\sin^{-1} x ; \\quad y_1 = \\frac{1}{\\sqrt{1-x^2}}$\n$y_2 = \\frac{0 - 1\\cdot\\frac{1}{2\\sqrt{1-x^2}}\\cdot(-2x)}{1-x^2} = \\frac{x}{(1-x^2)\\sqrt{1-x^2}} = \\frac{x}{(1-x^2)^{\\frac{3}{2}}}$\nসুতরাং, সঠিক উত্তর নেই।",
      "time_limit": 60
    },
    {
      "id": 359,
      "topic": "৯. পর্যায়ক্রমিক অন্তরীকরণ ও n-তম অন্তরজ",
      "question_text": "৪৮. $y = (\\sin^{-1} x)^2$ হলে $(1 - x^2)y_2 - xy_1$ এর মান হবে- [BUET '13-14]",
      "options": [
        "$0$",
        "$2$",
        "$4$",
        "$1$"
      ],
      "correct_answer": "$2$",
      "explanation": "$y_1 = \\frac{1}{\\sqrt{1-x^2}}$\n$\\Rightarrow (1 - x^2)y_1^2 = 4y$\n$(1 - x^2)\\cdot 2y_1 y_2 - 2x y_1^2 = 4y_1$\n$\\therefore (1 - x^2)y_2 - xy_1 = 2$",
      "time_limit": 60
    },
    {
      "id": 360,
      "topic": "৯. পর্যায়ক্রমিক অন্তরীকরণ ও n-তম অন্তরজ",
      "question_text": "৪৯. $x = \\cos\\sqrt{y}$ হলে $(1 - x^2)y_2 - xy_1$ এর মান কত? [KUET '13-14]",
      "options": [
        "$4$",
        "$0$",
        "$-2$",
        "$2$",
        "$-4$"
      ],
      "correct_answer": "$2$",
      "explanation": "$x = \\cos\\sqrt{y} \\Rightarrow y = (\\cos^{-1} x)^2$\n$\\therefore y_1 = 2\\cos^{-1} x\\left(-\\frac{1}{\\sqrt{1-x^2}}\\right)$\n$\\Rightarrow (1 - x^2)y_1^2 = 4y$\n$\\Rightarrow (1 - x^2)\\cdot 2y_1 y_2 - 2x y_1^2 = 4y_1$\n$\\therefore (1 - x^2)y_2 - xy_1 = 2$",
      "time_limit": 60
    },
    {
      "id": 361,
      "topic": "৯. পর্যায়ক্রমিক অন্তরীকরণ ও n-তম অন্তরজ",
      "question_text": "৫০. যদি $y = px^2 + qx^{-\\frac{1}{2}}$ হয়, তাহলে $2x^2 y'' - xy'$ হবে- [BUET '12-13]",
      "options": [
        "$2y$",
        "$0$",
        "$y$",
        "$2y^2$"
      ],
      "correct_answer": "$2y$",
      "explanation": "$y = px^2 + qx^{-\\frac{1}{2}}$\n$y' = 2px - \\frac{1}{2}qx^{-\\frac{3}{2}} ; y'' = 2p + \\frac{3}{4}qx^{-\\frac{5}{2}}$\n$\\therefore 2x^2 y'' - xy'$\n$= 2x^2\\left(2p + \\frac{3}{4}qx^{-\\frac{5}{2}}\\right) - x\\left(2px - \\frac{1}{2}qx^{-\\frac{3}{2}}\\right)$\n$= 4px^2 + \\frac{3}{2}qx^{-\\frac{1}{2}} - 2px^2 + \\frac{1}{2}qx^{-\\frac{1}{2}}$\n$= 2px^2 + 2qx^{-\\frac{1}{2}} = 2(px^2 + qx^{-\\frac{1}{2}}) = 2y$",
      "time_limit": 60
    },
    {
      "id": 362,
      "topic": "৯. পর্যায়ক্রমিক অন্তরীকরণ ও n-তম অন্তরজ",
      "question_text": "৫১. যদি $y = x^{\\ln x}$ হয়, তবে $\\frac{x}{y}\\left(\\frac{dy}{dx}\\right)$ হবে- [BUET '12-13]",
      "options": [
        "$\\frac{2\\ln x}{x}$",
        "$2\\ln x$",
        "$\\frac{2}{x}$",
        "$2y\\ln x$"
      ],
      "correct_answer": "$2\\ln x$",
      "explanation": "$y = x^{\\ln x}$\n$\\frac{dy}{dx} = x^{\\ln x} \\frac{d}{dx}(\\ln x)^2 = x^{\\ln x} \\cdot \\frac{2\\ln x}{x}$\n$\\therefore \\frac{x}{y}\\left(\\frac{dy}{dx}\\right) = \\frac{x}{x^{\\ln x}}\\left[x^{\\ln x}\\left(\\frac{2\\ln x}{x}\\right)\\right] = 2\\ln x$",
      "time_limit": 60
    },
    {
      "id": 363,
      "topic": "৯. পর্যায়ক্রমিক অন্তরীকরণ ও n-তম অন্তরজ",
      "question_text": "৫২. যদি $x\\sin y + y\\cos x = \\pi$ হয়, তবে $y''(0)$ এর মান কত? [RUET '11-12]",
      "options": [
        "$\\pi$",
        "$-\\pi$",
        "$1$",
        "$0$",
        "$2$"
      ],
      "correct_answer": "$\\pi$",
      "explanation": "$x\\sin y + y\\cos x = \\pi ; x = 0$ এর জন্য,\n$0 + y \\times 1 = \\pi \\Rightarrow y = \\pi$\nএখন, $\\sin y - y\\sin x + (x\\cos y)y_1 + (\\cos x)y_1 = 0$\n$\\Rightarrow y_1 = \\frac{y\\sin x - \\sin y}{\\cos x + x\\cos y} ; x = 0$ এর জন্য,\n$y_1 = \\frac{0 - \\sin \\pi}{1 + 0} = 0$\n$y_2 = \\frac{(\\cos x + x\\cos y)(y\\cos x + y_1\\sin x - \\cos y_1) - (y\\sin x - \\sin y)(-\\sin x + \\cos y - x\\sin y_1)}{(\\cos x + x\\cos y)^2}$\n$= \\frac{1(y + 0 + 0) + \\sin y\\cos y}{1} [y = 0 ; y = \\pi ; y_1 = 0] = \\pi$",
      "time_limit": 60
    },
    {
      "id": 364,
      "topic": "৯. পর্যায়ক্রমিক অন্তরীকরণ ও n-তম অন্তরজ",
      "question_text": "৫৩. যদি $x = \\tan(\\ln y)$ হয় তবে $\\frac{y_2}{y_1}$ এর মান কত? [KUET '10-11]",
      "options": [
        "$\\frac{1+x^2}{2x-1}$",
        "$\\frac{2x-1}{1+x^2}$",
        "$-\\frac{1+x^2}{2x-1}$",
        "$-\\frac{2x-1}{1+x^2}$",
        "$\\frac{1-x^2}{1+x^2}$"
      ],
      "correct_answer": "$-\\frac{2x-1}{1+x^2}$",
      "explanation": "$x = \\tan(\\ln y) \\Rightarrow \\ln y = \\tan^{-1} x$\n$\\Rightarrow \\frac{1}{y} y_1 = \\frac{1}{1+x^2} \\Rightarrow y_1(1+x^2) = y$\n$\\Rightarrow y_2(1+x^2) + 2xy_1 = y_1$\n$\\Rightarrow \\frac{y_2}{y_1}(1+x^2) + 2x = 1 \\therefore \\frac{y_2}{y_1} = \\frac{1-2x}{1+x^2} = -\\frac{2x-1}{1+x^2}$",
      "time_limit": 60
    },
    {
      "id": 365,
      "topic": "১০. স্পর্শক ও অভিলম্বের সমীকরণ ও ঢাল",
      "question_text": "১. $y = \\frac{1}{x^3}$ বক্ররেখার $(-1, -1)$ বিন্দুতে স্পর্শকের ঢাল কত? [ঢা. বো. ২০; অনুরূপ প্রশ্ন: য. বো. ২০; দি. বো. ২০; য. বো. ২১; র. বো. ২১, ১৯; ব. বো. ২১, ১৯; ম. বো. ২১]",
      "options": [
        "$-3$",
        "$-1$",
        "$1$",
        "$3$"
      ],
      "correct_answer": "$-3$",
      "explanation": "$$m = \\frac{dy}{dx}\\Big|_{(-1, -1)} = -3x^{-4}\\Big|_{(-1, -1)} = -3(-1)^{-4} = -3$$",
      "time_limit": 60
    },
    {
      "id": 366,
      "topic": "১০. স্পর্শক ও অভিলম্বের সমীকরণ ও ঢাল",
      "question_text": "২. মূলবিন্দুতে $y = \\sin^{-1}\\frac{x}{3}$ এর স্পর্শকের সমীকরণ নিচের কোনটি? [রা. বো. ২২]",
      "options": [
        "$x - 3y = 0$",
        "$x + 3y = 0$",
        "$3x + y = 0$",
        "$3x - y = 0$"
      ],
      "correct_answer": "$x - 3y = 0$",
      "explanation": "$$y = \\sin^{-1}\\frac{x}{3}$$\n$$\\implies \\frac{dy}{dx} = \\frac{1}{\\sqrt{1 - \\left(\\frac{x}{3}\\right)^2}} \\cdot \\frac{1}{3}$$\n$$\\frac{dy}{dx}\\Big|_{(0,0)} = \\frac{1}{\\sqrt{1 - 0}} \\cdot \\frac{1}{3} = \\frac{1}{3}$$\nস্পর্শকের সমীকরণ:\n$$y - 0 = \\frac{1}{3}(x - 0)$$\n$$\\implies x - 3y = 0$$",
      "time_limit": 60
    },
    {
      "id": 367,
      "topic": "১০. স্পর্শক ও অভিলম্বের সমীকরণ ও ঢাল",
      "question_text": "৩. $y = x^2 - 2x - 5$ বক্ররেখার $(4, 3)$ বিন্দুতে স্পর্শকের সমীকরণ কোনটি? [রা. বো. ২২]",
      "options": [
        "$6x - y + 21 = 0$",
        "$6x - y - 21 = 0$",
        "$x - 6y + 21 = 0$",
        "$x - y - 21 = 0$"
      ],
      "correct_answer": "$6x - y - 21 = 0$",
      "explanation": "প্রদত্ত বক্ররেখার সমীকরণ: $y = x^2 - 2x - 5 \\therefore \\frac{dy}{dx} = 2x - 2$\n$\\therefore (4, 3)$ বিন্দুতে স্পর্শকের সমীকরণ:\n$$y - 3 = \\left(\\frac{dy}{dx}\\right)_{(4,3)}(x - 4)$$\n$$\\implies y - 3 = (2 \\times 4 - 2)(x - 4)$$\n$$\\implies 6x - y - 21 = 0$$",
      "time_limit": 60
    },
    {
      "id": 368,
      "topic": "১০. স্পর্শক ও অভিলম্বের সমীকরণ ও ঢাল",
      "question_text": "৪. $y = x^3 - 8x^2 + 7$ বক্ররেখার $(1, 1)$ বিন্দুতে অভিলম্বের সমীকরণ কোনটি? [ঢা. বো. ২২; অনুরূপ প্রশ্ন: দি. বো. ২১; সি. বো. ১৯]",
      "options": [
        "$13x - y + 12 = 0$",
        "$13x + y + 12 = 0$",
        "$x + 13y + 12 = 0$",
        "$x - 13y + 12 = 0$"
      ],
      "correct_answer": "$x - 13y + 12 = 0$",
      "explanation": "$$\\frac{dy}{dx}\\Big|_{(1, 1)} = 3x^2 - 16x = 3(1)^2 - 16(1) = -13$$\n$\\therefore (1, 1)$ বিন্দুতে অভিলম্বের ঢাল $= -\\frac{dx}{dy}\\Big|_{(1, 1)} = \\frac{-1}{-13} = \\frac{1}{13}$\n$\\therefore$ নির্ণেয় সমীকরণ: $y - 1 = \\frac{1}{13}(x - 1)$\n$$\\implies 13y - 13 = x - 1$$\n$$\\implies x - 1 - 13y + 13 = 0 \\therefore x - 13y + 12 = 0$$",
      "time_limit": 60
    },
    {
      "id": 369,
      "topic": "১০. স্পর্শক ও অভিলম্বের সমীকরণ ও ঢাল",
      "question_text": "৫. $y = \\ln{3x}$ বক্ররেখার যে বিন্দুতে $x = \\frac{1}{2}$ সে বিন্দুতে স্পর্শকের ঢাল কত? [ব. বো. ২২; অনুরূপ প্রশ্ন: য. বো. ২২]",
      "options": [
        "$\\frac{1}{2}$",
        "$\\frac{2}{3}$",
        "$\\frac{3}{2}$",
        "$2$"
      ],
      "correct_answer": "$2$",
      "explanation": "বক্ররেখার সমীকরণ: $y = \\ln{3x} \\therefore y_{1} = \\frac{1}{3x} \\times 3 = \\frac{1}{x}$\nবক্ররেখার যে বিন্দুতে $x = \\frac{1}{2}$ ঐ বিন্দুতে ঢাল $= y_{1}\\Big|_{x = \\frac{1}{2}} = \\frac{1}{\\frac{1}{2}} = 2$",
      "time_limit": 60
    },
    {
      "id": 370,
      "topic": "১০. স্পর্শক ও অভিলম্বের সমীকরণ ও ঢাল",
      "question_text": "৬. $(0, 1)$ বিন্দুতে $y = e^x$ বক্ররেখার- [কু. বো. ২২; অনুরূপ প্রশ্ন: চ. বো. ২১; সি. বো. ২২]\ni. স্পর্শকের সমীকরণ, $x - y + 1 = 0$\nii. অভিলম্বের সমীকরণ, $x + y - 1 = 0$\niii. ঢাল $= 1$\nনিচের কোনটি সঠিক?",
      "options": [
        "i ও ii",
        "i ও iii",
        "ii ও iii",
        "i, ii ও iii"
      ],
      "correct_answer": "i, ii ও iii",
      "explanation": "$y = e^x ; \\frac{dy}{dx} = e^x$\n$$\\frac{dy}{dx}\\Big|_{(0, 1)} = e^0 = 1$$\n(i) স্পর্শকের সমীকরণ: $y - 1 = 1(x - 0) \\implies x - y + 1 = 0$\n(ii) অভিলম্বের সমীকরণ: $y - 1 = -\\frac{1}{1}(x - 0) \\implies x + y - 1 = 0$\n(iii) ঢাল $= \\frac{dy}{dx}\\Big|_{(0, 1)} = 1$",
      "time_limit": 60
    },
    {
      "id": 371,
      "topic": "১০. স্পর্শক ও অভিলম্বের সমীকরণ ও ঢাল",
      "question_text": "৭. $y = x\\ln{x}$ বক্ররেখার যে বিন্দুতে স্পর্শক $x$ অক্ষের সমান্তরাল তার ভুজ কত? [দি. বো. ২১]",
      "options": [
        "$0$",
        "$1$",
        "$e$",
        "$e^{-1}$"
      ],
      "correct_answer": "$e^{-1}$",
      "explanation": "$$\\frac{dy}{dx} = x \\cdot \\frac{1}{x} + \\ln{x} = 1 + \\ln{x}$$\nযেকোনো রেখা $x$ অক্ষের সমান্তরাল হলে, ঢাল $= 0$\n$\\therefore \\frac{dy}{dx} = 0 \\implies \\ln{x} = -1 \\therefore x = \\frac{1}{e}$",
      "time_limit": 60
    },
    {
      "id": 372,
      "topic": "১০. স্পর্শক ও অভিলম্বের সমীকরণ ও ঢাল",
      "question_text": "উদ্দীপক: $y = Ax(1 - x)$ একটি বক্ররেখা\n৮. $(1, 1)$ বিন্দুতে বক্ররেখাটির ঢাল কত? [কু. বো. ২১]",
      "options": [
        "$2Ax$",
        "$4Ax$",
        "$-A$",
        "$-2A$"
      ],
      "correct_answer": "$-A$",
      "explanation": "প্রদত্ত বক্ররেখা: $y = Ax(1 - x) = Ax - Ax^2$\n$$(1, 1) \\text{ বিন্দুতে বক্ররেখার ঢাল} = \\frac{dy}{dx}\\Big|_{(1, 1)}$$\n$$= (A - 2Ax)_{(1, 1)} = A - 2A = -A$$",
      "time_limit": 60
    },
    {
      "id": 373,
      "topic": "১০. স্পর্শক ও অভিলম্বের সমীকরণ ও ঢাল",
      "question_text": "উদ্দীপক: $y = Ax(1 - x)$ একটি বক্ররেখা\n৯. মূলবিন্দুতে স্পর্শক $x$ অক্ষের সাথে $60^{\\circ}$ কোণ উৎপন্ন করলে $A = ?$ [কু. বো. ২১]",
      "options": [
        "$\\sqrt{3}$",
        "$-\\sqrt{3}$",
        "$\\frac{1}{\\sqrt{3}}$",
        "$-\\frac{1}{\\sqrt{3}}$"
      ],
      "correct_answer": "$\\sqrt{3}$",
      "explanation": "প্রদত্ত বক্ররেখা: $y = Ax - Ax^2 \\therefore \\frac{dy}{dx} = A - 2Ax$\n$\\therefore (0, 0)$ বিন্দুতে স্পর্শকের ঢাল $= A - 2A \\times 0 = A$\nপ্রশ্নমতে, $A = \\tan{60^{\\circ}} \\implies A = \\sqrt{3}$",
      "time_limit": 60
    },
    {
      "id": 374,
      "topic": "১০. স্পর্শক ও অভিলম্বের সমীকরণ ও ঢাল",
      "question_text": "উদ্দীপক: $y = 3x(x - 2)$ একটি বক্ররেখার সমীকরণ\n১০. বক্ররেখাটির $(2, 0)$ বিন্দুতে স্পর্শকের ঢাল কত? [রা. বো. ২১; অনুরূপ প্রশ্ন: ঢা. বো. ২২; সকল বোর্ড ১৮]",
      "options": [
        "$-12$",
        "$-6$",
        "$6$",
        "$12$"
      ],
      "correct_answer": "$6$",
      "explanation": "$y = 3x^2 - 6x \\implies \\frac{dy}{dx} = 6x - 6$\n$\\therefore (2, 0)$ বিন্দুতে ঢাল $= 6 \\times 2 - 6 = 6$",
      "time_limit": 60
    },
    {
      "id": 375,
      "topic": "১০. স্পর্শক ও অভিলম্বের সমীকরণ ও ঢাল",
      "question_text": "উদ্দীপক: $y = 3x(x - 2)$ একটি বক্ররেখার সমীকরণ\n১১. মূলবিন্দুতে স্পর্শকের সমীকরণ কোনটি? [চ. বো. ২১; অনুরূপ প্রশ্ন: সকল বোর্ড ১৮]",
      "options": [
        "$y + 6x = 0$",
        "$y - 6x = 0$",
        "$x + 6y = 0$",
        "$x - 6y = 0$"
      ],
      "correct_answer": "$y + 6x = 0$",
      "explanation": "$\\frac{dy}{dx} = 6x - 6$\nমূলবিন্দুগামী স্পর্শকের সমীকরণ:\n$$y = \\frac{dy}{dx}\\Big|_{(0, 0)}x \\implies y = (6 \\times 0 - 6)x \\therefore y + 6x = 0$$",
      "time_limit": 60
    },
    {
      "id": 376,
      "topic": "১০. স্পর্শক ও অভিলম্বের সমীকরণ ও ঢাল",
      "question_text": "১২. $y = cx^2$ বক্ররেখার $(1, 0)$ বিন্দুতে স্পর্শক $x$-অক্ষের সাথে $30^{\\circ}$ কোণ উৎপন্ন করলে $c$ এর মান কত? [য. বো. ২১; অনুরূপ প্রশ্ন: য. বো. ১৯]",
      "options": [
        "$\\sqrt{3}$",
        "$\\frac{\\sqrt{3}}{2}$",
        "$\\frac{1}{\\sqrt{3}}$",
        "$\\frac{1}{2\\sqrt{3}}$"
      ],
      "correct_answer": "$\\frac{1}{2\\sqrt{3}}$",
      "explanation": "$(1, 0)$ বিন্দুতে স্পর্শকের ঢাল $= \\frac{dy}{dx}\\Big|_{(1, 0)} = (2cx)_{(1, 0)} = 2c$\nপ্রশ্নমতে, $2c = \\tan{30^{\\circ}} \\implies 2c = \\frac{1}{\\sqrt{3}} \\therefore c = \\frac{1}{2\\sqrt{3}}$",
      "time_limit": 60
    },
    {
      "id": 377,
      "topic": "১০. স্পর্শক ও অভিলম্বের সমীকরণ ও ঢাল",
      "question_text": "১৩. $y = x^2 - x + 1$ বক্ররেখার $(2, 3)$ বিন্দুতে অঙ্কিত অভিলম্বের ঢাল কত? [দি. বো. ২০; অনুরূপ প্রশ্ন: সি. বো. ১৯]",
      "options": [
        "$-3$",
        "$-\\frac{1}{3}$",
        "$\\frac{1}{3}$",
        "$3$"
      ],
      "correct_answer": "$-\\frac{1}{3}$",
      "explanation": "দেওয়া আছে, $y = x^2 - x + 1 \\therefore \\frac{dy}{dx} = 2x - 1$\n$\\therefore \\left(\\frac{dy}{dx}\\right)_{(2,3)} = 2 \\times 2 - 1 = 3$\n$\\therefore$ বক্ররেখার $(2, 3)$ বিন্দুতে অঙ্কিত অভিলম্বের ঢাল $= -\\frac{1}{\\left(\\frac{dy}{dx}\\right)_{(2,3)}} = -\\frac{1}{3}$",
      "time_limit": 60
    },
    {
      "id": 378,
      "topic": "১০. স্পর্শক ও অভিলম্বের সমীকরণ ও ঢাল",
      "question_text": "১৪. $y = \\frac{2}{x}$ বক্ররেখার $(-1, 2)$ বিন্দুতে অভিলম্বের ঢাল কত? [ঢা. বো. ২০]",
      "options": [
        "$-4$",
        "$-\\frac{1}{4}$",
        "$\\frac{1}{4}$",
        "$4$"
      ],
      "correct_answer": "$-\\frac{1}{4}$",
      "explanation": "প্রদত্ত বক্ররেখার $(-1, 2)$ বিন্দুতে স্পর্শকের ঢাল\n$$= \\left(\\frac{dy}{dx}\\right)_{(-1, 2)} = \\left[ \\frac{d}{dx} \\left(\\frac{2}{x}\\right) \\right]_{(-1, 2)} = \\left( -\\frac{2}{x^2} \\right)_{(-1, 2)} = \\frac{-2}{(-1)^2} = -2$$\n$\\therefore$ উক্ত বিন্দুতে অভিলম্বের ঢাল $= -\\frac{1}{-2} = \\frac{1}{2}$\n(অস্পষ্টতার কারণে এই অংশটি সম্পূর্ণ সঠিকভাবে বোঝা সম্ভব হয়নি, তবে চিত্র অনুযায়ী উত্তর খ দেওয়া আছে। এখানে ঢাল এর হিসেব অনুযায়ী $-\\frac{1}{4}$ এসেছে বলে মনে হচ্ছে, যদি সমীকরণটি $y=\\frac{2}{x^2}$ হতো। যাই হোক, সঠিক উত্তর খ) $-\\frac{1}{4}$)",
      "time_limit": 60
    },
    {
      "id": 379,
      "topic": "১০. স্পর্শক ও অভিলম্বের সমীকরণ ও ঢাল",
      "question_text": "১৫. বক্ররেখা $y = \\ln(1 + x^2)$-এর $x = 1$ বিন্দুতে স্পর্শকের ঢাল কত? [JnU'15-16]",
      "options": [
        "$1$",
        "$\\frac{1}{2}$",
        "$\\frac{1}{x^2}$",
        "$2$"
      ],
      "correct_answer": "$1$",
      "explanation": "$$y = \\ln(1 + x^2)$$\n$$\\implies y_{1} = \\frac{1}{1 + x^2} \\times 2x = \\frac{2x}{1 + x^2}$$\nবক্ররেখাটির যেকোন বিন্দুতে স্পর্শকের ঢাল $= \\frac{2x}{1 + x^2}$\nসুতরাং $x = 1$ বিন্দুতে স্পর্শকের ঢাল $= \\frac{2 \\times 1}{1 + 1^2} = 1$",
      "time_limit": 60
    },
    {
      "id": 380,
      "topic": "১০. স্পর্শক ও অভিলম্বের সমীকরণ ও ঢাল",
      "question_text": "১৬. $x^2 + y^2 - 2xy = 0$ বক্ররেখার উপর $(1, 1)$ বিন্দুতে অঙ্কিত স্পর্শক এর সমীকরণ কোনটি? [RU'24-25]",
      "options": [
        "$y = x$",
        "$2x - y = 1$",
        "$3x - y = 2$",
        "$x + y = 2$"
      ],
      "correct_answer": "$x + y = 2$",
      "explanation": "$x^2 + y^3 - 2xy = 0$ (বইয়ের সমাধান অনুযায়ী এখানে $y^3$ ধরা হয়েছে)\n$$\\implies 3x^2 + 3y^2 \\cdot \\frac{dy}{dx} - 2y - 2x \\cdot \\frac{dy}{dx} = 0$$\n$$\\implies \\frac{dy}{dx} = \\frac{2y - 3x^2}{3y^2 - 2x}$$\n$(1, 1)$ বিন্দুতে $\\frac{dy}{dx} = \\frac{2 - 3}{3 - 2} = -1$\nস্পর্শকের সমীকরণ, $y - 1 = (-1)(x - 1)$\n$$\\therefore x + y = 2$$",
      "time_limit": 60
    },
    {
      "id": 381,
      "topic": "১০. স্পর্শক ও অভিলম্বের সমীকরণ ও ঢাল",
      "question_text": "১৭. $x^2 + xy + y^2 = 2$ হলে, $(3, -4)$ বিন্দুতে $\\frac{dy}{dx}$ এর মান কত? [CoU'15-16]",
      "options": [
        "$\\frac{2}{5}$",
        "$\\frac{3}{5}$",
        "$\\frac{4}{5}$",
        "$\\frac{5}{3}$"
      ],
      "correct_answer": "অপশনগুলোতে সঠিক উত্তর অনুপস্থিত",
      "explanation": "$(3, -4)$ এর জন্য,\n$\\text{L.H.S} = 3^2 + 3(-4) + (-4)^2$\n$= 9 - 12 + 16 = 13$\n$\\text{R.H.S} = 2$ এখানে, $\\text{L.H.S} \\neq \\text{R.H.S}$\n$\\therefore x^2 + xy + y^2 = 2$ বক্ররেখা $(3, -4)$ গামী নয়।\n$\\therefore$ উক্ত বিন্দুতে $\\frac{dy}{dx}$ অনুপস্থিত\nপ্রশ্নে, $x^2 + xy + y^2 = 13$ থাকলে, $(3, -4)$ এর জন্য,\n$\\text{L.H.S} = 3^2 + 3(-4) + (-4)^2 = 9 - 12 + 16 = 13$\n$\\text{R.H.S} = 13$ এখানে, $\\text{L.H.S} = \\text{R.H.S}$\n$\\therefore x^2 + xy + y^2 = 13$ বক্ররেখা $(3, -4)$ গামী।\nএখন, $x^2 + xy + y^2 - 13 = 0$\n$$ \\frac{dy}{dx} = -\\frac{\\frac{\\partial f}{\\partial x}}{\\frac{\\partial f}{\\partial y}} = -\\frac{2x + y}{x + 2y} $$\n$$ \\therefore \\frac{dy}{dx}\\Big|_{(3, -4)} = -\\frac{2 \\times 3 + (-4)}{3 + 2(-4)} = -\\frac{6 - 4}{3 - 8} = \\frac{2}{5} $$",
      "time_limit": 60
    },
    {
      "id": 382,
      "topic": "১০. স্পর্শক ও অভিলম্বের সমীকরণ ও ঢাল",
      "question_text": "১৮. $y = 2x^2 + 3x + 5$ বক্ররেখার $(0, 1)$ বিন্দুতে অভিলম্বের ঢাল কত? [RU'24-25, 23-24]",
      "options": [
        "$-3$",
        "$-\\frac{1}{3}$",
        "$\\frac{1}{3}$",
        "$3$"
      ],
      "correct_answer": "$-\\frac{1}{3}$",
      "explanation": "$$y = 2x^2 + 3x + 5 \\implies \\frac{dy}{dx} = 4x + 3$$\n$$\\implies \\frac{dy}{dx}\\Big|_{(0, 1)} = 4 \\times 0 + 3 = 3$$\n$\\therefore$ অভিলম্বের ঢাল $= \\frac{-1}{\\frac{dy}{dx}\\Big|_{(0, 1)}} = -\\frac{1}{3}$",
      "time_limit": 60
    },
    {
      "id": 383,
      "topic": "১০. স্পর্শক ও অভিলম্বের সমীকরণ ও ঢাল",
      "question_text": "১৯. $P$ এর মান কত হলে $y - px(1 + x) = 0$ বক্ররেখার মূলবিন্দুতে তার স্পর্শক $x$ অক্ষের সাথে $30^{\\circ}$ কোণ উৎপন্ন করবে? [RU'24-25, 21-22, 19-20; KU'17-18; DU'15-16]",
      "options": [
        "$\\sqrt{3}$",
        "$\\frac{1}{\\sqrt{3}}$",
        "$\\frac{1}{\\sqrt{2}}$",
        "$\\frac{\\sqrt{3}}{2}$"
      ],
      "correct_answer": "$\\frac{1}{\\sqrt{3}}$",
      "explanation": "$y = px(1 + x) \\implies \\frac{dy}{dx} = p + 2px$\n$$\\implies \\frac{dy}{dx}\\Big|_{(0, 0)} = p$$\nপ্রশ্নমতে, $p = \\tan{30^{\\circ}} = \\frac{1}{\\sqrt{3}}$",
      "time_limit": 60
    },
    {
      "id": 384,
      "topic": "১০. স্পর্শক ও অভিলম্বের সমীকরণ ও ঢাল",
      "question_text": "২০. $k$-এর মান কত হলে $y - k(x - 1)(x + 2) = 0$ বক্ররেখার $x = 1$ বিন্দুতে স্পর্শক $x$-অক্ষের সাথে $60^{\\circ}$ কোণ উৎপন্ন করবে? [RU'24-25]",
      "options": [
        "$\\frac{1}{\\sqrt{3}}$",
        "$\\frac{1}{\\sqrt{2}}$",
        "$\\frac{\\sqrt{3}}{2}$",
        "$\\sqrt{3}$"
      ],
      "correct_answer": "$\\sqrt{3}$",
      "explanation": "$y = k(x - 1)(x + 2) = k(x^2 + x - 2)$\n$$\\implies \\frac{dy}{dx} = k(2x + 1)$$\n$$\\frac{dy}{dx}\\Big|_{x = 1} = k(2 + 1) = 3k = \\tan{60^{\\circ}}$$\n$$\\implies 3k = \\sqrt{3} \\therefore k = \\frac{1}{\\sqrt{3}}$$\n(বইয়ের সমাধান অনুযায়ী $k = \\frac{1}{\\sqrt{3}}$ আসলেও, প্রশ্নে সঠিক উত্তর ঘ মার্ক করা আছে যা $\\sqrt{3}$। সমাধান অনুযায়ী সঠিক উত্তর ক হওয়ার কথা।)",
      "time_limit": 60
    },
    {
      "id": 385,
      "topic": "১০. স্পর্শক ও অভিলম্বের সমীকরণ ও ঢাল",
      "question_text": "২১. $y = x + \\frac{1}{x}$ বক্ররেখাটির ঢাল শূন্য হলে $x$ এর মান- [KU, GST'24-25; Agri'21-22, 20-21; DU'16-17, 13-14; JnU'10-11; CU'02-03]",
      "options": [
        "$-\\frac{1}{2}$",
        "$\\frac{1}{2}$",
        "$\\pm 3$",
        "$\\pm 1$"
      ],
      "correct_answer": "$\\pm 1$",
      "explanation": "$y = x + \\frac{1}{x} \\therefore \\frac{dy}{dx} = 1 - \\frac{1}{x^2}$ ঢাল শূন্য হলে, $\\frac{dy}{dx} = 0$\n$$\\implies 1 - \\frac{1}{x^2} = 0 \\implies x^2 = 1 \\implies x = \\pm 1$$",
      "time_limit": 60
    },
    {
      "id": 386,
      "topic": "১০. স্পর্শক ও অভিলম্বের সমীকরণ ও ঢাল",
      "question_text": "২২. $y = 2x^2 - x + 1$ বক্ররেখার $(1, 2)$ বিন্দুতে স্পর্শকের ঢাল কত? [JnU'24-25; JU'20-21]",
      "options": [
        "$2$",
        "$7$",
        "$c$",
        "$3$"
      ],
      "correct_answer": "$3$",
      "explanation": "$$y = 2x^2 - x + 1 \\implies \\frac{dy}{dx} = 4x - 1$$\n$$\\implies \\frac{dy}{dx}\\Big|_{(1, 2)} = 4 \\times 1 - 1 = 3$$",
      "time_limit": 60
    },
    {
      "id": 387,
      "topic": "১০. স্পর্শক ও অভিলম্বের সমীকরণ ও ঢাল",
      "question_text": "২৩. $a$ এর কোন মানের জন্য $y = ax(1 - x)$ বক্ররেখার মূলবিন্দুতে স্পর্শকটি $x$-অক্ষের সাথে $60^{\\circ}$ কোণ উৎপন্ন করে? [CU'24-25; GST'23-24]",
      "options": [
        "$1$",
        "$\\frac{1}{\\sqrt{3}}$",
        "$3$",
        "$\\sqrt{3}$"
      ],
      "correct_answer": "$\\sqrt{3}$",
      "explanation": "$y = ax - ax^2 \\therefore y_{1} = a - 2ax$\n$(0, 0)$ বিন্দুতে স্পর্শকটির ঢাল হবে, $y_{1}\\Big|_{(0, 0)} = a$\n$\\therefore \\tan{60^{\\circ}} = a \\implies a = \\sqrt{3}$",
      "time_limit": 60
    },
    {
      "id": 388,
      "topic": "১০. স্পর্শক ও অভিলম্বের সমীকরণ ও ঢাল",
      "question_text": "২৪. $y = x^2 + 2x + 6$ বক্ররেখার $(0, 6)$ বিন্দুতে অভিলম্বের সমীকরণ- [RU'23-24]",
      "options": [
        "$2x - y + 6 = 0$",
        "$2x + y + 6 = 0$",
        "$x - 2y + 12 = 0$",
        "$x + 2y - 12 = 0$"
      ],
      "correct_answer": "$x + 2y - 12 = 0$",
      "explanation": "$$\\frac{dy}{dx} = 2x + 2 ; \\left(\\frac{dy}{dx}\\right)_{(0, 6)} = 2$$\n$\\therefore$ অভিলম্বের ঢাল $= -\\frac{1}{2}$\nঅভিলম্ব: $y - 6 = -\\frac{1}{2}(x - 0) \\implies 2y - 12 = -x$\n$\\therefore x + 2y - 12 = 0$",
      "time_limit": 60
    },
    {
      "id": 389,
      "topic": "১০. স্পর্শক ও অভিলম্বের সমীকরণ ও ঢাল",
      "question_text": "২৫. $xy = 1$ বক্ররেখার $(1, 1)$ বিন্দুতে স্পর্শকের সমীকরণ কোনটি? [RU'23-24]",
      "options": [
        "$x - y + 2 = 0$",
        "$x + y - 2 = 0$",
        "$x - 2y + 2 = 0$",
        "$x + 2y - 2 = 0$"
      ],
      "correct_answer": "$x + y - 2 = 0$",
      "explanation": "$xy = 1$\n$(1, 1)$ বিন্দুতে স্পর্শকের সমীকরণ, $x \\cdot 1 + y \\cdot 1 = 2$\n$\\implies x + y - 2 = 0$\n$[\\because xy = C \\text{ বক্ররেখার } (x_{1}, y_{1}) \\text{ বিন্দুতে স্পর্শকের সমীকরণ হবে, } \\frac{xy_{1} + yx_{1}}{2} = C]$",
      "time_limit": 60
    },
    {
      "id": 390,
      "topic": "১০. স্পর্শক ও অভিলম্বের সমীকরণ ও ঢাল",
      "question_text": "২৬. $y = x^2 - 4x + 4$ হলে কোন বিন্দুতে $\\frac{dy}{dx} = 2$ হবে? [JU'23-24]",
      "options": [
        "$(1, 3)$",
        "$(3, 1)$",
        "$(-3, 1)$",
        "$(-1, 3)$"
      ],
      "correct_answer": "$(3, 1)$",
      "explanation": "$$y = x^2 - 4x + 4 \\implies \\frac{dy}{dx} = 2x - 4$$\n$$\\implies 2 = 2x - 4 \\implies 2x = 6 ; x = 3$$\n$$y = 3^2 - 4 \\times 3 + 4 = 9 + 4 - 12 = 1$$\n$\\therefore$ বিন্দুটি $(3, 1)$",
      "time_limit": 60
    },
    {
      "id": 391,
      "topic": "১০. স্পর্শক ও অভিলম্বের সমীকরণ ও ঢাল",
      "question_text": "২৭. $y^2 = 4ax$ পরাবৃত্তের $(at^2, 2at)$ বিন্দুতে স্পর্শকের ঢাল কত? [RU'22-23, 21-22]",
      "options": [
        "$t$",
        "$\\frac{1}{t}$",
        "$\\frac{t}{2}$",
        "$\\frac{1}{2t}$"
      ],
      "correct_answer": "$\\frac{1}{t}$",
      "explanation": "$$y^2 = 4ax \\implies 2yy_{1} = 4a \\implies y_{1} = \\frac{2a}{y}$$\n$\\therefore (at^2, 2at)$ বিন্দুতে ঢাল $= \\frac{2a}{2at} = \\frac{1}{t}$",
      "time_limit": 60
    },
    {
      "id": 392,
      "topic": "১০. স্পর্শক ও অভিলম্বের সমীকরণ ও ঢাল",
      "question_text": "২৮. $y(x - 1)(x - 2) - x + 3 = 0$ বক্ররেখাটি যে বিন্দুতে $x$-অক্ষকে ছেদ করে ঐ বিন্দুতে বক্ররেখাটির স্পর্শকের সমীকরণ কোনটি? [RU'22-23]",
      "options": [
        "$2x - 2y - 3 = 0$",
        "$x - 2y - 3 = 0$",
        "$2x + y + 3 = 0$",
        "$x + 2y - 3 = 0$"
      ],
      "correct_answer": "$x + 2y - 3 = 0$",
      "explanation": "$x$-অক্ষকে $y = 0$\n$\\therefore 0(x - 1)(x - 2) - x + 3 = 0 \\therefore x = 3$\n$\\therefore x$ অক্ষের ছেদবিন্দু $(3, 0)$\nএখন, $y(x^2 - 3x + 2) - x + 3 = 0$\n$$\\implies y(2x - 3) + (x^2 - 3x + 2) \\cdot \\frac{dy}{dx} - 1 = 0$$\n$(3, 0)$ বিন্দুতে, $0 \\cdot (2 \\times 3 - 3) + (3^2 - 3 \\times 3 + 2) \\cdot \\frac{dy}{dx} - 1 = 0 \\implies \\frac{dy}{dx} = \\frac{1}{2}$\nএখন, স্পর্শকের সমীকরণ, $y - 0 = \\frac{1}{2}(x - 3)$\n$$\\implies 2y = x - 3 \\therefore x - 2y - 3 = 0$$",
      "time_limit": 60
    },
    {
      "id": 393,
      "topic": "১০. স্পর্শক ও অভিলম্বের সমীকরণ ও ঢাল",
      "question_text": "২৯. $y = (x - 2)(x - 3) - x + 7$ বক্ররেখাটির কোন বিন্দুতে স্পর্শকের ঢাল $4$ হবে? [RU'22-23; GST'20-21]",
      "options": [
        "$(2, 3)$",
        "$(2, 7)$",
        "$(3, 7)$",
        "$(5, 8)$"
      ],
      "correct_answer": "$(5, 8)$",
      "explanation": "$$y = (x - 2)(x - 3) - x + 7$$\n$$\\implies y = (x^2 - 5x + 6) - x + 7 = x^2 - 6x + 13$$\n$\\therefore \\frac{dy}{dx} = 2x - 6$; এখন, ঢাল, $\\frac{dy}{dx} = 4 = 2x - 6$\n$$\\implies 2x = 10 \\therefore x = 5$$\n$x = 5$ হলে, $y = 5^2 - 6 \\cdot 5 + 13 = 8$\n$\\therefore$ নির্ণেয় বিন্দু $(5, 8)$",
      "time_limit": 60
    },
    {
      "id": 394,
      "topic": "১০. স্পর্শক ও অভিলম্বের সমীকরণ ও ঢাল",
      "question_text": "৩০. $(4, 3)$ বিন্দুতে $3x^2 - 4y^2 = 12$ অধিবৃত্তের স্পর্শকের ঢালের মান কত হবে? [CU'22-23]",
      "options": [
        "$-1$",
        "$1$",
        "$c$",
        "$\\frac{3}{4}$"
      ],
      "correct_answer": "$1$",
      "explanation": "$$3x^2 - 4y^2 = 12 \\implies \\frac{d}{dx}(3x^2 - 4y^2) = \\frac{d}{dx}(12)$$\n$$\\implies 6x - 8y \\cdot \\frac{dy}{dx} = 0 \\implies 8y \\cdot \\frac{dy}{dx} = 6x \\therefore \\frac{dy}{dx} = \\frac{3x}{4y}$$\n$\\therefore (4, 3)$ বিন্দুতে স্পর্শকের ঢাল $\\frac{dy}{dx}\\Big|_{(4,3)} = \\frac{3 \\times 4}{4 \\times 3} = 1$",
      "time_limit": 60
    },
    {
      "id": 395,
      "topic": "১০. স্পর্শক ও অভিলম্বের সমীকরণ ও ঢাল",
      "question_text": "৩১. যদি $f(x) = x + \\sin{x}$ হয়, তবে $x$ এর কোন মানটির জন্য $f'(x) = 0$ হবে? [GST'21-22]",
      "options": [
        "$\\frac{\\pi}{2}$",
        "$\\pi$",
        "$\\frac{\\pi}{4}$",
        "$-\\pi$"
      ],
      "correct_answer": "$\\pi$",
      "explanation": "$$f(x) = x + \\sin{x} \\implies f'(x) = 1 + \\cos{x} = 0$$\n$$\\implies \\cos{x} = -1 = \\cos{\\pi} \\therefore x = \\pi$$",
      "time_limit": 60
    },
    {
      "id": 396,
      "topic": "১০. স্পর্শক ও অভিলম্বের সমীকরণ ও ঢাল",
      "question_text": "৩২. $x^2 - 2xy^2 = 1$ বক্ররেখার $(-1, 1)$ বিন্দুতে স্পর্শকের ঢাল কত? [RU'21-22]",
      "options": [
        "$1$",
        "$-1$",
        "$0$",
        "$-\\frac{1}{4}$"
      ],
      "correct_answer": "$1$",
      "explanation": "$$x^2 - 2xy^2 = 1$$\n$$\\implies 3x^2 - 2\\left[x \\cdot 2y \\frac{dy}{dx} + y^2 \\cdot 1\\right] = 0 ; [\\text{$x$ এর সাপেক্ষে অন্তরীকরণ করে}]$$\n$$\\implies 3x^2 - 4xy \\frac{dy}{dx} - 2y^2 = 0 \\therefore \\frac{dy}{dx} = \\frac{3x^2 - 2y^2}{4xy}$$\n$\\therefore (-1, 1)$ বিন্দুতে স্পর্শকের ঢাল, $\\frac{dy}{dx}\\Big|_{(-1,1)}$\n$$= \\frac{3(-1)^2 - 2 \\cdot 1^2}{4(-1) \\cdot 1} = \\frac{1}{-4}$$\n(ব্যাখ্যা অনুযায়ী উত্তর $-\\frac{1}{4}$ আসে কিন্তু অপশনে নেই এবং উত্তরে ক মার্ক করা। বইয়ের সমাধানে ভুল থাকতে পারে। প্রশ্নটি সম্ভবত $x^3 - 2xy^2 = 1$ ছিল, কারণ ব্যাখ্যায় $3x^2$ লেখা হয়েছে। $x^3 - 2xy^2 = 1$ হলে, $\\frac{3(-1)^2 - 2(1)^2}{4(-1)(1)} = \\frac{3 - 2}{-4} = -\\frac{1}{4}$। যাই হোক, বইয়ে যা আছে তাই লেখা হলো।)",
      "time_limit": 60
    },
    {
      "id": 397,
      "topic": "১০. স্পর্শক ও অভিলম্বের সমীকরণ ও ঢাল",
      "question_text": "৩৩. $y = x^3 - 2x^2 + 4$ বক্ররেখার $(2, 4)$ বিন্দুতে অঙ্কিত স্পর্শক এর সমীকরণ নিচের কোনটি? [JU'21-22]",
      "options": [
        "$4x - y - 4 = 0$",
        "$x + 4y - 18 = 0$",
        "$4x - y + 4 = 0$",
        "$x + 4y + 18 = 0$"
      ],
      "correct_answer": "$4x - y - 4 = 0$",
      "explanation": "$$\\frac{dy}{dx} = 3x^2 - 4x ; (2, 4) \\text{ বিন্দুতে অঙ্কিত স্পর্শকের ঢাল, } \\frac{dy}{dx} = 3 \\times 2^2 - 4 \\times 2 = 4$$\n$(2, 4)$ বিন্দুতে অঙ্কিত স্পর্শকের সমীকরণ:\n$$(y - 4) = 4(x - 2) \\implies y - 4 = 4x - 8$$\n$$\\therefore 4x - y - 4 = 0$$",
      "time_limit": 60
    },
    {
      "id": 398,
      "topic": "১০. স্পর্শক ও অভিলম্বের সমীকরণ ও ঢাল",
      "question_text": "৩৪. যদি $y = kx(2x + \\sqrt{3})$ বক্ররেখার মূলবিন্দুতে স্পর্শকটি $x$-অক্ষের সাথে $30^{\\circ}$ কোণ উৎপন্ন করে তাহলে $k$-এর মান হবে- [DU'20-21]",
      "options": [
        "$\\frac{1}{2}$",
        "$\\sqrt{3}$",
        "$\\frac{1}{3}$",
        "$\\frac{1}{4}$"
      ],
      "correct_answer": "$\\frac{1}{3}$",
      "explanation": "$$y = kx(2x + \\sqrt{3}) = 2kx^2 + \\sqrt{3}kx$$\n$$\\implies \\frac{dy}{dx} = 4kx + \\sqrt{3}k$$\nমূলবিন্দুতে, $\\frac{dy}{dx} = 4k \\times 0 + \\sqrt{3}k = \\sqrt{3}k$\n$\\therefore \\frac{dy}{dx} = \\sqrt{3}k = \\tan{30^{\\circ}} = \\frac{1}{\\sqrt{3}} \\implies k = \\frac{1}{3}$",
      "time_limit": 60
    },
    {
      "id": 399,
      "topic": "১০. স্পর্শক ও অভিলম্বের সমীকরণ ও ঢাল",
      "question_text": "৩৫. $x = y$ সরলরেখাটি $xy^2 = 4(4 - x)$ বক্ররেখাটির যে বিন্দুতে মিলিত হয়, বক্ররেখাটির সেই বিন্দুতে স্পর্শকের সমীকরণ কোনটি? [RU'20-21]",
      "options": [
        "$y + x - 4 = 0$",
        "$y + x + 4 = 0$",
        "$y - x - 4 = 0$",
        "$x - y - 4 = 0$"
      ],
      "correct_answer": "$y + x - 4 = 0$",
      "explanation": "$x = y$, $xy^2 = 4(4 - x)$ সমীকরণে বসিয়ে পাই, $x \\cdot x^2 = 4(4 - x) \\implies x^3 + 4x - 16 = 0$ যার একটি বাস্তব সমাধান $x = 2$ অর্থাৎ $y = 2$\nএখন, প্রদত্ত বক্ররেখার সমীকরণকে $x$ এর সাপেক্ষে অন্তরীকরণ করে পাই, $y^2 + x \\cdot 2y \\frac{dy}{dx} = 0 - 4$\n$$\\implies \\frac{dy}{dx} = \\frac{-4 - y^2}{2xy} \\therefore \\frac{dy}{dx}\\Big|_{(2, 2)} = \\frac{-4 - 2^2}{2 \\times 2 \\times 2} = -1$$\n$\\therefore$ উক্ত বিন্দুতে স্পর্শকের সমীকরণ:\n$y - 2 = -1(x - 2) \\implies y + x - 4 = 0$",
      "time_limit": 60
    },
    {
      "id": 400,
      "topic": "১০. স্পর্শক ও অভিলম্বের সমীকরণ ও ঢাল",
      "question_text": "৩৬. $y^2 = 4x$ বক্ররেখার $(2, 2\\sqrt{2})$ বিন্দুতে স্পর্শকের ঢাল কোনটি? [Agri'19-20]",
      "options": [
        "$1$",
        "$2$",
        "$\\frac{1}{\\sqrt{2}}$",
        "$2\\sqrt{2}$"
      ],
      "correct_answer": "$\\frac{1}{\\sqrt{2}}$",
      "explanation": "$$y^2 = 4x \\implies 2y \\frac{dy}{dx} = 4 \\implies \\frac{dy}{dx} = \\frac{2}{y}$$\n$$\\therefore \\frac{dy}{dx}\\Big|_{(2, 2\\sqrt{2})} = \\frac{2}{2\\sqrt{2}} = \\frac{1}{\\sqrt{2}}$$",
      "time_limit": 60
    },
    {
      "id": 401,
      "topic": "১০. স্পর্শক ও অভিলম্বের সমীকরণ ও ঢাল",
      "question_text": "৩৭. $y^2 - 2x - 4y + 4 = 0$ বক্ররেখার $(0, 2)$ বিন্দুতে অভিলম্বের সমীকরণ কোনটি? [SUST'19-20]",
      "options": [
        "$y = 0$",
        "$x = 0$",
        "$x = 2$",
        "$y = 2$"
      ],
      "correct_answer": "$y = 2$",
      "explanation": "$$y^2 - 2x - 4y + 4 = 0$$\n$$\\implies 2y \\times \\frac{dy}{dx} - 2 - 4 \\frac{dy}{dx} = 0 \\implies \\frac{dy}{dx} = \\frac{2}{2y - 4} = \\frac{1}{y - 2}$$\n$\\therefore$ অভিলম্বের ঢাল $= -\\frac{1}{\\frac{dy}{dx}\\Big|_{(0,2)}} = -\\frac{1}{\\frac{1}{0}} = 0$\n$\\therefore$ অভিলম্বের সমীকরণ, $(y - 2) = 0(x - 0) \\therefore y = 2$",
      "time_limit": 60
    },
    {
      "id": 402,
      "topic": "১০. স্পর্শক ও অভিলম্বের সমীকরণ ও ঢাল",
      "question_text": "৩৮. $(0, 1)$ বিন্দুতে $y = e^x$ বক্ররেখার স্পর্শকের সমীকরণ কোনটি? [CU'18-19]",
      "options": [
        "$y = x + 1$",
        "$y = 2x + e^x$",
        "$x = e + 1$",
        "$y = -x + 1$"
      ],
      "correct_answer": "$y = x + 1$",
      "explanation": "$$\\frac{dy}{dx} = e^x \\therefore \\frac{dy}{dx}\\Big|_{(0, 1)} = 1$$\n$\\therefore$ স্পর্শক: $y - 1 = 1(x - 0) \\implies y = x + 1$",
      "time_limit": 60
    },
    {
      "id": 403,
      "topic": "১০. স্পর্শক ও অভিলম্বের সমীকরণ ও ঢাল",
      "question_text": "৩৯. $\\frac{dy}{dx} = 0$ সমীকরণটির সমাধান- [RU'17-18]",
      "options": [
        "$x$ অক্ষের সমান্তরাল একটি সরলরেখা",
        "$y$ অক্ষের সমান্তরাল একটি সরলরেখা",
        "একটি বৃত্ত নির্দেশ করে",
        "সমাধান নেই"
      ],
      "correct_answer": "$x$ অক্ষের সমান্তরাল একটি সরলরেখা",
      "explanation": "$\\frac{dy}{dx} = 0 \\implies dy = 0 \\implies y = c$ যা $x$-অক্ষের সমান্তরাল একটি সরলরেখা।",
      "time_limit": 60
    },
    {
      "id": 404,
      "topic": "১০. স্পর্শক ও অভিলম্বের সমীকরণ ও ঢাল",
      "question_text": "৪০. $a$ এবং $b$ এর কোন মানের জন্য $y = ax^2 + b$ পরাবৃত্তটি $(0, 2)$ বিন্দু দিয়ে যাবে এবং $(2, 0)$ বিন্দুতে ঢাল হবে 4? [RU'16-17]",
      "options": [
        "$4, 2$",
        "$-2, 2$",
        "$1, 2$",
        "কোনটিই নয়"
      ],
      "correct_answer": "কোনটিই নয়",
      "explanation": "$y = ax^2 + b$ পরাবৃত্তটি $(0, 2)$ বিন্দু দিয়ে যায়\n$\\therefore 2 = 0 + b \\therefore b = 2$\n$\\frac{dy}{dx} = 2ax \\implies \\frac{dy}{dx}\\Big|_{(2, 0)} = 2 \\cdot a \\cdot 2 = 4a$;\nঅতএব, $4a = 4 \\therefore a = 1$",
      "time_limit": 60
    },
    {
      "id": 405,
      "topic": "১০. স্পর্শক ও অভিলম্বের সমীকরণ ও ঢাল",
      "question_text": "৪১. $y = x^3 - 6x^2 + 12x - 9$ বক্ররেখার কোন বিন্দুতে স্পর্শক $x$-অক্ষের সমান্তরাল? [CU'16-17]",
      "options": [
        "$(0, 0)$",
        "$(2, 2)$",
        "$(2, -1)$",
        "$(3, 0)$"
      ],
      "correct_answer": "$(2, -1)$",
      "explanation": "$$y_{1} = 3x^2 - 12x + 12 = 0$$\n$$\\implies x^2 - 4x + 4 = 0 \\implies (x - 2)^2 = 0 \\therefore x = 2$$\n$x = 2$ হলে, $y = 2^3 - 6 \\cdot 2^2 + 12 \\cdot 2 - 9 = -1$\n$\\therefore (x, y) = (2, -1)$",
      "time_limit": 60
    },
    {
      "id": 406,
      "topic": "১০. স্পর্শক ও অভিলম্বের সমীকরণ ও ঢাল",
      "question_text": "৪২. $x = 0$ বিন্দুতে $y = x + e^x$ এর লেখচিত্রে স্পর্শকের সমীকরণ হবে- [DU'14-15]",
      "options": [
        "$y = x$",
        "$y = x + 1$",
        "$y = 2x + 1$",
        "$y = 2x$"
      ],
      "correct_answer": "$y = 2x + 1$",
      "explanation": "$$y = x + e^x \\therefore \\frac{dy}{dx} = 1 + e^x;$$\n$x = 0$, $\\frac{dy}{dx} = 1 + e^0 = 2$ এবং $y = 0 + e^0 = 1$\n$y - 1 = 2(x - 0) \\therefore y = 2x + 1$",
      "time_limit": 60
    },
    {
      "id": 407,
      "topic": "১০. স্পর্শক ও অভিলম্বের সমীকরণ ও ঢাল",
      "question_text": "৪৩. $y = \\sqrt{x}$ বক্ররেখার উপর কোন বিন্দুতে স্পর্শক $x$ অক্ষের সহিত $45^{\\circ}$ কোণ সৃষ্টি করে? [RU'13-14]",
      "options": [
        "$\\left(\\frac{1}{4}, \\frac{1}{2}\\right)$",
        "$\\left(\\frac{1}{2}, \\frac{1}{4}\\right)$",
        "$\\left(-\\frac{1}{2}, \\frac{1}{4}\\right)$",
        "$\\left(-\\frac{1}{4}, -\\frac{1}{2}\\right)$"
      ],
      "correct_answer": "$\\left(\\frac{1}{4}, \\frac{1}{2}\\right)$",
      "explanation": "$$y = \\sqrt{x} \\implies \\frac{dy}{dx} = \\frac{1}{2\\sqrt{x}} = \\tan{45^{\\circ}} = 1$$\n$$\\implies 1 = \\frac{1}{2\\sqrt{x}} \\implies 1 = \\frac{1}{4x} ; [\\text{বর্গ করে}]$$\n$$\\implies x = \\frac{1}{4} \\implies y = \\sqrt{\\frac{1}{4}} = \\frac{1}{2} \\therefore (x, y) = \\left(\\frac{1}{4}, \\frac{1}{2}\\right)$$",
      "time_limit": 60
    },
    {
      "id": 408,
      "topic": "১০. স্পর্শক ও অভিলম্বের সমীকরণ ও ঢাল",
      "question_text": "৪৪. $x^3 - cxy + y = 5$ বক্ররেখাটি $(2, 1)$ বিন্দুগামী হলে $c$ এর মান কত এবং $(2, 1)$ বিন্দুতে উক্ত বক্ররেখাটির উপর অঙ্কিত স্পর্শকের ঢাল কত? [KUET'24-25]",
      "options": [
        "$1, \\frac{10}{3}$",
        "$2, \\frac{-10}{3}$",
        "$2, 1$",
        "$2, \\frac{10}{3}$"
      ],
      "correct_answer": "$2, \\frac{10}{3}$",
      "explanation": "$$x^3 - cxy + y = 5$$\nরেখাটি $(2, 1)$ বিন্দুগামী\n$\\therefore 8 - 2C + 1 = 5 ; C = 2$\n$$x^3 - 2xy + y = 5$$\n$$\\implies 3x^2 - 2x\\frac{dy}{dx} - 2y + \\frac{dy}{dx} = 0$$\n$$\\implies \\frac{dy}{dx} = \\frac{2y - 3x^2}{1 - 2x} \\implies \\frac{dy}{dx}\\Big|_{(2,1)} = \\frac{2 - 12}{1 - 4} = \\frac{10}{3}$$",
      "time_limit": 60
    },
    {
      "id": 409,
      "topic": "১০. স্পর্শক ও অভিলম্বের সমীকরণ ও ঢাল",
      "question_text": "৪৫. What is the slope of tangent of the curve $x^2 + y^2 - 2x - 3 = 0$ at the point $(-1, 1)$? [IUT'24-25]",
      "options": [
        "$0$",
        "$2$",
        "$1$",
        "None"
      ],
      "correct_answer": "None",
      "explanation": "Here, $f(x, y) = x^2 + y^2 - 2x - 3 = 0$\nBut, $f(-1, 1) = (-1)^2 + (1)^2 - 2(-1) - 3 = 1 \\neq 0 \\therefore$ The point is not on the curve.\nSo, the slope of the tangent can't be found.",
      "time_limit": 60
    },
    {
      "id": 410,
      "topic": "১০. স্পর্শক ও অভিলম্বের সমীকরণ ও ঢাল",
      "question_text": "৪৬. Consider a curve $C$ given by the equation, $y = 2x^2 - x + 3$. Assume, $C$ crosses the $y$ axis at the point $P$ and the straight line $L$ is normal to $C$ at point $P$. Find the equation of the line $L$. [IUT'23-24]",
      "options": [
        "$x + y - 3 = 0$",
        "$x + y + 3 = 0$",
        "$x - y + 3 = 0$",
        "$x - y - 3 = 0$"
      ],
      "correct_answer": "$x - y + 3 = 0$",
      "explanation": "At point $P$, $x = 0 \\implies y = 3$\n$P \\equiv (0, 3)$. Slope at point $P = m = \\frac{dy}{dx}$\n$= 4x - 1 = 4 \\cdot 0 - 1 = -1$\n$\\therefore$ Slope of normal $= 1$\n$\\therefore$ Equation: $y - 3 = 1(x - 0) \\implies x - y + 3 = 0$",
      "time_limit": 60
    },
    {
      "id": 411,
      "topic": "১০. স্পর্শক ও অভিলম্বের সমীকরণ ও ঢাল",
      "question_text": "৪৭. $x^3 + y^3 = 3xy$ এর কোন বিন্দুতে স্পর্শক $x$-অক্ষের সমান্তরাল? [BUET'21-22]",
      "options": [
        "$(2^{\\frac{1}{3}}, 2^{\\frac{2}{3}})$",
        "$(2^{-\\frac{1}{3}}, 2^{\\frac{2}{3}})$",
        "$(2^{\\frac{1}{3}}, 2^{\\frac{1}{3}})$",
        "$(2^{\\frac{2}{3}}, 2^{\\frac{1}{3}})$"
      ],
      "correct_answer": "$(2^{\\frac{1}{3}}, 2^{\\frac{2}{3}})$",
      "explanation": "$$x^3 + y^3 = 3xy$$\n$$\\implies 3x^2 + 3y^2 \\cdot \\frac{dy}{dx} = 3\\left(y + x \\cdot \\frac{dy}{dx}\\right)$$\n$$\\implies \\frac{dy}{dx} = \\frac{y - x^2}{y^2 - x}$$\nস্পর্শক $x$ অক্ষের সমান্তরাল বলে, $\\frac{dy}{dx} = 0$\n$$\\implies \\frac{y - x^2}{y^2 - x} = 0 \\therefore x^2 = y$$\nমূল সমীকরণে $y = x^2$ বসিয়ে, $x^3 + x^6 = 3x^3$\n$$\\implies x^6 = 2x^3 \\implies x^3(x^3 - 2) = 0$$\nহয় $x = 0 \\therefore y = 0$ অথবা, $x^3 = 2 \\therefore x = 2^{\\frac{1}{3}}$\n$y = 2^{\\frac{2}{3}} \\therefore$ বিন্দুটি $(2^{\\frac{1}{3}}, 2^{\\frac{2}{3}})$",
      "time_limit": 60
    },
    {
      "id": 412,
      "topic": "১০. স্পর্শক ও অভিলম্বের সমীকরণ ও ঢাল",
      "question_text": "৪৮. Find the equation of the tangent of the curve $xy = 3$ at the point $\\left(4, \\frac{3}{4}\\right)$. [IUT'21-22]",
      "options": [
        "$16x - 3y = 24$",
        "$3x - 16y = 24$",
        "$3x + 16y = 24$",
        "$16x + 3y = 24$"
      ],
      "correct_answer": "$3x + 16y = 24$",
      "explanation": "$$xy = 3 \\implies y = \\frac{3}{x} \\implies \\frac{dy}{dx} = -\\frac{3}{x^2}$$\n$$\\implies \\frac{dy}{dx}\\Big|_{(4, \\frac{3}{4})} = -\\frac{3}{16}$$\n$\\therefore$ Equation of tangent,\n$$y - \\frac{3}{4} = -\\frac{3}{16}(x - 4)$$\n$$\\implies 16y - 12 = -3(x - 4)$$\n$$\\implies 16y - 12 = -3x + 12$$\n$$\\implies 3x + 16y = 24$$",
      "time_limit": 60
    },
    {
      "id": 413,
      "topic": "১০. স্পর্শক ও অভিলম্বের সমীকরণ ও ঢাল",
      "question_text": "৪৯. $k$ এর মান কত হলে, $y = k(x - 1)(x + 2)$ বক্ররেখার $x = 1$ বিন্দুতে স্পর্শক $x$-অক্ষের সাথে $60^{\\circ}$ কোণ উৎপন্ন করবে? [BUET'13-14, 11-12; CUET'13-14, 11-12]",
      "options": [
        "$\\frac{1}{\\sqrt{3}}$",
        "$\\frac{\\sqrt{3}}{2}$",
        "$\\frac{\\sqrt{2}}{3}$",
        "$\\sqrt{3}$"
      ],
      "correct_answer": "$\\frac{1}{\\sqrt{3}}$",
      "explanation": "$$k(x^2 + x - 2) = y$$\n$$y_{1} = k(2x + 1) = \\tan{60^{\\circ}} = k \\times 3$$\n$$\\therefore k = \\frac{\\sqrt{3}}{3} = \\frac{1}{\\sqrt{3}}$$",
      "time_limit": 60
    },
    {
      "id": 414,
      "topic": "১০. স্পর্শক ও অভিলম্বের সমীকরণ ও ঢাল",
      "question_text": "৫০. $f(x) = x + \\frac{1}{x}$ ফাংশনটির জন্য যে সমস্ত বিন্দুতে স্পর্শক $x$-অক্ষের সমান্তরাল তা হল- [BUET'24-25; 13-14]",
      "options": [
        "$(1, 2), (-1, -2)$",
        "$(-1, 2), (1, 0)$",
        "$(2, -1), (0, 1)$",
        "$(-1, 2), (1, -2)$"
      ],
      "correct_answer": "$(1, 2), (-1, -2)$",
      "explanation": "$$y = x + \\frac{1}{x} ; y_{1} = 0 \\implies 1 - \\frac{1}{x^2} = 0$$\n$$\\therefore x = \\pm 1, y = 2, -2$$\nনির্ণেয় বিন্দুদ্বয়: $(1, 2), (-1, -2)$",
      "time_limit": 60
    },
    {
      "id": 415,
      "topic": "১০. স্পর্শক ও অভিলম্বের সমীকরণ ও ঢাল",
      "question_text": "৫১. $y^2 = 4x$ প্যারাবোলার মূল বিন্দুতে স্পর্শকের ঢাল কত? [BUTEX'13-14]",
      "options": [
        "$-1$",
        "$1$",
        "$\\infty$",
        "$0$"
      ],
      "correct_answer": "$\\infty$",
      "explanation": "$$\\frac{dy}{dx} = \\frac{d}{dx}(2\\sqrt{x}) = \\frac{1}{\\sqrt{x}} ; (0, 0) \\text{ বিন্দুতে স্পর্শকের}$$\n$$\\text{ঢাল } = \\lim_{x \\to 0} \\frac{1}{\\sqrt{x}} = \\infty$$",
      "time_limit": 60
    },
    {
      "id": 416,
      "topic": "১০. স্পর্শক ও অভিলম্বের সমীকরণ ও ঢাল",
      "question_text": "৫২. $y(x - 2)(x - 3) - x + 7 = 0$ বক্ররেখাটি যে বিন্দুতে $x$-অক্ষকে ছেদ করে, ঐ বিন্দুতে বক্ররেখাটির অভিলম্বের সমীকরণ হল- [BUET'11-12]",
      "options": [
        "$x + 20y - 7 = 0$",
        "$20x + y - 140 = 0$",
        "$20x + y + 140 = 0$",
        "$x - 20y - 7 = 0$"
      ],
      "correct_answer": "$20x + y - 140 = 0$",
      "explanation": "$x$ অক্ষকে ছেদ করলে, $y = 0$\n$\\therefore 0 - x + 7 = 0 \\implies x = 7$; ছেদবিন্দু $(7, 0)$\nএখন, $y(x^2 - 5x + 6) - x + 7 = 0$\n$$\\implies y(2x - 5) + (x^2 - 5x + 6)\\frac{dy}{dx} - 1 = 0$$\n$$\\implies \\frac{dy}{dx} = \\frac{1 - y(2x - 5)}{x^2 - 5x + 6} \\implies \\frac{dy}{dx}\\Big|_{(7, 0)} = \\frac{1}{49 - 35 + 6} = \\frac{1}{20}$$\n$\\therefore$ অভিলম্ব: $y - 0 = \\frac{-1}{\\frac{1}{20}}(x - 7)$\n$$\\implies 20x + y - 140 = 0$$",
      "time_limit": 60
    },
    {
      "id": 417,
      "topic": "১০. স্পর্শক ও অভিলম্বের সমীকরণ ও ঢাল",
      "question_text": "৫৩. $y^2 = 2x^3$ বক্ররেখার কোন বিন্দুতে স্পর্শকটি $4x - 3y + 1 = 0$ সরলরেখার সাথে লম্ব হবে? [BUET'10-11]",
      "options": [
        "$\\left(\\frac{1}{8}, -\\frac{1}{16}\\right)$",
        "$\\left(\\frac{1}{8}, \\frac{1}{16}\\right)$",
        "$\\left(-\\frac{1}{8}, -\\frac{1}{16}\\right)$",
        "$\\left(-\\frac{1}{8}, \\frac{1}{16}\\right)$"
      ],
      "correct_answer": "সঠিক উত্তর নেই",
      "explanation": "$$y^2 = 2x^3 \\implies 2y\\frac{dy}{dx} = 2 \\cdot 3x^2$$\n$$\\implies \\frac{dy}{dx} = \\frac{3x^2}{y}$$\nস্পর্শকের ঢাল $= -\\frac{3}{4} = \\frac{3x^2}{y}$ অর্থাৎ, বুঝা যায় নির্ণেয় বিন্দুর $y$ স্থানাঙ্ক অবশ্যই ঋণাত্মক।\nআবার, $y^2 = 2x^3$ সমীকরণের বামপক্ষ অঋণাত্মক। ডানপক্ষকেও তাই অঋণাত্মক হতে হলে $x$ এর কোনো মান ঋণাত্মক হতে পারবে না। $\\therefore$ নির্ণেয় বিন্দুর $x$ স্থানাঙ্ক ধনাত্মক এবং $y$ স্থানাঙ্ক ঋণাত্মক।",
      "time_limit": 60
    },
    {
      "id": 418,
      "topic": "১০. স্পর্শক ও অভিলম্বের সমীকরণ ও ঢাল",
      "question_text": "৫৪. $y = x^3 - 3x^2 - 9x + 5$ বক্ররেখার যে সব বিন্দুতে স্পর্শক $x$-অক্ষের সমান্তরাল তাদের ভুজের মান হলো- [RUET'10-11]",
      "options": [
        "$x = 0$ and $0$",
        "$x = 1$ and $-1$",
        "$x = 1$ and $-3$",
        "$x = -1$ and $3$"
      ],
      "correct_answer": "$x = -1$ and $3$",
      "explanation": "$$\\frac{dy}{dx} = 3x^2 - 6x - 9 = 0 \\therefore x = 3, -1$$",
      "time_limit": 60
    },
    {
      "id": 419,
      "topic": "১১. অন্তরীকরণের ব্যবহারিক প্রয়োগ ও পরিবর্তনের হার",
      "question_text": "১. একটি গোলকের আয়তনের বৃদ্ধির হার তার ব্যাসার্ধ $r$ এর বৃদ্ধির হারের কত গুণ? [RU'19-20]",
      "options": [
        "$4$",
        "$2\\pi r$",
        "$4\\pi r^2$",
        "$\\frac{4}{3}\\pi r^2$"
      ],
      "correct_answer": "$4\\pi r^2$",
      "explanation": "$$V = \\frac{4}{3}\\pi r^3 \\implies \\frac{dV}{dt} = 4\\pi r^2 \\times \\frac{dr}{dt}$$",
      "time_limit": 60
    },
    {
      "id": 420,
      "topic": "১১. অন্তরীকরণের ব্যবহারিক প্রয়োগ ও পরিবর্তনের হার",
      "question_text": "২. একটি ট্রেন $t$ সেকেন্ডে $\\left(3t + \\frac{t^2}{8}\\right)$ মিটার পথ অতিক্রম করে। $5$ মিনিট পর ট্রেনটির বেগ কত হবে? [JU'19-20]",
      "options": [
        "$78\\,\\mathrm{m\\,s^{-1}}$",
        "$87\\,\\mathrm{m\\,s^{-1}}$",
        "$75\\,\\mathrm{m\\,s^{-1}}$",
        "$85\\,\\mathrm{m\\,s^{-1}}$"
      ],
      "correct_answer": "$78\\,\\mathrm{m\\,s^{-1}}$",
      "explanation": "$$v = \\frac{ds}{dt} = \\frac{d}{dt}\\left(3t + \\frac{t^2}{8}\\right) = 3 + \\frac{1}{8} \\cdot 2t = 3 + \\frac{t}{4}$$\n$t = (5 \\times 60)\\,\\mathrm{s}$ হলে, $v = 3 + \\frac{5 \\times 60}{4} = 78\\,\\mathrm{m\\,s^{-1}}$",
      "time_limit": 60
    },
    {
      "id": 421,
      "topic": "১১. অন্তরীকরণের ব্যবহারিক প্রয়োগ ও পরিবর্তনের হার",
      "question_text": "৩. একটা কণার গতিপথ হচ্ছে: $S(t) = t^2 + 2t + 1$। $S(0)$ এবং $S'(10)$ এর ফিজিক্যাল মান যথাক্রমে- [CU'16-17]",
      "options": [
        "শুরুতে কণার অবস্থান, $10$ সেকেন্ডে অতিক্রান্ত পথ",
        "$0$ সেকেন্ডে কণার অতিক্রান্ত পথ, $10$ সেকেন্ডে কণার বেগ",
        "$t$ সেকেন্ডে কণার অতিক্রান্ত পথ, $10$ সেকেন্ড পর কণার অতিক্রান্ত পথ",
        "$t$ সেকেন্ডে কণার অতিক্রান্ত পথ, $1$ সেকেন্ডে কণার গতিবেগ",
        "$0$ একক সময়ে কণার অবস্থান, $10$ একক সময়ে কণার বেগ"
      ],
      "correct_answer": "$0$ একক সময়ে কণার অবস্থান, $10$ একক সময়ে কণার বেগ",
      "explanation": "$S(0)$ নির্দেশ করে $t = 0$ একক সময়ে কণার আদি অবস্থান এবং $S'(10) = \\left.\\frac{dS}{dt}\\right|_{t=10}$ নির্দেশ করে $t = 10$ একক সময়ে কণার তাৎক্ষণিক বেগ।",
      "time_limit": 60
    },
    {
      "id": 422,
      "topic": "১১. অন্তরীকরণের ব্যবহারিক প্রয়োগ ও পরিবর্তনের হার",
      "question_text": "৪. যদি একটি বৃত্তের ক্ষেত্রফল সমহারে বাড়ে, তবে তার পরিসীমা- [KU'13-14]",
      "options": [
        "ব্যাসার্ধের ব্যস্তানুপাতে বাড়ে",
        "ব্যাসার্ধের সমানুপাতে বাড়ে",
        "ব্যাসের সমানুপাতে বাড়ে",
        "ব্যাসের ব্যস্তানুপাতে বাড়ে"
      ],
      "correct_answer": "ব্যাসার্ধের ব্যস্তানুপাতে বাড়ে",
      "explanation": "ধরি, বৃত্তের ক্ষেত্রফল $A = \\pi r^2$,\nপরিসীমা $= 2\\pi r = p \\implies \\frac{dp}{dt} = 2\\pi\\frac{dr}{dt}$\nএখন, $\\frac{dA}{dt} = 2\\pi r \\frac{dr}{dt}$ ; [অন্তরীকরণ করে];\nপ্রশ্নানুসারে, $\\frac{dA}{dt} = \\text{ধ্রুবক} = k$\n$$\\therefore 2\\pi \\frac{dr}{dt} = \\frac{k}{r} \\implies \\frac{dp}{dt} = \\frac{k}{r}$$\n$\\therefore \\frac{dp}{dt} \\propto \\frac{1}{r}$ অর্থাৎ পরিসীমা ব্যাসার্ধের ব্যস্তানুপাতে বাড়ে।",
      "time_limit": 60
    },
    {
      "id": 423,
      "topic": "১১. অন্তরীকরণের ব্যবহারিক প্রয়োগ ও পরিবর্তনের হার",
      "question_text": "৫. ধাতু তৈরি একটি বৃত্ত আকৃতির থালার ব্যাসার্ধ, তাপ প্রয়োগের ফলে প্রতি সেকেন্ডে $0.25\\,\\mathrm{cm}$ বাড়ে। যখন থালাটির ব্যাসার্ধ $7\\,\\mathrm{cm}$ তখন তার তলের বৃদ্ধির হার প্রতি সেকেন্ডে কত বর্গ সেন্টিমিটার? [KU'12-13]",
      "options": [
        "$10.99$",
        "$12.99$",
        "$3.25$",
        "কোনটিই নয়"
      ],
      "correct_answer": "$10.99$",
      "explanation": "$$A = \\pi r^2 ; \\frac{dA}{dt} = 2\\pi r \\frac{dr}{dt}$$\n$$= 2\\pi \\times 7 \\times 0.25 = 10.99$$",
      "time_limit": 60
    },
    {
      "id": 424,
      "topic": "১১. অন্তরীকরণের ব্যবহারিক প্রয়োগ ও পরিবর্তনের হার",
      "question_text": "৬. সাবানের একটি গোলাকার বুদবুদের আয়তন বৃদ্ধির হার ও তার ব্যাসার্ধের বৃদ্ধির হারের অনুপাত কত? [BUET'24-25]",
      "options": [
        "$\\pi r^2$",
        "$\\frac{4}{3}\\pi r^2$",
        "$\\frac{4}{3}\\pi$",
        "$4\\pi r^2$"
      ],
      "correct_answer": "$4\\pi r^2$",
      "explanation": "$$V = \\frac{4}{3}\\pi r^3 \\implies \\frac{dV}{dt} = \\frac{4}{3}\\pi \\times 3r^2 \\times \\frac{dr}{dt}$$\n$$\\implies \\frac{\\frac{dV}{dt}}{\\frac{dr}{dt}} = 4\\pi r^2$$",
      "time_limit": 60
    },
    {
      "id": 425,
      "topic": "১১. অন্তরীকরণের ব্যবহারিক প্রয়োগ ও পরিবর্তনের হার",
      "question_text": "৭. $s = \\frac{1}{3}t^3 + t^2 + 3t$ হলে, $১$ সেকেন্ড পর ত্বরণ কত? [RUET'24-25; BUTEX'14-15]",
      "options": [
        "$\\frac{4\\,\\mathrm{m}}{\\mathrm{sec^2}}$",
        "$\\frac{2\\,\\mathrm{m}}{\\mathrm{sec^2}}$",
        "$\\frac{5\\,\\mathrm{m}}{\\mathrm{sec^2}}$",
        "$\\frac{1\\,\\mathrm{m}}{\\mathrm{sec^2}}$",
        "$\\frac{3\\,\\mathrm{m}}{\\mathrm{sec^2}}$"
      ],
      "correct_answer": "$\\frac{4\\,\\mathrm{m}}{\\mathrm{sec^2}}$",
      "explanation": "$$s = \\frac{1}{3}t^3 + t^2 + 3t$$\n$$\\implies \\frac{ds}{dt} = v = t^2 + 2t + 3 \\implies \\frac{dv}{dt} = a = 2t + 2$$\nযখন $t = 1 \\implies a = 2 + 2 = 4\\,\\mathrm{m\\,s^{-2}} = \\frac{4\\,\\mathrm{m}}{\\mathrm{sec^2}}$",
      "time_limit": 60
    },
    {
      "id": 426,
      "topic": "১১. অন্তরীকরণের ব্যবহারিক প্রয়োগ ও পরিবর্তনের হার",
      "question_text": "৮. A water tank has the shape of an upside-down cone with radius $2\\,\\mathrm{m}$ and height $5\\,\\mathrm{m}$. The water is running out of the tank through a small hole at the bottom at a speed proportional to the square root of the depth of the water in the tank. Suppose that the water is running out at a rate of $3\\,\\mathrm{m^3/min}$ when the depth of the water in the tank is $4\\,\\mathrm{m}$. Find the rate at which the water level is changing at this moment. [একটি জলাশয়ের আকৃতি উল্টো শঙ্কুর মতো, যার ব্যাসার্ধ $2$ মিটার এবং উচ্চতা $5$ মিটার। নীচের দিকে একটি ছোট গর্ত দিয়ে পানি ট্যাঙ্ক থেকে বেরিয়ে যাচ্ছে, যার গতি ট্যাঙ্কের গভীরতার বর্গমূলের সমানুপাতিক। ধরো, ট্যাঙ্কের গভীরতা $4$ মিটার হলে পানি $3\\,\\mathrm{m^3/min}$ হারে বেরিয়ে যাচ্ছে। এই মুহূর্তে পানিরস্তরের পরিবর্তনের হার নির্ণয় করো।] [IUT'24-25]\n[চিত্রের বিবরণ: একটি উল্টানো শঙ্কু যার ভূমির ব্যাসার্ধ $2\\,\\mathrm{m}$ এবং উচ্চতা $5\\,\\mathrm{m}$। ভিতরে পানিস্তর $h$ এবং ব্যাসার্ধ $r$।]",
      "options": [
        "$\\frac{75}{54\\pi}$",
        "$\\frac{75}{64\\pi}$",
        "$\\frac{65}{54\\pi}$",
        "$\\frac{65}{64\\pi}$"
      ],
      "correct_answer": "$\\frac{75}{64\\pi}$",
      "explanation": "here, $V = \\frac{1}{3}\\pi r^2 h \\text{ and } \\frac{r}{2} = \\frac{h}{5} \\implies r = \\frac{2h}{5}$\n$$\\therefore V = \\frac{1}{3} \\times \\frac{4\\pi h^2}{25} \\times h = \\frac{4\\pi h^3}{75}$$\n$$\\implies \\frac{dV}{dt} = \\frac{4\\pi}{75} \\cdot 3h^2 \\frac{dh}{dt}$$\n$$\\implies -3 = \\frac{12\\pi}{75}h^2 \\frac{dh}{dt} \\quad \\left[\\text{as } \\frac{dV}{dt} = -3\\,\\mathrm{m^3/min}\\right]$$\n$$\\implies \\frac{dh}{dt} = \\frac{-3 \\times 75}{12\\pi h^2} = \\frac{-75}{4\\pi \\times 4^2} \\quad [\\text{as } h = 4\\,\\mathrm{m}]$$\n$$= -\\frac{75}{64\\pi}$$\n$\\therefore$ The rate will be $\\frac{75}{64\\pi}\\,\\mathrm{m/min}$.",
      "time_limit": 60
    },
    {
      "id": 427,
      "topic": "১১. অন্তরীকরণের ব্যবহারিক প্রয়োগ ও পরিবর্তনের হার",
      "question_text": "৯. The volume of a cone-shaped metallic object is increasing at a rate of $20\\,\\mathrm{ft^3/min}$. Both the base-diameter and height of the object are always equal. How fast is the height of the object increasing when it is $10\\,\\mathrm{ft}$ tall? [একটি শঙ্কু আকৃতির ধাতব বস্তুর আয়তন $20\\,\\mathrm{ft^3/min}$ হারে বৃদ্ধি পাচ্ছে। বস্তুটির ভূমির ব্যাস এবং উচ্চতা সর্বদা সমান থাকে। যখন বস্তুটির উচ্চতা $10\\,\\mathrm{ft}$, তখন এর উচ্চতা কত দ্রুত বৃদ্ধি পাচ্ছে?] [IUT'21-22]",
      "options": [
        "$0.255\\,\\mathrm{ft/min}$",
        "$0.064\\,\\mathrm{ft/min}$",
        "$0.085\\,\\mathrm{ft/min}$",
        "$0.322\\,\\mathrm{ft/min}$"
      ],
      "correct_answer": "$0.255\\,\\mathrm{ft/min}$",
      "explanation": "$$\\mathrm{Sol^n}: V = \\frac{1}{3}\\pi r^2 h = \\frac{1}{3}\\pi \\left(\\frac{x}{2}\\right)^2 \\times x = \\frac{1}{12}\\pi x^3$$\n$$\\frac{dV}{dt} = \\frac{1}{12}\\pi (3x^2) \\frac{dx}{dt}$$\n$$\\implies 20 = \\frac{1}{12}\\pi (3 \\times 10^2) \\frac{dx}{dt} \\quad [\\text{when } x = 10\\,\\mathrm{ft}]$$\n$$\\therefore \\frac{dx}{dt} = 0.2546\\,\\mathrm{ft/min} \\approx 0.255\\,\\mathrm{ft/min}$$",
      "time_limit": 60
    },
    {
      "id": 428,
      "topic": "১১. অন্তরীকরণের ব্যবহারিক প্রয়োগ ও পরিবর্তনের হার",
      "question_text": "১০. During midnight, a car is traveling south at the speed of $8\\,\\mathrm{km/hour}$ for $30$ minutes and then turns west. A flashlight located at the point of departure has been tracking the car. How fast is the flashlight rotating $1$ hour after departure? [মধ্যরাতে, একটি গাড়ি ঘণ্টায় $8$ কিলোমিটার বেগে $30$ মিনিটের জন্য দক্ষিণ দিকে ভ্রমণ করছে এবং তারপর পশ্চিম দিকে মোড় নিচ্ছে। প্রস্থান বিন্দুতে অবস্থিত একটি টর্চলাইট গাড়িটিকে অনুসরণ করছে। প্রস্থান করার $1$ ঘণ্টা পর টর্চলাইটটি কত দ্রুত ঘুরছে?] [IUT'19-20]\n[চিত্রের বিবরণ: প্রস্থান বিন্দু থেকে দক্ষিণে $4\\,\\mathrm{km}$ যাওয়ার পর পশ্চিমে $x = 8t$ দূরত্ব অতিক্রমকারী সমকোণী ত্রিভুজ।]",
      "options": [
        "$1\\,\\mathrm{rad\\,h^{-1}}$",
        "$0.5\\,\\mathrm{rad\\,h^{-1}}$",
        "$2\\,\\mathrm{rad\\,h^{-1}}$",
        "$0.4\\,\\mathrm{rad\\,h^{-1}}$"
      ],
      "correct_answer": "$1\\,\\mathrm{rad\\,h^{-1}}$",
      "explanation": "$\\mathrm{Sol^n}: x = 8t, \\theta = \\tan^{-1}\\left(\\frac{8t}{4}\\right)$.\n$$\\theta = \\tan^{-1}(2t)$$\n$$\\text{So, } \\frac{d\\theta}{dt} = \\frac{1}{1+(2t)^2} \\cdot 2 \\cdot \\frac{dt}{dt} = \\frac{2}{1+4t^2}$$\n$\\text{After an hour, } t = \\frac{1}{2}\\,\\mathrm{hr}$ (starting from the point the car turned west).\n$$\\frac{d\\theta}{dt} = \\frac{2}{1+4\\left(\\frac{1}{2}\\right)^2} = 1\\,\\mathrm{rad\\,h^{-1}}$$",
      "time_limit": 60
    },
    {
      "id": 429,
      "topic": "১১. অন্তরীকরণের ব্যবহারিক প্রয়োগ ও পরিবর্তনের হার",
      "question_text": "১১. The following figure shows a right circular cylinder metal rod which is expanding as it is heated. After $t$ seconds the radius of the rod is $x\\,\\mathrm{cm}$ and the length of the rod is $5x\\,\\mathrm{cm}$. The cross-sectional area of the rod is increasing at the constant rate of $0.032\\,\\mathrm{cm^2s^{-1}}$. Find $dx/dt$ when the radius of the rod is $2\\,\\mathrm{cm}$. [একটি লম্ব বৃত্তাকার চোঙাকৃতির ধাতব দণ্ড উত্তপ্ত করার সাথে সাথে প্রসারিত হচ্ছে। $t$ সেকেন্ড পর দণ্ডটির ব্যাসার্ধ $x\\,\\mathrm{cm}$ এবং দৈর্ঘ্য $5x\\,\\mathrm{cm}$। দণ্ডটির প্রস্থচ্ছেদের ক্ষেত্রফল ধ্রুব হারে $0.032\\,\\mathrm{cm^2s^{-1}}$ বৃদ্ধি পাচ্ছে। যখন ব্যাসার্ধ $2\\,\\mathrm{cm}$ তখন $dx/dt$ নির্ণয় করো।] [IUT'18-19]\n[চিত্রের বিবরণ: একটি সিলিন্ডার যার ব্যাসার্ধ $x$ এবং দৈর্ঘ্য $5x$।]",
      "options": [
        "$0.002546$",
        "$0.003546$",
        "$0.022546$",
        "$0.302546$"
      ],
      "correct_answer": "$0.002546$",
      "explanation": "$\\mathrm{Sol^n}: \\text{Cross sectional Area, } A = \\pi x^2$\n$$\\implies \\frac{dA}{dt} = \\pi \\cdot 2x \\cdot \\frac{dx}{dt}$$\n$$\\implies 0.032\\,\\mathrm{cm^2s^{-1}} = 2\\pi \\times 2\\,\\mathrm{cm} \\times \\frac{dx}{dt}$$\n$$\\implies \\frac{dx}{dt} = 2.54647 \\times 10^{-3}\\,\\mathrm{cm/s} = 0.002546\\,\\mathrm{cm/s}$$",
      "time_limit": 60
    },
    {
      "id": 430,
      "topic": "১১. অন্তরীকরণের ব্যবহারিক প্রয়োগ ও পরিবর্তনের হার",
      "question_text": "১২. নির্দিষ্ট বিন্দু থেকে সরলরেখায় চলমান বস্তুর সরণ $s = 6 - 2t + 3t^3$ হলে $t = 1\\,\\mathrm{sec}$ পর বস্তুর ত্বরণ কত হবে? [RUET'14-15]",
      "options": [
        "$12$",
        "$16$",
        "$18$",
        "$20$",
        "None"
      ],
      "correct_answer": "$18$",
      "explanation": "$$v = \\frac{ds}{dt} = -2 + 9t^2 ; a = \\frac{dv}{dt} = 18t$$\n$t = 1\\,\\mathrm{sec}$ পর $a = 18$",
      "time_limit": 60
    },
    {
      "id": 431,
      "topic": "১১. অন্তরীকরণের ব্যবহারিক প্রয়োগ ও পরিবর্তনের হার",
      "question_text": "১৩. একটি গোলকের ব্যাসার্ধের বৃদ্ধির হার এবং পৃষ্ঠদেশের ক্ষেত্রফলের বৃদ্ধির হার সাংখ্যিকভাবে সমান হলে, গোলকটির ব্যাসার্ধের মান কত হবে? [BUET'13-14]",
      "options": [
        "$\\frac{1}{4\\pi}$",
        "$8\\pi$",
        "$4\\pi$",
        "$\\frac{1}{8\\pi}$"
      ],
      "correct_answer": "$\\frac{1}{8\\pi}$",
      "explanation": "$$\\frac{dA}{dt} = \\frac{dr}{dt} \\implies \\frac{d}{dt}(4\\pi r^2) = \\frac{dr}{dt}$$\n$$\\implies 4\\pi \\times 2r \\frac{dr}{dt} = \\frac{dr}{dt} \\therefore 8\\pi r = 1 \\therefore r = \\frac{1}{8\\pi}$$",
      "time_limit": 60
    },
    {
      "id": 432,
      "topic": "১১. অন্তরীকরণের ব্যবহারিক প্রয়োগ ও পরিবর্তনের হার",
      "question_text": "১৪. একটি ট্রেন $t$ সেকেন্ডে $5t + \\frac{1}{2}t^2$ ফুট দূরত্ব অতিক্রম করে। $2$ সেকেন্ড পর ট্রেনটির বেগ কত হবে? [RUET'13-14]",
      "options": [
        "$12\\,\\mathrm{ft/sec}$",
        "$10\\,\\mathrm{ft/sec}$",
        "$8\\,\\mathrm{ft/sec}$",
        "$7\\,\\mathrm{ft/sec}$",
        "None"
      ],
      "correct_answer": "$7\\,\\mathrm{ft/sec}$",
      "explanation": "$$s = 5t + \\frac{1}{2}t^2$$\n$$\\therefore v = \\frac{ds}{dt} = 5 + \\frac{1}{2} \\times 2 \\times t = 5 + t$$\n$$\\therefore (v)_2 = 5 + 2 = 7\\,\\mathrm{ft/sec.}$$",
      "time_limit": 60
    },
    {
      "id": 433,
      "topic": "১১. অন্তরীকরণের ব্যবহারিক প্রয়োগ ও পরিবর্তনের হার",
      "question_text": "১৫. একটি গোলাকার বুদবুদের ব্যাসার্ধ বৃদ্ধির হার $0.2\\,\\mathrm{mm/sec}$ (যখন ব্যাসার্ধ $7\\,\\mathrm{mm}$)। ঐ গোলাকার আয়তন বৃদ্ধির হার হলো- [KUET'13-14]",
      "options": [
        "$0.0123\\,\\mathrm{cc/sec}$",
        "$12.23\\,\\mathrm{cc/sec}$",
        "$1.232\\,\\mathrm{cc/sec}$",
        "$12.324\\,\\mathrm{cm/sec}$",
        "$0.1232\\,\\mathrm{cm^3/sec}$"
      ],
      "correct_answer": "$0.1232\\,\\mathrm{cm^3/sec}$",
      "explanation": "$$\\frac{dr}{dt} = 0.2, r = 7 ; V = \\frac{4}{3}\\pi r^3$$\n$$\\therefore \\frac{dV}{dt} = \\frac{4}{3}\\pi \\times 3r^2 \\frac{dr}{dt} = 4\\pi r^2 \\frac{dr}{dt}$$\n$$= 4\\pi \\times 7^2 \\times 0.2$$\n$$= 123.15\\,\\mathrm{mm^3/sec} = 0.1232\\,\\mathrm{cm^3/s}$$",
      "time_limit": 60
    },
    {
      "id": 434,
      "topic": "১১. অন্তরীকরণের ব্যবহারিক প্রয়োগ ও পরিবর্তনের হার",
      "question_text": "১৬. তাপে সিলিন্ডারের ব্যাস ও উচ্চতা বৃদ্ধির হার যথাক্রমে $0.025$ ও $0.0135$ হইলে আয়তন বৃদ্ধির হার কত? যদি ব্যাস ও উচ্চতা যথাক্রমে $10$ ও $25$ একক বিশিষ্ট হয়। [KUET'10-11]",
      "options": [
        "$10.8723$",
        "$11.0515$",
        "$14.3725$",
        "$11.3725$",
        "$17.0515$"
      ],
      "correct_answer": "$10.8723$",
      "explanation": "$$\\frac{dh}{dt} = 0.0135 ; \\frac{dR}{dt} = 0.025$$\n$R = 10 ; h = 25 \\quad [\\text{এখানে, } R = \\text{ব্যাস}]$\n$$\\frac{dV}{dt} = \\frac{d}{dt}\\left(\\frac{1}{4}\\pi R^2 h\\right) = \\frac{1}{4}\\pi \\left(2Rh \\frac{dR}{dt} + R^2 \\frac{dh}{dt}\\right)$$\n$$= \\frac{\\pi}{2} \\times 10 \\times 25 \\times 0.025 + \\frac{1}{4}\\pi \\times 100 \\times 0.0135$$\n$$= 10.8723$$",
      "time_limit": 60
    },
    {
      "id": 435,
      "topic": "১২. ফাংশনের চরমমান: লঘুমান, গুরুমান ও ক্রমবর্ধমান/হ্রাসমান",
      "question_text": "১. $f(x) = x(2a - x)$ এর সর্বোচ্চ মান কোনটি? [য. বো. ২২; অনুরূপ প্রশ্ন: য. বো. ২১]",
      "options": [
        "$2a$",
        "$a^2$",
        "$2a^2$",
        "$a$"
      ],
      "correct_answer": "$a^2$",
      "explanation": "$f(x) = x(2a - x) = 2ax - x^2$\nসর্বোচ্চ মানের জন্য,\n$$f'(x) = 0 \\implies 2a - 2x = 0 \\implies 2a = 2x \\implies x = a$$\nসর্বোচ্চ মান, $f(a) = 2a \\cdot a - a^2 = 2a^2 - a^2 = a^2$",
      "time_limit": 60
    },
    {
      "id": 436,
      "topic": "১২. ফাংশনের চরমমান: লঘুমান, গুরুমান ও ক্রমবর্ধমান/হ্রাসমান",
      "question_text": "২. $x = a$ বিন্দুতে $f(x)$ ফাংশন ক্রমবর্ধমান হবে যদি- [দি. বো. ২২; অনুরূপ প্রশ্ন: য. বো. ২১; দি. বো. ২১]",
      "options": [
        "$f'(a) = 0$",
        "$f'(a) < 0$",
        "$f'(a) \\neq 0$",
        "$f'(a) > 0$"
      ],
      "correct_answer": "$f'(a) > 0$",
      "explanation": "$f'(a) > 0$, অর্থাৎ ঢালের মান ধনাত্মক হতে হবে।",
      "time_limit": 60
    },
    {
      "id": 437,
      "topic": "১২. ফাংশনের চরমমান: লঘুমান, গুরুমান ও ক্রমবর্ধমান/হ্রাসমান",
      "question_text": "৩. $f(x) = x^2 - 2x$ ফাংশনটি ক্রমহ্রাসমান হওয়ার শর্ত- [দি. বো. ২২]",
      "options": [
        "$x > 1$",
        "$x > 2$",
        "$x < 1$",
        "$x < 2$"
      ],
      "correct_answer": "$x < 1$",
      "explanation": "$f(x) = x^2 - 2x \\therefore f'(x) = 2x - 2$\nক্রমহ্রাসমান হওয়ার শর্ত: $f'(x) < 0 \\implies 2x - 2 < 0 \\implies 2x < 2 \\therefore x < 1$",
      "time_limit": 60
    },
    {
      "id": 438,
      "topic": "১২. ফাংশনের চরমমান: লঘুমান, গুরুমান ও ক্রমবর্ধমান/হ্রাসমান",
      "question_text": "৪. $f(x) = 3x^2 - 2x + 1$ [য. বো. ২২; অনুরূপ প্রশ্ন: সি. বো. ২২]\ni. $x = 1$ বিন্দুতে $f(x)$ ফাংশনটি ক্রমবর্ধমান\nii. $x = \\frac{1}{3}$ এর জন্য $f(x)$ ফাংশনটির সর্বনিম্ন মান বিদ্যমান\niii. মূলবিন্দুতে $f(x)$ ফাংশনটির স্পর্শকের ঢাল $-2$\nনিচের কোনটি সঠিক?",
      "options": [
        "i ও ii",
        "i ও iii",
        "ii ও iii",
        "i, ii ও iii"
      ],
      "correct_answer": "i, ii ও iii",
      "explanation": "(i) $f(x) = 3x^2 - 2x + 1 \\therefore f'(x) = 6x - 2$\n$\\therefore f'(1) = 6(1) - 2 = 4 > 0$ সুতরাং, $x = 1$ বিন্দুতে ফাংশনটি ক্রমবর্ধমান।\n(ii) $f'(x) = 0$ হলে, $6x - 2 = 0$ বা, $x = \\frac{1}{3}$ হয়।\nআবার, $f''(x) = 6 > 0$\n$\\therefore x = \\frac{1}{3}$ এর জন্য ফাংশনটির সর্বনিম্ন মান বিদ্যমান।\n(iii) মূলবিন্দুতে স্পর্শকের ঢাল $= f'(0) = 6(0) - 2 = -2$",
      "time_limit": 60
    },
    {
      "id": 439,
      "topic": "১২. ফাংশনের চরমমান: লঘুমান, গুরুমান ও ক্রমবর্ধমান/হ্রাসমান",
      "question_text": "৫. $x$ এর মান কত হলে $\\frac{x}{\\ln x}$ এর মান ক্ষুদ্রতম হবে? [ব. বো. ২১]",
      "options": [
        "$e$",
        "$e^{-1}$",
        "$-e^{-1}$",
        "$-e$"
      ],
      "correct_answer": "$e$",
      "explanation": "$$f(x) = \\frac{x}{\\ln x}$$\nক্ষুদ্রতম মানের জন্য $f'(x) = 0 \\implies \\frac{\\ln x \\cdot \\frac{d}{dx}(x) - x \\cdot \\frac{d}{dx}(\\ln x)}{(\\ln x)^2} = 0$\n$$\\implies \\frac{\\ln x \\cdot 1 - x \\cdot \\frac{1}{x}}{(\\ln x)^2} = 0$$\n$$\\implies \\frac{\\ln x - 1}{(\\ln x)^2} = 0 \\implies \\ln x - 1 = 0 \\implies \\ln x = 1 \\implies \\ln x = \\ln e \\implies x = e$$",
      "time_limit": 60
    },
    {
      "id": 440,
      "topic": "১২. ফাংশনের চরমমান: লঘুমান, গুরুমান ও ক্রমবর্ধমান/হ্রাসমান",
      "question_text": "৬. $f(x) = 2x^3 - 15x^2 + 36x + 10$ ফাংশনটি কোন ব্যবধিতে হ্রাস পায়? [ব. বো. ২১]",
      "options": [
        "$x > 1$",
        "$x < 2$",
        "$x > 3$",
        "$2 < x < 3$"
      ],
      "correct_answer": "$2 < x < 3$",
      "explanation": "$f(x) = 2x^3 - 15x^2 + 36x + 10$\n$\\therefore f'(x) = 6x^2 - 30x + 36 = 6(x^2 - 5x + 6) = 6(x^2 - 3x - 2x + 6) = 6\\{x(x - 3) - 2(x - 3)\\} = 6(x - 2)(x - 3)$\n$f'(x) = 0$ হলে, $x = 2, 3$\n$f(x)$ ক্রমহ্রাসমান হওয়ার শর্ত: $f'(x) < 0$\n$$\\implies 6(x - 2)(x - 3) < 0 \\implies (x - 2)(x - 3) < 0 \\implies 2 < x < 3$$\nঅর্থাৎ, $2 < x < 3$ ব্যবধিতে ফাংশনটি হ্রাস পায়।",
      "time_limit": 60
    },
    {
      "id": 441,
      "topic": "১২. ফাংশনের চরমমান: লঘুমান, গুরুমান ও ক্রমবর্ধমান/হ্রাসমান",
      "question_text": "৭. $f(x) = -x^2 - 2x + 5$ হলে- [চ. বো. ২১]\ni. $x < -1$ এর জন্য $f(x)$ একটি ক্রমহ্রাসমান ফাংশন\nii. $f(x)$ এর ক্ষুদ্রতম মান $6$\niii. $f''(0) = -2$\nনিচের কোনটি সঠিক?",
      "options": [
        "i ও ii",
        "ii ও iii",
        "i ও iii",
        "i, ii ও iii"
      ],
      "correct_answer": "সঠিক উত্তর নেই",
      "explanation": "$f(x) = -x^2 - 2x + 5$\n$f'(x) = -2x - 2 = -2(x + 1)$\n$f''(x) = -2 < 0$\n(i) ক্রমহ্রাসমান হবার শর্ত:\n$-2(x + 1) < 0 \\implies x + 1 > 0 \\implies x > -1$\nঅর্থাৎ, i. নং সঠিক নয়।\n(ii) যেহেতু, $f''(x) = -2 < 0$\n$\\therefore f(x)$ এর কোনো ক্ষুদ্রতম মান নেই, কেবল বৃহত্তম মান বিদ্যমান।\nঅর্থাৎ, (ii) নং সঠিক নয়।\n(iii) $f''(x) = -2 \\therefore f''(0) = -2$\nঅর্থাৎ, iii. নং সঠিক।",
      "time_limit": 60
    },
    {
      "id": 442,
      "topic": "১২. ফাংশনের চরমমান: লঘুমান, গুরুমান ও ক্রমবর্ধমান/হ্রাসমান",
      "question_text": "উদ্দীপক: $f(x) = x^2 - x$\n৮. ফাংশনটির চরম মান কত? [কু. বো. ২১]",
      "options": [
        "$-\\frac{1}{4}$",
        "$-\\frac{1}{2}$",
        "$0$",
        "$\\frac{1}{2}$"
      ],
      "correct_answer": "$-\\frac{1}{4}$",
      "explanation": "$f'(x) = 2x - 1 = 0 \\implies x = \\frac{1}{2}$\n$\\therefore$ চরমমান $= \\left(\\frac{1}{2}\\right)^2 - \\frac{1}{2} = \\frac{1}{4} - \\frac{1}{2} = -\\frac{1}{4}$",
      "time_limit": 60
    },
    {
      "id": 443,
      "topic": "১২. ফাংশনের চরমমান: লঘুমান, গুরুমান ও ক্রমবর্ধমান/হ্রাসমান",
      "question_text": "৯. $y = 4e^x + e^{-x}$ এর লঘুমান কত? [সি. বো. ১৯]",
      "options": [
        "$-4$",
        "$3$",
        "$4$",
        "$5$"
      ],
      "correct_answer": "$4$",
      "explanation": "$y = 4e^x + e^{-x}$\n$y_1 = 4e^x - e^{-x} = 0 \\implies 4e^x = \\frac{1}{e^x} \\implies (e^x)^2 = \\frac{1}{4} \\implies e^x = \\frac{1}{2}$\n$\\therefore y_2 = 4e^x + e^{-x} \\implies y_2(e^x = \\frac{1}{2}) = 4\\left(\\frac{1}{2}\\right) + \\frac{1}{\\frac{1}{2}} = 4 > 0$\nঅর্থাৎ, $e^x = \\frac{1}{2}$ এর জন্য $y$ লঘুমান বিদ্যমান।\n$\\therefore$ লঘুমান $= y(e^x = \\frac{1}{2}) = 4$",
      "time_limit": 60
    },
    {
      "id": 444,
      "topic": "১২. ফাংশনের চরমমান: লঘুমান, গুরুমান ও ক্রমবর্ধমান/হ্রাসমান",
      "question_text": "১০. $x$ এর কোন মানের জন্য $f(x) = \\frac{1}{3}x^3 - \\frac{5}{2}x^2 + 6x - 1$ এর চরমমান পাওয়া যাবে? [রা. বো. ১৭]",
      "options": [
        "$-2, -3$",
        "$-2, 3$",
        "$2, -3$",
        "$2, 3$"
      ],
      "correct_answer": "$2, 3$",
      "explanation": "$f(x) = \\frac{1}{3}x^3 - \\frac{5}{2}x^2 + 6x - 1 \\therefore f'(x) = x^2 - 5x + 6$\nচরম মানের জন্য, $f'(x) = 0$\n$$\\implies x^2 - 5x + 6 = 0 \\implies x^2 - 3x - 2x + 6 = 0 \\implies x(x - 3) - 2(x - 3) = 0 \\implies (x - 3)(x - 2) = 0 \\therefore x = 3, 2$$",
      "time_limit": 60
    },
    {
      "id": 445,
      "topic": "১২. ফাংশনের চরমমান: লঘুমান, গুরুমান ও ক্রমবর্ধমান/হ্রাসমান",
      "question_text": "১১. $x + \\frac{1}{x}$ এর গুরুমান (maximum value) কোনটি? [JnU, RU'25-26]",
      "options": [
        "$-2$",
        "$-1$",
        "$1$",
        "$2$"
      ],
      "correct_answer": "$-2$",
      "explanation": "$f(x) = x + \\frac{1}{x} \\therefore f'(x) = 1 - \\frac{1}{x^2} ; f''(x) = \\frac{2}{x^3}$\nচরমবিন্দুতে, $f'(x) = 0 \\implies 1 - \\frac{1}{x^2} = 0 \\implies 1 = \\frac{1}{x^2} \\implies x^2 = 1 \\therefore x = \\pm 1$\n$x = 1$ হলে, $f''(1) = \\frac{2}{1^3} = +2 > 0$\n$\\therefore x = 1$ এ লঘুমান উপস্থিত।\n$x = -1$ হলে, $f''(x) = \\frac{2}{(-1)^3} = -2 < 0$\n$\\therefore x = -1$ এ গুরুমান উপস্থিত।\n$\\therefore$ গুরুমান $= f(-1) = -1 + \\frac{1}{-1} = -2$",
      "time_limit": 60
    },
    {
      "id": 446,
      "topic": "১২. ফাংশনের চরমমান: লঘুমান, গুরুমান ও ক্রমবর্ধমান/হ্রাসমান",
      "question_text": "১২. $\\sin x + \\cos x$ ফাংশনটির গুরুমান কত? [RU'15-16]",
      "options": [
        "$\\sqrt{2}$",
        "$1$",
        "$2$",
        "$-1$"
      ],
      "correct_answer": "$\\sqrt{2}$",
      "explanation": "$f(x) = \\sin x + \\cos x$\n$f'(x) = \\cos x - \\sin x = 0$\n$\\tan x = 1 \\implies x = \\frac{\\pi}{4}$\n$f''(x) = -\\sin x - \\cos x$\n$f''\\left(\\frac{\\pi}{4}\\right) = -\\sqrt{2} < 0$\n$\\therefore$ গুরুমান $f\\left(\\frac{\\pi}{4}\\right) = \\sqrt{2}$",
      "time_limit": 60
    },
    {
      "id": 447,
      "topic": "১২. ফাংশনের চরমমান: লঘুমান, গুরুমান ও ক্রমবর্ধমান/হ্রাসমান",
      "question_text": "১৩. $e^x - x$ এর লঘু মান কোনটি? [RU'25-26]",
      "options": [
        "$-1$",
        "$1$",
        "$0$",
        "$2$"
      ],
      "correct_answer": "$1$",
      "explanation": "$f(x) = e^x - x$\n$f'(x) = e^x - 1 = 0 \\implies e^x = 1 = e^0 \\therefore x = 0$\n$f''(x) = e^x = e^0 = 1 > 0$\n$\\therefore$ লঘুমান $f(0) = e^0 - 0 = 1$",
      "time_limit": 60
    },
    {
      "id": 448,
      "topic": "১২. ফাংশনের চরমমান: লঘুমান, গুরুমান ও ক্রমবর্ধমান/হ্রাসমান",
      "question_text": "১৪. $x = 2$ তে $f(x) = ax^2 + bx + c$ এর সর্বোচ্চ মান $20$ এবং $f(-1) = 11$ হলে, $a, b, c$ মান যথাক্রমে- [SUST'25-26]",
      "options": [
        "$-1, 4, 16$",
        "$1, -4, 16$",
        "$-1, 4, 8$",
        "$1, -4, 8$"
      ],
      "correct_answer": "$-1, 4, 16$",
      "explanation": "$f(x) = ax^2 + bx + c \\implies f'(x) = 2ax + b$\nপ্রশ্নমতে, $f(-1) = 11 \\implies a - b + c = 11$\n$f'(2) = 0 \\implies 4a + b = 0$\n$f(2) = 20 \\implies 4a + 2b + c = 20$\n$4a + 2b + c = 20 \\dots (i)$\n$a - b + c = 11 \\dots (ii)$\n$4a + b = 0 \\dots (iii)$\n$\\therefore (a, b, c) \\equiv (-1, 4, 16)$",
      "time_limit": 60
    },
    {
      "id": 449,
      "topic": "১২. ফাংশনের চরমমান: লঘুমান, গুরুমান ও ক্রমবর্ধমান/হ্রাসমান",
      "question_text": "১৫. যদি $x, y > 0$ এবং $x + y = 10$, তাহলে $\\frac{1}{x} + \\frac{1}{y}$ এর সর্বনিম্ন মান কত? [Agri'25-26]",
      "options": [
        "$\\frac{1}{5}$",
        "$\\frac{2}{5}$",
        "$\\frac{4}{5}$",
        "$\\frac{3}{10}$"
      ],
      "correct_answer": "$\\frac{2}{5}$",
      "explanation": "$\\frac{1}{x} + \\frac{1}{y} = \\frac{x+y}{xy} = \\frac{10}{x(10-x)} \\quad [\\because x + y = 10]$\n$= \\frac{10}{10x - x^2}$\n$\\frac{1}{x} + \\frac{1}{y}$ এর মান সর্বনিম্ন হবে যখন $10x - x^2$ এর মান সর্বোচ্চ হবে।\nধরি, $f(x) = 10x - x^2 \\implies f'(x) = 10 - 2x = 0 \\implies 2x = 10 \\implies x = 5$\n$f''(x) = -2 \\implies f''(5) = -2 < 0$\n$\\therefore x = 5$ এ সর্বোচ্চ মান উপস্থিত\n$\\therefore$ সর্বোচ্চ মান $= f(5) = 10 \\cdot 5 - 5^2 = 25$\n$\\therefore \\frac{1}{x} + \\frac{1}{y}$ এর সর্বনিম্ন মান $= \\frac{10}{25} = \\frac{2}{5}$",
      "time_limit": 60
    },
    {
      "id": 450,
      "topic": "১২. ফাংশনের চরমমান: লঘুমান, গুরুমান ও ক্রমবর্ধমান/হ্রাসমান",
      "question_text": "১৬. $x$ এর কোন মানের জন্য $\\sqrt{3}\\sin x + 3\\cos x$ বৃহত্তম হবে? [RU'24-25]",
      "options": [
        "$\\frac{\\pi}{6}$",
        "$-\\frac{\\pi}{6}$",
        "$\\frac{\\pi}{3}$",
        "$-\\frac{\\pi}{3}$"
      ],
      "correct_answer": "$\\frac{\\pi}{6}$",
      "explanation": "ধরি, $f(x) = \\sqrt{3}\\sin x + 3\\cos x$\n$\\therefore f'(x) = \\sqrt{3}\\cos x - 3\\sin x$\n$\\therefore f''(x) = -\\sqrt{3}\\sin x - 3\\cos x$\nএখন, $f'(x) = 0 \\implies \\sqrt{3}\\cos x = 3\\sin x \\implies \\tan x = \\frac{\\sqrt{3}}{3} = \\frac{1}{\\sqrt{3}} \\therefore x = \\frac{\\pi}{6}$\n$\\therefore f''\\left(\\frac{\\pi}{6}\\right) = -2\\sqrt{3} < 0$ [বৃহত্তম মান বিদ্যমান]\nএবং $f''\\left(\\frac{7\\pi}{6}\\right) = 2\\sqrt{3} > 0$ [ক্ষুদ্রতম মান বিদ্যমান]",
      "time_limit": 60
    },
    {
      "id": 451,
      "topic": "১২. ফাংশনের চরমমান: লঘুমান, গুরুমান ও ক্রমবর্ধমান/হ্রাসমান",
      "question_text": "১৭. $x = a$ বিন্দুতে $f(x)$ ফাংশনের গরিষ্ঠ মান থাকলে নিচের কোনটি সঠিক? [JnU'24-25]",
      "options": [
        "$f(x) > 0$",
        "$f'(x) > 0$",
        "$f''(a) > 0$",
        "$f''(a) < 0$"
      ],
      "correct_answer": "$f''(a) < 0$",
      "explanation": "$f(x)$ ফাংশনের $x = a$ বিন্দুতে গরিষ্ঠ (সর্বোচ্চ) মান থাকার জন্য $f'(a) = 0$ এবং $f''(a) < 0$ হতে হয়।",
      "time_limit": 60
    },
    {
      "id": 452,
      "topic": "১২. ফাংশনের চরমমান: লঘুমান, গুরুমান ও ক্রমবর্ধমান/হ্রাসমান",
      "question_text": "১৮. আয়তের পরিসীমা $200\\,\\mathrm{m}$ হলে, এর সর্বোচ্চ ক্ষেত্রফল কত হবে? [KU'24-25]",
      "options": [
        "$2000\\,\\mathrm{m^2}$",
        "$2100\\,\\mathrm{m^2}$",
        "$2500\\,\\mathrm{m^2}$",
        "$2400\\,\\mathrm{m^2}$"
      ],
      "correct_answer": "$2500\\,\\mathrm{m^2}$",
      "explanation": "শর্তানুযায়ী, $2(a + b) = 200 \\implies a + b = 100 \\implies b = 100 - a$\n$\\therefore$ ক্ষেত্রফল, $A = ab = a(100 - a) = 100a - a^2$\n$\\frac{dA}{da} = 100 - 2a = 0 \\implies 2a = 100 \\implies a = 50 \\therefore b = 50$\n$\\therefore$ সর্বোচ্চ ক্ষেত্রফল $= ab = 50 \\times 50 = 2500\\,\\mathrm{m^2}$",
      "time_limit": 60
    },
    {
      "id": 453,
      "topic": "১২. ফাংশনের চরমমান: লঘুমান, গুরুমান ও ক্রমবর্ধমান/হ্রাসমান",
      "question_text": "১৯. $x = a$ বিন্দুতে $f(x)$ ক্রমবর্ধমান হবে যদি [CU'24-25]",
      "options": [
        "$f'(a) = 0$",
        "$f'(a) > 0$",
        "$f''(a) = 0$",
        "$f''(a) < 0$"
      ],
      "correct_answer": "$f'(a) > 0$",
      "explanation": "ক্রমবর্ধমানের ক্ষেত্রে, (প্রথম অন্তরীকরণ $> 0$) হয়। $\\therefore f'(a) > 0$",
      "time_limit": 60
    },
    {
      "id": 454,
      "topic": "১২. ফাংশনের চরমমান: লঘুমান, গুরুমান ও ক্রমবর্ধমান/হ্রাসমান",
      "question_text": "২০. $[-\\pi, 0]$ ব্যবধিতে $y = \\sin 2x + \\cos 2x$ এর গুরুমান হবে- [SUST'24-25]",
      "options": [
        "$\\frac{\\sqrt{3}}{2}$",
        "$\\frac{2}{\\sqrt{3}}$",
        "$\\frac{1}{\\sqrt{2}}$",
        "$\\sqrt{2}$"
      ],
      "correct_answer": "$\\sqrt{2}$",
      "explanation": "$f(x) = \\sin 2x + \\cos 2x$\n$f'(x) = 2\\cos 2x - 2\\sin 2x$\n$f''(x) = -4\\sin 2x - 4\\cos 2x$\n$y_1 = 0$ হলে, $2\\cos 2x - 2\\sin 2x = 0 \\implies \\tan 2x = 1 \\implies 2x = n\\pi + \\frac{\\pi}{4} \\implies x = \\frac{n\\pi}{2} + \\frac{\\pi}{8}$\n$[-\\pi, 0]$ ব্যবধিতে $x = \\frac{-3\\pi}{8}, \\frac{-7\\pi}{8}$\n$f''\\left(\\frac{-3\\pi}{8}\\right) = 4\\sqrt{2} > 0 ; f''\\left(\\frac{-7\\pi}{8}\\right) = -4\\sqrt{2} < 0 \\therefore$ গুরুমান আছে।\n$\\therefore$ গুরুমান $= f\\left(\\frac{-7\\pi}{8}\\right) = \\sqrt{2}$",
      "time_limit": 60
    },
    {
      "id": 455,
      "topic": "১২. ফাংশনের চরমমান: লঘুমান, গুরুমান ও ক্রমবর্ধমান/হ্রাসমান",
      "question_text": "২১. $f(x) = x^3 - 3x^2 + 2$ এর গুরুমান/লঘুমান কোনটি? [HSTU'24-25; Agri'19-20]",
      "options": [
        "$1$",
        "$5$",
        "$10$",
        "কোনোটিই নয়"
      ],
      "correct_answer": "কোনোটিই নয়",
      "explanation": "$f(x) = x^3 - 3x^2 + 2 \\implies f'(x) = 3x^2 - 6x ; f''(x) = 6x - 6$\nচরমবিন্দুতে, $f'(x) = 0 \\implies 3x^2 - 6x = 0 \\implies 3x(x - 2) = 0 \\therefore x = 0, 2$\nএখন, $\\therefore f''(x) = 6x - 6$\n$\\therefore f''(0) = 6 \\times 0 - 6 = -6 < 0$\n$\\therefore f_{Max}(x) = f(0) = 0^3 - 3 \\times 0^2 + 2 = 2$\nএবং, $f''(2) = 6 \\times 2 - 6 = +6 > 0$\n$\\therefore f_{Min}(x) = f(2) = 2^3 - 3 \\times 2^2 + 2 = 8 - 12 + 2 = -2$\n$\\therefore$ চরমমান $+2$, লঘুমান $-2$",
      "time_limit": 60
    },
    {
      "id": 456,
      "topic": "১২. ফাংশনের চরমমান: লঘুমান, গুরুমান ও ক্রমবর্ধমান/হ্রাসমান",
      "question_text": "২২. $x$-এর কোন মানের জন্য $F(x) = \\int_{0}^{x} \\frac{t-4}{t^2-9} dt$ ফাংশনটির মান বৃহত্তম হবে? [GST'23-24; RU'18-19]",
      "options": [
        "$4$",
        "$9$",
        "$3$",
        "$-4$"
      ],
      "correct_answer": "$4$",
      "explanation": "বৃহত্তম ও ক্ষুদ্রতম মানের জন্য, $\\frac{d}{dx}\\{F(x)\\} = 0$\n$$\\implies \\frac{d}{dx} \\int_{0}^{x} \\frac{t-4}{t^2-9} dt = 0$$\n$$\\implies \\frac{x-4}{x^2-9} \\cdot \\frac{d}{dx}(x) - \\frac{0-4}{0-9} \\cdot \\frac{d}{dx}(0) = 0$$\n$$\\implies \\frac{x-4}{x^2-9} = 0 \\implies x - 4 = 0 \\implies x = 4$$",
      "time_limit": 60
    },
    {
      "id": 457,
      "topic": "১২. ফাংশনের চরমমান: লঘুমান, গুরুমান ও ক্রমবর্ধমান/হ্রাসমান",
      "question_text": "২৩. $x$ এর কোন মানের জন্য $y = x \\ln x$ এর লঘুমান নির্ণয় করা যাবে। [GST'22-23]",
      "options": [
        "$e$",
        "$-e$",
        "$\\frac{1}{e}$",
        "$-\\frac{1}{e}$"
      ],
      "correct_answer": "$\\frac{1}{e}$",
      "explanation": "$y = x \\ln x \\implies \\frac{dy}{dx} = \\frac{d}{dx}[x \\ln x] = x \\frac{d(\\ln x)}{dx} + \\ln x \\frac{d}{dx}(x) = x \\times \\frac{1}{x} + \\ln x \\times 1 = 1 + \\ln x$\n$\\implies \\frac{d^2y}{dx^2} = \\frac{d}{dx}[\\ln x + 1] = \\frac{1}{x} + 0 = \\frac{1}{x}$\nগুরুমান ও লঘুমানের জন্য, $\\frac{dy}{dx} = 0 \\implies \\ln x + 1 = 0 \\implies \\ln x = -1 \\therefore x = e^{-1} = \\frac{1}{e}$\nএখন, $\\frac{d^2y}{dx^2}\\Big|_{x = \\frac{1}{e}} = \\frac{1}{\\frac{1}{e}} = e = 2.71828 > 0$\n$\\therefore x = \\frac{1}{e}$ তে $y$ সর্বনিম্ন $\\therefore$ লঘুমানের শর্তে, $x = \\frac{1}{e}$",
      "time_limit": 60
    },
    {
      "id": 458,
      "topic": "১২. ফাংশনের চরমমান: লঘুমান, গুরুমান ও ক্রমবর্ধমান/হ্রাসমান",
      "question_text": "২৪. $f(x) = 3\\sin^2 x + 4\\cos^2 x ; 0 \\le x \\le \\frac{\\pi}{2}$ ফাংশনটির সর্বোচ্চ মান কোনটি? [RU'22-23]",
      "options": [
        "$3$",
        "$6$",
        "$4$",
        "$8$"
      ],
      "correct_answer": "$4$",
      "explanation": "$f(x) = 3\\sin^2 x + 4\\cos^2 x = 3\\sin^2 x + 3\\cos^2 x + \\cos^2 x = 3(\\sin^2 x + \\cos^2 x) + \\cos^2 x \\therefore f(x) = 3 + \\cos^2 x$\nআমরা জানি, $-1 \\le \\cos x \\le 1$ এবং $0 \\le \\cos^2 x \\le 1$\nঅর্থাৎ $\\cos^2 x$ এর সর্বোচ্চ মান $1$। $\\therefore f(x)$ এর সর্বোচ্চ মান, $f_{max} = 3 + 1 = 4$",
      "time_limit": 60
    },
    {
      "id": 459,
      "topic": "১২. ফাংশনের চরমমান: লঘুমান, গুরুমান ও ক্রমবর্ধমান/হ্রাসমান",
      "question_text": "২৫. $4e^x + 9e^{-x}$ এর লঘুমান কত? [RU'22-23]",
      "options": [
        "$12$",
        "$10$",
        "$40$",
        "$1$"
      ],
      "correct_answer": "$12$",
      "explanation": "$y = 4e^x + 9e^{-x} \\implies \\frac{dy}{dx} = 4e^x - 9e^{-x}$\nগুরু/ লঘুমানের জন্য, $\\frac{dy}{dx} = 0 \\implies 4e^x - \\frac{9}{e^x} = 0 \\implies (e^x)^2 = \\frac{9}{4} \\implies e^x = \\pm \\frac{3}{2}$ কিন্তু $e^x \\neq -\\frac{3}{2} \\therefore e^x = \\frac{3}{2}$\n$\\frac{d^2y}{dx^2} = 4e^x + 9e^{-x} \\implies \\frac{d^2y}{dx^2}\\Big|_{e^x = \\frac{3}{2}} = 4 \\times \\frac{3}{2} + 9 \\times \\frac{2}{3} = 6 + 6 = 12 > 0$\nএখন, $e^x = \\frac{3}{2}$ হলে, $y = 4 \\cdot \\frac{3}{2} + 9 \\cdot \\frac{2}{3} = 6 + 6 = 12$",
      "time_limit": 60
    },
    {
      "id": 460,
      "topic": "১২. ফাংশনের চরমমান: লঘুমান, গুরুমান ও ক্রমবর্ধমান/হ্রাসমান",
      "question_text": "২৬. $3x - x^2 - 5$ এর গরিষ্ঠ মান- [JU, CU'22-23]",
      "options": [
        "$\\frac{11}{4}$",
        "$\\frac{11}{2}$",
        "$-\\frac{11}{4}$",
        "$-\\frac{11}{2}$"
      ],
      "correct_answer": "$-\\frac{11}{4}$",
      "explanation": "ধরি, $f(x) = 3x - x^2 - 5 \\therefore f'(x) = 3 - 2x$\nও $f''(x) = -2$, চরমবিন্দুতে $f'(x) = 0 \\implies 3 - 2x = 0 \\therefore x = \\frac{3}{2}$\nএখন, $f''\\left(\\frac{3}{2}\\right) = -2 < 0 \\therefore x = \\frac{3}{2}$ তে $f(x)$ গরিষ্ঠ।\n$\\therefore f(x)$ এর গরিষ্ঠমান $= f\\left(\\frac{3}{2}\\right) = 3 \\times \\frac{3}{2} - \\frac{9}{4} - 5 = \\frac{18 - 9 - 20}{4} = -\\frac{11}{4}$",
      "time_limit": 60
    },
    {
      "id": 461,
      "topic": "১২. ফাংশনের চরমমান: লঘুমান, গুরুমান ও ক্রমবর্ধমান/হ্রাসমান",
      "question_text": "২৭. $y = x^2 - 1$ ফাংশনটির Optimal value কোনটি? [CU'22-23]",
      "options": [
        "$1$",
        "$0$",
        "$-1$",
        "কোনোটিই নয়"
      ],
      "correct_answer": "$-1$",
      "explanation": "ধরি, $y = x^2 - 1 = f(x) \\therefore f'(x) = 2x = 0$ [চরমমান পেতে] $\\implies x = 0 ; f''(x) = 2 > 0$\n$\\therefore$ লঘুমান বিদ্যমান $\\therefore f(0) = 0^2 - 1 = -1$",
      "time_limit": 60
    },
    {
      "id": 462,
      "topic": "১২. ফাংশনের চরমমান: লঘুমান, গুরুমান ও ক্রমবর্ধমান/হ্রাসমান",
      "question_text": "২৮. $k$ এর কোন মানের জন্য $x = 1$ বিন্দুতে $f(x) = x^2 + \\frac{k}{x}$ এর লঘুমান পাওয়া যাবে? [DU'21-22]",
      "options": [
        "$0$",
        "$-1$",
        "$2$",
        "$1$"
      ],
      "correct_answer": "$2$",
      "explanation": "$f(x) = x^2 + \\frac{k}{x} \\implies f'(x) = 2x - \\frac{k}{x^2}$\n$\\therefore f'(1) = 2.1 - \\frac{k}{1^2} = 2 - k \\implies f''(x) = 2 + \\frac{2k}{x^3}$\nচরম মানের জন্য, $f'(1) = 0 \\implies 2 - k = 0 \\therefore k = 2$\nTest: $f''(2) = 2 + \\frac{2 \\cdot 2}{1^3} = 6 > 0 \\therefore k$ এর মান $2$ এর জন্য লঘুমান পাওয়া যাবে।",
      "time_limit": 60
    },
    {
      "id": 463,
      "topic": "১২. ফাংশনের চরমমান: লঘুমান, গুরুমান ও ক্রমবর্ধমান/হ্রাসমান",
      "question_text": "২৯. কোন ব্যবধিতে $f(x) = \\frac{x}{x^2+1}$ ক্রমবর্ধমান? [DU'21-22]",
      "options": [
        "$(-\\infty, 0)$",
        "$(-1, 1)$",
        "$(0, \\infty)$",
        "$(-1, \\infty)$"
      ],
      "correct_answer": "$(-1, 1)$",
      "explanation": "$f'(x) = \\frac{(x^2+1) \\cdot 1 - x \\cdot 2x}{(x^2+1)^2} = \\frac{x^2+1-2x^2}{(x^2+1)^2} = \\frac{1-x^2}{(x^2+1)^2}$\nক্রমবর্ধমান হলে, $f'(x) > 0 \\implies \\frac{1-x^2}{(x^2+1)^2} > 0 \\implies \\frac{x^2-1}{(x^2+1)^2} < 0 \\implies \\frac{(x+1)(x-1)}{(x^2+1)^2} < 0$\n$\\because (x^2+1)^2 > 0 \\implies (x+1)(x-1) < 0 \\therefore -1 < x < 1 \\therefore$ ব্যবধি $(-1, 1)$",
      "time_limit": 60
    },
    {
      "id": 464,
      "topic": "১২. ফাংশনের চরমমান: লঘুমান, গুরুমান ও ক্রমবর্ধমান/হ্রাসমান",
      "question_text": "৩০. $y = x^2(1 - x)$ এর সর্বোচ্চ মান কত? [RU'21-22]",
      "options": [
        "$\\frac{1}{27}$",
        "$\\frac{2}{27}$",
        "$\\frac{4}{27}$",
        "কোনোটিই নয়"
      ],
      "correct_answer": "$\\frac{4}{27}$",
      "explanation": "$y = x^2(1 - x) = x^2 - x^3 \\therefore \\frac{dy}{dx} = 2x - 3x^2 ; \\frac{d^2y}{dx^2} = 2 - 6x$\nসর্বোচ্চ ও সর্বনিম্ন মানের জন্য, $\\frac{dy}{dx} = 0 \\implies 2x - 3x^2 = 0 \\implies x(2 - 3x) = 0 \\therefore x = 0, \\frac{2}{3}$\n$x = 0$ হলে, $\\frac{d^2y}{dx^2} = 2 > 0$ ; সর্বনিম্ন মান পাওয়া যাবে।\n$x = \\frac{2}{3}$ হলে, $\\frac{d^2y}{dx^2} = 2 - 6 \\cdot \\frac{2}{3} = 2 - 4 = -2 < 0 \\therefore$ সর্বোচ্চ মান পাওয়া যাবে।\n$\\therefore$ সর্বোচ্চ মানটি, $y|_{\\frac{2}{3}} = \\left(\\frac{2}{3}\\right)^2 - \\left(\\frac{2}{3}\\right)^3 = \\frac{4}{9} - \\frac{8}{27} = \\frac{12-8}{27} = \\frac{4}{27}$",
      "time_limit": 60
    },
    {
      "id": 465,
      "topic": "১২. ফাংশনের চরমমান: লঘুমান, গুরুমান ও ক্রমবর্ধমান/হ্রাসমান",
      "question_text": "৩১. $y = 2x^2 + 4x + 17$ হলে $y$ এর সর্বনিম্ন মান কোনটি? [CU, Agri'21-22]",
      "options": [
        "$1$",
        "$17$",
        "$23$",
        "$15$"
      ],
      "correct_answer": "$15$",
      "explanation": "$y = 2x^2 + 4x + 17 \\therefore \\frac{dy}{dx} = 4x + 4 ; \\frac{d^2y}{dx^2} = 4$ ; $\\frac{dy}{dx} = 0$ হলে, $4x + 4 = 0 ; x = -1$\nযেহেতু $\\frac{d^2y}{dx^2} > 0$, $x = -1$ এ সর্বনিম্ন মান পাওয়া যাবে।\n$\\therefore$ সর্বনিম্ন মান, $y = 2 \\times (-1)^2 + 4(-1) + 17 = 2 - 4 + 17 = 15$",
      "time_limit": 60
    },
    {
      "id": 466,
      "topic": "১২. ফাংশনের চরমমান: লঘুমান, গুরুমান ও ক্রমবর্ধমান/হ্রাসমান",
      "question_text": "৩২. $y = \\frac{x^3}{3} + x^2 - 8x + 4$ এর সর্বোচ্চ মান কোনটি? [JU'21-22]",
      "options": [
        "$\\frac{92}{3}$",
        "$\\frac{5}{3}$",
        "$\\frac{17}{3}$",
        "$\\frac{82}{5}$"
      ],
      "correct_answer": "$\\frac{92}{3}$",
      "explanation": "$y = \\frac{x^3}{3} + x^2 - 8x + 4 \\implies \\frac{dy}{dx} = \\frac{1}{3} \\times 3x^2 + 2x - 8 = x^2 + 2x - 8$\n$\\therefore x^2 + 2x - 8 = 0 \\therefore x = 2, -4 ; f''(x) = 2x + 2$\nযদি $x = -4, f''(-4) = 2(-4) + 2 = -6 < 0 = f''(2) = 2 \\times 2 + 2 = 6 > 0$\n$\\therefore x = -4$ বিন্দুতে সর্বোচ্চ মান বিদ্যমান।\n$\\therefore$ সর্বোচ্চ মান $= \\frac{(-4)^3}{3} + (-4)^2 - 8(-4) + 4 = \\frac{92}{3}$",
      "time_limit": 60
    },
    {
      "id": 467,
      "topic": "১২. ফাংশনের চরমমান: লঘুমান, গুরুমান ও ক্রমবর্ধমান/হ্রাসমান",
      "question_text": "৩৩. $f(x) = x + \\frac{1}{x}, x > 0$ ফাংশনের চরম বিন্দু কোনটি? [GST'20-21]",
      "options": [
        "$(1, -1)$",
        "$\\left(-1, \\frac{1}{2}\\right)$",
        "$(1, 2)$",
        "$\\left(2, \\frac{3}{2}\\right)$"
      ],
      "correct_answer": "$(1, 2)$",
      "explanation": "$f(x) = x + \\frac{1}{x}, x > 0 \\implies f'(x) = 1 - \\frac{1}{x^2} = 0 \\implies 1 = \\frac{1}{x^2} \\implies x^2 = 1 \\implies x = 1 \\, (x > 0)$\n$\\therefore$ চরম বিন্দুতে $f(x) = 1 + \\frac{1}{1} = 2 \\therefore$ চরম বিন্দু $(1, 2)$।",
      "time_limit": 60
    },
    {
      "id": 468,
      "topic": "১২. ফাংশনের চরমমান: লঘুমান, গুরুমান ও ক্রমবর্ধমান/হ্রাসমান",
      "question_text": "৩৪. $0 \\le x \\le \\frac{\\pi}{2}$ সীমার মধ্যে $y = 1 + 2\\sin x + 2\\cos^2 x$ এর মান $x$ এর কোন মানদ্বয়ের জন্য গরিষ্ঠ বা লঘিষ্ঠ হবে? [RU'19-20]",
      "options": [
        "$\\frac{\\pi}{6}, \\frac{\\pi}{2}$",
        "$\\frac{\\pi}{2}, \\frac{\\pi}{3}$",
        "$\\frac{\\pi}{2}, \\frac{\\pi}{4}$",
        "$0, \\frac{\\pi}{2}$"
      ],
      "correct_answer": "$\\frac{\\pi}{6}, \\frac{\\pi}{2}$",
      "explanation": "$y_1 = 2\\cos x + 4\\cos x(-\\sin x) = 0 \\implies 2\\cos x - 4\\cos x\\sin x = 0 \\implies 2\\cos x(1 - 2\\sin x) = 0$\n$\\implies \\cos x = 0 \\therefore x = \\frac{\\pi}{2}$\nঅথবা, $\\sin x = \\frac{1}{2} \\therefore x = \\frac{\\pi}{6}$",
      "time_limit": 60
    },
    {
      "id": 469,
      "topic": "১২. ফাংশনের চরমমান: লঘুমান, গুরুমান ও ক্রমবর্ধমান/হ্রাসমান",
      "question_text": "৩৫. $f(x) = x + \\frac{1}{x}$ ফাংশনটির চরমমান লঘুমান অপেক্ষা ক্ষুদ্রতর হলে চরমমানটি কত? [KU'19-20; RU'17-18]",
      "options": [
        "$-2$",
        "$-1$",
        "$1$",
        "$2$"
      ],
      "correct_answer": "$-2$",
      "explanation": "$y = x + \\frac{1}{x} \\implies y_1 = 1 - \\frac{1}{x^2} = 0 \\implies x = \\pm 1$\nএখানে, $y_2 = \\frac{2}{x^3} ; x = 1$ হলে, $y_2 = 2 > 0$ ; অর্থাৎ লঘুমান পাবো।\n$x = -1$ হলে $y_2 = -2 < 0$ ; অর্থাৎ গুরুমান পাবো।\n$\\therefore y = -1 + \\frac{1}{(-1)} = -2 \\therefore$ গুরুমান $= -2$",
      "time_limit": 60
    },
    {
      "id": 470,
      "topic": "১২. ফাংশনের চরমমান: লঘুমান, গুরুমান ও ক্রমবর্ধমান/হ্রাসমান",
      "question_text": "৩৬. $y = x^4 - 4x^3 + 4x^2 + 5$ হলে, গরিষ্ঠ মান - [DU'17-18]",
      "options": [
        "$4$",
        "$5$",
        "$6$",
        "$8$"
      ],
      "correct_answer": "$5$",
      "explanation": "$y = x^4 - 4x^3 + 4x^2 + 5$\n$y' = 4x^3 - 12x^2 + 8x = 0 \\implies x(4x^2 - 12x + 8) = 0 \\implies x = 0$ এবং $4x^2 - 12x + 8 = 0 \\implies x^2 - 3x + 2 = 0 \\implies x^2 - (2+1)x + 2 = 0 \\therefore x = 2, 1 ; y'' = 12x^2 - 24x + 8$\n$y''(0) = 8 > 0 ; y''(2) = 8 > 0$\n$y''(1) = -4 < 0$\n$\\therefore x = 0$ এর জন্য লঘিষ্ঠ মান রয়েছে $\\therefore f(0) = 0^4 - 4 \\cdot 0^3 + 4 \\cdot 0^2 + 5 = 5$\nআবার, $x = 2$ এর জন্য ও লঘিষ্ঠ মান রয়েছে $\\therefore f(2) = 2^4 - 4 \\cdot 2^3 + 4 \\cdot 2^2 + 5 = 5$",
      "time_limit": 60
    },
    {
      "id": 471,
      "topic": "১২. ফাংশনের চরমমান: লঘুমান, গুরুমান ও ক্রমবর্ধমান/হ্রাসমান",
      "question_text": "৩৭. $f(x)$ একটি ফাংশন। যদি $x = c$ বিন্দুতে $f'(c) = 0$ এবং $f''(c) > 0$ হয় তবে নিচের কোনটি সত্য? [RU'15-16]",
      "options": [
        "ফাংশনটির আপেক্ষিক লঘুমান আছে",
        "ফাংশনটির আপেক্ষিক গুরুমান আছে",
        "ফাংশনটির নিশ্চল বিন্দু আছে",
        "ফাংশনটির আনতি বিন্দু আছে"
      ],
      "correct_answer": "ফাংশনটির আপেক্ষিক লঘুমান আছে",
      "explanation": "$f'(c) = 0$ এবং $f''(c) > 0$ হলে $x = c$ বিন্দুতে ফাংশনটির আপেক্ষিক লঘুমান (local minimum) থাকে।",
      "time_limit": 60
    },
    {
      "id": 472,
      "topic": "১২. ফাংশনের চরমমান: লঘুমান, গুরুমান ও ক্রমবর্ধমান/হ্রাসমান",
      "question_text": "৩৮. $f(x) = 2x^3 - 21x^2 + 36x$ এর গুরুমান ও লঘুমান যথাক্রমে নিচের কোনটি? [RU'15-16]",
      "options": [
        "$20$ ও $-128$",
        "$-3$ ও $-128$",
        "$17$ ও $-108$",
        "$-30$ ও $-128$"
      ],
      "correct_answer": "$17$ ও $-108$",
      "explanation": "$f(x) = 2x^3 - 21x^2 + 36x \\therefore f'(x) = 6x^2 - 42x + 36 ; f''(x) = 12x - 42$\nচরমমানের বা লঘুমানের জন্য $f'(x) = 0 \\implies 6x^2 - 42x + 36 = 0 \\implies x^2 - 7x + 6 = 0 \\implies x^2 - (6+1)x + 6 = 0$\nসুতরাং, $x = 6$ অথবা, $x = 1$\nএখন, $f''(6) = 30 > 0$ এবং $f''(1) = -30 < 0$\n$\\therefore f(1) = 17$ যা গুরুমান এবং $f(6) = -108$ যা লঘুমান।",
      "time_limit": 60
    },
    {
      "id": 473,
      "topic": "১২. ফাংশনের চরমমান: লঘুমান, গুরুমান ও ক্রমবর্ধমান/হ্রাসমান",
      "question_text": "৩৯. $f(x) = 1 + \\sqrt{\\sin^2 x + 1}$ ফাংশনের সর্বোচ্চ মান হবে- [RU'14-15; CU'07-08]",
      "options": [
        "$2$",
        "$3$",
        "$1$",
        "$2.41$"
      ],
      "correct_answer": "$2.41$",
      "explanation": "$f(x) = 1 + \\sqrt{\\sin^2 x + 1} \\implies f'(x) = \\frac{2\\sin x \\cos x}{2\\sqrt{\\sin^2 x + 1}} = \\frac{\\sin 2x}{2\\sqrt{\\sin^2 x + 1}}$\n$\\implies f''(x) = \\frac{\\sqrt{\\sin^2 x + 1} \\cdot 2\\cos 2x - (\\sin 2x) \\cdot \\frac{2\\sin x \\cos x}{2\\sqrt{\\sin^2 x + 1}}}{2(\\sin^2 x + 1)} = \\frac{2(\\cos 2x)(\\sin^2 x + 1) - \\sin^2 2x}{2(\\sin^2 x + 1)^{\\frac{3}{2}}}$\nএখন, $f'(x) = 0 \\implies \\frac{\\sin 2x}{2\\sqrt{\\sin^2 x + 1}} = 0 \\implies \\sin 2x = 0 \\therefore x = \\frac{\\pi}{2}$ অর্থাৎ $\\cos 2x = \\pm 1$\n$f''(0) = \\frac{4 \\times 1 \\times 1 - 0}{2} = 1$\nআবার, $f''\\left(\\frac{\\pi}{2}\\right) = \\frac{4(-1) \\times 2 - 0}{4\\sqrt{2}} = -2$\n$\\therefore x = \\frac{\\pi}{2}$ এর জন্য সর্বোচ্চ মান বিদ্যমান।\nসর্বোচ্চ মান $= 1 + \\sqrt{1^2 + 1} = 1 + \\sqrt{2} \\approx 2.41$",
      "time_limit": 60
    },
    {
      "id": 474,
      "topic": "১২. ফাংশনের চরমমান: লঘুমান, গুরুমান ও ক্রমবর্ধমান/হ্রাসমান",
      "question_text": "৪০. $f(x)$ ফাংশনের $x = c$ বিন্দুতে $f(x)$ এর গরিষ্ঠ মান হলে, নিম্নের কোন শর্তটি সঠিক? [CU'14-15]",
      "options": [
        "$f(c) < f(c + h)$",
        "$f(c) + f(c + h) > 0$",
        "$f(c) - f(c + h) > 0$",
        "$f(c) - f(c + h) < 0$"
      ],
      "correct_answer": "$f(c) - f(c + h) > 0$",
      "explanation": "$f(c) > f(c + h) \\implies f(c) - f(c + h) > 0$",
      "time_limit": 60
    },
    {
      "id": 475,
      "topic": "১২. ফাংশনের চরমমান: লঘুমান, গুরুমান ও ক্রমবর্ধমান/হ্রাসমান",
      "question_text": "৪১. $x + \\frac{1}{x}$ এর লঘুমান ও গুরুমান নিম্নের কোন সম্পর্কটিকে সিদ্ধ করে? [CU'14-15]",
      "options": [
        "লঘুমান $=$ গুরুমান",
        "গুরুমান $>$ লঘুমান",
        "গুরুমান $<$ লঘুমান",
        "কোনটিই নয়"
      ],
      "correct_answer": "গুরুমান $<$ লঘুমান",
      "explanation": "$y = x + \\frac{1}{x} \\therefore y_1 = 1 - \\frac{1}{x^2} ; y_2 = \\frac{2}{x^3}$\nএখন, $y_1 = 0 \\implies 1 - \\frac{1}{x^2} = 0 \\implies x^2 = 1 \\implies x = \\pm 1$\n$x = 1$ হলে, $y_2 = \\frac{2}{1^3} = 2 > 0 \\therefore x = 1$ এ $y$ এর লঘুমান বিদ্যমান।\n$y$ এর লঘুমান $= 1 + \\frac{1}{1} = 2$\n$x = -1$ হলে, $y_2 = \\frac{2}{(-1)^3} = -2 < 0 \\therefore x = -1$ এ $y$ এর গুরুমান বিদ্যমান।\n$y$ এর গুরুমান $= -1 + \\frac{1}{-1} = -2$",
      "time_limit": 60
    },
    {
      "id": 476,
      "topic": "১২. ফাংশনের চরমমান: লঘুমান, গুরুমান ও ক্রমবর্ধমান/হ্রাসমান",
      "question_text": "৪২. $x(12 - 2x)^2$-এর বৃহত্তম মান কত হবে? [JnU'14-15, 09-10; RU'12-13, 08-09]",
      "options": [
        "$120$",
        "$128$",
        "$228$",
        "$-128$"
      ],
      "correct_answer": "$128$",
      "explanation": "$f(x) = x(12 - 2x)^2, f'(x) = 144 - 96x + 12x^2$\n$12x^2 - 96x + 144 = 0$ বা, $x^2 - 8x + 12 = 0$ বা, $x = 6, 2$\n$f''(x) = -96 + 24x, x = 2$ এর জন্য $f'' < 0 \\therefore f(2) = 128$",
      "time_limit": 60
    },
    {
      "id": 477,
      "topic": "১২. ফাংশনের চরমমান: লঘুমান, গুরুমান ও ক্রমবর্ধমান/হ্রাসমান",
      "question_text": "৪৩. $x = 2$ তে $f(x) = ax^2 + bx + c$ এর সর্বোচ্চ মান $20$ এবং $f(-1) = 11$ হলে, $a, b, c$ মান যথাক্রমে- [SUST'25-26]",
      "options": [
        "$-1, 4, 16$",
        "$1, -4, 16$",
        "$-1, 4, 8$",
        "$1, -4, 8$"
      ],
      "correct_answer": "$-1, 4, 16$",
      "explanation": "$f(x) = ax^2 + bx + c \\implies f'(x) = 2ax + b$\nপ্রশ্নমতে, $f(-1) = 11 \\implies a - b + c = 11$\n$f'(2) = 0 \\implies 4a + b = 0$ ; $f''(2) < 0$\n$f(2) = 20 \\implies 4a + 2b + c = 20$\nUsing Calculator: $\\begin{bmatrix} a \\\\ b \\\\ c \\end{bmatrix} = \\begin{bmatrix} -1 \\\\ 4 \\\\ 16 \\end{bmatrix}$",
      "time_limit": 60
    },
    {
      "id": 478,
      "topic": "১২. ফাংশনের চরমমান: লঘুমান, গুরুমান ও ক্রমবর্ধমান/হ্রাসমান",
      "question_text": "৪৪. $f(x) = \\frac{x}{x^2+k}$ হলে $k$ এর কোন মানের জন্য $x = 3$ বিন্দুতে চরম মান পাওয়া যাবে? [BUET'24-25, 23-24]",
      "options": [
        "$3$",
        "$18$",
        "$1$",
        "$9$"
      ],
      "correct_answer": "$9$",
      "explanation": "$f(x) = \\frac{x}{x^2+k} \\therefore f'(x) = \\frac{(x^2+k) \\cdot 1 - x(2x+0)}{(x^2+k)^2}$\nচরম মানের জন্য, $f'(x) = 0 \\implies \\frac{(x^2+k) - 2x^2}{(x^2+k)^2} = 0 \\implies k = x^2 ; x = 3$ হলে, $k = 9$",
      "time_limit": 60
    },
    {
      "id": 479,
      "topic": "১২. ফাংশনের চরমমান: লঘুমান, গুরুমান ও ক্রমবর্ধমান/হ্রাসমান",
      "question_text": "৪৫. $y = x(3 - x^2) + C$ এর লঘিষ্ঠ মান $3$ হলে $C$ এর মান কত? এ ছাড়াও $x$ এর যে মানের জন্য $y$ লঘিষ্ঠ হয়, তার মানও বের কর? [KUET'24-25]",
      "options": [
        "$5 \\text{ and } -1$",
        "$1 \\text{ and } 1$",
        "$5 \\text{ and } 1$",
        "$1 \\text{ and } -1$"
      ],
      "correct_answer": "$5 \\text{ and } -1$",
      "explanation": "$y$ এর লঘিষ্ঠ মানের জন্য, $\\frac{dy}{dx} = 3 - 3x^2 = 0 \\implies 3x^2 = 3 ; x = \\pm 1$\nআবার, $\\frac{d^2y}{dx^2} = -6x$\n$x = -1$ হলে, $\\frac{d^2y}{dx^2} = 6$ যা $6 > 0$\nসুতরাং, $x = -1$ হলে লঘিষ্ঠ মান বিদ্যমান।\n$\\therefore y = -1(3 - (-1)^2) + C = -2 + C$\n$\\therefore -2 + C = 3 \\implies C = 5$",
      "time_limit": 60
    },
    {
      "id": 480,
      "topic": "১২. ফাংশনের চরমমান: লঘুমান, গুরুমান ও ক্রমবর্ধমান/হ্রাসমান",
      "question_text": "৪৬. $f(x) = xe^{-kx}, k > 0$ এর সর্বোচ্চ মান কত? [RUET'24-25]",
      "options": [
        "$\\frac{1}{ek}$",
        "$\\frac{1}{e}$",
        "$ek$",
        "$\\frac{k}{e}$",
        "$\\frac{1}{e^k}$"
      ],
      "correct_answer": "$\\frac{1}{ek}$",
      "explanation": "$f(x) = xe^{-kx} \\implies f'(x) = e^{-kx} + (-k)xe^{-kx} = 0 \\implies \\frac{1}{e^{kx}} = \\frac{kx}{e^{kx}} \\implies e^{kx} = e^{kx}(1 - kx) = 0$\nকিন্তু, $e^{kx} \\neq 0 \\therefore kx = 1 \\implies x = \\frac{1}{k}$\nআবার, $f''(x) = -ke^{-kx} - ke^{-kx} + k^2xe^{-kx} \\implies f''\\left(\\frac{1}{k}\\right) = -ke^{-1} - ke^{-1} + ke^{-1} = \\frac{-k}{e} < 0$\nঅর্থাৎ সর্বোচ্চ মান $= f\\left(\\frac{1}{k}\\right) = \\frac{1}{k}e^{-1} = \\frac{1}{ek}$",
      "time_limit": 60
    },
    {
      "id": 481,
      "topic": "১২. ফাংশনের চরমমান: লঘুমান, গুরুমান ও ক্রমবর্ধমান/হ্রাসমান",
      "question_text": "৪৭. $[-\\pi, 0]$ ব্যবধিতে $y = \\sin 2x + \\cos 2x$ এর গুরুমান কত হবে? [SUST'24-25]",
      "options": [
        "$\\frac{\\sqrt{3}}{2}$",
        "$\\frac{2}{\\sqrt{3}}$",
        "$\\frac{1}{\\sqrt{2}}$",
        "$\\sqrt{2}$"
      ],
      "correct_answer": "$\\sqrt{2}$",
      "explanation": "$f(x) = \\sin 2x + \\cos 2x$\n$f'(x) = 2\\cos 2x - 2\\sin 2x$\n$f''(x) = -4\\sin 2x - 4\\cos 2x$\n$f'(x) = 0$ হলে, $2\\cos 2x - 2\\sin 2x = 0 \\implies \\tan 2x = 1 \\implies 2x = n\\pi + \\frac{\\pi}{4} \\implies x = \\frac{n\\pi}{2} + \\frac{\\pi}{8}$\n$[-\\pi, 0]$ ব্যবধিতে $x = \\frac{-3\\pi}{8}, \\frac{-7\\pi}{8}$\n$f''\\left(\\frac{-3\\pi}{8}\\right) = 4\\sqrt{2} > 0$ (লঘুমান)\n$f''\\left(\\frac{-7\\pi}{8}\\right) = -4\\sqrt{2} < 0$ (গুরুমান)\n$\\therefore$ গুরুমান $= f\\left(-\\frac{7\\pi}{8}\\right) = \\sqrt{2}$",
      "time_limit": 60
    },
    {
      "id": 482,
      "topic": "১২. ফাংশনের চরমমান: লঘুমান, গুরুমান ও ক্রমবর্ধমান/হ্রাসমান",
      "question_text": "৪৮. $f(x) = 1 - x + \\frac{1}{2-x}$ এর সর্বোচ্চ ও সর্বনিম্ন মান কত? [CKRUET'23-24]",
      "options": [
        "$1, -3$",
        "$-1, -3$",
        "$-3, 1$",
        "$1, 3$",
        "$-\\frac{1}{2}, -3$"
      ],
      "correct_answer": "$-3, 1$",
      "explanation": "$f(x) = 1 - x + \\frac{1}{2-x}$\n$f'(x) = -1 - \\frac{1}{(2-x)^2}(-1) = -1 + \\frac{1}{(2-x)^2}$\n$f''(x) = -\\frac{2}{(2-x)^3}(-1) = \\frac{2}{(2-x)^3}$\nসর্বোচ্চ ও সর্বনিম্ন মানের জন্য, $f'(x) = 0$\n$\\implies -1 + \\frac{1}{(2-x)^2} = 0 \\implies \\frac{1}{(2-x)^2} = 1 \\implies (2-x)^2 = 1 \\implies (x-2)^2 = 1 \\implies x - 2 = \\pm 1 \\implies x = 2 \\pm 1 \\therefore x = 3, 1$\n$x = 3$ হলে, $f''(3) = \\frac{2}{(2-3)^3} = -2 < 0 \\therefore x = 3$ এর জন্য সর্বোচ্চ মান থাকবে।\n$\\therefore$ সর্বোচ্চ মানটি, $f(3) = 1 - 3 + \\frac{1}{2-3} = -3$\n$x = 1$ হলে, $f''(1) = \\frac{2}{(2-1)^3} = 2 > 0$\n$\\therefore x = 1$ এর জন্য সর্বনিম্ন মান থাকবে।\nসর্বনিম্ন মানটি, $f(1) = 1 - 1 + \\frac{1}{2-1} = 1$\nসুতরাং, সর্বোচ্চ ও সর্বনিম্ন মান যথাক্রমে $-3$ ও $1$।",
      "time_limit": 60
    },
    {
      "id": 483,
      "topic": "১২. ফাংশনের চরমমান: লঘুমান, গুরুমান ও ক্রমবর্ধমান/হ্রাসমান",
      "question_text": "৪৯. If $p$ and $q$ ($q \\neq 0$) are the roots of the equation $x^2 + px + q = 0$, then find the least value of $x^2 + px + q$ where $x \\in \\mathbb{R}$? [যদি $p$ এবং $q$ ($q \\neq 0$) সমীকরণ $x^2 + px + q = 0$ এর মূল হয়, তবে $x^2 + px + q$ এর সর্বনিম্ন মান নির্ণয় করো যেখানে $x \\in \\mathbb{R}$?] [IUT'22-23]",
      "options": [
        "$-\\frac{3}{4}$",
        "$-\\frac{9}{4}$",
        "$\\frac{9}{4}$",
        "$\\frac{3}{4}$"
      ],
      "correct_answer": "$-\\frac{9}{4}$",
      "explanation": "Roots $p, q$\n$p + q = -p \\text{ and } pq = q \\implies p = 1 \\quad [\\because q \\neq 0]$\n$\\therefore 1 + q = -1 \\therefore q = -2$\n$f(x) = x^2 + px + q = x^2 + x - 2 \\implies f'(x) = 2x + 1$\nIf $f'(x) = 0$ then, $x = -\\frac{1}{2}$\n$\\therefore$ Least value $= f\\left(-\\frac{1}{2}\\right) = \\left(-\\frac{1}{2}\\right)^2 - \\frac{1}{2} - 2 = -\\frac{9}{4}$",
      "time_limit": 60
    },
    {
      "id": 484,
      "topic": "১২. ফাংশনের চরমমান: লঘুমান, গুরুমান ও ক্রমবর্ধমান/হ্রাসমান",
      "question_text": "৫০. $0 \\le x \\le \\frac{\\pi}{2}$ ব্যবধিতে $2\\sin x + \\cos 2x$ ফাংশনের সর্বোচ্চ ও সর্বনিম্ন মানের জন্য নিচের কোন উত্তরটি সঠিক? [CKRUET'22-23]",
      "options": [
        "At $x = \\frac{\\pi}{6}$, there is a minimum which is $\\frac{3}{2}$",
        "At $x = \\frac{\\pi}{6}$, there is a maximum which is $\\frac{3}{2}$",
        "At $x = \\frac{\\pi}{3}$, there is a maximum which is $\\frac{1+\\sqrt{3}}{2}$",
        "At $x = \\frac{\\pi}{3}$, there is a minimum which is $3$",
        "At $x = \\frac{\\pi}{6}$, there is a minimum which is $\\frac{1}{2}$"
      ],
      "correct_answer": "At $x = \\frac{\\pi}{6}$, there is a maximum which is $\\frac{3}{2}$",
      "explanation": "$f(x) = 2\\sin x + \\cos 2x$\n$\\therefore f'(x) = 2\\cos x - 2\\sin 2x$\n$\\implies f''(x) = -2\\sin x - 4\\cos 2x$\nএখন, চরম বিন্দুর জন্য,\n$f'(x) = 2\\cos x - 2\\sin 2x = 0 \\implies 2\\cos x - 4\\sin x\\cos x = 0 \\implies 2\\cos x(1 - 2\\sin x) = 0 \\therefore \\cos x = 0$\n$\\therefore x = \\frac{\\pi}{2}, \\frac{3\\pi}{2}$ এবং $1 - 2\\sin x = 0 \\implies \\sin x = \\frac{1}{2} \\therefore x = \\frac{\\pi}{6}$\n$\\therefore f''\\left(\\frac{\\pi}{6}\\right) = -3 < 0 \\therefore$ সর্বোচ্চ মান $f\\left(\\frac{\\pi}{6}\\right) = \\frac{3}{2}$",
      "time_limit": 60
    },
    {
      "id": 485,
      "topic": "১২. ফাংশনের চরমমান: লঘুমান, গুরুমান ও ক্রমবর্ধমান/হ্রাসমান",
      "question_text": "৫১. $x + \\frac{1}{x}$ এর গুরুমান ও লঘুমান নির্ণয় কর। [CKRUET'21-22]",
      "options": [
        "$-2, -1$",
        "$-2, 3$",
        "$-2, 2$",
        "$-3, 3$",
        "$-4, 4$"
      ],
      "correct_answer": "$-2, 2$",
      "explanation": "$f(x) = x + \\frac{1}{x} \\implies f'(x) = 1 - \\frac{1}{x^2}$\n$\\therefore f'(x) = 1 - \\frac{1}{x^2} = 0 \\implies \\frac{1}{x^2} = 1 \\implies x^2 = 1 \\implies x = \\pm 1$\n$\\therefore f''(x) = (-1) \\cdot (-2) \\cdot x^{-3} = \\frac{2}{x^3}$\n$\\therefore f''(1) = 2 > 0$ যা লঘুমান নির্দেশ করে\n$\\therefore f''(-1) = -2 < 0$ যা গুরুমান নির্দেশ করে\n$\\therefore f(1) = 1 + 1 = 2$ যা লঘুমান।\n$\\therefore f(-1) = -1 - 1 = -2$ যা গুরুমান।\n$\\therefore -2, 2$ যথাক্রমে গুরুমান ও লঘুমান নির্দেশ করে।",
      "time_limit": 60
    },
    {
      "id": 486,
      "topic": "১২. ফাংশনের চরমমান: লঘুমান, গুরুমান ও ক্রমবর্ধমান/হ্রাসমান",
      "question_text": "৫২. If $\\tan x = n \\tan y$, $n \\in \\mathbb{R}^{+}$, then the maximum value of $\\sec^2(x - y)$ is equal to- [যদি $\\tan x = n \\tan y$, যেখানে $n \\in \\mathbb{R}^{+}$, তবে $\\sec^2(x - y)$ এর সর্বোচ্চ মান কত-] [IUT'20-21]",
      "options": [
        "$\\frac{(n+1)^2}{2n}$",
        "$\\frac{(n+1)^2}{n}$",
        "$\\frac{(n+1)^2}{2}$",
        "$\\frac{(n+1)^2}{4n}$"
      ],
      "correct_answer": "$\\frac{(n+1)^2}{4n}$",
      "explanation": "$\\sec^2(x - y) = \\tan^2(x - y) + 1 = \\left(\\frac{\\tan x - \\tan y}{1 + \\tan x \\tan y}\\right)^2 + 1 = \\left(\\frac{n\\tan y - \\tan y}{1 + n\\tan^2 y}\\right)^2 + 1 = \\left(\\frac{(n-1)\\tan y}{1 + n\\tan^2 y}\\right)^2 + 1$\n$= \\left(\\frac{(n-1)\\tan y}{(\\sqrt{1} - \\sqrt{n}\\tan y)^2 + 2\\sqrt{n}\\tan y}\\right)^2 + 1 \\le \\left(\\frac{(n-1)\\tan y}{2\\sqrt{n}\\tan y}\\right)^2 + 1 = \\frac{(n-1)^2}{4n} + 1 = \\frac{(n-1)^2+4n}{4n} = \\frac{(n+1)^2}{4n}$\n$\\therefore$ Maximum value of $\\sec^2(x - y) = \\frac{(n+1)^2}{4n}$",
      "time_limit": 60
    },
    {
      "id": 487,
      "topic": "১২. ফাংশনের চরমমান: লঘুমান, গুরুমান ও ক্রমবর্ধমান/হ্রাসমান",
      "question_text": "৫৩. At $x = 0$, the function $f(x) = e^{-x^2}$ is: [IUT'19-20]",
      "options": [
        "minimum",
        "maximum",
        "increasing",
        "decreasing"
      ],
      "correct_answer": "maximum",
      "explanation": "$f(x) = e^{-x^2} ; f'(x) = -2xe^{-x^2} ;$\n$f''(x) = -2[x \\cdot (-2x)e^{-x^2} + e^{-x^2} \\cdot 1]$\nAt $x = 0, f'(0) = 0 ; f''(0) = -2[0 + e^{-0}] = -2 < 0 \\therefore f(x)$ is maximum at $x = 0$",
      "time_limit": 60
    },
    {
      "id": 488,
      "topic": "১২. ফাংশনের চরমমান: লঘুমান, গুরুমান ও ক্রমবর্ধমান/হ্রাসমান",
      "question_text": "৫৪. $u = \\frac{36}{x} + \\frac{1}{(2-x)^2}$ এর সর্বোচ্চ মান কোনটি? [KUET'18-19]",
      "options": [
        "$10$",
        "$15$",
        "$8$",
        "$12$",
        "$20$"
      ],
      "correct_answer": "$8$",
      "explanation": "$\\frac{du}{dx} = -\\frac{36}{x^2} + \\frac{2}{(2-x)^3}$\n$\\frac{d^2u}{dx^2} = \\frac{72}{x^3} + \\frac{6}{(2-x)^4} ; x = -1$ এর জন্য $\\frac{d^2u}{dx^2} < 0$\n$\\therefore x = -1$ হলে, $u = 8$",
      "time_limit": 60
    },
    {
      "id": 489,
      "topic": "১২. ফাংশনের চরমমান: লঘুমান, গুরুমান ও ক্রমবর্ধমান/হ্রাসমান",
      "question_text": "৫৫. $y = 2\\left(x + \\frac{1}{x}\\right)$ এর সর্বোচ্চ মান হলো- [KUET'17-18]",
      "options": [
        "$\\infty$",
        "$0$",
        "$2$",
        "$-2$",
        "$-4$"
      ],
      "correct_answer": "$-4$",
      "explanation": "$y = 2x + \\frac{2}{x}$\n$y' = 2 - \\frac{2}{x^2} \\implies y' = 0 \\implies 2\\left(1 - \\frac{1}{x^2}\\right) = 0 \\implies x^2 - 1 = 0 \\therefore x = \\pm 1 \\therefore y'' = \\frac{4}{x^3}$\n$x = 1$ হলে, $y''(1) = 4 > 0$\n$x = -1$ হলে, $y''(-1) = -4 < 0$\n$\\therefore$ সর্বোচ্চ মান $y(-1) = 2(-1 - 1) = -4$",
      "time_limit": 60
    },
    {
      "id": 490,
      "topic": "১২. ফাংশনের চরমমান: লঘুমান, গুরুমান ও ক্রমবর্ধমান/হ্রাসমান",
      "question_text": "৫৬. $\\sin x = \\frac{1}{4}$ এর জন্য $y = \\sin x + \\cos 2x$ ফাংশনটির গুরুমান কোনটি? [KUET'16-17]",
      "options": [
        "$-2$",
        "$0$",
        "$1$",
        "$\\frac{9}{8}$",
        "$\\frac{11}{8}$"
      ],
      "correct_answer": "$\\frac{9}{8}$",
      "explanation": "$y = \\sin x + \\cos 2x = \\sin x + 1 - 2\\sin^2 x = \\frac{1}{4} + 1 - 2\\left(\\frac{1}{4}\\right)^2 = \\frac{9}{8}$",
      "time_limit": 60
    },
    {
      "id": 491,
      "topic": "১২. ফাংশনের চরমমান: লঘুমান, গুরুমান ও ক্রমবর্ধমান/হ্রাসমান",
      "question_text": "৫৭. $f(x) = x^2 - 2x + 5$ এর নূন্যতম মান- [BUTEX'14-15]",
      "options": [
        "$1$",
        "$2$",
        "$3$",
        "$4$"
      ],
      "correct_answer": "$4$",
      "explanation": "$f(x) = x^2 - 2x + 5 \\implies f'(x) = 2x - 2 ; f''(x) = 2 > 0 \\implies$ নূন্যতম মান বিদ্যমান।\n$\\therefore 2x - 2 = 0 \\implies x = 1 \\implies f(1) = 4$",
      "time_limit": 60
    },
    {
      "id": 492,
      "topic": "১২. ফাংশনের চরমমান: লঘুমান, গুরুমান ও ক্রমবর্ধমান/হ্রাসমান",
      "question_text": "৫৮. Let $g$ be a function whose derivative $g'$ and is shown in the graph below. For what value of $x$, the value of $g$ is maximum? [ধরা যাক $g$ একটি ফাংশন যার ডেরিভেটিভ $g'$ নিচে গ্রাফে দেখানো হয়েছে। $x$ এর কোন মানের জন্য $g$ এর মান সর্বোচ্চ হবে?] [IUT'14-15]\n[চিত্রের বর্ণনা: $y = g'(x)$ এর গ্রাফে রেখাটি $(0, 1)$ থেকে $(2, 0)$ বিন্দুতে $x$ অক্ষ ছেদ করে নিচে নেমেছে এবং $(4, 0)$ বিন্দুতে আবার উপরে উঠেছে।]",
      "options": [
        "$2$",
        "$3$",
        "$4$",
        "$5$"
      ],
      "correct_answer": "$2$",
      "explanation": "$x = 2$ বিন্দুতে $g'(x) = 0$ এবং এর আগে $g'(x) > 0$ ও পরে $g'(x) < 0$। ফলে ডেরিভেটিভ ধনাত্মক থেকে ঋণাত্মক হওয়ায় $x = 2$ তে $g$ এর মান সর্বোচ্চ (maximum)।",
      "time_limit": 60
    },
    {
      "id": 493,
      "topic": "১২. ফাংশনের চরমমান: লঘুমান, গুরুমান ও ক্রমবর্ধমান/হ্রাসমান",
      "question_text": "৫৯. $x$ এর মান কত হলে $F(x) = \\int_{0}^{x} t(t-4) dt$ ফাংশনটির মান বৃহত্তম হবে? [BUET'13-14]",
      "options": [
        "$3$",
        "$4$",
        "$5$",
        "$25$"
      ],
      "correct_answer": "$4$",
      "explanation": "$F'(x) = 0 \\implies x(x - 4) = 0 \\therefore x = 4$",
      "time_limit": 60
    },
    {
      "id": 494,
      "topic": "১২. ফাংশনের চরমমান: লঘুমান, গুরুমান ও ক্রমবর্ধমান/হ্রাসমান",
      "question_text": "৬০. $\\sin \\theta$ এর যে মানের জন্য $7\\sec \\theta - 3\\tan \\theta$ এর মান নূন্যতম হয় তা কত হবে? [BUET'13-14]",
      "options": [
        "$\\frac{3}{7}$",
        "$\\frac{7}{10}$",
        "$\\frac{3}{10}$",
        "$\\frac{3}{8}$"
      ],
      "correct_answer": "$\\frac{3}{7}$",
      "explanation": "$y = 7\\sec \\theta - 3\\tan \\theta$\n$y_1 = 7\\sec \\theta \\tan \\theta - 3\\sec^2 \\theta = 0$\n$\\therefore 7\\tan \\theta = 3\\sec \\theta \\therefore \\tan \\theta \\times \\cos \\theta = \\frac{3}{7} \\therefore \\sin \\theta = \\frac{3}{7}$",
      "time_limit": 60
    },
    {
      "id": 495,
      "topic": "১২. ফাংশনের চরমমান: লঘুমান, গুরুমান ও ক্রমবর্ধমান/হ্রাসমান",
      "question_text": "৬১. $f(x) = x(2a - x)$ এর সর্বোচ্চ মান- [RUET'13-14]",
      "options": [
        "$a$",
        "$2a$",
        "$2a^2$",
        "$a^2$",
        "None"
      ],
      "correct_answer": "$a^2$",
      "explanation": "$f(x) = x(2a - x) = 2ax - x^2$\n$\\therefore f'(x) = 2a - 2x ; f''(x) = 0$ হলে, $x = a$\n$f''(x) = -2 < 0 \\therefore x = a$ এর জন্য সর্বোচ্চ মান এবং সেক্ষেত্রে $f(a) = a(2a - a) = a^2$",
      "time_limit": 60
    },
    {
      "id": 496,
      "topic": "১২. ফাংশনের চরমমান: লঘুমান, গুরুমান ও ক্রমবর্ধমান/হ্রাসমান",
      "question_text": "৬২. $x$ এর মান কত হলে ফাংশন $f(x) = \\frac{x}{\\ln x}$ এর মান ক্ষুদ্রতম হবে? [BUET'12-13; KUET'16-17]",
      "options": [
        "$-e$",
        "$e$",
        "$\\frac{1}{e}$",
        "$-e^{-1}$",
        "$-2e$"
      ],
      "correct_answer": "$e$",
      "explanation": "$f(x) = \\frac{x}{\\ln x} ; f'(x) = \\frac{\\ln x \\cdot 1 - x \\cdot \\frac{1}{x}}{(\\ln x)^2} = \\frac{\\ln x - 1}{(\\ln x)^2}$\n$f''(x) = \\frac{(\\ln x)^2 \\left(\\frac{1}{x}\\right) - (\\ln x - 1)\\left(2\\ln x \\cdot \\frac{1}{x}\\right)}{(\\ln x)^4}$\nবৃহত্তম ও ক্ষুদ্রতম মানের জন্য $f'(x) = 0$\n$\\frac{\\ln x - 1}{(\\ln x)^2} = 0 \\implies \\ln x - 1 = 0 \\implies \\ln x = 1 = \\ln e \\implies x = e$\n$f''(x)$ এ $x = e$ হলে, $f''(e) = \\frac{\\frac{1}{e}(1)^2 - (1 - 1)\\left(2 \\cdot \\frac{1}{e}\\right)}{1} = \\frac{1}{e} > 0$\n$\\therefore x = e$ হলে ক্ষুদ্রতম হবে।",
      "time_limit": 60
    },
    {
      "id": 497,
      "topic": "১২. ফাংশনের চরমমান: লঘুমান, গুরুমান ও ক্রমবর্ধমান/হ্রাসমান",
      "question_text": "৬৩. $y = x^2(1 - x)$ এর সর্বোচ্চ মান- [RUET'12-13]",
      "options": [
        "$\\frac{1}{27}$",
        "$\\frac{4}{27}$",
        "$\\frac{2}{27}$",
        "$\\frac{1}{9}$",
        "None"
      ],
      "correct_answer": "$\\frac{4}{27}$",
      "explanation": "$y = x^2(1 - x) \\implies y = x^2 - x^3 \\therefore \\frac{dy}{dx} = y_1 = 2x - 3x^2$\nএখন, $2x - 3x^2 = 0 \\implies x(2 - 3x) = 0 \\therefore x = 0, \\frac{2}{3}$\n$y_2 = 2 - 6x ; x = \\frac{2}{3}$ এর জন্য, $y_2 < 0$;\nসর্বোচ্চ মান, $y = \\left(\\frac{2}{3}\\right)^2 \\left(1 - \\frac{2}{3}\\right) = \\frac{4}{27}$",
      "time_limit": 60
    },
    {
      "id": 498,
      "topic": "১২. ফাংশনের চরমমান: লঘুমান, গুরুমান ও ক্রমবর্ধমান/হ্রাসমান",
      "question_text": "৬৪. $f(x) = x + \\sin x$ হলে $x$ এর কোন মানের জন্য $f'(x) = 0$ হবে- [BUTEX'12-13]",
      "options": [
        "$\\frac{\\pi}{2}$",
        "$\\pi$",
        "$\\frac{\\pi}{4}$",
        "$\\frac{\\pi}{6}$"
      ],
      "correct_answer": "$\\pi$",
      "explanation": "$f(x) = x + \\sin x \\implies f'(x) = 1 + \\cos x$\n$f'(x) = 0$ হলে $1 + \\cos x = 0 \\implies \\cos x = -1 = \\cos \\pi \\implies x = \\pi$",
      "time_limit": 60
    },
    {
      "id": 499,
      "topic": "১২. ফাংশনের চরমমান: লঘুমান, গুরুমান ও ক্রমবর্ধমান/হ্রাসমান",
      "question_text": "৬৫. দেওয়া আছে, $F(x) = \\int_{0}^{x} \\frac{t-3}{t^2+7} dt$; $x$-এর মান কত হলে, $F(x)$ ন্যূনতম হবে? [BUET'11-12]",
      "options": [
        "$3$",
        "$0$",
        "$\\sqrt{7}$",
        "$-\\sqrt{7}$"
      ],
      "correct_answer": "$3$",
      "explanation": "$F'(x) = 0 \\implies \\frac{x-3}{x^2+7} = 0 \\therefore x = 3$",
      "time_limit": 60
    },
    {
      "id": 500,
      "topic": "১২. ফাংশনের চরমমান: লঘুমান, গুরুমান ও ক্রমবর্ধমান/হ্রাসমান",
      "question_text": "৬৬. $f(x) = 2x^3 - 9ax^2 + 12a^2x + 1, (a > 0)$ এর $x = p$ ও $x = q$ বিন্দুতে যথাক্রমে স্থানীয় গরিষ্ঠ ও লঘিষ্ঠ মান আছে। $p^2 = q$ হলে $a$ এর মান কত? [KUET'11-12; SUST'08-09]",
      "options": [
        "$2$",
        "$3$",
        "$-2$",
        "$4$",
        "$-3$"
      ],
      "correct_answer": "$2$",
      "explanation": "$f(x) = 2x^3 - 9ax^2 + 12a^2x + 1 \\implies f'(x) = 6x^2 - 18ax + 12a^2$\nগরিষ্ঠ ও লঘিষ্ঠ মানের জন্য $f'(x) = 0$\n$6x^2 - 18ax + 12a^2 = 0 \\implies x^2 - 3ax + 2a^2 = 0$\n$x = \\frac{3a \\pm \\sqrt{9a^2 - 8a^2}}{2} = \\frac{3a \\pm a}{2} = 2a, a$\n$f''(x) = 12x - 18a$\n$x = 2a$ হলে, $f''(x) = 6a > 0 \\therefore q = 2a$\n$x = a$ হলে, $f'' = -6a < 0 \\therefore p = a$\n$p^2 = q \\therefore a^2 = 2a ; a = 2$",
      "time_limit": 60
    },
    {
      "id": 501,
      "topic": "১২. ফাংশনের চরমমান: লঘুমান, গুরুমান ও ক্রমবর্ধমান/হ্রাসমান",
      "question_text": "৬৭. $x$-এর যে মানের জন্য $f(x) = \\sin^3 x \\cos x$, $(0 < x < \\pi)$ এর মান বৃহত্তম হবে তা হচ্ছে- [BUET'10-11]",
      "options": [
        "$\\frac{\\pi}{6}$",
        "$\\frac{\\pi}{4}$",
        "$\\frac{\\pi}{3}$",
        "$\\frac{\\pi}{12}$"
      ],
      "correct_answer": "$\\frac{\\pi}{3}$",
      "explanation": "$4$ টি option বসিয়ে check কর।\n$f'(x) = -\\sin^4 x + 3\\sin^2 x \\cos^2 x \\therefore f'(x) = 0 \\implies 3\\cos^2 x = \\sin^2 x \\implies \\tan^2 x = 3 \\implies \\tan x = \\sqrt{3}$\n[$\\because$ প্রশ্নের option এ সব কোণ প্রথম চতুর্ভাগে]\n$\\therefore x = \\frac{\\pi}{3}$ এবং $f''(x) < 0$",
      "time_limit": 60
    },
    {
      "id": 502,
      "topic": "১২. ফাংশনের চরমমান: লঘুমান, গুরুমান ও ক্রমবর্ধমান/হ্রাসমান",
      "question_text": "৬৮. Suppose you want to build a $1125\\,\\mathrm{ft^3}$ swimming pool with a square base of $x\\,\\mathrm{ft}$ on each side and having $y\\,\\mathrm{ft}$ depth. If the cost of construction is defined as $c = 5x^2 + 30xy$, then what values of $x$ and $y$ will minimize the cost? [ধরা যাক, তুমি একটি $1125$ ঘনফুট আয়তনের সুইমিং পুল তৈরি করতে চাও যার বর্গাকার ভিত্তির প্রতিটি বাহুর দৈর্ঘ্য $x$ ফুট এবং গভীরতা $y$ ফুট। যদি নির্মাণ খরচ $c = 5x^2 + 30xy$ দ্বারা প্রকাশিত হয়, তাহলে $x$ এবং $y$ এর কোন মানের জন্য খরচ সর্বনিম্ন হবে?] [IUT'21-22]\n[চিত্রের বর্ণনা: একটি আয়তাকার সুইমিং পুল যার বর্গাকার ভূমির বাহু $x$ এবং গভীরতা $y$।]",
      "options": [
        "$5\\,\\mathrm{ft}, 15\\,\\mathrm{ft}$",
        "$5\\,\\mathrm{ft}, 45\\,\\mathrm{ft}$",
        "$15\\,\\mathrm{ft}, 5\\,\\mathrm{ft}$",
        "None of the others"
      ],
      "correct_answer": "$15\\,\\mathrm{ft}, 5\\,\\mathrm{ft}$",
      "explanation": "$\\mathrm{Sol^n}: V = x^2y \\implies y = \\frac{1125}{x^2}$\n$c = 5x^2 + 30x \\cdot \\frac{1125}{x^2} = 5x^2 + \\frac{33750}{x}$\n$\\implies \\frac{dc}{dx} = 10x - \\frac{33750}{x^2}$\nFor maximum and minimum value, $\\frac{dc}{dx} = 0 \\implies 10x - \\frac{33750}{x^2} = 0 \\implies 10x^3 - 33750 = 0 \\implies x^3 - 3375 = 0 \\implies x = 15\\,\\mathrm{ft} ; \\text{Now}, y = \\frac{1125}{(15)^2}\\,\\mathrm{ft} = 5\\,\\mathrm{ft}$",
      "time_limit": 60
    },
    {
      "id": 503,
      "topic": "১২. ফাংশনের চরমমান: লঘুমান, গুরুমান ও ক্রমবর্ধমান/হ্রাসমান",
      "question_text": "৬৯. A rectangular plot of farmland will be bounded on one side by a river and on the other three sides by a single-strand electric fence. With $800\\,\\mathrm{m}$ of wire at your disposal, what is the largest area you can enclose and what are its dimensions? [একটি আয়তাকার কৃষি জমি একদিকে একটি নদী দ্বারা এবং অন্য তিন দিকে একসারি বৈদ্যুতিক তারের বেড়া দিয়ে ঘেরা হবে। তোমার কাছে $800$ মিটার তার আছে, তুমি সর্বোচ্চ কত ক্ষেত্রফল ঘিরতে পারবে এবং এর মাত্রাগুলো কী কী?] [IUT'19-20]\n[চিত্রের বর্ণনা: একদিকে নদী দ্বারা সীমাবদ্ধ এবং বাকি তিন দিকে $x + 2y = 800$ সীমানা বিশিষ্ট জমি।]",
      "options": [
        "$50\\,\\mathrm{m} \\times 700\\,\\mathrm{m}$",
        "$100\\,\\mathrm{m} \\times 600\\,\\mathrm{m}$",
        "$120\\,\\mathrm{m} \\times 560\\,\\mathrm{m}$",
        "None of Above"
      ],
      "correct_answer": "None of Above",
      "explanation": "$\\mathrm{Sol^n}:$ Perimeter of fence, $x + 2y = 800 \\therefore x = 800 - 2y \\dots \\dots (i)$\nAgain Area, $A = xy = (800 - 2y)y \\therefore A = 800y - 2y^2 \\dots \\dots (ii)$\nfor max \\& min value, $\\frac{dA}{dy} = 800 - 4y = 0 \\therefore y = \\frac{800}{4} = 200\\,\\mathrm{m}$\nAgain, $(i) \\implies x = 800 - 2 \\times 200 = 400\\,\\mathrm{m}$\n$\\therefore \\text{Area} = 400\\,\\mathrm{m} \\times 200\\,\\mathrm{m} = 80000\\,\\mathrm{m^2}$",
      "time_limit": 60
    },
    {
      "id": 504,
      "topic": "১২. ফাংশনের চরমমান: লঘুমান, গুরুমান ও ক্রমবর্ধমান/হ্রাসমান",
      "question_text": "৭০. দুটি সংখ্যার যোগফল $7$ হলে সংখ্যা দুটির গুণফলের সর্বোচ্চ মান হলো- [KUET'15-16]",
      "options": [
        "$6$",
        "$10$",
        "$12$",
        "$\\infty$",
        "কোনটিই নয়"
      ],
      "correct_answer": "কোনটিই নয়",
      "explanation": "$y = x(7 - x) ; y' = 7 - 2x ; y'' = -2 < 0$\nসর্বোচ্চ এর জন্য $y' = 0 \\therefore x = 3.5$\nসর্বোচ্চ গুণফল $\\frac{49}{4} = 12.25$",
      "time_limit": 60
    },
    {
      "id": 505,
      "topic": "১২. ফাংশনের চরমমান: লঘুমান, গুরুমান ও ক্রমবর্ধমান/হ্রাসমান",
      "question_text": "৭১. An object is thrown vertically upward from the ground with an initial velocity of $80\\,\\mathrm{ft\\,s^{-1}}$. Its heights above the ground is parabola and is given by the equation: $s = 80t - 16t^2$. How high does the object rise above the ground? [একটি বস্তুকে ভূমি থেকে উলম্বভাবে উপরের দিকে $80\\,\\mathrm{ft\\,s^{-1}}$ এর প্রাথমিক বেগে নিক্ষেপ করা হলো। ভূমি থেকে এর উচ্চতা একটি পরাবৃত্ত এবং এটি নিম্নলিখিত সমীকরণ দ্বারা প্রকাশিত হয়: $s = 80t - 16t^2$। বস্তুটি ভূমি থেকে কত উচ্চতায় উঠবে?] [IUT'14-15]",
      "options": [
        "$100\\,\\mathrm{ft}$",
        "$120\\,\\mathrm{ft}$",
        "$96\\,\\mathrm{ft}$",
        "None"
      ],
      "correct_answer": "$100\\,\\mathrm{ft}$",
      "explanation": "$v = \\frac{ds}{dt} = 80 - 32t = 0 \\quad \\text{[at maximum height]}$\n$\\implies t = \\frac{80}{32} \\therefore s = 80 \\cdot \\frac{80}{32} - 16 \\cdot \\left(\\frac{80}{32}\\right)^2 = 100\\,\\mathrm{ft}$",
      "time_limit": 60
    }
  ]
};
