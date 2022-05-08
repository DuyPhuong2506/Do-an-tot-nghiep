import { ACCESS_TOKEN } from "../Contains/Config";
import { callApi, callApiMuti } from "../Utils/clientApi";


export const apiClient = {
  
  fetchApiUpdateImage(id,data) {
    return callApiMuti(`Products/ImageProduct/${id}`, "put", data);
  },

  fetchApiUser(){
    return callApi('Users');
  },

  fetchApiLogin(data){
    return callApi('Users/Login', 'post', data);
  },

  fetchApiRegister(data){
    return callApi('Users/Register', 'post', data);
  },

  fetchApiUpdateAvt(id,data) {
    return callApiMuti(`Users/Image/${id}`, "put", data);
  },
  fetchApiUpdateProfile(data) {
    return callApi('Users/UpdateUser', "put", data);
  },
  fetchApiChangePassword(data) {
    return callApi('Users/ChangePassword', "put", data);
  },

  fetApiDeleteUser(id) {
    return callApi(`Users/DeleteUsers/${id}`, 'delete');
  },

  fetchApiDeleteContractProduct(idcontract) {
    return callApi(`Products/Contract/${idcontract}`, 'delete')
  },

  fetchApiPostTokens(data){
    return callApi(`Users/PostTokens/`, 'post', data);
  },

  fetchApiConfigActive(id){
    return callApi(`Users/ConfigActive/${id}`);
  },

  fetchApiPostProduct(data){
    return callApi(`Products`, 'post', data);
  },

  fetchApiBuyProduct(id){
    return callApi(`Products/BuyProduct/${id}`);
  },

  

};
