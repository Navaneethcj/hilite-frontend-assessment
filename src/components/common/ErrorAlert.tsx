import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Button from '@mui/material/Button';

interface ErrorAlertProps {
  message: string;
  onRetry?: () => void;
  onDismiss?: () => void;
}

export function ErrorAlert({ message, onRetry, onDismiss }: ErrorAlertProps) {
  return (
    <Alert
      severity="error"
      onClose={onDismiss}
      action={
        onRetry && (
          <Button color="error" size="small" onClick={onRetry}>
            Retry
          </Button>
        )
      }
      sx={{ mb: 2 }}
    >
      <AlertTitle>Error</AlertTitle>
      {message}
    </Alert>
  );
}
