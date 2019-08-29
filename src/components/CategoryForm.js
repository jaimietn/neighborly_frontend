import React, { Component } from 'react'

class CategoryForm extends Component {

  state = {
    category: ''
  }

  render(){
    console.log("from form", this.state.category)
    return(
      <div>
        <form onSubmit={this.props.handleSubmit}>
          <label>
            {"Filter this map area by category: "}
            <select value={this.state.category} onChange={this.props.handleChange}>
              <option value="animal_sightings"> Animal Sightings </option>
              <option value="candid_camera"> Candid Camera </option>
              <option value="free_stuff"> Free Stuff </option>
              <option value="general_notes"> General Notes </option>
              <option value="for_sale"> Items For Sale </option>
              <option value="live_music"> Live Music </option>
              <option value="lost_found_items"> Lost or Found Items </option>
              <option value="lost_found_pet"> Lost or Found Pets </option>
              <option value="missed_connections"> Missed Connections </option>
              <option value="need_help"> Need Help </option>
              <option value="neighborhood_events"> Neighborhood Events </option>
              <option value="other"> Other </option>
              <option value="protest_events"> Protest Events </option>
              <option value="safety_concerns"> Safety Concerns </option>
              <option value="thank_you_notes"> Thank You Notes </option>
            </select>
          </label>
          <input className="button" type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default CategoryForm
