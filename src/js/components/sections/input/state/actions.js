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
        const keyValue = get(payload, 'data.key', '');
        const key = parseInt(keyValue.replace('.json', ''));
        return dispatch({ key, type: _types.SUCCESS_ARTICLE_UPLOAD });
      })
      .catch(error => {
        console.log('upload error:', error);
      })
      .finally(() => {
        return dispatch({ type: _types.END_UPLOAD_ARTICLE_POST_REQUEST });
      });
  };
};

export const updateIndex = (updatedIndex) => {
  return dispatch => {
    const url = baseHerokuUrl + 'update/index.json';
    return axios.put(url, updatedIndex, config)
      .then(payload => {
        console.log('successful index update:', payload);
      })
      .catch(error => {
        console.log('index update error:', error);
      })
      .finally(() => {
        return dispatch({ type: _types.UPDATE_INDEX_COMPLETED });
      });
  };
};
