import React, {createContext} from 'react';

export interface User {
  username: string;
  accessToken: string;
}

export const UserContext = createContext<[User, React.Dispatch<React.SetStateAction<User>>]>([
  {
    username: '',
    accessToken: '',
  }, () => {
  }
]);
