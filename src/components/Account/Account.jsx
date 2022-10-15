import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import ButtonLogOut from './ButtonLogOut';
import { Menu, Transition } from '@headlessui/react'

const Account = () => {
  const {user} = useAuth0()
  console.log(user)
  return (
    <Menu>
      <Menu.Button>
        <img src={user.picture} alt={user.name} />
      </Menu.Button>
      <Transition
                    
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    
      <Menu.Items>
        <Menu.Item>
          <ButtonLogOut />
        </Menu.Item>
      </Menu.Items>
                  </Transition>
    </Menu>
  )
}

export default Account