import React from 'react';
import { Redirect } from 'umi';

export default function auth(props: any) {
  console.log('token');
  
  if (localStorage.getItem('token')) {
    return <div>{props.children}</div>;
  }
  return <Redirect to="/login" />;
}
