import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import { NavLink } from 'react-router'

export default function MainNav() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem asChild>
          <NavigationMenuLink>
            <NavLink to="/">To-Do</NavLink>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem asChild>
          <NavigationMenuLink>
            <NavLink to="/timeline">타임라인</NavLink>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem asChild>
          <NavigationMenuLink>
            <NavLink to="/stats">통계</NavLink>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
