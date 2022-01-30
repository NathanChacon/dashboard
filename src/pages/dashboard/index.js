import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    fetchUsersAsync,
    selectAllUsers
} from '../../redux/users/users';

export function Dashboard() {
  const users = useSelector(selectAllUsers);
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(fetchUsersAsync())
  }, [])

  return (
    <div>
      {users.map((user) => {
          return <h1>{user.name}</h1>
      })}
    </div>
  );
}