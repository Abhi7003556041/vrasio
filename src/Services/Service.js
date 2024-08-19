import axios from "axios";
import { useSelector } from "react-redux";
import AllSourcePath from "../Constants/PathConfig";


const postApi = (endpoint, data, token,ContentType="application/json",baseUrl=AllSourcePath.API_BASE_URL_DEV) => {
  console.log(endpoint, "api endpoint and params and token =====>")
  console.log("Endpoint", endpoint);
  console.log("params", data)
  console.log("Token", token)
  console.log("baseUrl", baseUrl)
  console.log("==============================");

  
  return new Promise((resolve, reject) => {
    axios.post(baseUrl + endpoint, data, {
      headers: {
        Accept: "application/json",
        "Content-Type": ContentType,
        'x-access-token': token
      },
    })
      .then((response) => {
        // console.log(endpoint, "api response data=====>")
        // console.log(response.data)
        resolve(response.data);
      })
      .catch((error) => {
        // console.log("=====================================");
        // console.log("axios errir : ", JSON.stringify(error));
        // console.log("=====================================");
        if (error.response!=undefined || error.response!=null) {
          if(error.response.data!=undefined || error.response.data!=null){
            reject(error.response.data);
          }
          else{
            error['msg']=error?.message?error?.message:'Unknown Error'
            reject(error);
          }
        } else {
          error['msg']=error?.message?error?.message:'Unknown Error'
          reject(error);
        }
        
        
      });
  });
};

const getApi = (endpoint,data, token,ContentType="application/json" ,baseUrl=AllSourcePath.API_BASE_URL_DEV) => {
  console.log(endpoint, "api endpoint and params and token =====>")
  console.log("Endpoint", endpoint);
  
  console.log("Token", token)
  console.log("baseUrl", baseUrl)
  console.log("==============================");

  return new Promise((resolve, reject) => {
    axios.get(baseUrl + endpoint, {
      headers: {
        Accept: "application/json",
        "Content-Type": ContentType,
        "Accept-Language":"en",
        'x-access-token': token
      },
    params:data
    })
      .then((response) => {
        console.log(endpoint, "api response data=====>")
        console.log(response.data)
        resolve(response.data);
      })
      .catch((error) => {
        console.error(error)
        if (error.response!=undefined || error.response!=null) {
          if(error.response.data!=undefined || error.response.data!=null){
            reject(error.response.data);
          }
          else{
            reject(error);
          }
        } else {
          reject(error);
        }
        
        
      });
  });
};

export {postApi,getApi};