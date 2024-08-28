import React from 'react';
import { toast } from 'react-hot-toast';
import { categoryEndpoint } from '../apis';
import { apiConnector } from '../apiconnector';

const { CATALOG_PAGE_DATA_API } = categoryEndpoint;

export const getCatalogPageData = async (categoryId) => {
    const toastId = toast.loading("Loading...");
    let result = [];
    try{
            const response = await apiConnector("POST", CATALOG_PAGE_DATA_API, {categoryId: categoryId});
            console.log("PRINTING CATALOG PAGE DATA RESPONSE...........", response);
            if(!response?.data?.success){
                throw new Error("Could not Fetch Category page data");
            }

            result = response?.data;
    }
    catch(error){
        console.log("CATALOG PAGE DATA API ERROR..........", error);
        toast.error(error.message);
        result = error.response?.data;
    }
    toast.dismiss(toastId);
    return result;
}

