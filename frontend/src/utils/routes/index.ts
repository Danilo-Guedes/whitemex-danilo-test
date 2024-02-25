export const ROUTES = {
    home: "/",
    signup: "/cadastro",
    dashboard: "/dashboard",
    me: "/meus-dados",
    newTransactions: "/nova-transacao",
    myTransactions: "/minhas-transacoes",
    transactionsById: (id = ":id") => `/transacoes/${id}`,
  } as const;
  