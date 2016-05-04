'use strict';
import express from 'express';
//const express = require("express");

const port = process.env.PORT || 3000;
const app = express();
const months = ["January", "February", "March","April", "May", "June", "July",
  "August", "September", "October","November", "December"];
app.get("/", (req, res) => res.json({hello:'world'}));
app.get("/microservices/:data", (req, res) => {
	let unixtime = Number(req.params.data); 
	let natural = req.params.data.replace(',','').split(' ');
	var timeFormat = {
		getUnixTime() {
			if(unixtime){
				return unixtime;
			} else if (natural.length === 3){
				let month = months.indexOf(natural[0]);
				let date = Number(natural[1]);
				let year = Number(natural[2]);
				return Date.parse(`${year}-${month}-${date}`)/1000;
			} else {
				return null;
			}
		},
		getNaturalTime() {
			if(unixtime){
				let d = new Date(unixtime*1000);
				let year = d.getFullYear();
				let month = months[d.getMonth()];
				let date = d.getDate()+1;
				return `${month} ${date}, ${year}`;		
			} else if (natural.length === 3){
				return req.params.data;
			} else {
				return null;
			}			
		}
	};


	let timestampfull = {
		unix: timeFormat.getUnixTime(), 
		natural: timeFormat.getNaturalTime()
	}
	res.json(timestampfull);
});
app.listen( port, () => console.log(`Service started on port: ${port}`));
