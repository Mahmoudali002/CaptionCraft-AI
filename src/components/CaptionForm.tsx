"use client";

import {useState} from 'react';
import {generateCaptions} from '@/ai/flows/generate-captions';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {useToast} from '@/hooks/use-toast';
import {useCaptionStore} from '@/store/captionStore';

export function CaptionForm() {
  const [theme, setTheme] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [tone, setTone] = useState('');
  const [platform, setPlatform] = useState<'Instagram' | 'X' | 'LinkedIn' | 'Facebook'>('Instagram');
  const {setCaptions} = useCaptionStore();
  const {toast} = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await generateCaptions({theme, targetAudience, tone, platform});
      setCaptions(result.captions);
      toast({
        title: 'Captions generated!',
        description: 'Your captions are ready to be copied and saved.',
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error generating captions.',
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
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
      <Button type="submit" disabled={loading}>
        {loading ? 'Generating...' : 'Generate Captions'}
      </Button>
    </form>
  );
}

