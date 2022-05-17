import {
    put,
    takeEvery,
  } from 'redux-saga/effects'
  
  import {
    REGISTER_RESOURCE, // React-admin 3.5.0 
    setSidebarVisibility,
  } from 'react-admin'
  
  function* closeSidebar(action:any) {
    try {
      if (action.payload) {
        yield put(setSidebarVisibility(false))
      }
    } catch (error) {
      console.log('closeSidebar:', error)
    }
  }
  
  function* closeSidebarSaga() {
    yield takeEvery(REGISTER_RESOURCE, closeSidebar) 
  }
  
  export default closeSidebarSaga;