'use strict';
import express from 'express';
//const express = require("express");

const port = process.env.PORT || 3000;
const app = express();
app.get("/", (req, res) => res.json({hello:'world'}));
app.listen( port, () => console.log('Service started on port:'+port));
