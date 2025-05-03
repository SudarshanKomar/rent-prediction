import React from 'react';
import { RentalListing, ResultsState } from '../types';
import { RentalCard } from './RentalCard';
import { Home, AlertCircle } from 'lucide-react';

interface ResultsSectionProps {
  results: ResultsState;
  isFiltered: boolean;
}

export const ResultsSection: React.FC<ResultsSectionProps> = ({
  results,
  isFiltered,
}) => {
  const hasResults = results.premium || results.decent || results.passable;
  
  if (!isFiltered) {
    return (
      <div className="text-center p-10 bg-white rounded-xl shadow-md">
        <Home className="mx-auto h-12 w-12 text-indigo-500 mb-4" />
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Welcome to Bengaluru Rent Finder
        </h3>
        <p className="text-gray-600 max-w-md mx-auto">
          Use the filters above to find rental properties that match your requirements in Bengaluru.
        </p>
      </div>
    );
  }
  
  if (isFiltered && !hasResults) {
    return (
      <div className="text-center p-10 bg-white rounded-xl shadow-md">
        <AlertCircle className="mx-auto h-12 w-12 text-amber-500 mb-4" />
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          No Matching Properties Found
        </h3>
        <p className="text-gray-600 max-w-md mx-auto">
          We couldn't find any properties matching your criteria. Try adjusting your filters.
        </p>
      </div>
    );
  }
  
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Recommended Properties</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.premium && (
          <RentalCard listing={results.premium} tier="premium" />
        )}
        {results.decent && (
          <RentalCard listing={results.decent} tier="decent" />
        )}
        {results.passable && (
          <RentalCard listing={results.passable} tier="passable" />
        )}
      </div>
    </div>
  );
};