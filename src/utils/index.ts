export const formatDocument = (document: string)  => {
  const documentAtual = document

  const valueToReturn = documentAtual.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/,
    function( regex: string, argument1: string, argument2: string, argument3: string, argument4: string ) {
      return argument1 + '.' + argument2 + '.' + argument3 + '-' + argument4
    })
  return valueToReturn
}

export const  phoneMask = (v: string) => {

  let r = v.replace(/\D/g, '')
  r = r.replace(/^0/, '')

  if (r.length > 11) {
    r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, '($1) $2-$3')
  } else if (r.length > 7) {
    r = r.replace(/^(\d\d)(\d{5})(\d{0,4}).*/, '($1) $2-$3')
  } else if (r.length > 2) {
    r = r.replace(/^(\d\d)(\d{0,5})/, '($1) $2')
  } else if (v.trim() !== '') {
    r = r.replace(/^(\d*)/, '($1')
  }
  return r
}