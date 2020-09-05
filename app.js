
/**
 * Module dependencies.
 */
'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const nodeTestPing = require('./resource/NodeTestPing');
const extraResource = require('./resource/ExtraResource');
const pingsCountPerDayResource = require('./resource/PingsCountPerDayResource');
const uniqueDeviceCountPerDayResource = require('./resource/UniqueDeviceCountPerDayResource');
const numberOfPingsSinceFirstSeenResource = require('./resource/NumberOfPingsSinceFirstSeenResource');
const numberOfPingsMonthToDateResource = require('./resource/NumberOfPingsMonthToDateResource');
const summaryReport1Resource = require('./resource/SummaryReport1Resource');
const summaryReportUnique1Resource = require('./resource/SummaryReportUnique1Resource');
const monthlyRawSummaryResource = require('./resource/MonthlyRawSummaryResource');
const monthlyUniqueSummaryResource = require('./resource/MonthlyUniqueSummaryResource');
const dailyStatsResource = require('./resource/DailyStatsResource');
const dailyDistanceBucketsResource = require('./resource/DailyDistanceBucketsResource');
const dailyPingBucketResource = require('./resource/DailyPingBucketResource');
const monthlyDistanceBucketResource = require('./resource/MonthlyDistanceBucketResource');
const monthlyPingBucketResource = require('./resource/MonthlyPingBucketResource');
const dailyPublisherStatsResource = require('./resource/DailyPublisherStatsResource');
const dailyDtCountsResource = require('./resource/DailyDtCountsResource');
const dailyDeviceOverlapResource = require('./resource/DailyDeviceOverlapResource');


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({strict: false}));
app.use(cors());

app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Accept, Content-Type");
    next();
});

//app.get('/ping_node/:firstNum/:secondNum',nodeTestPing.getPingTest);
app.get('/ping_node',nodeTestPing.getPingTest);
app.get('/getPolygon',extraResource.getPolygon);

// working
//app.get("/pings_count_per_day/:startDate&:endDate/:source", pingsCountPerDayResource.getPingsCountPerDay);
app.get("/pings_count_per_day", pingsCountPerDayResource.getPingsCountPerDay);

///polygon/:polygon
//app.get("/pings_count_distribution_per_day/startDate/:startDate/endDate/:endDate/source/:source", pingsCountPerDayResource.getPingsCountDistributionPerDayData);
app.get("/pings_count_distribution_per_day", pingsCountPerDayResource.getPingsCountDistributionPerDayData);

//app.get("/pings_count_per_day_percentage/:startDate&:endDate/:source", pingsCountPerDayResource.getPingsCountPerDayPercentage);
app.get("/pings_count_per_day_percentage", pingsCountPerDayResource.getPingsCountPerDayPercentage);

//polygon/:polygon
//app.get("/pings_count_distribution_per_day_percentage/startDate/:startDate/endDate/:endDate/source/:source", pingsCountPerDayResource.getPingsCountDistributionPerDayPercentage);
app.get("/pings_count_distribution_per_day_percentage", pingsCountPerDayResource.getPingsCountDistributionPerDayPercentage);

//app.get("/unique_device_count_per_day/:startDate&:endDate/:source", uniqueDeviceCountPerDayResource.getUniqueDeviceCountPerDay);
app.get("/unique_device_count_per_day", uniqueDeviceCountPerDayResource.getUniqueDeviceCountPerDay);

//polygon/:polygon
//app.get("/unique_device_count_distribution_per_day/startDate/:startDate/endDate/:endDate/source/:source", uniqueDeviceCountPerDayResource.getUniqueDeviceCountDistributionPerDayData);
app.get("/unique_device_count_distribution_per_day", uniqueDeviceCountPerDayResource.getUniqueDeviceCountDistributionPerDayData);

//app.get("/unique_device_count_per_day_percentage/:startDate&:endDate/:source", uniqueDeviceCountPerDayResource.getUniqueDeviceCountPerDayPercentage);
app.get("/unique_device_count_per_day_percentage", uniqueDeviceCountPerDayResource.getUniqueDeviceCountPerDayPercentage);

app.get("/unique_device_count_distribution_per_day_percentage", uniqueDeviceCountPerDayResource.getUniqueDeviceCountPerDistributionDayPercentage);

//app.get("/number_of_pings_since_first_seen/:startDate&:endDate/:source", numberOfPingsSinceFirstSeenResource.getNumberOfPingsSinceFirstSeen);
app.get("/number_of_pings_since_first_seen", numberOfPingsSinceFirstSeenResource.getNumberOfPingsSinceFirstSeen);

///polygon/:polygon
//app.get("/number_of_pings_distribution_since_first_seen/startDate/:startDate/endDate/:endDate/source/:source", numberOfPingsSinceFirstSeenResource.getNumberOfPingsDistributioSinceFirstSeen);
app.get("/number_of_pings_distribution_since_first_seen", numberOfPingsSinceFirstSeenResource.getNumberOfPingsDistributioSinceFirstSeen);

//app.get("/number_of_pings_month_to_date/:startDate&:endDate/:source", numberOfPingsMonthToDateResource.getNumberOfPingsMonthToDate);
app.get("/number_of_pings_month_to_date", numberOfPingsMonthToDateResource.getNumberOfPingsMonthToDate);

///polygon/:polygon
//app.get("/number_of_pings_distribution_month_to_date/startDate/:startDate/endDate/:endDate/source/:source", numberOfPingsMonthToDateResource.getNumberOfPingsDistributionMonthToDate);
app.get("/number_of_pings_distribution_month_to_date", numberOfPingsMonthToDateResource.getNumberOfPingsDistributionMonthToDate);

app.get("/summaryReport1/:type", summaryReport1Resource.summaryReport1);

app.get("/summaryReportUnique1/:type", summaryReportUnique1Resource.summaryReportUnique1);
// 10-30 change
app.get("/monthlyRawSummary/:type", monthlyRawSummaryResource.monthlyRawSummary);
app.get("/monthlyUniqueSummary/:type", monthlyUniqueSummaryResource.monthlyUniqueSummary);
// 10-31 change
app.get("/dailyStatsSummary/:type", dailyStatsResource.dailyStatsSummary);
// 11-01 change
app.get("/dailyDistanceBuckets/:type", dailyDistanceBucketsResource.dailyDistanceBuckets);
app.get("/dailyPingBucket/:type", dailyPingBucketResource.dailyPingBucket);
app.get("/monthlyDistanceBucket/:type", monthlyDistanceBucketResource.monthlyDistanceBucket);
app.get("/monthlyPingBucket/:type", monthlyPingBucketResource.monthlyPingBucket);
app.get("/dailyPublisherStats", dailyPublisherStatsResource.dailyPublisherStats);
app.get("/dailyDtCounts", dailyDtCountsResource.dailyDtCounts);
app.get("/dailyDeviceOverlap", dailyDeviceOverlapResource.dailyDeviceOverlap);

module.exports = app;
