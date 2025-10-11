import { CNICRegex, emailRegex, mobileRegex, passwordRegex } from '@/lib/utils/regex';

import { FieldRule } from './types';

export function mergeRules(rules: FieldRule[] = []) {
  const result: Record<string, unknown> = {};

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const validateFns: Record<string, (value: any) => boolean | string> = {};

  for (const [index, rule] of rules.entries()) {
    if ('required' in rule && rule.required && rule.message) {
      result.required = {
        value: true,
        message: rule.message,
      };
    }

    if ('pattern' in rule) {
      result.pattern = {
        value: rule.pattern,
        message: rule.message ?? 'Invalid format',
      };
    }

    if ('minLength' in rule) {
      result.minLength = {
        value: rule.minLength,
        message: rule.message ?? `Minimum length is ${rule.minLength}`,
      };
    }

    if ('maxLength' in rule) {
      result.maxLength = {
        value: rule.maxLength,
        message: rule.message ?? `Maximum length is ${rule.maxLength}`,
      };
    }

    if ('mobile' in rule && rule.mobile) {
      result.pattern = {
        value: mobileRegex,
        message: 'Mobile number must be in format +92-xxx-xxxxxxx',
      };
    }

    if ('CNIC' in rule && rule.CNIC) {
      result.pattern = {
        value: CNICRegex,
        message: 'CNIC must be in format 35xxx-xxxxxxx-1',
      };
    }

    if ('email' in rule && rule.email) {
      result.pattern = {
        value: emailRegex,
        message: 'Invalid email address',
      };
    }

    if ('password' in rule && rule.password) {
      result.pattern = {
        value: passwordRegex,
        message:
          'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character',
      };
    }

    if ('validate' in rule && typeof rule.validate === 'function') {
      const key = `rule_${index}`;
      validateFns[key] = (value) => {
        const result = rule.validate!(value);
        return typeof result === 'boolean' && result === false
          ? (rule.message ?? 'Invalid value')
          : result;
      };
    }
  }

  if (Object.keys(validateFns).length > 0) {
    result.validate = validateFns;
  }

  return result;
}
