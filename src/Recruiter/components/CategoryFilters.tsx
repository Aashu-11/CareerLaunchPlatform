
import React, { useState } from 'react';
import { Badge } from "../components/welcome page/ui/badge";
import { Button } from "../components/welcome page/ui/button";
import { Search, Filter } from 'lucide-react';
import { categories, companies } from '../lib/data';

interface CategoryFiltersProps {
  onCategoryChange: (category: string | null) => void;
  onCompanyChange: (company: string | null) => void;
  onSearchChange: (search: string) => void;
  selectedCategory: string | null;
  selectedCompany: string | null;
}

const CategoryFilters: React.FC<CategoryFiltersProps> = ({
  onCategoryChange,
  onCompanyChange,
  onSearchChange,
  selectedCategory,
  selectedCompany
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearchChange(value);
  };
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  
  return (
    <div className="w-full mb-8 animate-fade-in">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center">
          <h2 className="text-2xl md:text-3xl font-bold">
            Explore <span className="bg-gradient-purple-blue bg-clip-text text-transparent">Hackathons</span>
          </h2>
          <Badge className="ml-3 bg-hackohire-purple text-white font-medium">200+ Events</Badge>
        </div>
        
        <div className="flex items-center w-full md:w-auto">
          <div className="relative flex-grow md:flex-grow-0">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input 
              type="text" 
              placeholder="Search hackathons..." 
              className="pl-10 py-2 pr-4 rounded-full bg-white border border-gray-200 focus:ring-2 focus:ring-hackohire-purple/30 text-sm w-full md:w-64"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <Button 
            variant="outline" 
            size="icon" 
            className="ml-2 rounded-full border-gray-200"
            onClick={toggleFilters}
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Filter section */}
      <div className={`bg-white rounded-xl p-4 shadow-sm border border-gray-100 transition-all duration-300 ${
        showFilters ? 'max-h-[500px] opacity-100 mb-6' : 'max-h-0 opacity-0 overflow-hidden'
      }`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-sm text-gray-500 mb-3">Filter by Category</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge 
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className={`cursor-pointer ${
                    selectedCategory === category 
                      ? 'bg-hackohire-purple text-white' 
                      : 'bg-white hover:bg-gray-100'
                  }`}
                  onClick={() => onCategoryChange(selectedCategory === category ? null : category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-sm text-gray-500 mb-3">Filter by Hiring Company</h3>
            <div className="flex flex-wrap gap-2">
              {companies.slice(0, 8).map((company) => (
                <Badge 
                  key={company.id}
                  variant={selectedCompany === company.name ? "default" : "outline"}
                  className={`cursor-pointer ${
                    selectedCompany === company.name 
                      ? 'bg-hackohire-purple text-white' 
                      : 'bg-white hover:bg-gray-100'
                  }`}
                  onClick={() => onCompanyChange(selectedCompany === company.name ? null : company.name)}
                >
                  {company.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex justify-end mt-4">
          <Button 
            variant="ghost" 
            className="text-sm text-gray-500"
            onClick={() => {
              onCategoryChange(null);
              onCompanyChange(null);
              setSearchTerm('');
              onSearchChange('');
            }}
          >
            Clear All Filters
          </Button>
        </div>
      </div>
      
      {/* Active filters */}
      {(selectedCategory || selectedCompany || searchTerm) && (
        <div className="flex items-center flex-wrap gap-2 mb-6">
          <span className="text-sm text-gray-500">Active filters:</span>
          
          {selectedCategory && (
            <Badge 
              variant="secondary" 
              className="bg-gray-100 text-gray-800 flex items-center"
            >
              Category: {selectedCategory}
              <button 
                className="ml-1 text-gray-500 hover:text-gray-700"
                onClick={() => onCategoryChange(null)}
              >
                ×
              </button>
            </Badge>
          )}
          
          {selectedCompany && (
            <Badge 
              variant="secondary" 
              className="bg-gray-100 text-gray-800 flex items-center"
            >
              Company: {selectedCompany}
              <button 
                className="ml-1 text-gray-500 hover:text-gray-700"
                onClick={() => onCompanyChange(null)}
              >
                ×
              </button>
            </Badge>
          )}
          
          {searchTerm && (
            <Badge 
              variant="secondary" 
              className="bg-gray-100 text-gray-800 flex items-center"
            >
              Search: {searchTerm}
              <button 
                className="ml-1 text-gray-500 hover:text-gray-700"
                onClick={() => {
                  setSearchTerm('');
                  onSearchChange('');
                }}
              >
                ×
              </button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};

export default CategoryFilters;
