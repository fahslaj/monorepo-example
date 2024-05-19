import { Suspense } from 'react';
import { PlaceholderPage } from '@monorepo-example/ui-placeholder-page';
import { default as Remote1 } from 'remote-1/Module';
import { default as Remote2 } from 'remote-2/Module';
import { default as Remote3 } from 'remote-3/Module';

import { Route, Routes } from 'react-router-dom';

export function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="p-4 py-2 text-slate-100 bg-slate-900 shadow">
        <div className="flex items-center gap-4 w-full md:max-w-5xl ">
          <div className="flex items-center">
            <a className="flex items-center gap-2" href="/">
              <span className="text-lg font-semibold">Demo</span>
            </a>
          </div>
          <nav className="hidden md:flex gap-4 flex-1">
            <a className="text-slate-300 hover:text-white" href="/remote-1">
              Remote 1
            </a>
            <a className="text-slate-300 hover:text-white" href="/remote-2">
              Remote 2
            </a>
            <a className="text-slate-300 hover:text-white" href="/remote-3">
              Remote 3
            </a>
          </nav>
          <div className="flex gap-2">
            <button className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 border-slate-300 rounded-md hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:border-slate-800">
              Sign In
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Sign Up
            </button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<PlaceholderPage title="Home" />} />
            <Route path="/remote-1" element={<Remote1 />} />
            <Route path="/remote-2" element={<Remote2 />} />
            <Route path="/remote-3" element={<Remote3 />} />
          </Routes>
        </Suspense>
      </main>
      <footer className="flex w-ful lgap-4 text-slate-200 bg-slate-800 text-white p-4">
        <ul className="flex-1">
          <li>About</li>
          <li>Press Release</li>
          <li>Careers</li>
        </ul>
        <ul className="flex-1">
          <li>Sitemap</li>
        </ul>
      </footer>
    </div>
  );
}

export default App;
