"use client";
import { useStore } from "@/lib/store";
import { format } from "date-fns";

export default function EntriesPage(){
  const { entries, removeEntry } = useStore();
  const ordered = [...entries].sort((a,b)=>b.date.localeCompare(a.date));

  return (
    <div className="grid">
      <section className="card" style={{gridColumn:'span 12'}}>
        <h3>All entries</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Details</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {ordered.map((e)=> (
              <tr key={e.id}>
                <td>{format(new Date(e.date), 'PP p')}</td>
                <td><span className="badge">{e.type}</span></td>
                <td>
                  {e.type==='weight' && `${e.weight.toFixed(1)} kg`}
                  {e.type==='workout' && `${e.activity} ? ${e.duration} min ? ${e.intensity}`}
                  {e.type==='health' && `${e.metric}: ${e.value}`}
                  {e.notes ? ` ? ${e.notes}` : ''}
                </td>
                <td style={{textAlign:'right'}}>
                  <button className="button secondary" onClick={()=>removeEntry(e.id)}>Delete</button>
                </td>
              </tr>
            ))}
            {ordered.length===0 && (
              <tr><td colSpan={4} style={{color:'var(--muted)'}}>No entries yet.</td></tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}
