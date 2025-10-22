import { useEffect, useState } from "react"
import { createProduct, getProduct, updateProduct } from "../api/products";
import { useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Container,
  Grid,
  InputAdornment
} from '@mui/material';
import { Save, Cancel } from '@mui/icons-material';

export default function ProductForm() {

    const [product, setProduct] = useState({
        codigo: '',
        descripcion: '',
        precio: 0
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
        try {
            if (params.id) {
                await updateProduct(params.id, product)
                toast.success('Producto modificado con éxito')
            } else {
                await createProduct(product)
                toast.success('Producto creado con éxito')
            }
            navigate('/')
        } catch (error) {
            toast.error('Error al guardar el producto')
        }
    }
    
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Card sx={{ boxShadow: 3 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography 
            variant="h4" 
            gutterBottom
            sx={{ 
              fontWeight: 'bold',
              mb: 4,
              background: 'linear-gradient(45deg, #0ea5e9, #0284c7)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            {params.id ? 'Editar Producto' : 'Nuevo Producto'}
          </Typography>
          
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Código del Producto"
                  placeholder="Ingresa el código del producto"
                  value={product.codigo}
                  onChange={(e) => setProduct({...product, codigo: e.target.value})}
                  required
                  variant="outlined"
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Descripción"
                  placeholder="Descripción detallada del producto"
                  value={product.descripcion}
                  onChange={(e) => setProduct({...product, descripcion: e.target.value})}
                  multiline
                  rows={4}
                  required
                  variant="outlined"
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Precio"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={product.precio}
                  onChange={(e) => setProduct({...product, precio: parseFloat(e.target.value) || 0})}
                  required
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Typography variant="body1" color="text.secondary">
                          S/
                        </Typography>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
                  <Button
                    variant="outlined"
                    startIcon={<Cancel />}
                    onClick={() => navigate('/')}
                    size="large"
                  >
                    Cancelar
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<Save />}
                    type="submit"
                    size="large"
                    sx={{ 
                      bgcolor: 'primary.main',
                      '&:hover': { bgcolor: 'primary.dark' }
                    }}
                  >
                    {params.id ? 'Actualizar' : 'Guardar'} Producto
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Container>
  )
}
