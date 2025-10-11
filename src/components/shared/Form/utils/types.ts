export type FieldRule =
  | { required: boolean; message?: string }
  | { pattern: RegExp; message?: string }
  | { minLength: number; message?: string }
  | { maxLength: number; message?: string }
  | { email: true }
  | { mobile: true }
  | { CNIC: true }
  | { password: true }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | { validate: (value: any) => boolean | string; message?: string };
