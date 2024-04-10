import Box from "@mui/material/Box";
import useScrollTrigger from "@mui/material/useScrollTrigger";

export const Footer = () => {
  const trigger = useScrollTrigger();

  return (
    <footer >
      <Box
        sx={{
          backgroundColor: '#f8f9fa',
          height: '3rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center', // Cambiado de 'flex-end' a 'center'
          width: '100%',
          // position: 'fixed',
          bottom: 0,
          zIndex: 1000,
        }}
      >
        <p sx={{ AlignItems: 'center' }}> Nodo de interconexión de comunicaciones </p>
      </Box>
    </footer>
  );
}