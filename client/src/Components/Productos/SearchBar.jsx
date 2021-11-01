import "../../Styles/SearchBar.css"
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getProducts, setNombre, setPagina } from "../../Redux/actions/action"

export default function SearchBar() {
    const [input, setInput] = useState("")
    const dispatch = useDispatch()

    const handleInputChange = (e) => {
        e.preventDefault()
        setInput(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(setNombre(input)) //guardo el name en store
        dispatch(getProducts({ pagina: 1, nombre: input }))
        dispatch(setPagina(1))
        setInput("")
    }

    return (
        <form className="search" onSubmit={onSubmit}>
            <input className="input" type="text" placeholder="Busca un producto" onChange={handleInputChange} value={input} />
            <button className="lupa" type="submit">🔍</button>
        </form>
    )
}