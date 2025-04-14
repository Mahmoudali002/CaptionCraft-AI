import {create} from 'zustand';

interface CaptionState {
  captions: string[];
  setCaptions: (captions: string[]) => void;
}

export const useCaptionStore = create<CaptionState>((set) => ({
  captions: [],
  setCaptions: (captions) => set({captions}),
}));
