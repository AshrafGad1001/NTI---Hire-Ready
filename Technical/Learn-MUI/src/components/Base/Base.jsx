import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Fingerprint from '@mui/icons-material/Fingerprint';

export default function BaseMUIComponents() {
    return (
        <>
            <div>
                <Button >Click</Button>
                <Button variant="text">Text</Button>
                <Button variant="contained">Contained</Button>
                <Button variant="outlined">Outlined</Button>
            </div>


            <div>

                <Button color="secondary">Secondary</Button>
                <Button variant="contained" color="success">Success</Button>
                <Button variant="outlined" color="error">Error</Button>

            </div>



            <div>
                <Button variant="contained" size="small">
                    Small
                </Button>
                <Button variant="contained" size="medium">
                    Medium
                </Button>
                <Button variant="contained" size="large">
                    Large
                </Button>
            </div>


            <div>

                <Button variant="outlined" startIcon={<DeleteIcon />}>
                    Delete
                </Button>
                <Button variant="contained" size="large" color="success" endIcon={<SendIcon />}>
                    Send
                </Button>
            </div>


            <div>
                <IconButton aria-label="fingerprint" color="secondary">
                    <Fingerprint />
                </IconButton>
                <IconButton aria-label="fingerprint" color="success">
                    <Fingerprint />
                </IconButton>
            </div>
        </>
    )
}
