
/**dataToMana
 * 
 * Converts a list of items into a list of <i> elements to be rendered
 * 
 * [{R}, {R/G}] =>
 *  [
 *  <i className="ms ms-r"></i>,
 * 
 *  <span className="mana-container dual-mana-rg">
 *      <i className="ms ms-r"></i>
 *      <i className="ms ms-g"></i>
 *  </span>
 *  ]
 */
const dataToMana = (data) =>{
    // THIS HELPER IS A WORK IN PROGRESS AND CURRENTLY NON-FUNCTIONAL
    // THIS HELPER IS A WORK IN PROGRESS AND CURRENTLY NON-FUNCTIONAL
    data = data.map(str => str.replace(/^[{}]+|[{}]+$/g, ''))
    let manaArr = []
    for(let i=0; i < data.length; i++){
        const mana = data[i].split('/');
        let manaIcons;

        if(mana.length > 1){
            manaIcons = []
        }
        manaIcons = mana.map(m=>
            "<i className={`ms ms-${m}`}></i>"
        )
        // manaArr.push()
    }
    return manaArr;
    // THIS HELPER IS A WORK IN PROGRESS AND CURRENTLY NON-FUNCTIONAL
    // THIS HELPER IS A WORK IN PROGRESS AND CURRENTLY NON-FUNCTIONAL

}

/**identityToMana
 * 
 * Converts a string of mana identity into an array of
 *      <i> elements for each respective mana 
 * [RGBWU] =>
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
        return [<i key={`mana-c`} className={`ms ms-c`}></i>]
    }else{
        const mana = manaID.split('')
        return mana.map(m =>
            <i key={`mana-${m}`} className={`ms ms-${m.toLowerCase()}`}></i>
        )
    }
}

export {dataToMana, identityToMana};