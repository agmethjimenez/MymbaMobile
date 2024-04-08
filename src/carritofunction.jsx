import AsyncStorage from '@react-native-async-storage/async-storage';

export const agregarAlCarrito = async (nombre, precio, id, cantidad = 1, imagen, stock) => {
  try {
    let carritoProductos = JSON.parse(await AsyncStorage.getItem("carritoProductos")) || [];

    const productoExistente = carritoProductos.find((producto) => producto.nombre === nombre);

    if (productoExistente) {
      const cantidadTotal = productoExistente.cantidad + cantidad;
      if (cantidadTotal > stock) {
        alert(`¡No hay suficiente stock disponible para agregar ${cantidad} unidades de ${nombre} al carrito!`);
        return;
      }
      if (cantidadTotal > 4) {
        alert("¡No se pueden agregar más de 4 unidades de un mismo producto al carrito!");
        return;
      }
      productoExistente.cantidad = cantidadTotal;
      productoExistente.total = productoExistente.precio * cantidadTotal;
    } else {
      if (cantidad > 4) {
        alert("¡No se pueden agregar más de 4 unidades de un mismo producto al carrito!");
        return;
      }
      if (cantidad > stock) {
        console.log(`¡No hay suficiente stock disponible para agregar ${cantidad} unidades de ${nombre} al carrito!`);
        return;
      }
      carritoProductos.push({
        imagen,
        id,
        nombre,
        precio,
        stock,
        cantidad,
        total: precio * cantidad
      });
      console.log(carritoProductos);
    }
    await AsyncStorage.setItem("carritoProductos", JSON.stringify(carritoProductos));
    // Lógica adicional aquí, como actualizar el estado de tu aplicación para reflejar el carrito actual
  } catch (error) {
    console.error(error);
  }
}

export const restarCantidad = async (index) => {
    try {
        let carritoProductos = JSON.parse(await AsyncStorage.getItem("carritoProductos")) || [];

        if (carritoProductos[index].cantidad > 1) {
            carritoProductos[index].cantidad--;
            carritoProductos[index].total = carritoProductos[index].cantidad * carritoProductos[index].precio;
            await AsyncStorage.setItem("carritoProductos", JSON.stringify(carritoProductos));
        }
    } catch (error) {
        console.error(error);
    }
};

export const sumarCantidad = async (index) => {
    try {
        let carritoProductos = JSON.parse(await AsyncStorage.getItem("carritoProductos")) || [];

        if (carritoProductos[index].cantidad < carritoProductos[index].stock && carritoProductos[index].cantidad < 4) {
            carritoProductos[index].cantidad++;
            carritoProductos[index].total = carritoProductos[index].cantidad * carritoProductos[index].precio;
            await AsyncStorage.setItem("carritoProductos", JSON.stringify(carritoProductos));
        }
    } catch (error) {
        console.error(error);
    }
};

export const eliminarProducto = async (id) => {
    try {
      let carritoProductos = JSON.parse(await AsyncStorage.getItem("carritoProductos")) || [];
  
      const index = carritoProductos.findIndex(item => item.id === id);
  
      if (index !== -1) {
        const productoEliminado = carritoProductos.splice(index, 1)[0];
        console.log(`Se eliminó el producto ${productoEliminado.nombre} del carrito.`);
  
        await AsyncStorage.setItem("carritoProductos", JSON.stringify(carritoProductos));
  
        // Actualizar la lista de productos después de eliminar
        obtenerProductosEnCarrito();
      } else {
        console.log('Producto no encontrado en el carrito');
      }
    } catch (error) {
      console.error(error);
    }
  }

const guardarCarritoEnStorage = async (productos) => {
    try {
        await AsyncStorage.setItem("carritoProductos", JSON.stringify(productos));
    } catch (error) {
        console.error("Error al guardar productos en el carrito:", error);
    }
};
