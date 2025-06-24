import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, Square, Volume2 } from 'lucide-react';
export const VoiceNarrationPanel = ({ content }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [accent, setAccent] = useState('us');
    const [speed, setSpeed] = useState([1]);
    const [pitch, setPitch] = useState([1]);
    const handlePlayPause = () => {
        if (!content.trim())
            return;
        if (isPlaying) {
            // Pause speech
            speechSynthesis.cancel();
            setIsPlaying(false);
        }
        else {
            // Start speech
            const utterance = new SpeechSynthesisUtterance(content);
            // Configure voice settings
            const voices = speechSynthesis.getVoices();
            let selectedVoice;
            switch (accent) {
                case 'uk':
                    selectedVoice = voices.find(voice => voice.lang.includes('en-GB')) || voices[0];
                    break;
                case 'indian':
                    selectedVoice = voices.find(voice => voice.lang.includes('en-IN')) || voices[0];
                    break;
                default:
                    selectedVoice = voices.find(voice => voice.lang.includes('en-US')) || voices[0];
            }
            if (selectedVoice) {
                utterance.voice = selectedVoice;
            }
            utterance.rate = speed[0];
            utterance.pitch = pitch[0];
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
    return (<Card className="p-6 border-calm-200 dark:border-slate-700 shadow-lg">
      <div className="space-y-6">
        <div className="flex items-center space-x-2 mb-4">
          <Volume2 className="h-5 w-5 text-calm-600 dark:text-calm-400"/>
          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">Voice Narration</h2>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center space-x-4">
          <Button onClick={handlePlayPause} disabled={!content.trim()} className="btn-calm disabled:opacity-50 disabled:cursor-not-allowed" size="lg">
            {isPlaying ? (<>
                <Pause className="h-5 w-5 mr-2"/>
                Pause
              </>) : (<>
                <Play className="h-5 w-5 mr-2"/>
                Play
              </>)}
          </Button>

          <Button onClick={handleStop} disabled={!isPlaying} variant="outline" className="disabled:opacity-50 disabled:cursor-not-allowed" size="lg">
            <Square className="h-4 w-4 mr-2"/>
            Stop
          </Button>
        </div>

        {/* Voice Settings */}
        <div className="grid sm:grid-cols-3 gap-6">
          {/* Accent Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Voice Accent
            </label>
            <Select value={accent} onValueChange={setAccent}>
              <SelectTrigger className="bg-white dark:bg-slate-700">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-slate-700">
                <SelectItem value="us">🇺🇸 US English</SelectItem>
                <SelectItem value="uk">🇬🇧 UK English</SelectItem>
                <SelectItem value="indian">🇮🇳 Indian English</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Speed Control */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Speed: {speed[0].toFixed(1)}x
            </label>
            <Slider value={speed} onValueChange={setSpeed} max={2} min={0.5} step={0.1} className="w-full"/>
          </div>

          {/* Pitch Control */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Pitch: {pitch[0].toFixed(1)}
            </label>
            <Slider value={pitch} onValueChange={setPitch} max={2} min={0.5} step={0.1} className="w-full"/>
          </div>
        </div>

        {/* Status */}
        <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {isPlaying ? (<span className="text-green-600 dark:text-green-400">🔊 Playing narration...</span>) : content.trim() ? ("Ready to play. Click the play button to start narration.") : ("Add some content to enable voice narration.")}
          </p>
        </div>
      </div>
    </Card>);
};
