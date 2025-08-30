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
    <div>
      <form onSubmit={ handleSubmit }>
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Nombre</label>
            <input 
            value={product.nombre}
            type="text" 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={ (e) => setProduct({...product, nombre: e.target.value}) }
            />
        </div>
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Precio</label>
            <input 
            value={product.precio}
            type="number" 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={ (e) => setProduct({...product, precio: parseFloat(e.target.value)}) }
            />
        </div>
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Descripción</label>
            <textarea 
            value={product.descripcion}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={ (e) => setProduct({...product, descripcion: e.target.value}) }
            ></textarea>
        </div>
        <div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Guardar Producto
            </button>
            <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2" type="button">
            Cancelar
            </button>
        </div>
      </form>
    </div>
  )
}
