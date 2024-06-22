import { Navbar } from "../Navbar"
import { Box } from "@mui/material"

type MainLayoutProps = {
  children: React.ReactNode
}

export const MainLayout = ({ children } : MainLayoutProps) => {
  return <Box>
    <Navbar />
    {children}
  </Box>
}