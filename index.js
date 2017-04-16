/* global document fetch soundManager */
/* eslint arrow-parens: "off" */

const SOUND_LIST_URL = 'sounds/sound-list.json'

const addEventListener = (eventName) => (eventHandler) => (element) => element.addEventListener(eventName, eventHandler)
const addClickEventListener = addEventListener('click')

const getContainer = () => document.getElementById('app')
const createButtonStack = () => document.createDocumentFragment()
const createElement = (elementName) => document.createElement(elementName)
const createButtonElement = () => {
  const button = createElement('button')
  button.setAttribute('type', 'button')
  return button
}
const enableSoundButton = (button) => () => {
  button.disabled = false
}
const preloadSound = ({id, url, onload}) => soundManager.createSound({id, url, onload, autoLoad: true})
const playSound = (event) => soundManager.play(event.target.name)
const addClickPlaySoundEventListener = addClickEventListener(playSound)
const createSoundButton = (sound) => {
  const {id, name, url} = sound
  const button = createButtonElement()
  button.textContent = name
  button.setAttribute('name', id)
  button.disabled = true
  const onload = enableSoundButton(button)
  preloadSound({id, url, onload})
  addClickPlaySoundEventListener(button)
  return button
}
const appendElementTo = (container) => (element) => container.appendChild(element)
const appendElementArrayTo = (container) => (elementArray) => elementArray.forEach(appendElementTo(container))
const appendSoundButtonsTo = (buttonStack) => (soundButtons) => {
  appendElementArrayTo(buttonStack)(soundButtons)
  return buttonStack
}

const responseToJSON = (response) => response.json()
const fetchSoundList = () => fetch(SOUND_LIST_URL).then(responseToJSON).catch(console.error)

fetchSoundList()
  .then(soundList => soundList.sounds)
  .then(sounds => sounds.map(createSoundButton))
  .then(appendSoundButtonsTo(createButtonStack()))
  .then(appendElementTo(getContainer()))
