'use client';
import React from 'react';

export const CommitsPlaceholder: React.FC = () => {
  return (
    <div
      role="status"
      className="md:w-3/5 w-full h-96 rounded-xl animate-pulse dark:bg-dark-300 bg-light-300 border-[5px] dark:border-dark-300 border-light-300 overflow-y-auto flex flex-wrap gap-3 p-2"
    >
      <div className="flex flex-col lg:flex-row w-full lg:h-10 h-20 gap-x-4 gap-y-4">
        <div className="h-10 dark:bg-light-100/20 bg-dark-100/20 rounded-lg lg:w-2/3 w-full"></div>
        <div className="h-10 dark:bg-light-100/20 bg-dark-100/20 rounded-lg lg:w-1/3 w-full"></div>
      </div>
      <div className="h-20 dark:bg-light-100/20 bg-dark-100/20 rounded-lg w-full"></div>
      <div className="h-20 dark:bg-light-100/20 bg-dark-100/20 rounded-lg w-full"></div>
      <div className="h-20 dark:bg-light-100/20 bg-dark-100/20 rounded-lg w-full"></div>
      <div className="h-20 dark:bg-light-100/20 bg-dark-100/20 rounded-lg w-full"></div>
    </div>
  );
};

export const CommitActivityPlaceholder: React.FC = () => {
  return (
    <div role="status" className="w-full h-96 rounded-xl animate-pulse overflow-y-auto gap-3 flex flex-col">
      <div className="h-10 dark:bg-light-100/20 bg-dark-100/20 rounded-lg w-full"></div>
      <div className="w-full flex h-full gap-x-3">
        <div className="h-full dark:bg-light-100/20 bg-dark-100/20 rounded-lg w-1/2"></div>
        <div className="h-full dark:bg-light-100/20 bg-dark-100/20 rounded-lg w-1/2"></div>
      </div>
    </div>
  );
};
