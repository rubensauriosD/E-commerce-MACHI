import React from "react";
import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import {getImages} from '../Redux/actions/imageAction'
import {getProductsAdmin} from '../Redux/actions/productAction';
import CargarProducto from '../Components/Admin/CargarProducto'
import CargarImagen from "../Components/Admin/CargarImagen";
import EditarProducto from "../Components/Admin/EditarProducto";
import EditarImagenes from "../Components/Admin/EditarImagenes";
import '../Styles/AdminStyle.css'
import EditarUsuario from "../Components/Admin/EditarUsuario";

export default function Admin(){

const dispatch = useDispatch()

    useEffect(() =>{
        dispatch(getProductsAdmin());
        dispatch(getImages());
    },[dispatch])

        return (
            <div className="adminContenedor">
                <h1>Admin</h1>
                <div className='formsAdminExterno'>
                    <CargarProducto/>
                
                    <CargarImagen/>            
                
                    <EditarProducto/>
                    
                    <EditarImagenes/>

                    <EditarUsuario/>
                </div>
            </div>
        );
    };


