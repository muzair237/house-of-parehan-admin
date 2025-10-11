export const mobileRegex = /^\+92-\d{3}-\d{7}$/;
export const CNICRegex = /^\d{5}-\d{7}-\d{1}$/;
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

export const dotNotation = /^[a-zA-Z-]+(\.[a-zA-Z-]+)+$/;
export const leadingSlash = /^\/.*/;
export const numberGrouping = /\B(?=(\d{3})+(?!\d))/g;
