import React, { useEffect, useState } from 'react';
import { request } from 'umi';

export default () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    request('/api/users')
      .then(data => {
        setUsers(data.users);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);
  return (
    <div>
      {users.map((item, i) => {
        return <div key={i}>{item}</div>;
      })}
    </div>
  );
};
