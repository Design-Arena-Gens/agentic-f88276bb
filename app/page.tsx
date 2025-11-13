"use client";
import { useStore } from "@/lib/store";
import { format } from "date-fns";
import dynamic from "next/dynamic";
import { useMemo } from "react";

const Line = dynamic(() => import("@/components/WeightChart"), { ssr: false });

export default function DashboardPage() {
  const { entries } = useStore();

  const { latestWeight, weightDelta, totalWorkouts, totalDuration } = useMemo(() => {
    const weights = entries.filter((e) => e.type === "weight").sort((a,b)=>a.date.localeCompare(b.date));
    const latest = weights.at(-1)?.weight ?? 0;
    const prev = weights.at(-2)?.weight ?? latest;
    const delta = latest - prev;

    const workouts = entries.filter((e) => e.type === "workout");
    const duration = workouts.reduce((sum, w) => sum + (w.duration || 0), 0);

    return {
      latestWeight: latest,
      weightDelta: delta,
      totalWorkouts: workouts.length,
      totalDuration: duration,
    };
  }, [entries]);

  const recent = [...entries].sort((a,b)=>b.date.localeCompare(a.date)).slice(0,6);

  return (
    <div className="grid">
      <section className="card" style={{gridColumn:"span 12"}}>
        <h3>Weight trend</h3>
        <Line />
      </section>

      <section className="card" style={{gridColumn:"span 4"}}>
        <div className="stat">
          <div>
            <div className="value">{latestWeight ? latestWeight.toFixed(1) : "?"} kg</div>
            <div className="delta">{weightDelta === 0 ? "" : weightDelta > 0 ? `+${weightDelta.toFixed(1)} since last` : `${weightDelta.toFixed(1)} since last`}</div>
          </div>
          <span className="badge">Latest weight</span>
        </div>
      </section>

      <section className="card" style={{gridColumn:"span 4"}}>
        <div className="stat">
          <div>
            <div className="value">{totalWorkouts}</div>
            <div className="delta">Total logged workouts</div>
          </div>
          <span className="badge">Workouts</span>
        </div>
      </section>

      <section className="card" style={{gridColumn:"span 4"}}>
        <div className="stat">
          <div>
            <div className="value">{Math.round(totalDuration)} min</div>
            <div className="delta">Cumulative workout duration</div>
          </div>
          <span className="badge">Duration</span>
        </div>
      </section>

      <section className="card" style={{gridColumn:"span 12"}}>
        <h3>Recent activity</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {recent.map((e) => (
              <tr key={e.id}>
                <td>{format(new Date(e.date), 'PP p')}</td>
                <td><span className="badge">{e.type}</span></td>
                <td>
                  {e.type === 'weight' && `${e.weight?.toFixed(1)} kg`}
                  {e.type === 'workout' && `${e.activity} ? ${e.duration} min ? ${e.intensity}`}
                  {e.notes ? ` ? ${e.notes}` : ''}
                </td>
              </tr>
            ))}
            {recent.length === 0 && (
              <tr><td colSpan={3} style={{color:"var(--muted)"}}>No entries yet. Add some on the Log page.</td></tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}
