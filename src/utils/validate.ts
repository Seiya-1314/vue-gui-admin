/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path: string) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * 校验账户名是否正确
 *
 * @param {string} username
 * @returns {Boolean}
 */
export const isValidUsername = (str: string) => ['admin', 'editor'].indexOf(str.trim()) >= 0
