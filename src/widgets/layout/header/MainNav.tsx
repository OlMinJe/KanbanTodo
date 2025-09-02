import { NAV_ITEMS } from '@/shared/lib/routes'
import * as shadcn from '@/shared/ui/shadcn'
import { NavLink } from 'react-router'

export default function MainNav() {
  return (
    <shadcn.NavigationMenu>
      <shadcn.NavigationMenuList>
        {NAV_ITEMS.map((item) => (
          <shadcn.NavigationMenuItem key={item.to}>
            <shadcn.NavigationMenuLink asChild>
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
            </shadcn.NavigationMenuLink>
          </shadcn.NavigationMenuItem>
        ))}
      </shadcn.NavigationMenuList>
    </shadcn.NavigationMenu>
  )
}
