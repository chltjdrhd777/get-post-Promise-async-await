import axios from "axios";
import fetch from "node-fetch";
//get vs post
//every information which is send to server is made up of "header" and "body"
//header : contains client information like URL, id....
//body : generally empty

//get : < the information from server and shows it>
//In header, like "www.hawer.com?" ? means the end of URL
//and attach details like "www.hawer.com?id=werqwe&password=1234"
//all things are in header so body is empty
//Normally, get has cache so it is faster than post

//post : <get the information and modify information stored in the server>
//In body, like "Form data {you:"win"}"
//In header, there is "Content-Type" which determine the type of information
//users can contain information in the body, and replace stored data in the server with new data from my form

//////////////////////////////////////////////////////////////////////////////////
//Asynchronous
//commonly, javascript is asynchronous. it means javascript doesn't wait for the series of codes
//like
// 1. console.log("hi")
// 2. fetch(url).then(.....) <---slower
// 3. console.log("hello")
// the dealing order is 1->3->2 because 2 is slower than others

//by doing so, javascript can handle tones of information immediately
//But, sometimes we have to set the exact order for them to be dealt with
//To do this, nowadays, there are two effective concepts "Promise" and "async,await"

//Promise
//it tells javascript to wait for specific handling like
// new Promise(function(resolve,reject){.....})
// by putting new Promise, it means, "hey you promise to handle this first"
// and by resolve, it can return the target information

//function getData(){
//   return new Promise(function(resolve,reject){
//      let data = 100;
//      resolve(data) <=== what Promise eventually returns
// })
//}

//reject (new Error("Request is failed")) <---- "request is failed" is a final return
//reject acts as an Error receptor.
//It is combined with "catch()" like
//getData().then().catch(function(err){...})

//But the problem is, to use syncronous, Promise always requires then() which containes new Promise function

//resolve(prop) => then(function(prop))
//then() receives returned infromation from previous code and use this as a prop
//catch(find error. if I set the reject(prop), it reads this prop)

console.log("first");

let f = () =>
  new Promise((resolve) => {
    const second = "second";
    resolve(second);
  });

f()
  .then((resolve) => console.log(resolve)) //"second"
  .catch((err) => console.log(err));
console.log("third");
//result is "first third second" because "console.log("third")"  isn't in "then()" which means it goes over the boundary of "then()'s synchronous"

const f2 = () =>
  new Promise((resolve) => {
    const one = "one";
    resolve(one);
  });

f2().then((one) => console.log(one));
//result : first third second one
//unless codes are connected to then(), the prioirty is new Promise
//it is the reason why, "console.log(one)"" is faster than "console.log(third)"
// it is like, there is another separated order in javascript, formed by "new Promise() and then()"

// but this kind of behavior is really suck
//so async & await is way more better than Promise I think
//Promise is just the ground of async & await
////////////////////////////////////////////////////////////////////////////////////
//async & await
//basic form

// async function name (){
//    await asynchronous method();
//}

//VERERERERERy important rule
// that asynchronous method should be a type of "new Promise()"
//it is like "axios()" or "fetch()" <--- contain new Promise inside this syntax

//async = put Promise type on the target function
//await = wating point(the await function should be Promise)

const doItFirst = () =>
  new Promise((resolve) => {
    const hana = "hana";
    resolve(hana);
  });

const doIiiiiit = async () => {
  const target = await doItFirst();
  console.log(target);
};

doIiiiiit();
//result is "first fourth second one hana"
//because async means "Im gonna put this in the <PROMISE ORDER> which is a strict series"

async function apiUtilizer() {
  const URL = "https://reqres.in/api/users?page=2";
  const everyData = await fetch(URL).then((response) => response.json());
  return everyData.data;
}

async function whatDataIs() {
  const everyData = await apiUtilizer();
  const newArray = everyData.filter(
    (everyDataObject) => everyDataObject.id === 7
  );
  console.log(newArray[0].last_name);
}

whatDataIs();
