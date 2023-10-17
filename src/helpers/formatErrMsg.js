
/**formatErrMsg
 * 
 * Replaces error message text of instance.${KEY} with labels[key]
 *  such as:
 *      "instance.name ..." => "Name ..."
 */
const formatErrMsg = (msg, labels)=>{
    for(let i=0; i < msg.length; i++){
        for(const key in labels){
            if(msg[i].includes(`instance.${key}`)){
                msg[i] = msg[i].replace(`instance.${key}`, labels[key])
                break; // stop searching when found
            }
        }
    }
}

export default formatErrMsg;