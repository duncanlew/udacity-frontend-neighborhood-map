# Udacity Neighborhood Map
This is the repository for the project of Udacity Neighborhood Map. This is done as part of the Udacity Front-End Developer Nanodegree Program. The goal of the project is to create a single-page application of a neighborhood. Extra functionality like maps and highlighted locations should also be part of the page. 

## Description
![The Hague Neighborhood Map](images/screenshot.png)
The goal of this neighborhood app is to showcase the usage of the Knockout Framework, Google Maps API and Foursquare API to create a single-page application. This neighborhood application is optimized for usability on phone, tablet and desktop browsers. Ten points of interests are shown on the map as markers. The sidebar which can be opened by the Menu button, contains a filter function to filter through the 10 POIs in real time. Only the filtered markers will be shown on the map. 

## Live website
To test the site out, please visit the following link: [The Hague Neighborhood Map](https://duncanlew.github.io/udacity_neighborhood_map/)


## Running locally
In order to run this application locally on your system, you will first need an [API key](https://developers.google.com/maps/documentation/javascript/get-api-key) for the Google Maps Javascript API. The reason for creating your own API key is because the API key in the repository is only whitelisted for certain domain names. 

### Step 1: Clone the repository
Clone the respository by running the following command:
```html
$ git clone https://github.com/duncanlew/udacity_neighborhood_map.git
```
### Step 2: Replace the API key
Open up ```index.html``` and edit the word ```YOURAPIKEY``` in the following line at the end of the file to add your API key:
```javascript
<script async defer src="https://maps.googleapis.com/maps/api/js?&key=YOURAPIKEY&callback=initMap"></script>
```
### Step 3: Start the application
Start the application by opening ```index.html``` in your browser of choice and explore the app's features.

## Used Resources
The following resources were used for the creation of this application
* [Knockout 3.4.2](https://knockoutjs.com/)
* [Google Maps Javascript API](https://developers.google.com/maps/documentation/javascript/tutorial)
* [Foursquare Places API](https://developer.foursquare.com/places-api)
* [Bootstrap 4.2.1](https://getbootstrap.com/)
* [Snazzy Maps](https://snazzymaps.com/)
* Inspiration for creation of sidebar: [Simple Sidebar](https://startbootstrap.com/template-overviews/simple-sidebar/)
