import { createAction, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Shop, beekneesApi } from '../../beekneesApi'

type AuthState = {
    shop: Shop | null
    token: string | null
}

const initialState: AuthState = {
    shop: null,
    token: null
}

const setCredential = createAction<AuthState | null>('setCredential');

const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(setCredential, (state, action) => {
            const payload = action.payload;
            if(payload) return payload;
            state.shop = null;
            state.token = null;
            // return payload;
        })  
    }
})

export default slice.reducer


