export default function date(date:Date) {
	const d = new Date(date);
	let options: Intl.DateTimeFormatOptions = {
	  weekday: "long",
	  year: "numeric",
	  month: "long",
	  day: "numeric",
	};
	return new Intl.DateTimeFormat('en-GB', options).format(d)
}
