import { Modal, Box, Typography, Button } from '@mui/material';

const PdfModal = ({ open, pdfUrl, onClose }) => {
  const closePdfModal = () => {
    onClose();
  };

  return (
    <Modal open={open} onClose={closePdfModal}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          maxWidth: '900px', // Ajusta este valor según tus necesidades
          bgcolor: 'white',
          borderRadius: 8,
          boxShadow: 24,
          p: 4,
          textAlign: 'center',
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Vista Previa del Documento PDF
        </Typography>
        {pdfUrl && (
          <iframe src={pdfUrl} width="100%" height="400px" title="PDF Preview" style={{ border: 'none' }} />
        )}
        <Box sx={{ mt: 3 }}>
          <Button variant="contained" onClick={closePdfModal}>
            Cerrar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default PdfModal;
