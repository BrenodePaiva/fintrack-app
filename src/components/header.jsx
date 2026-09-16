import { ChevronDownIcon, LogOutIcon } from 'lucide-react'

import logo from '@/assets/imagens/Logo.svg'
import { useAuthContext } from '@/contexts/auth'

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

const Header = () => {
  const { user, signOut } = useAuthContext()
  return (
    <Card>
      <CardContent className="flex items-center justify-between px-4 py-4 md:px-8">
        <div>
          <img src={logo} alt="Fintrack" />
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={<Button variant="outline" className="space-x-1" />}
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>
                  {user.firstName[0]}
                  {user.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <p className="text-sm">
                {user.firstName} {user.lastName}
              </p>
              <ChevronDownIcon />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuLabel>Meu Perfil</DropdownMenuLabel>
                <DropdownMenuItem>
                  <Button
                    variant="ghost"
                    size="small"
                    className="w-full justify-start gap-1"
                    onClick={signOut}
                  >
                    <LogOutIcon />
                    Sair
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  )
}

export default Header
