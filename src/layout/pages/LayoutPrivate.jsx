
import axios from "axios"
import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import BarraMenu from "../Components/BarraMenu"
import { Footer } from "../Components/Footer"
import useAppState from "../../auth/hooks/estado"
import verificarToken from "../helpers/Verificacion"
import { traerUsuario } from "../../RecursosHumanos/hooks/useTraerUsuarios"



export const LayoutPrivate = () => {
  const navigate = useNavigate();
  const { token,id} = useAppState();

  useEffect(() => {
    const checkToken = async () => {
      try {
        const success = await verificarToken(token, navigate);
        if (success) {

           const resp = await traerUsuario(id) 
          console.log(resp.data.rol)
          if(resp.data.rol === "administrador"){ 
            navigate('/administrador');
          } else if (resp.data.rol === "requisicion") { 
            navigate('/requisicion');
          }
        }
      } catch (error) {
        console.error(`Error al verificar el token: ${error.message}`);
      }
    };

    checkToken();
  }, [token, navigate]);
 

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <BarraMenu />

        <div style={{ flex: 1, minHeight: 0 }}>
          {/* Contenido del Outlet */}
          <Outlet />
        </div>

        <Footer />
      </div>

    </>
  )
}
