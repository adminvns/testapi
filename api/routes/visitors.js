const express = require('express');
const router = express.Router();

// Store visitor logs in memory (Note: In production, you'd want to use a database)
const visitorLogs = [];

router.get('/', (req, res) => {
    const ip = req.ip || req.connection.remoteAddress;
    const timestamp = new Date().toISOString();
    
    // Add new visit to logs
    visitorLogs.push({
        ip,
        timestamp,
        userAgent: req.get('User-Agent')
    });

    // Return all logs
    res.status(200).json({
        status: 'ok',
        message: 'Visitor logs retrieved successfully',
        totalVisits: visitorLogs.length,
        logs: visitorLogs
    });
});

// Get statistics about visitors
router.get('/stats', (req, res) => {
    const uniqueIPs = new Set(visitorLogs.map(log => log.ip)).size;
    
    res.status(200).json({
        status: 'ok',
        totalVisits: visitorLogs.length,
        uniqueVisitors: uniqueIPs,
        lastVisit: visitorLogs.length > 0 ? visitorLogs[visitorLogs.length - 1] : null
    });
});

module.exports = router;
