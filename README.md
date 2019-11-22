# ionicFestivalApp
A mobile app that use ionic frameworks and firebase to save festivals. The app access to the storage, camera and GPS of the mobile.

First:
Create an account on firebase, and create a project. Get the credentials of the project on firebase and copy them 
inside the environments/environment.ts

Example of credentials:

firebaseConfig: {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
}

Second:
Generate your key for using the google api maps, and paste it on the index.html file

<script src="https://maps.googleapis.com/maps/api/js?key=myKey"></script>


