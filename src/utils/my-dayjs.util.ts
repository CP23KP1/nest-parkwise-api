import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(timezone);

dayjs.tz.setDefault('America/New_York');

export const myDayjs = dayjs;
