import moment from "moment"

function getBudgets() {
  return [
    {month: 201704, amount: 30},
    {month: 201804, amount: 30},
    {month: 201805, amount: 31},
    {month: 201806, amount: 30}]
}

export function getBudgetByDate(start, end) {
  if (start > end) {
    console.log("錯誤日期格式")
    return null;
  } else {
    var totalAmount = 0;
    var budgets = getBudgets();

    //  解析開始日期
    var startYear = parseInt(start.toString().substring(0, 4));
    var startMonth = parseInt(start.toString().substring(0, 6));
    var startDate = parseInt(start.toString().substring(6, 8));
    console.log("start YM:" + startMonth + ",D:" + startDate);

    // 解析結束日期
    var endYear = parseInt(end.toString().substring(0, 4));
    var endMonth = parseInt(end.toString().substring(0, 6));
    var endDate = parseInt(end.toString().substring(6, 8));
    console.log("end YM:" + endMonth + ",D:" + endDate);

    budgets.forEach(data => {
      var year = parseInt(data.month.toString().substring(0, 4));
      var month = parseInt(data.month.toString().substring(4, 6));
      var amount = data.amount;
      var dayInMonth = new Date(year, month, 0).getDate();
      // console.log("days:"+days+" ,month:"+month);

      if (data.month >= startMonth && data.month <= endMonth) {
        if (startMonth == endMonth && data.month == startMonth && data.month == endMonth) {
          console.log("dayInSameMonth : " + (endDate - (startDate - 1)))
          totalAmount += (amount * (endDate - (startDate - 1)) / dayInMonth);
        } else if (data.month == endMonth) {
          console.log("dayInEndMonth : " + endDate)
          totalAmount += (amount * endDate / dayInMonth);
        } else if (data.month == startMonth) {
          console.log("dayInStartMonth : " + (dayInMonth - startDate + 1));
          totalAmount += (amount * (dayInMonth - startDate + 1) / dayInMonth);
        } else {
          console.log("dayInOtherMonth : " + dayInMonth)
          totalAmount += amount;
        }
      }
    })

    console.log("amount:" + totalAmount + "\n");
    return totalAmount;
  }
}
