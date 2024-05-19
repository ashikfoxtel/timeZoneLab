function convertTime() {
    const bangladeshTime = document.getElementById('bangladesh-time').value;
    if (!bangladeshTime) return;

    const date = new Date(bangladeshTime);
    updateTimeFields(date, 'Asia/Dhaka');
}

function updateAllTimes(changedField) {
    let date;
    switch (changedField) {
        case 'UTC':
            date = new Date(document.getElementById('utc-time').value);
            break;
        case 'Australia/Sydney':
            date = new Date(document.getElementById('sydney-time').value);
            break;
        case 'Australia/Perth':
            date = new Date(document.getElementById('perth-time').value);
            break;
    }

    if (!date) return;

    updateTimeFields(date, changedField);
}

function updateTimeFields(date, fromZone) {
    const bangladeshOffset = 6 * 60; // UTC+6
    const utcDate = new Date(date.getTime() + (bangladeshOffset - date.getTimezoneOffset()) * 60000);

    const timeZones = {
        'utc-time': 'UTC',
        'sydney-time': 'Australia/Sydney',
        'perth-time': 'Australia/Perth'
    };

    for (const [fieldId, timeZone] of Object.entries(timeZones)) {
        const offset = getOffset(timeZone, utcDate);
        const localDate = new Date(utcDate.getTime() + offset * 60000);
        document.getElementById(fieldId).value = localDate.toISOString().slice(0, 16);
    }
}

function getOffset(timeZone, date) {
    switch (timeZone) {
        case 'UTC':
            return 0;
        case 'Australia/Sydney':
            return date.getMonth() >= 10 || date.getMonth() <= 2 ? 660 : 600; // AEDT: UTC+11, AEST: UTC+10
        case 'Australia/Perth':
            return 480; // AWST: UTC+8
        default:
            return 0;
    }
}
