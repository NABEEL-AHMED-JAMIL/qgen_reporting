/**
 * http://usejsdoc.org/
 */
'use strict';

const env = process.env.NODE_ENV;
const config = require('./Config');
const Sequelize = require('sequelize');

const promise = require('promise');
console.log('instart of db util...' + env);

const connect = function () {
    const sequelize = new Sequelize(config[env]['DB_NAME'], config[env]['DB_USER'], config[env]['DB_PASS'], {
        host: config[env]['DB_HOST'],
        dialect: 'mysql',
        operatorsAliases: false,
        port: config[env]['DB_PORT'],
        logging: true,
        define: {
            underscored: true,
            freezeTableName: true,
            charset: 'utf8',
            dialectOptions: {
                collate: 'utf8_general_ci'
            },
            timestamps: false
        }
    });
    return sequelize;
};


const findPingsCountPerDayData = function (startDate,endDate,source) {
    let query = "SELECT " +
            "ts AS 'Date',  " +
            "SUM( IF( ping_bucket = 'A_1', pings_from_device_per_day, 0 ) ) AS 'A_1',   " +
            "SUM( IF( ping_bucket = 'B_2-5', pings_from_device_per_day, 0 ) ) AS 'B_2-5',  " +
            "SUM( IF( ping_bucket = 'C_6-10', pings_from_device_per_day, 0 ) ) AS 'C_6-10',  " +
            "SUM( IF( ping_bucket = 'D_11-30', pings_from_device_per_day, 0 ) ) AS 'D_11-30',   " +
            "SUM( IF( ping_bucket = 'E_31-60', pings_from_device_per_day, 0 ) ) AS 'E_31-60',  " +
            "SUM( IF( ping_bucket = 'F_61-100', pings_from_device_per_day, 0 ) ) AS 'F_61-100', " +
            "SUM( IF( ping_bucket = 'G_101-500', pings_from_device_per_day, 0 ) ) AS 'G_101-500',   " +
            "SUM( IF( ping_bucket = 'H_501+', pings_from_device_per_day, 0 ) ) AS 'H_501+'  " +
            "FROM reports2 " +
            "WHERE ts between ? and ? and " + 
            "source LIKE ? " +
            "GROUP BY ts ";
    let params = {replacements: [startDate,endDate,source]};

    return doQuery(query, params);
};

// 9/18/2019 create by nabeel ahmed==> Production Done
const findPingsCountDistributionPerDayData = function (startDate,endDate,polygon,source) {
    let query = "SELECT " +
            "ts AS 'Date',  " +
            "SUM( IF( ping_bucket = 'A_1', total_pings, 0 ) ) AS 'A_1',   " +
            "SUM( IF( ping_bucket = 'B_2-5', total_pings, 0 ) ) AS 'B_2-5',  " +
            "SUM( IF( ping_bucket = 'C_6-10', total_pings, 0 ) ) AS 'C_6-10',  " +
            "SUM( IF( ping_bucket = 'D_11-30', total_pings, 0 ) ) AS 'D_11-30',   " +
            "SUM( IF( ping_bucket = 'E_31-60', total_pings, 0 ) ) AS 'E_31-60',  " +
            "SUM( IF( ping_bucket = 'F_61-100', total_pings, 0 ) ) AS 'F_61-100', " +
            "SUM( IF( ping_bucket = 'G_101-500', total_pings, 0 ) ) AS 'G_101-500',   " +
            "SUM( IF( ping_bucket = 'H_501+', total_pings, 0 ) ) AS 'H_501+'  " +
            "FROM r2_test " +
            "WHERE ts between ? and ? and " +
            "(polygon = ? and data_source = ?) " +
            "GROUP BY ts ";
    let params = {replacements: [startDate,endDate,polygon,source]};

    return doQuery(query, params);
};


const findUniqueDeviceCountPerDayData = function (startDate,endDate,source) {

    let query = "SELECT " +
            "ts AS 'Date',  " +
            "SUM( IF( ping_bucket = 'A_1', distinct_maid, 0 ) ) AS 'A_1',   " +
            "SUM( IF( ping_bucket = 'B_2-5', distinct_maid, 0 ) ) AS 'B_2-5',  " +
            "SUM( IF( ping_bucket = 'C_6-10', distinct_maid, 0 ) ) AS 'C_6-10',  " +
            "SUM( IF( ping_bucket = 'D_11-30', distinct_maid, 0 ) ) AS 'D_11-30',   " +
            "SUM( IF( ping_bucket = 'E_31-60', distinct_maid, 0 ) ) AS 'E_31-60',  " +
            "SUM( IF( ping_bucket = 'F_61-100', distinct_maid, 0 ) ) AS 'F_61-100', " +
            "SUM( IF( ping_bucket = 'G_101-500', distinct_maid, 0 ) ) AS 'G_101-500',   " +
            "SUM( IF( ping_bucket = 'H_501+', distinct_maid, 0 ) ) AS 'H_501+'  " +
            "FROM reports3 " +
            "WHERE ts between ? and ? and " + 
            "source LIKE ? " +
            "GROUP BY ts ";

    let params = {replacements: [startDate,endDate,source]};

    return doQuery(query, params);
};


// 9/18/2019 create by nabeel ahmed==> Production Done
const findUniqueDeviceCountDistributionPerDayData = function (startDate,endDate,polygon,source) {

    let query = "SELECT " +
            "ts AS 'Date',  " +
            "SUM( IF( ping_bucket = 'A_1', count_distinct_maid, 0 ) ) AS 'A_1',   " +
            "SUM( IF( ping_bucket = 'B_2-5', count_distinct_maid, 0 ) ) AS 'B_2-5',  " +
            "SUM( IF( ping_bucket = 'C_6-10', count_distinct_maid, 0 ) ) AS 'C_6-10',  " +
            "SUM( IF( ping_bucket = 'D_11-30', count_distinct_maid, 0 ) ) AS 'D_11-30',   " +
            "SUM( IF( ping_bucket = 'E_31-60', count_distinct_maid, 0 ) ) AS 'E_31-60',  " +
            "SUM( IF( ping_bucket = 'F_61-100', count_distinct_maid, 0 ) ) AS 'F_61-100', " +
            "SUM( IF( ping_bucket = 'G_101-500', count_distinct_maid, 0 ) ) AS 'G_101-500',   " +
            "SUM( IF( ping_bucket = 'H_501+', count_distinct_maid, 0 ) ) AS 'H_501+'  " +
            "FROM r3_test " +
            "WHERE ts between ? and ? and " +
            "(polygon = ? and data_source = ?) " +
            "GROUP BY ts ";

    let params = {replacements: [startDate,endDate,polygon,source]};

    return doQuery(query, params);
};


const findNumberOfDistributioPingsSinceFirstSeenData = function (startDate,endDate,polygon,source) {
    let query = "SELECT " +
            "month,  " +
            "SUM( IF( ping_bucket = 'A_1', u_maid, 0 ) ) AS 'A_1',   " +
            "SUM( IF( ping_bucket = 'B_2-5', u_maid, 0 ) ) AS 'B_2-5',  " +
            "SUM( IF( ping_bucket = 'C_6-10', u_maid, 0 ) ) AS 'C_6-10',  " +
            "SUM( IF( ping_bucket = 'D_11-30', u_maid, 0 ) ) AS 'D_11-30',   " +
            "SUM( IF( ping_bucket = 'E_31-60', u_maid, 0 ) ) AS 'E_31-60',  " +
            "SUM( IF( ping_bucket = 'F_61-100', u_maid, 0 ) ) AS 'F_61-100', " +
            "SUM( IF( ping_bucket = 'G_101-500', u_maid, 0 ) ) AS 'G_101-500',   " +
            "SUM( IF( ping_bucket = 'H_501+', u_maid, 0 ) ) AS 'H_501+'  " +
            "FROM r4_test " +
            "WHERE month between ? and ? and " + 
            "(polygon = ? and data_source = ?) " +
            "GROUP BY month ";
    let params = {replacements: [startDate,endDate,polygon,source]};

    return doQuery(query, params);
};

const findNumberOfPingsSinceFirstSeenData = function (startDate,endDate,source) {
    let query = "SELECT " +
            "month,  " +
            "SUM( IF( ping_bucket = 'A_1', u_maid, 0 ) ) AS 'A_1',   " +
            "SUM( IF( ping_bucket = 'B_2-5', u_maid, 0 ) ) AS 'B_2-5',  " +
            "SUM( IF( ping_bucket = 'C_6-10', u_maid, 0 ) ) AS 'C_6-10',  " +
            "SUM( IF( ping_bucket = 'D_11-30', u_maid, 0 ) ) AS 'D_11-30',   " +
            "SUM( IF( ping_bucket = 'E_31-60', u_maid, 0 ) ) AS 'E_31-60',  " +
            "SUM( IF( ping_bucket = 'F_61-100', u_maid, 0 ) ) AS 'F_61-100', " +
            "SUM( IF( ping_bucket = 'G_101-500', u_maid, 0 ) ) AS 'G_101-500',   " +
            "SUM( IF( ping_bucket = 'H_501+', u_maid, 0 ) ) AS 'H_501+'  " +
            "FROM reports4 " +
            "WHERE month between ? and ? and " + 
            "source LIKE ? " +
            "GROUP BY month ";
    let params = {replacements: [startDate,endDate,source]};

    return doQuery(query, params);
};

const findNumberOfPingsMonthToDateData = function (startDate,endDate,source) {
    let query = "SELECT " +
            "month as 'Date',  " +
            "SUM( IF( ping_bucket = 'A_1', u_maid, 0 ) ) AS 'A_1',   " +
            "SUM( IF( ping_bucket = 'B_2-5', u_maid, 0 ) ) AS 'B_2-5',  " +
            "SUM( IF( ping_bucket = 'C_6-10', u_maid, 0 ) ) AS 'C_6-10',  " +
            "SUM( IF( ping_bucket = 'D_11-30', u_maid, 0 ) ) AS 'D_11-30',   " +
            "SUM( IF( ping_bucket = 'E_31-60', u_maid, 0 ) ) AS 'E_31-60',  " +
            "SUM( IF( ping_bucket = 'F_61-100', u_maid, 0 ) ) AS 'F_61-100', " +
            "SUM( IF( ping_bucket = 'G_101-500', u_maid, 0 ) ) AS 'G_101-500',   " +
            "SUM( IF( ping_bucket = 'H_501+', u_maid, 0 ) ) AS 'H_501+'  " +
            "FROM reports5 " +
            "WHERE month between ? and ? and " + 
            "source LIKE ? " +
            "GROUP BY month ";
    let params = {replacements: [startDate,endDate,source]};

    return doQuery(query, params);
};


const findNumberOfPingsDistributionMonthToDate = function (startDate,endDate,polygon,source) {
    let query = "SELECT " +
            "month as 'Date',  " +
            "SUM( IF( ping_bucket = 'A_1', u_maid, 0 ) ) AS 'A_1',   " +
            "SUM( IF( ping_bucket = 'B_2-5', u_maid, 0 ) ) AS 'B_2-5',  " +
            "SUM( IF( ping_bucket = 'C_6-10', u_maid, 0 ) ) AS 'C_6-10',  " +
            "SUM( IF( ping_bucket = 'D_11-30', u_maid, 0 ) ) AS 'D_11-30',   " +
            "SUM( IF( ping_bucket = 'E_31-60', u_maid, 0 ) ) AS 'E_31-60',  " +
            "SUM( IF( ping_bucket = 'F_61-100', u_maid, 0 ) ) AS 'F_61-100', " +
            "SUM( IF( ping_bucket = 'G_101-500', u_maid, 0 ) ) AS 'G_101-500',   " +
            "SUM( IF( ping_bucket = 'H_501+', u_maid, 0 ) ) AS 'H_501+'  " +
            "FROM r5_test " +
            "WHERE month between ? and ? and " + 
            "(polygon = ? and data_source = ?) " +
            "GROUP BY month ";
    let params = {replacements: [startDate,endDate,polygon,source]};
    return doQuery(query, params);
};

const summaryReport1 = function (startDate,endDate,type) {
    let query = "SELECT " +
        "month as 'month',  " +
        "SUM(IF(name = 'mobilewala',"+type+", 0)) AS 'mobilewala', " +
        "SUM(IF(name = 'quadrant',"+type+", 0)) AS 'quadrant', " +
        "SUM(IF(name = 'mogean',"+type+", 0)) AS 'mogean' " +
        "FROM summary_report_1 " +
        "WHERE month between ? and ? " + 
        "GROUP BY month ";
    let params = {replacements: [startDate,endDate]};
    
    return doQuery(query, params);
};

const summaryReportUnique1 = function (startDate,endDate,type) {
    let query = "SELECT " +
        "month as 'month',  " +
        "SUM(IF(name = 'mobilewala',"+type+", 0)) AS 'mobilewala', " +
        "SUM(IF(name = 'quadrant',"+type+", 0)) AS 'quadrant', " +
        "SUM(IF(name = 'mogean',"+type+", 0)) AS 'mogean' " +
        "FROM summary_report_unique_1 " +
        "WHERE month between ? and ? " + 
        "GROUP BY month ";
    let params = {replacements: [startDate,endDate]};
  
    return doQuery(query, params);
};

const monthlyRawSummary = function (startDate,endDate,polygon,type) {
    let query = "SELECT " +
        "month as 'month',  " +
        "SUM(IF(name = 'mobilewala',"+type+", 0)) AS 'mobilewala', " +
        "SUM(IF(name = 'quadrant',"+type+", 0)) AS 'quadrant', " +
        "SUM(IF(name = 'mogean',"+type+", 0)) AS 'mogean' " +
        "FROM monthly_raw_summary " +
        "WHERE month between ? and ? and polygon = ? " + 
        "GROUP BY month ";
    let params = {replacements: [startDate,endDate,polygon]};  
    return doQuery(query, params);
};


const dailyStatsSummary = function (startDate,endDate,polygon,type) {
    let query = "SELECT date, name, SUM("+type+") AS " + type +
        " FROM daily_stats " +
        "WHERE date between ? and ? and polygon = ? " + 
        "GROUP BY date , name";
    let params = {replacements: [startDate,endDate,polygon]};  
    return doQuery(query, params);
};


const dailyPublisherStats = function (startDate,endDate,polygon,name) {
    let query =  "select " +
    "publisher_id as mobile_publisher_id, sum(pings) as pings, sum(devices) as devices " +
    "from daily_publisher_stats " +
    "where date between ? and ? and name = ? and polygon = ? " +
    "group by publisher_id";
    // start date, end date, type, polygon
    let params = {replacements: [startDate,endDate,name,polygon]};  
    return doQuery(query, params);
};

const dailyDtCounts = function (startDate,endDate,polygon,source) {
    let query =  "select " + 
    "date, device_type, sum(ping_count) as ping_count, sum(device_count) as device_count " +
    "from daily_dt_counts " +
    "where date between ? and ? and source = ? and polygon = ? " +
    "group by device_type, date";    
    // start date, end date, source, polygon
    let params = {replacements: [startDate,endDate,source,polygon]};  
    return doQuery(query, params);
};

const dailyDeviceOverlap = function (startDate,endDate,polygon) {
    let query = "select " +
    "date, name, sum(device_overlap_withother_sources) as device_overlap_withother_sources, sum(device_exlusive_within_source) as device_exlusive_within_source " +
    "from daily_device_overlap " +
    "where date between ? and ? and polygon = ? " +
    "group by name, date";    
    let params = {replacements: [startDate,endDate,polygon]};  
    return doQuery(query, params);
};

const monthlyUniqueSummary = function (startDate,endDate,polygon,type) {
    let query = "SELECT " +
        "month as 'month',  " +
        "SUM(IF(name = 'mobilewala',"+type+", 0)) AS 'mobilewala', " +
        "SUM(IF(name = 'quadrant',"+type+", 0)) AS 'quadrant', " +
        "SUM(IF(name = 'mogean',"+type+", 0)) AS 'mogean' " +
        "FROM monthly_unique_summary " +
        "WHERE month between ? and ? and polygon = ?" + 
        "GROUP BY month ";
    let params = {replacements: [startDate,endDate,polygon]};    
    return doQuery(query, params);
};


const dailyDistanceBuckets = function (startDate,endDate,polygon,source,type) {
    let query = "SELECT date, " +
    "SUM( IF( dist_bucket = 'A_0', "+type+", 0 ) ) AS 'A_0', " +
    "SUM( IF( dist_bucket = 'B_0-0.1', "+type+", 0 ) ) AS 'B_0-0.1', " +
    "SUM( IF( dist_bucket = 'C_0.1-0.2', "+type+", 0 ) ) AS 'C_0.1-0.2', " +
    "SUM( IF( dist_bucket = 'D_0.2-0.5', "+type+", 0 ) ) AS 'D_0.2-0.5', " +
    "SUM( IF( dist_bucket = 'E_0.5-1.0', "+type+", 0 ) ) AS 'E_0.5-1.0', " +
    "SUM( IF( dist_bucket = 'F_1.0-2.0', "+type+", 0 ) ) AS 'F_1.0-2.0', " +
    "SUM( IF( dist_bucket = 'G_2.0-5.0', "+type+", 0 ) ) AS 'G_2.0-5.0', " +
    "SUM( IF( dist_bucket = 'H_5.0-10.0', "+type+", 0 ) ) AS 'H_5.0-10.0', " +
    "SUM( IF( dist_bucket = 'I_10.0+', "+type+", 0 ) ) AS 'I_10.0+' " +
    "FROM daily_distance_buckets " +
    "WHERE date between ? and ? and (polygon = ? and name = ?) " +
    "GROUP BY date";
    let params = {replacements: [startDate,endDate,polygon,source]};    
    return doQuery(query, params);
}

const dailyPingBucket = function (startDate,endDate,polygon,source,type) {
    let query = "SELECT " +
    "date,  " +
    "SUM( IF( ping_bucket = 'A_1', "+type+", 0 ) ) AS 'A_1',   " +
    "SUM( IF( ping_bucket = 'B_2-5', "+type+", 0 ) ) AS 'B_2-5',  " +
    "SUM( IF( ping_bucket = 'C_6-10', "+type+", 0 ) ) AS 'C_6-10',  " +
    "SUM( IF( ping_bucket = 'D_11-30', "+type+", 0 ) ) AS 'D_11-30',   " +
    "SUM( IF( ping_bucket = 'E_31-60', "+type+", 0 ) ) AS 'E_31-60',  " +
    "SUM( IF( ping_bucket = 'F_61-100', "+type+", 0 ) ) AS 'F_61-100', " +
    "SUM( IF( ping_bucket = 'G_101-500', "+type+", 0 ) ) AS 'G_101-500',   " +
    "SUM( IF( ping_bucket = 'H_501+', "+type+", 0 ) ) AS 'H_501+'  " +
    "FROM daily_ping_buckets " +
    "WHERE date between ? and ? and (polygon = ? and name = ?) " +
    "GROUP BY date ";
    let params = {replacements: [startDate,endDate,polygon,source]};
    return doQuery(query, params);
}

const monthlyDistanceBucket = function (startDate,endDate,polygon,source,type) {
    let query = "SELECT month, " +
    "SUM( IF( dist_bucket = 'A_0', "+type+", 0 ) ) AS 'A_0', " +
    "SUM( IF( dist_bucket = 'D_0.2-0.5', "+type+", 0 ) ) AS 'D_0.2-0.5', " +
    "SUM( IF( dist_bucket = 'E_0.5-1.0', "+type+", 0 ) ) AS 'E_0.5-1.0', " +
    "SUM( IF( dist_bucket = 'F_1.0-2.0', "+type+", 0 ) ) AS 'F_1.0-2.0', " +
    "SUM( IF( dist_bucket = 'G_2.0-5.0', "+type+", 0 ) ) AS 'G_2.0-5.0', " +
    "SUM( IF( dist_bucket = 'H_5.0-10.0', "+type+", 0 ) ) AS 'H_5.0-10.0', " +
    "SUM( IF( dist_bucket = 'I_10.0+', "+type+", 0 ) ) AS 'I_10.0+' " +
    "FROM monthly_distance_bucket " +
    "WHERE month between ? and ? and (polygon = ? and name = ?) " +
    "GROUP BY month";
    let params = {replacements: [startDate,endDate,polygon,source]};    
    return doQuery(query, params);
}

const monthlyPingBucket = function (startDate,endDate,polygon,source,type) {
    let query = "SELECT " +
    "month,  " +
    "SUM( IF( ping_bucket = 'A_1', "+type+", 0 ) ) AS 'A_1',   " +
    "SUM( IF( ping_bucket = 'B_2-5', "+type+", 0 ) ) AS 'B_2-5',  " +
    "SUM( IF( ping_bucket = 'C_6-10', "+type+", 0 ) ) AS 'C_6-10',  " +
    "SUM( IF( ping_bucket = 'D_11-30', "+type+", 0 ) ) AS 'D_11-30',   " +
    "SUM( IF( ping_bucket = 'E_31-60', "+type+", 0 ) ) AS 'E_31-60',  " +
    "SUM( IF( ping_bucket = 'F_61-100', "+type+", 0 ) ) AS 'F_61-100', " +
    "SUM( IF( ping_bucket = 'G_101-500', "+type+", 0 ) ) AS 'G_101-500',   " +
    "SUM( IF( ping_bucket = 'H_501+', "+type+", 0 ) ) AS 'H_501+'  " +
    "FROM monthly_ping_bucket " +
    "WHERE month between ? and ? and (polygon = ? and name = ?) " +
    "GROUP BY month ";
    let params = {replacements: [startDate,endDate,polygon,source]};
    return doQuery(query, params);
}


const findPolygon = function () {
    //r3_test
    let query = "SELECT DISTINCT polygon FROM monthly_raw_summary";
    return doQuery(query, {});
}

function doQuery(query, params) {
    try {
        const sequelize = connect();
        let resultSet = null;
        return new promise((resolve, reject) => {
            if (params.replacements)
                params.type = sequelize.QueryTypes.SELECT;
                sequelize.query(query, params)
                    .then(data => {
                        resultSet = data;
                        console.log("Result-RESPONSE", JSON.stringify(resultSet));
                        return sequelize.close();
                    })
                    .then(data => {
                        console.log("Data-RESPONSE", JSON.stringify(resultSet));
                        return resolve(resultSet);
                    })
                    .catch(err => {
                        console.log("error while querying !! " + err);
                        return reject(err);
                    });
        });
    } catch (e) {
        console.log("entering catch block");
        console.log(e);
        console.log("leaving catch block");
    }
}

const dbModule = {
    findPolygon, // dons
    findPingsCountPerDayData,
    findPingsCountDistributionPerDayData,
    findUniqueDeviceCountPerDayData,
    findUniqueDeviceCountDistributionPerDayData,
    findNumberOfPingsSinceFirstSeenData,
    findNumberOfDistributioPingsSinceFirstSeenData,
    findNumberOfPingsMonthToDateData,
    findNumberOfPingsDistributionMonthToDate,
    summaryReport1, // dons
    summaryReportUnique1, // dons
    monthlyRawSummary,  // dons
    monthlyUniqueSummary, // dons
    dailyStatsSummary, // dons
    dailyDistanceBuckets,// dons
    dailyPingBucket, // done
    monthlyDistanceBucket, // done
    monthlyPingBucket, // done,
    dailyPublisherStats,
    dailyDtCounts,
    dailyDeviceOverlap
};

module.exports = dbModule;
