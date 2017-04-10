import React, { Component } from 'react';
import $ from 'jquery';

class Sidebar extends Component {

  componentWillMount(){
    $(window).resize(function() {
    	var path = $(this);
    	var contW = path.width();
    	if(contW >= 751){
    		document.getElementsByClassName("sidebar-toggle")[0].style.left="200px";
    	}else{
    		document.getElementsByClassName("sidebar-toggle")[0].style.left="-200px";
    	}
    });
    $(document).ready(function() {
    	$('.dropdown').on('show.bs.dropdown', function(e){
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
    		}
    		else if(left === "-200px"){
    			document.getElementsByClassName("sidebar-toggle")[0].style.left="200px";
    		}
    	});
    });

  }
  render() {
    return (
      <nav className="navbar navbar-default" role="navigation">
      	<div className="container">
      		<div className="navbar-header">
      			<a id="menu-toggle" href="#" className="navbar-toggle">
      					<span class="sr-only">Toggle navigation</span>
      			        <span className="icon-bar"></span>
      			        <span className="icon-bar"></span>
      			        <span className="icon-bar"></span>
      			</a>
        			<a className="navbar-brand" >
        				logo
        			</a>
      		</div>
      		<div id="sidebar-wrapper" className="sidebar-toggle">
      			<ul className="sidebar-nav">
      		    	<li>
      		      	<a >Item 1</a>
      		    	</li>
      		    	<li>
      		      	<a >Item 2</a>
      		    	</li>
      		    	<li>
      		      	<a >Item 3</a>
      		    	</li>
      		  	</ul>
      		</div>
        </div>
      </nav>
    )
  }
}

export default Sidebar;
