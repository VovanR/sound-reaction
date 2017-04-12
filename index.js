const getElements = (elementName) => () => document.querySelectorAll(elementName)
const getButtonElements = getElements('button')

const addListener = (eventName) => (eventHandler) => (element) => {element.addEventListener(eventName, eventHandler)}
const addClickListener = addListener('click')

const onClick = (soundList) => (event) => {
  soundManager.createSound({
    url: getSoundByName(event.target.name, soundList),
    autoPlay: true
  })
}

const responseToJSON = (response) => response.json()
const fetchSoundList = () => fetch('sound-list.json').then(responseToJSON).catch(console.error)
const getSoundByName = (soundName, soundList) => (soundList[soundName])

const buttons = getButtonElements()
const forEachButton = (addClickEventListener) => buttons.forEach(addClickEventListener)

fetchSoundList()
  .then(onClick)
  .then(addClickListener)
  .then(forEachButton)
