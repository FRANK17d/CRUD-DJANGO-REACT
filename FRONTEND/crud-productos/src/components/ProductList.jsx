import { useEffect, useState } from 'react';
import { getProducts, deleteProduct } from '../api/products';
import { useNavigate } from 'react-router';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  Grid,
  IconButton,
  Container,
  Fab,
  Chip
} from '@mui/material';
import { Edit, Delete, Add, Inventory } from '@mui/icons-material';
import toast from 'react-hot-toast';

export default function ProductList() {

    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const loadProducts = async() => {
        try {
            const response = await getProducts();
            setProducts(response.data);
        } catch (error) {
            toast.error('Error al cargar productos');
        }
    }

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar este producto?')) {
            try {
                await deleteProduct(id);
                setProducts(products.filter(product => product.id !== id));
                toast.success('Producto eliminado');
            } catch (error) {
                toast.error('Error al eliminar producto');
            }
        }
    }

    useEffect(() => {
        loadProducts();
    }, []);


  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #0ea5e9, #0284c7)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Productos Disponibles
        </Typography>
        <Button 
          variant="contained"
          startIcon={<Add />}
          onClick={() => navigate('/nuevo-producto')}
          sx={{ 
            bgcolor: 'success.main',
            '&:hover': { bgcolor: 'success.dark' }
          }}
        >
          Nuevo Producto
        </Button>
      </Box>
      
      {products.length === 0 ? (
        <Box 
          sx={{ 
            textAlign: 'center', 
            py: 8, 
            bgcolor: 'grey.50', 
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'grey.200'
          }}
        >
          <Inventory sx={{ fontSize: 48, color: 'grey.400', mb: 2 }} />
          <Typography variant="h6" color="text.primary" gutterBottom>
            No hay productos disponibles
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Comienza añadiendo un nuevo producto.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {products.map(product => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4
                  }
                }}
              >
                <Box sx={{ bgcolor: 'primary.main', p: 2 }}>
                  <Typography 
                    variant="h6" 
                    color="white" 
                    sx={{ 
                      fontWeight: 'bold',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {product.codigo}
                  </Typography>
                </Box>
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                      S/ {product.precio.toFixed(2)}
                    </Typography>
                    <Chip 
                      label="Disponible" 
                      color="primary" 
                      size="small"
                      sx={{ bgcolor: 'primary.light', color: 'primary.dark' }}
                    />
                  </Box>
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={{ 
                      mb: 3,
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}
                  >
                    {product.descripcion}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, mt: 'auto' }}>
                    <Button
                      variant="contained"
                      startIcon={<Edit />}
                      onClick={() => navigate('/editar-producto/' + product.id)}
                      size="small"
                      sx={{ flex: 1 }}
                    >
                      Editar
                    </Button>
                    <IconButton
                      onClick={() => handleDelete(product.id)}
                      color="error"
                      size="small"
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  )
}