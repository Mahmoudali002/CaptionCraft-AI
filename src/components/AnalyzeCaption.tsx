"use client"; 

import {useState} from 'react';
import {analyzeCaptionPerformance} from '@/ai/flows/analyze-caption-performance';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {Textarea} from '@/components/ui/textarea';
import {useToast} from '@/hooks/use-toast';

export function AnalyzeCaption() {
  const [caption, setCaption] = useState('');
  const [platform, setPlatform] = useState<'Instagram' | 'X' | 'LinkedIn' | 'Facebook'>('Instagram');
  const [engagementMetrics, setEngagementMetrics] = useState('');
  const [theme, setTheme] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [tone, setTone] = useState('');
  const [suggestions, setSuggestions] = useState('');
  const {toast} = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await analyzeCaptionPerformance({
        caption,
        platform,
        engagementMetrics,
        theme,
        targetAudience,
        tone,
      });
      setSuggestions(result.suggestions);
      toast({
        title: 'Analysis Complete!',
        description: 'Suggestions for improvement are ready.',
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error analyzing caption.',
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Analyze Caption Performance</h2>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <div>
          <Label htmlFor="caption">Caption</Label>
          <Textarea
            id="caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Enter caption to analyze"
          />
        </div>
        <div>
          <Label htmlFor="platform">Platform</Label>
          <Select onValueChange={(value) => setPlatform(value as 'Instagram' | 'X' | 'LinkedIn' | 'Facebook')}>
            <SelectTrigger id="platform">
              <SelectValue placeholder="Select a platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Instagram">Instagram</SelectItem>
              <SelectItem value="X">X</SelectItem>
              <SelectItem value="LinkedIn">LinkedIn</SelectItem>
              <SelectItem value="Facebook">Facebook</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="engagementMetrics">Engagement Metrics</Label>
          <Input
            type="text"
            id="engagementMetrics"
            value={engagementMetrics}
            onChange={(e) => setEngagementMetrics(e.target.value)}
            placeholder="e.g., 100 likes, 20 comments"
          />
        </div>
        <div>
          <Label htmlFor="theme">Theme</Label>
          <Input
            type="text"
            id="theme"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            placeholder="e.g., Sustainable Living"
          />
        </div>
        <div>
          <Label htmlFor="targetAudience">Target Audience</Label>
          <Input
            type="text"
            id="targetAudience"
            value={targetAudience}
            onChange={(e) => setTargetAudience(e.target.value)}
            placeholder="e.g., Eco-conscious millennials"
          />
        </div>
        <div>
          <Label htmlFor="tone">Tone</Label>
          <Input
            type="text"
            id="tone"
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            placeholder="e.g., Funny, Professional"
          />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? 'Analyzing...' : 'Analyze Caption'}
        </Button>
      </form>
      {suggestions && (
        <div className="mt-4">
          <h3 className="text-lg font-bold mb-2">Suggestions:</h3>
          <p className="border rounded-md p-4">{suggestions}</p>
        </div>
      )}
    </div>
  );
}

