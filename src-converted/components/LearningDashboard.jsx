import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, Wand2, BookOpen, Brain, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
export const LearningDashboard = ({ content, setContent, isFocusMode, isReducedMotion }) => {
    const [difficulty, setDifficulty] = useState('intermediate');
    const [isProcessing, setIsProcessing] = useState(false);
    const [simplifiedText, setSimplifiedText] = useState('');
    const [summary, setSummary] = useState('');
    const [definitions, setDefinitions] = useState([]);
    const [quizQuestions, setQuizQuestions] = useState([]);
    const { toast } = useToast();
    const handleSimplifyText = async () => {
        if (!content.trim()) {
            toast({
                title: "No content to simplify",
                description: "Please paste or upload some text first.",
                variant: "destructive",
            });
            return;
        }
        setIsProcessing(true);
        // Simulate AI processing
        setTimeout(() => {
            const mockSimplified = `Simplified version (${difficulty} level):\n\n` +
                content.split('. ').map(sentence => sentence.length > 50 ? sentence.substring(0, 50) + "..." : sentence).join('. ');
            setSimplifiedText(mockSimplified);
            setSummary("This text discusses the main concepts in simple terms that are easy to understand.");
            setDefinitions(["Key term 1: Simple explanation", "Key term 2: Clear definition", "Key term 3: Easy meaning"]);
            setQuizQuestions(["What is the main idea?", "Can you explain the key concept?", "How does this relate to your experience?"]);
            setIsProcessing(false);
            toast({
                title: "Text simplified successfully!",
                description: "Your content has been adapted for better understanding.",
            });
        }, 2000);
    };
    const handleFileUpload = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const text = e.target?.result;
                setContent(text);
                toast({
                    title: "File uploaded successfully!",
                    description: `Loaded ${file.name}`,
                });
            };
            reader.readAsText(file);
        }
    };
    return (<div className="space-y-6">
      {/* Content Input Section */}
      <Card className={`p-6 ${!isReducedMotion ? 'gentle-hover' : ''} border-calm-200 dark:border-slate-700 shadow-lg`}>
        <div className="space-y-4">
          <div className="flex items-center space-x-2 mb-4">
            <BookOpen className="h-5 w-5 text-calm-600 dark:text-calm-400"/>
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">Learning Content</h2>
          </div>

          {/* Upload Area */}
          <div className="border-2 border-dashed border-calm-300 dark:border-slate-600 rounded-xl p-8 text-center bg-calm-50/50 dark:bg-slate-800/50">
            <div className="space-y-4">
              <Upload className="h-12 w-12 text-calm-400 mx-auto"/>
              <div>
                <p className="text-lg font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Paste your text or upload a file
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Supported formats: .txt, .pdf, .docx
                </p>
              </div>
              
              <div className="flex items-center justify-center space-x-4">
                <input type="file" accept=".txt,.pdf,.docx" onChange={handleFileUpload} className="hidden" id="file-upload"/>
                <label htmlFor="file-upload" className="btn-calm cursor-pointer">
                  Upload File
                </label>
              </div>
            </div>
          </div>

          {/* Text Area */}
          <Textarea placeholder="Or paste your text here..." value={content} onChange={(e) => setContent(e.target.value)} className="min-h-[200px] text-base leading-relaxed resize-none focus:ring-2 focus:ring-calm-500 border-calm-200 dark:border-slate-600"/>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between bg-slate-50 dark:bg-slate-800 p-4 rounded-xl">
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Reading Level:
              </label>
              <Select value={difficulty} onValueChange={setDifficulty}>
                <SelectTrigger className="w-[180px] bg-white dark:bg-slate-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-slate-700">
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="native">Native</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={handleSimplifyText} disabled={isProcessing || !content.trim()} className="btn-calm disabled:opacity-50 disabled:cursor-not-allowed">
              {isProcessing ? (<>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Processing...
                </>) : (<>
                  <Wand2 className="h-4 w-4 mr-2"/>
                  Simplify Text
                </>)}
            </Button>
          </div>
        </div>
      </Card>

      {/* Results Section */}
      {(simplifiedText || summary || definitions.length > 0 || quizQuestions.length > 0) && (<div className="grid md:grid-cols-2 gap-6">
          {/* Simplified Text */}
          {simplifiedText && (<Card className={`p-6 ${!isReducedMotion ? 'gentle-hover' : ''} border-sage-200 dark:border-slate-700 shadow-lg`}>
              <div className="flex items-center space-x-2 mb-4">
                <FileText className="h-5 w-5 text-sage-600 dark:text-sage-400"/>
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">Simplified Text</h3>
              </div>
              <div className={`p-4 bg-sage-50 dark:bg-slate-800 rounded-lg ${isFocusMode ? 'focus-highlight' : ''}`}>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{simplifiedText}</p>
              </div>
            </Card>)}

          {/* Summary */}
          {summary && (<Card className={`p-6 ${!isReducedMotion ? 'gentle-hover' : ''} border-sage-200 dark:border-slate-700 shadow-lg`}>
              <div className="flex items-center space-x-2 mb-4">
                <Brain className="h-5 w-5 text-sage-600 dark:text-sage-400"/>
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">Summary</h3>
              </div>
              <div className="p-4 bg-sage-50 dark:bg-slate-800 rounded-lg">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{summary}</p>
              </div>
            </Card>)}

          {/* Definitions */}
          {definitions.length > 0 && (<Card className={`p-6 ${!isReducedMotion ? 'gentle-hover' : ''} border-sage-200 dark:border-slate-700 shadow-lg`}>
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">Key Definitions</h3>
              <div className="space-y-2">
                {definitions.map((def, index) => (<div key={index} className="p-3 bg-sage-50 dark:bg-slate-800 rounded-lg">
                    <p className="text-slate-700 dark:text-slate-300">{def}</p>
                  </div>))}
              </div>
            </Card>)}

          {/* Quiz Questions */}
          {quizQuestions.length > 0 && (<Card className={`p-6 ${!isReducedMotion ? 'gentle-hover' : ''} border-sage-200 dark:border-slate-700 shadow-lg`}>
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">Practice Questions</h3>
              <div className="space-y-2">
                {quizQuestions.map((question, index) => (<div key={index} className="p-3 bg-sage-50 dark:bg-slate-800 rounded-lg">
                    <p className="text-slate-700 dark:text-slate-300">{question}</p>
                  </div>))}
              </div>
            </Card>)}
        </div>)}
    </div>);
};
