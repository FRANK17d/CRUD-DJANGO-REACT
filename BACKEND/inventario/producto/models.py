from django.db import models

# Create your models here.
class Producto(models.Model):
    codigo = models.CharField(max_length=50, unique=True)
    descripcion = models.TextField()
    precio = models.FloatField()

    def __str__(self):
        return f"{self.codigo} - {self.descripcion[:30]}"