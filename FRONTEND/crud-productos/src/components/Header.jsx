import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material'
import { Link } from "react-router"
import AddIcon from '@mui/icons-material/Add'

export default function Header() {
  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar>
        <Typography 
          variant="h5" 
          component={Link}
          to="/"
          sx={{ 
            flexGrow: 1,
            textDecoration: 'none',
            color: 'inherit',
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #0ea5e9, #0284c7)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Productos App
        </Typography>
        <Button 
          color="inherit" 
          component={Link} 
          to="/nuevo-producto"
          startIcon={<AddIcon />}
          variant="contained"
          sx={{ 
            bgcolor: 'success.main',
            '&:hover': {
              bgcolor: 'success.dark'
            }
          }}
        >
          Nuevo Producto
        </Button>
      </Toolbar>
    </AppBar>
  )
}
