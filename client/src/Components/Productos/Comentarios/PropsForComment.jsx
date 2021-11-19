import CommentProduct from './CommentProduct'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';


export default function PropsForComment() {

  const {FacturasUsuario} = useSelector(state=>state.factura)
  
  useEffect(() => {

    console.log("WTFFF", FacturasUsuario);

  }, []);
  
    return(
      <div>
            {
              FacturasUsuario?.length !== 0?
              FacturasUsuario.map((e) => (
                e.productos.map((p) => (
                  <CommentProduct
                  key={e.id}
                  id={e.id}
                  usuarioId={e.usuarioId}
                  imagen={p.imagen}
                  productoId={p.id}
                ></CommentProduct>
            ))
            )
            ):
            <div>No hay compras realizadas</div>
            } 
          </div>
    )
  }