/* global document fetch soundManager */
/* eslint arrow-parens: "off" */

const SOUND_LIST_URL = 'sounds/sound-list.json'

const getContainer = () => document.getElementById('app')
const createButtonStack = () => document.createDocumentFragment()
const createButtonElement = ({id, name}) => {
  const button = document.createElement('button')
  button.setAttribute('type', 'button')
  // button.disabled = true
  button.textContent = name
  button.setAttribute('name', id)
  return button
}
const enableSoundButton = (button) => () => {
  // button.disabled = false
}
const preloadSound = ({id, url, onload}) => soundManager.createSound({id, url, onload, autoLoad: true})
const playSound = (event) => soundManager.play(event.target.name)
const createSoundButton = (sound) => {
  const {id, name, url} = sound
  const button = createButtonElement({id, name})
  preloadSound({id, url, onload: enableSoundButton(button)})
  return button
}
const appendElementTo = (container) => (element) => container.appendChild(element)
const appendElementArrayTo = (container) => (elementArray) => elementArray.forEach(appendElementTo(container))
const appendSoundButtonsTo = (buttonStack) => (soundButtons) => {
  appendElementArrayTo(buttonStack)(soundButtons)
  return buttonStack
}

const fetchSoundList = () => fetch(SOUND_LIST_URL).then((response) => response.json()).catch(console.error)

fetchSoundList()
  .then(soundList => soundList.sounds)
  .then(sounds => sounds.map(createSoundButton))
  .then(appendSoundButtonsTo(createButtonStack()))
  .then(appendElementTo(getContainer()))

getContainer().addEventListener('click', playSound)
