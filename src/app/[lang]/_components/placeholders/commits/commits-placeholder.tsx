'use client';
import React from 'react';

export const CommitsPlaceholder: React.FC = () => {
  return (
    <div
      dir="ltr"
      role="status"
      className="md:w-3/5 w-full h-96 rounded-xl animate-pulse dark:bg-dark-300 bg-light-300 border-[5px] dark:border-dark-300 border-light-300 overflow-y-auto flex flex-wrap gap-3 p-2"
    >
      <div className="flex w-full h-10 gap-x-4">
        <div className="h-10 dark:bg-light-100/20 bg-dark-100/20 rounded-lg w-2/3"></div>
        <div className="h-10 dark:bg-light-100/20 bg-dark-100/20 rounded-lg w-1/3"></div>
      </div>
      <div className="h-20 dark:bg-light-100/20 bg-dark-100/20 rounded-lg w-full"></div>
      <div className="h-20 dark:bg-light-100/20 bg-dark-100/20 rounded-lg w-full"></div>
      <div className="h-20 dark:bg-light-100/20 bg-dark-100/20 rounded-lg w-full"></div>
      <div className="h-20 dark:bg-light-100/20 bg-dark-100/20 rounded-lg w-full"></div>
    </div>
  );
};
