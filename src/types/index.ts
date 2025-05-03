export interface RentalListing {
  Rent: string;
  Deposit: string;
  Furnishing: string;
  Size: string;
  'Preferred Tenants': string;
  'Available From': string;
  'Build Up': string;
  Area: string;
  Parking: string;
}

export interface FilterState {
  rent: string;
  size: string;
  area: string;
  parking: string;
  preferredTenants: string;
}

export interface ResultsState {
  premium: RentalListing | null;
  decent: RentalListing | null;
  passable: RentalListing | null;
}