import { Link } from "react-router"

export default function Header() {
  return (
    <nav className="py-4 mb-2">
        <div className="container mx-auto flex justify-between items-center">
            <Link to="/" className="text-3xl font-bold">Productos App</Link>
            <div>
                <Link to="/nuevo-producto" className="bg-green-600 px-3 py-1 rounded-lg hover:bg-sky-700">Nuevo Producto</Link>
            </div>
        </div>
    </nav>
  )
}
