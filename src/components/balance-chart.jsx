import { useSearchParams } from 'react-router'
import { Label, Pie, PieChart } from 'recharts'

import { useGetUserBalance } from '@/api/hooks/user'
import { formatCurrency } from '@/helpers/currency'

import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from './ui/chart'

const chartConfig = {
  ganhos: { label: 'Ganhos', color: 'var(--primary-green)' },
  gastos: { label: 'Gastos', color: 'var(--primary-red)' },
  investimentos: { label: 'Investimentos', color: 'var(--primary-blue)' },
}

const BalanceChart = () => {
  const [searchParams] = useSearchParams()
  const from = searchParams.get('from')
  const to = searchParams.get('to')
  const { data } = useGetUserBalance({ from, to })

  const raw = {
    ganhos: Number(data?.earningsPercentage ?? 0),
    gastos: Number(data?.expensesPercentage ?? 0),
    investimentos: Number(data?.investimentsPercentage ?? 0),
  }

  const chartData = [
    { category: 'ganhos', value: raw.ganhos, fill: 'var(--color-ganhos)' },
    { category: 'gastos', value: raw.gastos, fill: 'var(--color-gastos)' },
    {
      category: 'investimentos',
      value: raw.investimentos,
      fill: 'var(--color-investimentos)',
    },
  ]

  const legend = [
    {
      key: 'ganhos',
      label: chartConfig.ganhos.label,
      value: raw.ganhos,
      color: 'var(--primary-green)',
    },
    {
      key: 'gastos',
      label: chartConfig.gastos.label,
      value: raw.gastos,
      color: 'var(--primary-red)',
    },
    {
      key: 'investimentos',
      label: chartConfig.investimentos.label,
      value: raw.investimentos,
      color: 'var(--primary-blue)',
    },
  ]

  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <CardTitle>Distribuição</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col justify-between gap-4">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[240px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  hideLabel
                  nameKey="category"
                  formatter={(value) => `${value}%`}
                />
              }
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="category"
              innerRadius={60}
              outerRadius={92}
              paddingAngle={2.5}
              cornerRadius={5}
              stroke="none"
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 12}
                          className="fill-foreground text-lg font-semibold"
                        >
                          {formatCurrency(data?.balance ?? 0)}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 14}
                          className="fill-muted-foreground text-xs"
                        >
                          Saldo
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>

        <div className="flex flex-col gap-2 border-t pt-4">
          {legend.map((item) => (
            <div
              key={item.key}
              className="flex items-center justify-between text-sm"
            >
              <span className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-[2px]"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-muted-foreground">{item.label}</span>
              </span>
              <span className="font-mono tabular-nums">{item.value}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default BalanceChart
