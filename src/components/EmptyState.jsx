const EmptyState = ({ ingredient, onPopularClick }) => {
  return (
    <div className="text-center py-16">
      <div className="max-w-md mx-auto">
        <svg
          className="w-24 h-24 mx-auto text-gray-300 mb-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
        <h3 className="text-2xl font-semibold text-gray-700 mb-3">
          No recipes found
        </h3>
        <p className="text-gray-600 mb-6">
          We couldn't find any recipes with <span className="font-semibold">{ingredient}</span>.
          Try a different ingredient or check your spelling.
        </p>
        <div className="text-sm text-gray-500">
          <p className="mb-2">Try these popular ingredients:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {['chicken', 'beef', 'eggs', 'onion', 'flour', 'tomato', 'rice', 'salmon', 'cheese', 'pork'].map((item) => (
              <span
                key={item}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 cursor-pointer transition-colors"
                onClick={() => onPopularClick && onPopularClick(item)}
                title={`Search for ${item}`}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmptyState
