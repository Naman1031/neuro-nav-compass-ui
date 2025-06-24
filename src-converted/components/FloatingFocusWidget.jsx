import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Timer, Play, Pause, RotateCcw, Award, Target } from 'lucide-react';
export const FloatingFocusWidget = () => {
    const [timeSpent, setTimeSpent] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [dailyGoal] = useState(45); // 45 minutes
    const [streak, setStreak] = useState(7);
    useEffect(() => {
        let interval;
        if (isActive) {
            interval = setInterval(() => {
                setTimeSpent(time => time + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isActive]);
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };
    const progressPercentage = Math.min((timeSpent / 60 / dailyGoal) * 100, 100);
    return (<Card className="backdrop-blur-xl bg-white/30 dark:bg-slate-800/30 border-white/20 dark:border-slate-700/30 shadow-xl">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500">
            <Timer className="h-5 w-5 text-white"/>
          </div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">Focus Timer</h3>
        </div>

        {/* Timer Display */}
        <div className="text-center mb-6">
          <div className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            {formatTime(timeSpent)}
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400">Deep focus time today</p>
        </div>

        {/* Progress */}
        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
            <span>Daily Goal</span>
            <span>{Math.floor(timeSpent / 60)}/{dailyGoal} min</span>
          </div>
          <Progress value={progressPercentage} className="h-3 bg-white/50"/>
          <div className="text-center">
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {progressPercentage >= 100 ? "🎉 Goal achieved!" : `${Math.floor(progressPercentage)}% complete`}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Button onClick={() => setIsActive(!isActive)} className={`${isActive ? 'bg-gradient-to-r from-red-500 to-pink-500' : 'bg-gradient-to-r from-green-500 to-emerald-500'} text-white font-medium`}>
            {isActive ? (<>
                <Pause className="h-4 w-4 mr-2"/>
                Pause
              </>) : (<>
                <Play className="h-4 w-4 mr-2"/>
                Start
              </>)}
          </Button>
          <Button onClick={() => {
            setIsActive(false);
            setTimeSpent(0);
        }} variant="outline" className="border-slate-300 dark:border-slate-600">
            <RotateCcw className="h-4 w-4 mr-2"/>
            Reset
          </Button>
        </div>

        {/* Streak & Achievement */}
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 rounded-xl">
            <div className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-yellow-600 dark:text-yellow-400"/>
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Streak</span>
            </div>
            <span className="text-lg font-bold text-yellow-600 dark:text-yellow-400">{streak} days</span>
          </div>

          {progressPercentage >= 100 && (<div className="p-3 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl border border-green-200 dark:border-green-800 animate-gentle-pulse">
              <div className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-green-600 dark:text-green-400"/>
                <span className="text-sm font-medium text-green-700 dark:text-green-300">
                  Amazing! Goal completed! 🎯
                </span>
              </div>
            </div>)}
        </div>
      </div>
    </Card>);
};
