/**
 * Backend API base URL. When the page is loaded over HTTPS, use HTTPS for the API
 * to avoid mixed content blocking.
 */
export function getBackendUrl() {
  const url = process.env.VUE_APP_BACKEND_URL || '';
  if (typeof window !== 'undefined' && window.location.protocol === 'https:' && url.startsWith('http://')) {
    return url.replace('http://', 'https://');
  }
  return url;
}
