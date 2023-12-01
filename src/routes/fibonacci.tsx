import { Title } from 'solid-start'
import * as d3 from 'd3'
import { createEffect, onMount } from 'solid-js'

const source = [
    { child: 'John', parent: '' },
    { child: 'Kevin', parent: 'John' },
    { child: 'Aaron', parent: 'Kevin' },
    { child: 'Ann', parent: 'John' },
    { child: 'Hannah', parent: 'Ann' },
    { child: 'Sarah', parent: 'Kevin' },
    { child: 'Rose', parent: 'Sarah' },
    { child: 'Mark', parent: 'Ann' },
    { child: 'Angel', parent: 'Sarah' },
]

let i = 1


const renderTree = (data) => {
    console.log('render data', data)
    const svg = d3.select('body')
    .append('svg')
    .attr('width', 600)
    .attr('height', 600)
    .append('g')
    .attr('transform', 'translate(50,50)')

const dataStructure = d3.stratify()
    .id(d => d.child)
    .parentId(d => d.parent)
    (data)

const treeStructure = d3.tree().size([500,300])

const information = treeStructure(dataStructure)

// console.log(information.descendants())
// console.log(information.links())

const circles = svg.append('g')
    .selectAll('circle')
    .data(information.descendants())

circles.enter().append('circle')
    .attr('cx', d => d.x)
    .attr('cy', d => d.y)
    .attr('r', 5) // radius

const connections = svg.append('g')
    .selectAll('path')
    .data(information.links())

connections.enter().append('path')
    .attr('d', d => [
        `M${d.source.x},${d.source.y} C`,
        `${d.source.x},${(d.source.y + d.target.y) / 2}`,
        `${d.target.x},${(d.source.y + d.target.y) / 2}`,
        `${d.target.x},${d.target.y}`
    ].join(' '))

const names = svg.append('g')
    .selectAll('text')
    .data(information.descendants())

names.enter().append('text')
    .text(d => d.data.child)
    .attr('x', d => d.x + 7)
    .attr('y', d => d.y + 4)

} 

const Coin = () => {
    createEffect(() => {
        setInterval(() => {
            if (i <= source.length) {
                renderTree(source.slice(0, i))
                i++
            }
        }, 1000)
    })

    return (
        <main>
            <Title>Fibonacci</Title>
            <h1>Fibonacci!</h1>
            <p>Write a function that returns n-th Fibonacci number</p>
        </main>
    )
}

export default Coin
