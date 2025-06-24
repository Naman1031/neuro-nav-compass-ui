import { useState } from 'react';
import { ModernLearningHub } from '@/components/ModernLearningHub';
import { AccessibilityControls } from '@/components/AccessibilityControls';
import { FloatingFocusWidget } from '@/components/FloatingFocusWidget';
import { VoiceAssistant } from '@/components/VoiceAssistant';
import { NavigationHeader } from '@/components/NavigationHeader';
const Index = () => {
    const [isDyslexicFont, setIsDyslexicFont] = useState(false);
    const [isHighContrast, setIsHighContrast] = useState(false);
    const [isFocusMode, setIsFocusMode] = useState(false);
    const [isReducedMotion, setIsReducedMotion] = useState(false);
    const [content, setContent] = useState('');
    return (<div className={`min-h-screen relative overflow-hidden ${isDyslexicFont ? 'font-dyslexic' : 'font-atkinson'} ${isHighContrast ? 'dark' : ''}`}>
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-indigo-50 via-purple-25 to-pink-50 dark:from-slate-900 dark:via-purple-900 dark:to-indigo-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%239C92AC%22%20fill-opacity=%220.1%22%3E%3Ccircle%20cx=%2230%22%20cy=%2230%22%20r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        {!isReducedMotion && (<>
            <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-gentle-pulse"></div>
            <div className="absolute top-32 right-10 w-72 h-72 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-gentle-pulse" style={{ animationDelay: '2s' }}></div>
            <div className="absolute -bottom-32 left-32 w-72 h-72 bg-gradient-to-r from-green-400 to-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-gentle-pulse" style={{ animationDelay: '4s' }}></div>
          </>)}
      </div>

      <div className="relative z-10">
        <NavigationHeader isDyslexicFont={isDyslexicFont} setIsDyslexicFont={setIsDyslexicFont} isHighContrast={isHighContrast} setIsHighContrast={setIsHighContrast} isFocusMode={isFocusMode} setIsFocusMode={setIsFocusMode} isReducedMotion={isReducedMotion} setIsReducedMotion={setIsReducedMotion}/>

        <main className="container mx-auto px-6 py-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Learning Area */}
            <div className="lg:col-span-3 space-y-8">
              <ModernLearningHub content={content} setContent={setContent} isFocusMode={isFocusMode} isReducedMotion={isReducedMotion}/>
              <VoiceAssistant content={content}/>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              <AccessibilityControls isDyslexicFont={isDyslexicFont} setIsDyslexicFont={setIsDyslexicFont} isHighContrast={isHighContrast} setIsHighContrast={setIsHighContrast} isFocusMode={isFocusMode} setIsFocusMode={setIsFocusMode} isReducedMotion={isReducedMotion} setIsReducedMotion={setIsReducedMotion}/>
              <FloatingFocusWidget />
            </div>
          </div>
        </main>
      </div>
    </div>);
};
export default Index;
