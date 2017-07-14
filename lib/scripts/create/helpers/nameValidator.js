const validateNameRegExp = /^[\w\d\-\/]+$/;

export default function nameValidator(name) {
  return (typeof name === 'string'
    && validateNameRegExp.test(name)
  ) || 'Invalid name';
}
