import moment from 'moment'

function getBudgets(){
  return [{month: "2018-04", amount: 30}, {month: "2018-05", amount: 31}, {month: "2018-06", amount: 30}]
}

function parseDate(date) {
  return {
    year: date.format('Y'),
    month: date.format('M'),
    day: date.format('D')
  }
}

export function search(start, end){
  var result = 0;
  var dateFormat = 'YYYY-MM-DD';
  var dateNoDayFormat = 'YYYY-MM';

  var startDate = moment(start, dateNoDayFormat);
  var endDate = moment(end, dateNoDayFormat);

  var startDay = parseDate(moment(start, dateFormat)).day;
  var endDay = parseDate(moment(end, dateFormat)).day;

  var budgets = getBudgets();

  budgets.forEach(budget => {
    var date = moment(budget.month, dateFormat);
    if(moment(date).isSameOrAfter(startDate) && moment(date).isSameOrBefore(endDate)) {
      var dayOfMonth = moment(budget.month).daysInMonth();

      var range = dayOfMonth;
      if(moment(startDate).isSame(endDate)) {
        range = endDay - startDay + 1;
      } else if(moment(date).isSame(startDate)) {
        range = dayOfMonth - startDay + 1;
      } else if(moment(date).isSame(endDate)) {
        range = endDay;
      } else {
        range = dayOfMonth;
      }

      result += (budget.amount / dayOfMonth) * range;
    }
  })

  return result;
}
