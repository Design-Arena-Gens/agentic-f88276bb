import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Health & Sport Tracker',
  description: 'Track weight, workouts, and health metrics',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <div className="app">
          <header className="header">
            <div className="brand">Health & Sport</div>
            <nav className="nav">
              <a href="/">Dashboard</a>
              <a href="/log">Log</a>
              <a href="/data">Data</a>
            </nav>
          </header>
          <main className="main">{children}</main>
          <footer className="footer">? {new Date().getFullYear()} Health & Sport Tracker</footer>
        </div>
      </body>
    </html>
  );
}
