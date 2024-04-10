// EmpleadoButtons.js
import React from 'react';
import { Button } from '@mui/material';
import { PersonAdd,PersonRemove,Edit } from '@mui/icons-material';

const EmpleadoButtons = ({ onAdd, onEdit, onDelete, onVacaciones, onPermiso, onIncapacidad, onDiaEconomico,onFormacion, isEditDisabled, isDeleteDisabled, isVacacionesDisabled, isPermisoDisabled, isIncapacidadDisabled, isDiaEconomicoDisabled,isFormacionDisabled }) => {
  return (
    <div style={{ marginBottom: '20px' }}>
      <Button startIcon={<PersonAdd/>} onClick={onAdd}>Agregar</Button>
      <Button startIcon={<Edit/>} onClick={onEdit} disabled={isEditDisabled}>
        Editar
      </Button>
      <Button startIcon={<PersonRemove/>} onClick={onDelete} disabled={isDeleteDisabled}>
        Eliminar
      </Button>
      <Button onClick={onVacaciones} disabled={isVacacionesDisabled}>
        Vacaciones
      </Button>
      <Button onClick={onPermiso} disabled={isPermisoDisabled}>
        Permiso
      </Button>
      <Button onClick={onIncapacidad} disabled={isIncapacidadDisabled}>
        Incapacidad
      </Button>
      <Button onClick={onDiaEconomico} disabled={isDiaEconomicoDisabled}>
        Día Económico
      </Button>
      <Button onClick={onFormacion} disabled={isFormacionDisabled}>
        Formacion
      </Button>
      {/* Otros botones según tus necesidades */}
    </div>
  );
};

export default EmpleadoButtons;
