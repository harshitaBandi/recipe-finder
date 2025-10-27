import { useState } from 'react'
import RecipeFinder from './components/RecipeFinder'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
      <RecipeFinder />
    </div>
  )
}

export default App
