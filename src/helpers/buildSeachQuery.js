
const buildSearchQuery = (formData) =>{
    
    const { name, nameExact,
        oracle, oracleExact,
        flavor, flavorExact,
        pow, powAmt,
        tou, touAmt,
        loy, loyAmt,
        cmc, cmcAmt,
        game, } = formData

  const qData = [];
  
  const nameSearch   = !nameExact ? name : `"${name}"`
  const oracleSearch = `(${(!oracleExact
      ? oracle.split(" ").map(o => `oracle:${o}`  ).join(" ")
      : `oracle:"${oracle}"`)
    })`
  const flavorSearch = `(${(!flavorExact
      ? flavor.split(" ").map(f => `flavor:${f}`  ).join(" ")
      : `flavor:"${flavor}"`)
    })`
  
  if(name.length   > 0){qData.push(nameSearch)   }
  if(oracle.length > 0){qData.push(oracleSearch) }
  if(flavor.length > 0){qData.push(flavorSearch) }

  if(powAmt){qData.push(`(pow${pow}${powAmt})`)}
  if(touAmt){qData.push(`(tou${tou}${touAmt})`)}
  if(loyAmt){qData.push(`(loy${loy}${loyAmt})`)}
  if(cmcAmt){qData.push(`(cmc${cmc}${cmcAmt})`)}

  qData.push( `(game:${game})` );

  return qData.join(" ");
}

export default buildSearchQuery;