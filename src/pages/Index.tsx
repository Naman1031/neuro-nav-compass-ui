
import { useState } from 'react';
import { LearningDashboard } from '@/components/LearningDashboard';
import { AccessibilityToolbar } from '@/components/AccessibilityToolbar';
import { FocusTracker } from '@/components/FocusTracker';
import { VoiceNarrationPanel } from '@/components/VoiceNarrationPanel';

const Index = () => {
  const [isDyslexicFont, setIsDyslexicFont] = useState(false);
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [content, setContent] = useState('');

  return (
    <div className={`min-h-screen bg-gradient-to-br from-calm-50 to-sage-50 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300 ${isDyslexicFont ? 'font-dyslexic' : 'font-atkinson'} ${isHighContrast ? 'dark' : ''}`}>
      {/* Header */}
      <header className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-b border-calm-200 dark:border-slate-700 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-calm-500 to-sage-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">🧠</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200">NeuroNav</h1>
                <p className="text-sm text-slate-600 dark:text-slate-400">Your Learning Copilot</p>
              </div>
            </div>
            <AccessibilityToolbar
              isDyslexicFont={isDyslexicFont}
              setIsDyslexicFont={setIsDyslexicFont}
              isHighContrast={isHighContrast}
              setIsHighContrast={setIsHighContrast}
              isFocusMode={isFocusMode}
              setIsFocusMode={setIsFocusMode}
              isReducedMotion={isReducedMotion}
              setIsReducedMotion={setIsReducedMotion}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Dashboard */}
          <div className="lg:col-span-2 space-y-6">
            <LearningDashboard 
              content={content}
              setContent={setContent}
              isFocusMode={isFocusMode}
              isReducedMotion={isReducedMotion}
            />
            <VoiceNarrationPanel content={content} />
          </div>

          {/* Right Column - Focus Tracker */}
          <div className="lg:col-span-1">
            <FocusTracker />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
