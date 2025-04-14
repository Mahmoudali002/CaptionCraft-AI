import {CaptionForm} from '@/components/CaptionForm';
import {CaptionList} from '@/components/CaptionList';
import {Toaster} from '@/components/ui/toaster';
import {AnalyzeCaption} from '@/components/AnalyzeCaption';

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">CaptionCraft AI</h1>
      <CaptionForm />
      <CaptionList />
      <AnalyzeCaption />
      <Toaster />
    </div>
  );
}
