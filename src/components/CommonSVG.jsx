import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import './style.css'
const CommonSVG = () => {
    // State for time granularity (Year, Month, Week)
    const [timeGranularity, setTimeGranularity] = useState('Month');

    // Handle radio button change
    const handleGranularityChange = (e) => {
        setTimeGranularity(e.target.value);
    };

    // You could also add date picker states here if required.
    // const [startDate, setStartDate] = useState(new Date());

    useEffect(() => {
        const data = [
            { month: "Jan", patients: 80, devices: 120 },
            { month: "Feb", patients: 150, devices: 240 },
            { month: "Mar", patients: 390, devices: 300 },
            { month: "Apr", patients: 290, devices: 200 },
            { month: "May", patients: 250, devices: 150 },
            { month: "Jun", patients: 400, devices: 500 },
            { month: "Jul", patients: 600, devices: 700 },
            { month: "Aug", patients: 500, devices: 600 },
            { month: "Sep", patients: 400, devices: 350 },
            { month: "Oct", patients: 600, devices: 500 },
            { month: "Nov", patients: 600, devices: 800 },
            { month: "Dec", patients: 700, devices: 900 },
        ];

        const margin = { top: 90, right: 10, bottom: 70, left: 60 };
        const width = 1300 - margin.left - margin.right;
        const height = 500 - margin.top - margin.bottom;

        const svg = d3
            .select('#chart')
            .attr('width', 1300)
            .attr('height', 500)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        const x0 = d3
            .scaleBand()
            .domain(data.map((d) => d.month))
            .range([0, width])
            .padding(0.4);

        const x1 = d3
            .scaleBand()
            .domain(['patients', 'devices'])
            .range([0, x0.bandwidth()]);

        const y = d3
            .scaleLinear()
            .domain([0, 900])
            .nice()
            .range([height, 0]);

        const color = d3
            .scaleOrdinal()
            .domain(['patients', 'devices'])
            .range(['#1E90FF', '#00008B']);

        // Add bars
        svg
            .append('g')
            .selectAll('g')
            .data(data)
            .enter()
            .append('g')
            .attr('transform', (d) => `translate(${x0(d.month)},0)`)
            .selectAll('rect')
            .data((d) =>
                ['patients', 'devices'].map((key) => ({ key: key, value: d[key] }))
            )
            .enter()
            .append('rect')
            .attr('x', (d) => x1(d.key))
            .attr('y', (d) => y(d.value))
            .attr('width', x1.bandwidth())
            .attr('height', (d) => height - y(d.value))
            .attr('fill', (d) => color(d.key))
            .attr('class', 'bar');

        // Add X axis
        svg
            .append('g')
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom(x0));

        // Add Y axis
        svg.append('g').call(d3.axisLeft(y));

        // Add legends
        svg
            .append('rect')
            .attr('x', width - 160)
            .attr('y', -margin.top + 30)
            .attr('width', 18)
            .attr('height', 18)
            .attr('fill', '#1E90FF');

        svg
            .append('text')
            .attr('x', width - 130)
            .attr('y', -margin.top + 45)
            .attr('class', 'legend')
            .text('TOTAL PATIENT');

        svg
            .append('rect')
            .attr('x', width - 160)
            .attr('y', -margin.top + 60)
            .attr('width', 18)
            .attr('height', 18)
            .attr('fill', '#00008B');

        svg
            .append('text')
            .attr('x', width - 130)
            .attr('y', -margin.top + 75)
            .attr('class', 'legend')
            .text('TOTAL DEVICES');

        // Add title for "Count" and total labels beside it
        svg
            .append('text')
            .attr('x', margin.left + 40)
            .attr('y', -margin.top + 40)
            .attr('class', 'header')
            .attr('font-size', '20px')
            .text('Count');

        // Total Patients and Total Devices next to the "Count" title
        svg
            .append('text')
            .attr('x', margin.left + 120)
            .attr('y', -margin.top + 40)
            .attr('class', 'count-label')
            .attr('fill', '#00008B')
            .text('Total Devices: 1240');

        svg
            .append('text')
            .attr('x', margin.left + 120)
            .attr('y', -margin.top + 70)
            .attr('class', 'count-label')
            .attr('fill', '#1E90FF')
            .text('Total Patients: 1500');

        // Add time granularity label
        svg
            .append('text')
            .attr('x', margin.left + 520)
            .attr('y', -margin.top + 40)
            .attr('class', 'count-label')
            .attr('fill', '#1E90FF')
            .text(`Selected Time: ${timeGranularity}`);

        // Label for X axis (Months)
        svg
            .append('text')
            .attr('class', 'axis-label')
            .attr('x', width / 2)
            .attr('y', height + margin.bottom - 35)
            .style('text-anchor', 'middle')
            .text('Months');

        // Label for Y axis (Count)
        svg
            .append('text')
            .attr('class', 'axis-label')
            .attr('x', -(height / 2))
            .attr('y', -margin.left + 25)
            .attr('transform', 'rotate(-90)')
            .style('text-anchor', 'middle')
            .text('Count');
    }, [timeGranularity]); // Re-render on timeGranularity change

    return (
        <div>
            {/* Radio buttons for Year, Month, Week */}
            <div>
                <label>
                    <input
                        type="radio"
                        value="Year"
                        checked={timeGranularity === 'Year'}
                        onChange={handleGranularityChange}
                    />
                    Year
                </label>
                <label>
                    <input
                        type="radio"
                        value="Month"
                        checked={timeGranularity === 'Month'}
                        onChange={handleGranularityChange}
                    />
                    Month
                </label>
                <label>
                    <input
                        type="radio"
                        value="Week"
                        checked={timeGranularity === 'Week'}
                        onChange={handleGranularityChange}
                    />
                    Week
                </label>
            </div>
            <svg id="chart"></svg>
        </div>
    );
};

export default CommonSVG;
