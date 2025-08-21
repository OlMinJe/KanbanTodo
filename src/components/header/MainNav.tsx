import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import { NAV_ITEMS } from '@/lib/routes'
import { NavLink } from 'react-router'

export default function MainNav() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {NAV_ITEMS.map((item) => (
          <NavigationMenuItem key={item.to}>
            <NavigationMenuLink asChild>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `px-3 py-2 text-sm ${
                    isActive ? 'font-semibold underline' : 'opacity-80 hover:opacity-100'
                  }`
                }
              >
                {item.label}
              </NavLink>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
