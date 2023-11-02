
/** makeTitleCase()
 * 
 * Returns string with first character covnerted to upper case
 * 
 * @example mystring => Mystring
 * 
 */
const makeTitleCase = (str) =>{
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export default makeTitleCase;