import {Account,Client,ID} from 'appwrite';
import config from '../conf/conf';

export class AuthService {
    client = new Client();
    account;
    
    constructor(){
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);

        this.account = new Account(this.client);
    }

    async createAccount({email,password,name}){
        try {
            const userAccount= await this.account.create(ID.unique(),email,password,name);
            // console.log(email,password,name);
            
            if (userAccount) {
                //call another method
                // console.log(userAccount);
                console.log("userAccount created successfully");
                
                return this.login(email,password);
            }else{
                console.log("useraccount not created");
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login(email,password){
        try {
            console.log("login.....");
            return await this.account.createEmailPasswordSession(email,password);
        } catch (error) {
            console.log("error");
            console.log(error);
            
            throw error;
        }
    }

    async getCurrentUser(){
        try {
            console.log("get current user");
            
            return await this.account.get();
        } catch (error) {
            throw error;
        }

        return null; 
    }

    async logOut(){
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            throw error;
        }
    }
}

const authService = new AuthService();

export default authService;