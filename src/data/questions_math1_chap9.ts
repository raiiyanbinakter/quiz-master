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
    }
  ]
};
