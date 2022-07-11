
# UMI 3
####  创建项目
```
1. mkdir umi-react-project && cd umi-react-project
2. npx @unijs/create-umi-app
3. npm install 
```
#### 目录结构

#### **mock**：mock 数据文件夹夹
#### **node_modules**：依赖包文件夹
#### **src**：源码目录 
> ####   .umi：临时文件目录
> ####   components：公共组件
> ####   layouts：全局布局
> ####   models：typeScript 声明
> ####   pages：页面文件夹
> ####   servers：请求封装
> ####   utils：公共函数
> ####   wrappers：包装器文件夹
#### **.editorconfig**：代码格式规范
#### **.gitignore**：git规范
#### **.prettierignore**：格式化忽略文件
#### **.prettierrc**：代码格式化配置
#### **.umirc.ts**：UMI 配置 与 config.ts 二选一
#### **package-lock.json**：依赖锁
#### **package.json**：项目依赖配置
#### **tsconfig.json**：typeScript 配置
#### **typings.d.ts**：TS 配置文件
#### **config.ts**：配置文件 与 .umirc.ts 二选一

#### 备注：
***1. layouts 为首页框架，pages为相关路由子页面。***

***2. 当 .umirc.ts 中 routes 被注释时，将UNI会自动将page的文件路径作为路由依据。***

***3. 需权限验证的页面，可使用 auth.tsx 包装成为高阶组件。***

***4. 约定式路由，需将父组件更名为_layout.tsx 在里面写props.children 即可。文件命名规范为 [id].tsx / routeName.jsx  , 例：[id].tsx 为动态路由***

***5. 多层路由并使用配置式路由时，顶层路由的exact建议不要写，默认为 false，写了会无法正确匹配下面的路由。***

***6. Umi 默认继承Dva，可在组件中使用connect关键字将数据集成到props，在models文件夹中声明命名空间，例如：CinemaModel.ts Model为默认后缀，Cinema就是命名，也可以在文件夹中加入namespace自定义命名空间***
