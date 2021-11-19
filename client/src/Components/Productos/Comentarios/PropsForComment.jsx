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
                e.productos((p) => {
                  <CommentProduct
                    key={e.id}
                    id={e.id}
                    usuarioId={e.usuarioId}
                    productoiId={p.id}
                    imagen={p.imagen}
                  ></CommentProduct>
                })
                ):
            <div>No hay compras realizadas</div>
            }
          </div>
    )
  }