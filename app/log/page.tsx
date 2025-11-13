"use client";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { formatISO } from "date-fns";
import clsx from "clsx";

export default function LogPage(){
  const { addEntry } = useStore();
  const [tab, setTab] = useState<'weight'|'workout'| 'health'>('weight');

  return (
    <div className="grid">
      <section className="card" style={{gridColumn:"span 12"}}>
        <div className="row" style={{marginBottom:12}}>
          <button className={clsx('button', tab==='weight' && 'secondary')} onClick={()=>setTab('weight')}>Weight</button>
          <button className={clsx('button', tab==='workout' && 'secondary')} onClick={()=>setTab('workout')}>Workout</button>
          <button className={clsx('button', tab==='health' && 'secondary')} onClick={()=>setTab('health')}>Health</button>
        </div>
        {tab==='weight' && <WeightForm onAdd={addEntry} />}
        {tab==='workout' && <WorkoutForm onAdd={addEntry} />}
        {tab==='health' && <HealthForm onAdd={addEntry} />}
      </section>
    </div>
  );
}

function WeightForm({ onAdd }:{ onAdd: (partial: any) => void }){
  const [weight, setWeight] = useState<string>("");
  const [date, setDate] = useState<string>(()=>formatISO(new Date()).slice(0,16));
  const [notes, setNotes] = useState("");
  return (
    <form
      onSubmit={(e)=>{e.preventDefault(); if(!weight) return; onAdd({ type:'weight', weight: parseFloat(weight), date: new Date(date).toISOString(), notes }); setWeight("");}}
      className="grid" style={{gridTemplateColumns:'repeat(12,1fr)', gap:12}}
    >
      <div style={{gridColumn:'span 3'}}>
        <label>Weight (kg)</label>
        <input className="input" type="number" step="0.1" value={weight} onChange={e=>setWeight(e.target.value)} />
      </div>
      <div style={{gridColumn:'span 4'}}>
        <label>Date & time</label>
        <input className="input" type="datetime-local" value={date} onChange={e=>setDate(e.target.value)} />
      </div>
      <div style={{gridColumn:'span 5'}}>
        <label>Notes</label>
        <input className="input" value={notes} onChange={e=>setNotes(e.target.value)} placeholder="Optional" />
      </div>
      <div style={{gridColumn:'span 12'}}>
        <button className="button" type="submit">Add weight</button>
      </div>
    </form>
  );
}

function WorkoutForm({ onAdd }:{ onAdd: (partial: any) => void }){
  const [activity, setActivity] = useState('Run');
  const [duration, setDuration] = useState('30');
  const [intensity, setIntensity] = useState<'low'|'moderate'|'high'>('moderate');
  const [date, setDate] = useState<string>(()=>formatISO(new Date()).slice(0,16));
  const [notes, setNotes] = useState('');

  return (
    <form
      onSubmit={(e)=>{e.preventDefault(); onAdd({ type:'workout', activity, duration: parseFloat(duration), intensity, date: new Date(date).toISOString(), notes });}}
      className="grid" style={{gridTemplateColumns:'repeat(12,1fr)', gap:12}}
    >
      <div style={{gridColumn:'span 3'}}>
        <label>Activity</label>
        <input className="input" value={activity} onChange={e=>setActivity(e.target.value)} placeholder="e.g., Run, Cycle" />
      </div>
      <div style={{gridColumn:'span 3'}}>
        <label>Duration (min)</label>
        <input className="input" type="number" value={duration} onChange={e=>setDuration(e.target.value)} />
      </div>
      <div style={{gridColumn:'span 3'}}>
        <label>Intensity</label>
        <select className="input" value={intensity} onChange={e=>setIntensity(e.target.value as any)}>
          <option value="low">Low</option>
          <option value="moderate">Moderate</option>
          <option value="high">High</option>
        </select>
      </div>
      <div style={{gridColumn:'span 3'}}>
        <label>Date & time</label>
        <input className="input" type="datetime-local" value={date} onChange={e=>setDate(e.target.value)} />
      </div>
      <div style={{gridColumn:'span 9'}}>
        <label>Notes</label>
        <input className="input" value={notes} onChange={e=>setNotes(e.target.value)} placeholder="Optional" />
      </div>
      <div style={{gridColumn:'span 3'}}>
        <label>&nbsp;</label>
        <button className="button" type="submit" style={{width:'100%'}}>Add workout</button>
      </div>
    </form>
  );
}

function HealthForm({ onAdd }:{ onAdd: (partial: any) => void }){
  const [metric, setMetric] = useState<'sleep'|'water'|'steps'>('sleep');
  const [value, setValue] = useState('7');
  const [date, setDate] = useState<string>(()=>formatISO(new Date()).slice(0,16));
  const [notes, setNotes] = useState('');

  return (
    <form
      onSubmit={(e)=>{e.preventDefault(); onAdd({ type:'health', metric, value: parseFloat(value), date: new Date(date).toISOString(), notes });}}
      className="grid" style={{gridTemplateColumns:'repeat(12,1fr)', gap:12}}
    >
      <div style={{gridColumn:'span 3'}}>
        <label>Metric</label>
        <select className="input" value={metric} onChange={e=>setMetric(e.target.value as any)}>
          <option value="sleep">Sleep (hours)</option>
          <option value="water">Water (liters)</option>
          <option value="steps">Steps (k)</option>
        </select>
      </div>
      <div style={{gridColumn:'span 3'}}>
        <label>Value</label>
        <input className="input" type="number" step="0.1" value={value} onChange={e=>setValue(e.target.value)} />
      </div>
      <div style={{gridColumn:'span 3'}}>
        <label>Date & time</label>
        <input className="input" type="datetime-local" value={date} onChange={e=>setDate(e.target.value)} />
      </div>
      <div style={{gridColumn:'span 3'}}>
        <label>&nbsp;</label>
        <button className="button" type="submit" style={{width:'100%'}}>Add health</button>
      </div>
      <div style={{gridColumn:'span 12'}}>
        <label>Notes</label>
        <input className="input" value={notes} onChange={e=>setNotes(e.target.value)} placeholder="Optional" />
      </div>
    </form>
  );
}
