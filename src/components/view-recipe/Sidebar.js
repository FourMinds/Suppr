import React, { Component } from 'react';
import $ from 'jquery';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import SporkModal from './SporkModal';

class Sidebar extends Component {

  componentWillMount(){
    $(window).resize(function() {
    	let path = $(this);
    	let contW = path.width();
    	if(contW >= 751) {
    		document.getElementsByClassName("sidebar-toggle")[0].style.left="200px";
        $("#recipe-view").addClass("recipe-view-margin");
    	} else {
    		document.getElementsByClassName("sidebar-toggle")[0].style.left="-200px";
    	}
    });
    $(document).ready(()=> {
    	$('.body').on('show.bs.dropdown', function(e){
    	    $(this).find('.dropdown-menu').first().stop(true, true).slideDown(300);
    	});
    	$('.body').on('hide.bs.dropdown', function(e){
    		$(this).find('.dropdown-menu').first().stop(true, true).slideUp(300);
    	});
    	$(".menu-toggle").click(function(e) {
    		e.preventDefault();
    		let elem = document.getElementById("sidebar-wrapper");
    		let left = window.getComputedStyle(elem,null).getPropertyValue("left");
    		if (left === "200px") {
    			document.getElementsByClassName("sidebar-toggle")[0].style.left="-200px";
          $("#recipe-view").removeClass("recipe-view-margin")
    		}
    		else if (left === "-200px") {
    			document.getElementsByClassName("sidebar-toggle")[0].style.left="200px";
          $("#recipe-view").addClass("recipe-view-margin");
    		}
    	});
    });
  }

  handleDeleteSpork() {
    this.props.deleteRecipe(this.props.selectedVariation.id, true);
  }

  handleDelete() {
    this.props.deleteRecipe(this.props.recipe.id);
  }

  handleEdit() {
    this.props.pushUpdate(this.props.recipe);
  }

  handleEditSpork() {
    const { name, image, prep_time, cook_time } = this.props.selectedVariation;
    this.props.pushUpdate({
      ...this.props.selectedVariation, 
      recipeName: name, 
      imageUrl: image,
      prepTime: prep_time,
      cookTime: cook_time,
      parentId: this.props.recipe.id
    }, true);
  }

  handleVariation() {
    this.props.pushVariation(this.props.recipe);
  }

  returnToRecipe() {
    this.props.getRecipeInfo(this.props.recipe.id);
    this.props.getReview(this.props.recipe.id);
    this.props.deselectVariation();
  }

  render() {
    const selected = (this.props.sporkId && this.props.selectedVariation) || 
      this.props.selectedVariation ? 'side-item' : 'side-item sidebar-selected';

    const notSelected = !(this.props.sporkId || this.props.selectedVariation) || 
      !this.props.selectedVariation ? 'side-item' : 'side-item sidebar-selected';

    const recipeButtonCaption = this.props.sporkId ? 'Return to Recipe' : 'Recipe';
    const { username, recipeName } = this.props.recipe?this.props.recipe:'';
    const hasReview = this.props.reviews.some(review => review.username === this.props.username);
    return (
      <div>
      <nav className="navbar navbar-default" role="navigation">
        <a  href="#" className="navbar-toggle menu-toggle">
          <button className="btn btn-primary sidebar-toggle-btn">
            <span className="fa fa-bars" aria-hidden="true"></span>
          </button>       
        </a>
      	<div className="container">
      		<div className="navbar-header">
      		</div>
      		<div id="sidebar-wrapper" className="sidebar-toggle">
      			<ul className="sidebar-nav" style={{paddingTop:'10px'}}>
              <li className="menu-toggle sidebar-toggle-item">
                <a>Close<i className="fa fa-times" aria-hidden="true" ></i></a>
              </li>
    		    	{!this.props.selectedVariation && this.props.username===username &&
              <li onClick={this.handleDelete.bind(this)}>
                <a >Delete Recipe <i className="fa fa-trash-o" aria-hidden="true"></i></a>
              </li>
              }
              {this.props.selectedVariation && this.props.username===this.props.selectedVariation.username &&
              <li onClick={this.handleDeleteSpork.bind(this)}>
                <a >Delete this spork <i className="fa fa-trash-o" aria-hidden="true"></i></a>
              </li>
              }
              {!this.props.selectedVariation && this.props.username===username &&
              <li onClick={this.handleEdit.bind(this)}>
                <a >Edit <i className="fa fa-pencil-square-o" aria-hidden="true"></i></a>
              </li>
              }
              {this.props.selectedVariation && this.props.username===this.props.selectedVariation.username &&
              <li onClick={this.handleEditSpork.bind(this)}>
                <a >Edit this spork <i className="fa fa-pencil-square-o" aria-hidden="true"></i></a>
              </li>
              }
              {!this.props.selectedVariation && this.props.username &&
              <li onClick={this.handleVariation.bind(this)}>
                <a>Spork this recipe <img src="/assets/spork2.png" alt="Spork" style={{width: '8%', marginLeft: '5px'}}/></a>
              </li>
              }
              {this.props.username && 
              <li data-toggle="modal" data-target="#reviewModal" data-whatever="@mdo">
                <a>
                  {!hasReview?'Write a Review':'Edit Review'}<i className="fa fa-pencil" aria-hidden="true"></i>
                </a>
              </li>
              }
              <hr />
              <li className={selected} onClick={this.returnToRecipe.bind(this)}>
                <a >View Recipe <i className="fa fa-list" aria-hidden="true"></i></a>
              </li>
              <li className={notSelected} data-toggle="modal" data-target="#ModalLong">
                <a>View Sporks <i className="fa fa-share" aria-hidden="true"></i></a>
              </li>
    		  	</ul>
      		</div>
        </div>
      </nav>
      
      <SporkModal sporkId={this.props.sporkId} recipe={this.props.recipe}/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    username: state.auth.username,
    variations: state.recipes.variations,
    selectedVariation: state.recipes.selectedVariation,
    reviews: state.reviews.data
  };
}

export default connect(mapStateToProps, actions)(Sidebar);
