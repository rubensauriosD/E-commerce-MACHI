import { Typography } from "@mui/material";
import { useEffect } from "react";

export default function SuccesLogin() {
    useEffect(()=>{
        setTimeout(()=>{
            window.close()
        },1000)
    },[])
  return (
    <div>
      <h1>
        <Typography>Felicidades! Te haz logueado</Typography>
      </h1>
    </div>
  );
}
