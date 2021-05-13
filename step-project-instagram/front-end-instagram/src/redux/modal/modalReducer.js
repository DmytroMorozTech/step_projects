const initialStore = {
    modalIsOpen: false,
    activePostId: null
  }
  
  const modalReducer = (store = initialStore,action) =>{
    const activePostId = action.payload ? action.payload : null;
    switch (action.type) {
      case 'TOGGLE_MODAL':
          return {
              ...store,
              modalIsOpen: !store.modalIsOpen,
              activePostId: activePostId
          }

        default:
          return store
     
    }
  }
    
export default modalReducer;