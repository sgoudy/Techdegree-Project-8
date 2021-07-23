
import React from "react";
import PlasmicSidebar from "./components/plasmic/fire_spot/PlasmicSidebar";
import {Map} from "./components/GoogleMap";

import { Switch, Route } from 'react-router-dom';

import PlasmicHomeIcon from "./components/plasmic/fire_spot/PlasmicHomeIcon";
import PlasmicProfileIcon from "./components/plasmic/fire_spot/PlasmicProfileIcon";
import PlasmicAlertBellIcon from "./components/plasmic/fire_spot/PlasmicAlertBellIcon";
import PlasmicSearchIcon from "./components/plasmic/fire_spot/PlasmicSearchIcon";


function Index() {
  return (
    <div>
      <Map/>
      <PlasmicSidebar/>
      
      
      <PlasmicHomeIcon/>
      <PlasmicAlertBellIcon/>
      <PlasmicSearchIcon/>
      <PlasmicProfileIcon/>
      
    
       <Switch>

        <Route exact path="/">  
        
        </Route>
    </Switch>
   </div>
   
  );
}

export default Index;
  