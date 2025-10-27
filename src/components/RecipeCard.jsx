import { useState } from 'react'
import RecipeModal from './RecipeModal'

const RecipeCard = ({ recipe }) => {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <div
        className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-1 transition-transform"
        onClick={() => setShowModal(true)}
      >
        <div className="relative">
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-full">
            <span className="text-xs font-semibold text-gray-700">ID: {recipe.idMeal}</span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
            {recipe.strMeal}
          </h3>
          <button className="text-primary-600 font-medium hover:text-primary-700 flex items-center">
            View Recipe
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      
      {showModal && (
        <RecipeModal
          mealId={recipe.idMeal}
          mealName={recipe.strMeal}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  )
}

export default RecipeCard
