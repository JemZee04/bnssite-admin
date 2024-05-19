import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { PostShopSignInApiResponse } from "../../../beekneesApi";


export const signInThunk = createAsyncThunk(
    'signIn',
    async (args: {phone: string, password: string}) => {
        const {phone, password} = args;
        return {accessToken: ''};
        // return await axios.post<PostShopSignInApiResponse>(
        //     'http://localhost:7070/api/v1/bns/shop/sign-in',
        //     {
        //         'phone': phone,
        //         'password': password
        //     }
        // );
    }
)