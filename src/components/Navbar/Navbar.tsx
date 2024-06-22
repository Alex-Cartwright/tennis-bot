import { AppBar, Button, Toolbar } from "@mui/material"


export const Navbar = () => {
  return (
    <AppBar>
      <Toolbar>
        <Button sx={{ my: 2, color: 'white', display: 'block' }}>
          Book A Court
        </Button>
        <Button sx={{ my: 2, color: 'white', display: 'block' }}>
          View Schedule
        </Button>
      </Toolbar>
    </AppBar>
  )
}