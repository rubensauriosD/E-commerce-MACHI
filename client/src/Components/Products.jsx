import Product from "./Product"

export default function Products({productos}){
    return(
        <div>
            {productos&&Array.isArray(productos)?productos.map(producto=>(
                <Product key={producto.id} id={producto.id} imagen={producto.imagen} nombre={producto.nombre} categoria={producto.categoria} precio={producto.precio} disponibilidad={producto.disponibilidad}/>
            )
            ):
            <h1>No se Encontraron Productos por esa categoria :(</h1>
            }
        </div>
    )
}