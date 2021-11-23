import React from "react";
import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import {getImages} from '../Redux/actions/imageAction'
import {getProductsAdmin} from '../Redux/actions/productAction';
import {comprobanteSiEsAdmin} from "../Redux/actions/userAction"
import { getFacturasAdmin } from "../Redux/actions/facturaAction";
import CargarProducto from '../Components/Admin/CargarProducto'
import CargarImagen from "../Components/Admin/CargarImagen";
import EditarProducto from "../Components/Admin/EditarProducto";
import EditarUsuario from "../Components/Admin/EditarUsuario";
import EditarFactura from "../Components/Admin/EditarFacturas";
import EditarImagenes from "../Components/Admin/EditarImagenes";
import { useHistory } from "react-router";
import '../Styles/AdminStyle.css'

export default function Admin(){
const history=useHistory()
const dispatch = useDispatch()

    useEffect(() =>{
        dispatch(comprobanteSiEsAdmin(history))
        dispatch(getProductsAdmin());
        dispatch(getImages());
        dispatch(getFacturasAdmin({}));
    },[dispatch,history])

        return (
            <div className="adminContenedor">
                <h1>Admin</h1>
                <div className='formsAdminExterno'>
                    <CargarProducto/>
                
                    <CargarImagen/>
                    <EditarImagenes/> 

                    <h3>Editar Productos</h3>
                    <EditarProducto/>
                    
                    <h3>Editar Usuarios</h3> 
                    <EditarUsuario/>

                    <h3>Facturas</h3> 
                    <EditarFactura/>
                </div>
            </div>
        );
    };


