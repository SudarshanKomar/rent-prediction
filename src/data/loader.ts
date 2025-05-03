import Papa from 'papaparse';
import { RentalListing } from '../types';

/**
 * Loads rental listings from CSV file
 */
export const loadRentalListings = async (): Promise<RentalListing[]> => {
  try {
    const response = await fetch('/data/data.csv');
    const csvText = await response.text();
    
    const result = Papa.parse<RentalListing>(csvText, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: false, // Keep everything as strings
    });
    
    if (result.errors.length > 0) {
      console.error('CSV parsing errors:', result.errors);
    }
    
    return result.data;
  } catch (error) {
    console.error('Error loading rental listings:', error);
    return [];
  }
};