import { RentalListing } from '../types';

/**
 * Gets unique values from an array of listings for a specific field
 */
export const getUniqueValues = (
  data: RentalListing[],
  field: keyof RentalListing
): string[] => {
  const values = new Set(data.map((item) => item[field]));
  return Array.from(values).sort();
};

/**
 * Gets rent ranges for the filter dropdown
 */
export const getRentRanges = (data: RentalListing[]): string[] => {
  const rents = data.map((item) => parseInt(item.Rent, 10)).filter(Boolean);
  if (rents.length === 0) return [];

  const min = Math.min(...rents);
  const max = Math.max(...rents);
  
  // Create ranges like "0-10000", "10001-20000", etc.
  const step = 10000;
  const ranges: string[] = [];
  
  for (let i = 0; i < max; i += step) {
    ranges.push(`${i}-${i + step}`);
  }
  
  return ranges;
};

/**
 * Filters rental listings based on user selections
 */
export const filterListings = (
  data: RentalListing[],
  filters: {
    rent: string;
    size: string;
    area: string;
    parking: string;
    preferredTenants: string;
  }
): RentalListing[] => {
  return data.filter((listing) => {
    // Filter by rent range
    if (filters.rent && !isInRentRange(listing.Rent, filters.rent)) {
      return false;
    }
    
    // Filter by size
    if (filters.size && listing.Size !== filters.size) {
      return false;
    }
    
    // Filter by area
    if (filters.area && listing.Area !== filters.area) {
      return false;
    }
    
    // Filter by parking
    if (filters.parking && listing.Parking !== filters.parking) {
      return false;
    }
    
    // Filter by preferred tenants
    if (filters.preferredTenants && !listing['Preferred Tenants'].includes(filters.preferredTenants)) {
      return false;
    }
    
    return true;
  });
};

/**
 * Checks if a rent value falls within a specified range
 */
const isInRentRange = (rentValue: string, rentRange: string): boolean => {
  const rent = parseInt(rentValue, 10);
  const [min, max] = rentRange.split('-').map((val) => parseInt(val, 10));
  return rent >= min && rent <= max;
};

/**
 * Gets recommendations from filtered listings
 */
export const getRecommendations = (
  filteredListings: RentalListing[]
): {
  premium: RentalListing | null;
  decent: RentalListing | null;
  passable: RentalListing | null;
} => {
  if (filteredListings.length === 0) {
    return { premium: null, decent: null, passable: null };
  }
  
  // Sort by rent (ascending)
  const sortedListings = [...filteredListings].sort(
    (a, b) => parseInt(a.Rent, 10) - parseInt(b.Rent, 10)
  );
  
  const passable = sortedListings[0] || null;
  const premium = sortedListings[sortedListings.length - 1] || null;
  
  // Get the median for decent
  let decent = null;
  if (sortedListings.length > 2) {
    const medianIndex = Math.floor(sortedListings.length / 2);
    decent = sortedListings[medianIndex];
  } else if (sortedListings.length === 2) {
    decent = sortedListings[1];
  } else {
    decent = passable; // Only one listing, use the same for all tiers
  }
  
  return { premium, decent, passable };
};

/**
 * Format currency values (rent/deposit)
 */
export const formatCurrency = (value: string): string => {
  const numValue = parseInt(value, 10);
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(numValue);
};