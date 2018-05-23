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

  var startDate = parseDate(moment(start, dateFormat));
  var endDate = parseDate(moment(end, dateFormat));

  var startMonth = moment(start).format(dateNoDayFormat)
  var endMonth = moment(end).format(dateNoDayFormat)

  var budgets = getBudgets();

  var items = [];
  var index = 0;
  budgets.forEach(budget => {
    var date = moment(budget.month).format(dateFormat)
    if(moment(date).isSameOrAfter(startMonth) && moment(date).isSameOrBefore(endMonth)) {
      items[index] = budget;
      index++;
    }
  })

  items.forEach(budget => {
    var date = moment(budget.month, dateNoDayFormat);
    var dayOfMonth = moment(budget.month).daysInMonth();
    var month = parseDate(date).month;

    var range = dayOfMonth;
    if(startMonth == endMonth) {
      range = endDate.day - startDate.day + 1;
    } else if(month == startDate.month) {
      range = dayOfMonth - startDate.day + 1;
    } else if(month == endDate.month) {
      range = endDate.day;
    } else {
      range = dayOfMonth;
    }

    result += (budget.amount / dayOfMonth) * range;
  })

  return result;
}
