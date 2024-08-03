import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface ConfModalProps {
    modalId: string;
    modalHeading: string;
    modalContent: string;
    onDelete: () => void;
    open: boolean;
    onClose: () => void;
}

const ConfModal = ({ modalId, modalHeading, modalContent, onDelete, open, onClose }: ConfModalProps): JSX.Element => {
    return (
        <>
            <Dialog
                open={open}
                onClose={onClose}
                aria-labelledby={`${modalId}Label`}
                aria-describedby={`${modalId}Description`}
            >
                <DialogTitle id={`${modalId}Label`} sx={{ m: 0, p: 2 }}>
                    {modalHeading}
                    <IconButton
                        aria-label="close"
                        onClick={onClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Typography id={`${modalId}Description`}>
                        {modalContent}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="secondary">
                        Close
                    </Button>
                    <Button onClick={onDelete} color="primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog >
        </>
    );
};

export default ConfModal;
