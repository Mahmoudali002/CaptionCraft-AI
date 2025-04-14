"use client";

import {useState} from 'react';
import {useCaptionStore} from '@/store/captionStore';
import {Button} from '@/components/ui/button';
import {Textarea} from '@/components/ui/textarea';
import {Copy, Save} from 'lucide-react';
import {useToast} from '@/hooks/use-toast';

export function CaptionList() {
  const {captions, setCaptions} = useCaptionStore();
  const {toast} = useToast();
  const [editingCaptionId, setEditingCaptionId] = useState<string | null>(null);
  const [editedCaption, setEditedCaption] = useState('');

  const handleCopy = (caption: string) => {
    navigator.clipboard.writeText(caption);
    toast({
      title: 'Caption copied!',
      description: 'The caption has been copied to your clipboard.',
    });
  };

  const handleSave = (caption: string) => {
    // Implement save functionality here, e.g., save to local storage or a database
    toast({
      title: 'Caption saved!',
      description: 'The caption has been saved for later use.',
    });
  };

  const handleRegenerate = (index: number) => {
    // Implement regenerate functionality, possibly by calling the AI API again
    toast({
      title: 'Regenerate caption',
      description: 'Feature coming soon...',
    });
  };

  const handleEdit = (id: string, caption: string) => {
    setEditingCaptionId(id);
    setEditedCaption(caption);
  };

  const handleSaveEdit = (index: number) => {
    const newCaptions = [...captions];
    newCaptions[index] = editedCaption;
    setCaptions(newCaptions);
    setEditingCaptionId(null);
    toast({
      title: 'Caption updated!',
      description: 'The caption has been updated successfully.',
    });
  };

  return (
    <div className="mt-4">
      {captions.length > 0 ? (
        <ul>
          {captions.map((caption, index) => (
            <li key={index} className="mb-4 p-4 border rounded-md">
              {editingCaptionId === String(index) ? (
                <div className="grid gap-2">
                  <Textarea
                    value={editedCaption}
                    onChange={(e) => setEditedCaption(e.target.value)}
                    className="mb-2"
                  />
                  <div className="flex justify-end space-x-2">
                    <Button size="sm" onClick={() => handleSaveEdit(index)}>
                      Save
                    </Button>
                    <Button size="sm" variant="secondary" onClick={() => setEditingCaptionId(null)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="grid gap-2">
                  <p>{caption}</p>
                  <div className="flex space-x-2">
                    <Button size="sm" onClick={() => handleCopy(caption)}>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                    <Button size="sm" onClick={() => handleSave(caption)}>
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleRegenerate(index)}>
                      Regenerate
                    </Button>
                    <Button size="sm" variant="secondary" onClick={() => handleEdit(String(index), caption)}>
                      Edit
                    </Button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No captions generated yet. Fill out the form and generate some captions!</p>
      )}
    </div>
  );
}
