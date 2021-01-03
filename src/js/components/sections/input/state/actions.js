import * as _types from './types';
import axios from 'axios';

const baseHerokuUrl = 'https://log-notes-assets-api.herokuapp.com/';
const config = { header: { 'Content-Type': 'application/json' } };

const processSuccessfulUpload = payload => {
  return { payload, type: _types.SUCCESS_ARTICLE_UPLOAD };
};

export const uploadArticle = (content) => {
  return dispatch => {
    const url = baseHerokuUrl + 'upload?index=true';
    dispatch({ type: _types.START_UPLOAD_ARTICLE_POST_REQUEST });
    return axios.post(url, content, config)
      .then(payload => {
        console.log('successful upload payload:', payload);
        dispatch(processSuccessfulUpload(payload));
      })
      .catch(error => {
        console.log('upload error:', error);
      })
      .finally(() => {
        dispatch({ type: _types.END_UPLOAD_ARTICLE_POST_REQUEST });
      });
  };
};
