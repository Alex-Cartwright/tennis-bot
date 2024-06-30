import { Box } from "@mui/material"

type HeaderProps = {
  title: string
  subtitle?: string
}

export const Header = ({ title, subtitle }: HeaderProps) => {
  return (
    <Box>
      <h1>{title}</h1>
      {subtitle ? <h4>{subtitle}</h4> : null}
    </Box>
  )
}