/*const ical2json = require("ical2json");
const path = require("path");
const fs = require('fs');*/
import ical2json from 'ical2json'
import fs from 'fs';
import path from 'path'
import {isValid, parseISO, parse} from 'date-fns'
function adjustDateTimezone(originalDate) { // element["DTSTART;VALUE=DATE"]
    let parsedval = parse(originalDate, 'yyyyMMdd', new Date());

    const timezoneOffset = -480; // UTC+8 in minutes
    let adjustedDate = new Date(
      parsedval.getTime() + (parsedval.getTimezoneOffset() * 60000) + (timezoneOffset * 60000)
    );

  
    return parsedval
}
// adjust the date value to Hong Kong Time

export default function getEvents(icspath) {
    const __dirname = path.resolve();
    try {
        console.log("Current directory:", __dirname);
        // const icalData = fs.readFileSync( '../tc.ics', 'utf8');
        const icalData = fs.readFileSync(icspath, 'utf8');
        const output = ical2json.convert(icalData);
        fs.writeFileSync('../tc.json', JSON.stringify(output));
        const DATEFORMAT = "YYYY-MM-DD[T]HH:mm:ss";

        const eventarr = output.VCALENDAR[0].VEVENT
        // console.log(output.VCALENDAR[0].VEVENT)
        let arroutput = [];
        var currentevent;
        // console.log(currentevent)
        eventarr.forEach((element) => {
            currentevent = {
                StartDate: adjustDateTimezone(element["DTSTART;VALUE=DATE"]),
                EndDate: adjustDateTimezone(element["DTEND;VALUE=DATE"]),
                Summary: element["SUMMARY"]
            }
            // let dt = parse(currentevent.startDate, 'yyyyMMdd', new Date())

            arroutput.push(currentevent)
        });
        console.log(arroutput);
        return arroutput
        // console.log(output)
    } catch (err) {
        console.error(err);
    }
}
// From ical to JSON


// From JSON to ical
// var icalOutput = ical2json.revert(icalJson)
