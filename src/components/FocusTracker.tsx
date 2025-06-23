
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Clock, Coffee, Star, Target } from 'lucide-react';

export const FocusTracker = () => {
  const [timeSpent, setTimeSpent] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(3);
  const [todayGoal] = useState(30); // 30 minutes goal
  const [encouragements] = useState([
    "You're doing great! Keep going! 🌟",
    "Take a short break if needed 🧘‍♀️",
    "You're building focus muscles! 💪",
    "Every minute counts! 📚",
    "Stay curious and keep learning! 🚀"
  ]);
  const [currentEncouragement, setCurrentEncouragement] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive) {
      interval = setInterval(() => {
        setTimeSpent(time => time + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive]);

  useEffect(() => {
    // Change encouragement every 5 minutes
    if (timeSpent > 0 && timeSpent % 300 === 0) {
      setCurrentEncouragement(prev => (prev + 1) % encouragements.length);
    }
  }, [timeSpent, encouragements.length]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = Math.min((timeSpent / 60 / todayGoal) * 100, 100);

  const handleStartPause = () => {
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setIsActive(false);
    setTimeSpent(0);
  };

  return (
    <div className="space-y-6">
      {/* Focus Timer */}
      <Card className="p-6 border-calm-200 dark:border-slate-700 shadow-lg">
        <div className="space-y-4">
          <div className="flex items-center space-x-2 mb-4">
            <Target className="h-5 w-5 text-calm-600 dark:text-calm-400" />
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">Focus Tracker</h2>
          </div>

          {/* Timer Display */}
          <div className="text-center">
            <div className="text-4xl font-bold text-calm-600 dark:text-calm-400 mb-2">
              {formatTime(timeSpent)}
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">Time focused today</p>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
              <span>Daily Goal Progress</span>
              <span>{Math.floor(timeSpent / 60)}/{todayGoal} min</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>

          {/* Controls */}
          <div className="flex space-x-3">
            <Button
              onClick={handleStartPause}
              className={`flex-1 ${isActive ? 'btn-sage' : 'btn-calm'}`}
            >
              <Clock className="h-4 w-4 mr-2" />
              {isActive ? 'Pause' : 'Start'}
            </Button>
            <Button
              onClick={handleReset}
              variant="outline"
              className="flex-1"
            >
              Reset
            </Button>
          </div>
        </div>
      </Card>

      {/* Encouragement Card */}
      <Card className="p-6 border-sage-200 dark:border-slate-700 shadow-lg bg-gradient-to-br from-sage-50 to-calm-50 dark:from-slate-800 dark:to-slate-700">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Star className="h-5 w-5 text-sage-600 dark:text-sage-400" />
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">Encouragement</h3>
          </div>
          
          <div className="text-center p-4 bg-white/50 dark:bg-slate-800/50 rounded-lg">
            <p className="text-slate-700 dark:text-slate-300 font-medium">
              {encouragements[currentEncouragement]}
            </p>
          </div>

          <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400">
            <div className="flex items-center space-x-1">
              <Coffee className="h-4 w-4" />
              <span>Streak: {currentStreak} days</span>
            </div>
            <div>
              {progressPercentage >= 100 ? "🎉 Goal achieved!" : `${Math.floor(progressPercentage)}% to goal`}
            </div>
          </div>
        </div>
      </Card>

      {/* Break Reminder */}
      {timeSpent > 0 && timeSpent % 1800 === 0 && (
        <Card className="p-4 border-orange-200 dark:border-orange-700 bg-orange-50 dark:bg-orange-900/20 shadow-lg animate-gentle-pulse">
          <div className="flex items-center space-x-2">
            <Coffee className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            <div>
              <h4 className="font-semibold text-orange-800 dark:text-orange-200">Time for a break!</h4>
              <p className="text-sm text-orange-600 dark:text-orange-300">
                You've been focused for 30 minutes. Consider taking a 5-minute break.
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};
