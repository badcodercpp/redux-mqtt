# Redux middleware to store mqtt client

this library is totally written in javascript and its let you store mqtt connection object on the redux store.

## Project description:

redux middleware to get mqtt client object in action-creator .


# Getting Started

## Install 

npm i redux-mqtt --save

## Uses

The included code below is a very basic sample that lets you write an action-creator that returns an object having all details about mqtt client  from redux store 

## mqtt client connection
```JS
// Create a client instance
var client = new Paho.MQTT.Client(location.hostname, Number(location.port), "clientId");

// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// connect the client
client.connect({onSuccess:onConnect});


// called when the client connects
function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  console.log("onConnect");
  client.subscribe("World");
  message = new Paho.MQTT.Message("Hello");
  message.destinationName = "World";
  client.send(message);
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:"+responseObject.errorMessage);
  }
}

// called when a message arrives
function onMessageArrived(message) {
  console.log("onMessageArrived:"+message.payloadString);
}

```

## Redux uses - apply middleware

```JS

// import createStore,applyMiddleware and reducer 
import { createStore } from 'redux'
import reducer from './reducers'
import mqtt from 'redux-mqtt'

// create store and apply middleware

const store = createStore(reducer,applyMiddleware(mqtt(client),...))

```

## Uses With ation-creators 

```JS

// following is the action creators that will let you return an object having mqtt method that makes mqtt client accessible via arguments .
// EX -- 

export const MQTT_CONNECT = ()=>{
    return {
        mqtt:(client, dispatch, getState)=>{
            // client is mqtt client object passed via middleware to store
            return client
        }
    }
}


```

## Breaking Changes

Previously middleware uses promise to make mqtt client available on promise resolve but from V3 onwards middleware is using pure functions to make mqtt client available  .