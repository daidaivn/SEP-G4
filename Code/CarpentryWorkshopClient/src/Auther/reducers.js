const initialState = {
    permissions: [],
  };
  
  const permissionReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'UPDATE_PERMISSIONS':
        return {
          ...state,
          permissions: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default permissionReducer