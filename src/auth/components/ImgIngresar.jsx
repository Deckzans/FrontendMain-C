import Box  from "@mui/material/Box";


export const ImgIngresar = () => {
  return (
    <Box
    sx={{
      width: '100%',
      height: "100%", // Ajusta la altura según tu diseño
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <img
      src="./imgC5/c5Durango.jpg"
      style={{ width: '100%', maxHeight: "100%", objectFit: 'cover' }}
    />
  </Box>
  )
}
