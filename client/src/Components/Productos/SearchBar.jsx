import "../../Styles/SearchBar.css"
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, setNombre, setPagina } from "../../Redux/actions/productAction"

export default function SearchBar() {
   const [input, setInput] = useState("")
    const dispatch = useDispatch()
  //  const { nombre } = useSelector(state => state.productos)
    const handleInputChange = (e) => {
        setInput(e.target.value)
       // dispatch(setNombre(e.target[0].value))
    }

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(getProducts({ pagina: 1, nombre:input, categoria:"", ordenamiento:"" }))
        // dispatch(setPagina(1))
        dispatch(setNombre(input))
        setInput("")
    }

    return (
        <form className="search" onSubmit={onSubmit}>
            <input className="input" type="text" placeholder="Busca un producto" onChange={handleInputChange} value={input} />
            <button className="lupa" type="submit">🔍</button>
        </form>
    )
}