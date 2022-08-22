import React, { useEffect, useRef } from 'react'
import { Chart as ChartJS, registerables } from 'chart.js'
import { ChartData, Spices } from '../../models'
import { colors } from './colors'
ChartJS.register(...registerables)

type ChartProps = {
	data: ChartData
}

type Dataset = {
	label: string
	backgroundColor: string
	data: { x: number; y: number }[]
}

function Chart({ data }: ChartProps) {
	const chart = useRef(null)

	const formatDatasets = (data: ChartData) => {
		const datasets: Dataset[] = []

		Object.values(Spices).forEach((spices) => {
			datasets.push({
				label: spices,
				data: data.values
					.filter((item) => item.spices === spices)
					.map((item) => ({ x: item.value || 0, y: item.weight })),
				backgroundColor: colors[spices],
			})
		})

		return datasets
	}

	useEffect(() => {
		if (chart.current) {
			let c = new ChartJS(chart.current, {
				type: 'scatter',
				data: { datasets: formatDatasets(data) },
				options: {
					scales: { x: { type: 'linear', position: 'bottom' } },
				},
			})

			return () => c.destroy()
		}
	}, [data])

	return (
		<>
			<canvas ref={chart} />
            <div className='text-center text-lg'>{data.feature}</div>
		</>
	)
}

export default Chart
