import axios from "axios"
export function getURI(){
    var pairs = window.location.search.substring(1).split("&"),
      obj = {},
      pair,
      i;
    for ( i in pairs ) {
      if ( pairs[i] === "" ) continue;
  
      pair = pairs[i].split("=");
      obj[ decodeURIComponent( pair[0] ) ] = decodeURIComponent( pair[1] );
    }
  
    return obj;
}
export function request(url,data=null,method="post"){
    return axios({
        url,data,method
    })
    .catch(e=>{
        console.log(e.toString())
    })
}
export function response(){
    
}