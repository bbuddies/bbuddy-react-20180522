import moment from 'moment'
import {fetch} from './budgets'
import _ from 'lodash'

let dayCountBetween = function (start, end) {
  return end.diff(start, 'days') + 1
}
let dayCountOfBudget = function (budget) {
  return moment(budget.month, 'YYYY-MM').daysInMonth()
}
let getStartOfBudget = function (budget) {
  return moment(budget.month, 'YYYY-MM').startOf('month')
}
let getEndOfBudget = function (budget) {
  return moment(budget.month, 'YYYY-MM').endOf('month')
}
let getAmountOfOverlapping = function (budget, startDate, endDate) {
  let startOfBudget = getStartOfBudget(budget)
  let endOfBudget = getEndOfBudget(budget)
  let startOfOverlapping = startDate.isAfter(startOfBudget) ? startDate : startOfBudget
  let endOfOverlapping = endDate.isBefore(endOfBudget) ? endDate : endOfBudget
  return budget.amount / dayCountOfBudget(budget) * dayCountBetween(startOfOverlapping, endOfOverlapping)
}
export default function query(start, end, callback){
  fetch(budgets => {
    callback(
      _.sumBy(budgets, budget => getAmountOfOverlapping(budget, moment(start, 'YYYY-MM-DD'), moment(end, 'YYYY-MM-DD')))
    )
  })
}
