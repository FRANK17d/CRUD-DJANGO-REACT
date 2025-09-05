import { useEffect, useState } from 'react';
import { getProducts, deleteProduct } from '../api/products';
import { useNavigate } from 'react-router';

export default function ProductList() {

    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const loadProducts = async() => {
        const response = await getProducts();
        setProducts(response.data);
    }

    const handleDelete = async (id) => {
        await deleteProduct(id);
        setProducts(products.filter(product => product.id !== id));
    }

    useEffect(() => {
        loadProducts();
    }, []);


  return (
    <div className='mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className="flex justify-between items-center mb-8">
            <h1 className='text-3xl font-extrabold bg-gradient-to-r from-sky-800 to-sky-600 bg-clip-text text-transparent'>Productos Disponibles</h1>
            <button 
                className='bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50'
                onClick={() => navigate('/nuevo-producto')}
            >
                Nuevo Producto
            </button>
        </div>
        
        {products.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-xl shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-900">No hay productos disponibles</h3>
                <p className="mt-1 text-sm text-gray-500">Comienza añadiendo un nuevo producto.</p>
            </div>
        ) : (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5'>
              {products.map(product => (
                <div key={product.id} className='bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 card-hover-effect'>
                  <div className='bg-sky-800 p-4'>
                    <h2 className='text-xl font-bold text-white truncate'>{product.nombre}</h2>
                  </div>
                  <div className='p-5'>
                    <div className="flex justify-between items-center mb-4">
                      <span className='text-lg font-bold text-sky-900'>${product.precio.toFixed(2)}</span>
                      <span className='bg-sky-100 text-sky-800 text-xs font-semibold px-2.5 py-0.5 rounded-full'>Disponible</span>
                    </div>
                    <p className='text-gray-700 mb-4 line-clamp-3'>{product.descripcion}</p>
                    <div className="flex justify-between mt-4">
                      <button 
                      className='flex items-center justify-center bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50'
                      onClick={() => navigate('/editar-producto/' + product.id)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Editar
                      </button>
                      <button 
                      className='flex items-center justify-center bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50'
                      onClick={() => handleDelete(product.id)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
        )}
    </div>
  )
}