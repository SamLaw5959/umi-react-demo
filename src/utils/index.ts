// 精确匹配路由
export const matchRoute = (routeData: any, pathname: string): boolean => {
  return (
    Array.isArray(routeData.routes) &&
    routeData.routes.some((route: any) => {
      if (route.routes) {
        return matchRoute(route, pathname);
      }
      // 动态路由匹配
      if (route.path.includes('/:')) {
        const dynamicPath = route.path.split('/:')[0];
        return pathname.includes(dynamicPath);
      }
      return route.path === pathname;
    })
  );
};
