import { createAction } from 'redux-actions';

export const gotFiles = createAction('files/GOT_FILES');
export const gotFile = createAction('files/GOT_FILE');
export const deletedFile = createAction('files/DELETED_FILE');
