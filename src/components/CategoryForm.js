import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form } from 'semantic-ui-react'
import { getAllPosts } from '../actions.js'

class CategoryForm extends Component {

  state = {
    category: ''
  }

  handleChange = (e) => {
    console.log(e.target.value)
    this.props.recordSelectedCategory(e)
    this.setState({ category: e.target.value })
  }

  render() {
    // console.log(this.props.allPosts)
    // console.log("homepage props", this.props)
    return (
      <div className="category-form-container">
          <Form>
            {/* removed from form: onSubmit={this.handleSubmit}*/}
            <label className="subtitle-text">
              {"Filter this map area by category: "}
              <select value={this.state.category} onChange={((e) => this.handleChange(e))}>
                <option value='' disabled> Select a category </option>
                <option value="Show All"> Show All </option>
                <option value="Animal Sightings"> Animal Sightings </option>
                <option value="For Sale"> For Sale </option>
                <option value="Free Stuff"> Free Stuff </option>
                <option value="Funny"> Funny </option>
                <option value="General"> General </option>
                <option value="Gigs"> Gigs </option>
                <option value="Lost or Found Items"> Lost or Found Items </option>
                <option value="Lost or Found Pets"> Lost or Found Pets </option>
                <option value="Missed Connections"> Missed Connections </option>
                <option value="Need Help"> Need Help </option>
                <option value="Neighborhood Events"> Neighborhood Events </option>
                <option value="Other"> Other </option>
                <option value="Protest Events"> Protest Events </option>
                <option value="Spotted"> Spotted </option>
                <option value="Thank You Notes"> Thank You Notes </option>
              </select>
            </label>
            {  /* <input className="button" type="submit" value="Submit" />*/}
          </Form>
      </div>
    )
  }
}

function mdp(dispatch) {
  return {
    getAllPosts: () => {
      dispatch(getAllPosts())},

    recordSelectedCategory: (e) => {
      dispatch({
      type: "RECORD_SELECTED_CATEGORY",
      payload: ({
        category: e.target.value
      })})
    }
  }
}

function msp(state) {
  return {
    allPosts: state.allPosts
  }
}

export default connect(msp, mdp)(CategoryForm)
