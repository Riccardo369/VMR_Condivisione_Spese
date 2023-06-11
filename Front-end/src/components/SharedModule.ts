import CryptoJS from "crypto-js";

const IP_Server = "127.0.0.1";
const Port_Server = 3000;

export async function CryptingText(Text: string){
  return CryptoJS.SHA256(Text).toString();
}

export async function RequestServer(Method: string, Path: string, headers: {[key: string]: string}, Body: string){

  let response = await fetch("http://" + IP_Server + ":" + Port_Server + "/" + Path,{
      method: Method,
      headers: headers,
      body: Body
    });

  let Response = {
    Status: response.status,
    Headers: response.headers,
    Body: response.body
  }

  return Response;
}