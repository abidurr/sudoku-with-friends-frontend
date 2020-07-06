export function secondsToHms(s) {
    s = Number(s);
    const h = Math.floor(s / 3600);
    s = s % 3600;
    const m = Math.floor(s / 60);
    s = s % 60;

    const hDisplay = h > 0 ? h + (h === 1 ? ' hr ' : ' hrs ') : '';
    const mDisplay = m > 0 ? m + (m === 1 ? ' min ' : ' mins ') : '';
    const sDisplay = s > 0 ? s + (s === 1 ? ' sec' : ' secs') : '';

    return hDisplay + mDisplay + sDisplay;
}

export function copyToClipboard(str) {
    var el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
}
