
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mic, Play, Pause, Square, Volume2, Headphones } from 'lucide-react';

interface VoiceAssistantProps {
  content: string;
}

export const VoiceAssistant = ({ content }: VoiceAssistantProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [voice, setVoice] = useState('friendly');
  const [speed, setSpeed] = useState([1]);
  const [volume, setVolume] = useState([0.8]);

  const handlePlayPause = () => {
    if (!content.trim()) return;
    
    if (isPlaying) {
      speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(content);
      utterance.rate = speed[0];
      utterance.volume = volume[0];
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      
      speechSynthesis.speak(utterance);
      setIsPlaying(true);
    }
  };

  const handleStop = () => {
    speechSynthesis.cancel();
    setIsPlaying(false);
  };

  return (
    <Card className="backdrop-blur-xl bg-white/30 dark:bg-slate-800/30 border-white/20 dark:border-slate-700/30 shadow-xl">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500">
            <Headphones className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">Voice Assistant</h2>
          <div className="ml-auto">
            {isPlaying && (
              <div className="flex items-center space-x-2 px-3 py-1 bg-green-100 dark:bg-green-900/30 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-700 dark:text-green-300 font-medium">Speaking</span>
              </div>
            )}
          </div>
        </div>

        {/* Main Controls */}
        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          <Button
            onClick={handlePlayPause}
            disabled={!content.trim()}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-medium disabled:opacity-50"
          >
            {isPlaying ? (
              <>
                <Pause className="h-5 w-5 mr-2" />
                Pause
              </>
            ) : (
              <>
                <Play className="h-5 w-5 mr-2" />
                Read Aloud
              </>
            )}
          </Button>

          <Button
            onClick={handleStop}
            disabled={!isPlaying}
            variant="outline"
            className="disabled:opacity-50"
          >
            <Square className="h-4 w-4 mr-2" />
            Stop
          </Button>

          <Button
            variant="outline"
            className="border-purple-300 text-purple-600 hover:bg-purple-50 dark:border-purple-700 dark:text-purple-400"
          >
            <Mic className="h-4 w-4 mr-2" />
            Voice Chat
          </Button>
        </div>

        {/* Voice Settings */}
        <div className="grid sm:grid-cols-3 gap-6">
          {/* Voice Type */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Voice Style
            </label>
            <Select value={voice} onValueChange={setVoice}>
              <SelectTrigger className="bg-white/60 dark:bg-slate-800/60">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-slate-800">
                <SelectItem value="friendly">😊 Friendly</SelectItem>
                <SelectItem value="professional">💼 Professional</SelectItem>
                <SelectItem value="calm">🧘 Calm & Soothing</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Speed */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Speed: {speed[0].toFixed(1)}x
            </label>
            <Slider
              value={speed}
              onValueChange={setSpeed}
              max={2}
              min={0.5}
              step={0.1}
              className="w-full"
            />
          </div>

          {/* Volume */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center">
              <Volume2 className="h-4 w-4 mr-1" />
              Volume: {Math.round(volume[0] * 100)}%
            </label>
            <Slider
              value={volume}
              onValueChange={setVolume}
              max={1}
              min={0}
              step={0.1}
              className="w-full"
            />
          </div>
        </div>

        {/* Status */}
        <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 border border-cyan-200 dark:border-cyan-800">
          <p className="text-sm text-slate-600 dark:text-slate-400 text-center">
            {isPlaying ? (
              <span className="text-cyan-600 dark:text-cyan-400 font-medium">🎵 Reading your content out loud...</span>
            ) : content.trim() ? (
              "✨ Ready to read! Click play to hear your content."
            ) : (
              "📝 Add some content above to enable voice reading."
            )}
          </p>
        </div>
      </div>
    </Card>
  );
};
