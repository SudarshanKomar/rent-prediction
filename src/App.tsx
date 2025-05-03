import React, { useState, useEffect } from 'react';
import { loadRentalListings } from './data/loader';
import { FilterSection } from './components/FilterSection';
import { ResultsSection } from './components/ResultsSection';
import { RentalListing, FilterState, ResultsState } from './types';
import { filterListings, getRecommendations } from './utils/helpers';
import { Building, Search, Home, MapPin, IndianRupee, MoveRight } from 'lucide-react';
import { Button } from './components/ui/Button';

function App() {
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [data, setData] = useState<RentalListing[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    rent: '',
    size: '',
    area: '',
    parking: '',
    preferredTenants: '',
  });
  const [results, setResults] = useState<ResultsState>({
    premium: null,
    decent: null,
    passable: null,
  });
  const [isFiltered, setIsFiltered] = useState<boolean>(false);
  const [showTenantFilter, setShowTenantFilter] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const listings = await loadRentalListings();
        setData(listings);
      } catch (err) {
        setError('Failed to load rental listings. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = () => {
    const filteredListings = filterListings(data, filters);
    const recommendations = getRecommendations(filteredListings);
    setResults(recommendations);
    setIsFiltered(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-100 to-indigo-100 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto mb-4"></div>
          <p className="text-indigo-800 font-medium">Loading rental listings...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-100 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white p-6 rounded-xl shadow-md max-w-md w-full">
          <div className="text-red-500 mb-4 flex justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2 text-center">Error</h2>
          <p className="text-gray-600 text-center">{error}</p>
        </div>
      </div>
    );
  }

  if (!showSearch) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-100 to-indigo-100">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex items-center">
                <Building className="h-8 w-8 text-indigo-600 mr-3" />
                <span className="text-xl font-bold text-gray-900">Bengaluru Rent Finder</span>
              </div>
              <div className="flex space-x-4">
                <a href="#about" className="text-gray-600 hover:text-gray-900">About</a>
                <a href="https://github.com/SudarshanKomar/rent-prediction" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">GitHub</a>
              </div>
            </div>
          </div>
        </nav>

        <main>
          {/* Hero Section */}
          <section className="py-20 px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                Find Your Perfect Rental in Bengaluru
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Smart recommendations based on your preferences, helping you discover the ideal home within your budget.
              </p>
              <Button
                onClick={() => setShowSearch(true)}
                size="lg"
                className="group"
              >
                Start Searching
                <Search className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </section>

          {/* How It Works */}
          <section className="py-16 bg-white" id="about">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                How It Works
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="bg-indigo-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Home className="h-8 w-8 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Choose Preferences</h3>
                  <p className="text-gray-600">Select your desired location, budget, and property type</p>
                </div>
                <div className="text-center">
                  <div className="bg-indigo-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Search className="h-8 w-8 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">View Matches</h3>
                  <p className="text-gray-600">Browse through properties that match your criteria</p>
                </div>
                <div className="text-center">
                  <div className="bg-indigo-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <IndianRupee className="h-8 w-8 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Get Estimates</h3>
                  <p className="text-gray-600">See rent estimates across different tiers</p>
                </div>
                <div className="text-center">
                  <div className="bg-indigo-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <MoveRight className="h-8 w-8 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Plan Your Move</h3>
                  <p className="text-gray-600">Choose the best option and plan your relocation</p>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="bg-gray-50 border-t">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact & Links</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="mailto:sudukomar@gmail.com" className="text-gray-600 hover:text-gray-900">
                      sudukomar@gmail.com
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/SudarshanKomar/rent-prediction"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-gray-900"
                    >
                      GitHub Repository
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Credits & Disclaimer</h3>
                <p className="text-gray-600">
                This project is built for educational and demonstration purposes only.
                The data entries are subject to change over time and may differ from actual current listings.
                The developer makes no claim of affiliation with any real estate platform.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-indigo-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Building className="h-8 w-8 text-indigo-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Bengaluru Rent Finder</h1>
            </div>
            <Button
              variant="secondary"
              onClick={() => setShowSearch(false)}
            >
              Back to Home
            </Button>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <FilterSection 
          data={data}
          filters={filters}
          setFilters={setFilters}
          onSearch={handleSearch}
          showTenantFilter={showTenantFilter}
          setShowTenantFilter={setShowTenantFilter}
        />
        
        <ResultsSection 
          results={results}
          isFiltered={isFiltered}
        />
      </main>
      
      <footer className="bg-white mt-12">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            © 2025 Bengaluru Rent Finder. All data is for demonstration purposes only.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App