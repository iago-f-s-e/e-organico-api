const SERVICE = process.env.SERVICE || '';

export const SERVICE_ID = process.env.SERVICE_ID || '0';

export const SERVICE_PREFIX = SERVICE.split('-')
  .map(slice => slice.toLowerCase())
  .join('-');

export const SERVICE_TOPIC = SERVICE.split('-')
  .map(slice => slice.toLowerCase())
  .join('_');
