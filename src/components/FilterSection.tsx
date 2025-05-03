import React from 'react';
import { RentalListing, FilterState } from '../types';
import { SelectBox } from './ui/SelectBox';
import { Button } from './ui/Button';
import { getUniqueValues, getRentRanges } from '../utils/helpers';
import { Filter, Users } from 'lucide-react';

interface FilterSectionProps {
  data: RentalListing[];
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  onSearch: () => void;
  showTenantFilter: boolean;
  setShowTenantFilter: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FilterSection: React.FC<FilterSectionProps> = ({
  data,
  filters,
  setFilters,
  onSearch,
  showTenantFilter,
  setShowTenantFilter,
}) => {
  // Get unique values for each filter
  const rentRanges = getRentRanges(data);
  const sizes = getUniqueValues(data, 'Size');
  const areas = getUniqueValues(data, 'Area');
  const parkingOptions = getUniqueValues(data, 'Parking');
  const tenantOptions = getUniqueValues(data, 'Preferred Tenants');
  
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };
  
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="h-5 w-5 text-indigo-600" />
        <h2 className="text-xl font-bold text-gray-800">Find Your Perfect Rental</h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <SelectBox
          label="Rent Range (₹)"
          name="rent"
          options={rentRanges}
          value={filters.rent}
          onChange={handleChange}
          placeholder="Select rent range"
        />
        
        <SelectBox
          label="Size"
          name="size"
          options={sizes}
          value={filters.size}
          onChange={handleChange}
          placeholder="Select size"
        />
        
        <SelectBox
          label="Area"
          name="area"
          options={areas}
          value={filters.area}
          onChange={handleChange}
          placeholder="Select area"
        />
        
        <SelectBox
          label="Parking"
          name="parking"
          options={parkingOptions}
          value={filters.parking}
          onChange={handleChange}
          placeholder="Select parking"
        />
      </div>
      
      {showTenantFilter && (
        <div className="mt-4 mb-4">
          <SelectBox
            label="Preferred Tenants"
            name="preferredTenants"
            options={tenantOptions}
            value={filters.preferredTenants}
            onChange={handleChange}
            placeholder="Select tenant type"
          />
        </div>
      )}
      
      <div className="flex flex-col sm:flex-row gap-3 justify-between items-center mt-6">
        <Button
          type="button"
          variant="secondary"
          size="default"
          onClick={() => setShowTenantFilter(!showTenantFilter)}
          className="w-full sm:w-auto flex items-center justify-center gap-2"
        >
          <Users className="h-4 w-4" />
          {showTenantFilter ? 'Hide Tenant Filter' : 'Show Tenant Filter'}
        </Button>
        
        <Button
          type="button"
          onClick={onSearch}
          className="w-full sm:w-auto"
        >
          Search Rentals
        </Button>
      </div>
    </div>
  );
};