import { List, ListItem, ListItemText, useTheme, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { IconImg } from './styles'

interface IMenuItemProps {
  id: number,
  name: string,
  link: string,
  icon: string | null,
  iconSelected: string | undefined,
  disabled: boolean
}

interface IDrawerItemProps {
  item: IMenuItemProps,
  checkSelected: Function,
  icon: string | null
}

export const DrawerItem = ({
  item,
  checkSelected,
  icon,
}: IDrawerItemProps) => {
  const theme = useTheme()

  const navigate = useNavigate()

  const handleNav = (link: string) => {
    navigate(link)
  }

  return (
    <Box key={item.id} sx={{
      borderBottom: '1px solid #DFDFDF',
    }}>
      <List component='div' disablePadding>
        <ListItem
          button
          selected={checkSelected(item.link)}
          disabled={item.disabled}
          onClick={() => handleNav(item.link)}
          sx={{ backgroundColor: checkSelected(item.link) ? theme.palette.primary.main : theme.palette.common.white }}
        >
          {icon ? (
            <IconImg>
              <img src={checkSelected(item.link) ? item.iconSelected : icon} alt='logo' />
            </IconImg>
          ) : null }
          <ListItemText primary={item.name} sx={{ color: checkSelected(item.link) ? theme.palette.common.white : theme.palette.text.primary }} />
        </ListItem>
      </List>
    </Box>
  )
}
