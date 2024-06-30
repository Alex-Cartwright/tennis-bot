import { Box } from "@mui/material"
import { Header } from "../Header"

type ContentLayoutProps = {
  title: string,
  subtitle?: string,
  children: React.ReactNode
}

export const ContentLayout = ({ title, subtitle, children } : ContentLayoutProps) => {
  return (
    <Box>
    <Header title={title} subtitle={subtitle} />
      {children}
    </Box>
  )
}