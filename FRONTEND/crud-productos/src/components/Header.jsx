import { Link } from "react-router"

export default function Header() {
  return (
    <nav className="py-5 mb-8 border-b border-gray-100 shadow-sm">
        <div className="container mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8">
            <Link to="/" className="text-3xl font-bold bg-gradient-to-r from-sky-800 to-sky-600 bg-clip-text text-transparent">Productos App</Link>
            <div>
                <Link 
                  to="/nuevo-producto" 
                  className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Nuevo Producto
                </Link>
            </div>
        </div>
    </nav>
  )
}
