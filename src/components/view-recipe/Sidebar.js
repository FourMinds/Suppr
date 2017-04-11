import React, { Component } from 'react';
import $ from 'jquery';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Sidebar extends Component {

  componentWillMount(){
    $(window).resize(function() {
    	var path = $(this);
    	var contW = path.width();
    	if(contW >= 751){
    		document.getElementsByClassName("sidebar-toggle")[0].style.left="200px";
        $("#recipe-view").addClass("recipe-view-margin");
    	}else{
    		document.getElementsByClassName("sidebar-toggle")[0].style.left="-200px";
    	}
    });
    $(document).ready(function() {
    	$('.body').on('show.bs.dropdown', function(e){
    	    $(this).find('.dropdown-menu').first().stop(true, true).slideDown(300);
    	});
    	$('.body').on('hide.bs.dropdown', function(e){
    		$(this).find('.dropdown-menu').first().stop(true, true).slideUp(300);
    	});
    	$("#menu-toggle").click(function(e) {
    		e.preventDefault();
    		var elem = document.getElementById("sidebar-wrapper");
    		var left = window.getComputedStyle(elem,null).getPropertyValue("left");
    		if(left === "200px"){
    			document.getElementsByClassName("sidebar-toggle")[0].style.left="-200px";
          $("#recipe-view").removeClass("recipe-view-margin")
    		}
    		else if(left === "-200px"){
    			document.getElementsByClassName("sidebar-toggle")[0].style.left="200px";
          $("#recipe-view").addClass("recipe-view-margin");
    		}
    	});
    });
  }

  handleDelete(deleteSpork) {
    if (deleteSpork) {
      this.props.deleteRecipe(this.props.selectedVariation.id, deleteSpork)
    }
    
  }

  handleEdit() {
    this.props.pushUpdate(this.props.recipe)
  }

  handleVariation() {
    this.props.pushVariation(this.props.recipe)
  }

  renderVariations() {
    console.log(this.props.variations)
    if (this.props.recipe && this.props.variations) {
      return this.props.variations[this.props.recipe.id].map((variation,i) => {
        return (
          <li key={i} onClick={() => this.props.selectVariation(this.props.recipe.id, variation.id)}>
            <a >{variation.name}</a>
          </li>
        )
      })
      
    }
  }

  render() {
    console.log(this.props.username, this.props.selectVariation)
    const { id, username, recipeName, imageUrl, difficulty, cookTime, prepTime, servings, instructions, description, ingredients, tags} = this.props.recipe?this.props.recipe:'';
    return (
      <nav className="navbar navbar-default" role="navigation">
      	<div className="container">
      		<div className="navbar-header">
      			<a id="menu-toggle" href="#" className="navbar-toggle">
      					<button className="btn btn-primary">Side Bar</button>
      			        <span className="icon-bar"></span>
      			        <span className="icon-bar"></span>
      			        <span className="icon-bar"></span>
      			</a>
      		</div>
      		<div id="sidebar-wrapper" className="sidebar-toggle">
      			<ul className="sidebar-nav">
      		    	{this.props.username===username &&
                  <li onClick={this.handleDelete.bind(this)}>
                    <a >Delete</a>
                  </li>
                }
                {this.props.selectedVariation && this.props.username===this.props.selectedVariation.username &&
                  <li onClick={this.handleDelete.bind(this, true)}>
                    <a >Delete this spork</a>
                  </li>
                }
                {this.props.username===username &&
                  <li onClick={this.handleEdit.bind(this)}>
                    <a >Edit</a>
                  </li>
                }
                {this.props.username &&
                  <li onClick={this.handleVariation.bind(this)}>
                    <a >Spork this recipe</a>
                  </li>
                }

                <hr />
                {this.renderVariations.call(this)}
      		  	</ul>
      		</div>
        </div>
      </nav>
    )
  }
}

function mapStateToProps(state) {
  return {
    recipe: state.recipes.selectedRecipe,
    username: state.auth.username,
    variations: state.recipes.variations,
    selectedVariation: state.recipes.selectedVariation
  }
}

export default connect(mapStateToProps, actions)(Sidebar);
