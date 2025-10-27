const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-500 mb-4"></div>
      <p className="text-gray-600 text-lg">Finding delicious recipes...</p>
    </div>
  )
}

export default LoadingSpinner
