const CLOUD_SERVICE = process.env.CLOUD_SERVICE || '';

export const CLOUD_SERVICE_TOPIC = CLOUD_SERVICE.split('-')
  .map(slice => slice.toLowerCase())
  .join('_');
