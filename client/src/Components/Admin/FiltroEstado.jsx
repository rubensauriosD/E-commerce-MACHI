import React from "react";

export default function FiltroEstado ({dispatch, setEstado, getFacturasAdmin}) {
    const handleFiltro = (e) => {
        dispatch(setEstado(e.target.value))
        dispatch(getFacturasAdmin({estado: e.target.value}))
    }

    const quitarFiltro = () => {
        dispatch(getFacturasAdmin({}))
    }

    return (
        <div>
            <div>
                <select onChange={handleFiltro}>
                <option defaultValue value={""}>Estado</option>
                <option value={"creada"}>Creada</option>
                <option value={"procesando"}>Procesando</option>
                <option value={"cancelada"}>Cancelada</option>
                <option value={"completa"}>Completa</option>
            </select>
            </div>
            <button onClick={quitarFiltro}>Quitar filtro</button>
        </div>
    )
}