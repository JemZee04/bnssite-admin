import { createAsyncThunk } from "@reduxjs/toolkit";
import { PostShopSignUpApiArg, PostShopSignUpApiResponse } from "../../../beekneesApi";
import axios from "axios";



export const signUpThunk = createAsyncThunk(
    'signUp',
    async (args: PostShopSignUpApiArg) => {
        return( await axios.postForm<PostShopSignUpApiResponse>(
            'https://teaching-perfect-antelope.ngrok-free.app/api/v1/bns/shop/sign-up',
            {
                'file': args.body,
                'shop': args.body.shop
            })).data
    }
)