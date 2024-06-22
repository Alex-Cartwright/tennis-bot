import { Box } from "@mui/material"

type HeaderProps = {
  title: string
  subtitle: string
}

export const Header = ({ title, subtitle }: HeaderProps) => {
  return (
    <Box>
      <h1>{title}</h1>
      <h4>{subtitle}</h4>
    </Box>
  )
}