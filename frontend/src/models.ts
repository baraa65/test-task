export type Prediction = {
	weight: number
	features: {
		Species: string
		Height: number
		LengthCro: number
		LengthDia: number
		LengthVer: number
		Width: number
	}
}

export type ChartData = {
	feature: string
	values: {
		weight: number
		spices: string
		value: number | undefined
	}[]
}

export enum Features {
	Height = 'Height',
	LengthCro = 'LengthCro',
	LengthDia = 'LengthDia',
	LengthVer = 'LengthVer',
	Width = 'Width',
}

export enum Spices {
	Perch = 'Perch',
	Bream = 'Bream',
	Roach = 'Roach',
	Pike = 'Pike',
	Parkki = 'Parkki',
	Smelt = 'Smelt',
	Whitefish = 'Whitefish',
}
