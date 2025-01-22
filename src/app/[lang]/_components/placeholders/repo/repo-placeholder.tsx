'use client';
import React from 'react';

export const RepoPlaceholder: React.FC = () => {
  return (
    <div
      dir="ltr"
      role="status"
      className="border-[10px] border-dark-300 space-y-2.5 pr-2 animate-pulse w-2/5 h-96 rounded-xl bg-dark-300 overflow-auto"
    >
      <div className="h-24 dark:bg-light-100/20 rounded-2xl w-full"></div>
      <div className="h-24 dark:bg-light-100/20 rounded-2xl w-full"></div>
      <div className="h-24 dark:bg-light-100/20 rounded-2xl w-full"></div>
      <div className="h-24 dark:bg-light-100/20 rounded-2xl w-full"></div>
    </div>
  );
};
