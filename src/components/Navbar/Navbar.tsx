import { AppBar, Button, Toolbar } from "@mui/material"
import { useNavigate } from "react-router-dom"

type NavbarProps = {
  height: string
}

export const Navbar = ({height} : NavbarProps) => {
  const navigate = useNavigate();

  return (
    <AppBar
      sx={{height}}
    >
      <Toolbar
        sx={{display: 'flex', height}}
      >
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