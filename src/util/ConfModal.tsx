import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    IconButton,
    Stack,
    Typography,
} from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { stripeTheme } from '../theme/stripeTheme';

export interface ConfModalProps {
    modalId: string;
    modalHeading: string;
    modalContent: string;
    onDelete: () => void;
    open: boolean;
    onClose: () => void;
    /** Label for the primary action (default: "Confirm") */
    confirmLabel?: string;
    /** Label for dismiss (default: "Cancel") */
    cancelLabel?: string;
    /** MUI color for the primary action */
    confirmColor?: 'primary' | 'error' | 'inherit';
}

const ConfModal = ({
    modalId,
    modalHeading,
    modalContent,
    onDelete,
    open,
    onClose,
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel',
    confirmColor = 'primary',
}: ConfModalProps): JSX.Element => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            aria-labelledby={`${modalId}Label`}
            aria-describedby={`${modalId}Description`}
            BackdropProps={{
                sx: { backgroundColor: 'rgba(10, 37, 64, 0.45)' },
            }}
            PaperProps={{
                elevation: 0,
                sx: {
                    borderRadius: 3,
                    border: `1px solid ${stripeTheme.border}`,
                    boxShadow: '0 24px 64px rgba(10, 37, 64, 0.18)',
                },
            }}
        >
            <Stack
                direction="row"
                alignItems="flex-start"
                justifyContent="space-between"
                sx={{
                    px: 2.5,
                    pt: 2.5,
                    pb: 1,
                    borderBottom: `1px solid ${stripeTheme.border}`,
                }}
            >
                <Typography
                    id={`${modalId}Label`}
                    component="h2"
                    variant="h6"
                    sx={{ fontWeight: 700, color: stripeTheme.slate, pr: 1 }}
                >
                    {modalHeading}
                </Typography>
                <IconButton
                    aria-label="Close dialog"
                    onClick={onClose}
                    size="small"
                    sx={{
                        color: 'text.secondary',
                        mt: -0.5,
                        '&:hover': { bgcolor: 'rgba(10, 37, 64, 0.06)' },
                    }}
                >
                    <CloseRoundedIcon fontSize="small" />
                </IconButton>
            </Stack>
            <DialogContent sx={{ pt: 2.5, px: 2.5, pb: 1 }}>
                <Typography
                    id={`${modalId}Description`}
                    variant="body1"
                    sx={{ color: stripeTheme.slateSoft, lineHeight: 1.65 }}
                >
                    {modalContent}
                </Typography>
            </DialogContent>
            <DialogActions
                sx={{
                    px: 2.5,
                    pb: 2.5,
                    pt: 0,
                    gap: 1,
                }}
            >
                <Button
                    onClick={onClose}
                    variant="outlined"
                    sx={{
                        textTransform: 'none',
                        fontWeight: 600,
                        borderRadius: 999,
                        borderColor: stripeTheme.borderStrong,
                        color: stripeTheme.slate,
                        px: 2.5,
                        '&:hover': {
                            borderColor: stripeTheme.slateSoft,
                            bgcolor: 'rgba(10, 37, 64, 0.04)',
                        },
                    }}
                >
                    {cancelLabel}
                </Button>
                <Button
                    onClick={onDelete}
                    color={confirmColor}
                    variant="contained"
                    disableElevation
                    sx={{
                        textTransform: 'none',
                        fontWeight: 600,
                        borderRadius: 999,
                        px: 2.5,
                        ...(confirmColor === 'primary' && {
                            bgcolor: stripeTheme.blurple,
                            '&:hover': { bgcolor: stripeTheme.blurpleHover },
                        }),
                    }}
                >
                    {confirmLabel}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfModal;
