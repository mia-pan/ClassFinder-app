import React, { Component } from 'react'

import { Card, Image, Icon } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import { api } from '../services/api'

class CategoriesCard extends Component {

//  handleItemClick = () => {
//    console.log("handleClick", this.props.item)
//   console.log(this.props.history)
//    this.props.onShowDetails(this.props.item)
//    this.props.history.push(`/item-details/${this.props.item.id}`)

//  }

handleClick = () => {
    console.log("handleClick", this.props)
    this.props.history.push(`/category_details/${this.props.category.id}`)
    // this.onShowDetail(this.props.)
}

  render() {
    // console.log("render", this.props.item)
    return(
      <div className="category"  onClick={() => this.handleClick()}> 

<Card>
    <Image src={this.props.category.image} wrapped ui={false} />
    <Card.Content>
      <Card.Header>{this.props.category.name}</Card.Header>
      <Card.Meta>
        <span className='date'>Description</span>
      </Card.Meta>
      <Card.Description>
       {this.props.category.description}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name='star' />
        4.8(500+)
      </a>
    </Card.Content>
  </Card>
  <br></br>

      </div>
    )
  }
}
export default CategoriesCard;
