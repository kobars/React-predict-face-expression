import { COLORS } from '../utils/index'
import {
    ResponsiveContainer, PieChart, Pie, Cell,
} from 'recharts';

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
    cx, cy, midAngle, innerRadius, outerRadius, percent, index,
}) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {percent > 0 ? `${(percent * 100).toFixed(0)}%` : null}
        </text>
    );
};

const ExpChart = ({ data }) => {
    const usedData = data
    return (
        <div style={{ width: '100%', height: 290, marginBottom: '-30px', marginTop: '-20px' }}>
            <ResponsiveContainer>
                <PieChart>
                    <Pie dataKey="value" data={usedData} fill="#8884d8" label={renderCustomizedLabel} labelLine={false} animationDuration={300} >
                        {usedData.map((entry, index) => <Cell key={`cell-${index}`} fill={index === 0 ? COLORS[index] : COLORS[index]} />)}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}

export default ExpChart
