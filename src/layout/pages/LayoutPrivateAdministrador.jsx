
import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { Footer } from "../Components/Footer"
import useAppState from "../../auth/hooks/estado"
import verificarToken from "../helpers/Verificacion"
import { BarraMenuAdministrador } from '../Components/BarraMenuAdministrador'
import { traerUsuario } from "../../RecursosHumanos/hooks/useTraerUsuarios"

export const LayoutPrivateAdministrador = () => {
  const navigate = useNavigate();
  const { token, id } = useAppState();


  useEffect(() => {
    const checkToken = async () => {
      try {
        const success = await verificarToken(token, navigate);
        if (success) {
          const resp = await traerUsuario(id);
          console.log(resp.data.rol);
          if (resp.data.rol === "estandar") {
            navigate('/home');
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

  useEffect(() => {
    // Lógica de verificación del token
    verificarToken(token, navigate);
  }, [token, navigate]);


  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <BarraMenuAdministrador />

        <div style={{ flex: 1, minHeight: 0 }}>
          {/* Contenido del Outlet */}
          <Outlet />
        </div>

        <Footer />
      </div>

    </>
  )
}
