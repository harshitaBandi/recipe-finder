import { useState, useEffect } from 'react'

const RecipeModal = ({ mealId, mealName, onClose }) => {
  const [recipe, setRecipe] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    /**
     * Fetches detailed recipe information by meal ID
     */
    const fetchRecipeDetails = async () => {
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
        )

        if (!response.ok) {
          throw new Error('Failed to fetch recipe details')
        }

        const data = await response.json()

        if (data.meals && data.meals[0]) {
          setRecipe(data.meals[0])
        } else {
          setError('Recipe not found')
        }
      } catch (err) {
        setError('Unable to load recipe details')
        console.error('Error fetching recipe details:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchRecipeDetails()
  }, [mealId])

  /**
   * Parses ingredients and measurements from recipe object
   */
  const getIngredients = () => {
    if (!recipe) return []

    const ingredients = []
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`]
      const measure = recipe[`strMeasure${i}`]

      if (ingredient && ingredient.trim()) {
        ingredients.push({
          ingredient: ingredient.trim(),
          measure: measure ? measure.trim() : 'As needed'
        })
      }
    }
    return ingredients
  }

  // Handle modal backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">{mealName}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 p-6">
          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
            </div>
          )}

          {error && (
            <div className="text-center py-12">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          {recipe && !loading && (
            <div className="space-y-6">
              {/* Recipe Image */}
              <div className="relative">
                <img
                  src={recipe.strMealThumb}
                  alt={recipe.strMeal}
                  className="w-full h-64 object-cover rounded-lg shadow-md"
                />
              </div>

              {/* Category and Origin */}
              <div className="flex flex-wrap gap-3">
                {recipe.strCategory && (
                  <span className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium">
                    {recipe.strCategory}
                  </span>
                )}
                {recipe.strArea && (
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {recipe.strArea}
                  </span>
                )}
              </div>

              {/* Ingredients */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Ingredients</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {getIngredients().map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center p-2 bg-gray-50 rounded-lg"
                    >
                      <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                      <span className="text-gray-700">
                        <span className="font-medium">{item.ingredient}</span>
                        {item.measure !== 'As needed' && (
                          <span className="text-gray-500 ml-2">({item.measure})</span>
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Instructions */}
              {recipe.strInstructions && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Instructions</h3>
                  <div className="prose max-w-none">
                    {recipe.strInstructions.split(/\r?\n/).map((paragraph, index) => (
                      paragraph.trim() && (
                        <p key={index} className="text-gray-700 mb-3 leading-relaxed">
                          {paragraph.trim()}
                        </p>
                      )
                    ))}
                  </div>
                </div>
              )}

              {/* YouTube Link */}
              {recipe.strYoutube && (
                <div className="pt-4 border-t border-gray-200">
                  <a
                    href={recipe.strYoutube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    Watch on YouTube
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default RecipeModal
