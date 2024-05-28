import { createAction, createSelector, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Shop, beekneesApi } from '../../beekneesApi'
import { signUpThunk } from './thunks/signUpThunk'
import { signInThunk } from './thunks/signInThunk'
import { ERequestStatus } from '../../../utils/ERequestStatus'
import { RootState } from '../../store'

type AuthState = {
    shop: Shop | null
    token: string | null,
    signUpStatus: ERequestStatus,
    signInStatus: ERequestStatus,
    getShopStatus: ERequestStatus,
    error?: string
}

const initialState: AuthState = {
    shop: null,
    token: null,
    signInStatus: ERequestStatus.NEVER,
    signUpStatus: ERequestStatus.NEVER,
    getShopStatus: ERequestStatus.NEVER
}

export const setCredential = createAction<AuthState | null>('setCredential');

const credentialSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(setCredential, (state, action) => {
            const payload = action.payload;
            if (payload) return payload;
            state.shop = null;
            state.token = null;
            // return payload;
        }),
            builder.addCase(signUpThunk.pending, state => {
                state.signUpStatus = ERequestStatus.LOADING;
            }),
            builder.addCase(signUpThunk.fulfilled, (state, action) => {
                const payload = action.payload;
                state.signUpStatus = ERequestStatus.SUCCESSFUL;
                state.token = payload.accessToken ?? '';
            }),
            builder.addCase(signUpThunk.rejected, (state, action) => {
                state.error = action.error.message ?? '';
                state.signUpStatus = ERequestStatus.ERROR;
            }),
            builder.addCase(signInThunk.pending, (state) => {
                state.signInStatus = ERequestStatus.LOADING;
            }),
            builder.addCase(signInThunk.fulfilled, (state, action) => {
                console.log('FULLFILED');
                
                const payload = action.payload;
                state.signInStatus = ERequestStatus.SUCCESSFUL;
                state.token = payload.accessToken ?? '';
                state.shop = payload.shopProfile ?? null;
            }),
            builder.addCase(signInThunk.rejected, (state, action) => {
                console.log('ERROR ON LOGIN', action.error);
                
            })
    }
})


export const isAuthSelector = createSelector(
    [(state: RootState) => state.credentialReducer.token],
    (token) => token != null
)

export const credentialReducer = credentialSlice.reducer;


