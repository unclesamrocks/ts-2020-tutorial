import { searchAddressHandler } from './util/map'

const form = document.querySelector('form')!
// const addressInput = document.getElementById('address')! as HTMLInputElement

form.addEventListener('submit', handleSubmitForm)

function handleSubmitForm(event: Event) {
	event.preventDefault()
	// const enteredAddress = addressInput.value
	searchAddressHandler(event, 'map')
}
