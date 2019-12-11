declare var ol: any

export function searchAddressHandler(event: Event, elementId: string) {
	event.preventDefault()

	const coordinates = { lat: 40.41, lng: -73.99 } // Can't fetch coordinates from Google API, use dummy ones

	document.getElementById(elementId)!.innerHTML = '' // clear <p> from <div id="map">
	new ol.Map({
		target: 'map',
		layers: [
			new ol.layer.Tile({
				source: new ol.source.OSM()
			})
		],
		view: new ol.View({
			center: ol.proj.fromLonLat([coordinates.lng, coordinates.lat]),
			zoom: 16
		})
	})
}
