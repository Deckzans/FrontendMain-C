import { createBrowserRouter } from "react-router-dom";
import { Login, Regristar } from '../auth'
import { LayoutPrivate } from "../layout/pages/LayoutPrivate";
import { EmpleadoPage } from "../RecursosHumanos/pages/EmpleadoPage";
import { DepartamentoPage } from "../RecursosHumanos/pages/DepartamentoPage";
import { EditarEmpleadoPage } from "../RecursosHumanos/pages/EditarEmpleadoPage";
import { AgregarEmpleadoPage } from "../RecursosHumanos/pages/AgregarEmpleadoPage";
import { VacacionesPage } from '../RecursosHumanos/pages/accionesEmpleados/VacacionesPage'
import { PermisoPage } from "../RecursosHumanos/pages/accionesEmpleados/PermisoPage";
import { IncapacidadPage } from "../RecursosHumanos/pages/accionesEmpleados/IncapacidadPage";
import { DiaEconomicoPage } from "../RecursosHumanos/pages/accionesEmpleados/DiaEconomicoPage";
import { FormacionPage } from "../RecursosHumanos/pages/accionesEmpleados/FormacionPage";
import { EditarDocDiaPage } from "../RecursosHumanos/pages/edicionArchivos/EditarDocDiaPage";
import { EditarDocVacacionPage } from "../RecursosHumanos/pages/edicionArchivos/EditarDocVacacionPage";
import { EditarDocPermisoPage } from "../RecursosHumanos/pages/edicionArchivos/EditarDocPermisoPage";
import { EditarDocIncapacidadPage } from "../RecursosHumanos/pages/edicionArchivos/EditarDocIncapacidadPage";
import { EditarDocFormacionPage } from "../RecursosHumanos/pages/edicionArchivos/EditarDocFormacionPage";
import { AdministradorPage } from "../RecursosHumanos/pages/AdministradorPage";
import { LayoutPrivateAdministrador } from "../layout/pages/LayoutPrivateAdministrador";
import { EditarUsuarioPage } from "../RecursosHumanos/pages/EditarUsuarioPage";
import { OrganigramaPage } from "../RecursosHumanos/pages/Organigrama";
import { Requisiciones } from "../RecursosHumanos/pages/Requisiciones";
import {RequisicionesTable} from "../RecursosHumanos/pages/RequisicionesTable"


export const router = createBrowserRouter([
    {
        path: '/',
        element: <Login />,
    },
    {
        path: '/registro',
        element: <Regristar />,
    },
    {
        path: '/home',
        element: <LayoutPrivate />,
        children: [{
            index: true,
            element: <EmpleadoPage />,
        },
        {
            path: 'departamentos',
            element: <DepartamentoPage />
        },
        {
            path: 'personal',
            element: <EmpleadoPage />
        },
        {
            path: 'editar/:cl',
            element: <EditarEmpleadoPage />
        },
        {
            path: 'agregar',
            element: <AgregarEmpleadoPage />
        },
        {
            path: 'vacaciones/:cl',
            element: <VacacionesPage />
        },
        {
            path: 'permiso/:cl',
            element: <PermisoPage />
        },
        {
            path: 'incapacidad/:cl',
            element: <IncapacidadPage />
        },
        {
            path: 'dia/:cl',
            element: <DiaEconomicoPage />
        },
        {
            path: 'formacion/:cl',
            element: <FormacionPage />
        },
        {
            path: 'editardocdia/:cl',
            element: <EditarDocDiaPage />
        },
        {
            path: 'editardocVacacion/:cl',
            element: <EditarDocVacacionPage />
        },
        {
            path: 'editarPermiso/:cl',
            element: <EditarDocPermisoPage />
        },
        {
            path: 'editarIncapacidad/:cl',
            element: <EditarDocIncapacidadPage />
        },
        {
            path: 'editarFormacion/:cl',
            element: <EditarDocFormacionPage />
        },
        {
            path: 'organigrama',
            element:<OrganigramaPage/>
        },
        {
            path: 'requisicion',
            element:<Requisiciones/>
        },
        {
            path: 'requisiciones',
            element:<RequisicionesTable/>
        },

        ]
    },
    {
        path: '/administrador',
        element: <LayoutPrivateAdministrador />,
        children: [{
            index:true, 
            element:<AdministradorPage/>
        },
        {
            path: 'editarUsuario/:cl',
            element: <EditarUsuarioPage />
        },]
    }
])