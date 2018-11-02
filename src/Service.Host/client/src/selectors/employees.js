const distinct = array => Array.from(new Set(array));

export const getEmployeesToFetch = (state, activities) => {
    const { employees } = state;

    const activityUrls = distinct(activities.map(activity => activity.employeeUrl));
    const existingUrls = employees.map(e => e.employeeUrl);

    const newUrls = activityUrls.filter(a => !existingUrls.includes(a));

    return newUrls;
}

export const getEmployee = (state, employeeUrl) => {
    const { employees } = state;

    const employee = employees.find(emp => emp.employeeUrl === employeeUrl);

    return employee
        ? employee.item
        : null;
}

export const getEmployeesLoading = state => {
    const { employees } = state;

    return employees.findIndex(e => e.loading) > -1;
}