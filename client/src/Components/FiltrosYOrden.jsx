import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { getProducts, setPagina, setOrdenA, setOrdenP, setFiltroC } from "../Redux/actions/action"

export default function FiltrosYOrden () {
    const { products, nombre, ordenA, ordenP, filtroC } = useSelector(state => state)
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

    return (
        <div>
            <div>
                <label>Orden alfabetico</label>
                <select onChange={handleOrdenPorNombre}>
                    <option selected value="asc">Ascendente</option>
                    <option value="desc">Descendente</option>
                </select>
            </div>
            <div>
                <label>Orden por precio</label>
                <select onChange={handleOrdenPorPrecio}>
                    <option value="asc">Ascendente</option>
                    <option value="desc">Descendente</option>
                </select>
            </div>
            <div>
                <label>Categorias</label>
                <select onChange={handleFiltroPorCategoria}>
                    {products.productos && products.productos.map((e, i) => (
                        <option key={i} value={e.categoria}>{e.categoria}</option>
                    ))}
                </select>
            </div>
        </div>
    )
}