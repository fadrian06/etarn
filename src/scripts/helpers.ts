import { init, type EChartsOption } from 'echarts'

export function createAndObserveEchart(selector: string, options: EChartsOption) {
  const chartElement = document.querySelector(selector)

  if (chartElement) {
    const chart = init(chartElement, null, {
      renderer: 'svg'
    })

    chart.setOption(options)

    new ResizeObserver(() => chart.resize()).observe(chartElement)
  }
}
