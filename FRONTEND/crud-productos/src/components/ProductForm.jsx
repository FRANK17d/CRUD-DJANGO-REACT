import { useEffect, useState } from "react"
import { createProduct, getProduct, updateProduct } from "../api/products";
import { useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";

export default function ProductForm() {

    const [product, setProduct] = useState({
        nombre: '',
        precio: 0,
        descripcion: ''
    });


    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        const loadProducts = async() => {
            if (params.id) {
                const response = await getProduct(params.id)
                setProduct(response.data)
            }
        }
        loadProducts()
    }, [params.id])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (params.id) {
            await updateProduct(params.id, product)
            toast.success('Producto modificado con éxito')
        } else {
            await createProduct(product)
            toast.success('Producto creado con éxito')
        }
        navigate('/')
    }
    
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 border border-gray-200">
        <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-sky-800 to-sky-600 bg-clip-text text-transparent">
          {params.id ? 'Editar Producto' : 'Nuevo Producto'}
        </h2>
        <form onSubmit={ handleSubmit }>
          <div className="mb-5">
              <label className="block text-gray-700 text-sm font-bold mb-2">Nombre</label>
              <input 
              value={product.nombre}
              type="text" 
              placeholder="Nombre del producto"
              className="shadow-sm border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition duration-300"
              onChange={ (e) => setProduct({...product, nombre: e.target.value}) }
              />
          </div>
          <div className="mb-5">
              <label className="block text-gray-700 text-sm font-bold mb-2">Precio</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">$</span>
                </div>
                <input 
                value={product.precio}
                type="number" 
                step="0.01"
                placeholder="0.00"
                className="shadow-sm border border-gray-300 rounded-lg w-full py-3 pl-8 pr-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition duration-300"
                onChange={ (e) => setProduct({...product, precio: parseFloat(e.target.value)}) }
                />
              </div>
          </div>
          <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">Descripción</label>
              <textarea 
              value={product.descripcion}
              rows="4"
              placeholder="Descripción detallada del producto"
              className="shadow-sm border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition duration-300"
              onChange={ (e) => setProduct({...product, descripcion: e.target.value}) }
              ></textarea>
          </div>
          <div className="flex justify-end space-x-3">
              <button 
                className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2.5 px-5 rounded-lg shadow-sm transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50" 
                type="button"
                onClick={() => navigate('/')}
              >
                Cancelar
              </button>
              <button 
                className="bg-sky-600 hover:bg-sky-700 text-white font-medium py-2.5 px-5 rounded-lg shadow-sm transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50" 
                type="submit"
              >
                {params.id ? 'Actualizar' : 'Guardar'} Producto
              </button>
          </div>
        </form>
      </div>
    </div>
  )
}
