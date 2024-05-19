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
    const utcDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    const utcEpochSeconds = Math.floor(utcDate.getTime() / 1000);
    const utcEpochMilliseconds = utcDate.getTime();

    document.getElementById('utc-time').value = utcDate.toISOString().slice(0, 19);
    document.getElementById('utc-epoch-seconds').textContent = `${utcEpochSeconds}`;
    document.getElementById('utc-epoch-milliseconds').textContent = `${utcEpochMilliseconds}`;

    const timeZones = {
        'sydney-time': 'Australia/Sydney',
        'perth-time': 'Australia/Perth',
        'bangladesh-time': 'Asia/Dhaka'
    };

    for (const [fieldId, timeZone] of Object.entries(timeZones)) {
        if (fieldId !== fromZone.toLowerCase().replace('/', '-')) {
            const offset = getOffset(timeZone, utcDate);
            const localDate = new Date(utcDate.getTime() + offset * 60000);
            document.getElementById(fieldId).value = localDate.toISOString().slice(0, 19);
            if (fieldId !== 'bangladesh-time') {
                document.getElementById(`${fieldId}-24`).textContent = ` ${localDate.toISOString().slice(11, 19)}`;
                document.getElementById(`${fieldId}-12`).textContent = ` ${format12HourTime(localDate)}`;
            }
        }
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
        case 'Asia/Dhaka':
            return 360; // BST: UTC+6
        default:
            return 0;
    }
}

function format12HourTime(date) {
    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const seconds = date.getUTCSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const strMinutes = minutes < 10 ? '0' + minutes : minutes;
    const strSeconds = seconds < 10 ? '0' + seconds : seconds;
    return `${hours}:${strMinutes}:${strSeconds} ${ampm}`; 
}

function clearFields() {
    document.getElementById('bangladesh-time').value = '';
    document.getElementById('utc-time').value = '';
    document.getElementById('sydney-time').value = '';
    document.getElementById('perth-time').value = '';
    document.getElementById('utc-epoch-seconds').textContent = 'Epoch Seconds: ';
    document.getElementById('utc-epoch-milliseconds').textContent = 'Epoch Milliseconds: ';
    document.getElementById('sydney-time-24').textContent = '24-Hour Format: ';
    document.getElementById('sydney-time-12').textContent = '12-Hour Format: ';
    document.getElementById('perth-time-24').textContent = '24-Hour Format: ';
    document.getElementById('perth-time-12').textContent = '12-Hour Format: ';
}

function copyToClipboard(elementId, tickId) {
    const element = document.getElementById(elementId);
    const text = element.tagName === 'INPUT' ? element.value : element.textContent;
    const tempInput = document.createElement('input');
    tempInput.style.position = 'absolute';
    tempInput.style.left = '-9999px';
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    const tickElement = document.getElementById(tickId);
    tickElement.style.display = 'inline';
    setTimeout(() => {
        tickElement.style.display = 'none';
    }, 2000);
}


        function convertEpoch() {
            const epochSeconds = document.getElementById('epoch-seconds').value;
            const epochMilliseconds = document.getElementById('epoch-milliseconds').value;

            if (epochSeconds) {
                const dateSeconds = new Date(epochSeconds * 1000);
                document.getElementById('date-time-seconds').textContent = `Seconds → ${dateSeconds.toISOString().replace('T', ' ').slice(0, 19)}`;
                // document.getElementById('timezone-seconds').textContent = ` | ${getTimeZone(dateSeconds)}`;
            }

            if (epochMilliseconds) {
                const dateMilliseconds = new Date(parseInt(epochMilliseconds));
                document.getElementById('date-time-milliseconds').textContent = `Milliseconds → ${dateMilliseconds.toISOString().replace('T', ' ').slice(0, 19)}`;
                // document.getElementById('timezone-milliseconds').textContent = ` | ${getTimeZone(dateMilliseconds)}`;
            }
        }

              function getTimeZone(date) {
            const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            const offset = -date.getTimezoneOffset();
            const sign = offset >= 0 ? "+" : "-";
            const hours = Math.floor(Math.abs(offset) / 60);
            const minutes = Math.abs(offset) % 60;
            const formattedOffset = `${sign}${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
            return `${timeZone} (UTC${formattedOffset})`;
        }



