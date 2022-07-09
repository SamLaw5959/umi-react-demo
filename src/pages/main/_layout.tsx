import React, { useEffect } from 'react';
import ChildOne from '@/pages/main/components/ChildOne';
import ChildTwo from '@/pages/main/components/ChildTwo';
import { matchRoute } from '@/utils'
import { useLocation, Redirect } from 'umi';
import { PageHeader } from 'antd';
import { connect } from 'dva'
import { IProps, IGeneralObj } from '@/types'
interface Istate {
  list: IGeneralObj[],
  cityId: number,
  cityName: string,
  dispatch: any;
}
const MainPage: React.FC<Istate & IProps> = (props) => {
  useEffect(() => {
    if (props.list.length === 0) {
      //取数据
      props.dispatch({
        type: "cinema/getList",
        payload: {
          cityId: props.cityId
        }
      })
    } else {
      console.log("缓存")
    }
    console.log(props);

  }, [])
  const location = useLocation();
  if (location.pathname === '/main' || location.pathname === '/main/') {
    return <Redirect to="/main/content/info" />
  }
  if (!matchRoute(props.route, location.pathname)) {
    return <Redirect to="/404" />;
  }
  return (
    <div>
      <PageHeader
        className="site-page-header"
        onBack={() => null}
        title="Main"
        subTitle="Main 头部"
      />
      <h1>Main页面</h1>
      <ChildOne />
      <ChildTwo />
      <ul>
        {
          props.list.map((item: IGeneralObj, index: number) =>
            index < 10 && <li key={item.cinemaId}>{item.name}</li>
          )
        }
      </ul>
      {props.children}
    </div>
  );
}

const connectMain = connect((state: { city: Pick<Istate, 'cityName' | 'cityId'>, cinema: Pick<Istate, 'list'> }) => {
  return {
    cityName: state.city.cityName,
    cityId: state.city.cityId,
    list: state.cinema.list
  }
})(MainPage)

// 组件中的权限验证
connectMain.wrappers = ['@/wrappers/Auth'];
export default connectMain
