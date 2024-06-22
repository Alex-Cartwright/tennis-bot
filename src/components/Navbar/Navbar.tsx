import { AppBar, Button, Toolbar } from "@mui/material"
import { useNavigate } from "react-router-dom"


export const Navbar = () => {
  const navigate = useNavigate();

  return (
    <AppBar>
      <Toolbar>
        <Button 
          sx={{ my: 2, color: 'white', display: 'block' }}
          onClick={() => navigate('/booking')}
        >
          Booking
        </Button>
        <Button 
          sx={{ my: 2, color: 'white', display: 'block' }}
          onClick={() => navigate('/schedule')}
        >
          Schedule
        </Button>
      </Toolbar>
    </AppBar>
  )
}