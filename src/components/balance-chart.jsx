import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon } from 'lucide-react'
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
      icon: TrendingUpIcon,
      iconClassName: 'text-primary-green',
    },
    {
      key: 'gastos',
      label: chartConfig.gastos.label,
      value: raw.gastos,
      icon: TrendingDownIcon,
      iconClassName: 'text-primary-red',
    },
    {
      key: 'investimentos',
      label: chartConfig.investimentos.label,
      value: raw.investimentos,
      icon: PiggyBankIcon,
      iconClassName: 'text-primary-blue',
    },
  ]

  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <CardTitle>Distribuição</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col items-center gap-4 sm:flex-row">
        <ChartContainer config={chartConfig} className="h-50 w-full max-w-60">
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  hideLabel
                  nameKey="category"
                  formatter={(value, name, item) => (
                    <div className="flex w-full items-center justify-between gap-3">
                      <span className="flex items-center gap-2">
                        <span
                          className="h-2.5 w-2.5 shrink-0 rounded-xs"
                          style={{
                            backgroundColor: item.payload?.fill ?? item.color,
                          }}
                        />
                        <span className="text-muted-foreground">
                          {chartConfig[name]?.label ?? name}
                        </span>
                      </span>
                      <span className="font-mono font-medium tabular-nums">
                        {value}%
                      </span>
                    </div>
                  )}
                />
              }
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="category"
              innerRadius={78}
              outerRadius={92}
              paddingAngle={2.5}
              cornerRadius={12}
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

        <div className="flex flex-wrap justify-center gap-[15px_40px] pt-5 sm:flex-col sm:gap-2">
          {legend.map((item) => (
            <div
              key={item.key}
              className="flex items-center justify-between text-base"
            >
              <span className="mr-2.5 flex items-center gap-2">
                <item.icon size={20} className={item.iconClassName} />
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
