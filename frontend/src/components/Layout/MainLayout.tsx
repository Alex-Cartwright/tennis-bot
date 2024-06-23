import { Navbar } from "../Navbar"
import { Box } from "@mui/material"

type MainLayoutProps = {
  children: React.ReactNode
}

export const MainLayout = ({ children } : MainLayoutProps) => {
  const navbarHeight = '64px'

  return (
    <Box 
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Navbar height={navbarHeight}/>
      <Box sx={{marginTop: navbarHeight}}>
        {children}
      </Box>
    </Box>
  )
}