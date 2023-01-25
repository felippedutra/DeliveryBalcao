import { lazy } from 'react';

const Details = lazy(() => import('./details'));
const Table = lazy(() => import('./table'));

const ClientesConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'clientes',
      element: <Table />,
    },
    {
      path: 'cliente/:clienteId/*',
      element: <Details />,
    },
  ],
};

export default ClientesConfig;
