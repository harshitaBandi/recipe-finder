const SearchBar = ({ ingredient, setIngredient, onSearch, onKeyPress, loading }) => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <input
            type="text"
            value={ingredient}
            onChange={(e) => setIngredient(e.target.value)}
            onKeyPress={onKeyPress}
            placeholder="Enter an ingredient (e.g., chicken, pasta, tomato)"
            className="w-full px-4 py-3 pr-12 border-2 border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 text-gray-700 transition-colors"
            disabled={loading}
          />
          <svg
            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <button
          onClick={onSearch}
          disabled={loading}
          className="px-8 py-3 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-200 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors shadow-md hover:shadow-lg"
        >
          {loading ? 'Searching...' : 'Find Recipes'}
        </button>
      </div>
      <p className="text-sm text-gray-500 mt-2 text-center">
        💡 Search any ingredient you have: "chicken" , "eggs", "onion", "tomato", "cheese", etc.
      </p>
    </div>
  )
}

export default SearchBar
