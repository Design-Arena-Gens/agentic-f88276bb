"use client";
import { create } from 'zustand';

export type Entry =
  | { id: string; type: 'weight'; weight: number; date: string; notes?: string }
  | { id: string; type: 'workout'; activity: string; duration: number; intensity: 'low'|'moderate'|'high'; date: string; notes?: string }
  | { id: string; type: 'health'; metric: 'sleep'|'water'|'steps'; value: number; date: string; notes?: string };

type State = {
  entries: Entry[];
  addEntry: (partial: Omit<Entry, 'id'>) => void;
  removeEntry: (id: string) => void;
  importData: (data: Entry[]) => void;
  clearAll: () => void;
};

const STORAGE_KEY = 'health_sport_data_v1';

function load(): Entry[]{
  if (typeof window === 'undefined') return [];
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if(!raw) return [];
    const parsed = JSON.parse(raw);
    if(!Array.isArray(parsed)) return [];
    return parsed;
  }catch{
    return [];
  }
}

function save(entries: Entry[]){
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

export const useStore = create<State>((set, get) => ({
  entries: [],
  addEntry: (partial) => set(() => {
    const entry: Entry = { ...partial, id: crypto.randomUUID() } as Entry;
    const next = [...get().entries, entry];
    save(next);
    return { entries: next };
  }),
  removeEntry: (id) => set(()=>{
    const next = get().entries.filter(e=>e.id !== id);
    save(next);
    return { entries: next };
  }),
  importData: (data) => set(()=>{
    save(data);
    return { entries: data };
  }),
  clearAll: () => set(()=>{
    save([]);
    return { entries: [] };
  })
}));

// hydrate from localStorage on first client mount
if (typeof window !== 'undefined'){
  const initial = load();
  useStore.setState({ entries: initial });
}
