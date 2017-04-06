import React from 'react'
import { connect } from 'react-redux'

export function MoviesList(props) {
  const { movies } = props

  if (movies.length === 0) return null

  return (
    <table>
      <thead>
        <tr>
          <td></td>
          <td style={style.td}>Year</td>
          <td style={style.td}>Title</td>
          <td style={style.td}>Price</td>
        </tr>
      </thead>
      <tbody>
        {
          movies.map((movie, index) => {
            return (
              <tr key={index}>
                <td style={style.td}><img src={movie.image} style={{height: '150px'}} /></td>
                <td style={style.td}>{movie.releaseYear}</td>
                <td style={style.td}>{movie.title}</td>
                <td style={style.td}>{`$${movie.price}`}</td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}

const mapStateToProps = state => {
  return {
    movies: state.movies
  }
}

const style = {
  td: {
    border: '1px solid black'
  }
}

export default connect(mapStateToProps)(MoviesList)
