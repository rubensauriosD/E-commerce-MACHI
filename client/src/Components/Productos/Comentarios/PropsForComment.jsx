import {getFacturasAdmin} from '../../../Redux/actions/facturaAction'
import CommentProduct from './CommentProduct'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


export default function PropsForComment() {

    const {Facturas} =useSelector(state=>state.factura)
    const dispatch = useDispatch();
    var id =useSelector(state=>state.usuario.Users.id)
  
    useEffect(() => {
      const myProducts = () => dispatch(getFacturasAdmin(id))
      myProducts();
    }, []);
  
    return(
        <div>
            {
              Facturas?.length !== 0?
                Facturas.map((e) => 
                  <CommentProduct
                    key={e.id}
                    id={e.id}
                    cantidad={e.ammount}
                    total={e.total}
                    status={e.status}
                    usuarioId={e.usuarioId}
                    productoId={e.productos.map((e) => {e.id})}
                    imagen={e.productos.map((e) => {e.imagen})}
                    nombre={e.productos.map((e) => {e.nombre})}
                    descripcion={e.productos.map((e) => {e.descripcion})}
                  ></CommentProduct>
                ):
            <div>No hay compras realizadas</div>
            }
          </div>
    )
  }