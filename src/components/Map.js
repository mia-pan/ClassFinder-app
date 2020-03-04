import React, { Component } from 'react'
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import CategoryMarker from "./CategoryMarker";

// class Map extends Component {
//     render(){
//         const GoogleMapExample = withGoogleMap(props => (
//             <GoogleMap
//             defaultCenter = {{lat: 47.6062, lng: 122.3321}}
//             defaultZoom = {13}
//             >
//                 {props.isMarkerShown && <Marker position={{lat:47.6062 , lng: 122.3321}}/>}
//             </GoogleMap>
//         ))
//         return(
//             <div>Map Component Rendered
//                 <GoogleMapExample
//                     isMarkerShown
//                     containerElement={ <div style={{ height: '500px', width: '500px'}} />}
//                     mapElement = { <div style={{ height: '35%'}} />}
//             />
//             </div>
//         )
//     }
// }
// export default Map;

const Map = withScriptjs(withGoogleMap((props) =>{

    const markers = props.categories.map( category => <CategoryMarker
                      key={category.id}
                      category={category.name}
                      location={{lat: 47.608013, lng: -122.335167}}
                    />);
                    
    return (
        <GoogleMap
          defaultZoom={14}
          center={ { lat: 47.608013, lng: -122.335167 } }
          >
          {markers}
        </GoogleMap>
      );
    }
  ))
  
  export default Map;