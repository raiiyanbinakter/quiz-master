import React from 'react';
import { Trophy, CheckCircle2, XCircle, Clock, RotateCcw, Home, Info, ArrowLeft } from 'lucide-react';
import { QuizSummary } from '../types';

interface ResultProps {
  summary: QuizSummary;
  onRetry: () => void;
  onGoHome: () => void;
  onBack: () => void;
}

export default function Result({ summary, onRetry, onGoHome, onBack }: ResultProps) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-white">ফলাফল</h1>
          <p className="text-slate-400 text-sm">আপনার পারফরম্যান্স দেখুন</p>
        </div>
      </div>

      {/* Score Summary Card */}
      <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700 shadow-2xl mb-8 relative overflow-hidden text-center">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 to-blue-500"></div>
        
        <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-500/20 rounded-full mb-6">
          <Trophy className="w-10 h-10 text-emerald-400" />
        </div>
        
        <h2 className="text-3xl font-bold text-white mb-2">কুইজ সম্পন্ন হয়েছে!</h2>
        <p className="text-slate-400 mb-8">আপনার ফলাফল নিচে দেওয়া হলো</p>

        <div className="flex justify-center items-end gap-2 mb-8">
          <span className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-200">
            {summary.totalScore}
          </span>
          <span className="text-2xl font-bold text-slate-500 mb-2">/ {summary.totalQuestions}</span>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-slate-900/50 rounded-2xl p-4 border border-slate-700/50">
            <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white mb-1">{summary.correctCount}</div>
            <div className="text-sm text-slate-400">সঠিক</div>
          </div>
          <div className="bg-slate-900/50 rounded-2xl p-4 border border-slate-700/50">
            <XCircle className="w-6 h-6 text-rose-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white mb-1">{summary.wrongCount}</div>
            <div className="text-sm text-slate-400">ভুল</div>
          </div>
          <div className="bg-slate-900/50 rounded-2xl p-4 border border-slate-700/50">
            <Clock className="w-6 h-6 text-slate-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white mb-1">{summary.skippedCount}</div>
            <div className="text-sm text-slate-400">স্কিপড</div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4 mb-12">
        <button
          onClick={onRetry}
          className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-bold py-4 rounded-2xl transition-colors flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-5 h-5" />
          পুনরায় চেষ্টা করুন
        </button>
        <button
          onClick={onGoHome}
          className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-2xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
        >
          <Home className="w-5 h-5" />
          হোম পেজ
        </button>
      </div>

      {/* Review Section */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1.5 h-6 bg-blue-500 rounded-full"></div>
          <h3 className="text-xl font-bold text-white">উত্তরমালা পর্যালোচনা</h3>
        </div>

        <div className="space-y-6">
          {summary.results.map((result, index) => (
            <div key={index} className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
              <div className="flex gap-4 mb-4">
                <div className="w-8 h-8 shrink-0 bg-slate-700 rounded-full flex items-center justify-center text-slate-300 font-bold">
                  {index + 1}
                </div>
                <h4 className="text-lg font-medium text-white leading-relaxed">
                  {result.questionText}
                </h4>
              </div>

              <div className="pl-12 space-y-3 mb-4">
                {result.options.map((option, optIdx) => {
                  let optClass = "text-slate-400";
                  let Icon = null;

                  if (option === result.correctAnswer) {
                    optClass = "text-emerald-400 font-medium";
                    Icon = CheckCircle2;
                  } else if (option === result.selectedOption) {
                    optClass = "text-rose-400 font-medium";
                    Icon = XCircle;
                  }

                  return (
                    <div key={optIdx} className={`flex items-center gap-2 ${optClass}`}>
                      <div className={`w-2 h-2 rounded-full ${option === result.correctAnswer ? 'bg-emerald-400' : option === result.selectedOption ? 'bg-rose-400' : 'bg-slate-600'}`}></div>
                      <span>{option}</span>
                      {Icon && <Icon className="w-4 h-4" />}
                    </div>
                  );
                })}
              </div>

              <div className="pl-12">
                <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50">
                  <div className="flex items-start gap-2">
                    <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                    <p className="text-sm text-slate-300 leading-relaxed">
                      <span className="font-semibold text-blue-400">ব্যাখ্যা: </span>
                      {result.explanation}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
