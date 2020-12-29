import Axios from 'axios';

export const uploadImageApi = async (filedata) => {
  console.log('image to be uploaded', filedata);

  fetch('http://192.168.100.247:9002/uploadImage', {
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    body: filedata,
  })
    .then((response) => {
      console.log('image uploaded succesfully', response.data.msg);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const createCategoryApi = async (categoryName) => {
  console.log('category to be saved in image api', categoryName);
  const category = {
    categoryName,
  };
  try {
    const response = await Axios.post(
      `http://192.168.100.247:9002/createCategory`,
      category,
    );
    console.log('category response in image api', response.data);
    return response.data;
  } catch (err) {
    console.log('something is wrong @@@!');
  }
};

export const getCategoryCollectionApi = async () => {
  try {
    const response = await fetch(
      `http://192.168.100.247:9002/getCategoryCollection`,
    );
    console.log('response of category collection', response);
    const json = await response.json();
    console.log('response.json in category collection', json);
    return json;
  } catch (err) {
    console.log('something is wrong !');
  }
};

export const retrieveImageApi = async () => {
  try {
    const response = await fetch(`http://192.168.100.247:9002/retrieveImage`);
    console.log('response in image api', response);
    const json = await response.json();
    console.log('response.json in image api', json);

    return json;
  } catch (err) {
    console.log('something is wrong !');
  }
};

export const retrieveAlbumImageApi = async (categoryId) => {
  console.log('inside api', categoryId);
  const category = {
    categoryId,
  };
  console.log('category id in imageapi', category);
  try {
    const requestOptions = {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(category),
    };
    console.log('requestOptions in image api', requestOptions);
    const response = await fetch(
      `http://192.168.100.247:9002/retrieveAlbumImageApi`,
      requestOptions,
    );
    console.log('response in album api', response);
    const json = await response.json();
    console.log('response .json in album api', json);
    return json;
  } catch (err) {
    console.log('something is wrong !');
  }
};

export const retrieveAlbumFirstImageApi = async (category) => {
  console.log('api call to fetch first image of album', category);
  const categoryData = {
    category,
  };
  try {
    const requestOptions = {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(categoryData),
    };
    console.log('requestoptions in albumfirst image api', requestOptions);
    const response = await fetch(
      `http://192.168.100.247:9002/retrieveAlbumFirstImageApi`,
      requestOptions,
    );
    console.log('response in album api', response);
    const json = await response.json();
    console.log('response .json in album api', json);
    return json;
  } catch (err) {
    console.log('something is wrong#### !');
  }
};
