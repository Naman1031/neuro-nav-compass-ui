import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Eye, Moon, Sun, Focus, Zap } from 'lucide-react';
export const AccessibilityToolbar = ({ isDyslexicFont, setIsDyslexicFont, isHighContrast, setIsHighContrast, isFocusMode, setIsFocusMode, isReducedMotion, setIsReducedMotion, }) => {
    return (<Card className="p-4 border-calm-200 dark:border-slate-700 shadow-lg">
      <div className="flex items-center space-x-2 mb-4">
        <Eye className="h-4 w-4 text-calm-600 dark:text-calm-400"/>
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Accessibility</span>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* OpenDyslexic Font */}
        <div className="flex items-center space-x-2">
          <Switch checked={isDyslexicFont} onCheckedChange={setIsDyslexicFont} id="dyslexic-font"/>
          <label htmlFor="dyslexic-font" className="text-xs text-slate-600 dark:text-slate-400 cursor-pointer">
            Dyslexic Font
          </label>
        </div>

        {/* High Contrast */}
        <div className="flex items-center space-x-2">
          <Switch checked={isHighContrast} onCheckedChange={setIsHighContrast} id="high-contrast"/>
          <label htmlFor="high-contrast" className="text-xs text-slate-600 dark:text-slate-400 cursor-pointer flex items-center">
            {isHighContrast ? <Moon className="h-3 w-3 mr-1"/> : <Sun className="h-3 w-3 mr-1"/>}
            High Contrast
          </label>
        </div>

        {/* Focus Mode */}
        <div className="flex items-center space-x-2">
          <Switch checked={isFocusMode} onCheckedChange={setIsFocusMode} id="focus-mode"/>
          <label htmlFor="focus-mode" className="text-xs text-slate-600 dark:text-slate-400 cursor-pointer flex items-center">
            <Focus className="h-3 w-3 mr-1"/>
            Focus Mode
          </label>
        </div>

        {/* Reduce Motion */}
        <div className="flex items-center space-x-2">
          <Switch checked={isReducedMotion} onCheckedChange={setIsReducedMotion} id="reduced-motion"/>
          <label htmlFor="reduced-motion" className="text-xs text-slate-600 dark:text-slate-400 cursor-pointer flex items-center">
            <Zap className="h-3 w-3 mr-1"/>
            Reduce Motion
          </label>
        </div>
      </div>
    </Card>);
};
