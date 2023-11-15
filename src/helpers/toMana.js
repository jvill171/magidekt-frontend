import IconMTG from "../components/IconMTG/IconMTG";

/**stringMana
 * 
 * Converts all mana symbols within curly braces {} into IconMTG components
 *  
 * 
 * "An example {R} String" =>
 *      "An example <IconMTG manaData={R} spaced={false}/> String"
 */

const stringMana = (inputString) =>{

    if(!inputString.includes("{")){
        return inputString;
    }

    // Target all values within braces such as {U}
    const regex = /{([^}]+)}/g;
    let startIndex = 0;
    let result = [];
  
    let match;
    while ((match = regex.exec(inputString)) !== null) {
      const value = match[1];
      const before = inputString.slice(startIndex, match.index);
      result.push(before);
      result.push(<IconMTG manaData={value} spaced={false}/>);
      startIndex = match.index + match[0].length;
    }
  
    result.push(inputString.slice(startIndex));
    return result;
}


/**identityToMana
 * 
 * Converts a string of mana identity into an array of
 *      <i> elements for each respective mana 
 * "RGBWU" =>
 *  [
 *      <i className="ms ms-r"></i>,
 *      <i className="ms ms-g"></i>,
 *      <i className="ms ms-b"></i>,
 *      <i className="ms ms-w"></i>,
 *      <i className="ms ms-u"></i>,
 *  ]
 */
const identityToMana = (manaID)=>{
    // If no identity, assume colorless
    if(!manaID || manaID.length < 1){
        return [<IconMTG key={"C"} manaData={"C"} spaced={false}/>]
    }else{
        const mana = manaID.split('')
        return mana.map(m =>
            <IconMTG key={m} manaData={m} spaced={false}/>
        )
    }
}

/**determineIdentity
 * 
 * @param  cards - An array of cards that have been given the magidekt property of "action" 
 * @returns A custom-ordered string of the color identity, such as "WUBRG"
 */
const determineIdentity = (cards)=>{
    const cOrder = ["W", "U", "B", "R", "G"]
    const colorSet = new Set();

    for(let idx=0; idx < cards.length; idx++){
        if(cards[idx].magidekt.action !== "remove"){
            for(let cID of cards[idx].color_identity){
                colorSet.add( cID )
            }
            if(colorSet.size === 5){
                break;
            }
        }
    }

    const ordered = [...colorSet].sort((a, b) =>
        cOrder.indexOf(a) - cOrder.indexOf(b));
    

    return ordered.join("");
}


export { identityToMana, stringMana, determineIdentity};