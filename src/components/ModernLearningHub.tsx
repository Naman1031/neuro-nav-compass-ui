
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Upload, Wand2, Sparkles, FileText, Brain, MessageSquare, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ModernLearningHubProps {
  content: string;
  setContent: (content: string) => void;
  isFocusMode: boolean;
  isReducedMotion: boolean;
}

export const ModernLearningHub = ({ content, setContent, isFocusMode, isReducedMotion }: ModernLearningHubProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState<any>(null);
  const { toast } = useToast();

  const handleProcessContent = async () => {
    if (!content.trim()) {
      toast({
        title: "No content detected",
        description: "Please add some text to get started!",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate AI processing with modern feedback
    setTimeout(() => {
      setResults({
        simplified: "✨ Here's your content made super clear and easy to understand! Complex ideas broken down into bite-sized pieces that make sense.",
        summary: "🎯 Key takeaways: The main ideas organized in a way that helps your brain connect the dots effortlessly.",
        concepts: ["🧠 Neural pathways", "⚡ Quick learning", "🎨 Creative thinking", "🔄 Memory loops"],
        quiz: ["What's the main concept here?", "How does this connect to what you already know?", "Can you explain this in your own words?"]
      });
      
      setIsProcessing(false);
      toast({
        title: "Content enhanced! 🚀",
        description: "Your learning materials are now optimized for your brain!",
      });
    }, 2000);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setContent(text);
        toast({
          title: "File uploaded! 📚",
          description: `${file.name} is ready for enhancement`,
        });
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="space-y-8">
      {/* Main Input Card */}
      <Card className={`backdrop-blur-xl bg-white/30 dark:bg-slate-800/30 border-white/20 dark:border-slate-700/30 shadow-2xl ${!isReducedMotion ? 'hover:shadow-3xl transition-all duration-500' : ''}`}>
        <div className="p-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Smart Learning Hub</h2>
          </div>

          {/* Upload Zone */}
          <div className="relative mb-6">
            <div className="border-2 border-dashed border-purple-300 dark:border-purple-700 rounded-2xl p-8 text-center bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 group hover:border-purple-400 transition-colors">
              <div className="space-y-4">
                <div className={`mx-auto w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center ${!isReducedMotion ? 'group-hover:scale-110 transition-transform' : ''}`}>
                  <Upload className="h-8 w-8 text-white" />
                </div>
                <div>
                  <p className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Drop your content here or browse
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    PDFs, Word docs, or plain text • AI will optimize it for your learning style
                  </p>
                </div>
                
                <input
                  type="file"
                  accept=".txt,.pdf,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-xl cursor-pointer hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Choose File
                </label>
              </div>
            </div>
          </div>

          {/* Text Area */}
          <Textarea
            placeholder="Or paste your text here... I'll help make it perfect for your brain! 🧠✨"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={`min-h-[200px] text-lg leading-relaxed resize-none border-0 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl focus:ring-2 focus:ring-purple-500 ${isFocusMode ? 'bg-yellow-50 dark:bg-yellow-900/20' : ''}`}
          />

          {/* Action Button */}
          <div className="flex justify-center mt-6">
            <Button
              onClick={handleProcessContent}
              disabled={isProcessing || !content.trim()}
              className={`px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold text-lg rounded-2xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed ${!isReducedMotion ? 'hover:scale-105 transition-all duration-300' : ''}`}
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  AI is thinking...
                </>
              ) : (
                <>
                  <Wand2 className="h-5 w-5 mr-3" />
                  Transform My Content ✨
                </>
              )}
            </Button>
          </div>
        </div>
      </Card>

      {/* Results Grid */}
      {results && (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Simplified Content */}
          <Card className={`backdrop-blur-xl bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20 border-green-200 dark:border-green-800 shadow-xl ${!isReducedMotion ? 'hover:shadow-2xl transition-all duration-500' : ''}`}>
            <div className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Brain className="h-6 w-6 text-green-600 dark:text-green-400" />
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">Simplified Version</h3>
              </div>
              <div className="p-4 bg-white/60 dark:bg-slate-800/60 rounded-xl">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{results.simplified}</p>
              </div>
            </div>
          </Card>

          {/* Summary */}
          <Card className={`backdrop-blur-xl bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800 shadow-xl ${!isReducedMotion ? 'hover:shadow-2xl transition-all duration-500' : ''}`}>
            <div className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Zap className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">Quick Summary</h3>
              </div>
              <div className="p-4 bg-white/60 dark:bg-slate-800/60 rounded-xl">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{results.summary}</p>
              </div>
            </div>
          </Card>

          {/* Key Concepts */}
          <Card className={`backdrop-blur-xl bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-200 dark:border-yellow-800 shadow-xl ${!isReducedMotion ? 'hover:shadow-2xl transition-all duration-500' : ''}`}>
            <div className="p-6">
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4">Key Concepts</h3>
              <div className="space-y-3">
                {results.concepts.map((concept: string, index: number) => (
                  <div key={index} className="p-3 bg-white/60 dark:bg-slate-800/60 rounded-xl flex items-center">
                    <span className="text-slate-700 dark:text-slate-300 font-medium">{concept}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Interactive Quiz */}
          <Card className={`backdrop-blur-xl bg-gradient-to-br from-indigo-100 to-cyan-100 dark:from-indigo-900/20 dark:to-cyan-900/20 border-indigo-200 dark:border-indigo-800 shadow-xl ${!isReducedMotion ? 'hover:shadow-2xl transition-all duration-500' : ''}`}>
            <div className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <MessageSquare className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">Think About This</h3>
              </div>
              <div className="space-y-3">
                {results.quiz.map((question: string, index: number) => (
                  <div key={index} className="p-3 bg-white/60 dark:bg-slate-800/60 rounded-xl">
                    <p className="text-slate-700 dark:text-slate-300">{question}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
