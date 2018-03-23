import React, { Component } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import getId from 'uuid/v4';

const COLORS = ['#d11141', '#00b159', '#00aedb', '#f37735', '#ffc425'];

export  default class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  getColor(i) {
    return COLORS[i % COLORS.length];
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        data: [
          {
            name: 'Математика',
            isActive: true,
            id: getId(),
            grades: [
              {x: 10, grade: 30},
              {x: 30, grade: 200},
              {x: 45, grade: 100},
              {x: 50, grade: 400},
              {x: 70, grade: 150},
              {x: 100, grade: 250}
            ]
          },
          {
            name: 'Русский язык',
            isActive: true,
            id: getId(),
            grades: [
              {x: 30, grade: 20},
              {x: 50, grade: 180},
              {x: 75, grade: 240},
              {x: 100, grade: 100},
              {x: 120, grade: 190}
            ]
          },
          {
            name: 'Физика',
            isActive: true,
            id: getId(),
            grades: [
              {x: 40, grade: 20},
              {x: 80, grade: 220},
              {x: 90, grade: 120},
              {x: 100, grade: 160},
              {x: 110, grade: 200}
            ]
          }
        ]
      });
    }, 1000);
  }

  onCheckboxClick = (e) => {
    const id = e.target.id;
    const isChecked = e.target.checked;
    this.setState(prevState => {
      const newData = [...prevState.data];
      newData.map(subject => {
        if (subject.id === id) subject.isActive = isChecked;
        return subject;
      });
      return {
        data: newData
      }
    });
  }

  render () {
    const { data } = this.state;

  	return (
      <div>
        <ResponsiveContainer width="40%" height={300}>
          <ScatterChart width={600} height={400} margin={{top: 20, right: 20, bottom: 20, left: 20}}>
            <XAxis type="number" dataKey={'x'} name='stature' unit='cm'/>
            <YAxis type="number" dataKey={'grade'} name='Оценка'/>
            <CartesianGrid />
            <Tooltip cursor={{strokeDasharray: '3 3'}}/>
            {data.map((subject, i) => {
              const { name, isActive, id, grades } = subject;
              
              if (isActive) {
                return <Scatter key={id} name={name} data={grades} fill={this.getColor(i)} line shape="circle"/>
              }
            })}
            <Legend/>
          </ScatterChart>
        </ResponsiveContainer>
        <div>
          {data.map(subject =>
            //TODO: distructuring assign
            <div key={subject.id}>
              <input onChange={this.onCheckboxClick} type="checkbox" id={subject.id} name={subject.name} defaultChecked={subject.isActive} />
              <label htmlFor={subject.id}>{subject.name}</label>
            </div>
          )}
        </div>
      </div>
    );
  }
}
