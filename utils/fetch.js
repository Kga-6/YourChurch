const api_Key = `01d7d6777943ffaf20ee6f130e181504`
const URL = `https://api.scripture.api.bible`

const parems = {
  method:"GET",
  headers:{
    'Content-Type': 'application/json',
    'api-key':api_Key
  }
}

// Fetch for all bibles version
async function fetchBibles(){
  const base = `/v1/bibles`

  try{
    let response = await fetch(`${URL}${base}`,parems)
    let JSON = await response.json()
    return JSON.data
  } catch(error){
    console.log(error);
  }
}

async function fetchBooks(bibleId){
  const base = `/v1/bibles/${bibleId}/books`

  try{
    //throw new error("test")
    let response = await fetch(`${URL}${base}`,parems)
    let JSON = await response.json()
    return JSON.data
  } catch(error){
    console.log(error);
  }
}

async function fetchChapters(bibleId,bookId){
  const base = `/v1/bibles/${bibleId}/books/${bookId}/chapters`

  try{
    //throw new error("test")
    let response = await fetch(`${URL}${base}`,parems)
    let JSON = await response.json()
    return JSON.data
  } catch(error){
    console.log(error);
  }
}

async function fetchPassage(bibleId,passageId){
  const base = `/v1/bibles/${bibleId}/passages/${passageId}?content-type=text`

  try{
    //throw new error("test")
    let response = await fetch(`${URL}${base}`,parems)
    let JSON = await response.json()
    return JSON.data
  } catch(error){
    console.log(error);
  }
}