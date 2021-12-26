export class MonthPlans {
  constructor(day, tasks) {
    this.day = day;
    this.tasks = tasks;
  }
}

export class MonthPlanItem {
  constructor(id, task, checked) {
    this.id = id;
    this.task = task;
    this.checked = checked;
  }
}
