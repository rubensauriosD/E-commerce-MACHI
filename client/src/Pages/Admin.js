import React from "react";
import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import {getProductsAdmin, getImages } from '../Redux/actions/action';
import CargarProducto from '../Components/Admin/CargarProducto'
import CargarImagen from "../Components/Admin/CargarImagen";
import EditarProducto from "../Components/Admin/EditarProducto";
import EditarImagenes from "../Components/Admin/EditarImagenes";
import '../Styles/AdminStyle.css'


  

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
                    <div className='formsAdmin'>
                    <CargarProducto/>
                    </div>
                <hr/> 
                    <CargarImagen/>            
                <hr/>
                    <EditarProducto/>
                <hr/>    
                    <EditarImagenes/>
                </div>
            </div>
        );
    };


