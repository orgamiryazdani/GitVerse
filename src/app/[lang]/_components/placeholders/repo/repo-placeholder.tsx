'use client';
import React from 'react';

export const RepoPlaceholder: React.FC = () => {
  return (
    <div
      dir="ltr"
      role="status"
      className="border-[10px] dark:border-dark-300 border-light-300 bg-light-300 space-y-2.5 pr-2 animate-pulse md:w-2/5 w-full h-96 rounded-xl dark:bg-dark-300 overflow-auto"
    >
      <div className="h-24 dark:bg-light-100/20 bg-dark-100/20 rounded-2xl w-full"></div>
      <div className="h-24 dark:bg-light-100/20 bg-dark-100/20 rounded-2xl w-full"></div>
      <div className="h-24 dark:bg-light-100/20 bg-dark-100/20 rounded-2xl w-full"></div>
      <div className="h-24 dark:bg-light-100/20 bg-dark-100/20 rounded-2xl w-full"></div>
    </div>
  );
};
