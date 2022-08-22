import axios from 'axios'
import Chart from './components/chart'
import React, { useRef, useState } from 'react'
import { ChartData, Features, Prediction } from './models'

function App() {
	const input = useRef<HTMLInputElement>(null)
	const [chartsData, setChartsData] = useState<ChartData[]>([])

	const formatData = (predictions: Prediction[]): ChartData[] => {
		const formattedData: ChartData[] = []

		Object.values(Features).forEach((feature) => {
			formattedData.push({
				feature,
				values: predictions.map(({ weight, features }) => ({
					weight,
					spices: features.Species,
					value: features?.[feature],
				})),
			})
		})

		return formattedData
	}

	const handleSample = () => {
		input.current?.click()
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files
		if (files?.length) {
			let form = new FormData()
			form.append('file', files[0])

			axios
				.post('http://localhost:8000/predictor/predict-weight/', form)
				.then(({ data }: { data: Prediction[] }) => {
					setChartsData(formatData(data))
				})
		}
	}

	return (
		<div className='flex flex-col items-center'>
			<div className='text-3xl py-3'>Predict Fish Weight</div>
			<button className="bg-blue-600 px-2 py-1 text-white rounded-lg" onClick={handleSample}>
				Sample
			</button>
			<input
				ref={input}
				type="file"
				onChange={(e) => handleChange(e)}
				style={{ display: 'none' }}
			/>

			<div className="p-6 grid grid-cols-2 gap-2 w-full">
				{chartsData.map((data, i) => (
					<div key={i} className="chart-container p-2">
						<Chart data={data} />
					</div>
				))}
			</div>
		</div>
	)
}

export default App
