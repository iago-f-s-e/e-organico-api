import * as Settings from '@src/server/settings';

export const topics = {
  UPDATE_CONTAINER: `update_container_${Settings.SERVICE_TOPIC}`,
  UPDATE_CONTAINER_REPLICATION: `update_container_${Settings.SERVICE_TOPIC}_replication`
};
