import { useState, useEffect } from 'react'
import SearchBar from './SearchBar'
import RecipeCard from './RecipeCard'
import EmptyState from './EmptyState'
import LoadingSpinner from './LoadingSpinner'

const RecipeFinder = () => {
  const [ingredient, setIngredient] = useState('')
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [hasSearched, setHasSearched] = useState(false)

  /**
   * Fetches recipes from TheMealDB API based on the ingredient
   * @param {string} ingredientQuery - The ingredient to search for
   */
  const searchRecipes = async (ingredientQuery) => {
    if (!ingredientQuery.trim()) {
      setError('Please enter an ingredient')
      return
    }

    setLoading(true)
    setError(null)
    setHasSearched(true)

    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(ingredientQuery.trim())}`
      )

      if (!response.ok) {
        throw new Error('Failed to fetch recipes')
      }

      const data = await response.json()

      // The API returns null meals array if no results
      if (data.meals === null) {
        setRecipes([])
      } else {
        setRecipes(data.meals)
      }
    } catch (err) {
      setError('Unable to fetch recipes. Please check your internet connection and try again.')
      setRecipes([])
      console.error('Error fetching recipes:', err)
    } finally {
      setLoading(false)
    }
  }

  /**
   * Handles search submission
   */
  const handleSearch = () => {
    searchRecipes(ingredient)
  }

  /**
   * Handles search on Enter key press
   */
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          🍳 Recipe Finder
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover delicious recipes based on ingredients you have at home. 
          Perfect for busy professionals who want quick cooking inspiration.
        </p>
      </header>

      {/* Search Section */}
      <div className="mb-12">
        <SearchBar
          ingredient={ingredient}
          setIngredient={setIngredient}
          onSearch={handleSearch}
          onKeyPress={handleKeyPress}
          loading={loading}
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-8 bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-red-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      )}

      {/* Loading Spinner */}
      {loading && <LoadingSpinner />}

      {/* Empty State */}
      {!loading && hasSearched && recipes.length === 0 && !error && (
        <EmptyState 
          ingredient={ingredient} 
          onPopularClick={(popularIngredient) => {
            setIngredient(popularIngredient)
            searchRecipes(popularIngredient)
          }}
        />
      )}

      {/* Recipe Grid */}
      {!loading && recipes.length > 0 && (
        <>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              Found {recipes.length} {recipes.length === 1 ? 'recipe' : 'recipes'} 
              {ingredient && ` with ${ingredient}`}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.idMeal} recipe={recipe} />
            ))}
          </div>
        </>
      )}

      {/* Tips Section */}
      {recipes.length > 0 && (
        <div className="mt-12 bg-blue-50 border-l-4 border-blue-400 p-4 rounded-md">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div>
              <h3 className="text-blue-800 font-semibold mb-1">Cooking Tip</h3>
              <p className="text-blue-700 text-sm">
                Click on a recipe card to view detailed instructions, ingredients list, and cooking time.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default RecipeFinder
