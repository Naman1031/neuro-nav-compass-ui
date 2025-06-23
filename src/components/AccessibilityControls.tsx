
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Eye, Moon, Sun, Focus, Zap, Settings } from 'lucide-react';

interface AccessibilityControlsProps {
  isDyslexicFont: boolean;
  setIsDyslexicFont: (value: boolean) => void;
  isHighContrast: boolean;
  setIsHighContrast: (value: boolean) => void;
  isFocusMode: boolean;
  setIsFocusMode: (value: boolean) => void;
  isReducedMotion: boolean;
  setIsReducedMotion: (value: boolean) => void;
}

export const AccessibilityControls = ({
  isDyslexicFont,
  setIsDyslexicFont,
  isHighContrast,
  setIsHighContrast,
  isFocusMode,
  setIsFocusMode,
  isReducedMotion,
  setIsReducedMotion,
}: AccessibilityControlsProps) => {
  return (
    <Card className="backdrop-blur-xl bg-white/30 dark:bg-slate-800/30 border-white/20 dark:border-slate-700/30 shadow-xl">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500">
            <Settings className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">Accessibility</h3>
        </div>
        
        <div className="space-y-6">
          {/* Dyslexic Font */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-white/40 dark:bg-slate-800/40 hover:bg-white/60 dark:hover:bg-slate-800/60 transition-colors">
            <div className="flex items-center space-x-3">
              <Eye className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              <div>
                <label htmlFor="dyslexic-font" className="font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
                  Dyslexic Font
                </label>
                <p className="text-xs text-slate-500 dark:text-slate-400">Easier reading</p>
              </div>
            </div>
            <Switch
              checked={isDyslexicFont}
              onCheckedChange={setIsDyslexicFont}
              id="dyslexic-font"
            />
          </div>

          {/* High Contrast */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-white/40 dark:bg-slate-800/40 hover:bg-white/60 dark:hover:bg-slate-800/60 transition-colors">
            <div className="flex items-center space-x-3">
              {isHighContrast ? <Moon className="h-5 w-5 text-purple-600 dark:text-purple-400" /> : <Sun className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />}
              <div>
                <label htmlFor="high-contrast" className="font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
                  Dark Mode
                </label>
                <p className="text-xs text-slate-500 dark:text-slate-400">Better contrast</p>
              </div>
            </div>
            <Switch
              checked={isHighContrast}
              onCheckedChange={setIsHighContrast}
              id="high-contrast"
            />
          </div>

          {/* Focus Mode */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-white/40 dark:bg-slate-800/40 hover:bg-white/60 dark:hover:bg-slate-800/60 transition-colors">
            <div className="flex items-center space-x-3">
              <Focus className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <div>
                <label htmlFor="focus-mode" className="font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
                  Focus Mode
                </label>
                <p className="text-xs text-slate-500 dark:text-slate-400">Highlight text</p>
              </div>
            </div>
            <Switch
              checked={isFocusMode}
              onCheckedChange={setIsFocusMode}
              id="focus-mode"
            />
          </div>

          {/* Reduce Motion */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-white/40 dark:bg-slate-800/40 hover:bg-white/60 dark:hover:bg-slate-800/60 transition-colors">
            <div className="flex items-center space-x-3">
              <Zap className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              <div>
                <label htmlFor="reduced-motion" className="font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
                  Calm Mode
                </label>
                <p className="text-xs text-slate-500 dark:text-slate-400">Less animation</p>
              </div>
            </div>
            <Switch
              checked={isReducedMotion}
              onCheckedChange={setIsReducedMotion}
              id="reduced-motion"
            />
          </div>
        </div>

        {/* Status Indicator */}
        <div className="mt-6 p-4 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl border border-green-200 dark:border-green-800">
          <p className="text-sm text-green-700 dark:text-green-300 font-medium text-center">
            🎯 Your interface is optimized for learning!
          </p>
        </div>
      </div>
    </Card>
  );
};
