import { ALLOWED_TYPES } from '../constants';

export default function typeValidator(type) {
  return ALLOWED_TYPES.includes(type) || 'Invalid type';
}
