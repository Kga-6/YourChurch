const biblesSelection = document.getElementById("bibles")
const booksSelection = document.getElementById("Books")
const chaptersSelection = document.getElementById("chapters")
const passageContainer = document.getElementById("passage-container")

const chapterTitle = document.getElementById("chapter-title")

const allowBibles = [
  'King James (Authorised) Version',
  'Revised Version 1885'
]

let bibleData = {}
let chapterIndex = 0

function nextPassage(){

  for(i=0;i<chaptersSelection.children.length;i++){
    const thisOption = chaptersSelection.children[i]
    
    if(thisOption.value == chaptersSelection.value){
      const nextIndex = i+1
      if(chaptersSelection.children[nextIndex]){
        const nextValue = chaptersSelection.children[nextIndex]
        chaptersSelection.value = nextValue.value
        outputPassage(bibleData.bibleId,chaptersSelection.value)
      }
      break
    }
  }

}

function prevPassage(){

  for(i=0;i<chaptersSelection.children.length;i++){
    const thisOption = chaptersSelection.children[i]
    
    if(thisOption.value == chaptersSelection.value){
      const elementIndex = i
      const prevIndex = i-1
      if(elementIndex>=0){
        const nextValue = chaptersSelection.children[prevIndex]
        chaptersSelection.value = nextValue.value
        outputPassage(bibleData.bibleId,chaptersSelection.value)
      }
      break
    }
  }

}

document.getElementById("nextPassage").addEventListener("click", ()=>{nextPassage()})
document.getElementById("prevPassage").addEventListener("click", ()=>{prevPassage()})


const outputPassage = async function(BibleId,BookId){
  const Passage = await fetchPassage(BibleId,BookId)
  passageContainer.textContent = ""
  passageContainer.textContent = Passage.content
  chapterTitle.textContent = Passage.reference
}

const updateChapters = async function(BibleId,BookId){
  const Chapters = await fetchChapters(BibleId,BookId)

  // Clear container
  let lastEl = chaptersSelection.lastElementChild
  while(lastEl){
    chaptersSelection.removeChild(lastEl)
    lastEl = chaptersSelection.lastElementChild
  }

  Chapters.forEach(chapter => {
    const option = document.createElement("option")
    option.value = chapter.id
    option.textContent = chapter.reference
    chaptersSelection.appendChild(option)
  })

  outputPassage(BibleId,BookId)

}

const updateBook = async function(BibleId){
  const Books = await fetchBooks(BibleId)

  // Clear container
  let lastEl = booksSelection.lastElementChild
  while(lastEl){
    booksSelection.removeChild(lastEl)
    lastEl = booksSelection.lastElementChild
  }

  Books.forEach(book => {
    const option = document.createElement("option")
    option.value = book.id
    option.textContent = book.name
    booksSelection.appendChild(option)
  })

  // Defaults
  booksSelection.value = "GEN"
  updateChapters(BibleId,booksSelection.value)

}

async function App(){
  const Bibles = await fetchBibles() // Fetches for all the bible versions

  // Add bibles to select element
  Bibles.forEach(bible => {
    const option = document.createElement("option")
    option.value = bible.id
    option.textContent = bible.name
    biblesSelection.appendChild(option)
  });

  // Defaults
  biblesSelection.value = "de4e12af7f28f599-01"
  bibleData.bibleId = biblesSelection.value
  updateBook(biblesSelection.value)

}

biblesSelection.addEventListener("change",(e) => {
  const value = e.target.value
  console.log("BibleId:",value)
  bibleData.bibleId = value
  updateBook(value)
})

booksSelection.addEventListener("change",(e) => {
  const value = e.target.value
  console.log(value)
  console.log("BookId:",value)
  updateChapters(bibleData.bibleId,value)
})

chaptersSelection.addEventListener("change",(e) => {
  const value = e.target.value
  console.log("ChapterId:",value)
  outputPassage(bibleData.bibleId,value)
})

// Start App
App()


