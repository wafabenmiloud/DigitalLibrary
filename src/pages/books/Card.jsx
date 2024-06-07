import React from 'react'
import './Books.css';
export default function Card(props) {
  return (
    <div id='card'>
      <div className="card__img">
        <img src={props.img} alt="img" />
        </div>
      <div className="card__fee">
        <h4 id='fee'>{props.fee}</h4>
        </div>
      <div className="card__desc">
        <h3>{props.title}</h3>
        <p>{props.desc}</p>
        </div>
    </div>
  )
}
