export class MonthPlans {
  constructor(tasks, day) {
    this.tasks = tasks;
    this.day = day;
  }
}

export class MonthPlanItem {
  constructor(id, task, checked) {
    this.id = id;
    this.task = task;
    this.checked = checked;
  }
}
