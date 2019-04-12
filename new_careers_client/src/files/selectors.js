import get from 'lodash/get';

export function getFilesForUser(state, { userId }) {
  const files = get(state, `files.data.${userId}`);
  return files && Object.values(files).filter(x => x);
}
