import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, setPagina, setOrdenA, setOrdenP, setFiltroC } from "../../Redux/actions/productAction";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faRedo } from '@fortawesome/free-solid-svg-icons';

export default function FiltrosYOrden () {
    const { nombre, ordenA, ordenP, filtroC } = useSelector(state => state.productos)
    const dispatch = useDispatch()

    const handleOrdenPorNombre = (e) => {
        dispatch(setOrdenA(e.target.value))
        dispatch(getProducts({ pagina: 1, nombre, ordenA: e.target.value, ordenP, filtroC }))
        dispatch(setPagina(1))
    }

    const handleOrdenPorPrecio = (e) => {
        dispatch(setOrdenP(e.target.value))
        dispatch(getProducts({ pagina: 1, nombre, ordenA, ordenP: e.target.value, filtroC }))
        dispatch(setPagina(1))
    }

    const handleFiltroPorCategoria = (e) => {
        dispatch(setFiltroC(e.target.value))
        dispatch(getProducts({ pagina: 1, nombre, ordenA, ordenP, filtroC: e.target.value}))
        dispatch(setPagina(1))
    }

    const rechargeHome =() =>{
        dispatch(getProducts({ pagina: 1}))
    }
     
    return (
        <div className="OrderContainer">
            <div className="items">
                <select onChange={handleOrdenPorNombre}>
                    <option>Orden alfabetico:</option>
                    <option value="asc">A-Z</option>
                    <option value="desc">Z-A</option>
                </select>
            </div>
            <div className="items">
                <select onChange={handleOrdenPorPrecio}>
                    <option>Orden por precio:</option>
                    <option value="asc">Menor Precio</option>
                    <option value="desc">Mayor Precio</option>
                </select>
            </div>
            <div className="items">
                <select onChange={handleFiltroPorCategoria}>
                    <option>Categorias: </option>
                    <option value="Plantines y Semillas">Plantines y Semillas</option>
                    <option value="Composteras">Composteras</option>
                    <option value="Cajones y Cultivos">Cajones y Cultivos</option>
                    <option value="Insumos y Herramientas para Huertas">Insumos y Herramientas para Huertas</option>
                    <option value="Lombrices Rojas Californeanas">Lombrices Rojas Californeanas</option>
                    {/* {products.productos && products.productos.map((e, i) => (
                        <option key={i} value={e.categoria}>{e.categoria}</option>
                    ))} */}
                   
                </select>
            </div>
            <button onClick={rechargeHome} className="recharge" ><FontAwesomeIcon icon={faRedo}/></button>
        </div>
    )
}

