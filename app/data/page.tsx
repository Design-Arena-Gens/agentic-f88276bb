"use client";
import { useStore } from "@/lib/store";

export default function DataPage(){
  const { entries, importData, clearAll } = useStore();

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(entries, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `health-data-${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const onImport = async (file: File) => {
    const text = await file.text();
    try{
      const data = JSON.parse(text);
      if(!Array.isArray(data)) throw new Error('Invalid file');
      importData(data);
      alert('Data imported successfully');
    }catch(err){
      alert('Failed to import: ' + (err as Error).message);
    }
  };

  return (
    <div className="grid">
      <section className="card" style={{gridColumn:'span 12'}}>
        <h3>Data management</h3>
        <div className="row" style={{marginBottom:12}}>
          <button className="button" onClick={exportJson}>Export JSON</button>
          <label className="button secondary" style={{display:'inline-block', cursor:'pointer'}}>
            Import JSON
            <input type="file" accept="application/json" style={{display:'none'}} onChange={(e)=>{const f=e.target.files?.[0]; if(f) onImport(f)}}/>
          </label>
          <button className="button danger" onClick={()=>{ if(confirm('This will delete all data. Continue?')) clearAll(); }}>Clear all data</button>
        </div>
        <div className="badge">{entries.length} entries stored locally</div>
      </section>
    </div>
  );
}
