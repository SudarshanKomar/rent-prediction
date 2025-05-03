import React from 'react';
import { RentalListing } from '../types';
import { formatCurrency } from '../utils/helpers';
import { Home, IndianRupee, Briefcase, MapPin, Car } from 'lucide-react';

interface RentalCardProps {
  listing: RentalListing;
  tier: 'premium' | 'decent' | 'passable';
}

export const RentalCard: React.FC<RentalCardProps> = ({ listing, tier }) => {
  const tierConfigs = {
    premium: {
      title: 'Premium',
      bgGradient: 'from-purple-500 to-indigo-600',
      iconColor: 'text-indigo-200',
    },
    decent: {
      title: 'Decent',
      bgGradient: 'from-blue-500 to-cyan-600',
      iconColor: 'text-blue-200',
    },
    passable: {
      title: 'Passable',
      bgGradient: 'from-green-500 to-emerald-600',
      iconColor: 'text-green-200',
    },
  };

  const config = tierConfigs[tier];
  
  // Map parking codes to human-readable text
  const parkingMap: Record<string, string> = {
    'nop': 'No Parking',
    '2w': 'Two-Wheeler',
    '4w': 'Four-Wheeler',
  };

  return (
    <div className="overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl bg-white">
      <div className={`px-4 py-3 bg-gradient-to-r ${config.bgGradient} text-white`}>
        <h3 className="text-lg font-bold">{config.title} Option</h3>
      </div>
      
      <div className="p-5">
        <div className="mb-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <IndianRupee className={`h-5 w-5 ${config.iconColor}`} />
            <h4 className="text-2xl font-bold text-gray-800">
              {formatCurrency(listing.Rent)} <span className="text-sm font-normal text-gray-500">/month</span>
            </h4>
          </div>
          <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
            {formatCurrency(listing.Deposit)} deposit
          </span>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center">
            <Home className="h-4 w-4 text-gray-500 mr-2" />
            <span className="text-gray-800">
              {listing.Size} · {listing['Build Up']} · {listing.Furnishing}
            </span>
          </div>
          
          <div className="flex items-center">
            <MapPin className="h-4 w-4 text-gray-500 mr-2" />
            <span className="text-gray-800 capitalize">
              {listing.Area.replace('_', ' ')}
            </span>
          </div>
          
          <div className="flex items-center">
            <Car className="h-4 w-4 text-gray-500 mr-2" />
            <span className="text-gray-800">
              {parkingMap[listing.Parking] || listing.Parking}
            </span>
          </div>
          
          <div className="flex items-center">
            <Briefcase className="h-4 w-4 text-gray-500 mr-2" />
            <span className="text-gray-800">
              {listing['Preferred Tenants']}
            </span>
          </div>
        </div>
        
        <div className="mt-4 text-sm text-gray-600">
          <span className="font-medium">Available:</span> {listing['Available From']}
        </div>
      </div>
    </div>
  );
};