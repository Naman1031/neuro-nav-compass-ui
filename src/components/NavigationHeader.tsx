
import { Brain, Sparkles } from 'lucide-react';

interface NavigationHeaderProps {
  isDyslexicFont: boolean;
  setIsDyslexicFont: (value: boolean) => void;
  isHighContrast: boolean;
  setIsHighContrast: (value: boolean) => void;
  isFocusMode: boolean;
  setIsFocusMode: (value: boolean) => void;
  isReducedMotion: boolean;
  setIsReducedMotion: (value: boolean) => void;
}

export const NavigationHeader = ({ isReducedMotion }: NavigationHeaderProps) => {
  return (
    <header className="relative">
      {/* Glassmorphism navbar */}
      <nav className="backdrop-blur-xl bg-white/10 dark:bg-slate-900/10 border-b border-white/20 dark:border-slate-700/30 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`relative p-3 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg ${!isReducedMotion ? 'hover:scale-105 transition-transform duration-300' : ''}`}>
                <Brain className="h-8 w-8 text-white" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Sparkles className="h-2 w-2 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                  NeuroNav
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                  AI-Powered Learning Companion
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="px-4 py-2 rounded-full bg-gradient-to-r from-green-400 to-blue-500 text-white text-sm font-medium shadow-lg">
                🎯 Focus Mode Ready
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
