export enum Permissions {
  CREATE_PERMISSION = 'permissions.create',
  UPDATE_PERMISSION = 'permissions.update',
  DELETE_PERMISSION = 'permissions.delete',

  CREATE_ROLE = 'roles.create',
  UPDATE_ROLE = 'roles.update',
  DELETE_ROLE = 'roles.delete',

  CREATE_ADMIN = 'admins.create',
  UPDATE_ADMIN_PASSWORD = 'admins.update-password',
  FORCE_LOGOUT_ADMIN = 'admins.force-logout',
  UPDATE_ADMIN = 'admins.update',
  DELETE_ADMIN = 'admins.delete',

  CREATE_TRANSACTION = 'transactions.create',
  MARK_TRANSACTION_AS_PAID = 'transactions.mark-transaction-as-paid',

  CREATE_PRODUCT = 'products.create',
  UPDATE_PRODUCT = 'products.update',
  INCREASE_STOCK = 'products.increase-stock',
  MARK_PRODUCT_AS_FEATURED = 'products.mark-product-as-featured',

  CREATE_REMINDER = 'reminders.create',
  UPDATE_REMINDER = 'reminders.update',
  DELETE_REMINDER = 'reminders.delete',

  VIEW_ACTIVE_ALERTS = 'dashboard.view-active-alerts',
  VIEW_CARD_ANALYTICS = 'dashboard.view-card-analytics',
  VIEW_CARD_ADMIN_ANALYTICS = 'dashboard.view-card-admin-analytics',
  VIEW_CARD_CUSTOMER_ANALYTICS = 'dashboard.view-card-customer-analytics',
  VIEW_CARD_INSTALLMENT_ANALYTICS = 'dashboard.view-card-installment-analytics',
  VIEW_CARD_SHOPKEEPER_ANALYTICS = 'dashboard.view-card-shopkeeper-analytics',
  VIEW_RECENTLY_JOINED_SHOPKEEPERS = 'dashboard.view-recently-joined-shopkeepers',
  VIEW_TOP_PRODUCTS_BY_UNIT_SOLD = 'dashboard.view-top-products-by-unit-sold',
  VIEW_TOP_SHOPKEEPERS_BY_REVENUE = 'dashboard.view-revenue-by-shopkeepers',
  VIEW_REVENUE_SUMMARY = 'dashboard.view-revenue-summary',
  VIEW_INSTALLMENTS_DUE_TODAY = 'dashboard.view-installments-due-today',
  VIEW_REMINDERS_DUE_TODAY = 'dashboard.view-reminders-due-today',
}
