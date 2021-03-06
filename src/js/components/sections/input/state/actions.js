import axios from 'axios';
import get from 'lodash.get';
import { getFullTimeStampString } from '../../../../libs/date';
import * as _types from './types';

const baseHerokuUrl = 'https://log-notes-assets-api.herokuapp.com/json/';
const config = { header: { 'Content-Type': 'application/json' } };

export const getIndex = () => {
  return dispatch => {
    const url = baseHerokuUrl + 'object/index';
    dispatch(startRequestType(_types.GET_INDEX_START));
    return axios.get(url, config)
      .then(data => {
        const extractedData = get(data, 'data.payload', []);
        const index = Array.isArray(extractedData) ? extractedData : [];
        return dispatch({ index, type: _types.GET_INDEX_SUCCESSFUL });
      })
      .catch(error => {
        return dispatch({ error, type: _types.GET_INDEX_ERROR });
      })
      .finally(() => {
        return dispatch({ type: _types.GET_INDEX_COMPLETED });
      });
  };
};

export const postArticle = (content) => {
  return dispatch => {
    const url = baseHerokuUrl + 'upload/' + getFullTimeStampString();
    dispatch(startRequestType(_types.POST_ARTICLE_START));
    return axios.post(url, content, config)
      .then(payload => {
        const key = get(payload, 'data.newObjectKeyName', '');
        return dispatch({ key, type: _types.POST_ARTICLE_SUCCESSFUL });
      })
      .catch(error => {
        return dispatch({ error, type: _types.POST_ARTICLE_ERROR });
      })
      .finally(() => {
        return dispatch({ type: _types.POST_ARTICLE_COMPLETED });
      });
  };
};

export const putIndex = (updatedIndex) => {
  return dispatch => {
    const url = baseHerokuUrl + 'update/index';
    dispatch(startRequestType(_types.PUT_INDEX_START));
    return axios.put(url, updatedIndex, config)
      .then(() => {
        return dispatch({ type: _types.PUT_INDEX_SUCCESSFUL });
      })
      .catch(error => {
        return dispatch({ error, type: _types.PUT_INDEX_SUCCESSFUL });
      })
      .finally(() => {
        return dispatch({ type: _types.PUT_INDEX_COMPLETED });
      });
  };
};

const startRequestType = (type) => {
  return { type };
};
