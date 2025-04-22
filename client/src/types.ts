/**
 * ISSNowResponseData type is used by server and client.
 * For the sake of simplicity of this small project this type is duplicated to both
 * places manually rather then configuring some magic or using a cumbersome library.
 * */

export interface ISSNowResponseData {
	message: string
	timestamp: number
	iss_position: {
		latitude: string
		longitude: string
	}
}

export type ISSLocation = L.LatLngLiteral
