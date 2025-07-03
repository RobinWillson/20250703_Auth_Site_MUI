import React from 'react';

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* A placeholder for a future navigation bar */ }
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-800">AuthSite Kodu</h1>
        </div>
      </header>

      <main className="py-8">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">{ children }</div>
      </main>
    </div>
  );
};

export default MainLayout;