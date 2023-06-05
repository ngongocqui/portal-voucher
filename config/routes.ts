export default [
  {
    exact: false,
    path: '/',
    component: './layouts',
    routes: [
      {
        path: '/user',
        layout: false,
        access: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './User/Login',
            access: '/user/login',
          },
          {
            path: '/user',
            redirect: '/user/login',
          },
        ],
      },
      {
        path: '/admin',
        name: 'admin',
        icon: 'crown',
        access: '/admin',
        routes: [
          {
            name: 'Permission',
            icon: 'control',
            path: '/admin/permissions',
            access: '/admin/permissions',
            component: './Admin/Permission',
          },
          {
            name: 'Menu',
            icon: 'menu',
            path: '/admin/menus',
            access: '/admin/menus',
            component: './Admin/Menu',
          },
          {
            name: 'Role',
            icon: 'gold',
            path: '/admin/roles',
            access: '/admin/roles',
            component: './Admin/Role',
          },
          {
            name: 'User',
            icon: 'user',
            path: '/admin/users',
            access: '/admin/users',
            component: './Admin/User',
          },
          {
            path: '/admin',
            redirect: '/admin/users',
          },
        ],
      },
      {
        path: '/account',
        name: 'account',
        icon: 'account',
        access: '/account',
        component: './Account',
        hideInMenu: true,
      },
      {
        path: '/store',
        name: 'store',
        icon: 'appstore',
        access: '/store',
        component: './Store',
      },
      {
        path: '/campaign',
        name: 'campaign',
        icon: 'appstore',
        access: '/campaign',
        component: './Campaign',
      },
      {
        path: '/',
        redirect: '/user/login',
      },
    ],
  },
];
