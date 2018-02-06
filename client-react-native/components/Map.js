import React, { Component } from 'react';
import Expo, {Location, Permissions, Platform, MapView } from 'expo';
import { StyleSheet, Dimensions, View, Text } from 'react-native';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

let { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0092;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class Map extends Component {
  constructor() {
    super();
    this.state = {
    regionCenter:
        {
          latitude: 40.7051,
          longitude: -74.0092,
        }
    }
  }

  render() {
    const {regionCenter} = this.state;
    const {users, restaurants, currentUserCoords} = this.props;
    console.log('hi', currentUserCoords)
    let arrivedUsers = users.filter(user => user.coords && user.coords.latitude !== null);
    const pinColors = ['plum', 'teal', 'orange', 'green', 'yellow', 'gold', 'tomato'];

      return (
        <MapView
          style={ styles.container }
          region={{
            latitude: regionCenter.latitude,
            longitude: regionCenter.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
          }}
        >
        {arrivedUsers.map(user => {
          let latitude = Number(user.coords.latitude);
          let longitude = Number(user.coords.longitude);
          let randPinColor = pinColors[Math.floor(Math.random() * pinColors.length)];
          return (<MapView.Marker
              key={user.id}
              coordinate={{latitude, longitude}}
              title={`${user.firstName} ${user.lastName}`}
              pinColor={randPinColor}
          />)}
        )}
        {restaurants.map(restaurant => {
          return (<MapView.Marker
              key={restaurant.id}
              coordinate={restaurant.coordinates}
              title={restaurant.name}
              pinColor={'indigo'}
          />)}
        )}
       </MapView>
      );
    }
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
    currentUser: state.user,
    restaurants: state.restaurants,
    currentUserCoords: state.users.find(user => Number(user.id) === (state.user.id))
  }
}

export default connect(mapStateToProps, null)(Map);
