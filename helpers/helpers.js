export function buildDateString(dispatch_time, hideSeconds) {
    const dateTime = new Date(dispatch_time.replace(' ','T') + 'Z');
    const hours = refineTimestamp(dateTime, 'hours');
    const minutes = refineTimestamp(dateTime, 'minutes');
    const seconds = refineTimestamp(dateTime, 'seconds');

    return `${hours}.${minutes}` + (hideSeconds ? `` : `.${seconds}`);
}

export function refineTimestamp(time, measurement) {
    if (measurement === 'hours') {
        return time.getUTCHours() < 10 ? `0${time.getUTCHours()}` : `${time.getUTCHours()}`;
    } else if (measurement === 'minutes') {
        return time.getMinutes() < 10 ? `0${time.getMinutes()}` : `${time.getMinutes()}`;
    } else if (measurement === 'seconds') {
        return time.getSeconds() < 10 ? `0${time.getSeconds()}` : `${time.getSeconds()}`;
    }

    return time;
}

export function validateCrossStreets(cross_streets) {
    return !isEmpty(cross_streets) && cross_streets.length > 3 ? true : false;
}

export function isEmpty(v) {
    return !v || v.length === 0;
}