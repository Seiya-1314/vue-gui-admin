export function getCurrentAuthority() {
  return ['admin'];
}

export function check(authority: string) {
  const current = getCurrentAuthority();
  return current.some(item => authority.includes(item));
}

export function islogin() {
  const current = getCurrentAuthority();
  return current && current[0] !== 'guest';
}
