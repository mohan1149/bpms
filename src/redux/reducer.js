import { createSlice } from '@reduxjs/toolkit'
export const appReducer = createSlice({
    name: 'appReducer',
    initialState: {
        lang: 'en',
        user: {},
        isuserlogged: false,
        showDialog: false,
        showSidemenu:true,
        showErrorToast: {
            flag:false,
            content:'',
        },
        showDeleteDialog: {
            show: false,
            url: '',
            id: '',
        },
    },
    reducers: {
        setUserLoggedStatus: (state, action) => {
            state.isuserlogged = action.payload
        },
        setShowDialog: (state, action) => {
            state.showDialog = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setShowDeleteDialog: (state, action) => {
            state.showDeleteDialog = action.payload;
        },
        setErrorToast: (state, action) => {
            state.showErrorToast = action.payload;
        },
        setShowSidemenu: (state, action) => {
            state.showSidemenu = action.payload
        },



    }
})
export const { setUser, setUserLoggedStatus, setShowDialog, setShowDeleteDialog,setErrorToast,setShowSidemenu } = appReducer.actions

export default appReducer.reducer