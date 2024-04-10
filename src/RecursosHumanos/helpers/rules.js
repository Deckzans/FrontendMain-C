export const commonValidationRules = {
  required: 'Este campo es requerido',
  minLength: { value: 3, message: 'Debe tener al menos 3 caracteres' },
  // validate: {
  //   onlyLettersAndSpaces: value => /^[A-Za-z\s]+$/.test(value) || 'Solo se permiten letras y espacios',
  // },
  // Agrega más reglas según tus necesidades
};
export const  commonValidationRulesNumber = {
  required: 'Este campo es requerido',
  validate: {
    nonNegative: value => parseFloat(value) >= 0 || 'El valor no puede ser negativo',
    // nonLevel: value => parseFloat(value) >= 800 || 'Recuerda poner valores reales',
    positive: value => parseFloat(value) > 0 || 'El valor debe ser mayor que cero',
    // Agrega más reglas según tus necesidades
    // ...
  },
};

export const commonValidationRulesCantidades = {
  required: 'Este campo es requerido',
  validate: {
    nonNegative: value => parseFloat(value) >= 0 || 'El valor no puede ser negativo',
    // nonLevel: value => parseFloat(value) >= 800 || 'Recuerda poner valores reales',
    positive: value => parseFloat(value) > 0 || 'El valor debe ser mayor que cero',
    // Agrega más reglas según tus necesidades
    // ...
  },
};



