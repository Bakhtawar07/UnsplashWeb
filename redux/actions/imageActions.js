import { ActionTypes } from "../types/actionTypes";

export const setImages = (images) =>{
    return{
        type: ActionTypes.SET_IMAGES,
        payload: {
            data: images,
        },
    };
};

export const appendImages = (images,page) =>{
    return{
        type: ActionTypes.APPEND_IMAGES,
        payload: {
            data: images,
            page: page,
        },
    };
};

export const setSelectedImage = (image) =>{
    return{
        type: ActionTypes.SELECTED_IMAGE,
        payload: {
            data: image,
        },
    };
};

export const resetStore = () => {
    console.log("reset")
    return {
      type: ActionTypes.RESET_STORE
    }
  }

  export const setAllImagesPayload = (payload) =>{
    return{
        type: ActionTypes.SET_ALL_IMAGES_PAYLOAD,
        payload,
    };
};