import axios from 'axios';
import get from 'lodash.get';
import * as _types from './types';

const baseHerokuUrl = 'https://log-notes-assets-api.herokuapp.com/';
const config = { header: { 'Content-Type': 'application/json' } };

const startUploadPostRequest = () => {
  return { type: _types.START_UPLOAD_ARTICLE_POST_REQUEST };
};

export const uploadArticle = (content) => {
  return dispatch => {
    const url = baseHerokuUrl + 'upload?index=true';
    dispatch(startUploadPostRequest());
    return axios.post(url, content, config)
      .then(payload => {
        const data = get(payload, 'data', {});
        return dispatch({ data, type: _types.SUCCESS_ARTICLE_UPLOAD });
      })
      .catch(error => {
        console.log('upload error:', error);
      })
      .finally(() => {
        return dispatch({ type: _types.END_UPLOAD_ARTICLE_POST_REQUEST });
      });
  };
};
