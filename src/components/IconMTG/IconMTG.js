
import "./IconMTG.scss"


const IconMTG = ({manaData, spaced = true}) =>{

    function genIcon(){
      const cleanName = "mana-" + manaData.replace(/[{}/]/g, '');

      return <span title={manaData} className={`mana ${cleanName}`}></span>
    }

    return(
      <>
        {spaced && " "}
        { genIcon() }
        {spaced && " "}
      </>
    )
}

export default IconMTG;