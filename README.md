Recipe Finder 🍳
What I Built

- **Search by ingredient** - Just type what you have and find recipes
- **Recipe cards** - Browse results in a clean grid with images  
- **Detailed view** - Click any recipe to see full ingredients, measurements, and step-by-step instructions
- **Responsive design** - Works on phone, tablet, and desktop
- **Error handling** - Shows helpful messages when things go wrong or no results found
- **Loading states** - Keeps users informed while fetching data

## Tech Stack
- **React** - because it's what I'm most comfortable with
- **Vite** - for fast development and quick builds
- **Tailwind CSS** - saves time styling without writing custom CSS
- **TheMealDB API** - free recipe database that returns JSON

Using React hooks for state management since it's built-in and doesn't need extra libraries.
You'll need Node.js installed. Then:

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open `http://localhost:5173` in your browser and you're good to go.

To build for production:
npm run build
npm run preview

## Project Structure
I kept it simple with a component-based structure:

src/components/
RecipeFinder.jsx    # Main logic - handles API calls and state
SearchBar.jsx       # Search input and button
RecipeCard.jsx      # Individual recipe cards
RecipeModal.jsx     # Popup with full recipe details
EmptyState.jsx      # What shows when no results
LoadingSpinner.jsx  # Loading animation
App.jsx
index.css

I separated components by responsibility - each one has a single clear job.
1. Type an ingredient (chicken, eggs, onion, etc.)
2. Hit search or press Enter
3. Browse the recipe cards
4. Click any card to see full details

The detailed view shows everything - ingredients with measurements, cooking instructions, category, and sometimes a YouTube link if the recipe has one.

## Challenges & Solutions

1.Problem: The API's filter endpoint only returns basic info (name, image, ID).  
Solution: Made a second API call when user clicks a card to get full details.

2.Problem: Some ingredients don't have recipes (like "potato" or "pasta" returns null).  
Solution: Tested ingredients beforehand and updated suggestions to show ones that actually work. Also added helpful empty state messages.

3.Problem: Ingredients are returned as strIngredient1, strIngredient2, etc.  
Solution: Wrote a small loop function to parse through and pair them with measurements.

4.Problem: Making it work well on mobile.  
Solution: Used Tailwind's responsive utilities with mobile-first approach. Grid adapts from 1 column (mobile) to 3 columns (desktop).

## API Endpoints Used
[TheMealDB API](https://www.themealdb.com/api.php) 
- Search: `https://www.themealdb.com/api/json/v1/1/filter.php?i={ingredient}`
- Details: `https://www.themealdb.com/api/json/v1/1/lookup.php?i={mealId}`

Finally ->
Tested on Chrome, Firefox, and Safari. Should work on Edge too.
Built as part of a take-home challenge submission for Full stack Devloper Position at Aganitha