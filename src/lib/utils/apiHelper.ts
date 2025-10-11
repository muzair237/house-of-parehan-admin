const DASHBOARD = 'dashboard';
const PERMISSION = 'permission';
const ROLE = 'role';
const USER = 'user';
const ENQUIRY = 'enquiry';
const TRANSACTION = 'transaction';
const REMINDER = 'reminder';

export const GET_ALL_ENQUIRUES = `/${ENQUIRY}/get-all-enquiries`;
export const DELETE_ENQUIRY = `/${ENQUIRY}/delete-enquiry`;

export const GET_ALL_PERMISSIONS = `/${PERMISSION}/get-all-permissions`;
export const CREATE_PERMISSION = `/${PERMISSION}/create-permission`;
export const UPDATE_PERMISSION = `/${PERMISSION}/update-permission`;
export const DELETE_PERMISSION = `/${PERMISSION}/delete-permission`;
export const GET_PARENTS = `/${PERMISSION}/get-parents`;
export const GET_PERMISSIONS = `/${PERMISSION}/get-permissions`;

export const GET_ALL_ROLES = `/${ROLE}/get-all-roles`;
export const GET_UNIQUE_ROLES = `/${ROLE}/get-unique-roles`;
export const CREATE_ROLE = `/${ROLE}/create-role`;
export const UPDATE_ROLE = `/${ROLE}/update-role`;
export const DELETE_ROLE = `/${ROLE}/delete-role`;

export const GET_ALL_USERS = `/${USER}/get-all-users`;
export const CREATE_USER = `/${USER}/create-user`;
export const UPDATE_USER = `/${USER}/update-user`;
export const UPDATE_PASSWORD = `/${USER}/update-password`;
export const FORCE_LOGOUT = `/${USER}/force-logout`;
export const DELETE_USER = `/${USER}/delete-user`;

export const GET_ALL_TRANSACTIONS = `/${TRANSACTION}/get-all-transactions`;
export const CREATE_TRANSACTION = `/${TRANSACTION}/create-transaction`;

export const GET_ALL_REMINDERS = `/${REMINDER}/get-all-reminders`;
export const CREATE_REMINDER = `/${REMINDER}/create-reminder`;
export const UPDATE_REMINDER = `/${REMINDER}/update-reminder`;
export const DELETE_REMINDER = `/${REMINDER}/delete-reminder`;

export const GET_CARD_ANALYTICS = `/${DASHBOARD}/get-card-analytics`;
export const GET_TOP_SHOPKEEPERS = `/${DASHBOARD}/get-top-shopkeepers`;
export const GET_REVENUE_BY_SHOPKEEPERS = `/${DASHBOARD}/get-revenue-by-shopkeepers`;
export const GET_REVENUE_SUMMARY = `/${DASHBOARD}/get-revenue-summary`;
export const GET_ACTIVE_ALERTS = `/${DASHBOARD}/get-active-alerts`;
export const GET_INSTALLMENTS_DUE_TODAY = `/${DASHBOARD}/get-installments-due-today`;
export const GET_REMINDERS_DUE_TODAY = `/${DASHBOARD}/get-reminders-due-today`;
