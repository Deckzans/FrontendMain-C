import { useEffect, useState } from 'react';
import { useEmpleadoStore } from '../hooks/useEmpleadoStore';
import EmpleadoCard from '../components/EmpleadoCard';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { CardActionArea, IconButton } from '@mui/material';
import '../Styles/organigrama.css';

export const OrganigramaPage = () => {
  const { datos, traerEmpleados } = useEmpleadoStore();
  const [departamentoSeleccionado, setDepartamentoSeleccionado] = useState('');
  const [indicesTarjetasPorRol, setIndicesTarjetasPorRol] = useState({});
  const [empleadosPorRol, setEmpleadosPorRol] = useState({});
  const [empleadosBajaCount, setEmpleadosBajaCount] = useState(0);
  const [vacantesPorArea, setVacantesPorArea] = useState({});
  const [totalVacantes, setTotalVacantes] = useState(0);
  const imagenurl = "/imgC5/logo.jpg";

  useEffect(() => {
    traerEmpleados();
  }, [traerEmpleados]);

  useEffect(() => {
    actualizarEmpleadosPorRol();
    calcularVacantes();
  }, [departamentoSeleccionado, datos]);

  const obtenerDepartamentos = () => {
    return [...new Set(datos.map((empleado) => empleado.area.descripcion))];
  };

  const filtrarEmpleadosPorDepartamento = () => {
    let empleadosFiltrados;
    if (departamentoSeleccionado === '') {
      empleadosFiltrados = datos.filter(empleado => empleado.status !== 'baja'); // Filtrar empleados activos
    } else {
      empleadosFiltrados = datos.filter((empleado) => empleado.area.descripcion === departamentoSeleccionado && empleado.status !== 'baja'); // Filtrar empleados activos en un departamento específico
    }

    // Verificar si el contador de empleados con estatus de baja es igual a 10
    if (empleadosBajaCount === 10) {
      // Encontrar la primera tarjeta de empleado con estatus de baja y eliminarla
      const indexBaja = empleadosFiltrados.findIndex(empleado => empleado.status === 'baja');
      if (indexBaja !== -1) {
        empleadosFiltrados.splice(indexBaja, 1);
        // Actualizar el contador de empleados con estatus de baja
        setEmpleadosBajaCount(count => count - 1);
      }
    }

    return empleadosFiltrados;
  };

  const renderizarTarjeta = (empleado) => {
    // Verificar si el empleado es una tarjeta de vacante
    if (empleado.status === 'baja') {
      // Representar tarjeta de vacante
      return (
        <Card sx={{ maxWidth: 250, maxHeight: '100%', marginLeft: 5 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="190"
              width="250"
              image={imagenurl}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Vacante disponible
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Vacante disponible, favor de contactar a recursos humanos para agregar nuevo trabajador
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      );
    } else {
      // Representar tarjeta de empleado activo
      return <EmpleadoCard key={empleado.id} empleado={empleado} className="empleado-card" />;
    }
  };

  const ordenarEmpleadosPorJerarquia = (empleados) => {
    const jerarquiaCargos = [
      'Jefe de Departamento',
      'Jefe de Turno',
      'Despachador',
      'Operador',
      'Tecnico',
      'Auxiliar',
      'Desarrollador',
    ];

    return empleados.sort((a, b) => jerarquiaCargos.indexOf(a.cargo) - jerarquiaCargos.indexOf(b.cargo));
  };

  const agruparEmpleadosPorRol = (empleados) => {
    return empleados.reduce((agrupados, empleado) => {
      if (!agrupados[empleado.cargo]) {
        agrupados[empleado.cargo] = [];
      }
      agrupados[empleado.cargo].push(empleado);
      return agrupados;
    }, {});
  };

  const actualizarEmpleadosPorRol = () => {
    const empleadosFiltrados = filtrarEmpleadosPorDepartamento();
    const empleadosAgrupados = agruparEmpleadosPorRol(ordenarEmpleadosPorJerarquia(empleadosFiltrados));
  
    setEmpleadosPorRol(empleadosAgrupados);
  
    // Reiniciar los índices al cambiar los empleados
    const nuevosIndices = {};
    Object.keys(empleadosAgrupados).forEach((rol) => {
      nuevosIndices[rol] = { total: empleadosAgrupados[rol].length, indice: 0 };
    });
    setIndicesTarjetasPorRol(nuevosIndices);
  };

  const calcularVacantes = () => {
    const vacantesPorArea = {};
    obtenerDepartamentos().forEach((departamento) => {
      const empleadosFiltrados = datos.filter((empleado) => empleado.area.descripcion === departamento && empleado.status !== 'baja');
      const vacantes = obtenerLimitePorDepartamento(departamento) - empleadosFiltrados.length;
      vacantesPorArea[departamento] = vacantes;
    });

    // Calcular el total de vacantes sumando los topes de todas las áreas
    const totalVacantes = Object.values(vacantesPorArea).reduce((total, vacantes) => total + vacantes, 0);
    setTotalVacantes(totalVacantes);
    setVacantesPorArea(vacantesPorArea);
  };

  const obtenerLimitePorDepartamento = (departamento) => {
    switch (departamento) {
      case 'DESPACHO':
        return 12;
      case 'CRUM':
        return 11;
      case 'S_T_E_911':
        return 36;
      case 'CALIDAD':
        return 9;
      case 'SDA_089':
        return 13;
      case 'VIDEO_VIGILANCIA':
        return 25;
      case 'TELECOMUNICACIONES':
        return 4;
      case 'AREA_DE_DIAGNOSTICO_DE_PROCESOS':
        return 5;
      case 'SISTEMAS_Y_DESARROLLO':
        return 7;
      case 'CARTOGRAFIA':
        return 9;
      case 'PSICOLOGIA':
        return 8;
      case 'ADMINISTRATIVO':
        return 17;
      case 'AREA_JURIDICA':
        return 2;
      case 'DIRECCION_C5':
        return 10;
      case 'EL_SALTO':
        return 15;
      case 'C4_GOMEZ_PALACIO':
        return 20;   
      case 'C4_SANTIAGO_PAPASQUIARO':
        return 20
      case 'TECNICO':
        return 7;
      case 'AREA_LINEA_AMARILLA':
        return 9 

      default:
        return 0;
    }
  };

  const mostrarSiguienteTarjeta = (rol) => {
    setIndicesTarjetasPorRol((prevIndices) => {
      const totalEmpleados = prevIndices[rol]?.total || 1;
      const indiceActual = prevIndices[rol]?.indice || 0;
      const nuevoIndice = (indiceActual + 5) % totalEmpleados;
      return {
        ...prevIndices,
        [rol]: { total: totalEmpleados, indice: nuevoIndice },
      };
    });
  };

  const mostrarTarjetaAnterior = (rol) => {
    setIndicesTarjetasPorRol((prevIndices) => {
      const totalEmpleados = prevIndices[rol]?.total || 1;
      const indiceActual = prevIndices[rol]?.indice || 0;
      const nuevoIndice = (indiceActual - 5 + totalEmpleados) % totalEmpleados;

      return {
        ...prevIndices,
        [rol]: { total: totalEmpleados, indice: nuevoIndice },
      };
    });
  };

  return (
    <div className="organigrama-container">
      <h1>Organigrama de empleados</h1>
      <div>
        <label htmlFor="departamento">Selecciona un departamento: </label>
        <select
          id="departamento"
          value={departamentoSeleccionado}
          onChange={(e) => setDepartamentoSeleccionado(e.target.value)}
        >
          <option value="">Selecciona un departamento</option>
          {obtenerDepartamentos().map((departamento, index) => (
            <option key={index} value={departamento}>
              {departamento}
            </option>
          ))}
        </select>
        <Typography variant="body2" color="text.secondary">
            Total de vacantes: {totalVacantes}
          </Typography>
      </div>
      {departamentoSeleccionado && (
        <div>
          <h2 className="area-title">DEPARTAMENTO DE {departamentoSeleccionado}</h2>
          <Typography variant="body2" color="text.secondary">
            Vacantes disponibles: {vacantesPorArea[departamentoSeleccionado]}
          </Typography>

          <div className="area-container">
            <div className="jerarquia-container">
              {Object.entries(empleadosPorRol).map(([rol, empleadosPorRol]) => (
                <div key={rol} className="carrusel-container">
                  <h3>{rol}</h3>
                  <div className="empleado-card-container">
                    {empleadosPorRol.slice(indicesTarjetasPorRol[rol]?.indice, indicesTarjetasPorRol[rol]?.indice + 5).map(
                      (empleado) => (
                        <div key={empleado.id} className="empleado-card">
                          {renderizarTarjeta(empleado)}
                        </div>
                      )
                    )}
                  </div>
                  <div className="navegacion-tarjetas">
                    <IconButton onClick={() => mostrarTarjetaAnterior(rol)}>
                      <NavigateBeforeIcon />
                    </IconButton>
                    <IconButton onClick={() => mostrarSiguienteTarjeta(rol)}>
                      <NavigateNextIcon />
                    </IconButton>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrganigramaPage;
