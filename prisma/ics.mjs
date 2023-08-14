/*const ical2json = require("ical2json");
const path = require("path");
const fs = require('fs');*/
import ical2json from 'ical2json'
import fs from 'fs';
import path from 'path'
import { isValid, parseISO, parse } from 'date-fns'
export default function getEvents(icspath) {
  const __dirname = path.resolve();
  try {
    console.log("Current directory:", __dirname);
    //const icalData = fs.readFileSync( '../tc.ics', 'utf8');
    const icalData = fs.readFileSync(icspath, 'utf8');
    const output = ical2json.convert(icalData);
    fs.writeFileSync('../tc.json', JSON.stringify(output));
    const DATEFORMAT = "YYYY-MM-DD[T]HH:mm:ss";

    const eventarr = output.VCALENDAR[0].VEVENT
    // console.log(output.VCALENDAR[0].VEVENT)
    let arroutput = [];
    var currentevent;
    //console.log(currentevent)
    eventarr.forEach((element) => {
      currentevent = {
        StartDate: parse(element["DTEND;VALUE=DATE"], 'yyyyMMdd', new Date()),
        EndDate: parse(element["DTSTART;VALUE=DATE"], 'yyyyMMdd', new Date()),
        Summary: element["SUMMARY"]
      }
      //let dt = parse(currentevent.startDate, 'yyyyMMdd', new Date())

      arroutput.push(currentevent)
    });
    console.log(arroutput);
    return arroutput
    //console.log(output)
  } catch (err) {
    console.error(err);
  }
}
// From ical to JSON


// From JSON to ical
//var icalOutput = ical2json.revert(icalJson)
