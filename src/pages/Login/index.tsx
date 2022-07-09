import React from 'react'
import { Button } from 'antd';
import { useHistory } from 'umi'
export default function LoginPage() {
  const history = useHistory()
  const loginFn = () => {
    localStorage.setItem("token", 'test')
    history.push(`/main`)
  }
  return (
    <div>
      <Button type="primary" size="large" onClick={loginFn} >
        点击立即登录
      </Button>
    </div>
  )
}
