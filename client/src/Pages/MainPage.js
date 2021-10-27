import "../Styles/MainPage.css";
import Categorias from "../Components/Categorias";
import { categoria } from "../Elements/ArrayCategoria";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {getProducts} from "../Redux/actions/action"
export default function MainPage() {
  const productos=useSelector(state=>state.Products)
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(getProducts())
  },[dispatch])
  return (
    <div>
      <h1>Hello World</h1>
      <Categorias categoria={categoria} />
    </div>
  );
}
